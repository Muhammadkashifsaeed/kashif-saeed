'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import Magnetic from './motion/Magnetic';
import SplitText from './motion/SplitText';

const SERVICE_ID = 'service_oaf18e6';
const TEMPLATE_ID = 'template_wkd794c';
const PUBLIC_KEY = 'qFJSc5OzquI84lY6L';

export default function Contact() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Clipboard API unavailable
    }
  };

  const validate = (formData) => {
    const nextErrors = {};
    const name = String(formData.get('from_name') || '').trim();
    const email = String(formData.get('from_email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (name.length < 2) nextErrors.from_name = 'Please enter your name.';
    if (!email) {
      nextErrors.from_email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.from_email = 'Please enter a valid email address.';
    }
    if (subject.length < 3) nextErrors.subject = 'Please enter a subject.';
    if (message.length < 10) nextErrors.message = 'Please write at least 10 characters.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const formData = new FormData(formRef.current);
    if (!validate(formData)) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus({
        type: 'success',
        text: 'Message delivered. Thank you for reaching out — I will respond shortly.',
      });
      formRef.current.reset();
      setErrors({});
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus({
        type: 'error',
        text: `Could not submit via form right now. Please write directly to ${personalInfo.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-line">
          <span className="index-tag">
            <MessageSquare className="w-3.5 h-3.5 text-highlight" />
            <span>06 / Initiate Collaboration</span>
          </span>
          <span className="font-mono text-xs text-muted">
            {personalInfo.availability}
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="mb-14 max-w-4xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[0.98]">
            <SplitText text="Let's build something" mode="words" />{' '}
            <span className="font-serif italic font-normal text-highlight">
              extraordinary.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels (No Social Icons Here — Footer Only) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="editorial-panel rounded-[2rem] p-6 sm:p-8 space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                Direct Channels
              </p>

              {/* Email + Copy */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-line">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 min-w-0 group"
                >
                  <span className="w-10 h-10 rounded-full border border-line bg-elevated flex items-center justify-center text-highlight shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-ink group-hover:text-highlight transition-colors truncate">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="w-9 h-9 rounded-full border border-line bg-surface hover:border-highlight flex items-center justify-center text-muted hover:text-highlight transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-highlight" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 py-3 border-b border-line group"
              >
                <span className="w-10 h-10 rounded-full border border-line bg-elevated flex items-center justify-center text-cyan-ink shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Phone
                  </p>
                  <p className="text-sm font-semibold text-ink group-hover:text-highlight transition-colors">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 py-3 border-b border-line">
                <span className="w-10 h-10 rounded-full border border-line bg-elevated flex items-center justify-center text-signal-ink shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {personalInfo.location}
                  </p>
                </div>
              </div>

              {/* Availability & Languages */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl bg-elevated/70 border border-line p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
                    <Clock className="w-3.5 h-3.5 text-highlight" />
                    Response
                  </div>
                  <p className="text-sm font-semibold text-ink mt-1">Within 24h</p>
                </div>
                <div className="rounded-2xl bg-elevated/70 border border-line p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
                    <Globe className="w-3.5 h-3.5 text-cyan-ink" />
                    Languages
                  </div>
                  <p className="text-sm font-semibold text-ink mt-1">
                    {personalInfo.languages.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Brief Form */}
          <div className="lg:col-span-7">
            <div className="editorial-panel rounded-[2rem] p-6 sm:p-10">
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="from_name"
                      className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                    >
                      01 / Your Name
                    </label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      placeholder="John Doe"
                      onChange={() =>
                        errors.from_name &&
                        setErrors((prev) => ({ ...prev, from_name: undefined }))
                      }
                      className={`w-full px-4 py-3.5 rounded-2xl bg-elevated/80 border text-ink placeholder:text-subtle focus:outline-none focus:border-highlight transition-colors ${
                        errors.from_name ? 'border-signal-ink' : 'border-line'
                      }`}
                    />
                    {errors.from_name && (
                      <p className="mt-1.5 text-xs text-signal-ink font-medium">{errors.from_name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="from_email"
                      className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                    >
                      02 / Email Address
                    </label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      onChange={() =>
                        errors.from_email &&
                        setErrors((prev) => ({ ...prev, from_email: undefined }))
                      }
                      className={`w-full px-4 py-3.5 rounded-2xl bg-elevated/80 border text-ink placeholder:text-subtle focus:outline-none focus:border-highlight transition-colors ${
                        errors.from_email ? 'border-signal-ink' : 'border-line'
                      }`}
                    />
                    {errors.from_email && (
                      <p className="mt-1.5 text-xs text-signal-ink font-medium">{errors.from_email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                  >
                    03 / Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Frontend Role, Project Inquiry, or Collaboration"
                    onChange={() =>
                      errors.subject &&
                      setErrors((prev) => ({ ...prev, subject: undefined }))
                    }
                    className={`w-full px-4 py-3.5 rounded-2xl bg-elevated/80 border text-ink placeholder:text-subtle focus:outline-none focus:border-highlight transition-colors ${
                      errors.subject ? 'border-signal-ink' : 'border-line'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-signal-ink font-medium">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                  >
                    04 / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, goals, or timeline..."
                    onChange={() =>
                      errors.message &&
                      setErrors((prev) => ({ ...prev, message: undefined }))
                    }
                    className={`w-full px-4 py-3.5 rounded-2xl bg-elevated/80 border text-ink placeholder:text-subtle resize-none focus:outline-none focus:border-highlight transition-colors ${
                      errors.message ? 'border-signal-ink' : 'border-line'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-signal-ink font-medium">{errors.message}</p>
                  )}
                </div>

                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`rounded-2xl p-4 flex items-start gap-3 text-sm border ${
                        status.type === 'success'
                          ? 'bg-highlight/10 border-highlight/35 text-ink'
                          : 'bg-signal-ink/10 border-signal-ink/35 text-ink'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-signal-ink shrink-0 mt-0.5" />
                      )}
                      <span>{status.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <Magnetic strength={0.22}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-volt disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </Magnetic>

                  <span className="font-mono text-xs text-muted">
                    Social links available in footer ↓
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
