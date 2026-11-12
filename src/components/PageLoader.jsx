'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setCount(100);
      const t = setTimeout(() => {
        setVisible(false);
        html.style.overflow = prevOverflow;
      }, 100);
      return () => {
        clearTimeout(t);
        html.style.overflow = prevOverflow;
      };
    }

    let frame = 0;
    const totalFrames = 24;
    let finishTimeout;

    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = Math.min(100, Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      setCount(eased);

      if (frame >= totalFrames) {
        clearInterval(interval);
        finishTimeout = setTimeout(() => {
          setVisible(false);
          html.style.overflow = prevOverflow;
        }, 160);
      }
    }, 22);

    return () => {
      clearInterval(interval);
      if (finishTimeout) clearTimeout(finishTimeout);
      html.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[120] flex flex-col justify-between p-6 sm:p-10 bg-[#070709] text-[#f4f1ea] select-none"
          aria-hidden="true"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[420px] h-[420px] rounded-full bg-[#d2ff28]/[0.08] blur-[120px]" />
          </div>

          {/* Top Row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative flex items-center justify-between text-xs font-mono uppercase tracking-[0.22em] text-[#9e9a90]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d2ff28] animate-pulse" />
              Kashif Saeed — Portfolio
            </span>
            <span>Lahore, PK</span>
          </motion.div>

          {/* Center Emblem + Brand Reveal */}
          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Spinning Orbital Emblem */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#d2ff28]/60"
              />
              <motion.span
                animate={{ scale: [0.94, 1.05, 0.94] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full bg-[#d2ff28] text-[#070709] font-display font-extrabold text-base flex items-center justify-center shadow-[0_0_28px_rgba(210,255,40,0.45)]"
              >
                KS
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <span className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
                KASHIF<span className="text-[#d2ff28]">.</span>
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2 font-serif italic text-lg sm:text-xl text-[#b6b2a8]"
            >
              Frontend Architecture &amp; Motion
            </motion.p>
          </div>

          {/* Bottom Counter & Hairline Progress */}
          <div className="relative space-y-3">
            <div className="flex items-end justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9e9a90]">
                Initializing Experience
              </span>
              <span className="font-display text-4xl sm:text-6xl font-extrabold tabular-nums text-[#d2ff28]">
                {String(count).padStart(2, '0')}
                <span className="text-lg text-[#9e9a90] ml-1">%</span>
              </span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#d2ff28] transition-all duration-100 rounded-full shadow-[0_0_16px_rgba(210,255,40,0.75)]"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
