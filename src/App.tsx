import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience.tsx';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Credits from './components/Credits';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import BackgroundGlow from './components/BackgroundGlow';
import CursorTrail from './components/CursorTrail';

const App: React.FC = () => {
  return (
    <div className="app">
      <BackgroundGlow />
      <CustomCursor />
      <CursorTrail />
      <StarBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Credits />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
