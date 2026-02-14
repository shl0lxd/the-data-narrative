import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../../../utils/supabase/server';
import PostForm from '../../PostForm';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('posts').select('title').eq('id', id).maybeSingle();
  return { title: data ? `${data.title} | Edit | Admin` : 'Edit Post | Admin' };
}

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase.from('posts').select('id, title, slug, deck, content, is_published').eq('id', id).maybeSingle();

  if (error || !post) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-ink hover:underline">
          ← Back to Admin
        </Link>
      </div>
      <h1 className="text-2xl font-serif font-bold tracking-tight mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
