// components/common/SkeletonCard.jsx
import React from 'react';

export function SkeletonProviderCard() {
  return (
    <div className="card p-4 space-y-3">
      <div className="skeleton h-40 w-full rounded-xl" />
      <div className="skeleton h-5 w-3/4 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-4 w-16 rounded" />
      </div>
      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonCategoryCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="skeleton h-5 w-2/3 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
    </div>
  );
}

export function SkeletonProfileHeader() {
  return (
    <div className="card p-6 flex gap-5 items-start">
      <div className="skeleton w-24 h-24 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="skeleton h-7 w-1/2 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-8 w-24 rounded-xl" />
          <div className="skeleton h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
