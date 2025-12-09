import { useEffect, useRef } from "react";
import { highlightTerms, type HighlightedSegment } from "@/utils/highlightTerms";
import { getHighlightColor } from "@/utils/highlightColors";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  text: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * Component that automatically highlights technical terms in text
 */
export const HighlightedText = ({
  text,
  className,
  highlightClassName,
}: HighlightedTextProps) => {
  const segments = highlightTerms(text);
  const highlightRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Animate highlights on mount
    highlightRefs.current.forEach((ref, index) => {
      if (ref) {
        // Small delay for stagger effect
        setTimeout(() => {
          ref.style.opacity = "1";
          ref.style.transform = "scale(1)";
        }, index * 50);
      }
    });
  }, []);

  if (segments.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.isHighlighted) {
          // Get a consistent color for each term
          const color = getHighlightColor(segment.term || segment.text);
          
          return (
            <span
              key={index}
              ref={(el) => {
                highlightRefs.current[index] = el;
              }}
              className={cn(
                "relative inline-block font-semibold transition-all duration-300",
                "px-1.5 py-0.5 rounded-sm",
                "hover:scale-105",
                highlightClassName
              )}
              style={{
                color: color.text,
                backgroundColor: color.bg,
                opacity: 0,
                transform: "scale(0.95)",
                transition: "opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const hoverBg = color.bg.replace("0.15", "0.25");
                e.currentTarget.style.backgroundColor = hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = color.bg;
              }}
              title={segment.term}
            >
              {segment.text}
            </span>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
};

