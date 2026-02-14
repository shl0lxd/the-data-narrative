'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

export async function signIn(formData) {
  const email = formData.get('email')?.toString()?.trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message || 'Invalid email or password.' };
  }

  const redirectTo = formData.get('redirect')?.toString() || '/admin';
  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
