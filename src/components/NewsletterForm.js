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
    <form onSubmit={handleSubmit} className="prose-nyt mx-auto w-full max-w-md flex flex-col items-center">
      <div className="w-full flex flex-row items-center gap-2 mb-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="font-sans text-xs md:text-sm border border-ink rounded px-3 py-2 flex-1 bg-paper text-ink focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-xs md:text-sm border border-ink rounded px-4 py-2 bg-paper text-ink hover:bg-ink hover:text-paper transition"
        >
          {loading ? 'Joining...' : 'Subscribe'}
        </button>
      </div>
      <hr className="nyt-divider w-full mb-2" />
      {message && (
        <div className="font-sans text-xs text-center mt-2 text-ink">
          {message}
        </div>
      )}
    </form>
  );
}
