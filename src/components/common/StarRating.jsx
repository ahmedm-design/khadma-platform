// components/common/StarRating.jsx
import React from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

export default function StarRating({ value = 0, max = 5, size = 'sm', interactive = false, onChange }) {
  const sizeClass = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }[size] || 'w-4 h-4';

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <Star
          key={star}
          className={clsx(
            sizeClass,
            'transition-colors',
            star <= value
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-300 dark:text-slate-600',
            interactive && 'cursor-pointer hover:text-amber-400 hover:fill-amber-400',
          )}
          onClick={() => interactive && onChange?.(star)}
        />
      ))}
    </div>
  );
}
