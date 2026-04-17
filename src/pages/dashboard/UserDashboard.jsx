// pages/dashboard/UserDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { User, Bell, Edit3, Save, X } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const { t } = useLang();
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [saving, setSaving]   = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/users/me', form);
      updateUser(data.data);
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: t('dashboard.my_profile'), icon: User },
    { id: 'notifications', label: t('dashboard.notifications'), icon: Bell },
  ];

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500 opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-500 opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-app max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="kd-section-title text-4xl md:text-5xl mb-2">
            {t('dashboard.welcome')}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 font-medium text-sm">Review your security settings and account notifications.</p>
        </div>

        {/* Cinematic Segmented Control */}
        <div className="flex p-1.5 mb-10 bg-slate-200/50 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-[24px] backdrop-blur-xl max-w-sm">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-[20px] text-sm font-bold transition-all duration-500 ${
                activeTab === id
                  ? 'bg-white dark:bg-white/10 text-[var(--teal)] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-[32px] p-10 animate-fade-in shadow-sm space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-4">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[28px] bg-[var(--teal)] flex items-center justify-center text-slate-900 text-3xl font-black shadow-xl shadow-[var(--teal)]/20">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-black text-2xl text-slate-800 dark:text-white mb-1 group flex items-center gap-2">
                    {user?.name}
                    <div className="w-5 h-5 bg-[var(--teal)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)] bg-[var(--teal)]/10 px-3 py-1 rounded-full border border-[var(--teal)]/20">
                      {user?.role} Account
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main User</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="btn-secondary flex-1 md:flex-none text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-xl border-slate-200 gap-2">
                    <Edit3 className="w-4 h-4" /> {t('dashboard.edit_profile')}
                  </button>
                ) : (
                  <>
                    <button onClick={() => setEditing(false)} className="btn-ghost text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl gap-1">
                      <X className="w-4 h-4" /> {t('common.cancel')}
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary shadow-lg shadow-indigo-500/20 flex-1 md:flex-none text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-xl gap-1">
                      <Save className="w-4 h-4" /> {saving ? '...' : t('dashboard.save')}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-6 border-t border-slate-100 dark:border-white/5">
              {[
                { label: t('auth.name'), key: 'name', editable: true },
                { label: t('auth.email'), key: 'email', editable: false },
                { label: t('auth.phone'), key: 'phone', editable: true },
                { label: 'Account Created', key: 'createdAt', editable: false, format: (val) => new Date(val).toLocaleDateString() },
              ].map(({ label, key, editable, format }) => (
                <div key={key} className="group flex flex-col">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 transition-colors group-focus-within:text-indigo-500">{label}</label>
                  {editing && editable
                    ? <input value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold" />
                    : <p className="text-sm font-bold text-slate-700 dark:text-slate-200 py-3 border-b border-slate-100 dark:border-white/5">
                        {format ? format(user?.[key]) : user?.[key] || '—'}
                      </p>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="max-w-4xl animate-fade-in">
            <NotificationsPanel />
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const { t } = useLang();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    api.get('/users/notifications')
      .then(({ data }) => setNotes(data.data))
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    await api.put(`/users/notifications/${id}/read`);
    setNotes((prev) => prev.map((n) => n._id === id ? { ...n, isRead: true } : n));
  };

  if (loading) return <div className="skeleton h-40 rounded-2xl" />;

  if (notes.length === 0) {
    return (
      <div className="card p-10 text-center text-slate-400">
        <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No notifications yet</p>
      </div>
    );
  }

  const typeColors = {
    success: 'bg-emerald-100 text-emerald-700',
    error:   'bg-red-100 text-red-600',
    warning: 'bg-amber-100 text-amber-700',
    approval:'bg-blue-100 text-blue-700',
    default: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-3 animate-fade-in">
      {notes.map((note) => (
        <div
          key={note._id}
          onClick={() => !note.isRead && markRead(note._id)}
          className={`card p-4 flex gap-3 cursor-pointer hover:shadow-md transition-shadow ${!note.isRead ? 'border-primary-200 dark:border-primary-800' : ''}`}
        >
          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${note.isRead ? 'bg-slate-300' : 'bg-primary-500'}`} />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${note.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
              {note.title}
            </p>
            {note.message && <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{note.message}</p>}
            <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
