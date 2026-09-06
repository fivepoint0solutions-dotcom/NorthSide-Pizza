import { LANGUAGES } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

/**
 * SEO ARCHITECTURE
 *
 * Search visibility for this product is built around who is searching, not
 * around the product name: adult children looking for help with a parent,
 * seniors looking for company, care organisations looking for something to
 * deploy. Each route therefore carries its own title, description and
 * canonical, and every route advertises its language alternates.
 *
 * Localisation is addressable: `?lang=fr` (etc.) selects a language on load,
 * so a French page has a stable, shareable, crawlable URL and can be declared
 * with hreflang rather than hidden behind localStorage.
 */

export const SITE_URL = `https://${BRAND.domain}`;

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Canonical + one hreflang alternate per supported language, plus x-default. */
export function seoLinks(path: string) {
  const base = canonicalUrl(path);
  return [
    { rel: "canonical", href: base },
    ...LANGUAGES.map((language) => ({
      rel: "alternate",
      hreflang: language.code,
      href: language.code === "en" ? base : `${base}?lang=${language.code}`,
    })),
    { rel: "alternate", hreflang: "x-default", href: base },
  ];
}

/**
 * Meta for one route. Titles lead with the searched-for concept and close
 * with the brand, which is the order people scan a result in.
 */
export function seoMeta({
  path,
  title,
  description,
  image = "/brand/og-image.png",
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}) {
  const url = canonicalUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE_URL}${image}` },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${SITE_URL}${image}` },
  ];
}

/** Convenience: everything a route page needs, in one call. */
export function seoHead(args: {
  path: string;
  title: string;
  description: string;
  image?: string;
}) {
  return { meta: seoMeta(args), links: seoLinks(args.path) };
}

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

function ldScript(data: object) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function organisationJsonLd() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/sidekick-mark.svg`,
    description: BRAND.promise,
    email: BRAND.contact.general,
    sameAs: [],
  });
}

export function websiteJsonLd() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: SITE_URL,
    inLanguage: LANGUAGES.map((l) => l.code),
    description: BRAND.tagline,
  });
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}

export function productJsonLd(offers: { name: string; price: string; description: string }[]) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Product",
    name: BRAND.name,
    description: BRAND.promise,
    brand: { "@type": "Brand", name: BRAND.name },
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      price: offer.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalUrl("/pricing"),
    })),
  });
}
