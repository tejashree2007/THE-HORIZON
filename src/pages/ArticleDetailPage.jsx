import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  ArrowLeft, 
  ChevronRight, 
  Type, 
  Maximize2, 
  Minimize2, 
  ThumbsUp, 
  Heart, 
  Sparkles,
  Check
} from 'lucide-react';
import { ARTICLES } from '../data/mockArticles';
import Badge from '../components/ui/Badge';
import BookmarkButton from '../components/articles/BookmarkButton';
import ArticleCard from '../components/articles/ArticleCard';
import ShareModal from '../components/ui/ShareModal';
import PreferencesModal from '../components/preferences/PreferencesModal';
import ReadingProgressBar from '../components/layout/ReadingProgressBar';
import { usePreferences } from '../context/PreferencesContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useToast } from '../context/ToastContext';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preferences, updatePreferences, getReadingWidthClass, getFontSizeClass } = usePreferences();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { addToast } = useToast();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const [reactions, setReactions] = useState({ insightful: 42, inspiring: 19, analytical: 31 });
  const [userReacted, setUserReacted] = useState({});

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif-headline text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Story Not Found
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          The dispatch you are seeking might have been archived or moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </Link>
      </div>
    );
  }

  // Related articles from same category
  const relatedArticles = ARTICLES.filter(
    a => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

  const handleReaction = (type) => {
    if (userReacted[type]) return;
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setUserReacted(prev => ({ ...prev, [type]: true }));
    addToast(`Marked story as ${type.charAt(0).toUpperCase() + type.slice(1)}`, 'success');
  };

  return (
    <>
      <ReadingProgressBar />

      <article className="min-h-screen pb-20 animate-in fade-in duration-300">
        
        {/* Sticky Article Actions Bar */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white/90 dark:bg-[#090D14]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 py-2.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium py-1 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
              <span className="font-serif-headline text-zinc-800 dark:text-zinc-200 font-bold truncate max-w-xs md:max-w-md hidden md:inline">
                {article.title}
              </span>
            </div>

            {/* Quick reading adjustments */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Font Size Pills */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => updatePreferences({ fontSize: 'small' }, false)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                    preferences.fontSize === 'small'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                  }`}
                  title="Small font"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => updatePreferences({ fontSize: 'medium' }, false)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                    preferences.fontSize === 'medium'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                  }`}
                  title="Medium font"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => updatePreferences({ fontSize: 'large' }, false)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                    preferences.fontSize === 'large'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                  }`}
                  title="Large font"
                >
                  A+
                </button>
              </div>

              {/* Bookmark Toggle */}
              <button
                type="button"
                onClick={() => toggleBookmark(article.id)}
                className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  isBookmarked(article.id)
                    ? 'border-red-600 bg-red-50 text-red-600 dark:bg-red-950/40 dark:border-red-500 dark:text-red-400'
                    : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title={isBookmarked(article.id) ? "Saved" : "Save story"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline font-medium">
                  {isBookmarked(article.id) ? 'Saved' : 'Save'}
                </span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                title="Share article"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Container with dynamic reading width */}
        <div className={`mx-auto px-4 sm:px-6 pt-8 sm:pt-12 ${getReadingWidthClass()} transition-all duration-300`}>
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Front Page
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <Link to={`/category/${article.category.toLowerCase()}`} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {article.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-400 dark:text-zinc-600 truncate">Dispatch #{article.id.slice(0, 8)}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <Badge category={article.category} size="default" />
          </div>

          {/* Large Article Headline */}
          <h1 className="font-serif-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            {article.title}
          </h1>

          {/* Article Subtitle / Standfirst */}
          {article.subtitle && (
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 border-l-2 border-red-600 pl-4">
              {article.subtitle}
            </p>
          )}

          {/* Author Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800 mb-8">
            <div className="flex items-center gap-3">
              {article.author?.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
                />
              )}
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {article.author?.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {article.author?.role || 'Staff Correspondent'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <figure className="mb-10">
            <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 shadow-md">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-2.5 px-1 flex items-center justify-between">
                <span>{article.imageCaption}</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline">The Horizon Archives</span>
              </figcaption>
            )}
          </figure>

          {/* Key Takeaways Callout Box */}
          <div className="mb-10 p-6 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 dark:text-zinc-100">
                Key Editorial Takeaways
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>Structural transformation across knowledge sectors driven by autonomous reasoning pipelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>The economic bottleneck has relocated from syntax generation to human critical oversight.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span>Decentralized infrastructure models are replacing legacy single-point clearing networks.</span>
              </li>
            </ul>
          </div>

          {/* ARTICLE CONTENT (With customizable font size and drop-cap) */}
          <div 
            className={`article-drop-cap font-editorial-body text-zinc-800 dark:text-zinc-200 space-y-6 ${getFontSizeClass()} [&>p]:leading-relaxed [&>h2]:font-serif-headline [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-zinc-900 [&>h2]:dark:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:border-l-4 [&>blockquote]:border-red-600 [&>blockquote]:bg-red-50/40 [&>blockquote]:dark:bg-red-950/20 [&>blockquote]:rounded-r-xl [&>blockquote]:font-serif [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:sm:text-2xl [&>blockquote]:text-zinc-900 [&>blockquote]:dark:text-zinc-100`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Related Topics &amp; Filed Under
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reader Reaction Pills */}
          <div className="my-10 p-6 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                How did this dispatch resonate with you?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Join {reactions.insightful + reactions.inspiring + reactions.analytical} readers who provided feedback
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleReaction('insightful')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  userReacted.insightful
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                }`}
              >
                <span>💡 Insightful</span>
                <span className="font-mono text-[11px] opacity-80">{reactions.insightful}</span>
              </button>
              <button
                onClick={() => handleReaction('inspiring')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  userReacted.inspiring
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                }`}
              >
                <span>🔥 Inspiring</span>
                <span className="font-mono text-[11px] opacity-80">{reactions.inspiring}</span>
              </button>
              <button
                onClick={() => handleReaction('analytical')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  userReacted.analytical
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                }`}
              >
                <span>🎯 Analytical</span>
                <span className="font-mono text-[11px] opacity-80">{reactions.analytical}</span>
              </button>
            </div>
          </div>

          {/* Author Biography Card */}
          {article.author && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-14">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-red-600 shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
                  About the Author
                </span>
                <h4 className="font-serif-headline text-lg font-bold text-zinc-900 dark:text-white mt-0.5">
                  {article.author.name}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  {article.author.role}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Related Articles Section (Full Max Width) */}
        {relatedArticles.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t-2 border-zinc-900 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">
                  Continue Reading
                </span>
                <h3 className="font-serif-headline text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                  More in {article.category}
                </h3>
              </div>
              <Link
                to={`/category/${article.category.toLowerCase()}`}
                className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400"
              >
                View all {article.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArt) => (
                <ArticleCard
                  key={relArt.id}
                  article={relArt}
                  variant="standard"
                />
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        article={article}
      />

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPrefsOpen}
        onClose={() => setIsPrefsOpen(false)}
      />
    </>
  );
}
