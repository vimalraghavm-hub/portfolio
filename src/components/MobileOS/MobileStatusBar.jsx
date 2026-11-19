import React from 'react';
import { Wifi, Battery, Sliders, Search } from 'lucide-react';
import { useClock } from '../../hooks/useClock';

export function MobileStatusBar({ onToggleControlCenter, onToggleSearch }) {
  const { timeString } = useClock();

  return (
    <div 
      onClick={onToggleControlCenter}
      className="h-10 px-5 pt-1.5 bg-slate-900/40 dark:bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs font-semibold select-none text-slate-100 shrink-0 z-40 cursor-pointer"
    >
      {/* Time (iOS 9:41 style) */}
      <div className="font-bold tracking-tight text-sm">
        {timeString.replace(/:\d+\s/, ' ')}
      </div>

      {/* Dynamic notch area / quick icons */}
      <div className="flex items-center space-x-3 text-slate-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSearch();
          }}
          className="p-1 rounded-full hover:bg-white/15"
          title="Search"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleControlCenter();
          }}
          className="p-1 rounded-full hover:bg-white/15"
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center space-x-1.5 text-[11px] font-mono">
          <Wifi className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px]">5G</span>
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
