import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGroupLeader, getResearchers, getPhDStudents } from "@/data/team";
import { HighlightedText } from "@/components/HighlightedText";
import { useGSAP } from "@/hooks/useGSAP";
import { scrollStagger, fadeInUp } from "@/utils/animations";
import { TeamMember } from "@/data/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Mail, ExternalLink, Github, Twitter, Linkedin } from "lucide-react";

// Component for member image with fallback
const MemberImage = ({ image, name, size = "normal" }: { image: string; name: string; size?: "large" | "normal" | "small" }) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    large: "w-48 h-48 text-4xl",
    normal: "w-40 h-40 text-2xl",
    small: "w-32 h-32 text-xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageError = () => {
    console.warn(`Failed to load image for ${name}: ${image}`);
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center bg-primary/10 text-primary font-serif font-semibold rounded-full`}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      className={`${sizeClasses[size]} object-cover rounded-full`}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

const TeamMemberCard = ({ 
  member, 
  size = "normal",
  onClick 
}: { 
  member: TeamMember; 
  size?: "large" | "normal" | "small";
  onClick: () => void;
}) => {
  const sizeClasses = {
    large: "max-w-md mx-auto",
    normal: "max-w-sm",
    small: "max-w-xs",
  };

  const imageSizeClasses = {
    large: "w-48 h-48 mx-auto",
    normal: "w-40 h-40 mx-auto",
    small: "w-32 h-32 mx-auto",
  };

  return (
    <div 
      className={`group text-center cursor-pointer ${sizeClasses[size]}`}
      onClick={onClick}
    >
      <div className={`relative mb-5 overflow-hidden rounded-full ${imageSizeClasses[size]} mx-auto`}>
        <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
          <MemberImage image={member.image} name={member.name} size={size} />
        </div>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-full" />
      </div>
      <h2 className={`font-serif font-semibold text-foreground mb-1 ${size === "large" ? "text-2xl" : size === "normal" ? "text-xl" : "text-lg"}`}>
        {member.name}
      </h2>
      <p className={`font-medium text-muted-foreground ${size === "large" ? "text-base" : "text-sm"}`}>
        {member.role}
      </p>
    </div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const groupLeader = getGroupLeader();
  const researchers = getResearchers();
  const phdStudents = getPhDStudents();

  const headerRef = useRef<HTMLDivElement>(null);
  const leaderRef = useRef<HTMLDivElement>(null);
  const researchersRef = useRef<HTMLDivElement>(null);
  const phdRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      fadeInUp(headerRef.current, { delay: 0.2, duration: 0.8 });
    }

    if (leaderRef.current) {
      const cards = leaderRef.current.querySelectorAll(".team-member-card");
      scrollStagger(cards, { start: "top 85%", stagger: 0.2, once: true, trigger: leaderRef.current });
    }

    if (researchersRef.current) {
      const cards = researchersRef.current.querySelectorAll(".team-member-card");
      scrollStagger(cards, { start: "top 85%", stagger: 0.15, once: true, trigger: researchersRef.current });
    }

    if (phdRef.current) {
      const cards = phdRef.current.querySelectorAll(".team-member-card");
      scrollStagger(cards, { start: "top 85%", stagger: 0.1, once: true, trigger: phdRef.current });
    }
  }, []);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Our People
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Research Team
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-justify">
                <HighlightedText text="Our team is a dynamic mix of biologists, toxicologists, bioinformaticians, and computational scientists, each wielding expertise across multiple domains. Our biologists delve deep into biological systems, while our toxicologists focus on understanding the impacts of harmful substances. The bioinformaticians handle vast biological datasets, and our computational scientists apply advanced techniques to tackle complex problems. This diverse collaboration allows us to blend insights from various fields, fostering innovation and holistic solutions to multifaceted challenges." />
              </p>
            </div>

            {/* Group Leader Section */}
            {groupLeader && (
              <div ref={leaderRef} className="mb-16">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-8 text-center">
                  Group Leader
                </h2>
                <div className="team-member-card" style={{ opacity: 0 }}>
                  <TeamMemberCard 
                    member={groupLeader} 
                    size="large" 
                    onClick={() => handleMemberClick(groupLeader)}
                  />
                </div>
              </div>
            )}

            {/* Researchers Section */}
            {researchers.length > 0 && (
              <div ref={researchersRef} className="mb-16">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-8 text-center">
                  Researchers
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                  {researchers.map((member) => (
                    <div key={member.name} className="team-member-card" style={{ opacity: 0 }}>
                      <TeamMemberCard 
                        member={member} 
                        size="normal"
                        onClick={() => handleMemberClick(member)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PhD Students Section */}
            {phdStudents.length > 0 && (
              <div ref={phdRef}>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-8 text-center">
                  PhD Students
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {phdStudents.map((member) => (
                    <div key={member.name} className="team-member-card" style={{ opacity: 0 }}>
                      <TeamMemberCard 
                        member={member} 
                        size="small"
                        onClick={() => handleMemberClick(member)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Member Details Sidebar */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedMember && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <MemberImage image={selectedMember.image} name={selectedMember.name} size="large" />
                  </div>
                  <SheetTitle className="text-2xl font-serif font-semibold">
                    {selectedMember.name}
                  </SheetTitle>
                  <SheetDescription className="text-base font-medium text-muted-foreground">
                    {selectedMember.role}
                  </SheetDescription>
                </div>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    <HighlightedText text={selectedMember.bio} />
                  </p>
                </div>

                {selectedMember.links && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Contact & Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.links.email && (
                        <a
                          href={`mailto:${selectedMember.links.email}`}
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Mail size={16} />
                          Email
                        </a>
                      )}
                      {selectedMember.links.orcid && (
                        <a
                          href={`https://orcid.org/${selectedMember.links.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                          ORCID
                        </a>
                      )}
                      {selectedMember.links.github && (
                        <a
                          href={`https://github.com/${selectedMember.links.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                      {selectedMember.links["google scholar"] && (
                        <a
                          href={selectedMember.links["google scholar"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                          Google Scholar
                        </a>
                      )}
                      {selectedMember.links.twitter && (
                        <a
                          href={`https://twitter.com/${selectedMember.links.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Twitter size={16} />
                          Twitter
                        </a>
                      )}
                      {selectedMember.links.LinkedIn && (
                        <a
                          href={`https://${selectedMember.links.LinkedIn.startsWith('www.') ? '' : 'www.'}${selectedMember.links.LinkedIn}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Linkedin size={16} />
                          LinkedIn
                        </a>
                      )}
                      {selectedMember.links.researchgate && (
                        <a
                          href={selectedMember.links.researchgate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                          ResearchGate
                        </a>
                      )}
                      {selectedMember.links["home-page"] && (
                        <a
                          href={selectedMember.links["home-page"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                          Homepage
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Team;
