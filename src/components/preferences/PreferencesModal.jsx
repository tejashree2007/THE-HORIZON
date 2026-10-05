import React from 'react';
import { X, Sun, Moon, Monitor, Type, Layout, RefreshCw, Check } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES } from '../../data/mockArticles';

export default function PreferencesModal({ isOpen, onClose }) {
  const { preferences, updatePreferences, togglePreferredCategory, resetPreferences } = usePreferences();
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#111726] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 className="font-serif-headline text-lg font-bold text-zinc-900 dark:text-white">
              Reader Preferences
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Customize typography, layout &amp; display for your reading comfort
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preferences"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Theme / Appearance Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Theme &amp; Appearance
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    theme === id
                      ? 'border-red-600 bg-red-50/50 text-red-600 dark:bg-red-950/40 dark:border-red-500 dark:text-red-400 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Editorial Typography Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'small', label: 'Small', sample: '16px' },
                { id: 'medium', label: 'Medium', sample: '18px' },
                { id: 'large', label: 'Large', sample: '21px' },
              ].map(({ id, label, sample }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => updatePreferences({ fontSize: id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    preferences.fontSize === id
                      ? 'border-red-600 bg-red-50/50 text-red-600 dark:bg-red-950/40 dark:border-red-500 dark:text-red-400 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span className="text-xs font-semibold">{label}</span>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{sample}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Column Width */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Article Column Width
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'narrow', label: 'Narrow', desc: 'Focus' },
                { id: 'comfortable', label: 'Comfortable', desc: 'Standard' },
                { id: 'wide', label: 'Wide', desc: 'Expansive' },
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => updatePreferences({ readingWidth: id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    preferences.readingWidth === id
                      ? 'border-red-600 bg-red-50/50 text-red-600 dark:bg-red-950/40 dark:border-red-500 dark:text-red-400 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span className="text-xs font-semibold">{label}</span>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Preferences (Categories) */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Topic Interests
            </label>
            <p className="text-xs text-zinc-400 mb-3">
              Choose the topics prioritized in your feed:
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => {
                const isSelected = preferences.preferredCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => togglePreferredCategory(category.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={resetPreferences}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
