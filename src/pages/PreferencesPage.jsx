import React from 'react';
import { 
  Sun, 
  Moon, 
  Monitor, 
  SlidersHorizontal, 
  Type, 
  Layout, 
  RotateCcw, 
  Check, 
  Eye,
  CheckCircle2
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/mockArticles';

export default function PreferencesPage() {
  const { preferences, updatePreferences, togglePreferredCategory, resetPreferences, getReadingWidthClass, getFontSizeClass } = usePreferences();
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="mb-10 pb-8 border-b-2 border-zinc-900 dark:border-zinc-700">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold mb-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Reader Customization Engine</span>
        </div>
        <h1 className="font-serif-headline text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white">
          Reading Preferences
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed max-w-2xl">
          Fine-tune the typography scale, viewport column widths, dark mode behaviors, and curated editorial topics. Changes take effect across all dispatches and persist in LocalStorage.
        </p>
      </div>

      <div className="space-y-10">
        
        {/* SECTION 1: Appearance / Theme */}
        <section className="p-6 sm:p-8 bg-white dark:bg-[#111726] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Sun className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="font-serif-headline text-xl font-bold text-zinc-900 dark:text-white">
              Appearance &amp; Color Scheme
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Choose whether to adapt automatically to your operating system or lock into deep obsidian ink or crisp paper white.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'light', title: 'Light Mode', desc: 'Crisp paper white with high editorial contrast', icon: Sun },
              { id: 'dark', title: 'Dark Mode', desc: 'Deep obsidian backdrop gentle on evening eyes', icon: Moon },
              { id: 'system', title: 'System Default', desc: 'Matches your OS and device schedule', icon: Monitor },
            ].map(({ id, title, desc, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  theme === id
                    ? 'border-red-600 bg-red-50/50 dark:bg-red-950/40 dark:border-red-500 shadow-md ring-1 ring-red-500'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${theme === id ? 'bg-red-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {theme === id && (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-red-600 dark:text-red-400 uppercase">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 2: Typography & Font Scale */}
        <section className="p-6 sm:p-8 bg-white dark:bg-[#111726] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Type className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="font-serif-headline text-xl font-bold text-zinc-900 dark:text-white">
              Editorial Typography Size
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Adjust the baseline font size and paragraph leading for comfortable long-form article immersion.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'small', label: 'Compact', size: '16px / 1.625', desc: 'Higher information density for fast scanning' },
              { id: 'medium', label: 'Comfortable (Standard)', size: '18px / 1.75', desc: 'The balanced classic magazine reading ratio' },
              { id: 'large', label: 'Large & Expansive', size: '21px / 2.0', desc: 'Relaxed reading experience with generous line height' },
            ].map(({ id, label, size, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => updatePreferences({ fontSize: id })}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  preferences.fontSize === id
                    ? 'border-red-600 bg-red-50/50 dark:bg-red-950/40 dark:border-red-500 shadow-md ring-1 ring-red-500'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {size}
                  </span>
                  {preferences.fontSize === id && (
                    <Check className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white mb-1">
                    {label}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 3: Article Column Width */}
        <section className="p-6 sm:p-8 bg-white dark:bg-[#111726] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Layout className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="font-serif-headline text-xl font-bold text-zinc-900 dark:text-white">
              Article Content Width
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Control the maximum line width of article text to minimize eye fatigue during extended reading sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'narrow', label: 'Narrow Focus', width: '672px max', desc: 'Ideal for laser focus and single-gaze tracking' },
              { id: 'comfortable', label: 'Comfortable Editorial', width: '768px max', desc: 'Standard book and prestigious journal measure' },
              { id: 'wide', label: 'Expansive Width', width: '896px max', desc: 'Allows inline media, quotes, and wide scanning' },
            ].map(({ id, label, width, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => updatePreferences({ readingWidth: id })}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  preferences.readingWidth === id
                    ? 'border-red-600 bg-red-50/50 dark:bg-red-950/40 dark:border-red-500 shadow-md ring-1 ring-red-500'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {width}
                  </span>
                  {preferences.readingWidth === id && (
                    <Check className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white mb-1">
                    {label}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 4: Category Interests */}
        <section className="p-6 sm:p-8 bg-white dark:bg-[#111726] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <CheckCircle2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="font-serif-headline text-xl font-bold text-zinc-900 dark:text-white">
              Preferred Topic Dispatches
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Toggle which areas of inquiry are prioritized in your feed and digest notifications:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map(category => {
              const isSelected = preferences.preferredCategories.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => togglePreferredCategory(category.id)}
                  className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <span>{category.name}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* LIVE PREVIEW BOX */}
        <section className="p-6 sm:p-8 bg-zinc-50 dark:bg-[#0c121e] rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <Eye className="w-4 h-4 text-red-500" />
              <span>Live Article Experience Preview</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              {preferences.fontSize.toUpperCase()} • {preferences.readingWidth.toUpperCase()}
            </span>
          </div>

          <div className={`mx-auto bg-white dark:bg-[#111726] p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm ${getReadingWidthClass()} transition-all`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 block mb-2">
              Preview • Technology &amp; Science
            </span>
            <h3 className="font-serif-headline text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
              The Architecture of Tomorrow’s Thought
            </h3>
            <div className={`font-editorial-body text-zinc-700 dark:text-zinc-300 ${getFontSizeClass()} space-y-4`}>
              <p>
                In the quiet spaces between computational breakthrough and human intuition, modern inquiry finds its purest expression. When words are given room to breathe, ideas transform into catalysts for systemic change.
              </p>
              <blockquote className="my-4 p-4 border-l-4 border-red-600 bg-red-50/50 dark:bg-red-950/20 italic font-serif text-zinc-800 dark:text-zinc-200">
                "Design is not merely what it looks like and feels like. Design is how clarity is attained."
              </blockquote>
            </div>
          </div>
        </section>

        {/* RESET DEFAULTS BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={resetPreferences}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Preferences to Defaults</span>
          </button>
        </div>

      </div>

    </div>
  );
}
