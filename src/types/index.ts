export interface Contact {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  license: string;
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  technologies: string;
  github: string;
  image: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  embedded: string[];
  tools: string[];
  other: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: Contact;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  certifications: string[];
  languages: Language[];
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface LanguageContextType {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  t: (key: string) => string;
}