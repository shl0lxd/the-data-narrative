import Link from 'next/link';
import PostForm from '../PostForm';

export const metadata = {
  title: 'New Post | Admin | The Data Narrative',
};

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-ink hover:underline">
          ← Back to Admin
        </Link>
      </div>
      <h1 className="text-2xl font-serif font-bold tracking-tight mb-6">New Post</h1>
      <PostForm />
    </div>
  );
}
