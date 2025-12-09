import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";
import { HighlightedText } from "@/components/HighlightedText";
import { useGSAP } from "@/hooks/useGSAP";
import { scrollStagger, fadeInUp } from "@/utils/animations";

const Publications = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      fadeInUp(headerRef.current, { delay: 0.2, duration: 0.8 });
    }

    if (publicationsRef.current) {
      const articles = publicationsRef.current.querySelectorAll(".publication-card");
      scrollStagger(articles, {
        start: "top 85%",
        stagger: 0.1,
        once: true,
        trigger: publicationsRef.current,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Academic Output
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Publications
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-justify">
                A selection of our peer-reviewed publications in leading academic journals and conferences.
              </p>
            </div>

            <div ref={publicationsRef} className="space-y-6">
              {publications.map((pub, index) => (
                <article
                  key={pub.id || index}
                  className="publication-card group p-6 border border-border hover:bg-card transition-colors duration-200"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {pub.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-2">
                        {pub.authors}
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        {pub.journal}, {pub.year}
                      </p>
                    </div>
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      aria-label="View publication"
                    >
                      <ExternalLink size={18} />
                    </a>
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

export default Publications;
