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
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 px-6 md:px-10',
        scrolled ? 'mt-2' : 'mt-0'
      )}>
        <div className={clsx(
          'mx-auto transition-all duration-700 relative overflow-hidden',
          scrolled 
            ? 'max-w-[1200px] bg-white/70 dark:bg-[#0b0c10]/70 backdrop-blur-2xl rounded-[30px] border border-white/20 shadow-2xl px-6 py-2' 
            : 'max-w-[1400px] bg-transparent backdrop-blur-none border-none py-4'
        )}>
          {/* Subtle line glow inside capsule */}
          {scrolled && <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--teal)]/20 to-transparent pointer-events-none" />}          <div className="flex items-center justify-between gap-4 relative">
            
            {/* Mobile Toggle (Left) */}
            <div className="lg:hidden flex items-center z-20">
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="p-2.5 text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 rounded-full active:scale-95 transition-all"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Logo (Centered on Mobile, Left on Desktop) */}
            <div className="flex items-center lg:static absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 z-10 transition-all duration-500">
               <Link to="/" className="kd-nav-logo flex items-center gap-2 text-3xl font-black tracking-tighter hover:scale-105 transition-transform" onClick={() => setMenuOpen(false)}>
                 {lang === 'ar' ? 'خدمة' : 'khedma'}<span className="text-[var(--teal)]">.</span>
               </Link>

               {/* Desktop Nav Links */}
               <nav className="hidden lg:flex items-center gap-1 ml-8">
                 {navLinks.map((l) => (
                   <Link
                     key={l.to}
                     to={l.to}
                     className={clsx(
                       'px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 relative group',
                       location.pathname === l.to ? 'text-[var(--teal-dark)]' : 'text-slate-500 uppercase'
                     )}
                   >
                     {l.label}
                     {location.pathname === l.to && (
                       <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--teal)] rounded-full animate-pulse" />
                     )}
                     <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--teal)] rounded-full transition-all group-hover:w-4" />
                   </Link>
                 ))}
               </nav>
            </div>

            {/* Middle Search - Professional Layout (Hidden on mobile) */}
            {!isHome && (
              <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8 group">
                <div className="flex items-center w-full bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-5 pr-2 py-1.5 focus-within:ring-4 focus-within:ring-[var(--teal)]/10 focus-within:border-[var(--teal)] transition-all">
                  <input
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder={t('nav.search')}
                    className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-700 dark:text-white"
                  />
                  <button type="submit" className="bg-[var(--teal)] text-slate-900 rounded-full p-2.5 hover:bg-[var(--teal-dark)] transition-all transform hover:scale-110 active:scale-95">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2.5"/><path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </form>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-3 z-20">
              <div className="hidden sm:flex items-center bg-slate-100/30 dark:bg-white/5 rounded-full px-2 py-1 gap-1 border border-white/5 backdrop-blur-md">
                <button onClick={toggle} className="p-2 text-slate-500 hover:text-[var(--teal)] transition-colors rounded-full" aria-label="Toggle theme">
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/10 mx-1" />
                <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-2 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[var(--teal)] transition-colors">
                  {lang === 'en' ? 'Ar' : 'En'}
                </button>
              </div>

              {user ? (
                <div className="relative" ref={dropRef}>
                  <button 
                    onClick={() => setDropOpen(!dropOpen)}
                    className="flex items-center gap-1 p-1 bg-white/40 dark:bg-white/5 border border-white/20 rounded-full hover:bg-white/80 transition-all shadow-sm"
                  >
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-[var(--teal)]" />
                      : <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--teal)] to-indigo-500 flex items-center justify-center text-white text-xs font-black">{user.name?.charAt(0)}</div>
                    }
                  </button>

                  {dropOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0b0c10] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 z-[110] animate-scale-in">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <div className="text-xs font-black text-[var(--teal)] uppercase tracking-widest mb-0.5">{user.role}</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</div>
                      </div>
                      <Link to={dashboardPath} onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-[var(--teal)] hover:text-white transition-all">
                        <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                      </Link>
                      <button onClick={() => { logout(); setDropOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all border-t border-slate-100 dark:border-white/5">
                        <LogOut className="w-4 h-4" /> {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/register" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-black uppercase tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all">
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>

          </div> {/* closes inner flex row */}
        </div> {/* closes outer capsule div */}
      </header> {/* closes header */}

      {/* Mobile Menu - Premium Slide Drawer */}
      <div 
        className={clsx(
          "lg:hidden fixed inset-0 z-[150] bg-slate-900/40 backdrop-blur-md transition-opacity duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={clsx(
            "absolute top-0 bottom-0 w-[80%] max-w-[400px] bg-white dark:bg-[#0c0d10] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-8 py-20 flex flex-col",
            isRTL 
              ? (menuOpen ? "left-0 translate-x-0" : "left-0 -translate-x-full")
              : (menuOpen ? "right-0 translate-x-0" : "right-0 translate-x-full")
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button Inside */}
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 px-4">
              {isRTL ? 'التنقل الرئيسي' : 'Main Navigation'}
            </div>
            {navLinks.map((l) => (
              <Link 
                key={l.to} 
                to={l.to} 
                onClick={() => setMenuOpen(false)} 
                className={clsx(
                  "flex items-center h-[56px] px-6 rounded-2xl text-xl font-black transition-all tracking-tight",
                  location.pathname === l.to 
                    ? "bg-[var(--teal)] text-white shadow-lg shadow-[var(--teal)]/20" 
                    : "text-slate-700 dark:text-slate-400 active:bg-slate-100 dark:active:bg-white/5"
                )}
              >
                {l.label}
              </Link>
            ))}
            
            <div className="h-px bg-slate-100 dark:bg-white/5 my-10 mx-4" />
            
            {!user ? (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="h-[56px] flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.login')}</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="h-[56px] flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-tight shadow-lg shadow-black/10 active:scale-95 transition-all">
                  {t('nav.register')}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to={dashboardPath} onClick={() => setMenuOpen(false)} className="h-[56px] flex items-center gap-4 px-6 rounded-2xl bg-slate-100 dark:bg-white/5 font-bold text-slate-700 dark:text-slate-200">
                  <LayoutDashboard className="w-5 h-5" /> {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className="h-[56px] flex items-center gap-4 px-6 rounded-2xl text-red-500 font-bold active:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Utility Footer (Theme & Lang) */}
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">{isRTL ? 'تغيير اللغة' : 'Language'}</span>
              <button 
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }} 
                className="flex items-center px-4 h-[44px] bg-white dark:bg-white/10 rounded-xl shadow-sm text-xs font-black text-[var(--teal)] uppercase tracking-widest"
              >
                {lang === 'en' ? 'Arabic' : 'English'}
              </button>
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
               <span className="text-xs font-black uppercase tracking-widest text-slate-500">{isRTL ? 'الوضع المظلم' : 'Dark Mode'}</span>
               <button onClick={toggle} className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm text-slate-500">
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
               </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
