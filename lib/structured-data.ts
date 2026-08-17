import { products, services, siteConfig, socialLinks } from "@/lib/data";

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Auroha"],
    description:
      "Auroha Tejve Private Limited is a software development company building Shopify apps, Shopify stores, B2B SaaS products, and applied AI solutions for ecommerce.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    email: siteConfig.email,
    ...(siteConfig.foundingDate ? { foundingDate: siteConfig.foundingDate } : {}),
    sameAs: socialLinks.map((social) => social.href),
  };
}

export function servicesJsonLd() {
  return services.map((service) => ({
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
  }));
}

export function productsJsonLd() {
  return products.map((product) => ({
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: product.href,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@id": `${siteConfig.url}/#organization` },
  }));
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    name: "Auroha",
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      ...servicesJsonLd(),
      ...productsJsonLd(),
    ],
  };
}
