# Supabase migrations

Run the SQL in **Supabase Dashboard → SQL Editor** (or via `supabase db push` if you use the CLI).

## Migration: `20260214000000_rbac_likes_relevance.sql`

- **Posts table:** Adds `is_published` (boolean), `author_id` (uuid → auth.users), `published_at` (timestamptz). Enables RLS: everyone can SELECT; only the row’s `author_id` can INSERT/UPDATE/DELETE (set `author_id = auth.uid()` when creating posts from the app).
- **Likes table:** `id`, `post_id`, `guest_id`, `created_at` with UNIQUE (post_id, guest_id). One like per guest per post.
- **RPC `like_post(post_id, guest_id)`:** Idempotent like; returns the new like count for the post.
- **View `posts_public`:** Published posts with `like_count` for homepage and article pages.

After running the migration, set `AUTHOR_ID` to your Supabase user UUID when using `scripts/publish.py` so new posts have an owner (optional if you use the direct DB connection, which bypasses RLS).
