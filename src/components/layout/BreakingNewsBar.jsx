import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, CloudSun } from 'lucide-react';
import { BREAKING_NEWS } from '../../data/mockArticles';

export default function BreakingNewsBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % BREAKING_NEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + BREAKING_NEWS.length) % BREAKING_NEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % BREAKING_NEWS.length);
  };

  const currentItem = BREAKING_NEWS[currentIndex];

  // Editorial date format
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date('2026-10-04T12:00:00Z'));

  return (
    <div className="bg-zinc-900 text-zinc-200 text-xs py-2 px-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Breaking item ticker */}
        <div 
          className="flex items-center gap-3 w-full md:w-auto overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-1.5 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shrink-0 animate-pulse">
            <Zap className="w-3 h-3 fill-current" />
            <span>Breaking</span>
          </div>

          <div className="flex items-center gap-2 overflow-hidden flex-grow min-w-0">
            <Link
              to={currentItem.link}
              className="text-zinc-200 hover:text-white transition-colors truncate font-medium text-xs tracking-tight"
            >
              {currentItem.text}
            </Link>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              onClick={handlePrev}
              aria-label="Previous breaking news"
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-zinc-500 font-mono">
              {currentIndex + 1}/{BREAKING_NEWS.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next breaking news"
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Date and Global Weather preview */}
        <div className="hidden lg:flex items-center gap-4 text-zinc-400 font-mono text-[11px] shrink-0">
          <div className="flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>Global Edition • London 16°C • Tokyo 22°C • NYC 19°C</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span>{todayFormatted}</span>
        </div>
      </div>
    </div>
  );
}
