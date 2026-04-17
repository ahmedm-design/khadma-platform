// components/layout/Footer.jsx — khadma design applied
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Footer() {
  const { t, lang } = useLang();
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="kd-footer">
      <div className="kd-footer-inner">
        {/* Brand */}
        <div>
          <Link to="/" className="kd-footer-logo">
            {isAr ? 'خدمة' : 'khedma'}<span className="dot">.</span>
          </Link>
          <p className="kd-footer-desc">
            {isAr
              ? 'نربط العملاء بالمحترفين الموثوقين في جميع أنحاء مصر. خدمات سريعة وموثوقة وبأسعار معقولة.'
              : 'Connecting customers with trusted professionals across Egypt. Fast, reliable, and affordable services at your fingertips.'
            }
          </p>
          <div className="kd-footer-socials">
            {['f', '𝕏', 'in', '▶'].map((icon, i) => (
              <Link key={i} to="/" className="kd-footer-social">{icon}</Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="kd-footer-col-title">{isAr ? 'الخدمات' : 'Services'}</div>
          <div className="kd-footer-links">
            <Link className="kd-footer-link" to="/providers?q=plumb">{isAr ? 'سباكة' : 'Plumbing'}</Link>
            <Link className="kd-footer-link" to="/providers?q=electric">{isAr ? 'كهرباء' : 'Electrical'}</Link>
            <Link className="kd-footer-link" to="/providers?q=cleaning">{isAr ? 'تنظيف' : 'Cleaning'}</Link>
            <Link className="kd-footer-link" to="/providers?q=web">{isAr ? 'تطوير مواقع' : 'Web Development'}</Link>
            <Link className="kd-footer-link" to="/providers?q=design">{isAr ? 'تصميم' : 'Graphic Design'}</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="kd-footer-col-title">{isAr ? 'الشركة' : 'Company'}</div>
          <div className="kd-footer-links">
            <Link className="kd-footer-link" to="/#about-us">{isAr ? 'من نحن' : 'About Us'}</Link>
            <Link className="kd-footer-link" to="/categories">{isAr ? 'الخدمات' : 'Services'}</Link>
            <Link className="kd-footer-link" to="/providers">{isAr ? 'مقدمو الخدمات' : 'Providers'}</Link>
            <Link className="kd-footer-link" to="/register">{isAr ? 'انضم إلينا' : 'Join Us'}</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <div className="kd-footer-col-title">{isAr ? 'الدعم' : 'Support'}</div>
          <div className="kd-footer-links">
            <Link className="kd-footer-link" to="/">{isAr ? 'مركز المساعدة' : 'Help Center'}</Link>
            <Link className="kd-footer-link" to="/">{isAr ? 'الثقة والأمان' : 'Trust & Safety'}</Link>
            <Link className="kd-footer-link" to="/">{isAr ? 'شروط الخدمة' : 'Terms of Service'}</Link>
            <Link className="kd-footer-link" to="/">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
          </div>
        </div>
      </div>

      <div className="kd-footer-bottom">
        <span className="kd-footer-bottom-text">© {year} Khedma. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
        <div className="kd-footer-bottom-links">
          <Link className="kd-footer-bottom-link" to="/">{isAr ? 'الخصوصية' : 'Privacy'}</Link>
          <Link className="kd-footer-bottom-link" to="/">{isAr ? 'الشروط' : 'Terms'}</Link>
          <Link className="kd-footer-bottom-link" to="/">{isAr ? 'ملفات الارتباط' : 'Cookies'}</Link>
        </div>
      </div>
    </footer>
  );
}
