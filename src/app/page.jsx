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
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow"
          style={{ animationDelay: '3s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Global Grid Overlay */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:50px_50px]" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />
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
