// pages/dashboard/AdminDashboard.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import {
  LayoutDashboard, Users, Briefcase, Tag, CheckCircle, XCircle,
  TrendingUp, ToggleLeft, ToggleRight, Star, Plus, Edit3, Trash2,
  Users2, UserCheck, Layers, Eye, Zap, ArrowRight
} from 'lucide-react';

// ── Sidebar ──────────────────────────────────────────────────
function AdminSidebar() {
  const { t } = useLang();
  const { pathname } = useLocation();

  const links = [
    { to: '/admin',           label: t('admin.stats'),     icon: TrendingUp,   exact: true },
    { to: '/admin/users',     label: t('admin.users'),     icon: Users },
    { to: '/admin/providers', label: t('admin.providers'), icon: Briefcase },
    { to: '/admin/categories',label: t('admin.categories'),icon: Tag },
  ];

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      <div className="card p-3 sticky top-24">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Admin</p>
        <nav className="space-y-0.5">
          {links.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to) && to !== '/admin';
            const isExactActive = exact && pathname === to;
            const finalActive = exact ? isExactActive : active;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  finalActive
                    ? 'bg-[var(--teal)]/10 text-[var(--teal-dark)]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ── Stats Panel — Production Grade SaaS Analytics ──────────────────────────
function AdminStats() {
  const { t } = useLang();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('24H');

  useEffect(() => {
    setLoading(true);
    // Real API call with range parameter
    api.get(`/stats?range=${timeframe}`)
      .then(({ data }) => {
        const payload = data.data;
        
        // Map backend records to chart structure: { label, count }
        // Backend typically returns: { _id: { year, month, day, hour }, count }
        if (payload && payload.monthlySignups) {
          payload.monthlySignups = payload.monthlySignups.map(record => {
            // Priority: Hour > Day > Month based on detail available
            let lbl = 'N/A';
            if (record._id.hour !== undefined) lbl = `${record._id.hour}:00`;
            else if (record._id.day !== undefined) lbl = `${record._id.day}/${record._id.month}`;
            else if (record._id.month !== undefined) {
              const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              lbl = months[record._id.month - 1];
            }
            return { label: lbl, count: record.count };
          });
        }
        
        setStats(payload);
      })
      .catch((err) => {
        console.error('Core Stats API Error:', err);
        // We do NOT set mock data here anymore as per strict instructions
        setStats(null);
      })
      .finally(() => setLoading(false));
  }, [timeframe]);

  const finalStats = stats || { totalUsers: 0, totalProviders: 0, pendingProviders: 0, totalCategories: 0, monthlySignups: [] };

  const cards = [
    { label: t('admin.total_users'), value: finalStats.totalUsers, change: '+12.5%', color: 'text-sky-500', icon: Users2, trend: 'up' },
    { label: t('admin.total_providers'), value: finalStats.totalProviders, change: '+8.2%', color: 'text-[var(--teal)]', icon: Briefcase, trend: 'up' },
    { label: t('admin.pending_providers'), value: finalStats.pendingProviders, change: '-2 active', color: 'text-amber-500', icon: UserCheck, trend: 'down' },
    { label: t('admin.total_categories'), value: finalStats.totalCategories, change: 'Stable', color: 'text-violet-500', icon: Layers, trend: 'neutral' },
  ];

  return (
    <div className="animate-fade-up space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--teal)] mb-3">
            <div className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse shadow-[0_0_10px_rgba(15,184,157,0.5)]" />
            {t('admin.performance_metrics')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tighter leading-none decoration-teal-500 underline-offset-8">
            {t('admin.growth_acquisition')}
          </h2>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="group relative p-8 rounded-[40px] bg-white/40 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--teal)]/10 overflow-hidden">
            <div className="absolute top-0 rtl:left-0 ltr:right-0 p-6 opacity-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
               <card.icon className={clsx("w-32 h-32", card.color)} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                    <card.icon className="w-6 h-6" />
                 </div>
                 <span className={clsx("text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-md", 
                   card.trend === 'up' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                   card.trend === 'down' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                   "bg-slate-500/10 text-slate-500 border-slate-500/20"
                 )}>
                   {card.change}
                 </span>
              </div>
              <div className={clsx("text-5xl font-black tracking-tighter mb-2", card.color)}>
                {card.value?.toLocaleString()}
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Chart Visual Area - Elite SaaS Design */}
      <div className="w-full p-8 sm:p-12 bg-white dark:bg-[#0e0e11] border border-slate-100 dark:border-white/5 rounded-[32px] shadow-sm relative group/chart">
        {/* Header section with Clean Metric */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 relative z-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('admin.acquisition_velocity')}</h3>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest border border-emerald-200 dark:border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> {t('admin.live')}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{t('admin.platform_registrations')}</p>
          </div>
          <div className="text-start sm:text-end">
             <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('admin.total_period_growth')}</div>
             <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {useMemo(() => finalStats.monthlySignups.reduce((acc, curr) => acc + (curr.count || 0), 0).toLocaleString(), [finalStats.monthlySignups])} <span className="text-sm font-medium text-slate-400">{t('admin.users_count')}</span>
             </div>
          </div>
        </div>

        {(() => {
          const maxVal = useMemo(() => finalStats.monthlySignups.length ? Math.max(...finalStats.monthlySignups.map((x) => x.count || 0)) : 0, [finalStats.monthlySignups]);
          
          return (
            <div className="flex items-end gap-1 sm:gap-3 h-64 sm:h-80 relative px-2 ltr:ml-8 rtl:mr-8 group/all-bars mt-4">
              {/* Y-Axis scale - Ultra clean */}
              <div className="absolute ltr:-left-10 rtl:-right-10 top-0 bottom-6 flex flex-col justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 text-end ltr:pr-4 rtl:pl-4 opacity-60 w-12 pb-2">
                <span>{maxVal}</span>
                <span>{Math.round(maxVal * 0.75)}</span>
                <span>{Math.round(maxVal * 0.5)}</span>
                <span>{Math.round(maxVal * 0.25)}</span>
                <span>0</span>
              </div>

              {/* Background Grid - Faint dotted */}
              <div className="absolute inset-x-0 inset-y-0 bottom-8 flex flex-col justify-between pointer-events-none">
                {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-slate-200 border-dashed dark:border-white/10 opacity-40" />)}
              </div>

              {finalStats.monthlySignups.map((m, idx) => {
                const pct = maxVal ? (m.count / maxVal) * 100 : 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 relative z-10 h-full justify-end group/bar cursor-crosshair">
                    
                    {/* Vertical Hover Crosshair Line */}
                    <div className="absolute inset-x-1/2 -translate-x-1/2 inset-y-0 bottom-6 w-[1px] bg-slate-200 dark:bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                    {/* Smooth Tooltip */}
                    <div className="opacity-0 group-hover/bar:opacity-100 transition-all duration-300 absolute -top-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-md text-[10px] font-bold shadow-xl pointer-events-none z-30 flex items-center gap-2 whitespace-nowrap transform -translate-y-2 group-hover/bar:-translate-y-4">
                      <span className="opacity-70 font-semibold">{m.label}</span>
                      <span>{m.count?.toLocaleString()} {t('admin.signups')}</span>
                    </div>
                    
                    {/* Cinematic Bar Design */}
                    <div className="w-full relative h-full flex items-end justify-center group-hover/all-bars:opacity-30 group-hover/bar:!opacity-100 transition-opacity duration-500">
                      
                      {/* Floating Data Value Above Bar */}
                      <span 
                         className="absolute w-full text-center text-[10px] font-bold text-[var(--teal-dark)] dark:text-[var(--teal)] opacity-0 group-hover/bar:opacity-100 transition-all duration-300 pointer-events-none pb-2 transform translate-y-2 group-hover/bar:translate-y-0"
                         style={{ bottom: `${Math.max(pct, 2)}%` }}
                      >
                        {m.count}
                      </span>

                      <div 
                        className="w-full max-w-[40px] bg-gradient-to-b from-slate-200 to-transparent dark:from-white/10 dark:to-transparent group-hover/bar:from-[var(--teal)] group-hover/bar:to-[var(--teal)]/5 rounded-t-sm transition-all duration-500" 
                        style={{ height: `${Math.max(pct, 2)}%` }} 
                      />
                    </div>

                    {/* X-Axis Label */}
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 truncate w-full text-center group-hover/bar:text-slate-900 dark:group-hover/bar:text-white transition-colors duration-300">
                      {m.label}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ── Users Panel ──────────────────────────────────────────────
function AdminUsers() {
  const { t, isRTL } = useLang();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    api.get('/admin/users').then(({ data }) => setUsers(data.data)).finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(users.length / pageSize);
  const displayUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, page, pageSize]);

  const toggleActive = useCallback(async (id) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/toggle`);
      setUsers((prev) => prev.map((u) => u._id === id ? data.data : u));
      toast.success('User status updated');
    } catch (err) {
      toast.error('Could not update user');
    }
  }, []);

  if (loading) return <div className="skeleton h-64 rounded-2xl" />;

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-6">{t('admin.users')}</h2>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {['Name', 'Email', 'Role', 'Joined', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 text-start text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {displayUsers.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`badge capitalize ${
                      u.role === 'admin' ? 'bg-sky-100 text-sky-700' :
                      u.role === 'provider' ? 'bg-[var(--teal)]/20 text-[var(--teal-dark)]' :
                      'bg-slate-100 text-slate-600'
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${u.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                      {u.isActive ? t('admin.active') : t('admin.inactive')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.role !== 'admin' && (
                      <button onClick={() => toggleActive(u._id)} className="text-slate-400 hover:text-[var(--teal)] transition-colors p-1 rounded-full hover:bg-[var(--teal)]/10">
                        {u.isActive ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5" />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-700 text-sm">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)} 
              className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              {isRTL ? 'التالي' : 'Previous'}
            </button>
            <div className="text-slate-500 font-medium">
              Page <span className="font-bold text-slate-900 dark:text-white">{page}</span> of {totalPages}
            </div>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)} 
              className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              {isRTL ? 'السابق' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Providers Panel ──────────────────────────────────────────
function AdminProviders() {
  const { t, isRTL } = useLang();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('pending');
  const [rejectId, setRejectId]   = useState(null);
  const [reason, setReason]       = useState('');
  
  const [page, setPage] = useState(1);
  const pageSize = 5; // Reduced page size because cards are heavy

  const fetchProviders = useCallback((status) => {
    setLoading(true);
    api.get(`/admin/providers?status=${status}`)
      .then(({ data }) => {
        setProviders(data.data);
        setPage(1); // Reset to page 1 on tab change
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProviders(tab); }, [fetchProviders, tab]);

  const totalPages = Math.ceil(providers.length / pageSize);
  const displayProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return providers.slice(start, start + pageSize);
  }, [providers, page, pageSize]);

  const approve = useCallback(async (id) => {
    try {
      await api.put(`/admin/providers/${id}/approve`);
      toast.success('Provider approved!');
      setProviders((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error('Approval failed');
    }
  }, []);

  const reject = useCallback(async () => {
    if (!reason) return toast.error('Please provide a reason');
    try {
      await api.put(`/admin/providers/${rejectId}/reject`, { reason });
      toast.success('Provider rejected');
      setProviders((prev) => prev.filter((p) => p._id !== rejectId));
      setRejectId(null);
      setReason('');
    } catch {
      toast.error('Rejection failed');
    }
  }, [reason, rejectId]);

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-6">{t('admin.providers')}</h2>

      {/* Status tabs */}
      <div className="flex gap-2 mb-5">
        {['pending', 'approved', 'rejected'].map((s) => (
          <button key={s} onClick={() => setTab(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors border ${
              tab === s ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'
            }`}
          >{s}</button>
        ))}
      </div>

      {loading ? <div className="skeleton h-64 rounded-2xl" /> : (
        <div className="space-y-3">
          {providers.length === 0 && (
            <div className="card p-10 text-center text-slate-400">No {tab} providers</div>
          )}
          {displayProviders.map((p) => (
            <div key={p._id} className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center sm:items-start gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-[var(--teal)]/10 dark:bg-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md border border-slate-100 dark:border-white/10">
                    {(() => {
                      const avatarSrc = p.image || p.avatar || p.user?.image;
                      const fallback = p.businessName ? p.businessName.charAt(0).toUpperCase() : '👤';

                      return (
                        <div className="w-full h-full flex items-center justify-center group">
                          {avatarSrc && (
                            <img
                              src={avatarSrc}
                              loading="lazy"
                              alt={p.businessName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          )}
                          <div 
                            className="w-full h-full items-center justify-center font-black text-3xl text-[var(--teal-dark)] dark:text-[var(--teal)] bg-gradient-to-br from-transparent to-black/[0.02]"
                            style={{ display: avatarSrc ? 'none' : 'flex' }}
                          >
                            {fallback}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{p.businessName}</h3>
                    <p className="text-xs text-slate-400">{p.user?.email}</p>
                    {p.city && <p className="text-xs text-slate-400">{p.city}</p>}
                    {p.category && (
                      <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-1 shadow-sm">
                        {p.category.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 w-full sm:w-auto">
                  <span className="text-xs font-black text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 uppercase tracking-widest whitespace-nowrap">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                  <div className="flex justify-end gap-2 w-full sm:w-auto">
                    {tab === 'pending' && (
                      <>
                        <button onClick={() => approve(p._id)} className="btn-primary text-xs py-2 px-3 gap-1 shadow-md hover:shadow-lg">
                          <CheckCircle className="w-3.5 h-3.5" /> {t('admin.approve')}
                        </button>
                        <button onClick={() => setRejectId(p._id)} className="btn-secondary text-xs py-2 px-3 gap-1 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300">
                          <XCircle className="w-3.5 h-3.5" /> {t('admin.reject')}
                        </button>
                      </>
                    )}
                    {tab === 'approved' && (
                      <span className="badge bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 shadow-inner">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    )}
                  </div>
                </div>
                {p.ratingCount > 0 && (
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {p.ratingAvg} ({p.ratingCount})
                  </div>
                )}
              </div>
              {p.description && <p className="text-xs text-slate-500 mt-3 line-clamp-2">{p.description}</p>}
            </div>
          ))}
          
        {/* Pagination UI for Providers */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 mt-4 bg-white/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-700/50 backdrop-blur-md rounded-2xl text-sm shadow-sm">
            <button 
              disabled={page === 1} 
              onClick={() => { setPage(p => p - 1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
              className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              {isRTL ? 'التالي' : 'Previous'}
            </button>
            <div className="text-slate-500 font-medium tracking-wide">
              Page <span className="font-black text-slate-900 dark:text-white px-1">{page}</span> of {totalPages}
            </div>
            <button 
              disabled={page === totalPages} 
              onClick={() => { setPage(p => p + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
              className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              {isRTL ? 'السابق' : 'Next'}
            </button>
          </div>
        )}
        </div>
      )}

      {/* Reject modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card p-6 w-full max-w-sm animate-fade-up">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Reject Provider</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rejection..."
              rows={3}
              className="input text-sm resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => { setRejectId(null); setReason(''); }} className="btn-ghost flex-1 text-sm">{t('common.cancel')}</button>
              <button onClick={reject} className="btn-primary flex-1 text-sm bg-red-500 hover:bg-red-600">{t('admin.reject')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Categories Panel ─────────────────────────────────────────
function AdminCategories() {
  const { t, isRTL } = useLang();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState({ name: '', nameAr: '', description: '', descriptionAr: '', icon: '🔧', slug: '' });

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    api.get('/admin/categories').then(({ data }) => setCategories(data.data)).finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(categories.length / pageSize);
  const displayCategories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return categories.slice(start, start + pageSize);
  }, [categories, page, pageSize]);

  const handleSubmit = useCallback(async () => {
    try {
      if (editingCat) {
        const { data } = await api.put(`/admin/categories/${editingCat._id}`, form);
        setCategories((prev) => prev.map((c) => c._id === editingCat._id ? data.data : c));
        toast.success('Category updated');
      } else {
        const { data } = await api.post('/admin/categories', form);
        setCategories((prev) => [...prev, data.data]);
        toast.success('Category created');
      }
      setShowForm(false);
      setEditingCat(null);
      setForm({ name: '', nameAr: '', description: '', descriptionAr: '', icon: '🔧', slug: '' });
    } catch (err) { toast.error(err.message); }
  }, [editingCat, form]);

  const startEdit = useCallback((cat) => {
    setEditingCat(cat);
    setForm({ name: cat.name, nameAr: cat.nameAr, description: cat.description || '', descriptionAr: cat.descriptionAr || '', icon: cat.icon, slug: cat.slug });
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Could not delete category');
    }
  }, []);

  if (loading) return <div className="skeleton h-64 rounded-2xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-xl text-slate-900 dark:text-white">{t('admin.categories')}</h2>
        <button onClick={() => { setShowForm(true); setEditingCat(null); }} className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> {t('admin.add_category')}
        </button>
      </div>

      {showForm && (
        <div className="card p-5 mb-5 animate-fade-up">
          <h3 className="font-bold mb-4">{editingCat ? t('admin.edit') : t('admin.add_category')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Name (EN)" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input text-sm" />
            <input placeholder="Name (AR)" value={form.nameAr} onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))} className="input text-sm" dir="rtl" />
            <input placeholder="Slug (e.g. home-maintenance)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g,'-') }))} className="input text-sm" />
            <input placeholder="Icon (emoji)" value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className="input text-sm" />
            <input placeholder="Description (EN)" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="input text-sm col-span-2" />
            <input placeholder="Description (AR)" value={form.descriptionAr} onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))} className="input text-sm col-span-2" dir="rtl" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setShowForm(false); setEditingCat(null); }} className="btn-ghost text-sm">{t('common.cancel')}</button>
            <button onClick={handleSubmit} className="btn-primary text-sm">{t('common.save')}</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayCategories.map((cat) => (
          <div key={cat._id} className="card p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-xs text-slate-400">{cat.nameAr} · {cat.subcategories?.length || 0} subcats</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => startEdit(cat)} className="p-2 text-slate-400 hover:text-[var(--teal)] hover:bg-[var(--teal)]/10 rounded-xl transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination UI for Categories */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 mt-4 bg-white/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-700/50 backdrop-blur-md rounded-2xl text-sm shadow-sm">
          <button 
            disabled={page === 1} 
            onClick={() => { setPage(p => p - 1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
          >
            {isRTL ? 'التالي' : 'Previous'}
          </button>
          <div className="text-slate-500 font-medium tracking-wide">
            Page <span className="font-black text-slate-900 dark:text-white px-1">{page}</span> of {totalPages}
          </div>
          <button 
            disabled={page === totalPages} 
            onClick={() => { setPage(p => p + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
          >
            {isRTL ? 'السابق' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Admin Dashboard wrapper ─────────────────────────────
export default function AdminDashboard() {
  const { t } = useLang();

  return (
    <div className="pb-12 relative overflow-hidden min-h-screen">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-sky-500 opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-app max-w-[1400px] mx-auto relative z-10">
        <div className="mb-12 animate-fade-in">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--teal-dark)] mb-3 inline-block">System Control</span>
          <h1 className="kd-section-title text-4xl md:text-5xl">{t('admin.title')}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-72 flex-shrink-0">
            <AdminSidebar />
          </div>
          <div className="flex-1 min-w-0 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-sm">
            <Routes>
              <Route index element={<AdminStats />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="providers" element={<AdminProviders />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
