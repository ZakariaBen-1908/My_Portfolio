import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              Zakaria Bencheikh
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t('footer.designed')}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/ZakariaBen-1908" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/zakaria-bencheikh-929a87205/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a 
              href="mailto:zakariabencheikh1908@gmail.com"
              className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} Zakaria Bencheikh. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;