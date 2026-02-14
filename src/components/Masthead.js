import React from 'react';
import Link from 'next/link';
import MastheadAdminLink from './MastheadAdminLink';

const NAV_LINKS = [
  { name: 'Markets', href: '/#markets' },
  { name: 'Property', href: '/#property' },
  { name: 'About', href: '/about' },
];

export default function Masthead() {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="bg-paper text-ink border-b border-zinc-200 shadow-sm py-8 mb-12">
      <Link href="/" className="block">
        <h1 className="font-serif text-6xl tracking-tighter text-center mb-8 hover:opacity-90 transition">
          The Data Narrative
        </h1>
      </Link>
      <nav className="flex justify-center items-center gap-x-8 mt-4 flex-wrap">
        {NAV_LINKS.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className="font-sans text-sm uppercase tracking-widest hover:underline hover:opacity-80 transition"
          >
            {link.name}
          </Link>
        ))}
        <MastheadAdminLink />
      </nav>
      <div className="flex justify-center mt-4">
        <Link
          href="/#newsletter"
          className="inline-block border-2 border-ink rounded-full px-6 py-2 font-sans font-semibold text-ink bg-paper hover:bg-ink hover:text-paper transition-colors shadow-sm hover:scale-105"
        >
          Subscribe
        </Link>
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
