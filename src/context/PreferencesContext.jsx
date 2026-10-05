import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { CATEGORIES } from '../data/mockArticles';

const PreferencesContext = createContext();

const DEFAULT_PREFERENCES = {
  fontSize: 'medium', // small | medium | large
  readingWidth: 'comfortable', // narrow | comfortable | wide
  preferredCategories: CATEGORIES.map(c => c.id),
};

export function PreferencesProvider({ children }) {
  const { addToast } = useToast();
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('horizon_preferences');
      if (saved) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed reading preferences from localStorage', e);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('horizon_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Failed saving preferences to localStorage', e);
    }
  }, [preferences]);

  const updatePreferences = (newValues, showToast = true) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newValues };
      if (showToast) {
        addToast('Reading preferences updated', 'success');
      }
      return updated;
    });
  };

  const togglePreferredCategory = (categoryId) => {
    setPreferences(prev => {
      const exists = prev.preferredCategories.includes(categoryId);
      let updatedList;
      if (exists) {
        // Keep at least one category selected
        if (prev.preferredCategories.length <= 1) {
          addToast('At least one preferred category must be selected', 'info');
          return prev;
        }
        updatedList = prev.preferredCategories.filter(id => id !== categoryId);
      } else {
        updatedList = [...prev.preferredCategories, categoryId];
      }
      return { ...prev, preferredCategories: updatedList };
    });
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    addToast('Preferences reset to default values', 'info');
  };

  // Helper styles based on reading width
  const getReadingWidthClass = () => {
    switch (preferences.readingWidth) {
      case 'narrow':
        return 'max-w-2xl'; // ~672px
      case 'wide':
        return 'max-w-4xl'; // ~896px
      case 'comfortable':
      default:
        return 'max-w-3xl'; // ~768px
    }
  };

  // Helper font size classes for reading body
  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case 'small':
        return 'text-base leading-relaxed';
      case 'large':
        return 'text-xl leading-loose';
      case 'medium':
      default:
        return 'text-lg leading-relaxed';
    }
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      updatePreferences,
      togglePreferredCategory,
      resetPreferences,
      getReadingWidthClass,
      getFontSizeClass
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
}
