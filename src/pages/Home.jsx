// pages/Home.jsx — khadma design applied
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard, SkeletonCategoryCard } from '../components/common/SkeletonCard';


export default function Home() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [providers, setProviders]   = useState([]);
  const [searchVal, setSearchVal]   = useState('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProvs, setLoadingProvs] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(({ data }) => setCategories(data?.data || []))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCats(false));

    api.get('/providers?limit=6&sort=-ratingAvg')
      .then(({ data }) => setProviders(data?.data || []))
      .catch(() => setProviders([]))
      .finally(() => setLoadingProvs(false));
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
  };

  const isAr = lang === 'ar';

  return (
    <div className="kd-wallpaper">
      {/* HERO */}
      <section className="kd-hero">
        <div className="kd-hero-video-wrap">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="kd-hero-video"
            style={{ opacity: 1.0 }}
          >
            <source src="/8293017-hd_1920_1080_30fps (online-video-cutter.com).mp4" type="video/mp4" />
          </video>
          <div className="kd-hero-overlay" />
        </div>

        <div className="kd-hero-inner">
          <div className="kd-hero-text">
            <span className="kd-hero-badge">
              {isAr ? 'موثوق من أكثر من 50,000 عميل' : 'Trusted by 50,000+ customers'}
            </span>
            <h1 className="kd-hero-h1">
              {isAr
                ? <>{t('home.hero_title')}</>
                : <>Find the <em>perfect</em><br />service for your <span className="strike">needs</span></>}
            </h1>
            <p className="kd-hero-sub">{t('home.hero_subtitle')}</p>
            <form className="kd-hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button type="submit">{isAr ? 'بحث' : 'Search'}</button>
            </form>
            <div className="kd-hero-btns">
              <Link to="/categories" className="kd-btn-primary">{t('home.hero_cta')}</Link>
              <Link to="/register?role=provider" className="kd-btn-outline">{t('home.hero_cta2')}</Link>
            </div>
          </div>

          {/* Floating card visual */}
          <div className="kd-hero-visual">
            <div className="kd-float-badge">
              <span className="pulse-dot" />
              {isAr ? '42 خدمة جديدة اليوم' : '42 new services today'}
            </div>
            <div className="kd-hero-card-stack kd-floating">
              <div className="kd-hcard kd-hcard-main">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="service" />
                <div className="kd-hcard-body">
                  <div className="kd-hcard-seller">
                    <div className="kd-hcard-avatar">AM</div>
                    <div>
                      <div className="kd-hcard-name">{isAr ? 'أحمد م.' : 'Ahmed M.'}</div>
                      <div className="kd-hcard-level">{isAr ? 'بائع متميز' : 'Top Rated'}</div>
                    </div>
                  </div>
                  <div className="kd-hcard-title">{isAr ? 'سأبني لك موقع React مذهل' : 'I will build a stunning React website'}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="kd-hcard-rating"><span className="star">★</span> 4.9 <span className="count">(284)</span></div>
                    <div>
                      <div className="kd-hcard-price">{isAr ? 'يبدأ من' : 'FROM'}</div>
                      <div className="kd-hcard-amount">$45</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kd-hcard kd-hcard-side kd-hcard-right">
                <div className="kd-hcard-row">
                  <div className="kd-hcard-row-icon" style={{ background: 'rgba(0,201,167,0.12)' }}>✅</div>
                  <div><div className="kd-hcard-row-label">{isAr ? 'طلبات مكتملة' : 'Orders Completed'}</div><div className="kd-hcard-row-val">1,284</div></div>
                </div>
                <div className="kd-hcard-row">
                  <div className="kd-hcard-row-icon" style={{ background: 'rgba(247,196,48,0.15)' }}>⭐</div>
                  <div><div className="kd-hcard-row-label">{isAr ? 'متوسط التقييم' : 'Avg. Rating'}</div><div className="kd-hcard-row-val">4.9 / 5.0</div></div>
                </div>
                <div className="kd-hcard-row">
                  <div className="kd-hcard-row-icon" style={{ background: 'rgba(99,102,241,0.12)' }}>⚡</div>
                  <div><div className="kd-hcard-row-label">{isAr ? 'وقت الاستجابة' : 'Response Time'}</div><div className="kd-hcard-row-val">{isAr ? '~ساعتان' : '~2 hours'}</div></div>
                </div>
              </div>
              <div className="kd-hcard kd-hcard-side kd-hcard-left">
                <div className="f-stars">⭐⭐⭐⭐⭐</div>
                <div className="f-title">{isAr ? 'عملاء سعداء' : 'Happy customers'}</div>
                <div className="f-val">50K+</div>
                <div className="f-sub">{isAr ? 'لكل الخدمات' : 'Across all services'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="kd-stats-bar">
        <div className="kd-stats-inner">
          {[
            { num: '50K+', label: t('home.stats_users'), icon: '👥' },
            { num: '2K+',  label: t('home.stats_providers'), icon: '🛡️' },
            { num: '98%',  label: isAr ? 'نسبة الرضا' : 'Satisfaction Rate', icon: '⭐' },
            { num: '50+',  label: t('home.stats_categories'), icon: '🛠️' },
          ].map(({ num, label, icon }) => (
            <div key={label} className="kd-stat-item">
              <div className="kd-stat-icon">{icon}</div>
              <span className="kd-stat-num">{num}</span>
              <span className="kd-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED CATEGORIES */}
      <section className="animate-fade-up" style={{ animationDelay: '0.2s', position: 'relative', overflow: 'hidden' }}>
        <div className="kd-floating-blob kd-blob-1" style={{ opacity: 0.07 }}></div>
        <div className="kd-section-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <span className="kd-section-label">{isAr ? 'تصفح الأقسام' : 'Browse by Category'}</span>
          <div className="kd-section-header">
            <div>
              <h2 className="kd-section-title" style={{ marginBottom: 0 }}>{t('home.featured')}</h2>
              <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--muted)' }}>{t('home.featured_sub')}</p>
            </div>
            <Link to="/categories" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--teal-dark)', textDecoration: 'none' }}>
              {t('common.see_all')} <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
          <div className="kd-cats-grid">
            {loadingCats
              ? Array(8).fill(0).map((_, i) => <SkeletonCategoryCard key={i} />)
              : (categories || []).slice(0, 8).map((cat, i) => (
                  <Link key={cat._id} to={`/categories/${cat.slug}`} className="kd-cat-card hover-lift" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="kd-cat-icon-wrap">{cat.icon}</div>
                    <div className="kd-cat-body">
                      <div className="kd-cat-name">{lang === 'ar' && cat.nameAr ? cat.nameAr : cat.name}</div>
                      <div className="kd-cat-desc">{lang === 'ar' && cat.descriptionAr ? cat.descriptionAr : cat.description}</div>
                    </div>
                  </Link>
                ))
            }
          </div>
        </div>
      </section>

      {/* TOP RATED PROVIDERS */}
      <div className="kd-gigs-section animate-fade-up" style={{ animationDelay: '0.3s', position: 'relative', overflow: 'hidden' }}>
        <div className="kd-floating-blob kd-blob-2" style={{ opacity: 0.05, top: '20%', left: '10%' }}></div>
        <div className="kd-gigs-inner" style={{ position: 'relative', zIndex: 1 }}>
          <span className="kd-section-label">{isAr ? 'المواهب المميزة' : 'Top Talent'}</span>
          <div className="kd-section-header">
            <div>
              <h2 className="kd-section-title" style={{ marginBottom: 0 }}>{t('home.top_providers')}</h2>
              <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--muted)' }}>{t('home.top_providers_sub')}</p>
            </div>
            <Link to="/providers" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--teal-dark)', textDecoration: 'none' }}>
              {t('common.see_all')} <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
          <div className="kd-gigs-grid">
            {loadingProvs
              ? Array(6).fill(0).map((_, i) => <SkeletonProviderCard key={i} />)
              : (providers || []).map((p) => <ProviderCard key={p._id} provider={p} />)
            }
          </div>
        </div>
      </div>

      {/* ABOUT US */}
      <section id="about-us" className="kd-section-wrap kd-about-grid animate-fade-up" style={{ background: 'var(--paper)' }}>
        <div className="kd-about-text">
          <span className="kd-section-label">{isAr ? 'عن خدمة' : 'About Khedma'}</span>
          <h2 className="kd-section-title">
            {isAr ? 'إعادة تعريف التميز في الخدمة في جميع أنحاء مصر' : 'Redefining service excellence across Egypt'}
          </h2>
          <p className="kd-section-sub">
            {isAr
              ? 'في "خدمة"، نؤمن بأن العثور على محترف موثوق لا ينبغي أن يكون مقامرة. منصتنا تربط العمال المهرة بالأشخاص الذين يحتاجون إليهم، مما يعزز مجتمعًا قائمًا على الثقة والشفافية والجودة العالية.'
              : 'At Khedma, we believe that finding a reliable professional shouldn\'t be a gamble. Our platform connects skilled workers with people who need them, fostering a community built on trust, transparency, and top-tier quality.'}
          </p>
          <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--teal)', fontFamily: 'DM Serif Display, serif' }}>150+</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>{isAr ? 'مدينة مغطاة' : 'Cities Covered'}</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--teal)', fontFamily: 'DM Serif Display, serif' }}>24/7</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>{isAr ? 'دعم فني' : 'Premium Support'}</div>
            </div>
          </div>
        </div>
        <div className="kd-about-img" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-15px', border: '2px solid var(--teal)', borderRadius: '30px', opacity: 0.2, zIndex: 0 }}></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="About Khedma Team"
            style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--kd-shadow-lg)', position: 'relative', zIndex: 1 }}
          />
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(10px)', color: 'white', padding: '24px', borderRadius: '20px', zIndex: 2, boxShadow: 'var(--kd-shadow-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px', letterSpacing: '1px', fontWeight: 600 }}>{isAr ? 'مهمتنا' : 'OUR MISSION'}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'DM Serif Display, serif' }}>{isAr ? 'الجودة أولاً' : 'Quality above all'}</div>
          </div>
        </div>
      </section>

      <section className="animate-fade-up kd-bg-pattern" style={{ animationDelay: '0.4s', padding: '90px 40px' }}>
        <div className="kd-why-section" style={{ padding: 0 }}>
          <span className="kd-section-label">{isAr ? 'لماذا نحن' : 'Why Us'}</span>
          <h2 className="kd-section-title">{isAr ? 'لماذا تختار خدمة؟' : 'Why choose Khedma?'}</h2>
          <p className="kd-section-sub">{isAr ? 'لسنا مجرد منصة — نحن شريك موثوق لكل احتياجاتك.' : "We're not just a marketplace — we're your trusted partner."}</p>
          <div className="kd-why-grid">
            {[
              { icon: '✅', title: isAr ? 'محترفون موثقون' : 'Verified Professionals', desc: isAr ? 'كل مقدم خدمة يخضع لتحقق شامل قبل الانضمام.' : 'Every provider is background-checked before joining our platform.' },
              { icon: '💰', title: isAr ? 'أفضل الأسعار مضمونة' : 'Best Prices Guaranteed', desc: isAr ? 'ادفع بأمان — لا تدفع إلا عند رضاك التام.' : 'Pay securely — only release funds when fully satisfied.' },
              { icon: '⚡', title: isAr ? 'سريع وموثوق' : 'Fast & Reliable', desc: isAr ? 'تواصل مع محترفين في دقائق.' : 'Get matched with professionals in minutes and track your order in real-time.' },
            ].map((item, i) => (
              <div key={i} className="kd-why-card hover-lift" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="kd-why-icon">{item.icon}</div>
                <div className="kd-why-title">{item.title}</div>
                <div className="kd-why-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="kd-section-wrap" style={{ textAlign: 'center' }}>
          <span className="kd-section-label" style={{ display: 'flex', justifyContent: 'center' }}>{isAr ? 'عملية بسيطة' : 'Simple Process'}</span>
          <h2 className="kd-section-title" style={{ maxWidth: 500, margin: '0 auto 12px' }}>{t('home.how_title')}</h2>
          <p className="kd-section-sub" style={{ margin: '0 auto 52px' }}>{isAr ? 'أنجز خدمتك في خطوات سهلة' : 'Get your service done in easy steps'}</p>
          <div className="kd-how-grid">
            {[
              { num: '1', title: t('home.step1'), desc: t('home.step1_desc') },
              { num: '2', title: t('home.step2'), desc: t('home.step2_desc') },
              { num: '3', title: t('home.step3'), desc: t('home.step3_desc') },
              { num: '4', title: isAr ? 'قيّم وكرر' : 'Review & Repeat', desc: isAr ? 'بعد رضاك اترك تقييمك وساعد الآخرين.' : 'Once satisfied, leave a review and help others find great providers.' },
            ].map((step, i) => (
              <div key={i} className="kd-how-step">
                <div className="kd-how-num">{step.num}</div>
                <div className="kd-how-title">{step.title}</div>
                <div className="kd-how-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="kd-testi-section animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <div className="kd-testi-inner">
          <span className="kd-section-label">{isAr ? 'قصص العملاء' : 'Customer Stories'}</span>
          <h2 className="kd-section-title">{isAr ? 'ماذا يقول عملاؤنا' : 'What our customers say'}</h2>
          <p className="kd-section-sub">{isAr ? 'تقييمات حقيقية من أشخاص حقيقيين.' : 'Real reviews from real people who found great services on Khedma.'}</p>
          <div className="kd-testi-grid">
            {[
              { text: isAr ? 'وجدت سباك ممتاز خلال 10 دقائق. أصلح تسرب الأنابيب في نفس اليوم.' : "Found a brilliant plumber within 10 minutes. Fixed our pipe leak the same day. Couldn't be happier.", name: isAr ? 'نادية الرشيدي' : 'Nadia El-Rashidy', role: isAr ? 'القاهرة، مصر' : 'Cairo, Egypt', img: 'https://i.pravatar.cc/80?img=31' },
              { text: isAr ? 'أعدت تصميم موقعي بالكامل بجزء بسيط من تكلفة الوكالات.' : 'Got my entire website redesigned for a fraction of what agencies charge. Incredible quality.', name: isAr ? 'خالد منصور' : 'Khalid Mansour', role: isAr ? 'الإسكندرية، مصر' : 'Alexandria, Egypt', img: 'https://i.pravatar.cc/80?img=47' },
              { text: isAr ? 'حجزت 3 خدمات في شهر واحد. خدمة أصبحت منصتي المفضلة.' : 'Booked 3 services in one month — all top notch. Khedma is now my go-to platform.', name: isAr ? 'ليلى فاروق' : 'Laila Farouk', role: isAr ? 'الجيزة، مصر' : 'Giza, Egypt', img: 'https://i.pravatar.cc/80?img=56' },
            ].map((r, i) => (
              <div key={i} className="kd-testi-card">
                <div className="kd-testi-stars">★★★★★</div>
                <p className="kd-testi-text">{r.text}</p>
                <div className="kd-testi-user">
                  <img className="kd-testi-avatar" src={r.img} alt={r.name} />
                  <div>
                    <div className="kd-testi-name">{r.name}</div>
                    <div className="kd-testi-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="kd-cta-section">
        <div className="kd-cta-video-wrap">
          <video autoPlay muted loop playsInline className="kd-cta-video">
            <source src="/8293017-hd_1920_1080_30fps (online-video-cutter.com).mp4" type="video/mp4" />
          </video>
          <div className="kd-cta-overlay" />
        </div>
        
        <div className="kd-cta-inner">
          <span className="kd-section-label" style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {isAr ? 'ابدأ اليوم' : 'Get Started Today'}
          </span>
          <h2 className="kd-section-title" style={{ maxWidth: 600, margin: '0 auto 16px', textAlign: 'center', color: 'white' }}>
            {isAr ? 'هل أنت مستعد لإيجاد خدمتك المثالية؟' : 'Ready to find your perfect service?'}
          </h2>
          <p className="kd-section-sub" style={{ margin: '0 auto 40px', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
            {isAr ? 'انضم لأكثر من 50,000 عميل و2,000 محترف. الانضمام مجاني.' : 'Join over 50,000 satisfied customers and 2,000+ professionals. Free to join.'}
          </p>
          <div className="kd-cta-btns">
            <Link to="/register?role=seeker" className="kd-btn-primary" style={{ background: 'var(--teal)', color: '#000' }}>{isAr ? 'انضم كعميل' : 'Join as a Customer'}</Link>
            <Link to="/providers" className="kd-btn-outline" style={{ borderColor: 'white', color: 'white' }}>{isAr ? 'تصفح مقدمي الخدمات' : 'Browse Providers'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
