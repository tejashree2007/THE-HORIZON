import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';

export default function BookmarkButton({ articleId, size = 'default', className = '' }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(articleId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(articleId);
  };

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <button
      onClick={handleClick}
      type="button"
      title={bookmarked ? "Remove from bookmarks" : "Save article"}
      aria-label={bookmarked ? "Remove from bookmarks" : "Save article"}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-200 group ${
        isSmall 
          ? 'p-1.5' 
          : isLarge 
            ? 'p-3' 
            : 'p-2'
      } ${
        bookmarked
          ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 shadow-sm'
          : 'bg-white/80 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
      } ${className}`}
    >
      <Bookmark
        className={`transition-transform duration-200 group-hover:scale-110 ${
          isSmall ? 'w-3.5 h-3.5' : isLarge ? 'w-5 h-5' : 'w-4 h-4'
        } ${bookmarked ? 'fill-current text-red-600 dark:text-red-500' : ''}`}
      />
    </button>
  );
}
