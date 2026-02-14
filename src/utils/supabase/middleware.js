import { createServerClient } from '@supabase/ssr';

/**
 * Create a Supabase client for use in Next.js middleware.
 * Uses request/response cookies to refresh the session.
 */
export function createServerClientForMiddleware(request, response) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}
