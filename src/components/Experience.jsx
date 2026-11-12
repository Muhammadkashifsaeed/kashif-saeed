'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Award, Briefcase, GraduationCap, History } from 'lucide-react';
import { experience } from '../data/portfolioData';
import SplitText from './motion/SplitText';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

export default function Experience() {
  const [filter, setFilter] = useState('all');
  const timelineWrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineWrapRef,
    offset: ['start 80%', 'end 60%'],
  });
  const spineScaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });

  const filteredItems =
    filter === 'all'
      ? experience
      : filter === 'work'
      ? experience.filter((item) => item.type === 'work' || item.type === 'certification')
      : experience.filter((item) => item.type === 'education');

  const getTypeMeta = (type) => {
    switch (type) {
      case 'work':
        return { icon: Briefcase, label: 'Work Experience', accent: 'text-highlight border-highlight' };
      case 'certification':
        return { icon: Award, label: 'Self-Learning', accent: 'text-signal-ink border-signal-ink' };
      case 'education':
      default:
        return { icon: GraduationCap, label: 'Education', accent: 'text-cyan-ink border-cyan-ink' };
    }
  };

  return (
    <section id="experience" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-14 border-b border-line">
          <span className="index-tag">
            <History className="w-3.5 h-3.5 text-highlight" />
            <span>04 / Chronology &amp; Credentials</span>
          </span>
          <span className="font-mono text-xs text-muted">2017 — Present</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Editorial Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.04]">
              <SplitText text="Journey &" mode="words" />{' '}
              <span className="font-serif italic font-normal text-highlight">
                Education
              </span>
            </h2>

            <p className="text-muted text-base leading-relaxed max-w-md">
              A progression from Computer Science fundamentals at COMSATS University to shipping modern React and Next.js interfaces at Digistartp UK.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {filters.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-[#070709] font-bold'
                        : 'border border-line bg-surface/60 text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeChronologyTab"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-volt-500 -z-10"
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Animated Spine Timeline */}
          <div ref={timelineWrapRef} className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background Hairline Track */}
            <div
              aria-hidden="true"
              className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-line"
            />
            {/* Scroll-Drawn Active Spine */}
            <motion.div
              aria-hidden="true"
              style={{ scaleY: spineScaleY, transformOrigin: 'top' }}
              className="absolute left-3 sm:left-4 top-2 bottom-2 w-[2px] bg-highlight"
            />

            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => {
                  const meta = getTypeMeta(item.type);
                  const Icon = meta.icon;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.25) }}
                      className="relative group"
                    >
                      {/* Spine Node */}
                      <span
                        className={`absolute -left-8 sm:-left-12 top-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-canvas border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${meta.accent}`}
                      >
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>

                      <div className="editorial-panel rounded-3xl p-6 sm:p-7 hover:border-highlight/55 transition-all duration-300 group-hover:-translate-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight font-bold">
                            {meta.label}
                          </span>
                          <span className="font-mono text-xs text-muted px-3 py-1 rounded-full border border-line bg-elevated/70">
                            {item.period}
                          </span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-muted mt-0.5">
                          {item.company}
                        </p>

                        <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                          {item.description}
                        </p>

                        {item.highlights && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.highlights.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-elevated border border-line text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
