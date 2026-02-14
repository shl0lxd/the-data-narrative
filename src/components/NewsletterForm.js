'use client';

import React, { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { subscribeFormAction } from '../app/actions/subscribe';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, formAction] = useFormState(subscribeFormAction, null);

  useEffect(() => {
    if (state?.success) setEmail('');
  }, [state?.success]);

  const message = state?.success ? 'Thank you for joining the ledger.' : state?.error ?? '';

  return (
    <form action={formAction} className="bg-white/90 rounded-xl shadow-sm px-8 py-8 max-w-md mx-auto flex flex-col items-center mb-12">
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
          className="font-sans text-sm border-2 border-ink rounded-full px-6 py-2 bg-paper text-ink font-semibold hover:bg-ink hover:text-paper transition-colors shadow-sm hover:scale-105 disabled:opacity-70"
        >
          Subscribe
        </button>
      </div>
      <div className="nyt-divider h-[1px] bg-zinc-200 w-full my-8" />
      {message && (
        <div className={`font-sans text-sm text-center mt-2 ${state?.success ? 'text-zinc-700' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </form>
  );
}
