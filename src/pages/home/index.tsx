import FeaturedProducts from "./components/featured-products";
import Hero from "./components/hero";
import WhyChooseUs from "./components/why-choose-us";

export default function Home() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
}
