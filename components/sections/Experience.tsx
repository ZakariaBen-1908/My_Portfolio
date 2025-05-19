import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { resumeDataEN, resumeDataFR } from '../../data/resumeData';
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from 'lucide-react';

const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const resumeData = language === 'en' ? resumeDataEN : resumeDataFR;
  
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {resumeData.experience.map((experience, index) => (
            <div 
              key={index} 
              className="relative pl-8 pb-12 group"
            >
              {/* Timeline line */}
              {index !== resumeData.experience.length - 1 && (
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <BriefcaseIcon className="h-3 w-3 text-white" />
              </div>
              
              {/* Content card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ml-6 transition-all hover:shadow-lg transform group-hover:translate-y-[-4px]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.position}
                    </h3>
                    <h4 className="text-primary-600 dark:text-primary-400 font-medium">
                      {experience.company}
                    </h4>
                  </div>
                  
                  <div className="flex flex-col mt-2 md:mt-0 md:items-end text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="mt-4 space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                      <p className="text-gray-700 dark:text-gray-300">{responsibility}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;