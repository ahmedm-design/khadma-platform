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
            {isAr ? 'خدمة' : 'khedma'}<span className="dot" style={{ color: 'var(--teal)' }}>.</span>
          </Link>
          <p className="kd-footer-desc mb-8 text-sm leading-relaxed max-w-sm">
            {isAr
              ? 'نحن نعيد تعريف الطريقة التي تجد بها الخدمات في مصر. من خلال الجمع بين التكنولوجيا والثقة، نربطك بأفضل المحترفين في بضع نقرات.'
              : 'We are redefining the way you find services in Egypt. By combining technology with trust, we connect you with top-tier professionals in just a few clicks.'
            }
          </p>
          <div className="mb-8">
            <div className="text-white text-xs font-bold uppercase tracking-widest mb-4">{isAr ? 'اشترك في نشرتنا' : 'Stay in the loop'}</div>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 max-w-sm focus-within:border-[var(--teal)] transition-colors">
              <input type="email" placeholder={isAr ? 'بريدك الإلكتروني' : 'Email address'} className="bg-transparent border-none outline-none py-2 px-4 text-sm w-full text-white" />
              <button className="bg-[var(--teal)] text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-[var(--teal-dark)] transition-colors">
                {isAr ? 'اشترك' : 'Subscribe'}
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
          <div className="kd-footer-col-title text-white text-xs font-bold uppercase tracking-widest mb-8">{isAr ? 'اكتشف' : 'Discover'}</div>
          <div className="kd-footer-links flex flex-col gap-4">
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/#about-us">{isAr ? 'من نحن' : 'About Us'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/categories">{isAr ? 'تصفح الخدمات' : 'Browse Services'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/providers">{isAr ? 'أفضل المحترفين' : 'Top Providers'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/register">{isAr ? 'كن شريكاً لنا' : 'Become a Partner'}</Link>
          </div>
        </div>

        {/* Support Links */}
        <div>
          <div className="kd-footer-col-title text-white text-xs font-bold uppercase tracking-widest mb-8">{isAr ? 'المساعدة' : 'Resources'}</div>
          <div className="kd-footer-links flex flex-col gap-4">
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#help">{isAr ? 'مركز المساعدة' : 'Help Center'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#safety">{isAr ? 'الأمان' : 'Trust & Safety'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#terms">{isAr ? 'الشروط' : 'Service Terms'}</Link>
            <Link className="kd-footer-link hover:text-white transition-colors no-underline text-sm" to="/support#privacy">{isAr ? 'الخصوصية' : 'Privacy Policy'}</Link>
          </div>
        </div>
      </div>

      <div className="kd-footer-bottom border-t border-white/5 py-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1340px] mx-auto px-10">
          <span className="text-xs opacity-50 tracking-wide">© {year} Khedma Egypt. {isAr ? 'صنع بكل فخر في مصر.' : 'Crafted with pride in Egypt.'}</span>
          <div className="flex gap-8">
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/support#privacy">{isAr ? 'سياسة الخصوصية' : 'Privacy'}</Link>
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/support#terms">{isAr ? 'شروط الاستخدام' : 'Terms'}</Link>
            <Link className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors no-underline cursor-pointer" to="/">{isAr ? 'الكوكيز' : 'Cookies'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
