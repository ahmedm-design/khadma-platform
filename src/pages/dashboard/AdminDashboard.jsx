// pages/dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Users, Briefcase, Tag, CheckCircle, XCircle,
  TrendingUp, ToggleLeft, ToggleRight, Star, Plus, Edit3, Trash2,
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
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
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

// ── Stats Panel ──────────────────────────────────────────────
function AdminStats() {
  const { t } = useLang();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then(({ data }) => setStats(data.data)).catch(() => {});
  }, []);

  if (!stats) return <div className="skeleton h-64 rounded-2xl" />;

  const cards = [
    { label: t('admin.total_users'),     value: stats.totalUsers,     color: 'text-blue-500',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: t('admin.total_providers'), value: stats.totalProviders, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { label: t('admin.pending_providers'),value: stats.pendingProviders,color:'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: t('admin.total_categories'),value: stats.totalCategories,color: 'text-purple-500',  bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-6">{t('admin.stats')}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, color, bg }) => (
          <div key={label} className={`card p-5 ${bg}`}>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Monthly signups */}
      {stats.monthlySignups?.length > 0 && (
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Monthly Signups (Last 6 months)</h3>
          <div className="flex items-end gap-2 h-32">
            {stats.monthlySignups.map((m) => {
              const maxVal = Math.max(...stats.monthlySignups.map((x) => x.count));
              const pct = maxVal ? (m.count / maxVal) * 100 : 0;
              const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              return (
                <div key={`${m._id.year}-${m._id.month}`} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-primary-500">{m.count}</span>
                  <div className="w-full bg-primary-500 rounded-t-lg transition-all" style={{ height: `${pct}%`, minHeight: '4px' }} />
                  <span className="text-xs text-slate-400">{months[m._id.month - 1]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Users Panel ──────────────────────────────────────────────
function AdminUsers() {
  const { t } = useLang();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users').then(({ data }) => setUsers(data.data)).finally(() => setLoading(false));
  }, []);

  const toggleActive = async (id) => {
    const { data } = await api.put(`/admin/users/${id}/toggle`);
    setUsers((prev) => prev.map((u) => u._id === id ? data.data : u));
    toast.success('User status updated');
  };

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
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`badge capitalize ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      u.role === 'provider' ? 'bg-primary-100 text-primary-700' :
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
                      <button onClick={() => toggleActive(u._id)} className="text-slate-400 hover:text-primary-500 transition-colors">
                        {u.isActive ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5" />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Providers Panel ──────────────────────────────────────────
function AdminProviders() {
  const { t } = useLang();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('pending');
  const [rejectId, setRejectId]   = useState(null);
  const [reason, setReason]       = useState('');

  const fetchProviders = (status) => {
    setLoading(true);
    api.get(`/admin/providers?status=${status}`)
      .then(({ data }) => setProviders(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProviders(tab); }, [tab]);

  const approve = async (id) => {
    await api.put(`/admin/providers/${id}/approve`);
    toast.success('Provider approved!');
    setProviders((prev) => prev.filter((p) => p._id !== id));
  };

  const reject = async () => {
    if (!reason) return toast.error('Please provide a reason');
    await api.put(`/admin/providers/${rejectId}/reject`, { reason });
    toast.success('Provider rejected');
    setProviders((prev) => prev.filter((p) => p._id !== rejectId));
    setRejectId(null);
    setReason('');
  };

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
          {providers.map((p) => (
            <div key={p._id} className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-2xl">
                    {p.category?.icon || '🔧'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{p.businessName}</h3>
                    <p className="text-xs text-slate-400">{p.user?.email}</p>
                    {p.city && <p className="text-xs text-slate-400">{p.city}</p>}
                    {p.category && (
                      <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-1">
                        {p.category.name}
                      </span>
                    )}
                  </div>
                </div>
                {tab === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => approve(p._id)} className="btn-primary text-xs py-2 px-3 gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> {t('admin.approve')}
                    </button>
                    <button onClick={() => setRejectId(p._id)} className="btn-secondary text-xs py-2 px-3 gap-1 border-red-200 text-red-500 hover:bg-red-50">
                      <XCircle className="w-3.5 h-3.5" /> {t('admin.reject')}
                    </button>
                  </div>
                )}
                {tab === 'approved' && (
                  <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <CheckCircle className="w-3 h-3" /> Approved
                  </span>
                )}
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
  const { t } = useLang();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState({ name: '', nameAr: '', description: '', descriptionAr: '', icon: '🔧', slug: '' });

  useEffect(() => {
    api.get('/admin/categories').then(({ data }) => setCategories(data.data)).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
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
  };

  const startEdit = (cat) => {
    setEditingCat(cat);
    setForm({ name: cat.name, nameAr: cat.nameAr, description: cat.description || '', descriptionAr: cat.descriptionAr || '', icon: cat.icon, slug: cat.slug });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    await api.delete(`/admin/categories/${id}`);
    setCategories((prev) => prev.filter((c) => c._id !== id));
    toast.success('Deleted');
  };

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
        {categories.map((cat) => (
          <div key={cat._id} className="card p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-xs text-slate-400">{cat.nameAr} · {cat.subcategories?.length || 0} subcats</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(cat)} className="p-2 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat._id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Admin Dashboard wrapper ─────────────────────────────
export default function AdminDashboard() {
  const { t } = useLang();

  return (
    <div className="py-12">
      <div className="container-app">
        <h1 className="section-title mb-8">{t('admin.title')}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar />
          <div className="flex-1 min-w-0">
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
