// pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLang } from '../context/LangContext';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard } from '../components/common/SkeletonCard';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang, isAr } = useLang();
  const q = searchParams.get('q') || '';

  const [results, setResults]    = useState({ providers: [], categories: [] });
  const [loading, setLoading]    = useState(false);
  const [searchVal, setSearchVal] = useState(q);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    api.get(`/search?q=${encodeURIComponent(q)}`)
      .then(({ data }) => setResults(data?.data || { providers: [], categories: [] }))
      .catch(() => setResults({ providers: [], categories: [] }))
      .finally(() => setLoading(false));
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) setSearchParams({ q: searchVal.trim() });
  };

  return (
    <div className="pb-12">
      <div className="container-app">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="input ps-11 py-3"
                placeholder={t('nav.search')}
              />
            </div>
            <button type="submit" className="btn-primary px-5">{t('common.search')}</button>
          </div>
        </form>

        {q && (
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-6">
            Results for: <span className="text-primary-500">"{q}"</span>
          </h2>
        )}

        {/* Category matches */}
        {results.categories?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {(results.categories || []).map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-500 text-sm font-medium transition-colors"
                >
                  <span>{cat.icon}</span>
                  {lang === 'ar' && cat.nameAr ? cat.nameAr : cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Provider results */}
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">
            Providers ({loading ? '...' : results.providers?.length || 0})
          </h3>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array(6).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)}
            </div>
          ) : results.providers?.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium">{t('providers.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
              {(results.providers || []).map((p) => <ProviderCard key={p._id} provider={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
