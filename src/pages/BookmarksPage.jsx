import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import ArticleCard from '../components/articles/ArticleCard';

export default function BookmarksPage() {
  const { bookmarkedArticles, bookmarksCount, clearBookmarks } = useBookmarks();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter bookmarked articles
  const filteredArticles = selectedCategory === 'All'
    ? bookmarkedArticles
    : bookmarkedArticles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  // Extract unique categories present in bookmarks
  const availableCategories = ['All', ...new Set(bookmarkedArticles.map(a => a.category))];

  // Calculate estimated reading time of library
  const totalReadMinutes = bookmarkedArticles.reduce((acc, curr) => {
    const min = parseInt(curr.readTime) || 5;
    return acc + min;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Bookmarks Header */}
      <div className="mb-10 pb-8 border-b-2 border-zinc-900 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold mb-2">
              <Bookmark className="w-4 h-4 fill-current" />
              <span>Personal Reading List</span>
              <span>•</span>
              <span>LocalStorage Sync</span>
            </div>
            
            <h1 className="font-serif-headline text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Saved Stories
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Curate dispatches to read offline or reference later. Your library is preserved locally on this device.
            </p>
          </div>

          {/* Library Stats & Clear All */}
          {bookmarksCount > 0 && (
            <div className="flex flex-wrap items-center gap-4 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>~{totalReadMinutes} mins total reading</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove all saved stories?")) {
                    clearBookmarks();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filters for Bookmarks */}
        {bookmarksCount > 0 && availableCategories.length > 2 && (
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
            <span className="text-zinc-400 font-mono shrink-0 mr-1">Filter by topic:</span>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks Grid or Empty State */}
      {bookmarksCount > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="standard"
            />
          ))}
        </div>
      ) : (
        /* Empty State Exact to Prompt Specification */
        <div className="py-24 text-center max-w-md mx-auto bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 px-6">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="font-serif-headline text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            No saved stories yet.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">
            Bookmark articles to read them later. Click the bookmark icon on any dispatch across the publication to store it here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-900/20 transition-all hover:gap-3"
          >
            <span>Explore Front Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
}
