import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { ARTICLES } from '../../data/mockArticles';
import Badge from './Badge';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? ARTICLES.filter(a => 
        a.title.toLowerCase().includes(trimmed) ||
        a.description.toLowerCase().includes(trimmed) ||
        a.category.toLowerCase().includes(trimmed) ||
        a.author.name.toLowerCase().includes(trimmed) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(trimmed)))
      ).slice(0, 5)
    : [];

  const handleFullSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectArticle = (id) => {
    onClose();
    navigate(`/article/${id}`);
  };

  const trendingTags = ['AI', 'Quantum', 'Fusion', 'Biotech', 'Markets', 'Climate', 'Aviation'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#111726] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="relative flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, authors, concepts..."
            className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-base focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded"
          >
            ESC
          </button>
        </form>

        {/* Live Search Suggestions & Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {trimmed && searchResults.length > 0 && (
            <div className="pb-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 px-2">
                Matching Articles ({searchResults.length})
              </div>
              <div className="space-y-2">
                {searchResults.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge category={article.category} size="small" clickable={false} />
                        <span className="text-[10px] text-zinc-400 font-mono">{article.readTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                        {article.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleFullSearch}
                className="w-full mt-3 py-2 text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                View all results on dedicated Search page →
              </button>
            </div>
          )}

          {trimmed && searchResults.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No stories found matching "<span className="text-zinc-900 dark:text-white font-medium">{query}</span>"
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Try searching for broader keywords like "AI", "Quantum", "Economy", or "World".
              </p>
            </div>
          )}

          {/* Quick Trending Topics */}
          <div className="pt-4">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 px-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending Search Topics</span>
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {trendingTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    navigate(`/search?q=${encodeURIComponent(tag)}`);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
