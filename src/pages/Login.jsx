// pages/Login.jsx — khadma design applied, all logic unchanged
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      const dest = user.role === 'admin' ? '/admin' : user.role === 'provider' ? '/provider-dashboard' : from;
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen kd-wallpaper mesh-bg flex items-center justify-center p-6 bg-slate-100 dark:bg-black">
      <div className="w-full max-w-[440px] animate-fade-up">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[var(--teal)] flex items-center justify-center text-slate-900 font-dm text-2xl font-black shadow-lg shadow-[var(--teal)]/20 group-hover:scale-105 transition-transform">K</div>
            <span className="text-2xl font-dm tracking-tighter text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity">Khadma</span>
          </Link>
        </div>

        <div className="bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-2xl shadow-indigo-500/5">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{t('auth.login')}</h1>
          <p className="text-slate-500 font-medium text-sm mb-10">Welcome back. Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{t('auth.email')}</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('auth.password')}</label>
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)] hover:opacity-80 transition-opacity">Forgot?</Link>
              </div>
              <div className="relative group">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)] transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : t('auth.login')}
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">or</span>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <button 
              type="button" 
              onClick={loginWithGoogle}
              className="w-full bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white">Continue with Google</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            {t('auth.no_account')}{' '}
            <Link to="/register" className="text-[var(--teal-dark)] font-black hover:underline">{t('auth.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
