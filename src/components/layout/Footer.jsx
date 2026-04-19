// components/layout/Footer.jsx — khadma design applied
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Footer() {
  const { t, lang } = useLang();
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="kd-footer dark" style={{ background: '#08090d', color: 'rgba(255,255,255,0.6)' }}>
      <div className="kd-footer-inner py-20">
        {/* Brand & Newsletter */}
        <div className="md:col-span-2 pr-0 md:pr-12">
          <Link to="/" className="kd-footer-logo text-white text-3xl mb-6 inline-block no-underline">
            {lang === 'ar' ? 'خدمة' : 'khedma'}<span className="dot" style={{ color: 'var(--teal)' }}>.</span>
          </Link>
          <p className="kd-footer-desc mb-8 text-sm leading-relaxed max-w-sm">
            {t('common.footer_desc')}
          </p>
          <div className="mb-8">
            <div className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('common.newsletter_title')}</div>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 max-w-sm focus-within:border-[var(--teal)] transition-colors">
              <input type="email" placeholder={t('common.newsletter_placeholder')} className="bg-transparent border-none outline-none py-2 px-4 text-sm w-full text-white ltr:text-left rtl:text-right" />
              <button className="bg-[var(--teal)] text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-[var(--teal-dark)] transition-colors whitespace-nowrap">
                {t('common.subscribe')}
              </button>
            </div>
          </div>
          <div className="kd-footer-socials flex gap-4">
            {['f', '𝕏', 'in', '▶'].map((icon, i) => (
              <Link key={i} to="/" className="w-10 h-10 bg-white/5 hover:bg-[var(--teal)] hover:text-slate-900 rounded-xl flex items-center justify-center transition-all duration-300 no-underline text-white font-bold">{icon}</Link>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <div className="kd-footer-col-title text-white text-xs font-bold uppercase tracking-widest mb-8">{t('common.discover')}</div>
          <div className="kd-footer-links flex flex-col gap-4">
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/#about-us">{t('common.about_us')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/categories">{t('common.browse_services')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/providers">{t('common.top_providers')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/register">{t('common.become_partner')}</Link>
          </div>
        </div>

        {/* Support Links */}
        <div>
          <div className="kd-footer-col-title text-white text-xs font-bold uppercase tracking-widest mb-8">{t('common.resources')}</div>
          <div className="kd-footer-links flex flex-col gap-4">
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#help">{t('common.help_center')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#safety">{t('common.trust_safety')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#terms">{t('common.service_terms')}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#privacy">{t('common.privacy_policy')}</Link>
          </div>
        </div>
      </div>

      <div className="kd-footer-bottom border-t border-white/5 py-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1340px] mx-auto px-10">
          <span className="text-xs opacity-50 tracking-wide">© {year} Khedma Egypt. {t('common.crafted_egypt')}</span>
          <div className="flex gap-8">
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/support#privacy">{t('common.privacy_policy')}</Link>
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/support#terms">{t('common.service_terms')}</Link>
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/">{t('common.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
