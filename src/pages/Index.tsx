import { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { homeContent } from "@/data/home";
import { HighlightedText } from "@/components/HighlightedText";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AnimatedPath } from "@/components/AnimatedPath";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInUp, splitTextReveal, magneticButton, parallax } from "@/utils/animations";
import gsap from "gsap";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLAnchorElement>(null);
  const secondaryButtonRef = useRef<HTMLAnchorElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate welcome text
    if (welcomeRef.current) {
      fadeInUp(welcomeRef.current, { delay: 0.2, duration: 0.8 });
    }

    // Animate title with split text effect
    if (titleRef.current) {
      splitTextReveal(titleRef.current, {
        type: "words",
        delay: 0.4,
        stagger: 0.1,
      });
    }

    // Animate description
    if (descriptionRef.current) {
      fadeInUp(descriptionRef.current, { delay: 0.8, duration: 1, y: 40 });
    }

    // Animate buttons with stagger
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("a");
      gsap.fromTo(
        buttons,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }

    // Add magnetic effect to buttons
    if (primaryButtonRef.current) {
      magneticButton(primaryButtonRef.current);
    }
    if (secondaryButtonRef.current) {
      magneticButton(secondaryButtonRef.current);
    }
  }, []);

  // Parallax effect on background
  useGSAP(() => {
    if (backgroundRef.current) {
      parallax(backgroundRef.current, {
        speed: -30,
        start: "top bottom",
        end: "bottom top",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatedBackground />
      <Header />
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative"
        >
          {/* Animated molecular path */}
          <AnimatedPath />
          
          {/* Subtle background gradient */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, hsl(var(--primary)) 0%, transparent 60%),
                                radial-gradient(circle at 70% 60%, hsl(var(--highlight)) 0%, transparent 50%)`,
              backgroundSize: "100% 100%",
            }}
          />
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <p
              ref={welcomeRef}
              className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6"
              style={{ opacity: 0 }}
            >
              Welcome to
            </p>
            <h1
              ref={titleRef}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-8"
            >
              {homeContent.labName}
            </h1>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 text-justify"
              style={{ opacity: 0 }}
            >
              <HighlightedText text={homeContent.description} />
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                ref={primaryButtonRef}
                to="/research"
                className="px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <span className="relative z-10">Explore Our Research</span>
                <span className="absolute inset-0 bg-primary-foreground/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
              <Link
                ref={secondaryButtonRef}
                to="/publications"
                className="px-8 py-3.5 border border-border text-foreground font-medium text-sm hover:bg-card hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
                style={{ opacity: 0 }}
              >
                <span className="relative z-10">View Publications</span>
                <span className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
