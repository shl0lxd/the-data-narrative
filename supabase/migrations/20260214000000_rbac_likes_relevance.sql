-- Gated Publishing (RBAC): posts table updates
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- Backfill: treat existing rows as published (published_at for relevance sorting)
UPDATE posts
SET is_published = true, published_at = COALESCE(published_at, NOW())
WHERE is_published = false;

-- Row Level Security on posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "posts_select_all" ON posts;
CREATE POLICY "posts_select_all" ON posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "posts_insert_own" ON posts;
CREATE POLICY "posts_insert_own" ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "posts_update_own" ON posts;
CREATE POLICY "posts_update_own" ON posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "posts_delete_own" ON posts;
CREATE POLICY "posts_delete_own" ON posts FOR DELETE
  USING (auth.uid() = author_id);

-- Social Engagement: likes table (one like per guest per post)
CREATE TABLE IF NOT EXISTS public.likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  guest_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  UNIQUE (post_id, guest_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Everyone can read like counts; only the RPC (running as anon) will insert
DROP POLICY IF EXISTS "likes_select_all" ON likes;
CREATE POLICY "likes_select_all" ON likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "likes_insert_anon" ON likes;
CREATE POLICY "likes_insert_anon" ON likes FOR INSERT
  WITH CHECK (true);

-- RPC: add a like (idempotent) and return the new like count for the post
CREATE OR REPLACE FUNCTION public.like_post(p_post_id uuid, p_guest_id text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count bigint;
BEGIN
  INSERT INTO public.likes (post_id, guest_id)
  VALUES (p_post_id, p_guest_id)
  ON CONFLICT (post_id, guest_id) DO NOTHING;

  SELECT COUNT(*) INTO new_count FROM public.likes WHERE post_id = p_post_id;
  RETURN new_count;
END;
$$;

-- Optional: view for published posts with like count (for homepage)
CREATE OR REPLACE VIEW public.posts_public AS
SELECT
  p.id,
  p.slug,
  p.title,
  p.deck,
  p.content,
  p.published_at,
  p.created_at,
  (SELECT COUNT(*) FROM public.likes l WHERE l.post_id = p.id) AS like_count
FROM public.posts p
WHERE p.is_published = true;

-- Grant access
GRANT SELECT ON public.posts_public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.like_post(uuid, text) TO anon, authenticated;
