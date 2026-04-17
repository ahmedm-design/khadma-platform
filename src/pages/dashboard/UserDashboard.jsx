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
    <div className="py-12">
      <div className="container-app max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">
            {t('dashboard.welcome')}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage your profile and activity</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === id
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900 dark:text-white">{user?.name}</h2>
                  <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="btn-secondary text-sm gap-2">
                  <Edit3 className="w-4 h-4" /> {t('dashboard.edit_profile')}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="btn-ghost text-sm gap-1">
                    <X className="w-4 h-4" /> {t('common.cancel')}
                  </button>
                  <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-1">
                    <Save className="w-4 h-4" /> {saving ? '...' : t('dashboard.save')}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('auth.name')}</label>
                {editing
                  ? <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input text-sm" />
                  : <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">{user?.name}</p>
                }
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('auth.email')}</label>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">{user?.email}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('auth.phone')}</label>
                {editing
                  ? <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="input text-sm" />
                  : <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">{user?.phone || '—'}</p>
                }
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Member Since</label>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 py-2">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <NotificationsPanel />
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
