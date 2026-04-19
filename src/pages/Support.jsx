// pages/Support.jsx — Lean Enterprise Version
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLang } from '../context/LangContext';
import { 
  Shield, HelpCircle, FileText, Lock, Mail, Phone, 
  MessageCircle, ArrowRight, CheckCircle2, Globe, 
  Clock, Zap, X 
} from 'lucide-react';

const SectionHeader = ({ icon: Icon, tagline, title, isAr }) => (
  <div className={clsx("flex flex-col gap-4 mb-10 sm:mb-16", isAr ? "items-end text-right" : "items-start text-left")}>
    <div className={clsx("flex items-center gap-4", isAr && "flex-row-reverse")}>
      <div className="w-10 h-10 bg-slate-50 dark:bg-white/[0.03] text-[var(--teal)] rounded-2xl flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[var(--teal)] font-black text-[9px] uppercase tracking-[0.35em] whitespace-nowrap">{tagline}</span>
    </div>
    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{title}</h2>
  </div>
);

const ContactCard = ({ icon: Icon, title, val, link, colorClass }) => (
  <a 
    href={link} 
    target={link.startsWith('http') ? '_blank' : '_self'} 
    rel="noreferrer" 
    className={clsx(
      "flex flex-col items-center p-8 sm:p-10 rounded-[40px] border-2 border-slate-100 dark:border-white/5",
      "text-center bg-white/40 dark:bg-white/[0.02] shadow-sm transition-all duration-500",
      "hover:shadow-xl hover:-translate-y-1 hover:border-[var(--teal)]/30 group cursor-pointer",
      colorClass
    )}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center bg-slate-50 dark:bg-white/5 rounded-full group-hover:bg-[var(--teal)] group-hover:text-white transition-all duration-300">
      <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
    </div>
    <span className="font-black text-xl mb-1 text-slate-800 dark:text-white tracking-tight">{title}</span>
    <span className="text-sm opacity-50 font-bold tracking-tight text-slate-500 dark:text-slate-400" dir="ltr">{val}</span>
  </a>
);

