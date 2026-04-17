// components/layout/BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Grid, User, Settings } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function BottomNav() {
  const location = useLocation();
  const { lang, t } = useLang();
  const { user } = useAuth();

  const isAr = lang === 'ar';

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/search', label: t('nav.search'), icon: Search },
    { to: '/categories', label: isAr ? 'الأقسام' : 'Categories', icon: Grid },
    { 
      to: user ? (user.role === 'provider' ? '/provider-dashboard' : '/dashboard') : '/login', 
      label: user ? (isAr ? 'حسابي' : 'Account') : (isAr ? 'دخول' : 'Login'), 
      icon: User 
    },
  ];

  return (
    <nav className="kd-bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.to}
            to={item.to}
            className={clsx('kd-bottom-nav-item', isActive && 'active')}
          >
            <Icon className={clsx('transition-transform', isActive && 'scale-110')} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
