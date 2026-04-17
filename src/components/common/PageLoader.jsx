// components/common/PageLoader.jsx
import React from 'react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
        </div>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 animate-pulse" />
      </div>
    </div>
  );
}
