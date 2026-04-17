// pages/Providers.jsx — khadma design applied, ALL logic unchanged
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLang } from '../context/LangContext';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard } from '../components/common/SkeletonCard';

const CITIES = ['Cairo', 'Giza', 'Alexandria', 'Mansoura', 'Tanta', 'Luxor', 'Aswan'];

export default function Providers() {
  const { t, lang } = useLang();
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
  const isAr = lang === 'ar';

  const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 14, outline: 'none', background: 'var(--kd-white, white)', color: 'var(--ink)', fontFamily: 'Sora, sans-serif' };
  const selectStyle = { ...inputStyle, cursor: 'pointer', appearance: 'none' };

  return (
    <div>
      {/* Page hero strip */}
      <div className="animate-fade-in" style={{ background: 'linear-gradient(135deg, var(--cream) 0%, var(--paper) 100%)', borderBottom: '1px solid var(--border)', padding: '52px 40px 40px' }}>
        <div className="animate-fade-up" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="kd-section-label">{isAr ? 'المحترفون' : 'Professionals'}</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <h1 className="kd-section-title" style={{ marginBottom: 4 }}>{t('providers.title')}</h1>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>{providers.length} {isAr ? 'مقدم خدمة' : 'providers found'}</p>
            </div>
            <button
              onClick={() => setShowFilters((o) => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: showFilters ? 'var(--ink)' : 'var(--kd-white, white)', color: showFilters ? 'var(--kd-white, white)' : 'var(--ink)', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora, sans-serif', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              <SlidersHorizontal style={{ width: 16, height: 16 }} />
              {t('common.filter')}
              {hasFilters && (
                <span style={{ background: 'var(--teal)', color: '#0d0d0d', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {[city, catId, minRating, search].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px' }}>
        {/* Filter panel */}
        {showFilters && (
          <div style={{ background: 'var(--kd-white, white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: '24px', marginBottom: 32, boxShadow: 'var(--kd-shadow)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--muted)' }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('providers.search')} style={{ ...inputStyle, paddingLeft: 38 }} />
              </div>
              {/* City */}
              <select value={city} onChange={(e) => setCity(e.target.value)} style={selectStyle}>
                <option value="">{t('providers.filter_city')}</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {/* Category */}
              <select value={catId} onChange={(e) => setCatId(e.target.value)} style={selectStyle}>
                <option value="">All Categories</option>
                {(categories || []).map((c) => (
                  <option key={c._id} value={c._id}>{c.icon} {lang === 'ar' && c.nameAr ? c.nameAr : c.name}</option>
                ))}
              </select>
              {/* Sort */}
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
                <option value="-ratingAvg">Top Rated</option>
                <option value="-createdAt">Newest</option>
                <option value="-isFeatured">Featured First</option>
              </select>
            </div>

            {/* Rating filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{t('providers.filter_rating')}:</span>
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r ? String(r) : '')}
                  style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Sora, sans-serif',
                    background: (minRating === String(r) || (!minRating && r === 0)) ? 'var(--ink)' : 'transparent',
                    color: (minRating === String(r) || (!minRating && r === 0)) ? 'var(--kd-white, white)' : 'var(--muted)',
                    border: (minRating === String(r) || (!minRating && r === 0)) ? '2px solid var(--ink)' : '2px solid var(--border)',
                  }}
                >
                  {r === 0 ? 'All' : `${r}+ ⭐`}
                </button>
              ))}
              {hasFilters && (
                <button onClick={clearFilters} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontWeight: 600 }}>
                  <X style={{ width: 14, height: 14 }} /> Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {Array(12).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)}
          </div>
        ) : providers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
            <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{t('providers.no_results')}</p>
            {hasFilters && (
              <button onClick={clearFilters} className="kd-btn-primary" style={{ marginTop: 16 }}>Clear Filters</button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {(providers || []).map((p, i) => (
              <div key={p._id} className="animate-fade-up hover-lift" style={{ animationDelay: `${(i % 12) * 0.05}s` }}>
                <ProviderCard provider={p} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: 40, height: 40, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora, sans-serif', transition: 'all 0.2s',
                  background: page === p ? 'var(--ink)' : 'transparent',
                  color: page === p ? 'var(--kd-white, white)' : 'var(--ink)',
                  border: page === p ? '2px solid var(--ink)' : '2px solid var(--border)',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
