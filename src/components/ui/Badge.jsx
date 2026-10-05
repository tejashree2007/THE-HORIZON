import React from 'react';
import { Link } from 'react-router-dom';

export default function Badge({ 
  category, 
  variant = 'default', 
  clickable = true,
  size = 'default',
  className = '' 
}) {
  const categorySlug = category ? category.toLowerCase() : '';

  const getVariantStyles = () => {
    switch (categorySlug) {
      case 'technology':
        return 'text-blue-700 bg-blue-50/80 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50';
      case 'business':
        return 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'science':
        return 'text-purple-700 bg-purple-50/80 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50';
      case 'world':
        return 'text-amber-700 bg-amber-50/80 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50';
      case 'entertainment':
        return 'text-rose-700 bg-rose-50/80 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50';
      case 'sports':
        return 'text-orange-700 bg-orange-50/80 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/50';
      case 'lifestyle':
        return 'text-teal-700 bg-teal-50/80 border-teal-200/60 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-900/50';
      default:
        return 'text-zinc-700 bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  const sizeClasses = size === 'small' 
    ? 'text-[10px] px-2 py-0.5 font-bold tracking-wider' 
    : 'text-xs px-2.5 py-1 font-semibold tracking-wide';

  const baseClasses = `inline-flex items-center uppercase rounded-md border font-sans transition-colors ${sizeClasses} ${getVariantStyles()} ${className}`;

  if (clickable) {
    return (
      <Link 
        to={`/category/${categorySlug}`}
        onClick={(e) => e.stopPropagation()}
        className={`${baseClasses} hover:opacity-85 hover:shadow-xs`}
      >
        {category}
      </Link>
    );
  }

  return (
    <span className={baseClasses}>
      {category}
    </span>
  );
}
