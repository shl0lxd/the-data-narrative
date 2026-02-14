import Link from 'next/link';
import Masthead from '../../components/Masthead';
import AboutSection from '../../components/AboutSection';

export const metadata = {
  title: 'About | The Data Narrative',
  description: 'Where code meets capital—data-driven narratives from Mumbai.',
};

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <section className="flex flex-col items-center max-w-4xl mx-auto px-4">
        <AboutSection />
        <Link
          href="/#newsletter"
          className="inline-block mt-6 border-2 border-ink rounded-full px-6 py-2 font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors"
        >
          Subscribe to the Ledger
        </Link>
        <Link href="/" className="mt-6 text-sm text-zinc-500 hover:text-ink transition">
          ← Back to narratives
        </Link>
      </section>
    </>
  );
}
