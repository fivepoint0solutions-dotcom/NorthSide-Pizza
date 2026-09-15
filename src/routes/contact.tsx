import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/Reveal";
import { RinkBackdrop } from "@/components/site/RinkBackdrop";
import { PACKAGES } from "@/lib/packages-data";

type ContactSearch = { package?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search["package"] === "string" ? { package: search["package"] } : {},
  head: () => ({
    meta: [
      { title: "Book Now — Top Shelf Detailing" },
      {
        name: "description",
        content:
          "Book your Top Shelf Detailing appointment — mobile and in-shop service across the West Coast. Request a quote or schedule your package today.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { package: packageFromSearch } = Route.useSearch();
  const [selectedPackage, setSelectedPackage] = useState(packageFromSearch ?? "");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Booking request received! We'll text or call you within one business day.");
    e.currentTarget.reset();
    setSelectedPackage("");
  };

  return (
    <main>
      <section className="rink-streaks ice-vignette relative overflow-hidden">
        <RinkBackdrop dense className="opacity-60" />
        <div className="container-app relative py-16 text-center lg:py-20">
          <Reveal>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">Book Now</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display measure mx-auto mt-5 uppercase">
              Get <span className="text-[color:var(--brand-orange)]">game-ready</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lede measure mx-auto mt-6 text-muted-foreground">
              Tell us about your vehicle and preferred package — we'll confirm your appointment
              within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y container-app grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form onSubmit={onSubmit} className="card-elevated flex flex-col gap-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required placeholder="Jordan Miller" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="(360) 555-0169" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@email.com" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="vehicle">Vehicle (year / make / model)</Label>
                <Input id="vehicle" name="vehicle" placeholder="2022 Infiniti QX60" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="package">Package</Label>
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger id="package">
                    <SelectValue placeholder="Choose a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.name} value={pkg.name}>
                        {pkg.name} — {pkg.price}
                      </SelectItem>
                    ))}
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="package" value={selectedPackage} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Preferred date</Label>
              <Input id="date" name="date" type="date" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Mobile detail at my office, or drop-off at your shop — anything else we should know?"
                rows={4}
              />
            </div>

            <Button type="submit" variant="hero" size="lg" className="mt-2">
              Request Booking
            </Button>
            {submitted && (
              <p className="text-caption text-[color:var(--brand-teal)]">
                Thanks — your request is in. Check your email for confirmation details.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 lg:col-span-2">
          <div className="card-soft overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Top Shelf Detailing service area map"
                src="https://www.google.com/maps?q=Vancouver,WA&z=10&output=embed"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0 grayscale invert-[0.92] contrast-[1.1]"
              />
            </div>
            <div className="p-6">
              <p className="text-title">West Coast Car Care</p>
              <p className="mt-1 text-body text-muted-foreground">
                Serving Vancouver WA, Portland OR, and surrounding areas — mobile service available.
              </p>
            </div>
          </div>

          <div className="card-soft flex flex-col gap-4 p-6">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-[color:var(--brand-orange)]" />
              <span className="text-sm">(360) 555-0169</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-[color:var(--brand-orange)]" />
              <span className="text-sm">book@topshelfdetailing.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-[color:var(--brand-orange)]" />
              <span className="text-sm">Vancouver, WA &amp; the West Coast</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-[color:var(--brand-orange)]" />
              <span className="text-sm">Mon–Sat, 8am–6pm</span>
            </div>
            <div className="hairline pt-4">
              <div className="flex items-center gap-2 text-sm text-[color:var(--brand-teal)]">
                <ShieldCheck className="size-4" /> Satisfaction guaranteed on every detail
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
