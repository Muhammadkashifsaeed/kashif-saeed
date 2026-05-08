import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // ✅ WhatsApp link banane ka safe tarika
  const getWhatsAppLink = () => {
    const whatsappNumber = personalInfo.social?.whatsapp || personalInfo.whatsapp || '923001234567';
   return `https://wa.me/3062933633`; 
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      } ${isMounted ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ transitionProperty: 'transform, background-color, padding' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="text-2xl font-bold text-gradient hover-scale" style={{ display: 'inline-block' }}>
            Portfolio by Kashif
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative text-sm font-medium transition-colors duration-300 hover:-translate-y-0.5 ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Social Icons & CTA - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {[
              { icon: FaGithub, href: personalInfo.social?.github || '#', label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.social?.linkedin || '#', label: 'LinkedIn' },
              { icon: FaFacebook, href: personalInfo.social?.facebook || '#', label: 'Facebook' },
              { icon: FaInstagram, href: personalInfo.social?.instagram || '#', label: 'Instagram' },
              { icon: FaWhatsapp, href: getWhatsAppLink(), label: 'WhatsApp' },  // ✅ Fixed
              { icon: FaEnvelope, href: `mailto:${personalInfo.email || 'kashifsaeed8856@gmail.com'}`, label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href?.startsWith('mailto:') ? undefined : '_blank'}
                rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="text-dark-300 hover:text-white transition-colors hover-lift"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-primary text-sm hover-scale tap-scale"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none hover-lift"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ overflow: 'hidden' }}
      >
        {isMobileMenuOpen && (
          <div className="glass-nav mx-4 mt-3 rounded-xl overflow-hidden">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block py-2 text-base font-medium transition-colors hover:translate-x-2 ${
                    activeSection === link.href.slice(1)
                      ? 'text-accent'
                      : 'text-dark-200 hover:text-white'
                  }`}
                  style={{
                    transitionDuration: '200ms',
                    transitionDelay: `${index * 30}ms`
                  }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex justify-center space-x-6">
                {[
                  { icon: FaGithub, href: personalInfo.social?.github || '#' },
                  { icon: FaLinkedin, href: personalInfo.social?.linkedin || '#' },
                  { icon: FaFacebook, href: personalInfo.social?.facebook || '#' },
                  { icon: FaInstagram, href: personalInfo.social?.instagram || '#' },
                  { icon: FaWhatsapp, href: getWhatsAppLink() },  // ✅ Fixed
                  { icon: FaEnvelope, href: `mailto:${personalInfo.email || 'kashifsaeed8856@gmail.com'}` }
                ].map(({ icon: Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target={href?.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-dark-300 hover:text-white hover-lift"
                    aria-label="Social link"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;