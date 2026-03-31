// import Hero from "./components/layout/Hero";
// import Marquee from "./components/home/Marquee";
import FeaturedGrid from "./components/home/FeaturedGrid";
import EditorialBento from "./components/home/EditorialBento";
import Newsletter from "./components/home/Newsletter";
import Hero from "../components/layout/Hero";
import Marquee from "../components/home/Marquee";

export default function Home() {
  return (
    <main className="bg-brand-black text-white pt-16">
      <Hero />
      <Marquee />
      <FeaturedGrid />
      <EditorialBento />
      <Newsletter />
    </main>
  );
}