import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ParticleCanvasProps {
  className?: string;
}

class Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  color: string;
  
  constructor(
    width: number,
    height: number,
    isDarkMode: boolean,
    maxSpeed: number = 0.4
  ) {
    this.x = Math.random() * width - width / 2;
    this.y = Math.random() * height - height / 2;
    this.z = Math.random() * 500;
    this.size = Math.random() * 2 + 0.5;
    
    // Slower speeds for more elegant movement
    this.speedX = (Math.random() - 0.5) * maxSpeed;
    this.speedY = (Math.random() - 0.5) * maxSpeed;
    this.speedZ = Math.random() * maxSpeed + 0.2;
    
    this.color = isDarkMode
      ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${0.6 + Math.random() * 0.4})`
      : `rgba(0, 50, ${150 + Math.random() * 105}, ${0.3 + Math.random() * 0.5})`;
  }
  
  update(width: number, height: number, depth: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z -= this.speedZ;
    
    if (this.z <= 0) {
      this.z = depth;
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
    }
  }
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150;
    const maxDistance = 120;
    const depth = 600;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate particles when canvas is resized
      initParticles();
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height, isDarkMode));
      }
    };
    
    // Draw a single particle
    const drawParticle = (particle: Particle) => {
      const scale = depth / (depth + particle.z);
      const x = particle.x * scale + canvas.width / 2;
      const y = particle.y * scale + canvas.height / 2;
      const size = particle.size * scale;
      
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      return { x, y, size, scale };
    };
    
    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const drawnParticles = particles.map(drawParticle);
      
      for (let i = 0; i < drawnParticles.length; i++) {
        for (let j = i + 1; j < drawnParticles.length; j++) {
          const dx = drawnParticles[i].x - drawnParticles[j].x;
          const dy = drawnParticles[i].y - drawnParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15; // Lower opacity for subtlety
            
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? `rgba(100, 100, 255, ${opacity})`
              : `rgba(0, 50, 200, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(drawnParticles[i].x, drawnParticles[i].y);
            ctx.lineTo(drawnParticles[j].x, drawnParticles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, depth);
      });
      
      connectParticles(); // Draw particles and connect them
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);
  
  return <canvas ref={canvasRef} className={className} />;
};

export default ParticleCanvas;