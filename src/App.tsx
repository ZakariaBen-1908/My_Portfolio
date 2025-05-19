import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ParticleCanvas from './components/3d/ParticleCanvas';

import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {/* Background particle animation */}
          <ParticleCanvas className="fixed inset-0 z-0 opacity-40" />
          
          <Header />
          
          <main className="relative z-10">
            <Hero />
            <Experience />
            <Education />
            <Projects />
            <Skills />
            <Contact />
          </main>
          
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;