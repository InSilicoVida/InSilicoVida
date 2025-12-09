import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { researchAreas, researchDescription } from "@/data/research";
import { HighlightedText } from "@/components/HighlightedText";
import { useGSAP } from "@/hooks/useGSAP";
import { scrollStagger, tilt3D, fadeInUp, underlineReveal } from "@/utils/animations";
import gsap from "gsap";

const Research = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate header section
    if (headerRef.current) {
      fadeInUp(headerRef.current, { delay: 0.2, duration: 0.8 });
    }

    // Animate title with underline
    if (titleRef.current) {
      fadeInUp(titleRef.current, { delay: 0.4, duration: 0.8 });
      underlineReveal(titleRef.current);
    }

    // Animate description
    if (descriptionRef.current) {
      fadeInUp(descriptionRef.current, { delay: 0.6, duration: 0.8, y: 30 });
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".research-card");
      scrollStagger(cards, {
        start: "top 85%",
        stagger: 0.15,
        once: true,
        trigger: cardsRef.current,
      });

      // Add 3D tilt effect to each card
      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          tilt3D(card);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section ref={sectionRef} className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Our Focus
              </p>
              <h1
                ref={titleRef}
                className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 relative inline-block"
                style={{ opacity: 0 }}
              >
                Research Areas
              </h1>
              <p
                ref={descriptionRef}
                className="text-lg text-muted-foreground max-w-2xl mx-auto text-justify"
                style={{ opacity: 0 }}
              >
                <HighlightedText text={researchDescription} />
              </p>
            </div>

            <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
              {researchAreas.map((area) => (
                <div
                  key={area.title}
                  className="research-card group p-8 bg-card border border-border hover:border-muted transition-all duration-300 will-change-transform"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-background border border-border group-hover:bg-primary group-hover:border-primary transition-colors duration-300 relative">
                      <area.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-sm" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                        {area.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        <HighlightedText text={area.description} />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
