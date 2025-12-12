import { Software } from "./types";

export const software: Software[] = [
  {
    name: "PFAS PBPK Model",
    description: "PFAS PBPK Model is a software tool for predicting the pharmacokinetic behavior of perfluoroalkyl substances (PFAS) in humans.",
    website: "https://insilicovida-research-lab.github.io/PFAS-model/",
    tags: ["PBPK", "software"],
    category: "pbpk",
    date: "2024-01-01",
  },
  {
    name: "Euromix PBPK Model",
    description: "Euromix model developed in Euromix european project, build on mixture data.",
    website: "https://insilicovida-research-lab.github.io/Euromix-model/",
    tags: ["PBPK", "software"],
    category: "pbpk",
    date: "2024-01-01",
  },
  {
    name: "BPA PBPK Model",
    description: "BPA PBPK Model is a software tool for predicting the pharmacokinetic behavior of Bisphenol A (BPA) in humans.",
    website: "https://insilicovida-research-lab.github.io/BPA-model/",
    tags: ["PBPK", "software"],
    category: "pbpk",
    date: "2024-01-01",
  },
  {
    name: "S2CIE",
    description: "S2CIE (Syntactic, Semantic and Contextual Information Extraction system) is a comprehensive information extraction system that combines syntactic, semantic, and contextual approaches to extract meaningful information from text documents. It provides interactive pattern search, visualization of search results, and support for grammar-based queries.",
    doi: "https://doi.org/10.1016/j.envint.2025.109986",
    github: "https://github.com/Crispae/s2cie",
    website: "https://dev.s2cie.insilicohub.org/",
    tags: ["text-mining", "NLP", "information extraction"],
    category: "text-mining",
    date: "2024-01-01",
  },
  {
    name: "AOPWiki Explorer",
    description: "AOPWiki Explorer is a Labeled Property Graph (LPG) adaptation of AOPwiki. The LPG schema is adapted using Neo4j, providing Cypher and natural language-based query engine to explore Adverse Outcome Pathways (AOPs). Explorer provides intuitive network visualization of AOPs and different AOP objects linked to it. AOPwiki Explorer is developed under the Partnership for the Assessment of Risks from Chemicals (PARC) project.",
    doi: "https://doi.org/10.1016/j.comtox.2024.100308",
    github: "https://github.com/InSilicoVida-Research-Lab/AOPWiki_Explorer",
    tags: ["text-mining", "graph database", "Neo4j", "AOP"],
    category: "text-mining",
    date: "2024-01-01",
  },
];

