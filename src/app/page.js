
import Masthead from '../components/Masthead';
import HeroArticle from '../components/HeroArticle';
import AboutSection from '../components/AboutSection';
import NewsletterForm from '../components/NewsletterForm';
import DataChartSection from '../components/DataChartSection';

export default function HomePage() {
  // Example chart data
  const chartData = [
    { date: '2026-01', value: 120 },
    { date: '2026-02', value: 130 },
    { date: '2026-03', value: 125 },
    { date: '2026-04', value: 140 },
  ];

  return (
    <main className="bg-paper text-ink min-h-screen">
      <Masthead />
      <section className="flex flex-col items-center">
        <HeroArticle />
        <div className="my-8 w-full max-w-2xl">
          <DataChartSection data={chartData} />
        </div>
        <AboutSection />
        <div className="my-8">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
