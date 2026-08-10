import Link from "next/link";
import { navLinks, products, siteConfig, socialLinks } from "@/lib/data";
import LogoMark from "@/components/ui/logo-mark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg-elevated">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-display text-base font-semibold text-ink">
              <LogoMark />
              Auroha Tejve
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">Products</h3>
            <ul className="mt-4 space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link href={product.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-muted transition-colors hover:text-ink">
                  {siteConfig.email}
                </a>
              </li>
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-faint">
            &copy; {year} Auroha Tejve Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">{siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
