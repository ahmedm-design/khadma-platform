// components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { ArrowUpRight, Facebook, Twitter, Instagram, Linkedin, Send, Mail } from 'lucide-react';
import clsx from 'clsx';

export default function Footer() {
  const { t, lang } = useLang();
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden pt-40 pb-10 mt-32 border-t border-white/5">
       
       {/* Ambient Cinematic Backlight */}
       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--teal)] opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-indigo-500 opacity-[0.02] rounded-full blur-[150px] pointer-events-none" />
       
       {/* Massive Typography Background Watermark */}
       <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.015] select-none flex justify-center overflow-hidden z-0">
          <span className="text-[180px] md:text-[300px] lg:text-[400px] font-black leading-none tracking-tighter whitespace-nowrap" style={{fontFamily: "'Inter', sans-serif"}}>KHEDMA</span>
       </div>

       <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20">
          
          {/* Top Floating CTA Box - Breaking out of the container gracefully */}
          <div className="absolute -top-64 sm:-top-56 left-6 lg:left-12 right-6 lg:right-12 bg-gradient-to-br from-slate-900 to-[#0c0d11] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"/>
              <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[var(--teal)] opacity-20 blur-[120px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-[2s] ease-out"/>
              
              <div className="relative z-10 max-w-2xl text-center lg:text-start lg:rtl:text-right">
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                    {isAr ? 'هل أنت مستعد للارتقاء بخدماتك؟' : 'Ready to elevate your service business?'}
                  </h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    {isAr ? 'انضم إلى آلاف المحترفين الرائدين والعملاء الراضين الذين يبنون مستقبل الخدمات في مصر.' : 'Join thousands of leading professionals and highly satisfied clients building the future of services in Egypt.'}
                  </p>
              </div>
              <div className="relative z-10 flex-shrink-0 w-full lg:w-auto flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/register" className="h-[60px] px-10 bg-[var(--teal)] text-slate-900 font-black rounded-[20px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform uppercase tracking-[0.2em] text-sm shadow-[0_0_40px_rgba(0,201,167,0.3)]">
                     {isAr ? 'ابدأ الآن' : 'Get Started'}
                  </Link>
                  <Link to="/support#help" className="h-[60px] px-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-[20px] flex items-center justify-center transition-all uppercase tracking-[0.2em] text-sm backdrop-blur-md">
                     {isAr ? 'تواصل معنا' : 'Contact Us'}
                  </Link>
              </div>
          </div>

          <div className="pt-32 sm:pt-24 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 border-b border-white/10 pb-20">
             
             {/* Brand & Newsletter Column */}
             <div className="md:col-span-5 flex flex-col rtl:text-right">
                <Link to="/" className="text-white text-5xl mb-6 inline-block no-underline font-black tracking-tighter hover:scale-105 transition-transform origin-left rtl:origin-right w-fit">
                  {isAr ? 'خدمة' : 'khedma'}<span className="text-[var(--teal)]">.</span>
                </Link>
                <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-sm font-medium">
                  {t('common.footer_desc')} Setting the absolute gold standard for verified, high-quality professional services across every single governorate in Egypt.
                </p>

                <div className="mb-10 w-full max-w-md">
                   <div className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                       <Mail className="w-4 h-4 text-[var(--teal)]" /> {t('common.newsletter_title')}
                   </div>
                   <form className="flex bg-[#111216] border border-white/10 rounded-[20px] p-2 focus-within:border-[var(--teal)] focus-within:ring-1 focus-within:ring-[var(--teal)]/50 transition-all shadow-inner group">
                     <input type="email" placeholder={t('common.newsletter_placeholder')} className={clsx("bg-transparent border-none outline-none py-3 px-5 text-sm w-full text-white placeholder-slate-600 font-medium", isAr ? "text-right" : "text-left")} />
                     <button type="button" className="bg-white/5 hover:bg-[var(--teal)] text-white hover:text-slate-900 w-12 h-12 rounded-[14px] flex flex-shrink-0 items-center justify-center transition-all duration-300">
                       <Send className={clsx("w-4 h-4", isAr ? "rotate-180" : "")} />
                     </button>
                   </form>
                </div>
             </div>

             {/* Links Columns */}
             <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 rtl:text-right">
                 
                 {/* Discover */}
                 <div className="flex flex-col space-y-6">
                    <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">{t('common.discover')}</h4>
                    <Link to="/#about-us" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.about_us')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/categories" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.browse_services')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/providers" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.top_providers')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/register" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.become_partner')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                 </div>

                 {/* Support */}
                 <div className="flex flex-col space-y-6">
                    <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">{t('common.resources')}</h4>
                    <Link to="/support#help" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.help_center')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/support#safety" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.trust_safety')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/support#terms" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.service_terms')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                    <Link to="/support#privacy" className="group text-slate-400 hover:text-white font-medium text-sm flex items-center justify-between w-full max-w-[160px] transition-colors">
                       {t('common.privacy_policy')} <ArrowUpRight className={clsx("w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--teal)]", isAr ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                    </Link>
                 </div>

                 {/* Socials / Community */}
                 <div className="flex flex-col space-y-6 col-span-2 lg:col-span-1 mt-4 lg:mt-0">
                    <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Social</h4>
                    <div className="flex flex-wrap gap-4">
                       <a href="#" className="w-[50px] h-[50px] rounded-[16px] bg-white/5 hover:bg-[var(--teal)] hover:text-slate-900 border border-white/5 hover:border-[var(--teal)] flex items-center justify-center transition-all duration-300 text-slate-300 hover:scale-110 shadow-lg group">
                          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </a>
                       <a href="#" className="w-[50px] h-[50px] rounded-[16px] bg-white/5 hover:bg-[var(--teal)] hover:text-slate-900 border border-white/5 hover:border-[var(--teal)] flex items-center justify-center transition-all duration-300 text-slate-300 hover:scale-110 shadow-lg group">
                          <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </a>
                       <a href="#" className="w-[50px] h-[50px] rounded-[16px] bg-white/5 hover:bg-[var(--teal)] hover:text-slate-900 border border-white/5 hover:border-[var(--teal)] flex items-center justify-center transition-all duration-300 text-slate-300 hover:scale-110 shadow-lg group">
                          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </a>
                       <a href="#" className="w-[50px] h-[50px] rounded-[16px] bg-white/5 hover:bg-[var(--teal)] hover:text-slate-900 border border-white/5 hover:border-[var(--teal)] flex items-center justify-center transition-all duration-300 text-slate-300 hover:scale-110 shadow-lg group">
                          <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </a>
                    </div>
                 </div>

             </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-center md:text-start">
               © {year} Khedma Egypt. {t('common.crafted_egypt')}
             </div>
             
             <div className="flex items-center gap-3 bg-white/[0.02] rounded-full p-1.5 border border-white/5 pl-4 px-2 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">All systems operational</span>
             </div>
          </div>
       </div>
    </footer>
  );
}
