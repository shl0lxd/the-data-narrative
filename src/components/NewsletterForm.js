'use client';
import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/app/actions/subscribe', {
        method: 'POST',
        body: new FormData(e.target),
      });
      const result = await res.json();
      if (result.success) {
        setMessage('Thank you for joining the ledger.');
        setEmail('');
      } else {
        setMessage(result.error || 'Something went wrong.');
      }
    } catch {
      setMessage('Something went wrong.');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 rounded-xl shadow-sm px-8 py-8 max-w-md mx-auto flex flex-col items-center mb-12">
      <div className="w-full flex flex-row items-center gap-2 mb-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="font-sans text-sm border border-ink rounded px-3 py-2 flex-1 bg-paper text-ink focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-sm border-2 border-ink rounded-full px-6 py-2 bg-paper text-ink font-semibold hover:bg-ink hover:text-paper transition-colors shadow-sm hover:scale-105"
        >
          {loading ? 'Joining...' : 'Subscribe'}
        </button>
      </div>
      <div className="nyt-divider h-[1px] bg-zinc-200 w-full my-8" />
      {message && (
        <div className="font-sans text-xs text-center mt-2 text-ink">
          {message}
        </div>
      )}
    </form>
  );
}
