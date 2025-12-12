// Shared TypeScript interfaces for all data types

export type SoftwareCategory = "pbpk" | "text-mining" | "omics";

export interface Software {
  name: string;
  description: string;
  language?: string;
  stars?: number;
  license?: string;
  github?: string;
  doi?: string;
  website?: string;
  tags?: string[];
  category: SoftwareCategory;
  date?: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  image?: string;
  id?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  hierarchy?: "leader" | "researcher" | "phd";
  links?: {
    email?: string;
    orcid?: string;
    github?: string;
    "google scholar"?: string;
    twitter?: string;
    researchgate?: string;
    LinkedIn?: string;
    "home-page"?: string;
  };
  aliases?: string[];
}


export interface HomeContent {
  labName: string;
  description: string;
  highlights: {
    title: string;
    text: string;
    image?: string;
    link?: string;
  }[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  status: "active" | "past";
  date: string;
  grantNumber?: string;
  funding?: string;
  website?: string;
  image?: string;
}

