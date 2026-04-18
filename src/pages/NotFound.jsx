// pages/NotFound.jsx — khadma design applied, logic unchanged
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pb-24 min-h-[60vh] max-w-xl mx-auto">
      <div className="text-7xl mb-6">😕</div>
      <div className="text-8xl sm:text-9xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-4">404</div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 mb-6">{t('common.not_found')}</h1>
      <p className="text-slate-500 font-medium leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved to a different temporary location.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button onClick={() => window.history.back()} className="px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
          ← {t('common.back')}
        </button>
        <Link to="/" className="px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
          🏠 {t('common.home')}
        </Link>
      </div>
    </div>
  );
}
