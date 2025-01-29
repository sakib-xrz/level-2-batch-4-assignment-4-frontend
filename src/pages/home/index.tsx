import FeaturedProducts from "./components/featured-products";
import Hero from "./components/hero";
import WhyChooseUs from "./components/why-choose-us";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <FeaturedProducts />
    </div>
  );
}
