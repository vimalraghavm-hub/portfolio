import { useState, useCallback, useEffect } from 'react';

export function useSound() {
  const [volume, setVolumeState] = useState(() => {
    try {
      const saved = localStorage.getItem('vimal_os_volume');
      return saved !== null ? Number(saved) : 80;
    } catch (e) {
      return 80;
    }
  });

  const [soundEnabled, setSoundEnabledState] = useState(() => {
    return volume > 0;
  });

  const setVolume = useCallback((val) => {
    const v = Math.max(0, Math.min(100, Number(val)));
    setVolumeState(v);
    setSoundEnabledState(v > 0);
    try {
      localStorage.setItem('vimal_os_volume', v.toString());
    } catch (e) {}
  }, []);

  const setSoundEnabled = useCallback((enabled) => {
    setSoundEnabledState(enabled);
    if (!enabled) setVolumeState(0);
    else setVolumeState(80);
  }, []);

  const playClick = useCallback(() => {
    if (volume <= 0) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const masterVol = (volume / 100) * 0.1;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(masterVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }, [volume]);

  const playOpenWindow = useCallback(() => {
    if (volume <= 0) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const masterVol = (volume / 100) * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(masterVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }, [volume]);

  return {
    volume,
    setVolume,
    soundEnabled,
    setSoundEnabled,
    playClick,
    playOpenWindow
  };
}
