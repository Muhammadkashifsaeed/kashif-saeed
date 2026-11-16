'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import SplitText from './motion/SplitText';
import Magnetic from './motion/Magnetic';

const principles = [
  {
    num: '01',
    title: 'Clean Component Architecture',
    detail:
      'Structuring React and Next.js interfaces into modular, reusable primitives that scale cleanly across pages and teams.',
  },
  {
    num: '02',
    title: 'Responsive & Accessible Craft',
    detail:
      'Designing mobile-first layouts with semantic HTML, keyboard navigation, and consistent visual rhythm on every screen.',
  },
  {
    num: '03',
    title: 'Motion With Intention',
    detail:
      'Using Framer Motion and CSS transitions to clarify hierarchy, guide focus, and make interactions feel tactile and alive.',
  },
  {
    num: '04',
    title: 'Continuous Engineering Growth',
    detail:
      'From BS Computer Science at COMSATS to shipping production web apps at Digistartup UK, always sharpening modern frontend craft.',
  },
];

export default function About() {
  const containerRef = useRef(null);
  const [activePrinciple, setActivePrinciple] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const metaRows = [
    { label: 'Name', value: personalInfo.name },
    { label: 'Current Role', value: 'Frontend Developer — Digistartup UK' },
    { label: 'Degree', value: 'BS Computer Science (COMSATS, 2026)' },
    { label: 'Based In', value: personalInfo.location },
    { label: 'Availability', value: personalInfo.availability },
    { label: 'Direct Email', value: personalInfo.email },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 md:py-36 bg-contrast-canvas text-contrast-ink overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-contrast-line">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-contrast-muted">
            01 / Editorial Profile
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.24em] px-3 py-1 rounded-full bg-volt-500 text-[#070709] font-bold">
            About Me
          </span>
        </div>

        {/* Oversized Pull Quote */}
        <div className="mb-16 max-w-5xl">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]">
            <SplitText text="Engineering web products that feel" mode="words" stagger={0.04} />{' '}
            <span className="font-serif italic font-normal text-contrast-highlight">
              effortless, kinetic,
            </span>{' '}
            <SplitText text="and built to last." mode="words" stagger={0.04} delay={0.18} />
          </h2>
        </div>

        {/* Asymmetric 12-Column Spread */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Parallax Portrait + Editorial Spec Sheet */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-contrast-line bg-contrast-surface"
            >
              <motion.div style={{ y: imageY }} className="relative w-full h-[112%] -top-[6%]">
                <Image
                  src="/kashif.png"
                  alt={`${personalInfo.name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </motion.div>

              <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-2xl bg-[#070709]/80 backdrop-blur-md text-[#f4f1ea] border border-white/15 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-volt-500">
                    Frontend Developer
                  </p>
                  <p className="font-display font-bold text-sm">{personalInfo.name}</p>
                </div>
                <span className="font-mono text-xs text-white/75">LHE / PK</span>
              </div>
            </motion.div>

            {/* Specification Ledger */}
            <div className="border-t border-contrast-line">
              {metaRows.map((row) => (
                <div
                  key={row.label}
                  className="py-3.5 border-b border-contrast-line flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-contrast-muted">
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold text-contrast-ink break-all sm:text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative + Interactive Principles */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="space-y-5 text-base sm:text-lg leading-relaxed text-contrast-muted"
            >
              <p className="text-xl sm:text-2xl font-medium text-contrast-ink leading-snug">
                I&apos;m a BS Computer Science graduate from COMSATS University Islamabad, Vehari Campus, currently crafting modern web applications as a Frontend Developer at Digistartup UK.
              </p>
              <p>
                My development path began with core programming and data structures, then evolved into deep hands-on specialization in JavaScript (ES6+), React.js, Next.js, and Tailwind CSS.
              </p>
              <p>
                Across 20+ deployed applications — including e-commerce stores, music &amp; rhythm platforms, content publishing portals, smart agritech monitoring, and community platforms — I focus on transforming ideas into responsive, crisp, and fast user experiences.
              </p>
            </motion.div>

            {/* Interactive Principles List */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-contrast-muted mb-4">
                How I Build
              </p>
              <div className="border-t border-contrast-line">
                {principles.map((item, idx) => {
                  const isActive = activePrinciple === idx;
                  return (
                    <div
                      key={item.num}
                      onMouseEnter={() => setActivePrinciple(idx)}
                      onClick={() => setActivePrinciple(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActivePrinciple(idx);
                        }
                      }}
                      className={`py-5 border-b border-contrast-line cursor-pointer transition-all duration-300 px-3 -mx-3 rounded-xl ${isActive ? 'bg-contrast-ink/[0.04]' : ''
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-4">
                          <span
                            className={`font-mono text-xs font-bold ${isActive ? 'text-contrast-highlight' : 'text-contrast-muted'
                              }`}
                          >
                            {item.num}
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-contrast-ink">
                            {item.title}
                          </h3>
                        </div>
                        <ArrowUpRight
                          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive
                              ? 'rotate-45 text-contrast-highlight'
                              : 'text-contrast-muted'
                            }`}
                        />
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2.5 pl-9 text-sm sm:text-base text-contrast-muted leading-relaxed">
                          {item.detail}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <Magnetic strength={0.22}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-contrast-ink text-contrast-canvas font-display font-bold text-sm hover:bg-volt-500 hover:text-[#070709] transition-colors duration-300"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
