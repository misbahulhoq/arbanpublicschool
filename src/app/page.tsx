import About from "@/components/home/About";
import HeroSection from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen text-lg">
      <HeroSection />
      <About />
    </div>
  );
}
