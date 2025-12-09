import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold mb-1">
              InSilicoVida Research Laboratory
            </p>
            <p className="text-sm text-primary-foreground/70 mb-1">
              Part of TecnATox Research Center
            </p>
            <p className="text-xs text-primary-foreground/60">
              Advancing knowledge through rigorous research
            </p>
          </div>
          
          <nav className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <Link to="/research" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Research
            </Link>
            <Link to="/research-projects" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Projects
            </Link>
            <Link to="/publications" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Publications
            </Link>
            <Link to="/software" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Software
            </Link>
            <Link to="/team" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Team
            </Link>
            <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
              Contact
            </Link>
          </nav>
        </div>
        
        {/* Affiliations Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-primary-foreground/80 font-medium text-center">
              Affiliated with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* URV Logo */}
              <a
                href="https://www.urv.cat/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity duration-200"
                aria-label="Visit Universitat Rovira i Virgili website"
              >
                <div className="bg-white/10 p-4 rounded-lg border border-primary-foreground/20 group-hover:bg-white/20 transition-colors min-h-[60px] min-w-[120px] flex items-center justify-center">
                  <img
                    src="/images/urv-logo.png"
                    alt="Universitat Rovira i Virgili (URV) Logo"
                    className="h-12 w-auto object-contain max-w-[120px]"
                    onError={(e) => {
                      // Fallback if logo not found
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'logo-fallback text-sm font-semibold text-primary-foreground';
                        fallback.textContent = 'URV';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-primary-foreground/70 text-center max-w-[150px]">
                  Universitat Rovira i Virgili
                </span>
              </a>

              {/* Tecnatox Logo */}
              <a
                href="https://www.tecnatox.urv.cat/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity duration-200"
                aria-label="Visit TecnATox website"
              >
                <div className="bg-white/10 p-4 rounded-lg border border-primary-foreground/20 group-hover:bg-white/20 transition-colors min-h-[60px] min-w-[120px] flex items-center justify-center">
                  <img
                    src="/images/tecnatox-logo.png"
                    alt="TecnATox Logo"
                    className="h-12 w-auto object-contain max-w-[120px]"
                    onError={(e) => {
                      // Fallback if logo not found
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'logo-fallback text-sm font-semibold text-primary-foreground';
                        fallback.textContent = 'TecnATox';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-primary-foreground/70 text-center max-w-[150px]">
                  TecnATox
                </span>
              </a>

              {/* IISPV Logo */}
              <a
                href="https://www.iispv.cat/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity duration-200"
                aria-label="Visit Institut d'Investigació Sanitària Pere Virgili website"
              >
                <div className="bg-white/10 p-4 rounded-lg border border-primary-foreground/20 group-hover:bg-white/20 transition-colors min-h-[60px] min-w-[120px] flex items-center justify-center">
                  <img
                    src="/images/iispv-logo.png"
                    alt="Institut d'Investigació Sanitària Pere Virgili (IISPV) Logo"
                    className="h-12 w-auto object-contain max-w-[120px]"
                    onError={(e) => {
                      // Fallback if logo not found
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'logo-fallback text-sm font-semibold text-primary-foreground';
                        fallback.textContent = 'IISPV';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-primary-foreground/70 text-center max-w-[150px]">
                  Institut d'Investigació<br />Sanitària Pere Virgili
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} InSilicoVida Research Laboratory, part of TecnATox. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50 mt-2">
            Department of Chemical Engineering, Universitat Rovira i Virgili, Tarragona, Spain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
