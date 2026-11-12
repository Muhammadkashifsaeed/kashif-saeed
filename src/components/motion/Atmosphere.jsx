'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Atmosphere() {
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);

  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setActive(true);
    const onMove = (e) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointerX, pointerY]);

  return (
    <>
      {/* Subtle Film Grain Texture */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[70] pointer-events-none opacity-[0.032] dark:opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pointer Atmospheric Glow */}
      {active && (
        <motion.div
          aria-hidden="true"
          className="fixed top-0 left-0 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10 opacity-45 dark:opacity-25 blur-[110px]"
          style={{
            x: smoothX,
            y: smoothY,
            background:
              'radial-gradient(circle, rgba(210,255,40,0.35) 0%, rgba(103,232,249,0.16) 45%, transparent 72%)',
          }}
        />
      )}
    </>
  );
}

