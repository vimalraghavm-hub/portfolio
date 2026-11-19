import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  FolderGit2, 
  Cpu, 
  FileText, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  Terminal,
  Briefcase
} from 'lucide-react';
import { socialsData } from '../data/socials';

export function Dock({ onOpenWindow, openWindows, onHomeClick, playClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dockItems = [
    { id: 'home', label: 'Home Desktop', icon: Home, action: onHomeClick, isApp: false },
    { id: 'about', label: 'About Me', icon: User, action: () => onOpenWindow('about'), isApp: true },
    { id: 'projects', label: 'Projects', icon: FolderGit2, action: () => onOpenWindow('projects'), isApp: true },
    { id: 'skills', label: 'Skills', icon: Cpu, action: () => onOpenWindow('skills'), isApp: true },
    { id: 'experience', label: 'Experience', icon: Briefcase, action: () => onOpenWindow('experience'), isApp: true },
    { id: 'resume', label: 'Resume', icon: FileText, action: () => onOpenWindow('resume'), isApp: true },
    { id: 'contact', label: 'Contact', icon: Mail, action: () => onOpenWindow('contact'), isApp: true },
    { id: 'terminal', label: 'Terminal', icon: Terminal, action: () => onOpenWindow('terminal'), isApp: true },
    { id: 'divider', type: 'divider' },
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: Github, 
      action: () => window.open(socialsData.github.url, '_blank'),
      isExternal: true 
    },
    { 
      id: 'linkedin', 
      label: 'LinkedIn', 
      icon: Linkedin, 
      action: () => window.open(socialsData.linkedin.url, '_blank'),
      isExternal: true 
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      icon: Instagram, 
      action: () => window.open(socialsData.instagram.url, '_blank'),
      isExternal: true 
    },
    { 
      id: 'email', 
      label: 'Email', 
      icon: Mail, 
      action: () => window.open(socialsData.email.url, '_self'),
      isExternal: true 
    },
  ];

  const getTransformProps = (index) => {
    if (hoveredIndex === null) return { scale: 1, y: 0 };
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return { scale: 1.16, y: -8 };
    if (distance === 1) return { scale: 1.08, y: -4 };
    return { scale: 1, y: 0 };
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[900] select-none max-w-[95vw]">
      <div 
        onMouseLeave={() => setHoveredIndex(null)}
        className="h-[76px] flex items-center space-x-2.5 px-4 rounded-[26px] mac-dock-glass border shadow-2xl transition-all duration-300"
      >
        {dockItems.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div 
                key={`divider-${index}`} 
                className="w-[1px] h-9 bg-slate-400/30 dark:bg-white/20 mx-1 self-center"
              />
            );
          }

          const IconComp = item.icon;
          const { scale, y } = getTransformProps(index);
          const isOpen = item.isApp && openWindows[item.id]?.isOpen && !openWindows[item.id]?.isMinimized;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center justify-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => {
                if (playClick) playClick();
                item.action();
              }}
            >
              {/* Tooltip with upward motion */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 pointer-events-none px-2.5 py-1 text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap z-50 bg-slate-900/90 dark:bg-slate-900/95 text-slate-100 border border-white/20">
                {item.label}
              </div>

              {/* Icon Container - Uniform Size (48x48px) */}
              <motion.div
                animate={{ scale, y }}
                transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-200 border ${
                  item.id === 'home'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400/30 shadow-md'
                    : item.isExternal
                    ? 'bg-slate-800/10 dark:bg-slate-800/80 hover:bg-blue-500/20 text-blue-600 dark:text-sky-400 border-slate-300/60 dark:border-white/15'
                    : 'bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 text-slate-800 dark:text-white border-slate-300/60 dark:border-white/15'
                }`}
              >
                <IconComp className="w-5.5 h-5.5 drop-shadow-sm" />
              </motion.div>

              {/* Active App Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-0.5">
                {item.isApp && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isOpen 
                        ? 'bg-blue-600 dark:bg-white shadow-[0_0_6px_rgba(59,130,246,0.8)]' 
                        : 'bg-transparent'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
