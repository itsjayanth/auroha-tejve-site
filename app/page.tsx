import Hero from "@/components/sections/hero";
import LaunchAnnouncement from "@/components/sections/launch-announcement";
import Services from "@/components/sections/services";
import Products from "@/components/sections/products";
import Approach from "@/components/sections/approach";
import Process from "@/components/sections/process";
import SocialProof from "@/components/sections/social-proof";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";
import { homepageJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()) }}
      />
      <Hero />
      <LaunchAnnouncement />
      <Services />
      <Products />
      <Approach />
      <Process />
      <SocialProof />
      <CTA />
      <Contact />
    </>
  );
}
