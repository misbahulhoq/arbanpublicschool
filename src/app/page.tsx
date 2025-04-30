import About from "@/components/home/About";
import ALMHighlight from "@/components/home/ALM";
import Campus from "@/components/home/Campus";
import Contact from "@/components/home/Contact";
import CallToAction from "@/components/home/CTA";
// import Events from "@/components/home/Events";
import HeroSection from "@/components/home/Hero";
// import PrincipalsMessage from "@/components/home/Principal";

export default function Home() {
  return (
    <div className="spacey-9 lg:spacey-12 pb- flex min-h-screen flex-col gap-y-9 text-lg lg:gap-y-11">
      <HeroSection />
      <div>
        <CallToAction />
        <About />
      </div>
      {/* <PrincipalsMessage /> */}
      <Campus />
      {/* <Events /> */}
      <Contact />
      <ALMHighlight />
      {/* <Hero /> */}
    </div>
  );
}
