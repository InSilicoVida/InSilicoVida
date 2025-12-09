/**
 * Technical terms to highlight in the website content
 * Terms are case-insensitive and support variations
 */
export const TECHNICAL_TERMS = [
  // In-silico variations
  { pattern: /\b(in[- ]?silico|insilico)\b/gi, label: "in-silico" },
  
  // Computational modeling
  { pattern: /\bcomputational\s+model(?:ing|s)?\b/gi, label: "computational modeling" },
  
  // Machine learning and AI
  { pattern: /\bmachine\s+learning\b/gi, label: "machine learning" },
  { pattern: /\b(?:AI|artificial\s+intelligence)\b/gi, label: "artificial intelligence" },
  
  // PBPK
  { pattern: /\bPBPK\b/g, label: "PBPK" },
  { pattern: /\bphysiologically\s+based\s+pharmacokinetic\b/gi, label: "physiologically based pharmacokinetic" },
  
  // QSAR
  { pattern: /\bQSAR\b/g, label: "QSAR" },
  { pattern: /\bquantitative\s+structure[- ]?activity\s+relationship\b/gi, label: "Quantitative Structure-Activity Relationship" },
  
  // AOP
  { pattern: /\bAOP\b/g, label: "AOP" },
  { pattern: /\badverse\s+outcome\s+pathways?\b/gi, label: "Adverse Outcome Pathways" },
  
  // IVIVE
  { pattern: /\b(?:IVIVE|QIVIVE)\b/g, label: "IVIVE" },
  
  // NAM
  { pattern: /\bNAM\b/g, label: "NAM" },
  { pattern: /\bnew\s+approach\s+methodolog(?:y|ies)\b/gi, label: "New Approach Methodology" },
  
  // Text mining
  { pattern: /\btext\s+mining\b/gi, label: "text mining" },
  { pattern: /\bliterature\s+mining\b/gi, label: "literature mining" },
  
  // Systems biology
  { pattern: /\bsystems?\s+biology\b/gi, label: "systems biology" },
  
  // Ontology
  { pattern: /\bontolog(?:y|ies)\b/gi, label: "ontology" },
  
  // Mechanistic models
  { pattern: /\bmechanistic\s+models?\b/gi, label: "mechanistic models" },
  
  // Risk assessment
  { pattern: /\brisk\s+assessment\b/gi, label: "risk assessment" },
  
  // Toxicology
  { pattern: /\btoxicolog(?:y|ical)\b/gi, label: "toxicology" },
  
  // Additional terms
  { pattern: /\bpharmacodynamic\b/gi, label: "pharmacodynamic" },
  { pattern: /\bpharmacokinetic\b/gi, label: "pharmacokinetic" },
  { pattern: /\bdosimetry\b/gi, label: "dosimetry" },
  { pattern: /\bnext\s+generation\s+risk\s+assessment\b/gi, label: "Next Generation Risk Assessment" },
];

export interface HighlightedSegment {
  text: string;
  isHighlighted: boolean;
  term?: string;
}

/**
 * Splits text into segments, identifying which parts should be highlighted
 */
export function highlightTerms(text: string): HighlightedSegment[] {
  if (!text) return [];
  
  const segments: HighlightedSegment[] = [];
  const matches: Array<{ index: number; length: number; term: string }> = [];
  
  // Find all matches
  TECHNICAL_TERMS.forEach(({ pattern, label }) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        term: label,
      });
    }
  });
  
  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);
  
  // Remove overlapping matches (keep the first one)
  const nonOverlapping: typeof matches = [];
  for (const match of matches) {
    const overlaps = nonOverlapping.some(
      (existing) =>
        match.index < existing.index + existing.length &&
        match.index + match.length > existing.index
    );
    if (!overlaps) {
      nonOverlapping.push(match);
    }
  }
  
  // Build segments
  let lastIndex = 0;
  nonOverlapping.forEach((match) => {
    // Add text before match
    if (match.index > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, match.index),
        isHighlighted: false,
      });
    }
    
    // Add highlighted match
    segments.push({
      text: text.substring(match.index, match.index + match.length),
      isHighlighted: true,
      term: match.term,
    });
    
    lastIndex = match.index + match.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex),
      isHighlighted: false,
    });
  }
  
  // If no matches, return the whole text as one segment
  if (segments.length === 0) {
    segments.push({ text, isHighlighted: false });
  }
  
  return segments;
}

