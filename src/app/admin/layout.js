import Masthead from '../../components/Masthead';
import AdminGuard from '../../components/AdminGuard';

export const metadata = {
  title: 'Admin | The Data Narrative',
  description: 'Manage your blog.',
};

export default function AdminLayout({ children }) {
  return (
    <main className="bg-paper text-ink min-h-screen">
      <Masthead />
      <section className="max-w-3xl mx-auto px-4 py-8">
        <AdminGuard>
          {children}
        </AdminGuard>
      </section>
    </main>
  );
}
