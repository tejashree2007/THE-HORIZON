import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import BookmarkButton from './BookmarkButton';

export default function TrendingSection({ articles = [] }) {
  const navigate = useNavigate();
  // Filter or sort trending items
  const trendingArticles = articles
    .filter(a => a.trending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 6);

  if (trendingArticles.length === 0) return null;

  return (
    <section className="mb-14 lg:mb-20 bg-zinc-50/70 dark:bg-[#0c121e] border-y border-zinc-200/80 dark:border-zinc-800/80 py-8 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-headline text-zinc-900 dark:text-white">
                Trending Dispatches
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Most read and debated across all editions right now
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
            Ranked Real-Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map((article, index) => {
            const rank = String(article.trendingRank || index + 1).padStart(2, '0');
            return (
              <div
                key={article.id}
                onClick={() => navigate(`/article/${article.id}`)}
                className="group relative flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#111726] border border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {/* Large Distinctive Editorial Rank */}
                <div className="font-serif-headline text-3xl sm:text-4xl font-black text-zinc-300 dark:text-zinc-700 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors select-none leading-none shrink-0 w-10 text-right">
                  {rank}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Badge category={article.category} size="small" />
                    <BookmarkButton articleId={article.id} size="small" />
                  </div>

                  <Link
                    to={`/article/${article.id}`}
                    className="block group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors"
                  >
                    <h3 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="truncate">{article.author?.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Small preview thumbnail */}
                {article.image && (
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
