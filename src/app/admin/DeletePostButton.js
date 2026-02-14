'use client';

import { useState } from 'react';
import { deletePost } from '../actions/posts';

export default function DeletePostButton({ postId, title }) {
  const [confirming, setConfirming] = useState(false);

  function handleClick() {
    if (confirming) {
      const formData = new FormData();
      formData.set('id', postId);
      deletePost(formData);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-sm font-medium ${confirming ? 'text-red-600 hover:no-underline' : 'text-zinc-500 hover:text-red-600 hover:underline'}`}
    >
      {confirming ? `Click again to delete “${title}”` : 'Delete'}
    </button>
  );
}
