import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Bluetooth, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Sliders, 
  Check,
  Music,
  Palette
} from 'lucide-react';
import { defaultWallpaperConfig } from '../data/wallpaperConfig';

export function ControlCenter({
  isOpen,
  onClose,
  wallpaperConfig,
  setWallpaperConfig,
  theme,
  setTheme,
  brightness,
  setBrightness,
  volume,
  setVolume
}) {
  const popupRef = useRef(null);

  // Close when clicking outside Control Center
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-10 right-3 w-80 p-4 z-50 rounded-2xl mac-window-surface shadow-2xl text-slate-900 dark:text-slate-100 font-sans select-none backdrop-blur-3xl"
      >
        <div className="flex items-center justify-between mb-3 border-b border-slate-300/40 dark:border-white/10 pb-2">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Control Center</span>
          </div>
          <button 
            onClick={onClose}
            className="text-xs opacity-70 hover:opacity-100 px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
          >
            Done
          </button>
        </div>

        {/* Visual Appearance Theme Switcher */}
        <div className="mb-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10">
          <div className="text-xs font-semibold mb-2 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Visual Appearance Theme</span>
            </span>
            <span className="text-[10px] font-mono opacity-60">2 Themes</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-slate-300/40 dark:border-white/10'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark macOS</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                theme === 'light'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-slate-300/40 dark:border-white/10'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Neumorphic</span>
            </button>
          </div>
        </div>

        {/* Network & Bluetooth Status Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-full text-white">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold">Wi-Fi</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-300">VimalNet 5G</div>
            </div>
          </div>

          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-full text-white">
              <Bluetooth className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold">Bluetooth</div>
              <div className="text-[10px] opacity-60">On</div>
            </div>
          </div>
        </div>

        {/* Real Display Brightness Slider */}
        <div className="space-y-2.5 mb-3">
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center space-x-1.5">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Display Brightness</span>
              </span>
              <span className="font-mono text-[11px] opacity-70">{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-300 dark:bg-white/20 rounded-lg cursor-pointer"
            />
          </div>

          {/* Real Audio Volume Slider */}
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center space-x-1.5">
                {volume > 0 ? (
                  <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span>Sound Volume</span>
              </span>
              <span className="font-mono text-[11px] opacity-70">{volume}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-300 dark:bg-white/20 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Desktop Wallpaper Presets */}
        <div className="mb-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-300/40 dark:border-white/10">
          <div className="text-xs font-semibold mb-2 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Monitor className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Desktop Wallpaper</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {defaultWallpaperConfig.presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setWallpaperConfig({ ...wallpaperConfig, activePreset: preset.id })}
                className={`text-left p-2 rounded-lg text-xs font-medium transition-all border flex items-center justify-between ${
                  wallpaperConfig.activePreset === preset.id
                    ? 'bg-blue-600/30 border-blue-500 text-blue-600 dark:text-white font-bold'
                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-slate-300/40 dark:border-white/10 opacity-80'
                }`}
              >
                <span className="truncate text-[11px]">{preset.name}</span>
                {wallpaperConfig.activePreset === preset.id && (
                  <Check className="w-3 h-3 text-blue-600 dark:text-blue-300 shrink-0 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Media Footer */}
        <div className="p-3 bg-blue-500/10 dark:bg-indigo-900/40 rounded-xl border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-600 dark:text-indigo-300">
              <Music className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-semibold">Vimal Raghav Portfolio</div>
              <div className="text-[10px] text-blue-600 dark:text-indigo-300">Computer Science & Full Stack</div>
            </div>
          </div>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
            ONLINE
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
