'use client';
import { useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  LayoutGrid,
  Orbit,
  Sparkles,
} from 'lucide-react';
import { projects, skillCategories, skills } from '../data/portfolioData';
import SplitText from './motion/SplitText';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'orbit'
  const [activeSkillName, setActiveSkillName] = useState(
    skills[3]?.name || skills[0].name
  );

  // Cursor spotlight on Constellation board
  const boardX = useMotionValue(0);
  const boardY = useMotionValue(0);
  const boardSpotlight = useMotionTemplate`radial-gradient(420px circle at ${boardX}px ${boardY}px, rgb(var(--text-highlight) / 0.12), transparent 72%)`;

  const handleBoardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    boardX.set(e.clientX - rect.left);
    boardY.set(e.clientY - rect.top);
  };

  const filteredSkills = useMemo(
    () =>
      selectedCategory === 'All'
        ? skills
        : skills.filter((skill) => skill.category === selectedCategory),
    [selectedCategory]
  );

  const activeSkillIndex = useMemo(() => {
    const idx = filteredSkills.findIndex((s) => s.name === activeSkillName);
    return idx === -1 ? 0 : idx;
  }, [filteredSkills, activeSkillName]);

  const activeSkill = filteredSkills[activeSkillIndex] || skills[0];

  const stepSkill = (dir) => {
    if (filteredSkills.length <= 1) return;
    const nextIdx =
      (activeSkillIndex + dir + filteredSkills.length) % filteredSkills.length;
    setActiveSkillName(filteredSkills[nextIdx].name);
  };

  // Match real projects from portfolioData that use this technology
  const matchedProjects = useMemo(() => {
    const key = activeSkill.name.toLowerCase();
    return projects.filter((proj) =>
      proj.technologies.some((t) => {
        const tl = t.toLowerCase();
        if (key.includes('next')) return tl.includes('next');
        if (key.includes('react')) return tl.includes('react');
        if (key.includes('tailwind')) return tl.includes('tailwind');
        if (key.includes('javascript'))
          return tl.includes('javascript') || tl.includes('react');
        if (key.includes('framer')) return tl.includes('framer');
        if (key.includes('axios')) return tl.includes('axios');
        if (key.includes('weather')) return tl.includes('weather');
        if (key.includes('local')) return tl.includes('local');
        if (key.includes('swiper')) return tl.includes('swiper');
        if (key.includes('vite')) return tl.includes('vite');
        if (key.includes('grid'))
          return tl.includes('grid') || tl.includes('tailwind');
        if (
          key.includes('html') ||
          key.includes('css') ||
          key.includes('responsive')
        )
          return true;
        return tl.includes(key);
      })
    );
  }, [activeSkill]);

  const relatedProjects = useMemo(
    () => matchedProjects.slice(0, 5),
    [matchedProjects]
  );

  const ActiveIcon = activeSkill.icon;
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - activeSkill.level / 100);

  // Partition skills cleanly for Orbital Constellation view
  const innerOrbitSkills = filteredSkills.slice(0, 5);
  const outerOrbitSkills = filteredSkills.slice(5, 15);

  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-line">
          <span className="index-tag">
            <Cpu className="w-3.5 h-3.5 text-highlight" />
            <span>02 / Interactive Tech Ecosystem</span>
          </span>

          {/* Ecosystem View Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-line bg-surface/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode === 'grid'
                  ? 'bg-volt-500 text-[#070709] font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Nodes</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('orbit')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode === 'orbit'
                  ? 'bg-volt-500 text-[#070709] font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Orbit Map</span>
            </button>
          </div>
        </div>

        {/* Section Title + Summary */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.02]">
              <SplitText text="Technology" mode="words" />{' '}
              <span className="font-serif italic font-normal text-highlight">
                Ecosystem
              </span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted text-base sm:text-lg leading-relaxed">
            An interconnected stack of frontend languages, frameworks, styling systems, and APIs powering responsive web applications.
          </p>
        </div>

        {/* Category Filter Tabs with Real Counts */}
        <div
          role="tablist"
          aria-label="Filter technologies by category"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {skillCategories.map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === 'All'
                ? skills.length
                : skills.filter((s) => s.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-[#070709] font-bold'
                    : 'border border-line bg-surface/70 text-muted hover:text-ink hover:border-ink/40'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeEcosystemTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-volt-500 border border-[#070709]/15 -z-10"
                  />
                )}
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Ecosystem Split: Interactive Constellation Board (Left) + Live Telemetry Inspector (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL */}
          <div
            onMouseMove={handleBoardMove}
            className="lg:col-span-7 relative editorial-panel rounded-[2rem] p-5 sm:p-7 overflow-hidden group/board"
          >
            {/* Interactive Cursor Spotlight */}
            <motion.div
              aria-hidden="true"
              style={{ background: boardSpotlight }}
              className="pointer-events-none absolute inset-0 opacity-0 group-hover/board:opacity-100 transition-opacity duration-300"
            />

            {/* Subtle Circuit Grid Texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(rgb(var(--border-subtle) / 0.9) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />

            {viewMode === 'grid' ? (
              /* MODE 1: Interactive Circuit Nodes Grid */
              <motion.div
                layout
                className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    const isSelected = activeSkill.name === skill.name;

                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        transition={{
                          duration: 0.25,
                          delay: Math.min(idx * 0.02, 0.2),
                        }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={() => setActiveSkillName(skill.name)}
                        onClick={() => setActiveSkillName(skill.name)}
                        data-cursor="inspect"
                        className={`relative text-left rounded-2xl p-4 border transition-all duration-300 group overflow-hidden ${
                          isSelected
                            ? 'bg-volt-500 text-[#070709] border-volt-500 shadow-volt-glow'
                            : 'bg-surface/90 border-line hover:border-highlight/50 text-ink'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                              isSelected
                                ? 'bg-[#070709]/12'
                                : 'bg-[#101218] border border-white/10 shadow-sm'
                            }`}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: isSelected ? '#070709' : skill.color }}
                            />
                          </div>

                          <span
                            className={`font-mono text-[11px] font-bold ${
                              isSelected ? 'text-[#070709]/85' : 'text-muted'
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>

                        <p className="font-display font-bold text-sm leading-tight truncate">
                          {skill.name}
                        </p>
                        <p
                          className={`font-mono text-[10px] uppercase tracking-wider mt-1 truncate ${
                            isSelected ? 'text-[#070709]/70' : 'text-subtle'
                          }`}
                        >
                          {skill.category}
                        </p>

                        {/* Micro Proficiency Meter */}
                        <div
                          className={`mt-3 h-1 w-full rounded-full overflow-hidden ${
                            isSelected ? 'bg-[#070709]/15' : 'bg-line/70'
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: isSelected ? '#070709' : skill.color,
                            }}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* MODE 2: Interactive Orbital Constellation Diagram */
              <div className="relative z-10">
                {/* Desktop & Tablet Radial Orbit Map */}
                <div className="hidden sm:flex relative h-[490px] w-full items-center justify-center overflow-hidden">
                  {/* Outer Rotating Dashed Ring */}
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-line"
                  />
                  {/* Inner Orbit Ring */}
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[245px] h-[245px] rounded-full border border-highlight/30"
                  />

                  {/* Center Active Hub */}
                  <motion.div
                    key={activeSkill.name}
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-20 w-28 h-28 rounded-full bg-[#101218] border-2 border-volt-500 shadow-volt-glow flex flex-col items-center justify-center text-center p-2"
                  >
                    <ActiveIcon
                      className="w-7 h-7 mb-1"
                      style={{ color: activeSkill.color }}
                    />
                    <span className="font-display text-[11px] font-bold text-[#f6f3ec] leading-tight line-clamp-1 px-1">
                      {activeSkill.name}
                    </span>
                    <span className="font-mono text-[10px] text-volt-500 font-bold">
                      {activeSkill.level}%
                    </span>
                  </motion.div>

                  {/* Inner Orbit Nodes */}
                  {innerOrbitSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    const isSelected = activeSkill.name === skill.name;
                    const angle =
                      (idx / Math.max(innerOrbitSkills.length, 1)) * Math.PI * 2 -
                      Math.PI / 2;
                    const radius = 122;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        onClick={() => setActiveSkillName(skill.name)}
                        onMouseEnter={() => setActiveSkillName(skill.name)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ x, y }}
                        title={`${skill.name} (${skill.level}%)`}
                        className={`absolute z-20 px-2.5 py-2 rounded-2xl border flex items-center gap-1.5 shadow-md transition-colors ${
                          isSelected
                            ? 'bg-volt-500 text-[#070709] border-volt-500 font-bold shadow-volt-glow'
                            : 'bg-surface text-ink border-line hover:border-highlight'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#070709]/12' : 'bg-[#101218]'
                          }`}
                        >
                          <Icon
                            className="w-3.5 h-3.5"
                            style={{ color: isSelected ? '#070709' : skill.color }}
                          />
                        </span>
                        <span className="font-mono text-[10px] font-bold whitespace-nowrap">
                          {skill.name.split(' ')[0]}
                        </span>
                      </motion.button>
                    );
                  })}

                  {/* Outer Orbit Nodes */}
                  {outerOrbitSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    const isSelected = activeSkill.name === skill.name;
                    const angle =
                      (idx / Math.max(outerOrbitSkills.length, 1)) * Math.PI * 2 -
                      Math.PI / 3;
                    const radius = 210;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        onClick={() => setActiveSkillName(skill.name)}
                        onMouseEnter={() => setActiveSkillName(skill.name)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ x, y }}
                        title={`${skill.name} (${skill.level}%)`}
                        className={`absolute z-10 px-2.5 py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm transition-colors ${
                          isSelected
                            ? 'bg-volt-500 text-[#070709] border-volt-500 font-bold shadow-volt-glow'
                            : 'bg-surface/95 text-ink border-line hover:border-highlight'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#070709]/12' : 'bg-[#101218]'
                          }`}
                        >
                          <Icon
                            className="w-3 h-3"
                            style={{ color: isSelected ? '#070709' : skill.color }}
                          />
                        </span>
                        <span className="font-mono text-[10px] whitespace-nowrap">
                          {skill.name.split(' ')[0]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Compact Pill Selector inside Orbit Tab */}
                <div className="sm:hidden flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => {
                    const Icon = skill.icon;
                    const isSelected = activeSkill.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setActiveSkillName(skill.name)}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono transition-colors ${
                          isSelected
                            ? 'bg-volt-500 text-[#070709] border-volt-500 font-bold'
                            : 'bg-surface border-line text-ink'
                        }`}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: isSelected ? '#070709' : skill.color }}
                        />
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ecosystem Pipeline Strip */}
            <div className="relative z-10 mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
                Click or hover any node to inspect telemetry
              </span>
              <span>
                {filteredSkills.length} Active{' '}
                {filteredSkills.length === 1 ? 'Node' : 'Nodes'}
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Live Telemetry Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="relative editorial-panel rounded-[2rem] p-6 sm:p-8 shadow-editorial-light dark:shadow-editorial-dark overflow-hidden"
              >
                {/* Dynamic Ambient Color Glow matching active technology */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: activeSkill.color }}
                />

                {/* Stepper Header */}
                <div className="relative flex items-center justify-between gap-2 pb-4 mb-5 border-b border-line">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Node {String(activeSkillIndex + 1).padStart(2, '0')} /{' '}
                    {String(filteredSkills.length).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => stepSkill(-1)}
                      aria-label="Previous technology"
                      className="w-8 h-8 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepSkill(1)}
                      aria-label="Next technology"
                      className="w-8 h-8 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Identity + Radial Proficiency Gauge */}
                <div className="relative flex items-start justify-between gap-4 pb-6 border-b border-line">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl bg-[#101218] border border-white/15 flex items-center justify-center shrink-0"
                      style={{
                        boxShadow: `0 12px 28px -10px ${activeSkill.color}90`,
                      }}
                    >
                      <ActiveIcon
                        className="w-7 h-7"
                        style={{ color: activeSkill.color }}
                      />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-highlight font-bold">
                        <Sparkles className="w-3 h-3" />
                        {activeSkill.category}
                      </span>
                      <h3 className="font-display text-2xl font-extrabold text-ink mt-0.5">
                        {activeSkill.name}
                      </h3>
                    </div>
                  </div>

                  {/* Radial Proficiency Gauge */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 104 104">
                      <circle
                        cx="52"
                        cy="52"
                        r={ringRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-line/60"
                      />
                      <motion.circle
                        cx="52"
                        cy="52"
                        r={ringRadius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={ringCircumference}
                        initial={{ strokeDashoffset: ringCircumference }}
                        animate={{ strokeDashoffset: ringOffset }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-highlight"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-extrabold text-lg text-ink">
                        {activeSkill.level}%
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                        Proficiency
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role & Usage */}
                <div className="relative py-6 space-y-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle mb-2">
                      Engineering Role
                    </p>
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {activeSkill.summary}
                    </p>
                  </div>

                  {/* Linear Mastery Indicator */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-1.5">
                      <span>Stack Integration</span>
                      <span className="text-highlight font-bold">
                        {activeSkill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-elevated border border-line/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.level}%` }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-volt-500 border-r border-[#070709]/20"
                      />
                    </div>
                  </div>

                  {relatedProjects.length > 0 && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-highlight" />
                          Applied In Projects
                        </p>
                        <span className="font-mono text-[10px] text-cyan-ink font-bold">
                          {matchedProjects.length} Total
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {relatedProjects.map((proj) => (
                          <a
                            key={proj.id}
                            href="#projects"
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-elevated border border-line text-ink hover:border-highlight hover:text-highlight transition-colors"
                          >
                            {proj.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ecosystem Footer */}
                <div className="relative pt-4 border-t border-line flex items-center justify-between text-xs font-mono text-muted">
                  <span>{skills.length} Core Technologies</span>
                  <span className="text-highlight font-bold">Production Ready</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Compact Ecosystem Ledger Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="editorial-panel rounded-2xl p-3.5 text-center">
                <p className="font-display text-xl font-extrabold text-ink">
                  {skills.length}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">
                  Skills
                </p>
              </div>
              <div className="editorial-panel rounded-2xl p-3.5 text-center">
                <p className="font-display text-xl font-extrabold text-highlight">
                  {skillCategories.length - 1}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">
                  Domains
                </p>
              </div>
              <div className="editorial-panel rounded-2xl p-3.5 text-center">
                <p className="font-display text-xl font-extrabold text-cyan-ink">
                  {projects.length}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">
                  Builds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
