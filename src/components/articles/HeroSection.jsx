import React from 'react';
import ArticleCard from './ArticleCard';

export default function HeroSection({ primaryArticle, secondaryArticles = [] }) {
  if (!primaryArticle) return null;

  return (
    <section className="relative mb-12 lg:mb-16">
      {/* Editorial section kicker */}
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-mono">
          Featured Investigation &amp; Lead Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Primary Lead Story - 7 columns */}
        <div className="lg:col-span-7 flex flex-col">
          <ArticleCard
            article={primaryArticle}
            variant="featured"
            className="h-full"
          />
        </div>

        {/* Secondary Stories - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {secondaryArticles.slice(0, 2).map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="horizontal"
              className="flex-1 shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