export default function Support() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('help');
  const [selectedHelpId, setSelectedHelpId] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const sectionRefs = {
    help: useRef(null), safety: useRef(null), terms: useRef(null), privacy: useRef(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveTab(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -50% 0px' });

    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { setSelectedHelpId(null); setIsContactModalOpen(false); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToSection = useCallback((id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update active tab manually for immediate visual feedback
    setActiveTab(id);
    // Update URL hash without jumping
    window.history.pushState(null, '', `#${id}`);
  }, []);

  // Handle direct hash links on load or external route navigation
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      if (sectionRefs[targetId] && sectionRefs[targetId].current) {
        // Small delay to ensure the DOM has fully painted the layout before scrolling
        setTimeout(() => {
          scrollToSection(targetId);
        }, 150);
      }
    }
  }, [location.hash, scrollToSection]);

  const helpData = useMemo(() => ({
    started: {
      title: isAr ? 'كيفية البدء' : 'Getting Started',
      steps: [
        { title: isAr ? 'إنشاء الحساب' : 'Account Creation', desc: isAr ? 'سجل باستخدام بريدك الإلكتروني أو حسابات التواصل الاجتماعي.' : 'Register using email or social accounts.' },
        { title: isAr ? 'البحث عن الخدمات' : 'Finding Services', desc: isAr ? 'استخدم شريط البحث المتقدم للعثور على المحترفين.' : 'Use advanced search cards to find experts.' },
        { title: isAr ? 'التواصل والتعاقد' : 'Connect & Hire', desc: isAr ? 'اطلب عروض أسعار واتفق على التفاصيل.' : 'Request quotes and initiate safe contracts.' }
      ]
    },
    orders: {
      title: isAr ? 'إدارة الطلبات' : 'Managing Orders',
      steps: [
        { title: isAr ? 'نظام الرسائل' : 'Smart Chat', desc: isAr ? 'تحدث مباشرة وشارك الملفات في مكان آمن.' : 'Real-time encrypted chat and file sharing.' },
        { title: isAr ? 'تتبع الخطوات' : 'Milestone Logic', desc: isAr ? 'راقب تقدم مشروعك خطوة بخطوة.' : 'Track project progress via intelligent milestones.' }
      ]
    }
  }), [isAr]);

  const selectedContent = selectedHelpId ? helpData[selectedHelpId] : null;

  return (
    <div className={clsx("relative min-h-screen kd-wallpaper mesh-bg pb-32 pt-24 transition-colors duration-500", isAr ? "text-right" : "text-left")}>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] right-[-5%] w-[45%] h-[45%] bg-[var(--teal)] opacity-[0.03] dark:opacity-[0.08] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-sky-500 opacity-[0.02] dark:opacity-[0.05] rounded-full blur-[120px]" />
      </div>

      {selectedHelpId && (
        <div className="fixed inset-0 z-[160] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" onClick={() => setSelectedHelpId(null)} />
          <aside className="relative w-full max-w-xl h-full bg-white dark:bg-[#0c0d10] border-l border-slate-200 dark:border-white/10 shadow-2xl animate-drawer-in flex flex-col p-8 sm:p-16">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--teal)] opacity-60">Article Insight</span>
              <button onClick={() => setSelectedHelpId(null)} className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><X className="w-5 h-5" /></button>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-none">{selectedContent?.title}</h3>
            <div className="space-y-6 mb-16 overflow-y-auto scrollbar-hide">
              {selectedContent?.steps.map((step, idx) => (
                <div key={idx} className="p-6 bg-slate-50/50 dark:bg-white/[0.02] rounded-3xl border border-slate-100 dark:border-white/5">
                  <h5 className="font-black mb-1 text-slate-800 dark:text-white text-lg">{idx + 1}. {step.title}</h5>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setIsContactModalOpen(true)} className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[.25em] text-[var(--teal)] dark:text-slate-900 p-8 bg-slate-950 dark:bg-white rounded-[32px] justify-between group">
               {isAr ? 'تحدث مع خبير' : 'Speak with Expert'} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </aside>
        </div>
      )}

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#0c0d10] rounded-[48px] p-8 sm:p-16 shadow-2xl border border-slate-200 dark:border-white/10 animate-fade-in">
             <button onClick={() => setIsContactModalOpen(false)} className="absolute top-8 right-8 p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"><X className="w-6 h-6" /></button>
             <div className="text-center mb-12">
                <h4 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">{isAr ? 'تواصل مباشر' : 'Elite Concierge'}</h4>
                <p className="text-slate-500 font-medium text-sm sm:text-base">{isAr ? 'اختر الوسيلة المفضلة للتواصل مع فريقنا' : 'Select a secure channel to reach out to our dedicated support agents'}</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
               {[
                 { id: 'mail', icon: Mail, title: 'Email', val: 'support@khedma.com', link: 'mailto:support@khedma.com' },
                 { id: 'phone', icon: Phone, title: 'Phone', val: '+20 100 000 000', link: 'tel:+20100000000' },
                 { id: 'wa', icon: MessageCircle, title: 'WhatsApp', val: '+20 110 000 000', link: 'https://wa.me/20110000000' }
               ].map((item) => (
                 <a key={item.id} href={item.link} className="p-8 rounded-[36px] bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 text-center group hover:bg-[var(--teal)] transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 mx-auto mb-5 bg-white dark:bg-white/5 shadow-sm rounded-2xl flex items-center justify-center text-[var(--teal)] group-hover:text-white group-hover:bg-white/20 transition-all"><item.icon className="w-6 h-6" /></div>
                    <div className="font-black text-slate-800 dark:text-white mb-1 group-hover:text-white">{item.title}</div>
                    <div className="text-[9px] font-bold text-slate-400 group-hover:text-white/70 tracking-tight">{item.val}</div>
                 </a>
               ))}
             </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <header className="text-center mb-32 sm:mb-40">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/40 dark:bg-white/[0.03] rounded-full border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-xl">
             <div className="w-2 h-2 bg-[var(--teal)] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Operations Hub</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter leading-[0.9] lg:leading-[0.85]">
            {isAr ? 'كيف يمكننا' : 'Universal'}<br/><span className="opacity-30">{isAr ? 'المساعدة اليوم؟' : 'Assistance'}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mx-auto max-w-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-16">
            {isAr ? 'استكشف سياساتنا، مراكز حل النزاعات، ووثائق الأمان المتطورة.' : 'Navigate through our resolution center, legal frameworks, and specialized safety documentation.'}
          </p>
          <div className="flex justify-center w-full mb-16">
            <div className="inline-flex p-1.5 bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[28px] backdrop-blur-2xl overflow-x-auto scrollbar-hide max-w-full">
               {['help', 'safety', 'terms', 'privacy'].map(id => (
                  <button key={id} onClick={() => scrollToSection(id)} className={clsx("px-8 py-3.5 rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap", activeTab === id ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xl scale-[1.03]" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200")}>
                    {id}
                  </button>
               ))}
            </div>
          </div>
        </header>

        <div className="space-y-32 sm:space-y-40 md:space-y-56">
          <section id="help" ref={sectionRefs.help} className="scroll-mt-24">
            <SectionHeader icon={HelpCircle} tagline="24/7 Priority Support" title="Help Center" isAr={isAr} />
            <div className="bg-white/40 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] p-8 sm:p-14 lg:p-16 rounded-[48px] sm:rounded-[60px] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
               <div className="space-y-12">
                  <h4 className="text-2xl sm:text-4xl text-slate-800 dark:text-white font-black leading-tight tracking-tight max-w-2xl">
                    {isAr ? 'مرحباً بك في مركز مساعدة خدمة. نحن نضمن وصولك لأفضل تجربة ممكنة.' : 'Welcome to the Help Center. Specialized care for every service journey.'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {[
                      { id: 'started', icon: Zap, title: isAr ? 'كيفية البدء' : 'Getting Started', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600' },
                      { id: 'orders', icon: FileText, title: isAr ? 'إدارة الطلبات' : 'Managing Orders', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600' }
                    ].map((card) => (
                      <button key={card.id} onClick={() => setSelectedHelpId(card.id)} className="text-left group/card relative p-6 sm:p-10 bg-white/80 dark:bg-white/[0.02] rounded-[32px] border border-slate-100 dark:border-white/5 transition-all hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden">
                        <div className="mb-6 rounded-2xl overflow-hidden aspect-video relative shadow-sm"><img src={card.img} alt="" className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-700" /></div>
                        <h5 className={clsx("text-2xl font-black text-slate-800 dark:text-white flex items-center justify-between", isAr && "flex-row-reverse")}>{card.title} <card.icon className="w-5 h-5 text-[var(--teal)] opacity-50" /></h5>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
            <div className="mt-16 sm:mt-24 pt-16 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
               <ContactCard icon={Mail} title="Email" val="support@khedma.com" link="mailto:support@khedma.com" />
               <ContactCard icon={Phone} title="Hotline" val="+20 100 000 000" link="tel:+20100000000" />
               <ContactCard icon={MessageCircle} title="WhatsApp" val="+20 110 000 000" link="https://wa.me/20110000000" />
            </div>
          </section>

          <section id="safety" ref={sectionRefs.safety} className="scroll-mt-24">
             <SectionHeader icon={Shield} tagline="Trust Protocols" title="Trust & Safety" isAr={isAr} />
             <div className="bg-white/40 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] p-8 sm:p-14 lg:p-16 rounded-[60px] backdrop-blur-3xl shadow-2xl relative overflow-hidden group hover:bg-white/60 transition-all duration-700">
                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
                   <div className="space-y-10">
                      <p className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 tracking-tight">{isAr ? 'نلتزم تدابير صارمة وشاملة لحماية مجتمعنا.' : 'We deploy high-end verification standards to protect our community members.'}</p>
                      <div className="grid gap-4">
                        {[isAr ? 'التحقق الدقيق من الهوية.' : 'Global KYC & Identity verification.', isAr ? 'نظام تقييم شفاف وشامل.' : 'Smart feedback loop for all parties.', isAr ? 'حماية المدفوعات الذكية.' : 'Military-grade payment escrow.'].map((text, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-2xl group/item">
                             <CheckCircle2 className="w-6 h-6 text-[var(--teal)]" /><span className="text-sm sm:text-base font-bold text-slate-600 dark:text-slate-400">{text}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div className="relative group/visual max-w-xs mx-auto">
                      <div className="relative rounded-[48px] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5 transition-transform duration-700 hover:scale-[1.02]"><img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600" alt="" className="w-full aspect-[4/5] object-cover" /></div>
                   </div>
                </div>
             </div>
          </section>

          <section id="terms" ref={sectionRefs.terms} className="scroll-mt-24">
             <SectionHeader icon={FileText} tagline="Governance" title={isAr ? 'شروط الاستخدام' : 'Terms of Service'} isAr={isAr} />
             <div className="relative p-8 sm:p-16 bg-white/60 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[48px] sm:rounded-[60px] backdrop-blur-3xl shadow-2xl">
                <div className="space-y-12">
                  <p className="text-lg sm:text-2xl italic text-slate-700 dark:text-slate-300 font-medium tracking-tight">
                    {isAr ? '"تعتبر هذه الشروط هي الإطار القانوني الحاكم لاستخدامك للمنصة، وهي مصممة لضمان حقوق كافة الأطراف والالتزام بالمعايير المهنية."' : '"Our terms create a balanced legal framework designed to protect global user integrity and ensure high professional standards for every booking."'}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 sm:gap-12 text-sm sm:text-base">
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider">{isAr ? '١. قواعد الاستخدام' : '1. Usage Rules'}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isAr ? 'يجب استخدام المنصة لأغراض قانونية فقط. يُحظر تماماً أي سلوك احتيالي أو محاولة التلاعب بالأسعار أو التحرش بالمستخدمين الآخرين.' : 'The platform must be used for lawful purposes only. Fraudulent behavior, price manipulation, or harassment of other users is strictly prohibited.'}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider">{isAr ? '٢. مسؤولية الحساب' : '2. Account Security'}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isAr ? 'أنت مسؤول عن الحفاظ على سرية بيانات دخولك. يمنع مشاركة الحساب مع أشخاص غير مصرح لهم بممارسة الخدمة.' : 'You are responsible for maintaining the confidentiality of your login credentials. Sharing accounts with unauthorized personnel is prohibited.'}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider">{isAr ? '٣. الملكية الفكرية' : '3. Intellectual Property'}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isAr ? 'جميع المحتويات والعلامات التجارية في تطبيق خدمة هي ملكية خاصة. يُحظر نسخ أو إعادة توزيع أي جزء من المنصة دون إذن.' : 'All content and trademarks within Khedma are proprietary. Copying or redistributing any part of the platform without permission is forbidden.'}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider">{isAr ? '٤. إخلاء المسؤولية' : '4. Liability Disclaimer'}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isAr ? 'تعمل خدمة كوسيط تقني. نحن غير مسؤولين عن جودة العمل النهائي، ولكننا نوفر نظام حل نزاعات لضمان حقوق الأطراف.' : 'Khedma acts as a technical intermediary. We are not liable for the final quality of work, but provide a dispute system to protect user rights.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> International Law Compliance</span>
                   <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Updated: April 2026</span>
                </div>
             </div>
          </section>

          <section id="privacy" ref={sectionRefs.privacy} className="scroll-mt-24">
             <SectionHeader icon={Lock} tagline="Private Vault" title={isAr ? 'سياسة الخصوصية' : 'Privacy Policy'} isAr={isAr} />
             <div className="p-8 sm:p-16 bg-white/40 dark:bg-white/[0.01] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[60px] transition-all hover:bg-white/60">
                <div className="space-y-12">
                   <div className="grid lg:grid-cols-[1fr_250px] gap-12 items-center text-center lg:text-left">
                      <div className="space-y-4">
                         <h4 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight">{isAr ? 'أمن بياناتك هو أولويتنا القصوى.' : 'Privacy-First Architecture.'}</h4>
                         <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                           {isAr ? 'نحن نؤمن بأن الخصوصية حق إنساني، ولذلك نطبق أقوى معايير التشفير لحماية معلوماتك الشخصية.' : 'We believe privacy is a fundamental right. We deploy high-grade encryption to ensure your personal data remains strictly under your control.'}
                         </p>
                      </div>
                      <div className="hidden lg:flex flex-col items-center gap-6">
                         <div className="w-40 h-40 bg-white dark:bg-white/[0.03] rounded-full flex items-center justify-center border border-slate-100 shadow-inner hover:scale-110 transition-transform duration-700"><Lock className="w-10 h-10 text-[var(--teal)] opacity-50" /></div>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-3 gap-8 text-sm sm:text-base border-t border-slate-100 dark:border-white/5 pt-12">
                      <div className="space-y-4">
                        <h5 className="font-extrabold text-[var(--teal)] uppercase tracking-widest text-[10px]">{isAr ? 'جمع البيانات' : 'Data Collection'}</h5>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                          {isAr ? 'نجمع بيانات الملف الشخصي، معلومات الموقع، وتاريخ المعاملات لتحسين كفاءة البحث وتقديم اقتراحات مخصصة.' : 'We collect profile data, location info, and transaction history to optimize search efficiency and provide personalized service suggestions.'}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h5 className="font-extrabold text-[var(--teal)] uppercase tracking-widest text-[10px]">{isAr ? 'الأمان والتشفير' : 'Security & Encryption'}</h5>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                          {isAr ? 'يتم تشفير كافة البيانات الحساسة باستخدام بروتوكولات AES-256. لا نقوم بتخزين أي معلومات دفع كاملة على خوادمنا.' : 'All sensitive data is encrypted via AES-256 protocols. We do not store full payment credentials on our internal servers.'}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h5 className="font-extrabold text-[var(--teal)] uppercase tracking-widest text-[10px]">{isAr ? 'حقوق المستخدم' : 'User Rights'}</h5>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                          {isAr ? 'لديك الحق الكامل في طلب نسخة من بياناتك، تحديثها، أو طلب مسحها نهائياً من أنظمتنا في أي وقت.' : 'You have the absolute right to request a copy of your data, update it, or request permanent deletion from our systems at any time.'}
                        </p>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <div className="mt-40 bg-slate-950 dark:bg-white rounded-[60px] sm:rounded-[80px] p-12 sm:p-24 text-center relative overflow-hidden group shadow-3xl">
           <h3 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white dark:text-slate-900 mb-10 tracking-tighter leading-[0.85] relative z-10">{isAr ? 'حلولنا المهنية' : 'Precision'}<br/><span className="opacity-30">{isAr ? 'بين يديك الآن' : 'Support Care'}</span></h3>
           <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10 w-full sm:w-auto mx-auto max-w-lg">
              <button onClick={() => setIsContactModalOpen(true)} className="w-full sm:w-auto bg-[var(--teal)] text-slate-900 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] hover:scale-[1.03] transition-all active:scale-95">Get in Touch</button>
              <Link to="/providers" className="w-full sm:w-auto border border-white/20 dark:border-slate-900/10 text-white dark:text-slate-500 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[.25em] hover:bg-white/10 transition-all">Explore Platform</Link>
           </div>
        </div>
      </main>

      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-drawer-in { animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          @keyframes slide-to-top { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .animate-drawer-in { animation: slide-to-top 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; width: 100% !important; border-radius: 40px 40px 0 0 !important; height: 85vh !important; top: 15vh !important; }
        }
      `}</style>
    </div>
  );
}
