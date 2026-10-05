import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES, CATEGORIES } from '../data/mockArticles';
import ArticleCard from '../components/articles/ArticleCard';
import { Filter, Sparkles, TrendingUp, Clock, BookOpen } from 'lucide-react';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [filterType, setFilterType] = useState('all'); // all | trending | long-reads

  // Match category by slug or name
  const currentCategory = CATEGORIES.find(
    c => c.id.toLowerCase() === (categoryName || '').toLowerCase() ||
         c.name.toLowerCase() === (categoryName || '').toLowerCase()
  );

  const categoryTitle = currentCategory ? currentCategory.name : (categoryName || 'Category');
  const categoryDesc = currentCategory ? currentCategory.description : 'Curated journalism and investigative analysis.';

  // Filter articles
  let categoryArticles = ARTICLES.filter(
    a => a.category.toLowerCase() === (categoryTitle || '').toLowerCase()
  );

  if (filterType === 'trending') {
    categoryArticles = categoryArticles.filter(a => a.trending);
  } else if (filterType === 'long-reads') {
    categoryArticles = [...categoryArticles].sort((a, b) => {
      const timeA = parseInt(a.readTime) || 0;
      const timeB = parseInt(b.readTime) || 0;
      return timeB - timeA;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Category Header Masthead */}
      <div className="mb-10 pb-8 border-b-2 border-zinc-900 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Section Archive</span>
              <span>•</span>
              <span>{categoryArticles.length} Stories</span>
            </div>
            
            <h1 className="font-serif-headline text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              {categoryTitle}
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {categoryDesc}
            </p>
          </div>

          {/* Sub-Filters */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'all'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilterType('trending')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'trending'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setFilterType('long-reads')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'long-reads'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Deep Dives</span>
            </button>
          </div>
        </div>

        {/* Other Category Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
          <span className="text-zinc-400 font-mono shrink-0 mr-1">Other Sections:</span>
          {CATEGORIES.filter(c => c.name.toLowerCase() !== categoryTitle.toLowerCase()).map(c => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors shrink-0"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categoryArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant={idx === 0 ? "featured" : "standard"}
              className={idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-serif-headline text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            No Stories Found In This Filter
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Try resetting the filter to view all articles in {categoryTitle}.
          </p>
          <button
            onClick={() => setFilterType('all')}
            className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity"
          >
            Show All {categoryTitle} Stories
          </button>
        </div>
      )}

    </div>
  );
}
