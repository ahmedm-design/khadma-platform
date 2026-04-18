// pages/dashboard/ProviderDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { Edit3, Plus, Trash2, Save, X, Star, AlertCircle, CheckCircle, Clock, Camera, User as UserIcon } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import StarRating from '../../components/common/StarRating';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { t, lang, isAr } = useLang();

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Implementation would normally use a FormData and a specific upload endpoint
    // For now, we simulate the upload or use a base64 for preview if the backend supports it
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setForm(prev => ({ ...prev, avatar: base64 }));
      // If there is a specific upload endpoint:
      // const formData = new FormData();
      // formData.append('image', file);
      // await api.post('/upload', formData);
    };
    reader.readAsDataURL(file);
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
    approved: { icon: CheckCircle, color: 'text-[var(--teal)]', bg: 'bg-[var(--teal)]/10', label: 'Approved' },
    pending:  { icon: Clock,        color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',   label: 'Pending Review' },
    rejected: { icon: AlertCircle,  color: 'text-red-400',     bg: 'bg-red-50 dark:bg-red-900/10',       label: 'Rejected' },
  };
  const { icon: StatusIcon, color, bg, label } = statusConfig[provider?.status] || statusConfig.pending;

  const tabs = [
    { id: 'profile',  label: t('dashboard.my_profile') },
    { id: 'services', label: t('dashboard.manage_services') },
    { id: 'ratings',  label: t('dashboard.ratings_received') },
  ];

  return (
    <div className="pb-12 relative overflow-hidden min-h-screen">
      {/* Background Atmosphere consistent with Home */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(16,185,129,0.04)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[rgba(52,211,153,0.03)] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-app max-w-5xl mx-auto relative z-10">
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="animate-fade-in">
            <h1 className="kd-section-title text-4xl md:text-5xl mb-2">{isAr ? 'مرحباً' : 'Welcome back'}, {user?.name?.split(' ')[0]} ✨</h1>
            <p className="text-slate-500 font-medium text-sm">Monitor your professional performance and manage services.</p>
          </div>
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm backdrop-blur-md border ${bg} ${color} border-current/10`}>
            <StatusIcon className="w-5 h-5" /> {label}
          </div>
        </div>

        {provider?.status === 'rejected' && provider.rejectionReason && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-[28px] p-6 mb-8 text-sm text-red-600 dark:text-red-400 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-1 font-bold">
              <AlertCircle className="w-4 h-4" />
              {isAr ? 'سبب الرفض:' : 'Rejection Message'}
            </div>
            {provider.rejectionReason}
          </div>
        )}

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: isAr ? 'متوسط التقييم' : 'Performance', value: provider?.ratingAvg ? `${provider.ratingAvg.toFixed(1)}` : '0.0', sub: 'Starts out of 5', icon: Star, color: 'text-amber-500' },
            { label: isAr ? 'إجمالي المراجعات' : 'Total Reviews', value: provider?.ratingCount || 0, sub: 'Customer feedbacks', icon: CheckCircle, color: 'text-[var(--teal)]' },
            { label: isAr ? 'الخدمات المدرجة' : 'Active Services', value: provider?.services?.length || 0, sub: 'Published offerings', icon: Plus, color: 'text-indigo-500' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-xl rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700`}>
                  <Icon className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 shadow-sm ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
                <div className="text-4xl font-black text-slate-800 dark:text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Advanced Segmented Control Tool for Tabs */}
        <div className="flex gap-8 mb-10 border-b border-slate-200 dark:border-white/10 max-w-2xl mx-auto">
          {tabs.map(({ id, label: lbl }) => (
            <button 
              key={id} 
              onClick={() => setActiveTab(id)}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
                activeTab === id ? 'border-[var(--teal)] text-[var(--teal-dark)]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-[32px] p-10 animate-fade-in shadow-sm space-y-8">
            {/* Profile Header With Picture */}
            <div className="flex flex-col md:flex-row items-center gap-10 pb-10 mb-10 border-b border-slate-100 dark:border-white/5">
              <div className="relative group/pic">
                <div className="w-32 h-32 rounded-[40px] bg-slate-100 dark:bg-white/5 overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center">
                  {(editing ? form.avatar : provider.avatar) ? (
                    <img 
                      src={editing ? form.avatar : provider.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-slate-300" />
                  )}
                </div>
                {editing && (
                  <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--teal)] text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all">
                    <Camera className="w-5 h-5" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{provider.businessName}</h4>
                <p className="text-sm text-slate-400 font-medium">{provider.category?.icon} {provider.category?.name || 'Service Provider'}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-slate-800 dark:text-white">{isAr ? 'بيانات العمل' : 'Business Details'}</div>
              <div className="flex gap-3">
                {!editing
                  ? <button onClick={() => setEditing(true)} className="px-4 py-2 bg-[var(--teal)]/10 text-[var(--teal-dark)] rounded-xl text-xs font-bold hover:bg-[var(--teal-dark)] hover:text-white transition-all flex items-center gap-2"><Edit3 className="w-4 h-4" /> {t('dashboard.edit_profile')}</button>
                  : <>
                      <button onClick={() => { setEditing(false); setForm(provider); }} className="btn-ghost text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-xl gap-1"><X className="w-4 h-4" /> {t('common.cancel')}</button>
                      <button onClick={handleSave} disabled={saving} className="btn-primary text-xs uppercase tracking-widest font-bold px-8 py-3 rounded-xl gap-1 shadow-lg shadow-[var(--teal)]/20"><Save className="w-4 h-4" /> {saving ? '...' : t('dashboard.save')}</button>
                    </>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Business Name', key: 'businessName' },
                { label: 'Business Name (Arabic)', key: 'businessNameAr' },
                { label: 'Phone Number', key: 'phone' },
                { label: 'WhatsApp', key: 'whatsapp' },
                { label: 'Current City', key: 'city' },
                { label: 'Office Address', key: 'address' },
                { label: 'Experience (Years)', key: 'yearsOfExperience', type: 'number' },
                { label: 'Website / Portfolio', key: 'website' },
              ].map(({ label: lbl, key, type = 'text' }) => (
                <div key={key} className="group flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-[var(--teal)]">{lbl}</label>
                  {editing
                    ? <input type={type} value={form[key] || ''} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all outline-none" />
                    : <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 py-3 border-b border-slate-100 dark:border-white/5">{provider[key] || '—'}</p>
                  }
                </div>
              ))}
              {/* Category */}
              <div className="group flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                {editing
                  ? <select value={form.category?._id || form.category || ''} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all outline-none">
                      <option value="">Select...</option>
                      {categories.map((c) => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
                    </select>
                  : <div className="py-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                      <span className="text-lg">{provider.category?.icon}</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{provider.category?.name || '—'}</span>
                    </div>
                }
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 pt-4">
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Professional Biography (English)</label>
                {editing
                  ? <textarea rows={4} value={form.description || ''} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all outline-none w-full resize-none" />
                  : <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-6 rounded-2xl">{provider.description || '—'}</p>
                }
              </div>
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block text-right">السيرة المهنية (Arabic)</label>
                {editing
                  ? <textarea rows={4} value={form.descriptionAr || ''} onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all outline-none w-full resize-none" dir="rtl" />
                  : <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-6 rounded-2xl" dir="rtl">{provider.descriptionAr || '—'}</p>
                }
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fade-in">
            {/* Add new */}
            <div className="bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-[32px] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--teal)] opacity-[0.03] rounded-full blur-3xl -mr-16 -mt-16" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8">{t('dashboard.add_service')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Service Title</label>
                  <input placeholder="e.g. Master Plumbing Repair" value={newSvc.title} onChange={(e) => setNewSvc((s) => ({ ...s, title: e.target.value }))} className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)]" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Service Description</label>
                  <input placeholder="Short details about the service offering..." value={newSvc.description} onChange={(e) => setNewSvc((s) => ({ ...s, description: e.target.value }))} className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Base Price (EGP)</label>
                  <input type="number" placeholder="500" value={newSvc.price} onChange={(e) => setNewSvc((s) => ({ ...s, price: e.target.value }))} className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Billing Unit</label>
                  <select value={newSvc.priceUnit} onChange={(e) => setNewSvc((s) => ({ ...s, priceUnit: e.target.value }))} className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm w-full outline-none focus:border-[var(--teal)]">
                    {['per visit', 'per hour', 'per day', 'fixed price'].map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleAddService} disabled={addingSvc} className="btn-primary px-10 py-4 rounded-2xl text-xs uppercase tracking-widest font-bold gap-3 shadow-lg shadow-[var(--teal)]/20">
                <Plus className="w-5 h-5" /> {addingSvc ? '...' : t('dashboard.add_service')}
              </button>
            </div>

            {/* Existing services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(provider?.services || []).map((svc, i) => (
                <div key={svc._id || i} className="bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl rounded-[28px] p-8 flex items-start justify-between gap-4 group transition-all hover:bg-white/60">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{svc.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{svc.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[var(--teal-dark)]">EGP {svc.price}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {svc.priceUnit}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteService(svc._id)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {(!provider?.services || provider.services.length === 0) && (
              <div className="bg-white/20 border border-white/10 rounded-[32px] p-20 text-center text-slate-400 backdrop-blur-md">
                <p className="text-lg font-medium">No services listed yet.</p>
                <p className="text-sm opacity-60">Add your first professional service above to start receiving orders.</p>
              </div>
            )}
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {ratings.length === 0 ? (
              <div className="bg-white/20 border border-white/10 rounded-[32px] p-20 text-center text-slate-400 backdrop-blur-md">
                <Star className="w-16 h-16 mx-auto mb-6 opacity-10" />
                <p className="text-lg font-medium">No ratings received yet</p>
                <p className="text-sm opacity-60">Once customers review your work, they will appear here.</p>
              </div>
            ) : ratings.map((r) => (
              <div key={r._id} className="bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl rounded-[32px] p-8 group transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal)]/20 to-transparent border border-[var(--teal)]/10 flex items-center justify-center text-[var(--teal-dark)] font-black text-xl flex-shrink-0">
                    {r.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{r.user?.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 bg-white/50 dark:bg-white/5 rounded-full">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-4">
                      <StarRating value={r.stars} size="sm" />
                    </div>
                    {r.comment && <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">"{r.comment}"</p>}
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
