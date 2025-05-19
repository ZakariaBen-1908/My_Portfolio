import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { resumeDataEN, resumeDataFR } from '../../data/resumeData';
import { GithubIcon, ExternalLinkIcon } from 'lucide-react';

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const resumeData = language === 'en' ? resumeDataEN : resumeDataFR;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  // Reset transform on mouse leave
  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setActiveIndex(null);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 transform"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transition: 'transform 0.2s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 👇 Clickable image that takes to the GitHub repo */}
              <a
                href={project.github} // <-- Link to the project GitHub repository
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-48 overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.date}</p>
                  </div>
                </div>
              </a>

              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {project.technologies}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                  >
                    <GithubIcon className="h-4 w-4 mr-2" />
                    {t('projects.viewGithub')}
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label="External Link"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
