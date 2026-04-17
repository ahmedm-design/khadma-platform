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
    <Link 
      to={`/providers/${provider._id}`} 
      className="group relative block bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/5"
    >
      {/* Image / placeholder */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {provider.avatar
          ? <img src={provider.avatar} alt={name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
          : <div className="w-full h-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-5xl opacity-40 group-hover:scale-110 transition-transform">{provider.category?.icon || '👤'}</div>
        }
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          {provider.isFeatured && (
            <span className="flex items-center gap-1.5 bg-amber-500/90 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <Zap className="w-3 h-3" /> {t('providers.featured')}
            </span>
          )}
          {provider.isVerified && (
            <span className="flex items-center gap-1.5 bg-[var(--teal)]/90 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <Shield className="w-3 h-3" /> {t('providers.verified')}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          {provider.avatar
            ? <img src={provider.avatar} alt={name} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
            : <div className="w-8 h-8 rounded-full bg-[var(--teal)] flex items-center justify-center text-[10px] font-black text-slate-900">{initials}</div>
          }
          <span className="text-lg font-black text-slate-800 dark:text-slate-100 flex-1 truncate">{name}</span>
        </div>

        {catName && (
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--teal)] mb-3">
            {catName}
          </div>
        )}

        {desc && (
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
            {desc}
          </p>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            {provider.ratingCount > 0 ? (
              <>
                <span className="text-amber-500 text-sm font-bold">★ {provider.ratingAvg?.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">({provider.ratingCount} reviews)</span>
              </>
            ) : (
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">New Member</span>
            )}
          </div>
          {provider.city && (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <MapPin className="w-3 h-3" /> {provider.city}
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center group-hover:bg-[var(--teal)] group-hover:text-slate-900 transition-all duration-300">
            {t('providers.view_profile')}
          </div>
        </div>
      </div>
    </Link>
  );
}
