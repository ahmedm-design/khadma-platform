// pages/Home.jsx — khadma design applied
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle2, Search } from 'lucide-react';
import { useLang } from '../context/LangContext';
import clsx from 'clsx';
import api from '../api/axios';
import ProviderCard from '../components/common/ProviderCard';
import { SkeletonProviderCard, SkeletonCategoryCard } from '../components/common/SkeletonCard';
export default function Home() {
  const { t, lang, isAr } = useLang();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProvs, setLoadingProvs] = useState(true);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // { type: 'provider' | 'category', data: any }

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

  return (
    <div className="kd-wallpaper mesh-bg min-h-screen">
      {/* HERO */}
      <section className="kd-hero">
        <div className="kd-hero-video-wrap">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="kd-hero-video"
            poster="/Gemini_Generated_Image_vhi0kuvhi0kuvhi0.png"
          >
            <source src="/8293017-hd_1920_1080_30fps (online-video-cutter.com).mp4" type="video/mp4" />
          </video>
          <div className="kd-hero-overlay" />

          {/* Premium Readable Overlay */}
          <div className={clsx(
            "absolute inset-y-0 w-full lg:w-[60%] pointer-events-none z-10 transition-all duration-700",
            isAr
              ? "right-0 bg-gradient-to-l from-white/95 via-white/80 to-transparent dark:from-[#08090a] dark:via-[#08090a]/80"
              : "left-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-[#08090a] dark:via-[#08090a]/80"
          )} />
          <div className="kd-hero-focus-layer" />
        </div>

        <div className="kd-hero-inner pt-24 pb-12 md:pt-36 lg:pt-40">
          <div className="kd-hero-text flex flex-col items-center lg:items-start">
            <div className="flex justify-center lg:justify-start">
              <div className="kd-hero-badge bg-white/5 border-white/10 backdrop-blur-md mb-6">
                <span className="pulse-dot me-2" />
                {isAr ? 'موثوق من أكثر من 50,000 عميل' : 'Trusted by 50,000+ customers'}
              </div>
            </div>

            <h1 className="kd-hero-h1 text-slate-900 dark:text-slate-100 text-center lg:text-start text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.15] mb-6">
              {isAr ? 'ابحث عن مزودي خدمة موثوقين' : 'Find Trusted Service Providers'}
            </h1>

            <p className="kd-hero-sub text-slate-500 font-medium text-center lg:text-start text-sm md:text-lg max-w-xl mb-10">
              {t('home.hero_subtitle')}
            </p>

            <form className="relative flex flex-col sm:flex-row w-full max-w-[640px] bg-white dark:bg-[#0c0d10] border-2 border-transparent dark:border-white/5 rounded-[28px] sm:rounded-full p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-2xl focus-within:border-[var(--teal)] focus-within:shadow-[0_0_40px_rgba(0,201,167,0.15)] transition-all duration-300 gap-3 sm:gap-0 group z-20 mb-8" onSubmit={handleSearch}>
              <div className="flex-1 w-full relative flex items-center">
                <div className={clsx("absolute text-slate-300 dark:text-slate-500 group-focus-within:text-[var(--teal)] transition-colors duration-300", isAr ? "right-6" : "left-6")}>
                  <Search size={22} strokeWidth={3} />
                </div>
                <input
                  type="text"
                  placeholder={isAr ? 'ما الذي تبحث عنه؟' : 'What service are you looking for?'}
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className={clsx("bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 w-full py-4 text-base md:text-lg font-bold placeholder:text-slate-400 placeholder:font-medium", isAr ? "pr-16 pl-4" : "pl-16 pr-4")}
                />
              </div>
              <button type="submit" className="bg-[var(--teal)] text-slate-900 w-full sm:w-auto px-10 h-[56px] rounded-[20px] sm:rounded-full font-black uppercase tracking-[0.2em] text-sm transition-transform hover:scale-[1.02] active:scale-95 shrink-0 shadow-lg hover:shadow-[var(--teal)]/30 flex items-center justify-center">
                {isAr ? 'بحث' : 'Search'}
              </button>
            </form>

            <div className="kd-hero-btns flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start mt-10">
              <Link to="/categories" className="w-full sm:w-auto text-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-5 sm:py-4 rounded-2xl text-sm font-black hover:scale-105 transition-all shadow-xl">{isAr ? 'استكشف الخدمات' : 'Explore Services'}</Link>
              <Link to="/register?role=provider" className="w-full sm:w-auto text-center border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white px-10 py-5 sm:py-4 rounded-2xl text-sm font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all">{isAr ? 'انضم كمزود خدمة' : 'Join as Pro'}</Link>
            </div>
          </div>

          <div className="kd-hero-visual relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-[440px]">
              {/* Top Badge: Site Activity */}
              <div className={clsx(
                "absolute -top-12 z-30 bg-[#0A0A0B]/95 text-white px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-3 shadow-2xl",
                isAr ? "left-0" : "right-0"
              )}>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] animate-pulse shadow-[0_0_12px_var(--teal)]" />
                <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? '+ 42 خدمة جديدة اليوم' : '+42 New jobs today'}</span>
              </div>

              {/* Main Visual: Khadma Brand Showcase */}
              <div className="relative group perspective-2000">
                <div className="bg-white dark:bg-[#1A1A1E] rounded-[40px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-white/5 transition-all duration-700 hover:rotate-y-3 hover:scale-[1.01]">
                  <div className="relative h-60 overflow-hidden">
                    <img src="/Gemini_Generated_Image_vhi0kuvhi0kuvhi0.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Khadma Platform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-[var(--teal)] font-extrabold text-2xl shadow-xl shadow-black/20 italic">K</div>
                      <div>
                        <h4 className="font-black text-xl text-slate-800 dark:text-white leading-tight tracking-tight">{isAr ? 'منصة خدمة' : 'Khadma Platform'}</h4>
                        <p className="text-[11px] text-[var(--teal)] font-black uppercase tracking-[0.2em] mt-1">{isAr ? 'شريكك الموثوق' : 'Your Trusted Partner'}</p>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Global Trust Badge */}
                <div className={clsx(
                  "absolute -bottom-6 bg-white/20 dark:bg-[#1A1A1E]/20 rounded-[32px] p-7 shadow-2xl border border-white/30 dark:border-white/10 text-center min-w-[140px] z-10 transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-[#1A1A1E]/30",
                  isAr ? "-right-24" : "-left-24"
                )}>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Shield key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-transform">+50K</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{isAr ? 'عملاء سعداء' : 'Happy Users'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR - Refined */}
      <div className="kd-stats-bar bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-2xl">
        <div className="kd-stats-inner max-w-[1400px]">
          {[
            { num: '50K+', label: t('home.stats_users'), icon: '👥' },
            { num: '2K+', label: t('home.stats_providers'), icon: '🛡️' },
            { num: '98%', label: isAr ? 'نسبة الرضا' : 'Satisfaction Rate', icon: '⭐' },
            { num: '50+', label: t('home.stats_categories'), icon: '🛠️' },
          ].map(({ num, label, icon }) => (
            <div key={label} className="kd-stat-item border-slate-200 dark:border-white/5 group hover:bg-white/40 dark:hover:bg-white/5">
              <div className="kd-stat-icon grayscale group-hover:grayscale-0 transition-all">{icon}</div>
              <span className="kd-stat-num text-[var(--teal)] font-dm">{num}</span>
              <span className="kd-stat-label text-slate-400 uppercase tracking-tighter text-[10px] font-black">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT US — Premium Boxed Facelift */}
      <section id="about-us" className="animate-fade-up relative py-8 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto bg-white/40 dark:bg-white/5 rounded-[48px] border border-white/20 dark:border-white/5 backdrop-blur-3xl relative overflow-hidden px-10 md:px-20 py-16 shadow-lg shadow-black/5">
          {/* Subtle mesh blob instead of many floating ones */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />

          <div className="kd-about-grid relative z-10">
            <div className="kd-about-text animate-fade-in stagger-children">
              <span className="kd-section-label text-xs tracking-[0.3em] font-black text-[var(--teal)]">{isAr ? 'عن خدمة' : 'About Khedma'}</span>
              <h2 className="kd-section-title text-4xl md:text-6xl text-slate-800 dark:text-slate-100 font-dm leading-[1.1] mb-6">
                {isAr ? 'إعادة تعريف التميز في الخدمة في جميع أنحاء مصر' : 'Redefining service excellence across Egypt'}
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10 max-w-xl">
                {isAr
                  ? 'في "خدمة"، نؤمن بأن العثور على محترف موثوق لا ينبغي أن يكون مقامرة. منصتنا تربط العمال المهرة بالأشخاص الذين يحتاجون إليهم، مما يعزز مجتمعًا قائمًا على الثقة والشفافية والجودة العالية.'
                  : 'At Khedma, we believe that finding a reliable professional shouldn\'t be a gamble. Our platform connects skilled workers with people who need them, fostering a community built on trust, transparency, and top-tier quality.'}
              </p>
              <div className="flex gap-10 mt-12">
                <div className="group">
                  <div className="text-[var(--teal)] text-4xl font-dm mb-1 transition-transform group-hover:scale-110">150+</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">{isAr ? 'مدينة مغطاة' : 'Cities Covered'}</div>
                </div>
                <div className="group">
                  <div className="text-[var(--teal)] text-4xl font-dm mb-1 transition-transform group-hover:scale-110">24/7</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">{isAr ? 'دعم فني' : 'Premium Support'}</div>
                </div>
              </div>
            </div>

            <div className="kd-about-img animate-fade-up">
              <div className="relative group">
                <div className="absolute inset-0 bg-[var(--teal)] opacity-[0.03] rounded-[32px] blur-3xl group-hover:opacity-[0.1] transition-opacity" />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="About Khedma Team"
                  loading="lazy"
                  className="rounded-[32px] grayscale-[0.5] hover:grayscale-0 transition-all duration-[1s] border border-white/10 shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="animate-fade-up relative py-8 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="animate-fade-in">
              <span className="kd-section-label text-xs tracking-[0.3em] font-black text-[var(--teal)]">{isAr ? 'تصفح الأقسام' : 'Browse Categories'}</span>
              <h2 className="kd-section-title text-4xl md:text-5xl text-slate-800 dark:text-slate-100">{t('home.featured')}</h2>
              <p className="text-slate-500 font-medium max-w-xl">{t('home.featured_sub')}</p>
            </div>
            <Link to="/categories" className="kd-btn-special">
              <div className="flex -space-x-2">
                {[1, 2].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-6 h-6 rounded-full border border-white/20 object-cover" alt="" />)}
              </div>
              {t('common.see_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingCats
              ? Array(4).fill(0).map((_, i) => <div key={i} className="aspect-[4/3] bg-slate-100 dark:bg-white/5 rounded-[32px] animate-pulse" />)
              : categories.slice(0, 4).map((cat, i) => (
                <div key={cat._id} className="relative group cursor-pointer" onClick={() => setActiveModal({ type: 'category', data: cat })}>
                  <div className="kd-cat-card border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:shadow-2xl shadow-indigo-500/5">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">{lang === 'ar' && cat.nameAr ? cat.nameAr : cat.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{cat.subcategories?.length || 0} Specialties</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* TOP PROVIDERS */}
      <section id="top-providers" className="animate-fade-up relative py-8 px-6 md:py-12 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="kd-section-label text-[10px] sm:text-xs tracking-[0.3em] font-black text-[var(--teal)] uppercase">{isAr ? 'المواهب المميزة' : 'Top Rated Providers'}</span>
              <h2 className="kd-section-title text-3xl sm:text-4xl md:text-5xl text-slate-800 dark:text-slate-100 mt-2 mb-4">{t('home.top_providers')}</h2>
              <p className="text-slate-500 font-medium max-w-xl text-sm sm:text-base">{t('home.top_providers_sub')}</p>
            </div>
            <Link to="/providers" className="kd-btn-special">
              <div className="flex -space-x-2">
                {[1, 2].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 30}`} className="w-6 h-6 rounded-full border border-white/20 object-cover" alt="" />)}
              </div>
              {t('common.see_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {loadingProvs
              ? Array(3).fill(0).map((_, i) => <div key={i} className="aspect-[3/4] bg-slate-100 dark:bg-white/5 rounded-[32px] animate-pulse" />)
              : providers.map((p) => (
                <div key={p._id} className="relative group">
                  <ProviderCard provider={p} />
                  <button
                    onClick={(e) => { e.preventDefault(); setActiveModal({ type: 'provider', data: p }); }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/20 hover:bg-white/40 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* WHY CHOOSE KHEDMA */}
      <section className="animate-fade-up relative py-12 px-6">
        <div className="max-w-[1400px] mx-auto bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[60px] p-12 md:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-500 opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="kd-section-label text-xs tracking-[0.3em] font-black text-[var(--teal)] mb-6 mx-auto">{isAr ? 'لماذا نحن' : 'Why Khedma?'}</span>
            <h2 className="kd-section-title text-4xl md:text-6xl text-slate-800 dark:text-slate-100 mb-6">{isAr ? 'لماذا تختار خدمة؟' : 'Why choose Khedma?'}</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-16">
              {isAr ? 'لسنا مجرد منصة — نحن شريك موثوق لكل احتياجاتك، نضمن لك الراحة والأمان في كل خطوة.' : "We're not just a marketplace — we're your trusted partner for every need, ensuring comfort and security at every step."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: '🛡️', title: isAr ? 'محترفون موثوقون' : 'Verified Professionals', desc: isAr ? 'كل مقدم خدمة يخضع لعملية تدقيق صارمة لضمان أعلى جودة.' : 'Every service provider undergoes a rigorous vetting process to ensure the highest quality standards.' },
              { icon: '💎', title: isAr ? 'دفع آمن تماماً' : 'Secure Payments', desc: isAr ? 'نظام دفع آمن يضمن حقك؛ لا نرسل الأموال حتى تؤكد رضاك.' : 'A robust escrow system that protects you; funds are only released when you are 100% satisfied.' },
              { icon: '⚡', title: isAr ? 'سرعة وموثوقية' : 'Fast & Reliable', desc: isAr ? 'تواصل مع أفضل الخبراء في دقائق معدودة، وتتبع طلبك مباشرة.' : 'Connect with top experts in mere minutes and track your service request in real-time.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-2xl rounded-[40px] p-10 flex flex-col items-center hover:bg-white transition-all duration-500 hover:-translate-y-2 group shadow-sm">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-3">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TESTIMONIALS - Refined */}
      <section className="animate-fade-up relative py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="kd-section-label text-xs tracking-[0.3em] font-black text-[var(--teal)] mx-auto mb-4">{isAr ? 'قصص العملاء' : 'Customer Stories'}</span>
            <h2 className="kd-section-title text-4xl md:text-5xl text-slate-800 dark:text-slate-100">{isAr ? 'ماذا يقول عملاؤنا' : 'What our customers say'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: isAr ? 'وجدت سباك ممتاز خلال 10 دقائق. أصلح تسرب الأنابيب في نفس اليوم.' : "Found a brilliant plumber within 10 minutes. Fixed our pipe leak the same day. Couldn't be happier.", name: isAr ? 'نادية الرشيدي' : 'Nadia El-Rashidy', role: isAr ? 'القاهرة، مصر' : 'Cairo, Egypt', img: 'https://i.pravatar.cc/80?img=31' },
              { text: isAr ? 'أعدت تصميم موقعي بالكامل بجزء بسيط من تكلفة الوكالات.' : 'Got my entire website redesigned for a fraction of what agencies charge. Incredible quality.', name: isAr ? 'سارة أحمد' : 'Sarah Ahmed', role: isAr ? 'الإسكندرية، مصر' : 'Alexandria, Egypt', img: 'https://i.pravatar.cc/80?img=47' },
              { text: isAr ? 'حجزت 3 خدمات في شهر واحد. خدمة أصبحت منصتي المفضلة.' : 'Booked 3 services in one month — all top notch. Khedma is now my go-to platform.', name: isAr ? 'يوسف علي' : 'Youssef Ali', role: isAr ? 'الجيزة، مصر' : 'Giza, Egypt', img: 'https://i.pravatar.cc/80?img=56' },
            ].map((r, i) => (
              <div key={i} className="bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-3xl rounded-[40px] p-10 hover:bg-white transition-all duration-500 shadow-sm group">
                <div className="text-amber-500 mb-6">★★★★★</div>
                <p className="text-slate-600 dark:text-slate-400 italic mb-10 leading-relaxed font-medium">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full border border-slate-200 p-1" src={r.img} alt={r.name} />
                  <div>
                    <div className="text-sm font-black text-slate-800 dark:text-slate-100">{r.name}</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Refined */}
      <section className="animate-fade-up relative py-8 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto bg-slate-900 rounded-[60px] relative overflow-hidden px-10 py-24 text-center">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30 grayscale">
              <source src="/8293017-hd_1920_1080_30fps (online-video-cutter.com).mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--teal)] opacity-[0.05] rounded-full blur-[150px] animate-pulse" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="kd-section-label text-xs tracking-[0.3em] font-black text-[var(--teal)] mx-auto mb-6">{isAr ? 'ابدأ اليوم' : 'Get Started Today'}</span>
            <h2 className="text-4xl md:text-6xl font-dm text-white mb-8">
              {isAr ? 'هل أنت مستعد لإيجاد خدمتك المثالية؟' : 'Ready to find your perfect service?'}
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12">
              {isAr ? 'انضم لأكثر من 50,000 عميل و2,000 محترف. الانضمام مجاني.' : 'Join over 50,000 satisfied customers and 2,000+ professionals. Free to join.'}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register?role=seeker" className="bg-[var(--teal)] text-slate-900 px-12 py-5 rounded-2xl text-sm font-black hover:scale-105 transition-transform">{isAr ? 'انضم كعميل' : 'Join as a Customer'}</Link>
              <Link to="/providers" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl text-sm font-black hover:bg-white/20 transition-all">{isAr ? 'تصفح مقدمي الخدمات' : 'Browse Providers'}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL implementation */}
      {activeModal && (
        <div className="glass-modal animate-fade-in" onClick={() => setActiveModal(null)}>
          <div
            className="relative bg-white dark:bg-[#0c0d10] w-[92%] sm:w-full sm:max-w-2xl rounded-[40px] sm:rounded-[48px] overflow-hidden animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-64 bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 z-30 p-3 bg-white/10 backdrop-blur-md rounded-full text-slate-400 hover:text-white transition-all border border-white/20"
              >
                <ArrowRight className="w-4 h-4 rotate-45" />
              </button>
              {activeModal.type === 'provider' && activeModal.data && (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  {activeModal.data.category?.icon || '👤'}
                </div>
              )}
            </div>

            <div className="p-8 sm:p-14 text-center">
              {activeModal.data && activeModal.type === 'provider' ? (
                <>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                    {lang === 'ar' && activeModal.data.businessNameAr ? activeModal.data.businessNameAr : activeModal.data.businessName}
                  </h2>
                  <p className="text-[var(--teal)] font-bold mb-6 italic uppercase tracking-widest text-[10px] sm:text-xs">
                    {activeModal.data.category?.name || activeModal.data.category}
                  </p>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-md mx-auto text-sm sm:text-base">
                    {lang === 'ar' && activeModal.data.descriptionAr ? activeModal.data.descriptionAr : activeModal.data.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to={`/providers/${activeModal.data._id}`}
                      className="w-full sm:w-auto bg-[var(--teal)] text-slate-900 px-10 py-4 rounded-2xl text-sm font-black hover:scale-105 transition-transform"
                    >
                      {t('providers.view_profile')}
                    </Link>
                  </div>
                </>
              ) : activeModal.data ? (
                <>
                  <div className="text-5xl sm:text-7xl mb-6">{activeModal.data.icon}</div>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 leading-none tracking-tighter">
                    {lang === 'ar' && activeModal.data.nameAr ? activeModal.data.nameAr : activeModal.data.name}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-md mx-auto text-sm sm:text-base">
                    {lang === 'ar' && activeModal.data.descriptionAr ? activeModal.data.descriptionAr : activeModal.data.description}
                  </p>
                  <Link
                    to={`/categories/${activeModal.data.slug}`}
                    className="w-full sm:w-auto bg-[var(--teal)] text-slate-900 px-10 py-4 rounded-2xl text-sm font-black hover:scale-105 transition-transform"
                  >
                    {isAr ? 'استكشف التخصص' : 'Explore Specialty'}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
