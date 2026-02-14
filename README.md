# The Data Narrative

A premium editorial platform for deep-dive analysis on Indian stock market and Mumbai property trends.

## Deployment Guide

### Required Environment Variables (Vercel Dashboard)

Add these in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase anon/public key
- `RESEND_API_KEY`: Your Resend API key

### Setup & Deployment

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd the-data-narrative
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add environment variables in Vercel Dashboard as listed above.
4. Deploy to Vercel:
   - Use the Vercel CLI or connect your GitHub repo to Vercel.

### Project Structure
- `src/components/`: UI components
- `src/app/actions/`: Server Actions
- `src/utils/`: Supabase client config

### Contact
Sincerely,<br>Shlok | Founder & Lead Analyst
