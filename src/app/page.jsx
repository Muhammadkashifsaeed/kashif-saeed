import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CustomCursor from '../components/CustomCursor';
import PageLoader from '../components/PageLoader';
import ScrollProgress from '../components/ScrollProgress';
import ErrorBoundary from '../components/ErrorBoundary';
import Atmosphere from '../components/motion/Atmosphere';

export default function Page() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-canvas text-ink overflow-x-clip">
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <Atmosphere />

        {/* Architectural Hairline Grid */}
        <div
          className="fixed inset-0 -z-20 pointer-events-none bg-editorial-grid"
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 35%, transparent 82%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 35%, transparent 82%)',
          }}
          aria-hidden="true"
        />

        <Navbar />

        <main id="main-content" className="relative z-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}
