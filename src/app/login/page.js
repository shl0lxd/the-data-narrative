import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign In | The Data Narrative',
};

export default async function LoginPage({ searchParams }) {
  const params = await Promise.resolve(searchParams || {});
  const redirectTo = typeof params.redirect === 'string' ? params.redirect : undefined;

  return (
    <div className="bg-paper min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-2 text-ink">The Data Narrative</h1>
          <p className="font-sans text-xs uppercase tracking-widest text-zinc-400">Admin Ledger Access</p>
        </div>

        <LoginForm redirectTo={redirectTo} />

        <div className="mt-8 text-center">
          <a href="/" className="text-xs font-sans text-zinc-400 hover:text-ink transition-colors">
            ← Back to Public Narrative
          </a>
        </div>
      </div>
    </div>
  );
}
