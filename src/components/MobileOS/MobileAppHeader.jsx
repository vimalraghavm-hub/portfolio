import React from 'react';
import { ArrowLeft, Sparkles, Sliders } from 'lucide-react';

export function MobileAppHeader({ title, onBack, onToggleControlCenter }) {
  return (
    <div className="h-12 px-4 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-300/60 dark:border-white/10 flex items-center justify-between text-slate-900 dark:text-slate-100 font-sans shrink-0 sticky top-0 z-30 select-none">
      <button
        onClick={onBack}
        className="flex items-center space-x-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 active:opacity-60 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
        {title}
      </div>

      <button
        onClick={onToggleControlCenter}
        className="p-1 rounded-full text-slate-600 dark:text-slate-300 active:opacity-60"
        title="Control Center"
      >
        <Sliders className="w-4 h-4" />
      </button>
    </div>
  );
}
