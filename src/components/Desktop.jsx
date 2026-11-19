import React, { useState } from 'react';
import { Wallpaper } from './Wallpaper';
import { MenuBar } from './MenuBar';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { Dock } from './Dock';
import { ControlCenter } from './ControlCenter';
import { SpotlightSearch } from './SpotlightSearch';
import { MobileOS } from './MobileOS/MobileOS';

import { useWindowManager } from '../hooks/useWindowManager';
import { useSound } from '../hooks/useSound';
import { useTheme } from '../hooks/useTheme';
import { useBrightness } from '../hooks/useBrightness';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

import { defaultWallpaperConfig } from '../data/wallpaperConfig';
import { socialsData } from '../data/socials';

import { AboutWindow } from '../windows/AboutWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { EducationWindow } from '../windows/EducationWindow';
import { CertificationsWindow } from '../windows/CertificationsWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { TerminalWindow } from '../windows/TerminalWindow';

export function Desktop() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    bringToFront,
    closeAll
  } = useWindowManager();

  const { theme, setTheme, toggleTheme } = useTheme();
  const { brightness, setBrightness } = useBrightness();
  const { volume, setVolume, soundEnabled, setSoundEnabled, playClick, playOpenWindow } = useSound();

  const [selectedIconId, setSelectedIconId] = useState(null);
  const [wallpaperConfig, setWallpaperConfig] = useState(defaultWallpaperConfig);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard Shortcut System
  useKeyboardShortcuts({
    onToggleSearch: () => setIsSearchOpen((prev) => !prev),
    onCloseActive: () => {
      if (isSearchOpen) setIsSearchOpen(false);
      else if (isControlCenterOpen) setIsControlCenterOpen(false);
      else if (activeWindowId) closeWindow(activeWindowId);
    },
    onOpenWindow: (id) => openWindow(id),
    onHomeClick: () => {
      setSelectedIconId(null);
      closeAll();
    }
  });

  const desktopIcons = [
    { id: 'about', title: 'About Me', type: 'folder', iconKey: 'about' },
    { id: 'projects', title: 'Projects', type: 'folder', iconKey: 'projects', badge: 'New' },
    { id: 'skills', title: 'Skills', type: 'folder', iconKey: 'skills' },
    { id: 'experience', title: 'Experience', type: 'folder', iconKey: 'experience' },
    { id: 'education', title: 'Education', type: 'folder', iconKey: 'education' },
    { id: 'certifications', title: 'Certifications', type: 'folder', iconKey: 'certifications' },
    { id: 'resume', title: 'Resume.pdf', type: 'file', iconKey: 'resume' },
    { id: 'contact', title: 'Contact Me', type: 'file', iconKey: 'contact' },
    { id: 'github', title: 'GitHub', type: 'social', iconKey: 'github' },
    { id: 'linkedin', title: 'LinkedIn', type: 'social', iconKey: 'linkedin' },
    { id: 'instagram', title: 'Instagram', type: 'social', iconKey: 'instagram' },
    { id: 'terminal', title: 'Terminal', type: 'folder', iconKey: 'terminal' },
  ];

  const handleIconOpen = (id) => {
    playOpenWindow();
    if (id === 'github') {
      window.open(socialsData.github.url, '_blank');
    } else if (id === 'linkedin') {
      window.open(socialsData.linkedin.url, '_blank');
    } else if (id === 'instagram') {
      window.open(socialsData.instagram.url, '_blank');
    } else {
      openWindow(id);
    }
  };

  const handleWallpaperClick = () => {
    setSelectedIconId(null);
    setIsControlCenterOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[var(--desktop-bg)] theme-transition">
      {/* =================================================== */}
      {/* 1. DESKTOP & TABLET EXPERIENCE (>= 768px)           */}
      {/* =================================================== */}
      <div className="hidden md:block w-full h-full relative">
        {/* Animated Wallpaper */}
        <Wallpaper config={wallpaperConfig} theme={theme} />

        {/* Top System Menu Bar */}
        <MenuBar
          onOpenWindow={openWindow}
          onToggleControlCenter={() => setIsControlCenterOpen(!isControlCenterOpen)}
          onToggleSpotlight={() => setIsSearchOpen(true)}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Desktop Shortcuts Canvas */}
        <main
          onClick={handleWallpaperClick}
          className="absolute top-8 left-0 right-0 bottom-16 p-6 grid grid-flow-col grid-rows-6 gap-x-4 gap-y-2 auto-cols-max z-10"
        >
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              title={icon.title}
              type={icon.type}
              iconKey={icon.iconKey}
              badge={icon.badge}
              isSelected={selectedIconId === icon.id}
              onSelect={(id) => {
                playClick();
                setSelectedIconId(id);
              }}
              onOpen={handleIconOpen}
            />
          ))}
        </main>

        {/* Floating Application Windows Layer */}
        <div>
          <Window
            {...windows.about}
            isActive={activeWindowId === 'about'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <AboutWindow onOpenWindow={openWindow} />
          </Window>

          <Window
            {...windows.projects}
            isActive={activeWindowId === 'projects'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <ProjectsWindow initialData={windows.projects.data} />
          </Window>

          <Window
            {...windows.skills}
            isActive={activeWindowId === 'skills'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <SkillsWindow />
          </Window>

          <Window
            {...windows.experience}
            isActive={activeWindowId === 'experience'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <ExperienceWindow />
          </Window>

          <Window
            {...windows.education}
            isActive={activeWindowId === 'education'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <EducationWindow />
          </Window>

          <Window
            {...windows.certifications}
            isActive={activeWindowId === 'certifications'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <CertificationsWindow />
          </Window>

          <Window
            {...windows.resume}
            isActive={activeWindowId === 'resume'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <ResumeWindow />
          </Window>

          <Window
            {...windows.contact}
            isActive={activeWindowId === 'contact'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <ContactWindow />
          </Window>

          <Window
            {...windows.terminal}
            isActive={activeWindowId === 'terminal'}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onFocus={bringToFront}
          >
            <TerminalWindow onOpenWindow={openWindow} />
          </Window>
        </div>

        {/* macOS Bottom Dock */}
        <Dock
          onOpenWindow={openWindow}
          openWindows={windows}
          onHomeClick={() => {
            setSelectedIconId(null);
            closeAll();
          }}
          playClick={playClick}
          theme={theme}
        />

        {/* Control Center Popup */}
        <ControlCenter
          isOpen={isControlCenterOpen}
          onClose={() => setIsControlCenterOpen(false)}
          wallpaperConfig={wallpaperConfig}
          setWallpaperConfig={setWallpaperConfig}
          theme={theme}
          setTheme={setTheme}
          toggleTheme={toggleTheme}
          brightness={brightness}
          setBrightness={setBrightness}
          volume={volume}
          setVolume={setVolume}
        />

        {/* Spotlight Search Popup */}
        <SpotlightSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onOpenWindow={openWindow}
        />
      </div>

      {/* =================================================== */}
      {/* 2. iOS 18-INSPIRED MOBILE OS EXPERIENCE (< 768px)  */}
      {/* =================================================== */}
      <div className="block md:hidden w-full h-full">
        <MobileOS
          theme={theme}
          setTheme={setTheme}
          brightness={brightness}
          setBrightness={setBrightness}
          volume={volume}
          setVolume={setVolume}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          wallpaperConfig={wallpaperConfig}
          playClick={playClick}
          playOpenWindow={playOpenWindow}
        />
      </div>
    </div>
  );
}
