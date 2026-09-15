import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Packages", to: "/packages" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "Book Now", to: "/contact" as const },
];

export function SiteFooter() {
  return (
    <footer className="rink-streaks mt-10 border-t border-border bg-[color:var(--brand-black)]/40">
      <div className="container-app py-14">
        <div className="glass-panel flex flex-col items-center gap-6 p-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-headline !text-2xl lg:!text-3xl">Ready to get game-ready?</h2>
            <p className="mt-2 text-body text-muted-foreground">
              Book your detail today and see the transformation for yourself.
            </p>
          </div>
          <Button asChild variant="hero" size="xl" className="shrink-0">
            <Link to="/contact">Get Game Ready</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="gradient-hero grid size-9 place-items-center rounded-lg text-sm font-black text-white">
                TS
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                TOP SHELF <span className="text-[color:var(--brand-orange)]">DETAILING</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Score the perfect shine. Premium mobile &amp; in-shop detailing serving the West
              Coast.
            </p>
          </div>

          <div>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-foreground/80 hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[color:var(--brand-teal)]" /> (360) 555-0169
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-[color:var(--brand-teal)]" />{" "}
                book@topshelfdetailing.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-[color:var(--brand-teal)]" /> Vancouver, WA &amp;
                West Coast
              </li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">Follow</p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-border transition-refined hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full border border-border transition-refined hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-12 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Top Shelf Detailing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
