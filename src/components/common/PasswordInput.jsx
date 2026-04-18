import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import clsx from 'clsx';

/**
 * Modern, RTL-aware Password Input Component
 * Handles position of eye icon and text alignment dynamically.
 */
export default function PasswordInput({ 
  value, 
  onChange, 
  name = "password", 
  placeholder = "••••••••", 
  label,
  required = false,
  className = "",
  error = ""
}) {
  const [show, setShow] = useState(false);
  const { isAr } = useLang();

  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1 block">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <input
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          dir={isAr ? 'rtl' : 'ltr'}
          className={clsx(
            "w-full bg-white/50 dark:bg-white/5 border rounded-2xl py-4 text-sm font-bold text-slate-700 dark:text-white outline-none transition-all duration-300",
            "focus:ring-4 focus:ring-[var(--teal)]/10 focus:border-[var(--teal)]",
            "placeholder:text-slate-300 dark:placeholder:text-slate-600",
            // Dynamic padding to avoid overlapping the icon
            isAr ? "pl-14 pr-5 text-right" : "pr-14 pl-5 text-left",
            // Error state
            error 
              ? "border-rose-500/50 ring-rose-500/10 focus:border-rose-500 focus:ring-rose-500/20" 
              : "border-slate-200 dark:border-white/10"
          )}
        />
        
        <button
          type="button"
          onClick={() => setShow(!show)}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-slate-400 active:scale-95 transition-all duration-300 group-hover:text-slate-500 dark:group-hover:text-slate-300",
            "hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[var(--teal)] dark:hover:text-[var(--teal)]",
            // Dynamic position
            isAr ? "left-2" : "right-2"
          )}
          tabIndex="-1"
          title={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff className="w-5 h-5 transition-all animate-in fade-in zoom-in duration-300" />
          ) : (
            <Eye className="w-5 h-5 transition-all animate-in fade-in zoom-in duration-300" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-[10px] font-bold text-rose-500 mt-1 pl-1 animate-in slide-in-from-top-1 px-1">
          {error}
        </p>
      )}
    </div>
  );
}
