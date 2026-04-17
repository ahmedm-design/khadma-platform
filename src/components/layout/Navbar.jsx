// components/layout/Navbar.jsx — khadma design applied
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { Sun, Moon, Globe, Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const { lang, setLang, t, isRTL } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled]   = useState(false);
  const dropRef = useRef(null);

  const isHome = location.pathname === '/';

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setMenuOpen(false);
    }
  };

  const dashboardPath = user?.role === 'admin'
    ? '/admin'
    : user?.role === 'provider'
      ? '/provider-dashboard'
      : '/dashboard';

  const navLinks = [
    { to: '/',           label: t('nav.home') },
    { to: '/categories', label: t('nav.categories') },
    { to: '/providers',  label: t('nav.providers') },
  ];


  return (
    <>
      <header className={clsx(
        'sticky top-0 z-50 bg-[var(--paper)] backdrop-blur-md transition-shadow duration-200',
        scrolled && 'shadow-md',
      )} style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container-app" style={{ padding: '0' }}>
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" style={{ height: 'var(--nav-h, 80px)' }}>

            {/* Logo */}
            <Link to="/" className="kd-nav-logo flex-shrink-0">
              {lang === 'ar' ? 'خدمة' : 'khedma'}<span className="dot">.</span>
            </Link>

            {/* Desktop search — hidden on home */}
            {!isHome && (
              <form onSubmit={handleSearch} className="hidden md:flex" style={{ flex: 1, maxWidth: 440, margin: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--kd-white, #fff)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '6px 6px 6px 18px', gap: 8, width: '100%', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--teal)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <input
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder={t('nav.search')}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: 'Sora, sans-serif', fontSize: 16, color: 'var(--ink)', flex: 1 }}
                  />
                  <button type="submit" style={{ background: 'var(--teal)', border: 'none', borderRadius: 30, padding: '8px 20px', color: '#0d0d0d', fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                    <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2"/><path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    {lang === 'ar' ? 'ابحث' : 'Search'}
                  </button>
                </div>
              </form>
            )}

            {/* Spacer — desktop only behavior change */}
            <div className="hidden md:block" style={{ flex: 1 }} />

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center" style={{ gap: 4 }}>
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    fontSize: 16, fontWeight: 500, padding: '10px 16px', borderRadius: 8,
                    textDecoration: 'none', transition: 'color 0.2s, background 0.2s',
                    color: location.pathname === l.to ? 'var(--teal-dark)' : 'var(--muted)',
                    background: location.pathname === l.to ? 'rgba(0,201,167,0.08)' : 'transparent',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center" style={{ gap: 6 }}>
              {/* Theme toggle */}
              <button onClick={toggle} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: 'var(--muted)', fontSize: 16 }} aria-label="Toggle theme">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 8, color: 'var(--muted)', fontSize: 15, fontWeight: 600, gap: 4 }}
              >
                <Globe className="w-5 h-5" />
                <span style={{ minWidth: 20 }}>{lang === 'en' ? 'ع' : 'EN'}</span>
              </button>

              {/* Auth / user menu */}
              {user ? (
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen((o) => !o)}
                    className="flex items-center"
                    style={{ gap: 10, padding: '8px 16px', borderRadius: 12, border: '1.5px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--ink)' }}
                  >
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), #4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700 }}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                    }
                    <span className="hidden sm:block" style={{ fontSize: 15, fontWeight: 600, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                    <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                  </button>

                  {dropOpen && (
                    <div style={{ position: 'absolute', right: 0, marginTop: 8, width: 200, background: 'var(--kd-white, #fff)', border: '1.5px solid var(--border)', borderRadius: 14, boxShadow: 'var(--kd-shadow-lg)', padding: '6px 0', zIndex: 50 }}>
                      <Link
                        to={dashboardPath}
                        onClick={() => setDropOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 14, color: 'var(--ink)', textDecoration: 'none' }}
                      >
                        <LayoutDashboard className="w-4 h-4" style={{ color: 'var(--teal)' }} />
                        {t('nav.dashboard')}
                      </Link>
                      <button
                        onClick={() => { logout(); setDropOpen(false); }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 14, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center" style={{ gap: 10 }}>
                  <Link to="/login" style={{ fontSize: 16, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', padding: '8px 16px', borderRadius: 8 }}>
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" style={{ background: 'var(--ink)', color: 'var(--kd-white, #fff)', border: 'none', borderRadius: 10, padding: '12px 24px', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                    {t('nav.register')}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button onClick={() => setMenuOpen((o) => !o)} className="md:hidden" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--ink)' }}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '12px 0' }}>
              <form onSubmit={handleSearch} style={{ padding: '0 0 12px' }}>
                <div style={{ display: 'flex', background: 'var(--kd-white, #fff)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '6px 6px 6px 18px', gap: 8 }}>
                  <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder={t('nav.search')} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: 'var(--ink)', flex: 1 }} />
                  <button type="submit" style={{ background: 'var(--teal)', border: 'none', borderRadius: 30, padding: '7px 16px', color: '#0d0d0d', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    {lang === 'ar' ? 'ابحث' : 'Search'}
                  </button>
                </div>
              </form>
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 15, fontWeight: 600, color: 'var(--ink)', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
              >
                <Globe className="w-5 h-5" style={{ color: 'var(--muted)' }} />
                {lang === 'en' ? 'العربية (AR)' : 'English (EN)'}
              </button>
              {!user ? (
                <div style={{ display: 'flex', gap: 10, paddingTop: 12 }}>
                  <Link to="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '12px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>{t('nav.login')}</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--ink)', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', textDecoration: 'none' }}>{t('nav.register')}</Link>
                </div>
              ) : (
                <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Link to={dashboardPath} onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', fontSize: 14, color: 'var(--ink)', textDecoration: 'none' }}>
                    <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', fontSize: 14, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <LogOut className="w-4 h-4" /> {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

    </>
  );
}
