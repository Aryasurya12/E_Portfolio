export type SectionType = 'home' | 'projects' | 'skills' | 'competitions' | 'about' | 'contact' | 'not-found';

export interface Project {
  id: string;
  title: string;
  category: string | string[];
  tags: string[];
  description: string;
  image: string; // Used as thumbnail or fallback
  gallery?: string[]; // Array of images for carousel
  longDescription?: string;
  features?: string[];
  githubLink?: string;
  demoLink?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'mobile' | 'core';
  level: number; // 0-100
}

export interface Experience {
  role: string;
  organization: string;
  period?: string;
}