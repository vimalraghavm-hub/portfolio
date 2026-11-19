import { useState, useEffect, useCallback } from 'react';

export function useBrightness() {
  const [brightness, setBrightnessState] = useState(() => {
    try {
      const saved = localStorage.getItem('vimal_os_brightness');
      return saved ? Number(saved) : 100;
    } catch (e) {
      return 100;
    }
  });

  const setBrightness = useCallback((value) => {
    const num = Math.max(30, Math.min(100, Number(value)));
    setBrightnessState(num);
    try {
      localStorage.setItem('vimal_os_brightness', num.toString());
    } catch (e) {}
  }, []);

  useEffect(() => {
    // Apply brightness filter to root application element
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.filter = `brightness(${brightness}%)`;
      rootEl.style.transition = 'filter 0.2s ease';
    }
  }, [brightness]);

  return { brightness, setBrightness };
}
