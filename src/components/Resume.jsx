'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import Magnetic from './motion/Magnetic';
import SplitText from './motion/SplitText';

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumePath;
    link.download = personalInfo.resumeDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dossierStats = [
    { k: 'Candidate', v: personalInfo.name },
    { k: 'Specialization', v: 'Next.js • React.js • Tailwind CSS' },
    { k: 'Current Role', v: 'Frontend Developer @ Digistartp UK' },
    { k: 'Education', v: 'BS Computer Science (COMSATS, 2026)' },
    { k: 'Languages', v: personalInfo.languages.join(' / ') },
    { k: 'Document Format', v: 'PDF — Ready for Download & Review' },
  ];

  return (
    <section
      id="resume"
      className="py-24 md:py-36 bg-contrast-canvas text-contrast-ink relative overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-contrast-line">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-contrast-muted flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>05 / Curriculum Vitae</span>
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-contrast-muted">
            {personalInfo.resumeDownloadName}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Editorial Statement & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.03]">
              <SplitText text="Executive" mode="words" />{' '}
              <span className="font-serif italic font-normal text-contrast-highlight">
                Dossier
              </span>
            </h2>

            <p className="text-contrast-muted text-base sm:text-lg leading-relaxed max-w-lg">
              Download the complete PDF copy of my resume or inspect it directly inline in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Magnetic strength={0.24}>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-display font-bold text-sm bg-volt-500 text-[#070709] border border-[#070709]/15 hover:shadow-volt-glow transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <button
                  type="button"
                  onClick={() => setShowPreview((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-bold text-sm border border-contrast-line text-contrast-ink hover:bg-contrast-ink hover:text-contrast-canvas transition-colors"
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Close Preview</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>View Online</span>
                    </>
                  )}
                </button>
              </Magnetic>

              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider text-contrast-muted hover:text-contrast-ink underline underline-offset-4"
              >
                <span>Open PDF Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Specification Ledger */}
          <div className="lg:col-span-6 rounded-3xl border border-contrast-line bg-contrast-surface p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-contrast-line">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-contrast-muted">
                CV Summary Sheet
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-volt-500 text-[#070709]">
                VERIFIED PDF
              </span>
            </div>

            <div className="divide-y divide-contrast-line">
              {dossierStats.map((row) => (
                <div
                  key={row.k}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-contrast-muted">
                    {row.k}
                  </span>
                  <span className="text-sm font-semibold text-contrast-ink sm:text-right">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expandable Inline PDF Viewer */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-12 pt-10 border-t border-contrast-line">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg text-contrast-ink">
                    Online PDF Preview
                  </h3>
                  <a
                    href={personalInfo.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-contrast-highlight hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open Fullscreen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="w-full h-[560px] sm:h-[680px] rounded-2xl overflow-hidden border border-contrast-line bg-white">
                  <iframe
                    src={`${personalInfo.resumePath}#view=FitH`}
                    title="Kashif Saeed Resume PDF Preview"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
