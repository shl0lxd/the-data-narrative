'use client';

import { signOut } from '../actions/auth';

export default function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="text-sm font-medium text-zinc-500 hover:text-ink hover:underline"
    >
      Sign Out
    </button>
  );
}
