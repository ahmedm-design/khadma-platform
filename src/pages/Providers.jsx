// pages/Providers.jsx — khadma design applied, ALL logic unchanged
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import clsx from 'clsx';
import { useLang } from '../context/LangContext';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard } from '../components/common/SkeletonCard';

const CITIES = ['Cairo', 'Giza', 'Alexandria', 'Mansoura', 'Tanta', 'Luxor', 'Aswan'];

export default function Providers() {
  const { t, lang, isAr } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();

  const [providers, setProviders]     = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state — unchanged
  const [search,    setSearch]    = useState(searchParams.get('search') || '');
  const [city,      setCity]      = useState(searchParams.get('city')   || '');
  const [catId,     setCatId]     = useState(searchParams.get('cat')    || '');
  const [minRating, setMinRating] = useState(searchParams.get('rating') || '');
  const [sort,      setSort]      = useState(searchParams.get('sort')   || '-ratingAvg');

  const fetchProviders = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12, sort };
      if (city)      params.city     = city;
      if (catId)     params.category = catId;
      if (minRating) params.rating   = minRating;

      let url = '/providers';
      if (search.trim()) url = `/search?q=${encodeURIComponent(search.trim())}`;

      const { data } = await api.get(url, { params: search ? {} : params });
      if (search) {
        setProviders(data?.data?.providers || []);
        setTotalPages(1);
      } else {
        setProviders(data?.data || []);
        setTotalPages(data?.pages || 1);
      }
    } finally {
      setLoading(false);
    }
  }, [page, city, catId, minRating, sort, search]);

  useEffect(() => { fetchProviders(); }, [fetchProviders]);
  useEffect(() => { 
    api.get('/categories')
      .then(({ data }) => setCategories(data?.data || []))
      .catch(() => setCategories([]));
  }, []);

  const clearFilters = () => {
    setCity(''); setCatId(''); setMinRating(''); setSort('-ratingAvg');
    setSearch(''); setPage(1);
  };

  const hasFilters = city || catId || minRating || search;

  const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 14, outline: 'none', background: 'var(--kd-white, white)', color: 'var(--ink)', fontFamily: 'Sora, sans-serif' };
  const selectStyle = { ...inputStyle, cursor: 'pointer', appearance: 'none' };

  return (
    <div className="relative overflow-hidden min-h-screen mesh-bg">
      {/* Background Atmosphere - Simplified for Calm Mood */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-500 opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Page Hero Strip */}
      <div className="relative pb-8 md:pb-12 px-6 md:px-10 border-b border-slate-200/50 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
            <div className="animate-fade-in flex-1">
              <span className="kd-section-label uppercase tracking-[0.3em] text-[var(--teal)] mb-4 inline-block font-black text-[10px]">{isAr ? 'المحترفون' : 'Verified Professionals'}</span>
              <h1 className="kd-section-title text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 tracking-tighter leading-tight">{t('providers.title')}</h1>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-sm md:text-lg">
                {isAr 
                  ? 'اكتشف النخبة من مقدمي الخدمات في مصر. نضمن لك الجودة والاحترافية في كل مشروع.'
                  : 'Connect with Egypt\'s elite service providers. We verify every professional to ensure quality and reliability for your home and business.'}
              </p>
              <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-400 border border-white/10 uppercase tracking-widest leading-none">
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" />
                {providers.length} {isAr ? 'مقدم خدمة متاح حالياً' : 'providers available now'}
              </div>
            </div>

            <button
              onClick={() => setShowFilters((o) => !o)}
              className={clsx(
                "flex justify-center items-center gap-3 sm:gap-4 w-full md:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-2xl md:rounded-[24px] text-[10px] sm:text-xs font-black transition-all duration-500 border uppercase tracking-widest",
                showFilters 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900" 
                  : "bg-white/40 dark:bg-white/5 text-slate-700 dark:text-white border-slate-200 dark:border-white/10 backdrop-blur-2xl hover:bg-white/60"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('common.filter')}
              {hasFilters && (
                <span className="bg-[var(--teal)] text-slate-900 rounded-full w-5 h-5 text-[10px] font-black flex items-center justify-center translate-x-1">
                  {[city, catId, minRating, search].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-6 md:py-8 relative z-10">
        {/* Filter Panel - Glassmorphic */}
        {showFilters && (
          <div className="bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-3xl rounded-[32px] p-8 mb-12 shadow-2xl shadow-indigo-500/5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-[var(--teal)]" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('providers.search')} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm w-full outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all font-bold" />
              </div>
              {/* City */}
              <div>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)] cursor-pointer font-bold appearance-none">
                  <option value="">{t('providers.filter_city')}</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Category */}
              <div>
                <select value={catId} onChange={(e) => setCatId(e.target.value)} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)] cursor-pointer font-bold appearance-none">
                  <option value="">All Categories</option>
                  {(categories || []).map((c) => (
                    <option key={c._id} value={c._id}>{c.icon} {lang === 'ar' && c.nameAr ? c.nameAr : c.name}</option>
                  ))}
                </select>
              </div>
              {/* Sort */}
              <div>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)] cursor-pointer font-bold appearance-none">
                  <option value="-ratingAvg">Top Rated First</option>
                  <option value="-createdAt">Newest Joined</option>
                  <option value="-isFeatured">Featured Spotlight</option>
                </select>
              </div>
            </div>

            {/* Rating Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">{t('providers.filter_rating')}:</span>
                <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r ? String(r) : '')}
                      className={clsx(
                        "px-5 py-2 rounded-lg text-xs font-black transition-all duration-300",
                        (minRating === String(r) || (!minRating && r === 0))
                          ? "bg-white dark:bg-white/10 text-[var(--teal-dark)] shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      )}
                    >
                      {r === 0 ? 'All' : `${r}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>
              
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all flex items-center gap-2">
                  <X className="w-4 h-4" /> Reset Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Grid - High End Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(12).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)}
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-40 animate-fade-in group">
            <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-500">🙁</div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{t('providers.no_results')}</h3>
            <p className="text-slate-400 font-medium mb-8">Try adjusting your filters or searching for something else.</p>
            {hasFilters && (
              <button onClick={clearFilters} className="btn-primary px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-widest">Clear Everything</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {(providers || []).map((p, i) => (
              <div key={p._id} className="animate-fade-up" style={{ animationDelay: `${(i % 12) * 0.05}s` }}>
                <ProviderCard provider={p} />
              </div>
            ))}
          </div>
        )}

        {/* Cinematic Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-20">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 disabled:opacity-30 transition-all font-bold text-sm"
            >
              Previous
            </button>
            <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-[20px] shadow-inner">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={clsx(
                    "w-10 h-10 rounded-[14px] text-sm font-black transition-all duration-300",
                    page === p 
                      ? "bg-white dark:bg-white/10 text-[var(--teal-dark)] shadow-md" 
                      : "text-slate-400 hover:text-slate-800"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 disabled:opacity-30 transition-all font-bold text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
