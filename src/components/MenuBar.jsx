import React, { useState } from 'react';
import { 
  Wifi, 
  Volume2, 
  VolumeX, 
  Battery, 
  Search, 
  Sliders, 
  Command, 
  RefreshCw, 
  Sparkles,
  Info,
  Folder,
  Layers,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { useClock } from '../hooks/useClock';

export function MenuBar({ 
  onOpenWindow, 
  onToggleControlCenter, 
  onToggleSpotlight,
  soundEnabled,
  setSoundEnabled,
  theme,
  toggleTheme
}) {
  const { timeString, dateString, dayOfWeek } = useClock();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { 
      label: 'Portfolio', 
      isBold: true,
      items: [
        { label: 'About This Portfolio', action: () => onOpenWindow('about'), icon: Info },
        { label: 'Control Center...', action: onToggleControlCenter, icon: Sliders },
        { type: 'separator' },
        { label: 'System Quick Terminal', action: () => onOpenWindow('terminal'), icon: Command },
        { type: 'separator' },
        { label: 'Reload Desktop', action: () => window.location.reload(), icon: RefreshCw }
      ]
    },
    { 
      label: 'File', 
      items: [
        { label: 'Open Projects Finder', action: () => onOpenWindow('projects'), icon: Folder },
        { label: 'Open Resume.pdf', action: () => onOpenWindow('resume'), icon: Layers },
        { label: 'Contact Vimal', action: () => onOpenWindow('contact') }
      ]
    },
    { 
      label: 'View', 
      items: [
        { label: 'View Skills', action: () => onOpenWindow('skills') },
        { label: 'View Experience', action: () => onOpenWindow('experience') },
        { label: 'View Education', action: () => onOpenWindow('education') },
        { label: 'View Certifications', action: () => onOpenWindow('certifications') }
      ]
    },
    { 
      label: 'Go', 
      items: [
        { label: 'Go to About Me', action: () => onOpenWindow('about') },
        { label: 'Go to Projects', action: () => onOpenWindow('projects') },
        { label: 'Go to Terminal', action: () => onOpenWindow('terminal') }
      ]
    },
    { 
      label: 'Window', 
      items: [
        { label: 'Spotlight Search (Cmd+K)', action: onToggleSpotlight }
      ]
    },
    { 
      label: 'Help', 
      items: [
        { label: 'Portfolio Guide', action: () => onOpenWindow('about'), icon: HelpCircle }
      ]
    }
  ];

  const handleMenuClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 h-8 z-50 flex items-center justify-between px-3 text-xs font-medium mac-menu-glass select-none text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Left Menu Section */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Apple / Logo Icon */}
        <button 
          onClick={() => handleMenuClick('logo')} 
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors relative flex items-center justify-center"
          title="Portfolio System Menu"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current text-blue-500 dark:text-blue-400" />
          
          {activeDropdown === 'logo' && (
            <div 
              className="absolute top-8 left-0 w-52 py-1.5 rounded-xl border shadow-2xl z-50 text-slate-900 dark:text-slate-100 bg-white/95 dark:bg-slate-900/95 border-slate-300/80 dark:border-white/15 backdrop-blur-2xl"
              onMouseLeave={closeDropdown}
            >
              <div className="px-3 py-1.5 font-bold border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span>VimalOS Portfolio</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono">v2.4</span>
              </div>
              <button 
                onClick={() => { onOpenWindow('about'); closeDropdown(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center space-x-2 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>About Vimal Raghav</span>
              </button>
              <button 
                onClick={() => { onToggleControlCenter(); closeDropdown(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center space-x-2 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Control Center</span>
              </button>
              <div className="my-1 border-t border-slate-200 dark:border-white/10" />
              <button 
                onClick={() => window.location.reload()}
                className="w-full text-left px-3 py-1.5 hover:bg-red-600 hover:text-white flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart Desktop</span>
              </button>
            </div>
          )}
        </button>

        {/* Dropdown Menus */}
        {menuItems.map((menu, idx) => (
          <div key={menu.label} className="relative">
            <button
              onClick={() => handleMenuClick(idx)}
              onMouseEnter={() => activeDropdown !== null && setActiveDropdown(idx)}
              className={`px-2 py-0.5 rounded transition-colors ${
                menu.isBold ? 'font-bold' : 'font-normal'
              } hover:bg-black/10 dark:hover:bg-white/15 ${activeDropdown === idx ? 'bg-black/15 dark:bg-white/20' : ''}`}
            >
              {menu.label}
            </button>

            {activeDropdown === idx && (
              <div 
                className="absolute top-8 left-0 w-48 py-1.5 rounded-xl border shadow-2xl z-50 text-slate-900 dark:text-slate-100 bg-white/95 dark:bg-slate-900/95 border-slate-300/80 dark:border-white/15 backdrop-blur-2xl"
                onMouseLeave={closeDropdown}
              >
                {menu.items.map((item, itemIdx) => {
                  if (item.type === 'separator') {
                    return <div key={itemIdx} className="my-1 border-t border-slate-200 dark:border-white/10" />;
                  }
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center space-x-2 transition-colors"
                    >
                      {ItemIcon && <ItemIcon className="w-3.5 h-3.5 opacity-70" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors text-amber-500 dark:text-amber-400"
          title={`Switch to ${theme === 'dark' ? 'Bright Neumorphic' : 'Dark macOS'} Theme`}
        >
          {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-600" />}
        </button>

        {/* Spotlight Trigger */}
        <button 
          onClick={onToggleSpotlight} 
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors opacity-80 hover:opacity-100"
          title="Spotlight Search (Cmd + K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Sound Toggle */}
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)} 
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
          title={soundEnabled ? "Mute UI Sounds" : "Unmute UI Sounds"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 opacity-50" />
          )}
        </button>

        {/* Wi-Fi Icon */}
        <div className="flex items-center p-1" title="Wi-Fi: Connected to VimalNet 5G">
          <Wifi className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Battery Icon */}
        <div className="hidden sm:flex items-center space-x-1 p-1 text-[11px]" title="Battery: 98% Charged">
          <span className="font-mono text-[10px] opacity-80">98%</span>
          <Battery className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Control Center Toggle */}
        <button 
          onClick={onToggleControlCenter} 
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors opacity-80 hover:opacity-100"
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Dynamic Date & Time */}
        <div className="flex items-center space-x-1.5 px-1 py-0.5 rounded font-medium cursor-default">
          <span className="hidden md:inline opacity-80">{dayOfWeek}</span>
          <span className="opacity-90">{dateString}</span>
          <span className="font-semibold ml-1">{timeString}</span>
        </div>
      </div>
    </header>
  );
}
