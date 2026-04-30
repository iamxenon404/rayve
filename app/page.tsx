import Hero from "./components/layout/Hero";
import Marquee from "./components/home/Marquee";
import FeaturedDrop from "./components/home/FeaturedDrop";
import EditorialBento from "./components/home/EditorialBento";
// import Newsletter from "./components/home/Newsletter";

export default function Home() {
  return (
    <main className="bg-brand-black text-white pt-16">
      {/* Visual Identity & Video */}
      <Hero />
      
      {/* Dynamic Movement bar */}
      <Marquee />
      
      {/* Featured Products Grid */}
      <div className="py-10">
        <FeaturedDrop />
      </div>
      
      {/* Brand Narrative / Bento Grid */}
      <EditorialBento />
      
      {/* Final Call to Action */}
      {/* <Newsletter /> */}
    </main>
  );
}