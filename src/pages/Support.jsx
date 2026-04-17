// pages/Support.jsx — vibrant professional support page with dark mode support
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLang } from '../context/LangContext';
import { Shield, HelpCircle, FileText, Lock, Mail, Phone, MessageCircle, ArrowRight, CheckCircle2, Globe, Clock, Zap, X } from 'lucide-react';

export default function Support() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('help');
  const [selectedHelp, setSelectedHelp] = useState(null);
  const [showContactPop, setShowContactPop] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 100,
          behavior: 'smooth'
        });
        setActiveTab(location.hash.slice(1));
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Expanded help content
  const helpDetails = {
    started: {
      title: isAr ? 'كيفية البدء' : 'Getting Started',
      content: isAr ? (
        <div className="space-y-8">
          <p className="text-xl leading-relaxed text-slate-500 font-medium tracking-tight">البدء مع "خدمة" هو عملية بسيطة مصممة لتوصيلك بالمحترفين في أسرع وقت ممكن.</p>
          <div className="grid gap-6 text-right">
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">١. إنشاء الحساب</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">سجل باستخدام بريدك الإلكتروني أو حسابات التواصل الاجتماعي. تأكد من إكمال ملفك الشخصي لزيادة المصداقية.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">٢. البحث عن الخدمات</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">استخدم شريط البحث المتقدم أو تصفح الأقسام للعثور على الخدمة التي تحتاجها بدقة.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">٣. التواصل والتعاقد</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">تحدث مباشرة مع المحترفين، اطلب عروض أسعار، واتفق على تفاصيل العمل قبل البدء.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-xl leading-relaxed text-slate-500 font-medium">Getting started with Khedma is a simple process designed to connect you with professionals as quickly as possible.</p>
          <div className="grid gap-6">
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">1. Account Creation</h5>
              <p className="text-sm text-slate-500 leading-relaxed">Register using your email or social accounts. Make sure to complete your profile to increase trust with providers.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">2. Finding Services</h5>
              <p className="text-sm text-slate-500 leading-relaxed">Use the advanced search bar or browse categories to find the exact service you need.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">3. Connect & Hire</h5>
              <p className="text-sm text-slate-500 leading-relaxed">Chat directly with professionals, request quotes, and agree on work details before starting.</p>
            </div>
          </div>
        </div>
      )
    },
    orders: {
      title: isAr ? 'إدارة الطلبات' : 'Managing Orders',
      content: isAr ? (
        <div className="space-y-8">
          <p className="text-xl leading-relaxed text-slate-500 font-medium">توفر لوحة التحكم الخاصة بك أدوات قوية لتتبع وإدارة مشاريعك من البداية إلى النهاية.</p>
          <div className="grid gap-6 text-right">
            <div className="p-8 bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">نظام الرسائل</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">تحدث مع مقدم الخدمة، وأرسل الملفات، وتلقى التحديثات الفورية في مكان آمن ومركزي.</p>
            </div>
            <div className="p-8 bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">تتبع الخطوات (Milestones)</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">قسم مشاريعك الكبيرة إلى خطوات صغيرة وراقب تقدم العمل خطوة بخطوة.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-xl leading-relaxed text-slate-500 font-medium">Your dashboard provides powerful tools to track and manage your projects from start to finish.</p>
          <div className="grid gap-6">
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">Messaging System</h5>
              <p className="text-sm text-slate-500 leading-relaxed">Chat with your service provider, send files, and receive instant updates in a secure, central hub.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h5 className="font-black mb-3 text-slate-900 dark:text-white text-xl">Milestone Tracking</h5>
              <p className="text-sm text-slate-500 leading-relaxed">Break down larger projects into smaller tasks and monitor work progress step-by-step.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const sections = [
    {
      id: 'help',
      icon: <HelpCircle className="w-6 h-6" />,
      title: isAr ? 'مركز المساعدة' : 'Help Center',
      tagline: isAr ? 'دعم متواصل على مدار الساعة' : '24/7 Active Support',
      content: (
        <div className="space-y-12">
          <div className="flex items-center gap-6 p-8 bg-[rgba(0,201,167,0.04)] dark:bg-white/5 rounded-[32px] border border-[var(--teal)]/10">
            <div className="relative">
              <div className="w-3 h-3 bg-[var(--teal)] rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-[var(--teal)] rounded-full" />
            </div>
            <span className="font-black text-slate-700 dark:text-slate-300 tracking-tight">{isAr ? 'نحن متصلون الآن لمساعدتك' : 'Global Priority Support is Active'}</span>
          </div>
          
          <p className="text-2xl leading-tight text-slate-800 dark:text-slate-200 font-black tracking-tighter max-w-2xl">{isAr ? 'مرحباً بك في مركز مساعدة خدمة. نحن هنا لضمان حصولك على أفضل تجربة ممكنة وأكثرها سلاسة.' : 'Welcome to the Khedma Help Center. We ensure your professional journey is frictionless.'}</p>
          
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { id: 'started', icon: <Zap />, title: isAr ? 'كيفية البدء' : 'Getting Started', desc: isAr ? 'تعلم كيفية التسجيل والبحث عن مقدمي الخدمات الموثوقين.' : 'Learn how to register and find trusted experts.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
              { id: 'orders', icon: <FileText />, title: isAr ? 'إدارة الطلبات' : 'Managing Orders', desc: isAr ? 'تتبع مشاريعك الحالية، وتواصل مع المحترفين، وقم بإدارة مدفوعاتك.' : 'Track projects, communicate with experts, and manage payments.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' }
            ].map((card) => (
              <div 
                key={card.id}
                onClick={() => setSelectedHelp(card.id)}
                className="bg-white/60 dark:bg-white/5 p-10 rounded-[40px] border border-slate-200 dark:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-0 bg-[var(--teal)] group-hover:h-full transition-all duration-700" />
                <div className="mb-8 overflow-hidden rounded-3xl aspect-video relative shadow-lg">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <h4 className="font-black mb-4 text-3xl text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-3">
                  {card.title} {React.cloneElement(card.icon, { className: 'w-6 h-6 text-[var(--teal)] opacity-40 group-hover:opacity-100 transition-opacity' })}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          
          <div id="direct-contact" className="mt-24 pt-24 border-t border-slate-200 dark:border-white/5">
            <h3 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] bg-clip-text text-transparent">{isAr ? 'قنوات الاتصال المباشرة' : 'Direct Contact Channels'}</h3>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { icon: <Mail />, title: isAr ? 'البريد الإلكتروني' : 'Email', val: 'support@khedma.com', delay: '0.1s', link: 'mailto:support@khedma.com' },
                { icon: <Phone />, title: isAr ? 'اتصل بنا' : 'Phone', val: '+20 100 000 0000', delay: '0.2s', link: 'tel:+201000000000' },
                { icon: <MessageCircle />, title: isAr ? 'واتساب' : 'WhatsApp', val: '+20 110 000 0000', delay: '0.3s', link: 'https://wa.me/201100000000' }
              ].map((item, idx) => (
                <a key={idx} href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className="flex flex-col items-center p-10 rounded-[48px] border-2 border-[var(--border)] text-center bg-[var(--kd-white)] shadow-xl transition-all hover:scale-105 hover:border-[var(--teal)] animate-fade-up group cursor-pointer" style={{ animationDelay: item.delay }}>
                  <div className="w-20 h-20 mb-8 text-[var(--teal)] flex items-center justify-center bg-[rgba(0,201,167,0.06)] rounded-full shadow-inner group-hover:rotate-12 transition-transform">
                    {React.cloneElement(item.icon, { className: 'w-10 h-10' })}
                  </div>
                  <span className="font-bold text-2xl block mb-3 text-[var(--ink)]">{item.title}</span>
                  <span className="text-lg opacity-60 font-medium tracking-wide text-[var(--ink)]" dir="ltr">{item.val}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'safety',
      icon: <Shield className="w-6 h-6" />,
      title: isAr ? 'الثقة والأمان' : 'Trust & Safety',
      tagline: isAr ? 'أمانك هو غايتنا الأساسية' : 'Your security is our core mission',
      content: (
        <div className="grid md:grid-cols-[1fr_350px] gap-16 items-center">
          <div className="space-y-8">
            <p className="text-2xl leading-relaxed font-bold bg-gradient-to-l from-[var(--teal-dark)] to-[var(--ink)] bg-clip-text text-transparent">{isAr ? 'نحن نتخذ تدابير صارمة وشاملة لحماية مجتمعنا وضمان بيئة عمل آمنة وموثوقة بنسبة ١٠٠٪.' : 'We take extensive and comprehensive measures to protect our community and ensure a 100% secure environment.'}</p>
            <ul className="space-y-6 opacity-90 text-xl leading-relaxed text-[var(--ink)]">
              {[
                { txt: isAr ? 'التحقق الدقيق من هوية جميع مقدمي الخدمات.' : 'Strict global identity verification.', icon: <CheckCircle2 className="text-[var(--teal)]" /> },
                { txt: isAr ? 'نظام تقييم ومراجعة شفاف من عملاء حقيقيين.' : 'Transparent AI-backed review system.', icon: <CheckCircle2 className="text-[var(--teal)]" /> },
                { txt: isAr ? 'حماية كاملة للمدفوعات عبر نظام الضمان المتطور.' : 'Full payment protection via Smart Escrow.', icon: <CheckCircle2 className="text-[var(--teal)]" /> },
                { txt: isAr ? 'فريق دعم متخصص ومتواجد على مدار الساعة.' : 'Dedicated 24/7 Dispute Resolution team.', icon: <CheckCircle2 className="text-[var(--teal)]" /> }
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start p-4 hover:bg-[rgba(0,201,167,0.02)] rounded-2xl transition-all group">
                  <div className="mt-1 group-hover:scale-125 transition-transform">{item.icon}</div>
                  <span className="group-hover:translate-x-2 transition-transform">{item.txt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group perspective-1000">
             <div className="absolute inset-0 bg-[var(--teal)] rounded-[60px] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
             <div className="relative rounded-[60px] overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-y-12">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" alt="Security" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-6 -right-6 p-6 bg-[var(--kd-white)] rounded-3xl shadow-2xl border border-[var(--border)] animate-bounce-slow">
                <Shield className="w-10 h-10 text-[var(--teal)]" />
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'terms',
      icon: <FileText className="w-6 h-6" />,
      title: isAr ? 'شروط الخدمة' : 'Terms of Service',
      tagline: isAr ? 'إتفاقية واضحة وعادلة' : 'Clear & Fair Agreement',
      content: (
        <div className="space-y-10 py-8 relative">
          <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-b from-[var(--teal)] to-transparent opacity-10 rounded-full" />
          <div className="pl-16 space-y-8">
            <p className="text-2xl italic leading-loose opacity-80 border-l-8 border-[var(--teal)] pl-10 py-6 bg-[var(--kd-white)] shadow-sm rounded-r-[32px] text-[var(--ink)]">
              "{isAr ? 'هذه هي القواعد واللوائح التنظيمية التي تحكم استخدامك لمنصة خدمة. من خلال استخدام خدماتنا، فإنك توافق على الالتزام التام بهذه الشروط التي تضمن حقوق جميع الأطراف...' : 'These are the rules and regulations that govern your use of the Khedma platform. By accessing our services, you agree to comply with these terms which ensure fairness for all parties...'}"
            </p>
            <div className="flex flex-wrap gap-8 items-center text-sm font-bold text-[var(--muted)] pt-8 tracking-widest uppercase">
              <span className="flex items-center gap-2 text-[var(--ink)]"><Globe className="w-4 h-4" /> Global Compliance</span>
              <span className="flex items-center gap-2 text-[var(--ink)]"><Clock className="w-4 h-4" /> Updated: April 2026</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      icon: <Lock className="w-6 h-6" />,
      title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
      tagline: isAr ? 'أمان بياناتك هي مسؤوليتنا' : 'Data Privacy is our responsibility',
      content: (
        <div className="grid md:grid-cols-[1fr_300px] gap-16 items-center">
          <div className="space-y-10">
            <div className="p-12 bg-gradient-to-br from-[var(--paper)] to-[var(--kd-white)] rounded-[60px] border-2 border-dashed border-[var(--border)] relative group">
              <div className="absolute inset-0 bg-[var(--teal)] opacity-0 group-hover:opacity-[0.02] transition-opacity rounded-[60px]" />
              <p className="text-2xl leading-relaxed text-[var(--ink)] font-bold">{isAr ? 'نحن نحترم مدي أهمية خصوصيتك ونلتزم التزاماً كاملاً بحماية بياناتك الشخصية.' : 'We understand the critical importance of your privacy and are fully committed to protecting your personal data.'}</p>
            </div>
            <p className="text-xl leading-relaxed opacity-70 pl-8 border-l-2 border-[var(--border)] text-[var(--ink)]">{isAr ? 'نشرح في هذه السياسة بالتفصيل كيفية جمعنا للمعلومات، وكيفية استخدامها، والخطوات الأمنية الصارمة التي نتخذها لضمان بقاء بياناتك آمنة...' : 'This policy explains in detail how we collect information, how it is used, and the strict security steps we take to ensure your data stays secure...'}</p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-8">
             <div className="w-48 h-48 bg-[var(--paper)] rounded-full flex items-center justify-center p-10 shadow-inner group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-[var(--border)]">
                <Lock className="w-full h-full text-[var(--teal)] transition-transform group-hover:scale-110 group-hover:rotate-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-30 text-[var(--ink)]">End-to-End Encryption</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen mesh-bg pb-32">
      {/* Premium Atmosphere Blocks */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] bg-[var(--teal)] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-indigo-500 opacity-[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Expert Side Panel - Cinematic Refinement */}
      {selectedHelp && (
        <div className="fixed inset-0 z-[160] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedHelp(null)} />
          <div 
            className="relative w-full max-w-xl h-full bg-white dark:bg-[#0c0d10] border-l border-slate-200 dark:border-white/10 shadow-2xl overflow-y-auto animate-slide-in-right scrollbar-hide flex flex-col pt-24"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-10 md:p-14">
              <div className="flex justify-between items-center mb-12">
                <div className="px-5 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{isAr ? 'تفاصيل الخبرة' : 'Expert Insight'}</span>
                </div>
                <button onClick={() => setSelectedHelp(null)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">{helpDetails[selectedHelp].title}</h3>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--teal)] mb-12">Knowledge Base Article</p>
              
              <div className="prose prose-slate dark:prose-invert max-w-none mb-20 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {helpDetails[selectedHelp].content}
              </div>

              <div className="p-10 bg-slate-900 dark:bg-white rounded-[40px] text-white dark:text-slate-900 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--teal)] opacity-20 rounded-full blur-3xl" />
                <h5 className="text-xl font-black mb-4 relative z-10">{isAr ? 'تحتاج لمساعدة مخصصة؟' : 'Need Custom Support?'}</h5>
                <p className="text-sm opacity-60 mb-8 relative z-10">{isAr ? 'فريقنا المتخصص متوفر الآن لمكالمة مباشرة.' : 'Our priority support team is currently online for a direct call.'}</p>
                <button 
                  onClick={() => setShowContactPop(true)}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest relative z-10 hover:gap-5 transition-all"
                >
                   {isAr ? 'تحدث معنا الآن' : 'Speak with an Expert'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Contact Modal - World Class Popup */}
      {showContactPop && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#0c0d10] rounded-[60px] p-10 md:p-20 shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-in">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--teal)] to-transparent" />
             <button onClick={() => setShowContactPop(false)} className="absolute top-10 right-10 p-4 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
               <X className="w-6 h-6" />
             </button>
             
             <div className="text-center mb-16">
                <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">{isAr ? 'اتصال مباشر مرجح' : 'Priority Contact Channels'}</h4>
                <p className="text-slate-500 font-medium">{isAr ? 'اختر الوسيلة التي تفضلها للتواصل مع فريقنا' : 'Choose your preferred way to connect with our elite support team'}</p>
             </div>

             <div className="grid sm:grid-cols-3 gap-8">
               {[
                 { icon: <Mail />, title: isAr ? 'إيميل' : 'Email', val: 'support@khedma.com', link: 'mailto:support@khedma.com' },
                 { icon: <Phone />, title: isAr ? 'اتصال' : 'Phone', val: '+20 100 000 0000', link: 'tel:+201000000000' },
                 { icon: <MessageCircle />, title: isAr ? 'واتس' : 'WhatsApp', val: '+20 110 000 0000', link: 'https://wa.me/201100000000' }
               ].map((item, i) => (
                 <a 
                   key={i} 
                   href={item.link} 
                   className="p-10 rounded-[48px] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-center group hover:bg-[var(--teal)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--teal)]/20"
                 >
                    <div className="w-16 h-16 mx-auto mb-6 bg-white dark:bg-white/5 rounded-full flex items-center justify-center text-[var(--teal)] group-hover:text-white group-hover:bg-white/20 transition-all">
                       {React.cloneElement(item.icon, { className: 'w-8 h-8' })}
                    </div>
                    <div className="font-black text-slate-900 dark:text-white text-lg mb-1 group-hover:text-white">{item.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 group-hover:text-white/60 tracking-tight">{item.val}</div>
                 </a>
               ))}
             </div>
          </div>
        </div>
      )}

      <main className="max-w-[1100px] mx-auto px-6 py-32 relative z-10">
        {/* Header Hero - Stripe Minimalist Style */}
        <div className="text-center mb-40 animate-fade-up">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/40 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 mb-10 backdrop-blur-xl">
             <div className="w-2 h-2 bg-[var(--teal)] rounded-full animate-ping" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{isAr ? 'مركز العمليات والدعم' : 'Operations & Support Hub'}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-10 text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
            {isAr ? 'كيف يمكننا' : 'Technical'}<br/>
            <span className="opacity-40">{isAr ? 'المساعدة اليوم؟' : 'Assistance'}</span>
          </h1>
          
          <p className="text-lg md:text-xl mx-auto max-w-xl text-slate-500 font-medium leading-relaxed mb-16">
            {isAr 
              ? 'الخدمة لا تنتهي عند الطلب. استكشف سياساتنا، مراكز حل النزاعات، ووثائق الأمان المتطورة.'
              : 'Service doesn\'t end at booking. Explore our smart resolution center, legal protocols, and advanced safety documentation.'}
          </p>

          {/* Minimal Tab Controller */}
          <div className="inline-flex p-1.5 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[24px] backdrop-blur-2xl">
             {['help', 'safety', 'terms', 'privacy'].map(id => (
                <button 
                  key={id} 
                  onClick={() => {
                    const el = document.getElementById(id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setActiveTab(id);
                  }}
                  className={clsx(
                    "px-8 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                    activeTab === id 
                      ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-2xl scale-105" 
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  )}
                >
                  {id}
                </button>
             ))}
          </div>
        </div>

        {/* Content Layers */}
        <div className="space-y-48">
          {sections.map((sec, i) => (sec && (
            <section 
              key={sec.id} 
              id={sec.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 text-[var(--teal)] rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10">
                      {React.cloneElement(sec.icon, { className: 'w-5 h-5' })}
                    </div>
                    <span className="text-[var(--teal)] font-black text-[10px] uppercase tracking-[0.34em]">{sec.tagline}</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{sec.title}</h2>
                </div>
              </div>
              
              <div className="bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-8 md:p-16 rounded-[60px] backdrop-blur-3xl shadow-2xl shadow-slate-200/5 transition-all duration-500 hover:bg-white/60 dark:hover:bg-white/[0.08] group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                {sec.content}
              </div>
            </section>
          )))}
        </div>

        {/* Global Support CTA */}
        <div className="mt-48 bg-slate-900 dark:bg-white rounded-[60px] p-20 text-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--teal)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <h3 className="text-5xl md:text-7xl font-black text-white dark:text-slate-900 mb-10 tracking-tighter leading-[0.85]">
             {isAr ? 'على بعد كلمة واحدة' : 'One click away'}<br/>
             <span className="opacity-30">{isAr ? 'من الحل المثالي' : 'from resolution'}</span>
           </h3>
           <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button 
                onClick={() => {
                  document.getElementById('direct-contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[var(--teal)] text-slate-900 px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                {isAr ? 'تواصل مع الإدارة' : 'DIRECT CONTACT'}
              </button>
              <Link to="/providers" className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-md text-white dark:text-slate-500 px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 dark:border-slate-900/10 hover:bg-white/20 transition-all">{isAr ? 'العودة للمنصة' : 'EXPLORE MARKET'}</Link>
           </div>
        </div>
      </main>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          @keyframes slide-in-right {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slide-in-right {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 40px 40px 0 0 !important;
            height: 90vh !important;
            top: 10vh !important;
          }
        }
      `}</style>
    </div>
  );
}
