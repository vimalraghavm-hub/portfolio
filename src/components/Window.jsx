import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react';

export function Window({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  isActive,
  width = 820,
  height = 560,
  initialX = 150,
  initialY = 80,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  children
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, posX: initialX, posY: initialY });
  const resizeStartRef = useRef({ x: 0, y: 0, posX: initialX, posY: initialY, width, height, handle: '' });

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
    setSize({ width, height });
  }, [initialX, initialY, width, height]);

  // Handle window dragging by pointer on header bar
  const handleDragDown = (e) => {
    if (isMaximized) return;
    onFocus(id);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newX = Math.max(-size.width + 120, Math.min(window.innerWidth - 120, dragStartRef.current.posX + dx));
    const newY = Math.max(32, Math.min(window.innerHeight - 80, dragStartRef.current.posY + dy));

    setPosition({ x: newX, y: newY });
  };

  const handleDragUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // 8-Directional Pointer Window Resizing
  const handleResizeDown = (e, handle) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized) return;
    onFocus(id);
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
      width: size.width,
      height: size.height,
      handle
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStartRef.current.x;
    const dy = e.clientY - resizeStartRef.current.y;
    const { posX, posY, width: startW, height: startH, handle } = resizeStartRef.current;

    const MIN_W = 340;
    const MIN_H = 240;
    const MAX_W = window.innerWidth - 20;
    const MAX_H = window.innerHeight - 80;

    let newW = startW;
    let newH = startH;
    let newX = posX;
    let newY = posY;

    if (handle.includes('right')) {
      newW = Math.max(MIN_W, Math.min(MAX_W, startW + dx));
    }
    if (handle.includes('bottom')) {
      newH = Math.max(MIN_H, Math.min(MAX_H, startH + dy));
    }
    if (handle.includes('left')) {
      const possibleW = startW - dx;
      if (possibleW >= MIN_W && possibleW <= MAX_W) {
        newW = possibleW;
        newX = posX + dx;
      }
    }
    if (handle.includes('top')) {
      const possibleH = startH - dy;
      if (possibleH >= MIN_H && possibleH <= MAX_H) {
        newH = possibleH;
        newY = posY + dy;
      }
    }

    setSize({ width: newW, height: newH });
    setPosition({ x: newX, y: newY });
  };

  const handleResizeUp = (e) => {
    if (isResizing) {
      setIsResizing(false);
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.88, filter: 'blur(4px)', x: -60, y: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onFocus(id)}
          style={{
            zIndex,
            left: isMaximized ? 0 : `${position.x}px`,
            top: isMaximized ? '32px' : `${position.y}px`,
            width: isMaximized ? '100vw' : `${size.width}px`,
            height: isMaximized ? 'calc(100vh - 32px)' : `${size.height}px`,
            transition: (isDragging || isResizing) 
              ? 'none' 
              : 'width 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className={`fixed flex flex-col rounded-2xl overflow-hidden mac-window-surface font-sans select-none ${
            isActive ? 'mac-window-surface-focused ring-1 ring-blue-500/30' : 'opacity-95'
          } ${isMaximized ? 'rounded-none border-none' : ''}`}
        >
          {/* macOS Title Bar Header */}
          <div
            onPointerDown={handleDragDown}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragUp}
            onDoubleClick={() => onToggleMaximize(id)}
            className="h-10 px-4 flex items-center justify-between cursor-move shrink-0 border-b border-slate-300/30 dark:border-white/10 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-xl transition-colors duration-300"
          >
            {/* Left Traffic Light Controls */}
            <div className="flex items-center space-x-2 group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 active:scale-90 flex items-center justify-center text-slate-950 transition-all shadow-sm"
                title="Close Window"
              >
                <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 stroke-[3]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-90 flex items-center justify-center text-slate-950 transition-all shadow-sm"
                title="Minimize Window"
              >
                <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 stroke-[3]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMaximize(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-90 flex items-center justify-center text-slate-950 transition-all shadow-sm"
                title={isMaximized ? "Restore Window" : "Maximize Window"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 stroke-[3]" />
                ) : (
                  <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 stroke-[3]" />
                )}
              </button>
            </div>

            {/* Window Title */}
            <div className="text-xs font-semibold tracking-wide truncate max-w-xs text-slate-800 dark:text-slate-200">
              {title}
            </div>

            <div className="w-12" />
          </div>

          {/* Scrollable Window Content Body (Fixed title bar, scrollable content!) */}
          <div className="flex-1 overflow-auto text-slate-900 dark:text-slate-100 backdrop-blur-md transition-colors duration-300">
            {children}
          </div>

          {/* 8-Directional Resize Handles (Hidden when maximized or on mobile) */}
          {!isMaximized && (
            <>
              {/* Edges */}
              <div onPointerDown={(e) => handleResizeDown(e, 'top')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute top-0 left-2 right-2 h-2 cursor-n-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'bottom')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute bottom-0 left-2 right-2 h-2 cursor-s-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'left')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute top-2 bottom-2 left-0 w-2 cursor-w-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'right')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute top-2 bottom-2 right-0 w-2 cursor-e-resize z-30" />

              {/* Corners */}
              <div onPointerDown={(e) => handleResizeDown(e, 'top-left')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'top-right')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'bottom-left')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-30" />
              <div onPointerDown={(e) => handleResizeDown(e, 'bottom-right')} onPointerMove={handleResizeMove} onPointerUp={handleResizeUp} className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-30" />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
