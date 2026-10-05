import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  X, 
  Search, 
  Bookmark, 
  SlidersHorizontal, 
  Sun, 
  Moon, 
  Monitor, 
  ChevronRight,
  Flame,
  Home
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { CATEGORIES } from '../../data/mockArticles';

export default function MobileMenu({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { bookmarksCount } = useBookmarks();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#0c121e] border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between h-full z-10 p-5 overflow-y-auto">
        <div>
          {/* Top Bar with brand and close */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h2 className="font-serif-headline text-xl font-bold text-zinc-900 dark:text-white">
                THE HORIZON
              </h2>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Digital Edition
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar inside drawer */}
          <form onSubmit={handleSearchSubmit} className="mt-4 mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500 border border-transparent"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            </div>
          </form>

          {/* Quick Shortcuts */}
          <div className="space-y-1 mb-6">
            <NavLink
              to="/"
              onClick={onClose}
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>Front Page</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </NavLink>

            <NavLink
              to="/bookmarks"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4" />
                <span>Saved Stories</span>
              </div>
              {bookmarksCount > 0 ? (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-red-600 text-white rounded-full">
                  {bookmarksCount}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              )}
            </NavLink>

            <NavLink
              to="/preferences"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Reading Preferences</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </NavLink>
          </div>

          {/* Categories Navigation */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-3">
              Editorial Sections
            </div>
            <div className="space-y-0.5">
              {CATEGORIES.map(category => (
                <NavLink
                  key={category.id}
                  to={`/category/${category.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
                    }`
                  }
                >
                  <span>{category.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Theme Selector in Drawer */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-6">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2 px-1">
            Display Theme
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'system', label: 'System', icon: Monitor },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                  theme === id
                    ? 'border-red-600 bg-red-50 text-red-600 dark:bg-red-950/50 dark:border-red-500 dark:text-red-400'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
