export const metadata = {
  title: "AriesView - Enterprise Real Estate Asset Management Solutions",
  description: "Advanced Property Analysis Platform for Enterprise - Powerful analytics tools for real estate investors, asset managers, and property owners",
};

import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import RealEstateSections from "@/components/real-estate-sections";

export default function Home() {
  return (
    <div className="pt-20 md:pt-28">
      <Hero />
      <RealEstateSections />
      <Cta />
    </div>
  );
} 