'use client';

/**
 * LikeButton: React 19 useOptimistic for instant filled heart and count.
 * Persists tdn_guest_id in localStorage; calls like_post RPC server-side.
 */
import { useState, useCallback, useEffect, useOptimistic, startTransition } from 'react';
import { supabase } from '../utils/supabaseClient';

const GUEST_ID_KEY = 'tdn_guest_id';
const LIKED_POSTS_KEY = 'tdn_liked_posts';

function getGuestId() {
  if (typeof window === 'undefined') return null;
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

function getLikedSet() {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LIKED_POSTS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function setLikedPost(postId, liked) {
  const set = getLikedSet();
  if (liked) set.add(postId);
  else set.delete(postId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...set]));
  }
}

export default function LikeButton({ postId, initialCount = 0 }) {
  const [state, setState] = useState({
    count: initialCount,
    liked: false,
  });
  const [mounted, setMounted] = useState(false);

  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (current) => ({ count: current.count + 1, liked: true })
  );

  useEffect(() => {
    setMounted(true);
    setState((prev) => ({ ...prev, liked: getLikedSet().has(postId) }));
  }, [postId]);

  const handleLike = useCallback(() => {
    if (!mounted || state.liked) return;
    const guestId = getGuestId();
    if (!guestId) return;

    setLikedPost(postId, true);

    startTransition(async () => {
      addOptimistic(null);

      try {
        const { data, error } = await supabase.rpc('like_post', {
          p_post_id: postId,
          p_guest_id: guestId,
        });
        if (error) throw error;
        setState({ count: typeof data === 'number' ? data : state.count + 1, liked: true });
      } catch (err) {
        setState((prev) => ({ count: Math.max(0, prev.count - 1), liked: false }));
        setLikedPost(postId, false);
        console.error('Like failed:', err);
      }
    });
  }, [postId, mounted, state.liked, state.count, addOptimistic]);

  const displayCount = optimisticState.count;
  const isLiked = optimisticState.liked;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleLike}
        disabled={optimisticState.liked}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 bg-paper text-ink hover:bg-zinc-100 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        aria-label={isLiked ? 'Liked' : 'Like this article'}
      >
        <span className="text-lg" aria-hidden>
          {isLiked ? '❤️' : '🤍'}
        </span>
        <span className="text-sm font-medium tabular-nums">
          {displayCount} like{displayCount !== 1 ? 's' : ''}
        </span>
      </button>
    </div>
  );
}
