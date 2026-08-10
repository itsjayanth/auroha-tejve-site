"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import Button from "@/components/ui/button";
import LogoMark from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-lg" : "border-b border-transparent"
      )}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-ink">
          <LogoMark />
          <span className="hidden sm:inline">Auroha Tejve</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="#contact" className="px-5 py-2.5 text-sm">
            Book a Call
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-border-strong p-2 text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-bg md:hidden"
          >
            <div className="container-px mx-auto flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-ink-muted transition-colors hover:bg-white/[0.03] hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="#contact" className="mt-2 w-full" >
                Book a Call
              </Button>
              <p className="mt-2 px-3 text-xs text-ink-faint">{siteConfig.email}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
