// components/common/ProviderCard.jsx — khadma design applied, logic unchanged
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Zap } from 'lucide-react';
import { useLang } from '../../context/LangContext';

export default function ProviderCard({ provider }) {
  const { t, lang } = useLang();
  const name   = lang === 'ar' && provider.businessNameAr ? provider.businessNameAr : provider.businessName;
  const desc   = lang === 'ar' && provider.descriptionAr  ? provider.descriptionAr  : provider.description;
  const catName = lang === 'ar' && provider.category?.nameAr ? provider.category.nameAr : provider.category?.name;

  const initials = name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || '??';

  return (
    <Link to={`/providers/${provider._id}`} className="kd-provider-card">
      {/* Image / placeholder */}
      <div className="kd-provider-img-wrap">
        {provider.avatar
          ? <img src={provider.avatar} alt={name} className="kd-provider-img" />
          : <div className="kd-provider-placeholder">{provider.category?.icon || '👤'}</div>
        }
        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {provider.isFeatured && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(245,158,11,0.9)', color: 'white', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)' }}>
              <Zap style={{ width: 10, height: 10 }} /> {t('providers.featured')}
            </span>
          )}
          {provider.isVerified && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(0,201,167,0.9)', color: '#0d0d0d', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)' }}>
              <Shield style={{ width: 10, height: 10 }} /> {t('providers.verified')}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="kd-provider-body">
        <div className="kd-provider-top">
          {provider.avatar
            ? <img src={provider.avatar} alt={name} className="kd-provider-avatar-sm" />
            : <div className="kd-provider-avatar-initials">{initials}</div>
          }
          <span className="kd-provider-name">{name}</span>
          {provider.isVerified && (
            <span className="kd-provider-verified">✓ {t('providers.verified')}</span>
          )}
        </div>

        {catName && (
          <div style={{ fontSize: 12, color: 'var(--teal-dark)', fontWeight: 600, marginBottom: 6 }}>
            {provider.category?.icon} {catName}
          </div>
        )}

        {desc && (
          <p className="kd-provider-title" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {desc}
          </p>
        )}

        <div className="kd-provider-footer">
          <div className="kd-provider-rating">
            {provider.ratingCount > 0 ? (
              <><span className="star">★</span> {provider.ratingAvg?.toFixed(1)} <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>({provider.ratingCount})</span></>
            ) : (
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>No reviews yet</span>
            )}
          </div>
          {provider.city && (
            <div className="kd-provider-location">
              <MapPin style={{ width: 11, height: 11 }} /> {provider.city}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ width: '100%', padding: '10px', background: 'var(--ink)', color: 'var(--kd-white, white)', border: 'none', borderRadius: 10, fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
            {t('providers.view_profile')}
          </div>
        </div>
      </div>
    </Link>
  );
}
