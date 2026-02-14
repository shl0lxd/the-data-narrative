'use client';

import { useEffect } from 'react';

/** On mount, scroll to the element matching window.location.hash (e.g. #newsletter). */
export default function ScrollToHash() {
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  return null;
}
