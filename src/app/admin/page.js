import Link from 'next/link';
import { createClient } from '../../utils/supabase/server';
import AdminSignOut from './AdminSignOut';
import DeletePostButton from './DeletePostButton';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: posts = [] } = await supabase
    .from('posts')
    .select('id, slug, title, is_published, published_at, created_at')
    .order('created_at', { ascending: false });

  const { data: likesRows = [] } = await supabase.from('likes').select('post_id');
  const likeCountByPost = likesRows.reduce((acc, { post_id }) => {
    acc[post_id] = (acc[post_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-serif font-bold tracking-tight text-ink">Admin</h1>
        <div className="flex items-center gap-3">
          <AdminSignOut />
          <Link
            href="/admin/new"
            className="inline-flex items-center px-4 py-2 border-2 border-ink rounded-md font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors"
          >
            Create New Post
          </Link>
        </div>
      </div>

      <ul className="space-y-3">
        {posts.length === 0 ? (
          <li className="text-zinc-500 py-8">No articles yet.</li>
        ) : (
          posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-zinc-200 last:border-0"
            >
              <div className="min-w-0">
                <span className="font-serif font-medium text-ink">{post.title}</span>
                <span className="ml-2 text-xs text-zinc-500">
                  {post.is_published ? 'Published' : 'Draft'} · /{post.slug}
                  {' · '}
                  <span className="tabular-nums">{likeCountByPost[post.id] ?? 0} likes</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="text-sm font-medium text-ink hover:underline"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} title={post.title} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
