'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '../../utils/supabase/server';

/**
 * Strict session check: must pass auth.getUser() before any DB operation.
 * Redirects to /login if no session.
 */
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return { supabase, user };
}

export async function savePost(formData) {
  const { supabase, user } = await requireAuth();

  const id = formData.get('id')?.toString() || null;
  const title = formData.get('title')?.toString()?.trim();
  const slug = formData.get('slug')?.toString()?.trim();
  const deck = formData.get('deck')?.toString()?.trim() || null;
  const content = formData.get('content')?.toString()?.trim() || null;
  const is_published = formData.get('is_published') === 'on';

  if (!title || !slug) {
    return { error: 'Title and slug are required.' };
  }

  const payload = {
    title,
    slug,
    deck,
    content,
    is_published,
    author_id: user.id,
  };
  if (!id && is_published) payload.published_at = new Date().toISOString();

  if (id) {
    if (is_published) {
      const { data: existing } = await supabase.from('posts').select('published_at').eq('id', id).single();
      if (existing && !existing.published_at) payload.published_at = new Date().toISOString();
    }
    const { error } = await supabase.from('posts').update(payload).eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin');
    revalidatePath('/');
    redirect('/admin');
  } else {
    const { data: inserted, error } = await supabase.from('posts').insert(payload).select('id').single();
    if (error) return { error: error.message };
    revalidatePath('/admin');
    revalidatePath('/');
    redirect(inserted?.id ? `/admin/edit/${inserted.id}` : '/admin');
  }
}

export async function deletePost(formData) {
  const { supabase } = await requireAuth();

  const id = formData.get('id')?.toString();
  if (!id) return { error: 'Missing post id.' };

  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}
