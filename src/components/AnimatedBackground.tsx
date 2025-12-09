import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Subtle animated background that reflects computational modeling theme
 * Creates a network-like visualization with animated nodes and connections
 */
export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const nodes: Array<{ element: HTMLDivElement; x: number; y: number; vx: number; vy: number; pulse?: gsap.core.Tween }> = [];
    const nodeCount = 12;
    let animationId: number | null = null;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement("div");
      node.className = "absolute w-2 h-2 rounded-full bg-primary/15";
      container.appendChild(node);

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const vx = (Math.random() - 0.5) * 0.015;
      const vy = (Math.random() - 0.5) * 0.015;

      node.style.left = `${x}%`;
      node.style.top = `${y}%`;

      nodes.push({ element: node, x, y, vx, vy });
    }

    // Pulse animation for nodes
    nodes.forEach((node, index) => {
      node.pulse = gsap.to(node.element, {
        scale: 1.8,
        opacity: 0.3,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // Slower animation loop
    const animate = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(100, node.x));
        node.y = Math.max(0, Math.min(100, node.y));

        node.element.style.left = `${node.x}%`;
        node.element.style.top = `${node.y}%`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      nodes.forEach((node) => {
        if (node.pulse) {
          node.pulse.kill();
        }
        if (node.element.parentNode) {
          node.element.parentNode.removeChild(node.element);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
};
