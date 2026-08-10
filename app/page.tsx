import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Products from "@/components/sections/products";
import Approach from "@/components/sections/approach";
import Process from "@/components/sections/process";
import SocialProof from "@/components/sections/social-proof";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
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
