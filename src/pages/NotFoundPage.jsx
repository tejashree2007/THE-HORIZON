import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold block mb-2">
        Error 404 • Missing Dispatch
      </span>
      <h1 className="font-serif-headline text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
        The archive entry or section you requested is not currently indexed in this edition of The Horizon.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Front Page</span>
      </Link>
    </div>
  );
}
