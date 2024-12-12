import About from "@/components/home/About";
import HeroSection from "@/components/home/Hero";
import PrincipalsMessage from "@/components/home/Principal";

export default function Home() {
  return (
    <div className="min-h-screen space-y-9 pb-9 text-lg lg:space-y-12">
      <HeroSection />
      <About />
      <PrincipalsMessage />
    </div>
  );
}
