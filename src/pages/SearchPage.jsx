import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/mockArticles';
import ArticleCard from '../components/articles/ArticleCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('relevant'); // relevant | latest | readTime

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const params = {};
    if (query.trim()) params.q = query.trim();
    if (selectedCategory !== 'All') params.category = selectedCategory;
    setSearchParams(params);
  };

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const params = {};
    if (query.trim()) params.q = query.trim();
    if (catName !== 'All') params.category = catName;
    setSearchParams(params);
  };

  // Perform dynamic filtering
  const trimmed = query.trim().toLowerCase();
  let results = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;
    if (!trimmed) return true;

    const matchesTitle = article.title.toLowerCase().includes(trimmed);
    const matchesDesc = article.description.toLowerCase().includes(trimmed);
    const matchesAuthor = article.author?.name.toLowerCase().includes(trimmed);
    const matchesCat = article.category.toLowerCase().includes(trimmed);
    const matchesTags = article.tags?.some((t) => t.toLowerCase().includes(trimmed));

    return matchesTitle || matchesDesc || matchesAuthor || matchesCat || matchesTags;
  });

  // Sorting
  if (sortBy === 'latest') {
    results = [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'readTime') {
    results = [...results].sort((a, b) => (parseInt(b.readTime) || 0) - (parseInt(a.readTime) || 0));
  }

  const popularKeywords = ['AI', 'Quantum', 'Fusion', 'Biotech', 'Markets', 'Climate', 'Aviation', 'Architecture'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
          The Horizon Global Archive
        </span>
        <h1 className="font-serif-headline text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white mt-1 mb-4">
          Search Dispatches
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          Explore over 35 investigative essays, scientific milestones, and market analyses.
        </p>

        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="mt-8 relative flex items-center shadow-lg rounded-2xl">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Also sync URL params seamlessly
              const params = {};
              if (e.target.value.trim()) params.q = e.target.value.trim();
              if (selectedCategory !== 'All') params.category = selectedCategory;
              setSearchParams(params);
            }}
            placeholder="Search keywords, authors, scientific topics, geopolitical accords..."
            className="w-full pl-12 pr-28 py-4 bg-white dark:bg-[#111726] border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-base focus:outline-hidden focus:ring-2 focus:ring-red-500 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                const params = {};
                if (selectedCategory !== 'All') params.category = selectedCategory;
                setSearchParams(params);
              }}
              className="absolute right-20 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="text-zinc-400 font-mono">Suggested:</span>
          {popularKeywords.map(kw => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setQuery(kw);
                const params = { q: kw };
                if (selectedCategory !== 'All') params.category = selectedCategory;
                setSearchParams(params);
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              #{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All Sections
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs shrink-0">
          <span className="text-zinc-500 dark:text-zinc-400 font-mono">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs focus:outline-hidden"
          >
            <option value="relevant">Relevance</option>
            <option value="latest">Latest Dispatches</option>
            <option value="readTime">In-Depth (Read Time)</option>
          </select>
        </div>
      </div>

      {/* Results Header Counter */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          {trimmed ? (
            <>
              Search results for "<span className="text-zinc-900 dark:text-white font-bold">{query}</span>" —{' '}
              <span className="text-red-600 dark:text-red-400 font-bold">{results.length} Stories</span>
            </>
          ) : (
            <>
              Browsing {selectedCategory === 'All' ? 'All Stories' : selectedCategory} —{' '}
              <span className="text-red-600 dark:text-red-400 font-bold">{results.length} Stories</span>
            </>
          )}
        </h2>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {results.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="standard"
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center max-w-lg mx-auto bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 px-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-serif-headline text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            No Stories Found
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            We couldn't find any articles matching "<span className="font-semibold text-zinc-900 dark:text-zinc-200">{query}</span>" in {selectedCategory}. Try adjusting your keywords or clearing the category filter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
                setSearchParams({});
              }}
              className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Reset All Filters
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Back to Front Page
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
