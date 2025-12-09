import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects, activeProjects, pastProjects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, ExternalLink } from "lucide-react";
import { HighlightedText } from "@/components/HighlightedText";
import { useGSAP } from "@/hooks/useGSAP";
import { scrollStagger, fadeInUp, tilt3D } from "@/utils/animations";

const ResearchProjects = () => {
  const [filter, setFilter] = useState<"all" | "active" | "past">("all");

  const filteredProjects =
    filter === "all" ? projects : filter === "active" ? activeProjects : pastProjects;

  const headerRef = useRef<HTMLDivElement>(null);
  const activeProjectsRef = useRef<HTMLDivElement>(null);
  const pastProjectsRef = useRef<HTMLDivElement>(null);
  const filteredProjectsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      fadeInUp(headerRef.current, { delay: 0.2, duration: 0.8 });
    }

    const animateProjects = (container: HTMLElement | null) => {
      if (container) {
        const cards = container.querySelectorAll(".project-card");
        scrollStagger(cards, {
          start: "top 85%",
          stagger: 0.15,
          once: true,
          trigger: container,
        });

        cards.forEach((card) => {
          if (card instanceof HTMLElement) {
            tilt3D(card);
          }
        });
      }
    };

    animateProjects(activeProjectsRef.current);
    animateProjects(pastProjectsRef.current);
    animateProjects(filteredProjectsRef.current);
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Research Portfolio
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Research Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-justify">
                <HighlightedText text="Our research group is actively involved in numerous international and national research projects focused on advancing computational toxicology, human health risk assessment, and new approach methodologies (NAMs). These projects bring together leading institutions across Europe and beyond to address critical challenges in chemical safety assessment." />
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === "active"
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                Active ({activeProjects.length})
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === "past"
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                Past ({pastProjects.length})
              </button>
            </div>

            {/* Active Projects Section */}
            {filter === "all" && (
              <>
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-border" />
                    <h2 className="font-serif text-2xl font-semibold text-foreground">
                      Active Projects
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div ref={activeProjectsRef} className="grid md:grid-cols-2 gap-6">
                    {activeProjects.map((project) => (
                      <article
                        key={project.title}
                        className="project-card group flex flex-col p-6 bg-card border border-border hover:border-muted transition-all duration-300 will-change-transform"
                        style={{ opacity: 0 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                          </div>
                          <Badge
                            variant={project.status === "active" ? "default" : "secondary"}
                            className="ml-2"
                          >
                            {project.status === "active" ? "Active" : "Past"}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 text-justify">
                          <HighlightedText text={project.description} />
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{project.date}</span>
                          </div>
                          {project.grantNumber && (
                            <div className="flex items-center gap-1.5">
                              <Award size={14} />
                              <span>Grant: {project.grantNumber}</span>
                            </div>
                          )}
                          {project.funding && (
                            <div className="text-muted-foreground">{project.funding}</div>
                          )}
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} />
                              <span>Website</span>
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-border" />
                    <h2 className="font-serif text-2xl font-semibold text-foreground">
                      Past Projects
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div ref={pastProjectsRef} className="grid md:grid-cols-2 gap-6">
                    {pastProjects.map((project) => (
                      <article
                        key={project.title}
                        className="project-card group flex flex-col p-6 bg-card border border-border hover:border-muted transition-all duration-300 will-change-transform"
                        style={{ opacity: 0 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            Past
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 text-justify">
                          <HighlightedText text={project.description} />
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{project.date}</span>
                          </div>
                          {project.grantNumber && (
                            <div className="flex items-center gap-1.5">
                              <Award size={14} />
                              <span>Grant: {project.grantNumber}</span>
                            </div>
                          )}
                          {project.funding && (
                            <div className="text-muted-foreground">{project.funding}</div>
                          )}
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} />
                              <span>Website</span>
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Filtered Projects */}
            {filter !== "all" && (
              <div ref={filteredProjectsRef} className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <article
                    key={project.title}
                    className="project-card group flex flex-col p-6 bg-card border border-border hover:border-muted transition-all duration-300 will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                      </div>
                      <Badge
                        variant={project.status === "active" ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {project.status === "active" ? "Active" : "Past"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 text-justify">
                      <HighlightedText text={project.description} />
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{project.date}</span>
                      </div>
                      {project.grantNumber && (
                        <div className="flex items-center gap-1.5">
                          <Award size={14} />
                          <span>Grant: {project.grantNumber}</span>
                        </div>
                      )}
                      {project.funding && (
                        <div className="text-muted-foreground">{project.funding}</div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchProjects;

