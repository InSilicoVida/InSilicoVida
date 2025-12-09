import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/research-projects" },
    { label: "Publications", href: "/publications" },
    { label: "Software", href: "/software" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Animate header on mount
  useGSAP(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-3">
        <nav ref={navRef} className="flex items-center justify-between gap-4" style={{ opacity: 0 }}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-serif text-lg md:text-xl font-semibold text-foreground tracking-tight whitespace-nowrap">
              InSilicoVida
            </span>
            <span className="hidden sm:inline text-xs md:text-sm text-muted-foreground font-medium">
              Research Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-foreground hover:after:w-full after:transition-all after:duration-300",
                    isActive(link.href)
                      ? "text-foreground after:w-full"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden pt-4 pb-2">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
