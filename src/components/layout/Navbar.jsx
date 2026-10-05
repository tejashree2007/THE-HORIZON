import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  SlidersHorizontal,
  Compass,
  Flame
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { CATEGORIES } from '../../data/mockArticles';
import SearchModal from '../ui/SearchModal';
import PreferencesModal from '../preferences/PreferencesModal';

export default function Navbar({ onOpenMobileMenu }) {
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const { bookmarksCount } = useBookmarks();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#090D14]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        {/* Main Masthead / Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 border-b border-zinc-100 dark:border-zinc-800/60">
            
            {/* Left: Mobile hamburger & Quick date / tagline */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenMobileMenu}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden lg:block">
                <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block">
                  Independent Journalism
                </span>
                <span className="text-xs font-serif italic text-zinc-600 dark:text-zinc-400">
                  Vol. XIV • Global Edition
                </span>
              </div>
            </div>

            {/* Center: Editorial Masthead Logo */}
            <div className="text-center">
              <Link to="/" className="inline-block group">
                <h1 className="font-serif-headline text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  THE HORIZON
                </h1>
                <span className="hidden sm:block text-[9px] font-mono tracking-[0.25em] text-zinc-500 dark:text-zinc-400 uppercase -mt-0.5">
                  Journal of Frontier Science, Tech &amp; Global Culture
                </span>
              </Link>
            </div>

            {/* Right: Quick actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search articles"
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-xs font-medium">Search</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
                  ⌘K
                </kbd>
              </button>

              {/* Bookmarks */}
              <Link
                to="/bookmarks"
                aria-label={`Saved stories (${bookmarksCount})`}
                className={`relative flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl transition-colors ${
                  location.pathname === '/bookmarks'
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Saved Stories"
              >
                <Bookmark className={`w-4 h-4 ${bookmarksCount > 0 ? 'fill-current text-red-600 dark:text-red-500' : ''}`} />
                <span className="hidden md:inline text-xs font-medium">Saved</span>
                {bookmarksCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-bold text-white bg-red-600 rounded-full">
                    {bookmarksCount}
                  </span>
                )}
              </Link>

              {/* Preferences Button */}
              <button
                type="button"
                onClick={() => setIsPrefsOpen(true)}
                aria-label="Reading preferences"
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                title="Reading Preferences"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch theme (current: ${theme})`}
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                title={`Theme: ${theme.toUpperCase()}`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-600" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Categories Sub-Nav Bar */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 py-2.5 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/40 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                }`
              }
            >
              Home
            </NavLink>

            {CATEGORIES.map(cat => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/40 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}

            <Link
              to="/preferences"
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/preferences'
                  ? 'text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/40 font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              Preferences
            </Link>
          </nav>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <PreferencesModal
        isOpen={isPrefsOpen}
        onClose={() => setIsPrefsOpen(false)}
      />
    </>
  );
}
