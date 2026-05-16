import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [logoRef, isLogoInView] = useInView({ once: true, delay: 0 });
  const [linksRef, isLinksInView] = useInView({ once: true, delay: 100 });
  const [socialRef, isSocialInView] = useInView({ once: true, delay: 200 });

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div
              ref={logoRef}
              className="text-3xl font-bold text-gradient mb-4 transition-all duration-600"
              style={{
                opacity: isLogoInView ? 1 : 0,
                transform: isLogoInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {personalInfo.name.split(' ')[0]}
            </div>
            <p className="text-dark-300 text-sm max-w-xs mx-auto md:mx-0">
              {personalInfo.title}. Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div
              ref={linksRef}
              className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm transition-all duration-600"
              style={{
                opacity: isLinksInView ? 1 : 0,
                transform: isLinksInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-dark-300 hover:text-accent transition-colors hover-lift"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
              { icon: FaWhatsapp, href: 'https://wa.me/923001234567?text=Hello%20Kashif', label: 'WhatsApp' }
            ].map(({ icon: Icon, href, label }, idx) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center
                         text-dark-300 hover:text-white transition-all hover-lift"
                style={{
                  transitionDelay: isSocialInView ? `${idx * 50}ms` : '0ms',
                  opacity: isSocialInView ? 1 : 0,
                  transform: isSocialInView ? 'translateY(0)' : 'translateY(20px)'
                }}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-800 text-center">
          <p className="text-dark-400 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-dark-500 text-xs mt-2 flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500" size={12} /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
