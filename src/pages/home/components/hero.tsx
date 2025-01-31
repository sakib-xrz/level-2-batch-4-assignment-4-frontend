import React from "react";
import { Link } from "react-router-dom";

const primaryColor = "#b89579";

const primaryButtonStyle = `flex items-center justify-center gap-2 rounded-lg font-semibold transition py-1.5 sm:py-2 w-full rounded-lg px-4 text-lg text-white shadow-none hover:bg-[#a48d70] bg-[${primaryColor}] cursor-pointer`;

const secondaryButtonStyle = `flex items-center justify-center gap-2 rounded-lg font-semibold transition py-1.5 sm:py-2 w-full rounded-lg px-4 text-lg text-[${primaryColor}] shadow-none hover:bg-white border border-[${primaryColor}] bg-transparent cursor-pointer`;

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
          <span className="text-[#b89579]">Premium Bicycles</span>
        </h1>
        <p className="mt-4 text-sm text-gray-300 sm:text-base md:text-lg">
          Discover cutting-edge bicycles engineered for speed, endurance, and
          comfort. Designed for the ultimate riding experience. Shop now!
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="#featured-products">
            <button className={primaryButtonStyle}>Shop Now</button>
          </a>
          <Link to="/products">
            <button className={secondaryButtonStyle}>Explore Bikes</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
