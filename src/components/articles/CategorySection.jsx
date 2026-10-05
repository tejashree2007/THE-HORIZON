import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArticleCard from './ArticleCard';

export default function CategorySection({
  title,
  categorySlug,
  description,
  articles = [],
  layout = 'grid-3', // 'grid-3' | 'featured-plus-list' | 'grid-2' | 'horizontal-list'
  className = ''
}) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={`mb-14 lg:mb-20 ${className}`}>
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b-2 border-zinc-900 dark:border-zinc-700">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-sm" />
            <h2 className="font-serif-headline text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {description}
            </p>
          )}
        </div>

        <Link
          to={`/category/${categorySlug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-900 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-500 transition-colors group shrink-0"
        >
          <span>View All {title}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* DIVERSE LAYOUT ENGINE */}
      
      {/* 1. Featured Lead + Compact List Layout */}
      {layout === 'featured-plus-list' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <ArticleCard
              article={articles[0]}
              variant="standard"
              imageAspect="aspect-[16/10]"
              className="h-full"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-[#111726] rounded-xl p-3 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
            {articles.slice(1, 4).map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                variant="compact"
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 rounded-lg p-3"
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. Horizontal List Layout */}
      {layout === 'horizontal-list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 4).map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              variant="horizontal"
            />
          ))}
        </div>
      )}

      {/* 3. Two-Column Wide Cards Layout */}
      {layout === 'grid-2' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {articles.slice(0, 2).map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              variant="standard"
              imageAspect="aspect-[16/9]"
            />
          ))}
        </div>
      )}

      {/* 4. Three-Column Grid Layout (Default) */}
      {layout === 'grid-3' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              variant="standard"
            />
          ))}
        </div>
      )}
    </section>
  );
}
