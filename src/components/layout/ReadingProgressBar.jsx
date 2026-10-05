import React, { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (scrollProgress <= 0) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
