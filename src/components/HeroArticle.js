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
    <article className="bg-white/90 rounded-xl shadow-sm px-8 py-8 max-w-3xl mx-auto mb-12">
      <div className="mb-6">
        <div className="w-full h-64 bg-[#E5E5E5] flex items-center justify-center mb-2 rounded-md">
          <span className="text-ink font-serif italic text-lg">Image Placeholder</span>
        </div>
        <div className="text-center text-xs font-serif italic text-zinc-500 mb-4">
          {imageCaption}
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight mb-4">
          {headline}
        </h2>
        <div className="text-xl font-body mb-2">
          {deck}
        </div>
        <div className="flex items-center gap-x-2 text-xs text-zinc-500 mb-4">
          <span>{byline}</span>
          <span>&bull;</span>
          <span>{timestamp}</span>
        </div>
        <div className="nyt-divider h-[1px] bg-zinc-200 w-full my-8" />
      </div>
      <div className="prose prose-lg prose-ink max-w-prose mx-auto">
        <p className="drop-cap">
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
    </article>
  );
}
