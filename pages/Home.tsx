import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Trust from "../src/components/Trust";
import LogoMarquee from "../src/components/LogoMarquee";
import Services from "../src/components/Services";
import Process from "../src/components/Process";
import CaseStudy from "../src/components/CaseStudy";
import Packages from "../src/components/Packages";
import FAQ from "../src/components/FAQ";
import LeadMagnet from "../src/components/LeadMagnet";
import Portfolio from "../src/components/Portfolio";
import Testimonials from "../src/components/Testimonials";
import CTA from "../src/components/CTA";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trust />
      <LogoMarquee />
      <Services />
      <Process />
      <CaseStudy />
      <Portfolio />
      <Packages />
      <Testimonials />
      <LeadMagnet />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
