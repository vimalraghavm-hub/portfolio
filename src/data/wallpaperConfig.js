export const defaultWallpaperConfig = {
  // Configurable video wallpaper path
  videoPath: "/wallpapers/portfolio-wallpaper.mp4",
  // Fallback image path if video doesn't load or exist
  imageFallbackPath: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
  // Initial selected preset type ('canvas-aurora' | 'video' | 'sequoia' | 'cyberpunk')
  activePreset: "canvas-aurora",
  presets: [
    {
      id: "canvas-aurora",
      name: "macOS Sonoma Aurora",
      type: "gradient-mesh",
      colors: ["#1e1b4b", "#311042", "#0f172a", "#1e293b"]
    },
    {
      id: "sequoia-waves",
      name: "macOS Sequoia Abstract",
      type: "gradient-mesh",
      colors: ["#0284c7", "#0f172a", "#4c1d95", "#0369a1"]
    },
    {
      id: "cosmic-dark",
      name: "Deep Space Cosmic",
      type: "gradient-mesh",
      colors: ["#090d16", "#171026", "#041525", "#0d1b2a"]
    },
    {
      id: "video-custom",
      name: "Custom Video Wallpaper",
      type: "video",
      src: "/wallpapers/portfolio-wallpaper.mp4"
    }
  ]
};
