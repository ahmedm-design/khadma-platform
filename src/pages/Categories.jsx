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
    api.get('/categories').then(({ data }) => setCategories(data.data)).finally(() => setLoading(false));
  }, []);

  const filtered = categories.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || (c.nameAr || '').includes(q);
  });

  const isAr = lang === 'ar';

  return (
    <div>
      {/* Page hero strip */}
      <div className="animate-fade-in" style={{ background: 'linear-gradient(135deg, var(--cream) 0%, var(--paper) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 40px 48px' }}>
        <div className="animate-fade-up" style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <span className="kd-section-label" style={{ display: 'flex', justifyContent: 'center' }}>
            {isAr ? 'تصفح الأقسام' : 'Browse Categories'}
          </span>
          <h1 className="kd-section-title">{t('categories.title')}</h1>
          <p className="kd-section-sub" style={{ margin: '0 auto 32px' }}>{t('categories.subtitle')}</p>

          {/* Search */}
          <div style={{ maxWidth: 440, margin: '0 auto', display: 'flex', background: 'var(--kd-white, white)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '6px 6px 6px 20px', gap: 8, boxShadow: 'var(--kd-shadow)' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('categories.search')}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: 'var(--ink)', flex: 1, fontFamily: 'Sora, sans-serif' }}
            />
            <button type="button" style={{ background: 'var(--teal)', border: 'none', borderRadius: 30, padding: '8px 18px', color: '#0d0d0d', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Search style={{ width: 13, height: 13 }} />
              {isAr ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="kd-section-wrap">
        {loading ? (
          <div className="kd-cats-grid">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} style={{ background: 'var(--cream)', borderRadius: 14, aspectRatio: '4/3', animation: 'skeleton 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{t('common.no_data')}</p>
          </div>
        ) : (
          <div className="kd-cats-grid">
            {filtered.map((cat, i) => {
              const name = lang === 'ar' && cat.nameAr ? cat.nameAr : cat.name;
              const desc = lang === 'ar' && cat.descriptionAr ? cat.descriptionAr : cat.description;
              return (
                <Link key={cat._id} to={`/categories/${cat.slug}`} className="kd-cat-card hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="kd-cat-icon-wrap">{cat.icon}</div>
                  <div className="kd-cat-body">
                    <div className="kd-cat-name">{name}</div>
                    <div className="kd-cat-desc">{desc}</div>
                    {cat.subcategories?.length > 0 && (
                      <div style={{ fontSize: 11, color: 'var(--teal-dark)', fontWeight: 600, marginTop: 6 }}>
                        {cat.subcategories.length} {t('categories.subcategories')}
                      </div>
                    )}
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
