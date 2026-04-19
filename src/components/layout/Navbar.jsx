// components/layout/Navbar.jsx — khadma design applied
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { Sun, Moon, Globe, Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from 'lucide-react';
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

  // Shadow on scroll - Optimized with throttling
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { 
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close everything on navigate
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-3 px-4 md:px-10',
        scrolled ? 'mt-2' : 'mt-0'
      )}>
        <div className={clsx(
          'mx-auto transition-all duration-700 relative overflow-visible',
          scrolled 
            ? 'max-w-[1200px] bg-white/80 dark:bg-[#0b0c10]/80 backdrop-blur-2xl rounded-[30px] border border-white/20 shadow-2xl px-6 py-2' 
            : 'max-w-[1400px] bg-transparent backdrop-blur-none border-none py-4 px-6'
        )}>
          {/* Subtle line glow inside capsule */}
          {scrolled && <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--teal)]/30 to-transparent pointer-events-none" />}
          
          <div className="flex items-center justify-between gap-4 relative">
            
            {/* Mobile Toggle & Logo Group */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="lg:hidden p-2.5 text-slate-800 dark:text-white bg-white/40 dark:bg-white/10 border border-white/20 backdrop-blur-md rounded-full active:scale-95 transition-all"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <Link to="/" className="kd-nav-logo flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tighter hover:scale-105 transition-transform">
                {lang === 'ar' ? 'خدمة' : 'khedma'}<span className="text-[var(--teal)]">.</span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1 ml-8">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => {
                      if (location.pathname === l.to) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
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

            {/* Middle Search (Desktop Only) */}
            {!isHome && (
              <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8 group">
                <div className="flex items-center w-full bg-white/40 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full pl-5 pr-2 py-1.5 focus-within:ring-4 focus-within:ring-[var(--teal)]/10 focus-within:border-[var(--teal)] transition-all shadow-sm">
                  <input
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder={t('nav.search')}
                    className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-700 dark:text-white placeholder:text-slate-400"
                  />
                  <button type="submit" className="bg-[var(--teal)] text-slate-900 rounded-full p-2.5 hover:bg-[var(--teal-dark)] transition-all transform hover:scale-110 active:scale-95 shadow-md">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2.5"/><path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </form>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3 z-20">
              {/* Controls Wrapper */}
              <div className="hidden md:flex items-center bg-white/40 dark:bg-white/10 border border-white/20 rounded-full px-2 gap-1 backdrop-blur-md shadow-sm">
                <button 
                  onClick={toggle} 
                  className="p-1.5 sm:p-2 text-slate-500 hover:text-[var(--teal)] transition-colors rounded-full" 
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {dark ? <Sun className="w-3.5 h-3.5 sm:w-4 h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 h-4" />}
                </button>
                <div className="w-[1px] h-3 sm:h-4 bg-slate-300 dark:bg-white/20 mx-0.5 sm:mx-1" />
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
                  className="px-1 sm:px-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[var(--teal)] transition-colors font-dm"
                >
                  {lang === 'en' ? 'Ar' : 'En'}
                </button>
              </div>

              {user ? (
                <div className="relative" ref={dropRef}>
                  <button 
                    onClick={() => setDropOpen(!dropOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 p-1 bg-white/60 dark:bg-white/10 border border-info/10 rounded-full hover:bg-white/80 dark:hover:bg-white/20 transition-all shadow-md group active:scale-95"
                  >
                    <div className="relative">
                      {user.avatar
                        ? <img src={user.avatar} alt={user.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm" />
                        : <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[var(--teal)] to-indigo-600 flex items-center justify-center text-white text-[11px] sm:text-[13px] font-black border-2 border-white dark:border-slate-800 shadow-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                      }
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full shadow-sm" />
                    </div>
                    <ChevronDown size={14} className={clsx("text-slate-400 dark:text-slate-500 transition-transform duration-300 me-1", dropOpen && "rotate-180")} />
                  </button>

                  {/* Enhanced Dropdown Menu - RTL Aware */}
                  <div className={clsx(
                    "absolute top-full mt-3 w-64 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] py-2.5 z-[110] transition-all duration-300",
                    isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right",
                    dropOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  )}>
                    {/* User Header Section */}
                    <div className={clsx(
                      "px-5 py-4 mb-2 border-b border-slate-100 dark:border-white/5 flex items-center gap-3",
                      isRTL && "flex-row-reverse text-right"
                    )}>
                      {user.avatar
                        ? <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shadow-inner" />
                        : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--teal)] to-indigo-600 flex items-center justify-center text-white font-black text-sm uppercase">
                            {user.name?.charAt(0)}
                          </div>
                      }
                      <div className="overflow-hidden flex-1">
                        <div className="text-sm font-black text-slate-800 dark:text-white truncate leading-tight">{user.name}</div>
                        <div className="text-[10px] font-bold text-[var(--teal)] uppercase tracking-widest mt-0.5 leading-none">{user.role}</div>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="px-2 space-y-1">
                      <Link 
                        to={dashboardPath} 
                        className={clsx(
                          "flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[var(--teal)] rounded-2xl transition-all group",
                          isRTL && "flex-row-reverse text-right"
                        )}
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[var(--teal)]/10 transition-colors">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        {t('nav.dashboard')}
                      </Link>
                      
                      <div className="h-px bg-slate-100 dark:bg-white/5 my-2 mx-2" />

                      <button 
                        onClick={() => { setDropOpen(false); logout(); navigate('/register'); }} 
                        className={clsx(
                          "w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 rounded-2xl transition-all group",
                          isRTL && "flex-row-reverse text-right"
                        )}
                      >
                        <div className="w-8 h-8 rounded-xl bg-red-100/50 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                          <LogOut className="w-4 h-4" />
                        </div>
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/register" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-tight shadow-xl hover:scale-105 active:scale-95 transition-all">
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div 
        className={clsx(
          "lg:hidden fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-md transition-opacity duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={clsx(
            "absolute top-0 bottom-0 w-[85%] max-w-[400px] bg-white dark:bg-[#0c0d10] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col",
            isRTL ? "right-0" : "left-0",
            menuOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Header in Drawer */}
          <div className="p-8 pb-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-black tracking-tighter" onClick={() => setMenuOpen(false)}>
              {lang === 'ar' ? 'خدمة' : 'khedma'}<span className="text-[var(--teal)]">.</span>
            </Link>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">
              {isRTL ? 'القائمة الرئيسية' : 'Main Menu'}
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link 
                  key={l.to} 
                  to={l.to} 
                  onClick={() => {
                    setMenuOpen(false);
                    if (location.pathname === l.to) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={clsx(
                    "flex items-center h-14 px-6 rounded-2xl text-lg font-black tracking-tight transition-all",
                    location.pathname === l.to 
                      ? "bg-[var(--teal)]/10 text-[var(--teal-dark)]" 
                      : "text-slate-700 dark:text-slate-400 active:bg-slate-50 dark:active:bg-white/5"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            
            <div className="h-px bg-slate-100 dark:bg-white/5 my-8 mx-4" />
            
            {!user ? (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="h-14 flex items-center justify-center font-bold text-slate-500">{t('nav.login')}</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="h-14 flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                   {t('nav.register')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-4 px-6 py-5 bg-slate-50 dark:bg-white/5 rounded-[32px]">
                   <div className="w-12 h-12 rounded-full bg-[var(--teal)] text-white flex items-center justify-center font-black text-xl overflow-hidden shadow-md">
                     {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name?.charAt(0)}
                   </div>
                   <div>
                     <div className="text-base font-black text-slate-800 dark:text-white truncate">{user.name}</div>
                     <div className="text-[10px] font-bold text-[var(--teal)] uppercase tracking-widest mt-0.5">{user.role}</div>
                   </div>
                </div>
                <Link to={dashboardPath} className="h-14 flex items-center gap-4 px-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold text-slate-700 dark:text-slate-200 shadow-sm">
                  <LayoutDashboard size={20} />
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={() => { setMenuOpen(false); logout(); navigate('/register'); }} 
                  className="w-full h-14 flex items-center gap-4 px-6 rounded-2xl bg-red-50 dark:bg-red-500/5 text-red-500 font-bold"
                >
                  <LogOut size={20} />
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Utility Footer */}
          <div className="p-4 mt-auto">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
                className="flex-1 h-14 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 border border-transparent hover:border-[var(--teal)]/20 transition-all"
              >
                <Globe size={18} className="text-[var(--teal)]" />
                {lang === 'en' ? 'Arabic' : 'English'}
              </button>
              <button 
                onClick={toggle} 
                className="w-14 h-14 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-transparent hover:border-[var(--teal)]/20 transition-all"
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
