'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AdminGuard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data: { user: u }, error }) => {
      if (!mounted) return;
      setUser(error ? null : u);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-zinc-500">
        Checking authentication…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-zinc-600">
        <p className="text-lg font-serif">Unauthorized.</p>
        <p className="text-sm">Sign in to access this area.</p>
      </div>
    );
  }

  return children;
}
