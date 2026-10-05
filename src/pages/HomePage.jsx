import React from 'react';
import { ARTICLES, CATEGORIES } from '../data/mockArticles';
import HeroSection from '../components/articles/HeroSection';
import TrendingSection from '../components/articles/TrendingSection';
import CategorySection from '../components/articles/CategorySection';
import { usePreferences } from '../context/PreferencesContext';
import { Sparkles, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { preferences } = usePreferences();

  // Selected primary featured article (AI reshapes future of work)
  const primaryArticle = ARTICLES.find(a => a.id === 'ai-reshaping-future-of-work-2026') || ARTICLES[0];
  
  // Secondary hero articles
  const secondaryArticles = ARTICLES.filter(
    a => a.featured && a.id !== primaryArticle.id
  ).slice(0, 2);

  // Group articles by category
  const techArticles = ARTICLES.filter(a => a.category === 'Technology' && a.id !== primaryArticle.id);
  const businessArticles = ARTICLES.filter(a => a.category === 'Business');
  const scienceArticles = ARTICLES.filter(a => a.category === 'Science');
  const worldArticles = ARTICLES.filter(a => a.category === 'World');
  const entertainmentArticles = ARTICLES.filter(a => a.category === 'Entertainment');
  const sportsArticles = ARTICLES.filter(a => a.category === 'Sports');
  const lifestyleArticles = ARTICLES.filter(a => a.category === 'Lifestyle');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Editorial Welcome Banner / Edition Stamp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500">
            Today's Dispatch
          </span>
          <h2 className="font-serif-headline text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
            Essential Frontline Journalism &amp; Deep Analysis
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Explore 35+ Stories</span>
          </Link>
        </div>
      </div>

      {/* HERO SECTION: 1 Primary + 2 Secondary */}
      <HeroSection
        primaryArticle={primaryArticle}
        secondaryArticles={secondaryArticles}
      />

      {/* TRENDING SECTION: 01, 02, 03... */}
      <TrendingSection articles={ARTICLES} />

      {/* EDITORIAL CATEGORY SECTIONS (WITH DIVERSE EDITORIAL LAYOUTS) */}

      {/* 1. Technology (Featured Lead + Compact List) */}
      <CategorySection
        title="Technology &amp; Artificial Intelligence"
        categorySlug="technology"
        description="Autonomous agents, quantum computing, and silicon architectures."
        articles={techArticles}
        layout="featured-plus-list"
      />

      {/* 2. Business & Macroeconomics (Horizontal List) */}
      <CategorySection
        title="Business &amp; Global Markets"
        categorySlug="business"
        description="Sovereign reserve shifts, venture capital in biotech, and chip manufacturing."
        articles={businessArticles}
        layout="horizontal-list"
      />

      {/* Quote / Editorial Manifesto Callout */}
      <div className="my-14 p-8 sm:p-12 rounded-2xl bg-zinc-900 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <Quote className="w-16 h-16 text-zinc-800 absolute right-6 bottom-4 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
            The Horizon Editorial Stance
          </span>
          <p className="font-serif-headline text-xl sm:text-2xl lg:text-3xl font-normal leading-relaxed mt-3 mb-4 text-zinc-100">
            "The function of modern journalism is not to accelerate panic, but to deliver the structural clarity required to understand history as it unfolds."
          </p>
          <div className="text-xs font-mono text-zinc-400">
            — From the Editors’ Desk • Global Edition
          </div>
        </div>
      </div>

      {/* 3. Science (3-Column Grid) */}
      <CategorySection
        title="Science &amp; Deep Space"
        categorySlug="science"
        description="Clean baseload fusion, benthic oceanography, and atmospheric exoplanets."
        articles={scienceArticles}
        layout="grid-3"
      />

      {/* 4. World Affairs (2-Column Wide Cards) */}
      <CategorySection
        title="World Affairs &amp; Geopolitics"
        categorySlug="world"
        description="Transboundary treaties, megacity decentralization, and high-speed rail."
        articles={worldArticles}
        layout="grid-2"
      />

      {/* 5. Entertainment & Culture (Horizontal List) */}
      <CategorySection
        title="Entertainment &amp; Arts"
        categorySlug="entertainment"
        description="Analog 70mm celluloid resurgence, hybrid AI symphonies, and indie gaming."
        articles={entertainmentArticles}
        layout="horizontal-list"
      />

      {/* 6. Sports & Athletic Science (3-Column Grid) */}
      <CategorySection
        title="Sports &amp; Human Performance"
        categorySlug="sports"
        description="Neuro-pacing marathons, Formula 1 synthetic e-fuels, and touchline vision analytics."
        articles={sportsArticles}
        layout="grid-3"
      />

      {/* 7. Modern Lifestyle & Architecture (Featured + List) */}
      <CategorySection
        title="Lifestyle &amp; Architecture"
        categorySlug="lifestyle"
        description="Living mass timber skylines, circadian sleep neuroscience, and zero-waste dining."
        articles={lifestyleArticles}
        layout="featured-plus-list"
      />

    </div>
  );
}
