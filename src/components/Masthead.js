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
    <header className="bg-paper text-ink border-b border-zinc-200 shadow-sm py-8 mb-12">
      <h1 className="font-serif text-5xl tracking-tight text-center mb-8">
        The Data Narrative
      </h1>
      <nav className="flex justify-center gap-x-8 mt-4">
        {NAV_LINKS.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="font-sans text-sm uppercase tracking-widest hover:underline hover:opacity-80 transition"
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="flex justify-center mt-4">
        <button className="border-2 border-ink rounded-full px-6 py-2 font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors shadow-sm hover:scale-105">
          Subscribe
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <div className="nyt-divider h-[1px] bg-zinc-200 w-full my-8" />
      </div>
      <div className="flex justify-center mt-2 text-xs text-zinc-500">
        <span className="hidden md:inline">{dateString} &mdash; Mumbai, India</span>
      </div>
    </header>
  );
}
