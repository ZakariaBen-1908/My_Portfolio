import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { resumeDataEN, resumeDataFR } from '../../data/resumeData';
import { ArrowDownIcon } from 'lucide-react';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resumeData = language === 'en' ? resumeDataEN : resumeDataFR;
  
  // 3D animation effect with particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle system
    const particleCount = 100;
    const particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = isDarkMode ? 
          `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${0.3 + Math.random() * 0.4})` : 
          `rgba(0, 50, ${150 + Math.random() * 105}, ${0.2 + Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connect particles with lines if they're close enough
    function connectParticles() {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? 
              `rgba(100, 100, 255, ${0.1 * (1 - distance / maxDistance)})` : 
              `rgba(0, 50, 200, ${0.05 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isDarkMode]);
  
  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* 3D background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:w-1/2">
            <p className="text-primary-600 dark:text-primary-400 mb-4 font-mono animate-fade-in-up">
              {t('home.greeting')}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-100">
              {resumeData.name}
            </h1>
            <h2 className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
              {resumeData.title}
            </h2>
            <p className="max-w-2xl mx-auto md:mx-0 text-gray-600 dark:text-gray-400 mb-12 text-lg animate-fade-in-up animation-delay-300">
              {resumeData.summary}
            </p>
            <a
              href="#projects"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              {t('home.cta')}
            </a>
          </div>
          
          {/* Profile Image */}
          <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end animate-fade-in-up animation-delay-200">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900 rounded-full transform -rotate-6 transition-transform group-hover:rotate-6"></div>
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGzJo-cnmVBwg/profile-displayphoto-shrink_800_800/B4EZY_Wn3NHYAk-/0/1744819619019?e=1753920000&v=beta&t=wXI0xthyCp934fB88Ga7NJWtl9Ve8sebuSAe5U_jfnQ"
                alt="Zakaria Bencheikh"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl transform transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
      </div>
    </section>
  );
};

export default Hero;