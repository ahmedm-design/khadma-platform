// pages/Register.jsx — khadma design applied, all logic unchanged
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'provider' ? 'provider' : 'seeker';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', role: initialRole,
  });
  const [showPass, setShowPass] = useState(false);
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
    <div className="kd-auth-page">
      <div className="kd-auth-card" style={{ maxWidth: 460 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 700, fontFamily: 'DM Serif Display, serif', margin: '0 auto 16px' }}>K</div>
          <h1 className="kd-auth-title">{t('auth.register')}</h1>
          <p className="kd-auth-subtitle">Join thousands of users on Khedma</p>
        </div>

        {/* Role selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { role: 'seeker',   icon: '🔍', label: t('auth.role_seeker') },
            { role: 'provider', icon: '🔧', label: t('auth.role_provider') },
          ].map(({ role, icon, label }) => (
            <button
              key={role}
              type="button"
              onClick={() => setForm((f) => ({ ...f, role }))}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 12px', borderRadius: 14,
                border: form.role === role ? '2px solid var(--teal)' : '2px solid var(--border)',
                background: form.role === role ? 'rgba(0,201,167,0.08)' : 'transparent',
                color: form.role === role ? 'var(--teal-dark)' : 'var(--muted)',
                cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              <span style={{ fontSize: 22 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="kd-form-label">{t('auth.name')}</label>
            <input name="name" value={form.name} onChange={handleChange} className="kd-form-input" placeholder="John Doe" required />
          </div>
          <div>
            <label className="kd-form-label">{t('auth.email')}</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="kd-form-input" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="kd-form-label">{t('auth.phone')}</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="kd-form-input" placeholder="+20 100 000 0000" />
          </div>
          <div>
            <label className="kd-form-label">{t('auth.password')}</label>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                className="kd-form-input"
                placeholder="Min. 6 characters"
                style={{ paddingRight: 44 }}
                required
              />
              <button type="button" onClick={() => setShowPass((s) => !s)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16 }}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <div>
            <label className="kd-form-label">{t('auth.confirm_password')}</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="kd-form-input" placeholder="Repeat password" required />
          </div>

          <button type="submit" disabled={loading} className="kd-auth-submit" style={{ marginTop: 4 }}>
            {loading
              ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
              : t('auth.register')
            }
          </button>
        </form>

        <div className="kd-auth-divider">
          <div className="kd-auth-divider-line" />
          <span>{t('auth.or') || 'OR'}</span>
          <div className="kd-auth-divider-line" />
        </div>

        <button 
          type="button" 
          className="kd-google-btn"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="kd-google-icon" />
          {t('auth.google_signup')}
        </button>

        <p className="kd-auth-footer">
          {t('auth.have_account')}
          <Link to="/login" className="kd-auth-footer-link">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
