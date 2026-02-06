import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Trust from "../src/components/Trust";
import LogoMarquee from "../src/components/LogoMarquee";
import Services from "../src/components/Services";
import Metrics from "../src/components/Metrics";
import Process from "../src/components/Process";
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
      <LogoMarquee />
      <Trust />
      <Metrics />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
