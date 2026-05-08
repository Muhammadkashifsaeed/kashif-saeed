import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [mainRef, isMainInView] = useInView({ once: true });

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Kashif_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = {
    github: personalInfo.social?.github || 'https://github.com/',
    linkedin: personalInfo.social?.linkedin || 'https://linkedin.com/in/',
    facebook: personalInfo.social?.facebook || 'https://facebook.com/',
    instagram: personalInfo.social?.instagram || 'https://instagram.com/',
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          ref={mainRef}
          className="grid lg:grid-cols-2 gap-12 items-center transition-opacity duration-800"
          style={{
            opacity: isMainInView ? 1 : 0,
            transitionDelay: '300ms'
          }}
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div
              className="transition-all duration-700"
              style={{
                opacity: isMainInView ? 1 : 0,
                transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '300ms'
              }}
            >
              <p className="text-xl text-gray-600 font-medium tracking-wide">
                Welcome in My Feed
              </p>
            </div>

            <div
              className="transition-all duration-700 mt-6"
              style={{
                opacity: isMainInView ? 1 : 0,
                transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '500ms'
              }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Hello, I'm a
              </h1>
              <span className="text-4xl md:text-6xl font-bold text-green-600 block mt-2">
                <ReactTyped
                   strings={["Frontend Developer", "I am a prgrammer", "I Love Codaing"]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop={true}
                />
              </span>
            </div>

            <p
              className="text-lg md:text-xl text-dark-200 max-w-2xl mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed transition-all duration-700"
              style={{
                opacity: isMainInView ? 1 : 0,
                transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '700ms'
              }}
            >
              {personalInfo.tagline || 'Crafting beautiful web experiences with modern technologies'}
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 transition-all duration-700"
              style={{
                opacity: isMainInView ? 1 : 0,
                transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '900ms'
              }}
            >
              <a href="#projects" className="btn-primary flex items-center gap-2 hover-scale tap-scale">
                View Projects
              </a>
              <a href="#contact" className="btn-secondary flex items-center gap-2 hover-scale tap-scale">
                <FaEnvelope />
                Contact Me
              </a>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-dark-600
                       text-dark-200 hover:text-white hover:border-accent
                       transition-all duration-300 hover-scale tap-scale"
              >
                <FaDownload />
                Resume
              </button>
            </div>

            {/* Social Links - ✅ FIXED: Added missing <a> tag */}
            <div
              className="flex items-center justify-center lg:justify-start gap-6 mt-10 transition-all duration-700"
              style={{
                opacity: isMainInView ? 1 : 0,
                transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '1100ms'
              }}
            >
              {[
                { icon: FaGithub, href: socialLinks.github },
                { icon: FaLinkedin, href: socialLinks.linkedin },
                { icon: FaFacebook, href: socialLinks.facebook },
                { icon: FaInstagram, href: socialLinks.instagram },
                { icon: FaEnvelope, href: `mailto:${personalInfo.email || 'kashifsaeed8856@gmail.com'}` }
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="text-dark-400 hover:text-white transition-colors cursor-pointer hover-lift"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div
            className="relative hidden lg:block transition-all duration-700"
            style={{
              opacity: isMainInView ? 1 : 0,
              transform: isMainInView ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '1300ms'
            }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">

              {/* Decorative rings */}
              <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-spin-reverse" />

              {/* Image container */}
              <div className="absolute inset-8 glass rounded-full overflow-hidden z-10">
                <img
                  src="/kashif.png"
                  alt={personalInfo.name || 'Kashif'}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name || 'Kashif')}&background=0D9488&color=fff&size=400`;
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        style={{ opacity: showScrollIndicator ? 1 : 0 }}
      >
        <div className="w-6 h-10 border-2 border-dark-500 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-2 bg-accent rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;