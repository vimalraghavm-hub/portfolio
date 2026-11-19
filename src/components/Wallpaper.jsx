import React, { useRef, useEffect } from 'react';

export function Wallpaper({ config, theme = 'dark' }) {
  const canvasRef = useRef(null);

  // Generative Canvas Aurora Animation if video fails or when gradient-mesh is active
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || config.activePreset === 'video') return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Aurora blob particles
    const blobs = [
      { x: width * 0.2, y: height * 0.3, r: 400, vx: 0.4, vy: 0.3, color: 'rgba(59, 130, 246, 0.35)' },
      { x: width * 0.8, y: height * 0.2, r: 450, vx: -0.3, vy: 0.4, color: 'rgba(147, 51, 234, 0.3)' },
      { x: width * 0.5, y: height * 0.8, r: 500, vx: 0.3, vy: -0.3, color: 'rgba(236, 72, 153, 0.25)' },
      { x: width * 0.1, y: height * 0.7, r: 350, vx: 0.2, vy: -0.4, color: 'rgba(16, 185, 129, 0.2)' },
    ];

    let t = 0;
    const render = () => {
      t += 0.005;
      ctx.fillStyle = theme === 'dark' ? '#0b0f19' : '#e0e7ff';
      ctx.fillRect(0, 0, width, height);

      blobs.forEach((blob, i) => {
        blob.x += Math.sin(t + i) * blob.vx * 1.5;
        blob.y += Math.cos(t + i) * blob.vy * 1.5;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.r
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [config.activePreset, theme]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {config.activePreset === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
          poster={config.imageFallbackPath}
        >
          <source src={config.videoPath} type="video/mp4" />
          {/* Fallback image if video fails to play */}
          <img
            src={config.imageFallbackPath}
            alt="Desktop Wallpaper"
            className="w-full h-full object-cover"
          />
        </video>
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
      )}

      {/* Subtle translucent dark overlay for contrast & readability */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] pointer-events-none" />

      {/* Very subtle desktop vignetting effect */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none" />
    </div>
  );
}
