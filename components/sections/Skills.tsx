import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { resumeDataEN, resumeDataFR } from '../../data/resumeData';
import { CodeIcon, LayersIcon, ShipIcon as ChipIcon, PenToolIcon as ToolIcon, StarIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400 mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const resumeData = language === 'en' ? resumeDataEN : resumeDataFR;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation for skills on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      const skills = containerRef.current.querySelectorAll('.skill-card');
      skills.forEach((skill, index) => {
        const delay = index * 100;
        skill.classList.add(`animation-delay-${delay}`);
        observer.observe(skill);
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Certification and language section
  const renderCertificationsAndLanguages = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <StarIcon className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
          {t('certifications.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('certifications.subtitle')}
        </p>
        <ul className="space-y-2">
          {resumeData.certifications.map((certification, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
              <p className="text-gray-700 dark:text-gray-300">{certification}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          {t('languages.title')}
        </h3>
        <div className="space-y-4">
          {resumeData.languages.map((language, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{language.name}</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{language.level}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full" 
                  style={{ width: language.level === "Fluent" ? "95%" : "70%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="skill-card">
            <SkillCard
              title={t('skills.languages')}
              skills={resumeData.skills.languages}
              icon={<CodeIcon className="h-6 w-6" />}
            />
          </div>
          <div className="skill-card">
            <SkillCard
              title={t('skills.frameworks')}
              skills={resumeData.skills.frameworks}
              icon={<LayersIcon className="h-6 w-6" />}
            />
          </div>
          <div className="skill-card">
            <SkillCard
              title={t('skills.embedded')}
              skills={resumeData.skills.embedded}
              icon={<ChipIcon className="h-6 w-6" />}
            />
          </div>
          <div className="skill-card">
            <SkillCard
              title={t('skills.tools')}
              skills={resumeData.skills.tools}
              icon={<ToolIcon className="h-6 w-6" />}
            />
          </div>
          <div className="skill-card lg:col-span-2">
            <SkillCard
              title={t('skills.other')}
              skills={resumeData.skills.other}
              icon={<StarIcon className="h-6 w-6" />}
            />
          </div>
        </div>
        
        {renderCertificationsAndLanguages()}
      </div>
    </section>
  );
};

export default Skills;