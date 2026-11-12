'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import Magnetic from './motion/Magnetic';

const footerNav = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const coreStack = ['Next.js', 'React.js', 'Tailwind CSS', 'Framer Motion'];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: -5, opacity: 0.4 },
        {
          xPercent: 4,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumePath;
    link.download = personalInfo.resumeDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socials = [
    {
      name: 'GitHub',
      icon: FaGithub,
      href: personalInfo.social.github,
      hoverStyle:
        'hover:text-white hover:bg-[#181717] hover:border-white/40 hover:shadow-[0_12px_28px_-6px_rgba(255,255,255,0.28)]',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: personalInfo.social.linkedin,
      hoverStyle:
        'hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_12px_28px_-6px_rgba(10,102,194,0.55)]',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: personalInfo.social.whatsapp,
      hoverStyle:
        'hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_12px_28px_-6px_rgba(37,211,102,0.55)]',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: personalInfo.social.instagram,
      hoverStyle:
        'hover:text-white hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-pink-400/60 hover:shadow-[0_12px_28px_-6px_rgba(221,42,123,0.55)]',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: personalInfo.social.facebook,
      hoverStyle:
        'hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_12px_28px_-6px_rgba(24,119,242,0.55)]',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      hoverStyle:
        'hover:text-[#070709] hover:bg-volt-500 hover:border-volt-500 hover:shadow-volt-glow',
    },
  ];

  return (
    <footer className="relative border-t border-line bg-surface/70 backdrop-blur-md pt-16 pb-8 overflow-hidden">
      {/* Top Glowing Accent Hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-highlight/70 to-transparent"
      />

      {/* Ambient Footer Glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[720px] h-64 rounded-full bg-volt-500/[0.06] blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Availability & CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="editorial-panel rounded-[2rem] p-6 sm:p-8 mb-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-highlight font-bold">
              <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
              {personalInfo.availability}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Let&apos;s craft your next{' '}
              <span className="font-serif italic font-normal text-highlight">
                web experience.
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-line bg-elevated/80 text-xs sm:text-sm font-mono text-ink hover:border-highlight transition-colors"
            >
              <Mail className="w-4 h-4 text-highlight" />
              <span>{personalInfo.email}</span>
            </a>

            <Magnetic strength={0.22}>
              <a href="#contact" className="btn-volt">
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-line">
          {/* Column 1: Brand & Contact Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-full bg-volt-500 text-[#070709] font-display font-extrabold text-sm flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                {personalInfo.initials}
              </span>
              <div>
                <p className="font-display font-bold text-xl text-ink leading-none">
                  {personalInfo.name}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted mt-1">
                  {personalInfo.title}
                </p>
              </div>
            </a>

            <p className="text-sm text-muted max-w-md leading-relaxed">
              Building responsive, high-performing web applications with Next.js, React, and Tailwind CSS — focused on clean architecture and thoughtful motion.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-mono text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-highlight" />
                {personalInfo.location}
              </span>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 hover:text-highlight transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-ink" />
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle mb-4">
              Explore
            </p>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-2.5 gap-x-4 text-sm">
                {footerNav.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-muted hover:text-ink transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-line group-hover:bg-highlight transition-colors" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Core Stack & Resume */}
          <div className="md:col-span-4 space-y-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle mb-4">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-elevated/80 border border-line text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-elevated/70 text-xs font-display font-bold uppercase tracking-wider text-ink hover:border-highlight hover:text-highlight transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monumental Editorial Signature */}
        <div className="py-7 sm:py-9 overflow-hidden select-none" aria-hidden="true">
          <p
            ref={wordmarkRef}
            className="font-display font-extrabold tracking-[-0.03em] text-center leading-none text-[clamp(2.5rem,10vw,8rem)] text-stroke-ink opacity-55 whitespace-nowrap will-change-transform"
          >
            <span className="text-[1.15em]">K</span>ashif{' '}
            <span className="text-[1.15em]">S</span>aeed
            <span className="text-highlight ml-1">.</span>
          </p>
        </div>

        {/* Bottom Bar: Copyright + Single-Line Enhanced Social Icons */}
        <div className="pt-6 border-t border-line flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-xs font-mono text-muted space-y-1">
            <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
            <p className="text-subtle">Crafted with Next.js, Framer Motion, GSAP &amp; Tailwind CSS</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((item, idx) => {
              const Icon = item.icon;
              const isEmail = item.href.startsWith('mailto:');

              return (
                <Magnetic key={item.name} strength={0.3}>
                  <motion.a
                    href={item.href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    aria-label={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className={`group relative w-11 h-11 rounded-full border border-line bg-elevated/85 backdrop-blur-sm flex items-center justify-center text-muted transition-all duration-300 ${item.hoverStyle}`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-ink text-canvas font-mono text-[10px] font-bold tracking-wider uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap shadow-lg">
                      {item.name}
                    </span>
                  </motion.a>
                </Magnetic>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
