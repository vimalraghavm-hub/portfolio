import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onToggleSearch,
  onCloseActive,
  onOpenWindow,
  onHomeClick
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing inside an input/textarea/editable element
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isEditable = document.activeElement?.isContentEditable;
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        isEditable
      ) {
        // Allow ESC to blur inputs if needed, but skip global app navigation shortcuts
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      // ESC: Close active window / overlay
      if (e.key === 'Escape') {
        if (onCloseActive) onCloseActive();
        return;
      }

      // Search: Shift + K or Cmd/Ctrl + K
      if ((e.shiftKey || e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onToggleSearch) onToggleSearch();
        return;
      }

      // Navigation shortcuts (Shift + Key)
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toLowerCase();
        switch (key) {
          case 'h':
            e.preventDefault();
            if (onHomeClick) onHomeClick();
            break;
          case 'a':
            e.preventDefault();
            if (onOpenWindow) onOpenWindow('about');
            break;
          case 'p':
            e.preventDefault();
            if (onOpenWindow) onOpenWindow('projects');
            break;
          case 's':
            e.preventDefault();
            if (onOpenWindow) onOpenWindow('skills');
            break;
          case 'r':
            e.preventDefault();
            if (onOpenWindow) onOpenWindow('resume');
            break;
          case 'c':
            e.preventDefault();
            if (onOpenWindow) onOpenWindow('contact');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleSearch, onCloseActive, onOpenWindow, onHomeClick]);
}
