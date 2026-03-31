// import Hero from "./components/layout/Hero";
// import Marquee from "./components/home/Marquee";
// import FeaturedGrid from "./components/home/FeaturedGrid";
// import EditorialBento from "./components/home/EditorialBento";
// import Newsletter from "./components/home/Newsletter";
// import Hero from "../components/layout/Hero";
// import Marquee from "../components/home/Marquee";
// import FeaturedDrop from "../components/home/FeaturedDrop";
// import EditorialBento from "../components/home/EditorialBento";
// import NewsletterModal from "../components/ui/NewsletterModal";

import EditorialBento from "./components/home/EditorialBento";
import FeaturedDrop from "./components/home/FeaturedDrop";
import Marquee from "./components/home/Marquee";
import Hero from "./components/layout/Hero";

export default function Home() {
  return (
    <main className="bg-brand-black text-white pt-16">
      <Hero />
      <Marquee />
      <FeaturedDrop/>
      <EditorialBento />
      {/* <NewsletterModal /> */}
    </main>
  );
}