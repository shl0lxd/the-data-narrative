'use client';

import { useState } from 'react';
import { signIn } from '../actions/auth';

export default function LoginForm({ redirectTo }) {
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (redirectTo) formData.set('redirect', redirectTo);

    const result = await signIn(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-3 py-2 border border-zinc-300 rounded-md bg-paper text-ink placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2 border border-zinc-300 rounded-md bg-paper text-ink placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 px-4 border-2 border-ink rounded-md font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors"
      >
        Sign in
      </button>
    </form>
  );
}
