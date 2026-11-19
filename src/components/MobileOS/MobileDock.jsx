import React from 'react';
import { Home, User, FolderGit2, FileText, Mail } from 'lucide-react';

export function MobileDock({ activeApp, onOpenApp, onGoHome }) {
  const dockItems = [
    { id: 'home', label: 'Home', icon: Home, action: onGoHome },
    { id: 'about', label: 'About', icon: User, action: () => onOpenApp('about') },
    { id: 'projects', label: 'Projects', icon: FolderGit2, action: () => onOpenApp('projects') },
    { id: 'resume', label: 'Resume', icon: FileText, action: () => onOpenApp('resume') },
    { id: 'contact', label: 'Contact', icon: Mail, action: () => onOpenApp('contact') },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40 select-none max-w-[92vw] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center space-x-3 px-4 py-2.5 rounded-3xl bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl">
        {dockItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeApp === item.id || (!activeApp && item.id === 'home');
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <IconComp className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
