import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Optimize ScrollTrigger refresh rate
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}

/**
 * Animation utility functions for common patterns
 */

/**
 * Fade in and slide up animation
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
    opacity?: number;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: options?.opacity ?? 0,
      y: options?.y ?? 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: "power3.out",
    }
  );
}

/**
 * Split text and animate each character/word
 */
export function splitTextReveal(
  element: HTMLElement,
  options?: {
    type?: "chars" | "words" | "lines";
    delay?: number;
    stagger?: number;
  }
) {
  const text = element.textContent || "";
  const type = options?.type ?? "words";
  
  // Split text
  let split: string[];
  if (type === "chars") {
    split = text.split("");
  } else if (type === "words") {
    split = text.split(/\s+/);
  } else {
    split = text.split("\n");
  }

  // Wrap each part in a span
  const wrapped = split
    .map((part) => {
      if (type === "chars" && part === " ") {
        return " ";
      }
      return `<span class="gsap-split-text" style="display: inline-block;">${part}${type === "words" ? " " : ""}</span>`;
    })
    .join("");

  element.innerHTML = wrapped;

  const spans = element.querySelectorAll(".gsap-split-text");

  return gsap.fromTo(
    spans,
    {
      opacity: 0,
      y: 20,
      rotationX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.02,
      ease: "back.out(1.7)",
    }
  );
}

/**
 * Scroll-triggered fade in
 */
export function scrollFadeIn(
  element: HTMLElement,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    once?: boolean;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: options?.start ?? "top 80%",
        end: options?.end ?? "top 50%",
        toggleActions: options?.once ? "play none none none" : "play none none reverse",
        once: options?.once ?? false,
      },
    }
  );
}

/**
 * Stagger animation for multiple elements
 */
export function staggerFadeIn(
  elements: gsap.TweenTarget,
  options?: {
    delay?: number;
    stagger?: number;
    y?: number;
  }
) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.y ?? 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.1,
      ease: "power2.out",
    }
  );
}

/**
 * Scroll-triggered stagger animation
 */
export function scrollStagger(
  elements: gsap.TweenTarget,
  options?: {
    start?: string;
    stagger?: number;
    once?: boolean;
    trigger?: Element | null;
  }
) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: options?.stagger ?? 0.1,
      ease: "power3.out",
      scrollTrigger: options?.trigger ? {
        trigger: options.trigger,
        start: options?.start ?? "top 85%",
        toggleActions: options?.once ? "play none none none" : "play none none reverse",
        once: options?.once ?? false,
      } : undefined,
    }
  );
}

/**
 * Magnetic button effect
 */
export function magneticButton(button: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    button.removeEventListener("mousemove", handleMouseMove);
    button.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * 3D tilt effect on hover
 */
export function tilt3D(element: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(element, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Parallax effect
 */
export function parallax(
  element: HTMLElement,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  return gsap.to(element, {
    yPercent: options?.speed ?? -50,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      scrub: true,
    },
  });
}

/**
 * Icon pulse animation
 */
export function pulseIcon(icon: HTMLElement) {
  return gsap.to(icon, {
    scale: 1.2,
    duration: 0.3,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
}

/**
 * Animated underline reveal
 */
export function underlineReveal(element: HTMLElement) {
  const underline = document.createElement("div");
  underline.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: currentColor;
    width: 0;
  `;
  
  if (element.style.position !== "relative") {
    element.style.position = "relative";
  }
  element.appendChild(underline);

  return gsap.to(underline, {
    width: "100%",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
