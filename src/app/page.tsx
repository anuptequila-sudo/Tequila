import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AwardsSection from "@/components/sections/AwardsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSlider from "@/components/sections/TestimonialsSlider";
import FaqsSection from "@/components/sections/FaqsSection";
import SoapBubbleCursor from "@/components/layout/SoapBubbleCursor";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import InformationSection from "@/components/sections/InformationSection";
import SmoothScroll from "@/components/layout/SmoothScroll";




export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AwardsSection />
      <PortfolioSection />
      <TestimonialsSlider />
      <FaqsSection />
      <BlogSection />
      <ContactSection />
      <InformationSection />
    </>
  );
}
