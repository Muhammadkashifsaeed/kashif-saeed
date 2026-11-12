'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'pointer' | 'view' | 'inspect' | 'open'
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 360, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 360, damping: 28, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const customTarget = target.closest('[data-cursor]');
      if (customTarget) {
        setCursorMode(customTarget.getAttribute('data-cursor') || 'pointer');
        return;
      }

      const interactive = target.closest('a, button, input, textarea, select, [role="button"]');
      setCursorMode(interactive ? 'pointer' : 'default');
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!enabled) return null;

  const hasLabel = cursorMode === 'view' || cursorMode === 'inspect' || cursorMode === 'open';
  const labelText =
    cursorMode === 'view'
      ? 'VIEW ↗'
      : cursorMode === 'inspect'
      ? 'EXPLORE'
      : cursorMode === 'open'
      ? 'OPEN ↗'
      : '';

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: hasLabel ? 78 : cursorMode === 'pointer' ? 42 : 28,
          height: hasLabel ? 78 : cursorMode === 'pointer' ? 42 : 28,
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.85 : 1,
          backgroundColor: hasLabel
            ? '#d2ff28'
            : cursorMode === 'pointer'
            ? 'rgba(210, 255, 40, 0.14)'
            : 'transparent',
          border: hasLabel
            ? '1px solid #d2ff28'
            : '1.5px solid rgba(210, 255, 40, 0.75)',
          mixBlendMode: hasLabel ? 'normal' : 'difference',
          transition:
            'width 200ms cubic-bezier(0.16, 1, 0.3, 1), height 200ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, opacity 180ms ease',
        }}
      >
        <AnimatePresence mode="wait">
          {hasLabel && (
            <motion.span
              key={labelText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[10px] font-bold tracking-wider text-[#070709]"
            >
              {labelText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-volt-500"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible && !hasLabel ? (cursorMode === 'pointer' ? 0.4 : 1) : 0,
          transition: 'opacity 150ms ease',
        }}
      />
    </>
  );
}
