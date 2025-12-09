import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Optimize ScrollTrigger performance
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}

/**
 * Custom hook for GSAP animations in React
 * Automatically handles cleanup and respects reduced motion preferences
 */
export function useGSAP(
  callback: () => void | (() => void),
  dependencies?: React.DependencyList
) {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    // Create context with scope
    const ctx = gsap.context(() => {
      callback();
    }, scope.current || undefined);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, dependencies || []);

  return scope;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation(
  callback: () => void,
  dependencies?: React.DependencyList
) {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      callback();
    }, scope.current || undefined);

    return () => {
      ctx.revert();
    };
  }, dependencies || []);

  return scope;
}
