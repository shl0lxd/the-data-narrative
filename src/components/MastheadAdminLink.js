'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function MastheadAdminLink() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u ?? null));
  }, []);

  if (!user) return null;

  return (
    <Link
      href="/admin"
      className="font-sans text-sm uppercase tracking-widest text-zinc-500 hover:text-ink hover:underline transition"
    >
      Admin
    </Link>
  );
}
