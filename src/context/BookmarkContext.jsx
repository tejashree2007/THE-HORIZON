import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { ARTICLES } from '../data/mockArticles';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { addToast } = useToast();
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('horizon_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed reading bookmarks from localStorage', e);
    }
    // Default initial bookmarks to provide immediate delightful experience
    return ['ai-reshaping-future-of-work-2026', 'clean-energy-fusion-milestone-grid-integration'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('horizon_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed saving bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const isBookmarked = useCallback((articleId) => {
    return bookmarks.includes(articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((articleId) => {
    const article = ARTICLES.find(a => a.id === articleId);
    const titleSnippet = article ? `"${article.title.slice(0, 30)}..."` : 'Story';

    setBookmarks(prev => {
      const exists = prev.includes(articleId);
      if (exists) {
        addToast(`Removed ${titleSnippet} from bookmarks`, 'bookmark-remove');
        return prev.filter(id => id !== articleId);
      } else {
        addToast(`Saved ${titleSnippet} to bookmarks`, 'bookmark-add');
        return [...prev, articleId];
      }
    });
  }, [addToast]);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    addToast('Cleared all saved bookmarks', 'info');
  }, [addToast]);

  const bookmarkedArticles = ARTICLES.filter(article => bookmarks.includes(article.id));

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      bookmarkedArticles,
      bookmarksCount: bookmarks.length,
      isBookmarked,
      toggleBookmark,
      clearBookmarks
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
}
