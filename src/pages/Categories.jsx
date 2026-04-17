// pages/Categories.jsx — khadma design applied, logic unchanged
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLang } from '../context/LangContext';
import api from '../api/axios';

export default function Categories() {
  const { t, lang } = useLang();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');

  useEffect(() => {
    api.get('/categories')
      .then(({ data }) => setCategories(data?.data || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = (categories || []).filter((c) => {
    if (!c) return false;
    const q = search.toLowerCase();
    return (c.name || '').toLowerCase().includes(q) || (c.nameAr || '').includes(q);
  });

  const isAr = lang === 'ar';

  return (
    <div className="relative overflow-hidden min-h-screen mesh-bg">
      {/* Background Atmosphere - Simplified for Calm Mood */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--teal)] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500 opacity-[0.01] rounded-full blur-[130px] pointer-events-none" />

      {/* Page Hero - Cinematic */}
      <div className="relative pt-32 pb-16 px-10">
        <div className="max-w-[1400px] mx-auto text-center animate-fade-in">
          <span className="kd-section-label uppercase tracking-[0.3em] text-[var(--teal)] font-black text-[10px] mb-6 inline-block bg-white/40 dark:bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
            {isAr ? 'عالم من الخدمات' : 'World of Services'}
          </span>
          <h1 className="kd-section-title text-6xl md:text-8xl mb-8 tracking-tighter">{t('categories.title')}</h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-lg mb-16">
            {t('categories.subtitle')}
          </p>

          {/* Luxury Search Integration */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-[var(--teal)] opacity-[0.03] rounded-[30px] blur-3xl group-focus-within:opacity-[0.1] transition-opacity" />
            <div className="relative flex items-center bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[32px] p-2 pr-3 shadow-sm transition-all focus-within:ring-8 focus-within:ring-[var(--teal)]/5 focus-within:border-[var(--teal)]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('categories.search')}
                className="bg-transparent border-none outline-none text-sm font-bold w-full px-8 text-slate-700 dark:text-white"
              />
              <button className="bg-[var(--teal)] text-slate-900 rounded-[24px] px-10 py-4.5 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[var(--teal-dark)] transition-all shadow-lg shadow-[var(--teal)]/20">
                <Search className="w-4 h-4" />
                {isAr ? 'بحث' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - High End */}
      <div className="max-w-[1400px] mx-auto px-10 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-slate-100 dark:bg-white/5 rounded-[32px] aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-40 animate-fade-in group">
            <div className="text-8xl mb-8 group-hover:rotate-12 transition-transform duration-500">🔍</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{t('common.no_data')}</h3>
            <button onClick={() => setSearch('')} className="text-[10px] uppercase font-black tracking-widest text-[var(--teal-dark)] hover:underline mt-4">Clear search query</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((cat, i) => {
              const name = lang === 'ar' && cat.nameAr ? cat.nameAr : cat.name;
              const desc = lang === 'ar' && cat.descriptionAr ? cat.descriptionAr : cat.description;
              return (
                <Link 
                  key={cat._id} 
                  to={`/categories/${cat.slug}`} 
                  className="group bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl rounded-[32px] p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-[var(--teal)]/10 hover:-translate-y-2 animate-fade-up flex flex-col items-center text-center relative overflow-hidden" 
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--teal)] opacity-[0.02] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity" />
                  
                  <div className="w-20 h-20 rounded-[24px] bg-slate-50 dark:bg-white/5 flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                    {cat.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">{name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 px-4">{desc}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-6 border-t border-slate-100 dark:border-white/5 pt-6 w-full">
                    {cat.subcategories?.length > 0 && (
                      <div className="text-[10px] font-black uppercase tracking-widest text-[var(--teal-dark)]">
                        {cat.subcategories.length} {t('categories.subcategories')}
                      </div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[var(--teal)] group-hover:text-slate-900 transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
