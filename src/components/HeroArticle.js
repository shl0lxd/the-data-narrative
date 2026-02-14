import React from 'react';

export default function HeroArticle({
  headline = "Mumbai's Property Market Surges in 2026",
  deck = "A record-setting year for real estate in Bandra West, driven by new data and shifting demographics.",
  byline = "By Shlok",
  timestamp = "February 14, 2026",
  imageAlt = "Mumbai skyline",
  imageCaption = "The Bandra West skyline, 2026",
  keyMetric = "12.4% Increase in Bandra West",
  children,
}) {
  return (
    <article className="bg-paper text-ink w-full flex flex-col items-center py-8">
      {/* Image Placeholder */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-full h-64 bg-[#E5E5E5] flex items-center justify-center mb-2 rounded-md">
          <span className="text-ink font-serif italic text-lg">Image Placeholder</span>
        </div>
        <div className="text-center text-sm font-serif italic text-ink mb-6">
          {imageCaption}
        </div>
      </div>

      {/* Header Section */}
      <header className="w-full max-w-2xl mx-auto">
        <h2 className="font-serif text-5xl font-bold mb-4 text-center tracking-tight">
          {headline}
        </h2>
        <div className="text-xl font-body text-center mb-4">
          {deck}
        </div>
        <div className="flex flex-col items-center mb-2">
          <div className="text-sm font-sans text-ink mb-1">
            {byline}
          </div>
          <hr className="nyt-divider w-full max-w-xs mb-1" />
          <div className="text-xs font-sans text-ink">
            {timestamp}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Data Inset Sidebar (desktop only) */}
        <aside className="hidden md:block absolute right-[-260px] top-0 w-56 bg-paper border-t border-[#E5E5E5] p-4 text-ink">
          <div className="font-sans font-bold text-xs mb-2">Key Metric</div>
          <div className="font-sans text-sm font-bold text-ink">{keyMetric}</div>
        </aside>

        {/* Article Body */}
        <div className="prose-nyt mx-auto">
          <p className="drop-cap mb-6">
            Mumbai’s real estate market has seen unprecedented growth in 2026, with Bandra West leading the surge. New data reveals a 12.4% increase in property values, driven by shifting demographics and increased demand for premium housing.
          </p>
          {/* Additional paragraphs or children */}
          {children || (
            <>
              <p>
                Experts attribute this rise to a combination of economic optimism, improved infrastructure, and a growing influx of young professionals. The city’s transformation is evident in the skyline, with new developments reshaping neighborhoods and attracting global investors.
              </p>
              <p>
                As Mumbai continues to evolve, Bandra West stands as a testament to the city’s resilience and ambition, setting new benchmarks for urban living in India.
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
