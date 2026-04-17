// pages/Support.jsx — vibrant professional support page with dark mode support
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useLang } from '../context/LangContext';
import { Shield, HelpCircle, FileText, Lock, Mail, Phone, MessageCircle, ArrowRight, CheckCircle2, Globe, Clock, Zap, X } from 'lucide-react';

export default function Support() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('help');
  const [selectedHelp, setSelectedHelp] = useState(null);

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
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[var(--ink)]">البدء مع "خدمة" هو عملية بسيطة مصممة لتوصيلك بالمحترفين في أسرع وقت ممكن.</p>
          <div className="space-y-6">
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">١. إنشاء الحساب</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">سجل باستخدام بريدك الإلكتروني أو حسابات التواصل الاجتماعي. تأكد من إكمال ملفك الشخصي لزيادة المصداقية.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">٢. البحث عن الخدمات</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">استخدم شريط البحث المتقدم أو تصفح الأقسام للعثور على الخدمة التي تحتاجها بدقة.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">٣. التواصل والتعاقد</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">تحدث مباشرة مع المحترفين، اطلب عروض أسعار، واتفق على تفاصيل العمل قبل البدء.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[var(--ink)]">Getting started with Khedma is a simple process designed to connect you with professionals as quickly as possible.</p>
          <div className="space-y-6">
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">1. Account Creation</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">Register using your email or social accounts. Make sure to complete your profile to increase trust with providers.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">2. Finding Services</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">Use the advanced search bar or browse categories to find the exact service you need.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">3. Connect & Hire</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">Chat directly with professionals, request quotes, and agree on work details before starting.</p>
            </div>
          </div>
        </div>
      )
    },
    orders: {
      title: isAr ? 'إدارة الطلبات' : 'Managing Orders',
      content: isAr ? (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[var(--ink)]">توفر لوحة التحكم الخاصة بك أدوات قوية لتتبع وإدارة مشاريعك من البداية إلى النهاية.</p>
          <div className="space-y-6">
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">نظام الرسائل</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">تحدث مع مقدم الخدمة، وأرسل الملفات، وتلقى التحديثات الفورية في مكان آمن ومركزي.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">تتبع الخطوات (Milestones)</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">قسم مشاريعك الكبيرة إلى خطوات صغيرة وراقب تقدم العمل خطوة بخطوة.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">المدفوعات الآمنة</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">تتم معالجة جميع المدفوعات من خلال نظام الضمان لدينا، مما يضمن أمان أموالك حتى اكتمال العمل.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[var(--ink)]">Your dashboard provides powerful tools to track and manage your projects from start to finish.</p>
          <div className="space-y-6">
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">Messaging System</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">Chat with your service provider, send files, and receive instant updates in a secure, central hub.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">Milestone Tracking</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">Break down larger projects into smaller tasks and monitor work progress step-by-step.</p>
            </div>
            <div className="p-5 bg-[var(--paper)] rounded-2xl border border-[var(--border)]">
              <h5 className="font-bold mb-2 text-[var(--teal-dark)] text-lg">Secure Payments</h5>
              <p className="text-sm opacity-80 text-[var(--ink)]">All payments are held in our secure escrow system, ensuring your money is safe until the work is completed correctly.</p>
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
        <div className="space-y-10">
          <div className="flex items-center gap-4 p-6 bg-[rgba(0,201,167,0.05)] rounded-3xl border border-[var(--teal)]/20 animate-pulse">
            <div className="w-3 h-3 bg-[var(--teal)] rounded-full animate-ping" />
            <span className="font-bold text-[var(--teal-dark)] text-lg">{isAr ? 'نحن متصلون الآن لمساعدتك' : 'Active & Online to Help You Now'}</span>
          </div>
          
          <p className="text-xl leading-relaxed text-[var(--ink)] opacity-90 font-medium">{isAr ? 'مرحباً بك في مركز مساعدة خدمة. نحن هنا لضمان حصولك على أفضل تجربة ممكنة وأكثرها سلاسة.' : 'Welcome to the Khedma Help Center. We\'re here to ensure you have the best possible experience.'}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              onClick={() => setSelectedHelp('started')}
              className="bg-[var(--kd-white)] p-10 rounded-[40px] border border-[var(--border)] transition-all duration-500 hover:bg-[var(--kd-white)] hover:shadow-2xl hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--teal)] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              <div className="mb-8 overflow-hidden rounded-3xl aspect-video relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Support" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <h4 className="font-bold mb-4 text-3xl text-[var(--teal-dark)] flex items-center gap-3">
                {isAr ? 'كيفية البدء' : 'Getting Started'} <Zap className="w-6 h-6 text-yellow-500 animate-bounce" />
              </h4>
              <p className="text-lg opacity-80 leading-relaxed text-[var(--ink)]">{isAr ? 'تعلم كيفية التسجيل والبحث عن مقدمي الخدمات الموثوقين في منطقتك بكل سهولة ويسر.' : 'Learn how to register and find trusted service providers in your area in just a few clicks.'}</p>
              <div className="mt-6 flex items-center gap-2 text-[var(--teal)] font-bold text-sm">
                <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div 
              onClick={() => setSelectedHelp('orders')}
              className="bg-[var(--kd-white)] p-10 rounded-[40px] border border-[var(--border)] transition-all duration-500 hover:bg-[var(--kd-white)] hover:shadow-2xl hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--teal)] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              <div className="mb-8 overflow-hidden rounded-3xl aspect-video relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Orders" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <h4 className="font-bold mb-4 text-3xl text-[var(--teal-dark)] flex items-center gap-3">
                {isAr ? 'إدارة الطلبات' : 'Managing Orders'} <ArrowRight className="w-6 h-6 text-[var(--teal)] transition-transform group-hover:translate-x-3" />
              </h4>
              <p className="text-lg opacity-80 leading-relaxed text-[var(--ink)]">{isAr ? 'تتبع مشاريعك الحالية، وتواصل مع المحترفين، وقم بإدارة مدفوعاتك في مكان واحد.' : 'Track your current projects, communicate with professionals, and manage your payments all in one place.'}</p>
              <div className="mt-6 flex items-center gap-2 text-[var(--teal)] font-bold text-sm">
                <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-16 border-t-[3px] border-dotted border-[var(--border)]">
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
    <div className="relative overflow-hidden min-h-screen mesh-bg">
      {/* Side Panel Implementation */}
      {selectedHelp && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
            onClick={() => setSelectedHelp(null)}
          />
          {/* Panel */}
          <div 
            className="relative w-full max-w-[500px] h-full bg-white dark:bg-[#0e0e11] shadow-2xl flex flex-col transform transition-transform duration-500 ease-out animate-slide-in-right p-0 rounded-l-[40px] md:rounded-l-[60px] border-l border-slate-200 dark:border-white/10"
          >
            <div className="p-8 md:p-12 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5 rounded-tl-[60px]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--teal)] rounded-2xl text-slate-900">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">{helpDetails[selectedHelp].title}</h2>
              </div>
              <button 
                onClick={() => setSelectedHelp(null)}
                className="p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-20 scrollbar-hide">
               {helpDetails[selectedHelp].content}
            </div>
          </div>
        </div>
      )}

      {/* Background Atmosphere - Simplified */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-[var(--teal)] opacity-[0.02] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500 opacity-[0.01] rounded-full blur-[150px] animate-pulse" />
      </div>

      <main className="max-w-[1200px] mx-auto px-10 py-24 relative z-10">
        {/* Header Hero Section */}
        <div className="text-center mb-24 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/40 dark:bg-white/5 rounded-full shadow-sm border border-slate-200 dark:border-white/10 mb-12 backdrop-blur-md">
             <div className="w-2 h-2 bg-[var(--teal)] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{isAr ? 'الدعم نشط الآن' : 'Support Systems Online'}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-dm mb-12 text-slate-900 dark:text-slate-100 tracking-tighter leading-tight">
            {isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
          </h1>
          
          <p className="text-lg md:text-xl mx-auto max-w-2xl text-slate-500 font-medium leading-relaxed mb-16">
            {isAr 
              ? 'بوابتك الشاملة لجميع الإجابات والسياسات القانونية الخاصة بمنصة خدمة، مع دعم فني متكامل.'
              : 'Your comprehensive gateway for all answers and legal policies on the Khedma platform, backed by active experts.'}
          </p>

          <div className="flex flex-wrap justify-center gap-10 opacity-30 text-slate-400">
             <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest"><Globe className="w-4 h-4" /> 24/7 Global Access</div>
             <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest"><Clock className="w-4 h-4" /> Instant Response</div>
             <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4" /> Verified Policies</div>
          </div>
        </div>

        {/* Dynamic Section Navigation - Glassy */}
        <div className="flex justify-center flex-wrap gap-4 mb-20 animate-fade-in">
           {['help', 'safety', 'terms', 'privacy'].map(id => (
              <button 
                key={id} 
                onClick={() => {
                  const el = document.getElementById(id);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setActiveTab(id);
                }}
                className={clsx(
                  "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border",
                  activeTab === id 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 shadow-xl scale-105" 
                    : "bg-white/40 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 backdrop-blur-md hover:bg-white/60"
                )}
              >
                {id}
              </button>
           ))}
        </div>

        <div className="space-y-24">
          {sections.map((sec, i) => (sec && (
            <section 
              key={sec.id} 
              id={sec.id} 
              className="animate-fade-up bg-white/40 dark:bg-white/5 p-12 md:p-20 rounded-[60px] border border-slate-200 dark:border-white/10 backdrop-blur-3xl shadow-sm transition-all duration-700 relative group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 relative z-10">
                <div className="flex items-center gap-10">
                  <div className="w-20 h-20 bg-[var(--teal)]/10 text-[var(--teal)] rounded-[32px] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                    {React.cloneElement(sec.icon, { className: 'w-8 h-8' })}
                  </div>
                  <div>
                    <span className="text-[var(--teal)] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">{sec.tagline}</span>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 tracking-tighter leading-none">{sec.title}</h2>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                {sec.content}
              </div>
            </section>
          )))}
        </div>
      </main>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
          }
        }
      `}</style>
    </div>
  );
}
