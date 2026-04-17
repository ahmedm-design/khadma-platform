// pages/ProviderProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Phone, MessageCircle, Globe, Instagram, Facebook,
  Clock, Languages, Star, Shield, Zap, ChevronLeft, Lock,
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StarRating from '../components/common/StarRating';
import toast from 'react-hot-toast';
import { SkeletonProfileHeader } from '../components/common/SkeletonCard';

export default function ProviderProfile() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const { user } = useAuth();

  const [provider, setProvider]   = useState(null);
  const [ratings, setRatings]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [myRating, setMyRating]   = useState(0);
  const [myComment, setMyComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/providers/${id}`)
      .then(({ data }) => {
        setProvider(data.data);
        setRatings(data.ratings || []);
      })
      .catch(() => setProvider(null))
      .finally(() => setLoading(false));
  }, [id]);

  const submitRating = async () => {
    if (!myRating) return toast.error('Please select a star rating');
    setSubmitting(true);
    try {
      await api.post('/ratings', { provider: id, stars: myRating, comment: myComment });
      toast.success('Review submitted!');
      const { data } = await api.get(`/providers/${id}`);
      setProvider(data.data);
      setRatings(data.ratings || []);
      setMyRating(0);
      setMyComment('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 container-app max-w-4xl mx-auto space-y-5">
        <SkeletonProfileHeader />
        <div className="skeleton h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="py-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-slate-500 mb-6">{t('common.not_found')}</p>
        <Link to="/providers" className="btn-primary">{t('common.back')}</Link>
      </div>
    );
  }

  const name = lang === 'ar' && provider.businessNameAr ? provider.businessNameAr : provider.businessName;
  const desc = lang === 'ar' && provider.descriptionAr ? provider.descriptionAr : provider.description;
  const catName = lang === 'ar' && provider.category?.nameAr ? provider.category.nameAr : provider.category?.name;

  const tabs = [
    { id: 'about',    label: t('profile.about') },
    { id: 'services', label: t('profile.services') },
    { id: 'ratings',  label: `${t('profile.ratings')} (${ratings.length})` },
  ];

  return (
    <div className="py-12">
      <div className="container-app max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary-500">{t('nav.home')}</Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <Link to="/providers" className="hover:text-primary-500">{t('nav.providers')}</Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-[200px]">{name}</span>
        </nav>

        {/* Hero card */}
        <div className="card p-6 md:p-8 mb-5">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-100 dark:border-primary-800">
                {provider.avatar
                  ? <img src={provider.avatar} alt={name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl">{provider.category?.icon || '👤'}</div>
                }
              </div>
              {provider.isVerified && (
                <div className="absolute -bottom-2 -end-2 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{name}</h1>
                  {catName && (
                    <span className="inline-flex items-center gap-1 text-sm text-primary-500 font-medium mt-1">
                      {provider.category?.icon} {catName}
                    </span>
                  )}
                </div>
                {provider.isFeatured && (
                  <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                    <Zap className="w-3 h-3" /> {t('providers.featured')}
                  </span>
                )}
              </div>

              {/* Rating */}
              {provider.ratingCount > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <StarRating value={Math.round(provider.ratingAvg)} size="md" />
                  <span className="font-bold text-slate-800 dark:text-white">{provider.ratingAvg.toFixed(1)}</span>
                  <span className="text-slate-400 text-sm">({provider.ratingCount} {t('providers.reviews')})</span>
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                {provider.city && (
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{provider.city}</span>
                )}
                {provider.yearsOfExperience > 0 && (
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{provider.yearsOfExperience} {t('profile.experience')}</span>
                )}
                {provider.languages?.length > 0 && (
                  <span className="flex items-center gap-1"><Languages className="w-4 h-4" />{provider.languages.join(', ')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            {user ? (
              <div className="flex flex-wrap gap-3">
                {provider.phone && (
                  <a href={`tel:${provider.phone}`} className="btn-primary text-sm">
                    <Phone className="w-4 h-4" /> {provider.phone}
                  </a>
                )}
                {provider.whatsapp && (
                  <a
                    href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                    target="_blank" rel="noreferrer"
                    className="btn-secondary text-sm bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
                    <Globe className="w-4 h-4" /> Website
                  </a>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-xl w-fit hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <Lock className="w-4 h-4 text-primary-400" />
                {t('profile.login_to_contact')}
              </Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="card p-6 animate-fade-in">
            <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">{t('profile.about')}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{desc || 'No description provided.'}</p>
            {provider.address && (
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>{provider.address}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-3 animate-fade-in">
            {provider.services?.length > 0 ? provider.services.map((svc, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' && svc.titleAr ? svc.titleAr : svc.title}
                    </h3>
                    {svc.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{svc.description}</p>
                    )}
                  </div>
                  {svc.price && (
                    <div className="text-end flex-shrink-0">
                      <div className="text-lg font-bold text-primary-500">EGP {svc.price}</div>
                      <div className="text-xs text-slate-400">{t('common.per')} {svc.priceUnit}</div>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="card p-8 text-center text-slate-400">
                <p>{t('common.no_data')}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="space-y-4 animate-fade-in">
            {/* Write a review */}
            {user && user.role === 'seeker' && (
              <div className="card p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('profile.write_review')}</h3>
                <div className="mb-3">
                  <p className="text-sm text-slate-500 mb-2">{t('profile.your_rating')}</p>
                  <StarRating value={myRating} size="lg" interactive onChange={setMyRating} />
                </div>
                <textarea
                  value={myComment}
                  onChange={(e) => setMyComment(e.target.value)}
                  placeholder={t('profile.comment')}
                  rows={3}
                  className="input text-sm resize-none mb-3"
                />
                <button
                  onClick={submitRating}
                  disabled={submitting || !myRating}
                  className="btn-primary text-sm"
                >
                  {submitting ? '...' : t('profile.submit_review')}
                </button>
              </div>
            )}

            {/* Reviews list */}
            {ratings.length === 0 ? (
              <div className="card p-8 text-center text-slate-400">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>{t('common.no_data')}</p>
              </div>
            ) : ratings.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0">
                    {r.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{r.user?.name}</span>
                      <span className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <StarRating value={r.stars} size="sm" />
                    {r.comment && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5">{r.comment}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
