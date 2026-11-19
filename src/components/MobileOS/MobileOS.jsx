import React, { useState, useRef } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileAppHeader } from './MobileAppHeader';
import { MobileDock } from './MobileDock';
import { MobileControlCenter } from './MobileControlCenter';
import { SpotlightSearch } from '../SpotlightSearch';
import { Wallpaper } from '../Wallpaper';

import { AboutWindow } from '../../windows/AboutWindow';
import { ProjectsWindow } from '../../windows/ProjectsWindow';
import { SkillsWindow } from '../../windows/SkillsWindow';
import { ExperienceWindow } from '../../windows/ExperienceWindow';
import { EducationWindow } from '../../windows/EducationWindow';
import { CertificationsWindow } from '../../windows/CertificationsWindow';
import { ResumeWindow } from '../../windows/ResumeWindow';
import { ContactWindow } from '../../windows/ContactWindow';
import { TerminalWindow } from '../../windows/TerminalWindow';

export function MobileOS({
  theme,
  setTheme,
  brightness,
  setBrightness,
  volume,
  setVolume,
  soundEnabled,
  setSoundEnabled,
  wallpaperConfig,
  playClick,
  playOpenWindow
}) {
  const [activeApp, setActiveApp] = useState(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const touchStartRef = useRef({ y: 0, x: 0 });

  const appMap = {
    about: { title: 'About Me', component: AboutWindow },
    projects: { title: 'Projects', component: ProjectsWindow },
    skills: { title: 'Skills & Tech', component: SkillsWindow },
    experience: { title: 'Experience', component: ExperienceWindow },
    education: { title: 'Education', component: EducationWindow },
    certifications: { title: 'Certifications', component: CertificationsWindow },
    resume: { title: 'Vimal Raghav — Resume.pdf', component: ResumeWindow },
    contact: { title: 'Contact Me', component: ContactWindow },
    terminal: { title: 'Terminal', component: TerminalWindow },
  };

  const handleOpenApp = (id) => {
    if (playOpenWindow) playOpenWindow();
    setActiveApp(id);
  };

  const handleGoHome = () => {
    if (playClick) playClick();
    setActiveApp(null);
  };

  // Swipe down gesture detection from top 80px area to trigger Control Center
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      y: e.touches[0].clientY,
      x: e.touches[0].clientX
    };
  };

  const handleTouchEnd = (e) => {
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;

    // Swipe down from top region (y < 100)
    if (touchStartRef.current.y < 100 && dy > 60 && Math.abs(dx) < 80) {
      setIsControlCenterOpen(true);
    }
  };

  const ActiveComponent = activeApp && appMap[activeApp]?.component;

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-full h-full bg-[var(--desktop-bg)] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none overflow-hidden theme-transition"
    >
      {/* Animated Wallpaper */}
      <Wallpaper config={wallpaperConfig} theme={theme} />

      {/* iOS Status Bar */}
      <MobileStatusBar
        onToggleControlCenter={() => setIsControlCenterOpen(true)}
        onToggleSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 relative overflow-hidden flex flex-col z-10">
        {activeApp && ActiveComponent ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-100/90 dark:bg-slate-950/90 backdrop-blur-xl">
            <MobileAppHeader
              title={appMap[activeApp].title}
              onBack={handleGoHome}
              onToggleControlCenter={() => setIsControlCenterOpen(true)}
            />
            <div className="flex-1 overflow-y-auto overscroll-contain pb-24">
              <ActiveComponent onOpenWindow={handleOpenApp} />
            </div>
          </div>
        ) : (
          <MobileHomeScreen onOpenApp={handleOpenApp} />
        )}
      </div>

      {/* iOS Bottom Navigation Dock */}
      <MobileDock
        activeApp={activeApp}
        onOpenApp={handleOpenApp}
        onGoHome={handleGoHome}
      />

      {/* iOS Control Center Panel */}
      <MobileControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        theme={theme}
        setTheme={setTheme}
        brightness={brightness}
        setBrightness={setBrightness}
        volume={volume}
        setVolume={setVolume}
      />

      {/* Mobile Search Panel */}
      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenWindow={handleOpenApp}
      />
    </div>
  );
}
