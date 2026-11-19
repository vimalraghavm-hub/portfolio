import { useState, useCallback, useEffect } from 'react';

const INITIAL_WINDOWS = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 820,
    height: 560,
    x: 120,
    y: 80
  },
  projects: {
    id: 'projects',
    title: 'Finder - Projects',
    icon: 'FolderGit2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 900,
    height: 600,
    x: 180,
    y: 90
  },
  skills: {
    id: 'skills',
    title: 'Skills & Tech Stack',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 840,
    height: 580,
    x: 150,
    y: 100
  },
  experience: {
    id: 'experience',
    title: 'Work & Leadership Experience',
    icon: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 800,
    height: 540,
    x: 200,
    y: 110
  },
  education: {
    id: 'education',
    title: 'Education',
    icon: 'GraduationCap',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 780,
    height: 520,
    x: 220,
    y: 120
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    icon: 'Award',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 760,
    height: 500,
    x: 240,
    y: 130
  },
  resume: {
    id: 'resume',
    title: 'Resume.pdf',
    icon: 'FileText',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 850,
    height: 640,
    x: 160,
    y: 70
  },
  contact: {
    id: 'contact',
    title: 'Contact Vimal',
    icon: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 720,
    height: 540,
    x: 260,
    y: 100
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal - vimal@macbook',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    width: 750,
    height: 480,
    x: 210,
    y: 120
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const bringToFront = useCallback((id) => {
    setHighestZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prevWindows) => {
        if (!prevWindows[id]) return prevWindows;
        return {
          ...prevWindows,
          [id]: {
            ...prevWindows[id],
            zIndex: nextZ,
            isMinimized: false
          }
        };
      });
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback((id, initialData = null) => {
    setHighestZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prevWindows) => {
        const target = prevWindows[id];
        if (!target) return prevWindows;

        // Smart cascade positioning if window is newly opened
        const isNewOpen = !target.isOpen;
        let newX = target.x;
        let newY = target.y;

        if (isNewOpen && typeof window !== 'undefined') {
          // Keep inside screen bounds
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          newX = Math.max(40, Math.min(target.x, screenW - target.width - 40));
          newY = Math.max(50, Math.min(target.y, screenH - target.height - 80));
        }

        return {
          ...prevWindows,
          [id]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            x: newX,
            y: newY,
            data: initialData || target.data
          }
        };
      });
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false
        }
      };
    });
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true
        }
      };
    });
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  const toggleMaximizeWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: !prev[id].isMaximized
        }
      };
    });
    bringToFront(id);
  }, [bringToFront]);

  const closeAll = useCallback(() => {
    setWindows((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = { ...updated[key], isOpen: false, isMinimized: false };
      });
      return updated;
    });
    setActiveWindowId(null);
  }, []);

  // Keyboard shortcut listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeWindowId) {
        closeWindow(activeWindowId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, closeWindow]);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    bringToFront,
    closeAll
  };
}
