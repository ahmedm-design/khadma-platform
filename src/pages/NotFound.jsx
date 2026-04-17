// pages/NotFound.jsx — khadma design applied, logic unchanged
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div style={{ textAlign: 'center', paddingTop: 100, minHeight: '60vh', maxWidth: 600, margin: '0 auto', padding: '100px 20px' }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>😕</div>
      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(60px, 10vw, 100px)', color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>404</div>
      <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: 'var(--ink)', marginBottom: 12 }}>{t('common.not_found')}</h1>
      <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 40 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => window.history.back()} className="kd-btn-outline">← {t('common.back')}</button>
        <Link to="/" className="kd-btn-primary">🏠 {t('common.home')}</Link>
      </div>
    </div>
  );
}
