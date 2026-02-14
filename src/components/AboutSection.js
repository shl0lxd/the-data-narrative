import React from 'react';

export default function AboutSection() {
  return (
    <section className="bg-paper text-ink w-full flex flex-col items-center py-10 prose-nyt">
      {/* Lead Headline */}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6">
        Where Code Meets Capital
      </h2>

      {/* Bio & Headshot */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 w-full max-w-2xl mx-auto">
        {/* Headshot Placeholder */}
        <div className="w-24 h-24 bg-[#E5E5E5] rounded-full flex items-center justify-center mb-4 md:mb-0">
          <span className="font-serif italic text-ink text-xs">Headshot</span>
        </div>
        {/* Bio Narrative */}
        <div className="flex-1">
          <p className="font-serif text-lg mb-2">
            I am a Software Development Engineer (SDE) based in Mumbai.
          </p>
          <p className="font-serif mb-2">
            I use Python and PostgreSQL to mine local datasets—from property price trends in Mumbai suburbs to Indian stock market anomalies.
          </p>
          <p className="font-serif">
            My goal is to bridge the gap between complex raw data and human-readable financial narratives.
          </p>
        </div>
      </div>

      {/* Methodology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mx-auto mt-4">
        {/* Scrape */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-sm mb-2">Scrape</div>
          <div className="font-sans text-xs text-center opacity-80">
            Automating data collection from reliable sources.
          </div>
        </div>
        {/* Analyze */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-sm mb-2">Analyze</div>
          <div className="font-sans text-xs text-center opacity-80">
            Using quantitative models to find the signal in the noise.
          </div>
        </div>
        {/* Explain */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-sm mb-2">Explain</div>
          <div className="font-sans text-xs text-center opacity-80">
            Translating those signals into editorial-style insights.
          </div>
        </div>
      </div>
    </section>
  );
}
