import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CustomCursor from '../components/CustomCursor';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-dark-950 text-white selection:bg-accent/30 overflow-hidden">
      <CustomCursor />
      
      {/* Global Animated Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Global Grid Overlay */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>
        <div className="h-full w-full bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Navbar />
      <main className="relative z-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
