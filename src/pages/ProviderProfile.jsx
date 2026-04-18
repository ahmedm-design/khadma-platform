// pages/ProviderProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Phone, MessageCircle, Globe, Instagram, Facebook,
  Clock, Languages, Star, Shield, Zap, ChevronLeft, Lock, FileText
} from 'lucide-react';
import clsx from 'clsx';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StarRating from '../components/common/StarRating';
import toast from 'react-hot-toast';
import { SkeletonProfileHeader } from '../components/common/SkeletonCard';

export default function ProviderProfile() {
  const { id } = useParams();
  const { t, lang, isAr } = useLang();
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
        setProvider(data?.data || null);
        setRatings(data?.ratings || []);
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
      setProvider(data?.data || null);
      setRatings(data?.ratings || []);
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
    <div className="relative overflow-hidden min-h-screen mesh-bg pb-12">
      {/* Atmosphere blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Cinematic Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 bg-white/40 dark:bg-white/5 w-fit px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <Link to="/" className="hover:text-[var(--teal)] transition-colors">{t('nav.home')}</Link>
          <span className="opacity-30">/</span>
          <Link to="/providers" className="hover:text-[var(--teal)] transition-colors">{t('nav.providers')}</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900 dark:text-white truncate max-w-[150px]">{name}</span>
        </nav>

        {/* Premium Profile Header */}
        <div className="bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[48px] p-8 md:p-12 mb-8 shadow-2xl shadow-indigo-500/5 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
            {/* Avatar - High End */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden bg-slate-100 dark:bg-white/5 border-2 border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-500">
                {provider.avatar
                  ? <img src={provider.avatar} alt={name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[var(--teal)]/20 to-indigo-500/20">{provider.category?.icon || '👤'}</div>
                }
              </div>
              {provider.isVerified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[var(--teal)] flex items-center justify-center text-slate-900 shadow-lg border-4 border-white dark:border-[#0e0e11]">
                  <Shield className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Info Hub */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{name}</h1>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--teal)]/10 text-[var(--teal)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--teal)]/20">
                    {provider.category?.icon} {catName}
                  </div>
                </div>
                {provider.isFeatured && (
                  <span className="bg-amber-500 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                    <Zap className="w-3 h-3" /> {t('providers.featured')}
                  </span>
                )}
              </div>

              {/* Stats Strip */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-white/5 mt-6">
                {provider.ratingCount > 0 && (
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      {provider.ratingAvg.toFixed(1)}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({provider.ratingCount} {t('providers.reviews')})</div>
                  </div>
                )}
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    {provider.yearsOfExperience || 0}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('profile.experience')}</div>
                </div>
                {provider.city && (
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      {provider.city}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</div>
                  </div>
                )}
              </div>

              {/* Contact Hub */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {user ? (
                  <>
                    {provider.phone && (
                      <a href={`tel:${provider.phone}`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                        <Phone className="w-4 h-4" /> {provider.phone}
                      </a>
                    )}
                    {provider.whatsapp && (
                      <a
                        href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                        target="_blank" rel="noreferrer"
                        className="bg-emerald-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="bg-white/40 dark:bg-white/5 border border-white/20 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[var(--teal)] transition-all flex items-center gap-3 backdrop-blur-xl">
                    <Lock className="w-4 text-[var(--teal)]" />
                    {t('profile.login_to_contact')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex gap-2 mb-8 bg-white/40 dark:bg-white/5 p-2 rounded-[24px] border border-white/10 backdrop-blur-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-105"
                  : "text-slate-400 hover:text-slate-800 dark:hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Clean Content Sections */}
        <div className="space-y-8 min-h-[400px]">
          {activeTab === 'about' && (
            <div className="bg-white/40 dark:bg-white/5 border border-white/10 p-10 rounded-[48px] backdrop-blur-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-[var(--teal)]" />
                {t('profile.about')}
              </h2>
              <p className="text-slate-500 font-medium leading-loose text-lg">{desc || 'Professional has not provided a description yet.'}</p>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid gap-6 animate-fade-in">
              {provider.services?.length > 0 ? (provider.services || []).map((svc, i) => (
                <div key={i} className="bg-white/40 dark:bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-3xl group hover:border-[var(--teal)]/50 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                        {lang === 'ar' && svc.titleAr ? svc.titleAr : svc.title}
                      </h3>
                      {svc.description && (
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{svc.description}</p>
                      )}
                    </div>
                    {svc.price && (
                      <div className="bg-slate-900 dark:bg-white px-6 py-3 rounded-2xl text-center shadow-lg">
                        <div className="text-lg font-black text-[var(--teal)]">EGP {svc.price}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none mt-1">{t('common.per')} {svc.priceUnit}</div>
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center opacity-30 text-slate-400 italic">No specific services listed yet.</div>
              )}
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="space-y-8 animate-fade-in">
              {user && user.role === 'seeker' && (
                <div className="bg-white/60 dark:bg-white/5 border border-[var(--teal)]/20 p-10 rounded-[48px] backdrop-blur-3xl shadow-xl shadow-[var(--teal)]/5">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8">{t('profile.write_review')}</h3>
                  <div className="mb-8 p-6 bg-slate-100 dark:bg-white/5 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pl-1">{t('profile.your_rating')}</p>
                    <StarRating value={myRating} size="lg" interactive onChange={setMyRating} />
                  </div>
                  <textarea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder={t('profile.comment')}
                    className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-sm font-medium outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all mb-6 min-h-[120px]"
                  />
                  <button
                    onClick={submitRating}
                    disabled={submitting || !myRating}
                    className="w-full bg-[var(--teal)] text-slate-900 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 shadow-lg shadow-[var(--teal)]/10"
                  >
                    {submitting ? '...' : t('profile.submit_review')}
                  </button>
                </div>
              )}

              <div className="grid gap-6">
                {ratings.length === 0 ? (
                  <div className="py-20 text-center opacity-30 text-slate-400 italic">No reviews yet. Be the first to rate!</div>
                ) : (ratings || []).map((r) => (
                  <div key={r._id} className="bg-white/40 dark:bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-3xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--teal)]/20 to-indigo-500/20 flex items-center justify-center text-[var(--teal)] font-black text-sm">
                        {r.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-black text-slate-800 dark:text-white text-lg tracking-tight">{r.user?.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="mb-3">
                          <StarRating value={r.stars} size="sm" />
                        </div>
                        {r.comment && <p className="text-slate-500 font-medium leading-relaxed">{r.comment}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
