import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, Github, Download, Star } from "lucide-react";
import { software } from "@/data/software";
import { HighlightedText } from "@/components/HighlightedText";
import { useGSAP } from "@/hooks/useGSAP";
import { scrollStagger, fadeInUp, tilt3D } from "@/utils/animations";
import { SoftwareCategory } from "@/data/types";

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    Python: "bg-[hsl(210,60%,50%)]",
    R: "bg-[hsl(200,70%,45%)]",
    "C++": "bg-[hsl(340,80%,55%)]",
    JavaScript: "bg-[hsl(50,90%,50%)]",
  };
  return colors[language] || "bg-muted";
};

type FilterType = "all" | SoftwareCategory;

const Software = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredSoftware = activeFilter === "all" 
    ? software 
    : software.filter((item) => item.category === activeFilter);

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pbpk", label: "PBPK Tools/Models" },
    { value: "text-mining", label: "Text-mining Tools" },
    { value: "omics", label: "Omics Related Tools" },
  ];

  useGSAP(() => {
    if (headerRef.current) {
      fadeInUp(headerRef.current, { delay: 0.2, duration: 0.8 });
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".software-card");
      scrollStagger(cards, {
        start: "top 85%",
        stagger: 0.1,
        once: true,
        trigger: cardsRef.current,
      });

      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          tilt3D(card);
        }
      });
    }
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Open Source
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Software & Tools
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-justify">
                <HighlightedText text="Open-source software developed by our laboratory to support reproducible research and advance computational methods." />
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === option.value
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoftware.map((item) => (
                <article
                  key={item.name}
                  className="software-card group flex flex-col p-6 bg-card border border-border hover:border-muted transition-all duration-300 will-change-transform"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {item.name}
                    </h2>
                    {item.github && (
                      <a
                        href={item.github}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                        aria-label="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 text-justify">
                    <HighlightedText text={item.description} />
                  </p>

                  {(item.language || item.stars || item.license) && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        {item.language && (
                          <span className="flex items-center gap-1.5">
                            <span className={`w-3 h-3 rounded-full ${getLanguageColor(item.language)}`} />
                            <span className="text-muted-foreground">{item.language}</span>
                          </span>
                        )}
                        {item.stars && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Star size={14} />
                            {item.stars}
                          </span>
                        )}
                      </div>
                      {item.license && (
                        <span className="text-muted-foreground text-xs">{item.license}</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border flex-wrap">
                    {item.website && (
                      <a
                        href={item.website}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                      >
                        <ExternalLink size={14} />
                        Visit
                      </a>
                    )}
                    {item.doi && (
                      <a
                        href={item.doi}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                      >
                        <ExternalLink size={14} />
                        DOI
                      </a>
                    )}
                    {item.github && (
                      <a
                        href={item.github}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Software;
