/**
 * Light spectrum color palette for highlighting technical terms
 * Each color is a pastel/light shade that's readable and visually appealing
 */
export const HIGHLIGHT_COLORS = [
  // Blues
  { text: "hsl(200, 80%, 45%)", bg: "hsl(200, 80%, 45%, 0.15)" },
  { text: "hsl(210, 75%, 50%)", bg: "hsl(210, 75%, 50%, 0.15)" },
  { text: "hsl(220, 70%, 55%)", bg: "hsl(220, 70%, 55%, 0.15)" },
  
  // Teals/Cyans
  { text: "hsl(180, 70%, 45%)", bg: "hsl(180, 70%, 45%, 0.15)" },
  { text: "hsl(190, 75%, 50%)", bg: "hsl(190, 75%, 50%, 0.15)" },
  
  // Purples
  { text: "hsl(270, 65%, 55%)", bg: "hsl(270, 65%, 55%, 0.15)" },
  { text: "hsl(280, 70%, 60%)", bg: "hsl(280, 70%, 60%, 0.15)" },
  { text: "hsl(260, 75%, 58%)", bg: "hsl(260, 75%, 58%, 0.15)" },
  
  // Greens
  { text: "hsl(150, 70%, 45%)", bg: "hsl(150, 70%, 45%, 0.15)" },
  { text: "hsl(160, 75%, 50%)", bg: "hsl(160, 75%, 50%, 0.15)" },
  
  // Oranges
  { text: "hsl(25, 85%, 55%)", bg: "hsl(25, 85%, 55%, 0.15)" },
  { text: "hsl(35, 80%, 58%)", bg: "hsl(35, 80%, 58%, 0.15)" },
  
  // Pinks/Roses
  { text: "hsl(330, 70%, 55%)", bg: "hsl(330, 70%, 55%, 0.15)" },
  { text: "hsl(340, 75%, 60%)", bg: "hsl(340, 75%, 60%, 0.15)" },
  
  // Yellows
  { text: "hsl(45, 85%, 50%)", bg: "hsl(45, 85%, 50%, 0.15)" },
  { text: "hsl(50, 90%, 55%)", bg: "hsl(50, 90%, 55%, 0.15)" },
  
  // Indigos
  { text: "hsl(240, 70%, 55%)", bg: "hsl(240, 70%, 55%, 0.15)" },
  { text: "hsl(250, 75%, 58%)", bg: "hsl(250, 75%, 58%, 0.15)" },
];

/**
 * Get a random color from the highlight palette
 * Uses a simple hash function to ensure the same term always gets the same color
 */
export function getHighlightColor(term: string): { text: string; bg: string } {
  // Simple hash function to get consistent color for same term
  let hash = 0;
  for (let i = 0; i < term.length; i++) {
    hash = term.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % HIGHLIGHT_COLORS.length;
  return HIGHLIGHT_COLORS[index];
}

/**
 * Get a random color (truly random, not based on term)
 */
export function getRandomHighlightColor(): { text: string; bg: string } {
  const index = Math.floor(Math.random() * HIGHLIGHT_COLORS.length);
  return HIGHLIGHT_COLORS[index];
}

