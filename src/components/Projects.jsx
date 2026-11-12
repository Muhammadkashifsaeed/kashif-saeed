'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Globe,
  LayoutGrid,
  List,
  MonitorPlay,
  Sparkles,
  X,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projectCategories, projects } from '../data/portfolioData';
import SplitText from './motion/SplitText';
import Magnetic from './motion/Magnetic';

function getHostLabel(url) {
  if (!url) return 'preview.local';
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ProjectCard({ project, index, onSelect }) {
  const displayNumber = String(index + 1).padStart(2, '0');
  const hostLabel = getHostLabel(project.liveUrl);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${mouseX}px ${mouseY}px, rgb(var(--text-highlight) / 0.12), transparent 72%)`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative editorial-panel rounded-[2rem] overflow-hidden shadow-editorial-light dark:shadow-editorial-dark hover:border-highlight/55 transition-colors duration-300 flex flex-col h-full"
    >
      {/* Interactive Cursor Spotlight Sheen */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Visual Browser Window Frame */}
        <div className="p-3 sm:p-4">
          <div
            onClick={() => onSelect(project)}
            data-cursor="view"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(project);
              }
            }}
            aria-label={`Open case study for ${project.title}`}
            className="rounded-2xl overflow-hidden border border-line bg-elevated/90 shadow-sm cursor-pointer group/frame"
          >
            {/* Browser Top Chrome */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-surface/90 border-b border-line">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/90" />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated/90 border border-line/80 max-w-[200px] sm:max-w-[240px]">
                <Globe className="w-3 h-3 text-cyan-ink shrink-0" />
                <span className="font-mono text-[10px] text-muted truncate">
                  {hostLabel}
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-highlight tracking-wider">
                #{displayNumber}
              </span>
            </div>

            {/* Screenshot Viewport */}
            <div className="relative overflow-hidden bg-elevated aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-[1.06]"
              />

              {/* Dark Overlay + Floating Inspect Pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-[#070709]/10 to-transparent opacity-60 group-hover/frame:opacity-80 transition-opacity duration-300" />

              {/* Category Pill Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#070709]/85 backdrop-blur-md text-volt-500 font-mono text-[10px] font-bold uppercase tracking-wider border border-white/15">
                  {project.categoryLabel || project.categories[0]}
                </span>
              </div>

              {/* Hover Center CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-2 group-hover/frame:opacity-100 group-hover/frame:translate-y-0 transition-all duration-300 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#070709]/90 backdrop-blur-md text-[#f6f3ec] font-mono text-xs uppercase tracking-wider border border-white/20 shadow-xl">
                  <span>Inspect Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-volt-500" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="relative px-6 pb-6 pt-1 sm:px-7 sm:pb-7 flex-1 flex flex-col justify-between">
          {/* Decorative Oversized Index Watermark */}
          <span
            aria-hidden="true"
            className="hidden sm:block pointer-events-none select-none absolute top-0 right-6 font-display font-extrabold text-6xl leading-none text-ink/[0.04] tracking-tighter"
          >
            {displayNumber}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                Build {displayNumber}
              </span>
              {index < 5 && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-highlight/10 text-highlight border border-highlight/30 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            <h3
              onClick={() => onSelect(project)}
              className="font-display text-xl sm:text-2xl font-extrabold text-ink group-hover:text-highlight transition-colors leading-tight cursor-pointer"
            >
              {project.title}
            </h3>

            <p className="mt-2.5 text-sm sm:text-base text-muted leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-elevated border border-line text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Magnetic strength={0.2}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  aria-label={`Open ${project.title} live preview`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-volt-500 text-[#070709] border border-[#070709]/15 hover:bg-volt-400 transition-colors"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            )}

            {project.githubUrl && (
              <Magnetic strength={0.2}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider border border-line bg-surface hover:border-ink text-ink transition-colors"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </Magnetic>
            )}

            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-label={`View details for ${project.title}`}
              className="ml-auto inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted hover:text-highlight transition-colors"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('editorial'); // 'editorial' | 'stage' | 'index'
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndexProject, setHoveredIndexProject] = useState(null);

  // Floating preview coordinates for Interactive Index mode
  const previewX = useMotionValue(-300);
  const previewY = useMotionValue(-300);
  const smoothX = useSpring(previewX, { stiffness: 240, damping: 24 });
  const smoothY = useSpring(previewY, { stiffness: 240, damping: 24 });

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));

  // Keep stage index in bounds when category changes
  const safeStageIndex =
    filteredProjects.length > 0 ? stageIndex % filteredProjects.length : 0;
  const stageProject = filteredProjects[safeStageIndex] || filteredProjects[0];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setStageIndex(0);
  };

  const stepSelectedProject = useCallback(
    (direction) => {
      if (!selectedProject || filteredProjects.length <= 1) return;
      const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
      const currentIdx = idx === -1 ? 0 : idx;
      const nextIdx =
        (currentIdx + direction + filteredProjects.length) %
        filteredProjects.length;
      setSelectedProject(filteredProjects[nextIdx]);
    },
    [selectedProject, filteredProjects]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        return;
      }
      if (selectedProject) {
        if (e.key === 'ArrowRight') stepSelectedProject(1);
        if (e.key === 'ArrowLeft') stepSelectedProject(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, stepSelectedProject]);

  const handleIndexMouseMove = (e) => {
    previewX.set(e.clientX + 24);
    previewY.set(e.clientY - 120);
  };

  return (
    <section id="projects" className="py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="index-tag">
              <FolderGit2 className="w-3.5 h-3.5 text-highlight" />
              <span>03 / Case Studies &amp; Builds</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-xs text-muted">
              — {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'Work' : 'Works'}
            </span>
          </div>

          {/* 3-Mode Interactive Studio Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-line bg-surface/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode('editorial')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode === 'editorial'
                  ? 'bg-volt-500 text-[#070709] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('stage')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode === 'stage'
                  ? 'bg-volt-500 text-[#070709] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              <span>Stage</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('index')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode === 'index'
                  ? 'bg-volt-500 text-[#070709] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
          </div>
        </div>

        {/* Title & Filter Bar */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.02]">
              <SplitText text="Selected" mode="words" />{' '}
              <span className="font-serif italic font-normal text-highlight">
                Projects
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
              Real production builds engineered with Next.js, React, and Tailwind CSS. Click any preview to explore the full case study dossier.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by technology"
            className="lg:col-span-6 flex flex-wrap lg:justify-end gap-2"
          >
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === 'All'
                  ? projects.length
                  : projects.filter((p) => p.categories.includes(category)).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#070709] font-bold'
                      : 'border border-line bg-surface/60 text-muted hover:text-ink hover:border-ink/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectFilter"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-volt-500 border border-[#070709]/15 -z-10"
                    />
                  )}
                  {category === 'All' ? 'All Projects' : category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: Uniform 2-Column Architectural Browser Grid */}
        {viewMode === 'editorial' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* VIEW 2: Interactive Focus Theater / Stage */}
        {viewMode === 'stage' && stageProject && (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={stageProject.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="editorial-panel rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-editorial-light dark:shadow-editorial-dark"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Interactive Stage Screen */}
                  <div
                    onClick={() => setSelectedProject(stageProject)}
                    data-cursor="view"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(stageProject);
                      }
                    }}
                    className="lg:col-span-7 rounded-2xl overflow-hidden border border-line bg-elevated cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border-b border-line">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated border border-line text-[11px] font-mono text-muted">
                        <Globe className="w-3 h-3 text-cyan-ink" />
                        <span>{getHostLabel(stageProject.liveUrl)}</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-highlight">
                        {String(safeStageIndex + 1).padStart(2, '0')} /{' '}
                        {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={stageProject.image}
                        alt={stageProject.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Stage Info & Controls */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-highlight font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          Theater Mode
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setStageIndex(
                                (safeStageIndex - 1 + filteredProjects.length) %
                                  filteredProjects.length
                              )
                            }
                            aria-label="Previous project"
                            className="w-9 h-9 rounded-full border border-line bg-elevated flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setStageIndex(
                                (safeStageIndex + 1) % filteredProjects.length
                              )
                            }
                            aria-label="Next project"
                            className="w-9 h-9 rounded-full border border-line bg-elevated flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                        {stageProject.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                        {stageProject.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {stageProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-mono bg-elevated border border-line text-ink"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-line flex flex-wrap items-center gap-3">
                      {stageProject.liveUrl && (
                        <Magnetic strength={0.2}>
                          <a
                            href={stageProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-volt"
                          >
                            <span>Live Preview</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Magnetic>
                      )}
                      {stageProject.githubUrl && (
                        <Magnetic strength={0.2}>
                          <a
                            href={stageProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-editorial"
                          >
                            <FaGithub className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Filmstrip Rail */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {filteredProjects.map((proj, idx) => {
                const isSelected = idx === safeStageIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setStageIndex(idx)}
                    className={`group shrink-0 flex items-center gap-3 p-2 pr-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-volt-500 text-[#070709] border-volt-500 shadow-volt-glow'
                        : 'bg-surface/80 border-line text-ink hover:border-highlight/60'
                    }`}
                  >
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-elevated shrink-0">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="text-left">
                      <span
                        className={`block font-mono text-[10px] font-bold ${
                          isSelected ? 'text-[#070709]/75' : 'text-highlight'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="block font-display text-xs font-bold max-w-[130px] truncate">
                        {proj.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: Interactive Editorial Index Table */}
        {viewMode === 'index' && (
          <div
            onMouseMove={handleIndexMouseMove}
            onMouseLeave={() => setHoveredIndexProject(null)}
            className="relative border-t border-line"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onMouseEnter={() => setHoveredIndexProject(project)}
                onClick={() => setSelectedProject(project)}
                data-cursor="view"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="group py-6 border-b border-line flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:px-4 rounded-xl hover:bg-surface/75 transition-all duration-300"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-highlight font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-highlight transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted line-clamp-1 mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-wrap items-center gap-3 md:justify-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="hidden sm:flex items-center gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-line text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-volt-500 text-[#070709] border border-[#070709]/15"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Floating Hover Preview (Desktop only) */}
            <AnimatePresence>
              {hoveredIndexProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  style={{ left: smoothX, top: smoothY }}
                  className="hidden lg:block fixed z-[65] pointer-events-none w-80 aspect-[16/10] rounded-2xl overflow-hidden border border-highlight/60 shadow-2xl bg-surface"
                >
                  <Image
                    src={hoveredIndexProject.image}
                    alt={hoveredIndexProject.title}
                    fill
                    sizes="320px"
                    className="object-cover object-top"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Editorial Slide-Over Case Study Drawer with Prev/Next Navigation */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[90] bg-[#070709]/80 backdrop-blur-md flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl h-full overflow-y-auto bg-canvas text-ink border-l border-line p-6 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-line">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-highlight font-bold">
                    Case Study Dossier
                  </span>

                  <div className="flex items-center gap-2">
                    {filteredProjects.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => stepSelectedProject(-1)}
                          aria-label="Previous case study"
                          className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => stepSelectedProject(1)}
                          aria-label="Next case study"
                          className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:border-highlight hover:text-highlight transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close case study drawer"
                      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-volt-500 hover:text-[#070709] hover:border-volt-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Browser Framed Drawer Preview */}
                <div className="mt-6 rounded-2xl overflow-hidden border border-line bg-elevated">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-line">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="font-mono text-[11px] text-muted truncate max-w-[260px]">
                      {getHostLabel(selectedProject.liveUrl)}
                    </span>
                    <Globe className="w-3.5 h-3.5 text-cyan-ink" />
                  </div>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {selectedProject.categoryLabel && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-elevated text-highlight border border-highlight/35 font-bold">
                      {selectedProject.categoryLabel}
                    </span>
                  )}
                  {selectedProject.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-volt-500 text-[#070709] border border-[#070709]/15 font-bold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h3
                  id="case-study-title"
                  className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-ink"
                >
                  {selectedProject.title}
                </h3>

                <p className="mt-4 text-base text-muted leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.purpose && (
                  <div className="mt-6 rounded-2xl border border-line bg-surface/65 p-4 sm:p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-highlight font-bold mb-1.5">
                      Project Purpose
                    </p>
                    <p className="text-sm text-ink/90 leading-relaxed">
                      {selectedProject.purpose}
                    </p>
                  </div>
                )}

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-line">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle mb-3">
                      Key Features
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-muted leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-highlight shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-line">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle mb-3">
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-elevated border border-line text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-line flex flex-wrap gap-3">
                {selectedProject.liveUrl && (
                  <Magnetic strength={0.2}>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-volt"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Magnetic>
                )}

                {selectedProject.githubUrl && (
                  <Magnetic strength={0.2}>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
