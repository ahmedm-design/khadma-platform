// pages/Register.jsx — khadma design applied, all logic unchanged
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import PasswordInput from '../components/common/PasswordInput';

export default function Register() {
  const { user, register, loginWithGoogle } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'provider' ? 'provider' : 'seeker';

  if (user) {
    const dest = user.role === 'admin' ? '/admin' : user.role === 'provider' ? '/provider-dashboard' : '/';
    return <Navigate to={dest} replace />;
  }

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', role: initialRole,
  });
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const user = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role });
      toast.success(`Welcome, ${user.name}! 🎉`);
      navigate(user.role === 'provider' ? '/provider-dashboard' : '/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen kd-wallpaper mesh-bg flex items-start justify-center p-6 bg-slate-100 dark:bg-[#08090a] pt-2 pb-32 overflow-hidden">
      {/* Premium Background Ambiance */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--teal)] opacity-[0.03] dark:opacity-[0.07] rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-sky-500 opacity-[0.02] dark:opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-[var(--teal)] opacity-[0.02] dark:opacity-[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-[460px] animate-fade-up z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[var(--teal)] flex items-center justify-center text-slate-900 font-dm text-2xl font-black shadow-lg shadow-[var(--teal)]/20 group-hover:scale-105 transition-transform">K</div>
            <span className="text-2xl font-dm tracking-tighter text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity">Khadma</span>
          </Link>
        </div>

        <div className="bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-2xl shadow-[var(--teal)]/5 transition-colors duration-500">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{t('auth.register')}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-10">Join thousands of users on the Khedma marketplace.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { role: 'seeker',   icon: '🔍', label: t('auth.role_seeker') },
              { role: 'provider', icon: '🔧', label: t('auth.role_provider') },
            ].map(({ role, icon, label }) => (
              <button
                key={role}
                type="button"
                onClick={() => setForm((f) => ({ ...f, role }))}
                className={clsx(
                  "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300",
                  form.role === role 
                    ? "bg-[var(--teal)] text-slate-900 border-[var(--teal)] shadow-lg shadow-[var(--teal)]/10 scale-105" 
                    : "bg-white/30 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-500 opacity-60 hover:opacity-100 hover:border-[var(--teal)]/30"
                )}
              >
                <span className="text-3xl">{icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{t('auth.name')}</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all" placeholder="John Doe" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{t('auth.email')}</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all" placeholder="you@example.com" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{t('auth.phone')}</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all" placeholder="+20 100 000 0000" />
            </div>
            
            <div className="space-y-1">
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                label={t('auth.password')}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-1">
              <PasswordInput
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                label={t('auth.confirm_password')}
                placeholder="Repeat password"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4 shadow-indigo-500/10"
            >
              {loading ? 'Registering...' : t('auth.register')}
            </button>

            <div className="flex items-center gap-4 py-2 mt-4">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">or</span>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <button 
              type="button" 
              onClick={loginWithGoogle}
              className="w-full bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white">Sign up with Google</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            {t('auth.have_account')}{' '}
            <Link to="/login" className="text-[var(--teal-dark)] font-black hover:underline">{t('auth.login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
