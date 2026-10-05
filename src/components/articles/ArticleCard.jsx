import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import BookmarkButton from './BookmarkButton';

export default function ArticleCard({
  article,
  variant = 'standard', // 'standard' | 'horizontal' | 'compact' | 'featured' | 'minimal'
  className = '',
  imageAspect = 'aspect-[16/10]'
}) {
  const navigate = useNavigate();

  if (!article) return null;

  const {
    id,
    title,
    description,
    category,
    author,
    date,
    readTime,
    image,
    imageCaption
  } = article;

  const handleCardClick = () => {
    navigate(`/article/${id}`);
  };

  // FEATURED VARIANT (Large, commanding hero editorial card)
  if (variant === 'featured') {
    return (
      <article
        onClick={handleCardClick}
        className={`group relative bg-white dark:bg-[#111726] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
      >
        <div className="relative overflow-hidden aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-800">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge category={category} className="shadow-md backdrop-blur-md" />
          </div>

          <div className="absolute top-4 right-4 z-10">
            <BookmarkButton articleId={id} className="backdrop-blur-md shadow-md" />
          </div>

          {imageCaption && (
            <div className="absolute bottom-3 left-4 right-4 text-[11px] text-zinc-300 font-mono line-clamp-1 opacity-80">
              {imageCaption}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
          <div>
            <Link
              to={`/article/${id}`}
              className="block group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors"
            >
              <h2 className="font-serif-headline text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.2] mb-3">
                {title}
              </h2>
            </Link>

            <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
              {description}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {author?.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {author?.name || 'Staff Writer'}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform duration-200">
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  // HORIZONTAL VARIANT (Image on left or right, editorial side layout)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleCardClick}
        className={`group bg-white dark:bg-[#111726] rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row ${className}`}
      >
        <div className="relative sm:w-2/5 shrink-0 overflow-hidden aspect-[16/10] sm:aspect-auto min-h-[180px] bg-zinc-100 dark:bg-zinc-800">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 sm:hidden">
            <Badge category={category} size="small" />
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="hidden sm:flex items-center justify-between gap-2 mb-2.5">
              <Badge category={category} size="small" />
              <BookmarkButton articleId={id} size="small" />
            </div>

            <Link
              to={`/article/${id}`}
              className="block group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors"
            >
              <h3 className="font-serif-headline text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug mb-2 line-clamp-2">
                {title}
              </h3>
            </Link>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{author?.name}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
              <div className="sm:hidden">
                <BookmarkButton articleId={id} size="small" />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // COMPACT VARIANT (Condensed list row with small thumbnail)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleCardClick}
        className={`group p-3.5 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-start gap-3 flex-grow min-w-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="min-w-0 flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Badge category={category} size="small" clickable={false} />
              <span className="text-[11px] text-zinc-400 font-mono">{readTime}</span>
            </div>
            <h4 className="font-serif-headline text-sm sm:text-base font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
              {title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {author?.name} • {date}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <BookmarkButton articleId={id} size="small" />
        </div>
      </article>
    );
  }

  // MINIMAL VARIANT (Text-centric editorial note)
  if (variant === 'minimal') {
    return (
      <article
        onClick={handleCardClick}
        className={`group py-3 border-b border-zinc-200 dark:border-zinc-800 hover:border-red-500 transition-colors cursor-pointer ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            {category}
          </span>
          <BookmarkButton articleId={id} size="small" />
        </div>
        <h4 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>{author?.name}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </article>
    );
  }

  // STANDARD VARIANT (Default editorial vertical card)
  return (
    <article
      onClick={handleCardClick}
      className={`group bg-white dark:bg-[#111726] rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
    >
      <div>
        <div className={`relative overflow-hidden w-full bg-zinc-100 dark:bg-zinc-800 ${imageAspect}`}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge category={category} size="small" />
          </div>
          <div className="absolute top-3 right-3 z-10">
            <BookmarkButton articleId={id} size="small" className="backdrop-blur-md shadow-xs" />
          </div>
        </div>

        <div className="p-5">
          <Link
            to={`/article/${id}`}
            className="block group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors"
          >
            <h3 className="font-serif-headline text-xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug mb-2 line-clamp-2">
              {title}
            </h3>
          </Link>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          {author?.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
          )}
          <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
            {author?.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
          <span>{date}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
