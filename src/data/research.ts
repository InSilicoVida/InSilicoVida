import { Brain, Database, Network, Cpu, FlaskConical, FileText } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ResearchArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const researchAreas: ResearchArea[] = [
  {
    icon: Brain,
    title: "PBPK Modeling",
    description: "Developing physiologically based pharmacokinetic (PBPK) models for predicting chemical absorption, distribution, metabolism, and excretion in biological systems. Specialized in tissue dosimetry, translational models (IVIVE, QIVIVE, inter-species scaling) for human health risk assessment.",
  },
  {
    icon: FileText,
    title: "Text Mining & Literature Analysis",
    description: "Intelligent tools like AOP-wiki explorer and AOP-bot for extracting valuable information from vast scientific literature. Developing semantic, syntactic, and context-based information extraction (S2CIE) for AOP development.",
  },
  {
    icon: FlaskConical,
    title: "QSAR & Predictive Toxicology",
    description: "Quantitative Structure-Activity Relationship (QSAR) models for chemical toxicity assessment. Developing predictive models using machine learning and artificial intelligence for screening and risk assessment of chemicals.",
  },
  {
    icon: Network,
    title: "Systems Biology & AOPs",
    description: "Computational frameworks for understanding complex biological pathways and mechanisms. Developing integrated PBPK/PD coupled mechanistic pathway models and quantitative Adverse Outcome Pathways (AOPs).",
  },
  {
    icon: Database,
    title: "Ontology Development",
    description: "Tools and frameworks for developing biological ontologies using the ontology development kit. Creating harmonized ontologies like PBPKO (Physiologically Based Pharmacokinetic Model Ontology) for automation of modeling frameworks.",
  },
  {
    icon: Cpu,
    title: "New Approach Methodologies (NAMs)",
    description: "Developing diverse in-silico tools (mechanistic models, AI supported tools) and integrating in-vitro data with in-silico for reducing the reliability on animal studies. Focus on Next Generation Risk Assessment strategies.",
  },
];

export const researchDescription = "Most publications from our lab focus on in-silico modeling for human health risk assessment with particular focus on toxicological aspect and literature mining related to toxicology. We have diverse group members with one section emphasized on developing physiologically based kinetic models, pharmacodynamic models and systems biology models for environmental chemicals and pharmaceutical drugs. Another section of our lab focus on text mining and developing tools like AOP-wiki explorer, AOP-bot etc. for extracting the useful information from vast literature. We also have expertise related to developing biological ontologies using ontology development kit.";

