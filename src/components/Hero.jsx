'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ReactTyped } from 'react-typed';
import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  Code2,
  Download,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { FaJs, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { personalInfo } from '../data/portfolioData';
import Magnetic from './motion/Magnetic';
import SplitText from './motion/SplitText';

const marqueeItems = [
  {
    lead: 'N',
    rest: 'ext.js ',
    lead2: 'A',
    rest2: 'rchitecture',
    colorClass: 'text-[#3f6b00] dark:text-[#d2ff28]',
  },
  {
    lead: 'R',
    rest: 'eact.js ',
    lead2: 'I',
    rest2: 'nterfaces',
    colorClass: 'text-[#0e7490] dark:text-[#22d3ee]',
  },
  {
    lead: 'T',
    rest: 'ailwind ',
    lead2: 'D',
    rest2: 'esign',
    colorClass: 'text-[#c2410c] dark:text-[#ff6b4a]',
  },
  {
    lead: 'F',
    rest: 'ramer ',
    lead2: 'M',
    rest2: 'otion',
    colorClass: 'text-[#047857] dark:text-[#34d399]',
  },
  {
    lead: 'R',
    rest: 'esponsive ',
    lead2: 'U',
    rest2: 'I Systems',
    colorClass: 'text-[#b45309] dark:text-[#fbbf24]',
  },
  {
    lead: 'F',
    rest: 'rontend ',
    lead2: 'P',
    rest2: 'erformance',
    colorClass: 'text-[#1d4ed8] dark:text-[#60a5fa]',
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Scroll-linked subtle parallax out of hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  // 3D Tilt Motion Values for Interactive Visual Rig
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 180, damping: 20 });

  // Subtle interactive particle constellation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };
    const particleCount = window.innerWidth < 768 ? 22 : 44;
    const particles = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    resize();
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      });
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? 'rgba(210, 255, 40, 0.45)' : 'rgba(11, 12, 14, 0.32)';
      const lineColor = isDark ? 'rgba(244, 241, 234, 0.08)' : 'rgba(11, 12, 14, 0.08)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 1) {
          p.x -= (dx / dist) * 0.45;
          p.y -= (dy / dist) * 0.45;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 125) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleCardMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 16);
    tiltX.set(-py * 16);
  };

  const handleCardLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumePath;
    link.download = personalInfo.resumeDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 overflow-hidden"
    >
      {/* Interactive Particle Constellation Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient Atmospheric Orbs */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[12%] left-[8%] w-[380px] h-[380px] rounded-full bg-volt-500/10 blur-[140px]" />
        <div className="absolute bottom-[15%] right-[12%] w-[420px] h-[420px] rounded-full bg-ice-500/10 blur-[150px]" />
      </div>

      {/* Main Hero Canvas */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pb-10"
      >
        {/* Top Editorial Telemetry Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-line/70"
        >
          <div className="index-tag">
            <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
            <span>Welcome in My Feed — {personalInfo.location}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span className="px-3 py-1 rounded-full border border-line bg-surface/80 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-highlight" />
              {personalInfo.availability}
            </span>
          </div>
        </motion.div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Typography & Signature Typed Lines (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Name Display - First letter bold & larger, rest refined */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.78 }}
            >
              <p className="font-display tracking-tight text-ink mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-highlight">K</span>
                <span className="text-xl sm:text-2xl font-semibold text-muted">ashif </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-cyan-ink">S</span>
                <span className="text-xl sm:text-2xl font-semibold text-muted">aeed</span>
              </p>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.04] text-ink">
                <span className="block text-3xl sm:text-5xl lg:text-6xl">
                  <SplitText text="Hello, I'm a" immediate delay={0.82} stagger={0.035} />
                </span>
                <span className="block mt-2 text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.12] typed-gradient min-h-[1.25em]">
                  <ReactTyped
                    strings={[
                      'Next.js Developer',
                      'Frontend Developer',
                      'I am a Programmer',
                      'I Love Coding',
                    ]}
                    typeSpeed={45}
                    backSpeed={40}
                    backDelay={1400}
                    loop={true}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Editorial Subtitle + Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.96 }}
              className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
            >
              {personalInfo.tagline} Combining computer science fundamentals with modern React, Next.js, and motion design to build memorable web experiences.
            </motion.p>

            {/* Magnetic CTA Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.06 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Magnetic strength={0.25}>
                <a href="#projects" className="btn-volt group" data-cursor="inspect">
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="btn-editorial group"
                >
                  <Download className="w-4 h-4 text-highlight group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-display font-bold uppercase tracking-wider text-ink hover:text-highlight transition-colors"
                >
                  <span>Contact Me</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Clean Architectural Highlights Bar (No Social Icons Here — Footer Only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.78 }}
              className="pt-6 mt-2 border-t border-line/70 flex flex-wrap items-center gap-6 sm:gap-10"
            >
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-ink">
                  20+
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Live Projects
                </p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-ink">
                  BS CS
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  COMSATS University
                </p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-ink">
                  Next.js
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Frontend Specialty
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Interactive Developer Grid & Portrait Rig (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end py-6 sm:py-8 px-3 sm:px-6"
            style={{ perspective: 1100 }}
          >
            {/* Animated Blueprint Code Grid Backdrop Around Portrait */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 sm:-inset-6 rounded-[3rem] overflow-hidden -z-10"
              style={{
                maskImage: 'radial-gradient(circle at center, black 42%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 42%, transparent 78%)',
              }}
            >
              <motion.div
                animate={{ backgroundPosition: ['0px 0px', '36px 36px'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full opacity-55 dark:opacity-45"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(var(--border-subtle) / 0.85) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-subtle) / 0.85) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
            </div>

            {/* Ambient Pulsing Aura Behind Portrait */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [0.96, 1.05, 0.96], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-6 rounded-full bg-gradient-to-tr from-volt-500/20 via-ice-500/20 to-signal-500/15 blur-3xl -z-10"
            />

            <div className="relative w-full max-w-[385px]">
              {/* Rotating Dashed Tech Orbit Frame */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none hidden sm:block absolute -inset-5 rounded-[2.6rem] border border-dashed border-highlight/35"
              />

              {/* Floating Coding Icon: Top-Left (Next.js) */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [-5, 6, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl editorial-panel shadow-lg absolute -top-5 -left-5 z-20"
              >
                <span className="w-7 h-7 rounded-xl bg-ink text-canvas flex items-center justify-center">
                  <SiNextdotjs className="w-4 h-4" />
                </span>
                <span className="font-mono text-[11px] font-bold text-ink">
                  Next.js
                </span>
              </motion.div>

              {/* Floating Coding Icon: Top-Right (React Spin + Float) */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [5, -6, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center w-12 h-12 rounded-2xl editorial-panel shadow-lg absolute -top-4 -right-2 sm:-right-5 z-20"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="text-[#0284c7] dark:text-[#61DAFB]"
                >
                  <FaReact className="w-6 h-6" />
                </motion.span>
              </motion.div>

              {/* Floating Coding Icon: Left Edge (Code Syntax Tag) */}
              <motion.div
                aria-hidden="true"
                animate={{ x: [-4, 4, -4], y: [3, -3, 3] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl editorial-panel shadow-lg absolute top-1/2 -left-8 -translate-y-1/2 z-20"
              >
                <Code2 className="w-4 h-4 text-highlight" />
                <span className="font-mono text-[11px] font-bold text-ink">
                  &lt;/&gt;
                </span>
              </motion.div>

              {/* Floating Coding Icon: Right Edge (Tailwind + JS) */}
              <motion.div
                aria-hidden="true"
                animate={{ x: [4, -4, 4], y: [-4, 4, -4] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl editorial-panel shadow-lg absolute top-[38%] -right-7 z-20"
              >
                <SiTailwindcss className="w-4 h-4 text-[#0284c7] dark:text-[#38BDF8]" />
                <FaJs className="w-4 h-4 text-[#ca8a04] dark:text-[#F7DF1E]" />
              </motion.div>

              {/* Floating Coding Icon: Bottom-Left (Braces UI) */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [4, -5, 4] }}
                transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl editorial-panel shadow-lg absolute -bottom-3 -left-2 sm:-left-6 z-20"
              >
                <Braces className="w-3.5 h-3.5 text-cyan-ink" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  Frontend
                </span>
              </motion.div>

              {/* Main Interactive 3D Tilt Portrait Card */}
              <motion.div
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                style={{
                  rotateX: smoothTiltX,
                  rotateY: smoothTiltY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full rounded-[2rem] editorial-panel p-4 shadow-editorial-light dark:shadow-editorial-dark"
              >
                {/* Clean Portrait Canvas (No Digistartp Text on Image) */}
                <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-elevated border border-line/70">
                  <Image
                    src="/kashif.png"
                    alt={`${personalInfo.name} — Next.js Developer`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 385px"
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle Bottom Name & Role Gradient */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#070709]/95 via-[#070709]/65 to-transparent text-[#f4f1ea]">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-volt-500">
                          {personalInfo.name}
                        </p>
                        <p className="font-display font-bold text-lg leading-tight mt-0.5">
                          {personalInfo.title}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/20 bg-white/10">
                        <Terminal className="w-3 h-3 text-volt-500" />
                        UI / CODE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating 3D Layer Footer Strip */}
                <div
                  style={{ transform: 'translateZ(35px)' }}
                  className="hidden sm:flex items-center gap-2.5 mt-3 px-4 py-2.5 rounded-2xl bg-elevated/90 border border-line/80 justify-between"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                    React • Next.js • Tailwind
                  </span>
                  <span className="text-xs font-mono font-bold text-ink">
                    SCROLL ↓
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Kinetic Marquee Band - Enhanced Colors, Drop-Cap Scale & Smooth Motion */}
      <div className="relative w-full border-y border-line bg-gradient-to-r from-volt-500/[0.06] via-ice-500/[0.08] to-signal-500/[0.06] backdrop-blur-md py-4 overflow-hidden">
        {/* Edge Fade Masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-canvas to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-canvas to-transparent"
        />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center will-change-transform"
        >
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={`${item.lead}${item.rest}-${idx}`} className="flex items-center shrink-0 group">
              <div className="inline-flex items-baseline px-5 sm:px-7 py-1 rounded-full transition-transform duration-300 group-hover:scale-105">
                <span
                  className={`font-display font-extrabold text-xl sm:text-2xl leading-none ${item.colorClass}`}
                >
                  {item.lead}
                </span>
                <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-ink whitespace-pre">
                  {item.rest}
                </span>
                <span
                  className={`font-display font-extrabold text-xl sm:text-2xl leading-none ${item.colorClass}`}
                >
                  {item.lead2}
                </span>
                <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-ink">
                  {item.rest2}
                </span>
              </div>

              <motion.span
                aria-hidden="true"
                animate={{ rotate: [0, 180, 360], scale: [1, 1.25, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className={`inline-flex items-center justify-center text-sm select-none shrink-0 ${item.colorClass}`}
              >
                ✦
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
