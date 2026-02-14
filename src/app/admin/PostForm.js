'use client';

import { useState } from 'react';
import { savePost } from '../actions/posts';

const inputClass = 'w-full px-3 py-2 border border-zinc-300 rounded-md bg-paper text-ink placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink';
const labelClass = 'block text-sm font-medium text-ink mb-1';

export default function PostForm({ post = null }) {
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (post?.id) formData.set('id', post.id);

    const result = await savePost(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ''}
          className={inputClass}
          placeholder="Article title"
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          defaultValue={post?.slug ?? ''}
          className={inputClass}
          placeholder="url-friendly-slug"
        />
      </div>

      <div>
        <label htmlFor="deck" className={labelClass}>Deck (summary)</label>
        <input
          id="deck"
          name="deck"
          type="text"
          defaultValue={post?.deck ?? ''}
          className={inputClass}
          placeholder="Short summary or subheadline"
        />
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>Content</label>
        <textarea
          id="content"
          name="content"
          rows={14}
          defaultValue={post?.content ?? ''}
          className={inputClass + ' font-mono text-sm'}
          placeholder="Markdown or HTML (will be stored as-is)"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          defaultChecked={post?.is_published ?? false}
          className="rounded border-zinc-300 text-ink focus:ring-ink"
        />
        <label htmlFor="is_published" className="text-sm font-medium text-ink">
          Publish (visible on site)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-4 py-2 border-2 border-ink rounded-md font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors"
        >
          {post ? 'Update post' : 'Create post'}
        </button>
      </div>
    </form>
  );
}
