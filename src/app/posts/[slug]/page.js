import { notFound } from 'next/navigation';
import Masthead from '../../../components/Masthead';
import LikeButton from '../../../components/LikeButton';
import { supabase } from '../../../utils/supabaseClient';

/** Dynamic Reader View: fetch by slug, .prose-nyt + .drop-cap, LikeButton in footer. */
export default async function PostPage({ params }) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from('posts_public')
    .select('id, title, deck, content, like_count')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const { id, title, deck, content, like_count } = post;

  const contentWithDropCap =
    typeof content === 'string' && content
      ? content.replace(/<p>/i, '<p class="drop-cap">')
      : '';

  return (
    <>
      <Masthead />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">
          {title}
        </h1>
        {deck && (
          <p className="text-xl text-zinc-600 mb-8">
            {deck}
          </p>
        )}
        <div
          className="prose-nyt"
          dangerouslySetInnerHTML={{ __html: contentWithDropCap || '<p>No content.</p>' }}
        />
        <footer className="mt-12 pt-8 border-t border-zinc-200/90">
          <LikeButton postId={id} initialCount={Number(like_count) || 0} />
        </footer>
      </article>
    </>
  );
}
