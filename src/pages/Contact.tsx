import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Mail, Building, Phone, ExternalLink } from "lucide-react";
import { contactInfo } from "@/data/contact";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 text-justify">
                {contactInfo.affiliation.description}
              </p>
              <a
                href={contactInfo.affiliation.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Visit Tecnatox Website
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-card border border-border">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border">
                  <Building className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="font-medium text-foreground mb-2">Department</h2>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.location.department}<br />
                  {contactInfo.location.university}
                </p>
              </div>

              <div className="text-center p-6 bg-card border border-border">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="font-medium text-foreground mb-2">Location</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {contactInfo.location.city}
                </p>
                <a
                  href={contactInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View on Google Maps
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="text-center p-6 bg-card border border-border">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="font-medium text-foreground mb-2">Email</h2>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="text-center p-6 bg-card border border-border mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border mx-auto">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="font-medium text-foreground mb-2">Phone</h2>
              <a
                href={`tel:${contactInfo.phoneLink}`}
                className="text-sm text-primary hover:underline"
              >
                {contactInfo.phone}
              </a>
            </div>

            <div className="max-w-lg mx-auto">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Research inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
