import React from 'react';

const NAV_LINKS = [
  { name: 'Markets', href: '#' },
  { name: 'Property', href: '#' },
  { name: 'About', href: '#' },
];

export default function Masthead() {
  // Get current date in readable format
  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="bg-paper text-ink w-full">
      {/* Top Row: Brand Name */}
      <div className="flex justify-center items-center py-6">
        <h1 className="font-serif text-6xl font-bold text-center tracking-tight">
          The Data Narrative
        </h1>
      </div>

      {/* Middle Row: Divider */}
      <hr className="nyt-divider mx-auto w-full" />

      {/* Info Bar */}
      <div className="flex flex-row items-center justify-between py-2 px-4 md:px-8 prose-nyt text-xs md:text-sm uppercase font-sans">
        {/* Left: Date & Location (hide date on mobile) */}
        <div className="hidden md:block">
          {dateString} &mdash; Mumbai, India
        </div>
        {/* Center: Navigation Links */}
        <nav className="flex-1 flex justify-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-xs md:text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/* Right: Subscribe Button */}
        <div className="flex justify-end">
          <button
            className="border border-ink rounded px-4 py-1 text-ink bg-transparent font-sans text-xs md:text-sm uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
            type="button"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Row: Divider */}
      <hr className="nyt-divider mx-auto w-full" />
    </header>
  );
}
