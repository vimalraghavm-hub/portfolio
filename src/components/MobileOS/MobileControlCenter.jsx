import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Bluetooth, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Sliders, 
  X,
  Palette
} from 'lucide-react';

export function MobileControlCenter({
  isOpen,
  onClose,
  theme,
  setTheme,
  brightness,
  setBrightness,
  volume,
  setVolume
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-start pt-2 px-4 select-none"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto p-5 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl text-slate-100 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center space-x-2 font-bold text-sm text-white">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>iOS Control Center</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Selector */}
          <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-xs font-semibold mb-2 flex items-center justify-between text-slate-200">
              <span className="flex items-center space-x-1.5">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Visual Theme</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Bright Mode</span>
              </button>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full text-white">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Wi-Fi</div>
                <div className="text-[10px] text-blue-300">VimalNet 5G</div>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full text-white">
                <Bluetooth className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Bluetooth</div>
                <div className="text-[10px] text-slate-400">On</div>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 mb-4">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Display Brightness</span>
                </span>
                <span className="font-mono text-xs text-blue-300">{brightness}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center space-x-1.5">
                  {volume > 0 ? (
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>Audio Volume</span>
                </span>
                <span className="font-mono text-xs text-emerald-300">{volume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Swipe indicator */}
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-2" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
