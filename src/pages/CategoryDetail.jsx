// pages/CategoryDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronLeft } from 'lucide-react';
import { useLang } from '../context/LangContext';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard } from '../components/common/SkeletonCard';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [category, setCategory]         = useState(null);
  const [providers, setProviders]       = useState([]);
  const [activeSubcat, setActiveSubcat] = useState('');
  const [search, setSearch]             = useState('');
  const [loading, setLoading]           = useState(true);
  const [loadingProvs, setLoadingProvs] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/categories/${slug}`)
      .then(({ data }) => {
        setCategory(data.data);
        return data.data._id;
      })
      .then((catId) => {
        if (!catId) throw new Error('No category ID found');
        setLoadingProvs(true);
        return api.get(`/providers/category/${catId}`);
      })
      .then(({ data }) => setProviders(data?.data || []))
      .finally(() => { setLoading(false); setLoadingProvs(false); });
  }, [slug]);

  const filtered = (providers || []).filter((p) => {
    if (!p) return false;
    const matchesSubcat = activeSubcat ? p.subcategory === activeSubcat : true;
    const q = search.toLowerCase();
    const matchesSearch = !search ||
      p.businessName.toLowerCase().includes(q) ||
      (p.businessNameAr || '').includes(q) ||
      (p.description || '').toLowerCase().includes(q);
    return matchesSubcat && matchesSearch;
  });

  if (loading) {
    return (
      <div className="py-12 container-app">
        <div className="skeleton h-8 w-48 rounded mb-2" />
        <div className="skeleton h-5 w-72 rounded mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-24 text-center text-slate-400">
        <div className="text-6xl mb-4">🔍</div>
        <p>{t('common.not_found')}</p>
        <Link to="/categories" className="btn-primary mt-4 inline-flex">{t('common.back')}</Link>
      </div>
    );
  }

  const catName = lang === 'ar' && category.nameAr ? category.nameAr : category.name;
  const catDesc = lang === 'ar' && category.descriptionAr ? category.descriptionAr : category.description;

  return (
    <div className="py-12">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary-500">{t('nav.home')}</Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <Link to="/categories" className="hover:text-primary-500">{t('nav.categories')}</Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-slate-700 dark:text-slate-200 font-medium">{catName}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 mb-16 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[32px] sm:rounded-[48px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-5xl sm:text-7xl shadow-2xl relative group">
             <div className="absolute inset-0 bg-[var(--teal)] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
             <span className="relative z-10">{category.icon}</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--teal)] mb-3">{category.slug?.replace(/-/g, ' ')}</p>
            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{catName}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg font-medium max-w-xl">{catDesc}</p>
          </div>
        </div>

        {/* Subcategory filter pills */}
        {category.subcategories?.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveSubcat('')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                !activeSubcat
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300'
              }`}
            >
              All
            </button>
            {(category?.subcategories || []).map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubcat(sub.slug)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  activeSubcat === sub.slug
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300'
                }`}
              >
                <span>{sub.icon}</span>
                {lang === 'ar' && sub.nameAr ? sub.nameAr : sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-sm mb-8">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('providers.search')}
            className="input ps-11"
          />
        </div>

        {/* Providers Grid */}
        {loadingProvs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-3">😕</div>
            <p className="font-medium">{t('providers.no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {filtered.map((p) => <ProviderCard key={p._id} provider={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
