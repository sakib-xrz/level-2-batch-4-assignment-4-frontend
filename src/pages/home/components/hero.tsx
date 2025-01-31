import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="relative flex w-full items-center justify-center bg-[#18181b] sm:h-svh">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={"/assets/images/hero.webp"}
          alt="Bicycle Store"
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      {/* Content Box */}
      <div className="bg-opacity-20 relative z-10 max-w-4xl px-4 py-8 text-center text-white backdrop-blur-lg sm:rounded-xl sm:p-10">
        <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl md:text-6xl">
          Elevate Your Ride <br />
          <span className="text-[#c2ab8e]">Premium Bicycles</span>
        </h1>
        <p className="mt-4 text-sm text-gray-300 sm:text-base md:text-lg">
          Discover cutting-edge bicycles engineered for speed, endurance, and
          comfort. Designed for the ultimate riding experience. Shop now!
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="#featured-products">
            <Button
              type="primary"
              className="rounded-lg border-none !bg-[#c2ab8e] px-6 py-3 text-lg text-black transition hover:!bg-[#a48d70]"
            >
              Shop Now
            </Button>
          </a>
          <Link to="/products">
            <Button
              type="default"
              className="rounded-lg border-[#c2ab8e] px-6 py-3 text-lg text-[#c2ab8e] transition hover:!bg-[#c2ab8e] hover:!text-black"
            >
              Explore Bikes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
