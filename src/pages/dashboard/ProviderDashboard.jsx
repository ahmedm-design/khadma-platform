// pages/dashboard/ProviderDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { Edit3, Plus, Trash2, Save, X, Star, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import StarRating from '../../components/common/StarRating';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { t }    = useLang();

  const [provider, setProvider]   = useState(null);
  const [ratings, setRatings]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing]     = useState(false);
  const [form, setForm]           = useState({});
  const [saving, setSaving]       = useState(false);
  const [categories, setCategories] = useState([]);

  // New service form
  const [newSvc, setNewSvc] = useState({ title: '', description: '', price: '', priceUnit: 'per visit' });
  const [addingSvc, setAddingSvc] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/providers/me'),
      api.get('/categories'),
    ]).then(([provRes, catRes]) => {
      setProvider(provRes.data.data);
      setForm(provRes.data.data);
      setCategories(catRes.data.data);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (provider?._id) {
      api.get(`/ratings/provider/${provider._id}`)
        .then(({ data }) => setRatings(data.data));
    }
  }, [provider?._id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/providers/me', form);
      setProvider(data.data);
      setForm(data.data);
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddService = async () => {
    if (!newSvc.title || !newSvc.price) return toast.error('Title and price are required');
    setAddingSvc(true);
    try {
      const { data } = await api.post('/services', newSvc);
      setProvider((p) => ({ ...p, services: data.data }));
      setNewSvc({ title: '', description: '', price: '', priceUnit: 'per visit' });
      toast.success('Service added!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAddingSvc(false);
    }
  };

  const handleDeleteService = async (svcId) => {
    try {
      const { data } = await api.delete(`/services/${svcId}`);
      setProvider((p) => ({ ...p, services: data.data }));
      toast.success('Service removed');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="py-20 container-app"><div className="skeleton h-64 rounded-2xl" /></div>;

  const statusConfig = {
    approved: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'Approved' },
    pending:  { icon: Clock,        color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',   label: 'Pending Review' },
    rejected: { icon: AlertCircle,  color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-900/20',       label: 'Rejected' },
  };
  const { icon: StatusIcon, color, bg, label } = statusConfig[provider?.status] || statusConfig.pending;

  const tabs = [
    { id: 'profile',  label: t('dashboard.my_profile') },
    { id: 'services', label: t('dashboard.manage_services') },
    { id: 'ratings',  label: t('dashboard.ratings_received') },
  ];

  return (
    <div className="py-12">
      <div className="container-app max-w-3xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="section-title">{t('dashboard.welcome')}, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your provider profile and services</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${bg} ${color}`}>
            <StatusIcon className="w-4 h-4" /> {label}
          </div>
        </div>

        {provider?.status === 'rejected' && provider.rejectionReason && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 text-sm text-red-700 dark:text-red-400">
            <strong>Rejection reason:</strong> {provider.rejectionReason}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Avg Rating', value: provider?.ratingAvg ? `${provider.ratingAvg.toFixed(1)} ⭐` : '—' },
            { label: 'Total Reviews', value: provider?.ratingCount || 0 },
            { label: 'Services Listed', value: provider?.services?.length || 0 },
          ].map(({ label: lbl, value }) => (
            <div key={lbl} className="card p-4 text-center">
              <div className="text-2xl font-bold text-primary-500">{value}</div>
              <div className="text-xs text-slate-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {tabs.map(({ id, label: lbl }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === id
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >{lbl}</button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card p-6 animate-fade-in space-y-5">
            <div className="flex justify-end gap-2">
              {!editing
                ? <button onClick={() => setEditing(true)} className="btn-secondary text-sm gap-2"><Edit3 className="w-4 h-4" /> {t('dashboard.edit_profile')}</button>
                : <>
                    <button onClick={() => { setEditing(false); setForm(provider); }} className="btn-ghost text-sm gap-1"><X className="w-4 h-4" /> {t('common.cancel')}</button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-1"><Save className="w-4 h-4" /> {saving ? '...' : t('dashboard.save')}</button>
                  </>
              }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Business Name', key: 'businessName' },
                { label: 'Business Name (Arabic)', key: 'businessNameAr' },
                { label: 'Phone', key: 'phone' },
                { label: 'WhatsApp', key: 'whatsapp' },
                { label: 'City', key: 'city' },
                { label: 'Address', key: 'address' },
                { label: 'Years of Experience', key: 'yearsOfExperience', type: 'number' },
                { label: 'Website', key: 'website' },
              ].map(({ label: lbl, key, type = 'text' }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{lbl}</label>
                  {editing
                    ? <input type={type} value={form[key] || ''} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="input text-sm" />
                    : <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">{provider[key] || '—'}</p>
                  }
                </div>
              ))}
              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
                {editing
                  ? <select value={form.category?._id || form.category || ''} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="input text-sm">
                      <option value="">Select...</option>
                      {categories.map((c) => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
                    </select>
                  : <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">{provider.category?.icon} {provider.category?.name || '—'}</p>
                }
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Description (English)</label>
              {editing
                ? <textarea rows={3} value={form.description || ''} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="input text-sm resize-none" />
                : <p className="text-sm text-slate-600 dark:text-slate-300">{provider.description || '—'}</p>
              }
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Description (Arabic)</label>
              {editing
                ? <textarea rows={3} value={form.descriptionAr || ''} onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))} className="input text-sm resize-none" dir="rtl" />
                : <p className="text-sm text-slate-600 dark:text-slate-300" dir="rtl">{provider.descriptionAr || '—'}</p>
              }
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4 animate-fade-in">
            {/* Add new */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">{t('dashboard.add_service')}</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input placeholder="Service title" value={newSvc.title} onChange={(e) => setNewSvc((s) => ({ ...s, title: e.target.value }))} className="input text-sm col-span-2" />
                <input placeholder="Description" value={newSvc.description} onChange={(e) => setNewSvc((s) => ({ ...s, description: e.target.value }))} className="input text-sm col-span-2" />
                <input type="number" placeholder="Price (EGP)" value={newSvc.price} onChange={(e) => setNewSvc((s) => ({ ...s, price: e.target.value }))} className="input text-sm" />
                <select value={newSvc.priceUnit} onChange={(e) => setNewSvc((s) => ({ ...s, priceUnit: e.target.value }))} className="input text-sm">
                  {['per visit', 'per hour', 'per day', 'fixed price'].map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <button onClick={handleAddService} disabled={addingSvc} className="btn-primary text-sm gap-2">
                <Plus className="w-4 h-4" /> {addingSvc ? '...' : t('dashboard.add_service')}
              </button>
            </div>

            {/* Existing services */}
            {(provider?.services || []).map((svc, i) => (
              <div key={svc._id || i} className="card p-4 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{svc.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{svc.description}</p>
                  <span className="text-sm font-bold text-primary-500 mt-1 block">EGP {svc.price} / {svc.priceUnit}</span>
                </div>
                <button onClick={() => handleDeleteService(svc._id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {(!provider?.services || provider.services.length === 0) && (
              <div className="card p-10 text-center text-slate-400">
                <p>No services yet. Add your first service above.</p>
              </div>
            )}
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="space-y-3 animate-fade-in">
            {ratings.length === 0 ? (
              <div className="card p-10 text-center text-slate-400">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No ratings yet</p>
              </div>
            ) : ratings.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0">
                    {r.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{r.user?.name}</span>
                      <span className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <StarRating value={r.stars} size="sm" />
                    {r.comment && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{r.comment}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
