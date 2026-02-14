import Link from 'next/link';
import Masthead from '../components/Masthead';
import AboutSection from '../components/AboutSection';
import NewsletterForm from '../components/NewsletterForm';
import DataChartSection from '../components/DataChartSection';
import ScrollToHash from '../components/ScrollToHash';
import { supabase } from '../utils/supabaseClient';

/** Relevance Feed: fetch from posts_with_relevance, sort by relevance_score descending. */
export default async function HomePage() {
  const { data: posts, error } = await supabase
    .from('posts_with_relevance')
    .select('id, slug, title, deck, published_at, created_at, like_count, relevance_score')
    .order('relevance_score', { ascending: false });

  const chartData = [
    { date: '2026-01', value: 120 },
    { date: '2026-02', value: 130 },
    { date: '2026-03', value: 125 },
    { date: '2026-04', value: 140 },
  ];

  const hasPosts = !error && posts && posts.length > 0;

  return (
    <>
      <ScrollToHash />
      <Masthead />
      <section className="flex flex-col items-center" id="markets" aria-label="Markets & narratives">
        {hasPosts ? (
          <ul className="w-full max-w-3xl mx-auto mb-12 space-y-8">
            {posts?.map((post) => (
              <li key={post.id}>
                <article className="bg-white/90 rounded-xl shadow-sm px-8 py-8">
                  <Link href={`/posts/${post.slug}`} className="block group">
                    <h2 className="font-serif text-3xl tracking-tight mb-2 group-hover:underline">
                      {post.title}
                    </h2>
                    {post.deck && (
                      <p className="text-zinc-600 font-body mb-2">{post.deck}</p>
                    )}
                    <p className="text-xs text-zinc-500">
                      {post.like_count ?? 0} like{(post.like_count ?? 0) !== 1 ? 's' : ''}
                    </p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full max-w-3xl mx-auto mb-12 py-12 text-center">
            <h2 className="font-serif text-3xl text-ink">The Ledger is currently empty.</h2>
            <p className="mt-4 text-zinc-600">Drafting new narratives...</p>
          </div>
        )}
        <div className="my-8 w-full max-w-2xl" id="property" aria-label="Property & data">
          <DataChartSection data={chartData} />
        </div>
        <AboutSection />
        <div className="my-8 w-full" id="newsletter" aria-label="Newsletter signup">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
