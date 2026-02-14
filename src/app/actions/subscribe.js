import { supabase } from '../../utils/supabaseClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribe(formData) {
  const email = formData.get('email');

  // Basic email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: 'Invalid email address.' };
  }

  // Check for duplicate
  const { data: existing, error: fetchError } = await supabase
    .from('subscribers')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (fetchError) {
    return { error: 'Database error.' };
  }
  if (existing) {
    return { error: 'Email already subscribed.' };
  }

  // Insert new subscriber
  const { data, error: insertError } = await supabase
    .from('subscribers')
    .insert([{ email, status: 'active' }]);

  if (insertError) {
    return { error: 'Failed to subscribe.' };
  }

  // Send welcome email
  try {
    await resend.emails.send({
      from: 'welcome@thedatanarrative.com',
      to: email,
      subject: 'Welcome to The Data Narrative',
      html: '<h1>Welcome to The Data Narrative</h1><p>Thank you for joining the ledger.</p>',
    });
  } catch (e) {
    return { error: 'Subscription successful, but failed to send email.' };
  }

  return { success: true };
}
