import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Experience from './components/Experience';
import Contact from './components/Contact';
// import ContactForm from './components/ContactForm';  // ✅ NAYA ADDED
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white selection:bg-accent/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Experience />
        <Contact />
        
        {/* ✅ NAYA - ContactForm Component Add Kiya
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Or Send me a Message</h2>
            <ContactForm />
          </div>
        </section> */}
        {/* ✅ ADDITION END */}
        
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;