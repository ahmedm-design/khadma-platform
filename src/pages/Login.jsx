// pages/Login.jsx — khadma design applied, all logic unchanged
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
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
    <div className="kd-auth-page">
      <div className="kd-auth-card">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 700, fontFamily: 'DM Serif Display, serif', margin: '0 auto 16px' }}>K</div>
          <h1 className="kd-auth-title">{t('auth.login')}</h1>
          <p className="kd-auth-subtitle">Sign in to your Khedma account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="kd-form-label">{t('auth.email')}</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="kd-form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="kd-form-label-row">
              <label className="kd-form-label" style={{ marginBottom: 0 }}>{t('auth.password')}</label>
              <Link to="/" className="kd-form-link">Forgot password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                className="kd-form-input"
                placeholder="••••••••"
                style={{ paddingRight: 44 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16 }}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="kd-auth-submit">
            {loading
              ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
              : t('auth.login')
            }
          </button>
        </form>

        <div className="kd-auth-divider">
          <div className="kd-auth-divider-line" />
          <span>{t('auth.or') || 'OR'}</span>
          <div className="kd-auth-divider-line" />
        </div>

        <button type="button" className="kd-google-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/leaflets/google.svg" alt="Google" className="kd-google-icon" />
          {t('auth.google_login') || 'Sign in with Google'}
        </button>

        {/* Demo accounts */}
        <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--cream)', borderRadius: 12, fontSize: 12, color: 'var(--muted)' }}>
          <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Demo accounts:</p>
          <p>👑 Admin: <span style={{ fontFamily: 'monospace' }}>admin@servicesmarket.com / admin123</span></p>
          <p>👤 Seeker: <span style={{ fontFamily: 'monospace' }}>sara@example.com / user123</span></p>
          <p>🔧 Provider: any provider email / <span style={{ fontFamily: 'monospace' }}>provider123</span></p>
        </div>

        <p className="kd-auth-footer">
          {t('auth.no_account')}
          <Link to="/register" className="kd-auth-footer-link">{t('auth.register')}</Link>
        </p>
      </div>
    </div>
  );
}
