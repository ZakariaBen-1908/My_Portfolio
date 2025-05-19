import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { MoonIcon, SunIcon, Menu, X } from 'lucide-react';

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full"
  >
    {text}
  </a>
);

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
          ZB
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#home" text={t('nav.home')} />
          <NavLink href="#about" text={t('nav.about')} />
          <NavLink href="#experience" text={t('nav.experience')} />
          <NavLink href="#projects" text={t('nav.projects')} />
          <NavLink href="#skills" text={t('nav.skills')} />
          <NavLink href="#contact" text={t('nav.contact')} />
        </nav>
        
        {/* Controls (Theme, Language) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          {/* Language Toggle */}
          <div className="flex space-x-2 text-sm font-medium">
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('fr')} 
              className={`px-2 py-1 rounded transition-colors ${
                language === 'fr'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              FR
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-16 animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            <NavLink href="#home" text={t('nav.home')} onClick={closeMenu} />
            <NavLink href="#about" text={t('nav.about')} onClick={closeMenu} />
            <NavLink href="#experience" text={t('nav.experience')} onClick={closeMenu} />
            <NavLink href="#projects" text={t('nav.projects')} onClick={closeMenu} />
            <NavLink href="#skills" text={t('nav.skills')} onClick={closeMenu} />
            <NavLink href="#contact" text={t('nav.contact')} onClick={closeMenu} />
            
            <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              {/* Theme Toggle Mobile */}
              <button 
                onClick={() => { toggleDarkMode(); closeMenu(); }} 
                className="flex items-center space-x-2 p-2"
              >
                {isDarkMode ? (
                  <>
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 text-gray-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              
              {/* Language Toggle Mobile */}
              <div className="flex space-x-2 text-sm font-medium">
                <button 
                  onClick={() => { setLanguage('en'); closeMenu(); }} 
                  className={`px-3 py-2 rounded ${
                    language === 'en'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                      : ''
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLanguage('fr'); closeMenu(); }} 
                  className={`px-3 py-2 rounded ${
                    language === 'fr'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                      : ''
                  }`}
                >
                  Français
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;