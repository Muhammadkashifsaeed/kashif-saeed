'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from './ThemeProvider';
import Magnetic from './motion/Magnetic';

const navLinks = [
  { num: '01', name: 'Home', href: '#home' },
  { num: '02', name: 'About', href: '#about' },
  { num: '03', name: 'Skills', href: '#skills' },
  { num: '04', name: 'Projects', href: '#projects' },
  { num: '05', name: 'Experience', href: '#experience' },
  { num: '06', name: 'Resume', href: '#resume' },
  { num: '07', name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        setLocalTime('');
      }
    };
    updateClock();
    const id = setInterval(updateClock, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
      const scrollPosition = window.scrollY + 160;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionId = navLinks[i].href.slice(1);
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Primary Navigation"
            className={`flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'editorial-panel shadow-editorial-light dark:shadow-editorial-dark'
                : 'bg-surface/40 backdrop-blur-md border border-line/60'
            }`}
          >
            {/* Brand + Live Time */}
            <div className="flex items-center gap-4">
              <Magnetic strength={0.2}>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, '#home')}
                  className="flex items-center gap-2.5 group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-volt-500 text-[#070709] font-display font-extrabold text-xs tracking-tight transition-transform duration-300 group-hover:rotate-12">
                    {personalInfo.initials}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base tracking-tight text-ink">
                    {personalInfo.name}
                  </span>
                </a>
              </Magnetic>

              {localTime && (
                <span className="hidden xl:inline-flex items-center gap-1.5 pl-3 border-l border-line text-[11px] font-mono text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt-500 animate-pulse" />
                  LHE {localTime}
                </span>
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <Magnetic key={link.name} strength={0.18}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-[#070709] font-bold' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeEditorialNav"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-volt-500 -z-10"
                        />
                      )}
                      {link.name}
                    </a>
                  </Magnetic>
                );
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={mounted && theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="w-9 h-9 rounded-full border border-line bg-surface/80 hover:border-ink flex items-center justify-center text-ink transition-colors"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mounted && theme === 'light' ? (
                      <motion.span
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Moon className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Sun className="w-4 h-4 text-volt-500" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-ink text-canvas hover:bg-volt-500 hover:text-[#070709] transition-colors duration-250"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                className="lg:hidden w-9 h-9 rounded-full border border-line bg-surface/80 flex items-center justify-center text-ink"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Full-Screen Editorial Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#070709] text-[#f4f1ea] flex flex-col justify-between px-6 pt-28 pb-10"
          >
            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#9e9a90] mb-4">
                Navigation
              </p>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.04, duration: 0.4 }}
                    className="flex items-baseline justify-between py-2.5 border-b border-white/10 group"
                  >
                    <span
                      className={`font-display text-3xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-volt-500' : 'text-[#f4f1ea] group-hover:text-volt-500'
                      }`}
                    >
                      {link.name}
                    </span>
                    <span className="font-mono text-xs text-[#9e9a90]">{link.num}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-[#9e9a90]">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
