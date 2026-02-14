import React from 'react';

export default function AboutSection() {
  return (
    <section className="bg-white/90 rounded-xl shadow-sm px-8 py-8 max-w-3xl mx-auto mb-12">
      {/* Lead Headline */}
      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-center mb-8">
        Where Code Meets Capital
      </h2>

      {/* Bio & Headshot */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Scrape */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-base mb-2">Scrape</div>
          <div className="font-sans text-sm text-center opacity-80">
            Automating data collection from reliable sources.
          </div>
        </div>
        {/* Analyze */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-base mb-2">Analyze</div>
          <div className="font-sans text-sm text-center opacity-80">
            Using quantitative models to find the signal in the noise.
          </div>
        </div>
        {/* Explain */}
        <div className="flex flex-col items-center">
          <div className="font-sans font-bold text-base mb-2">Explain</div>
          <div className="font-sans text-sm text-center opacity-80">
            Translating those signals into editorial-style insights.
          </div>
        </div>
      </div>
    </section>
  );
}
