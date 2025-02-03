import React from "react";
import { Link } from "react-router-dom";

const primaryColor = "#b89579";

const primaryButtonStyle = `flex items-center justify-center gap-2 rounded-lg font-semibold transition py-1.5 sm:py-2 w-full rounded-lg px-4 text-lg text-white shadow-none hover:bg-[#a48d70] bg-[${primaryColor}] cursor-pointer`;

const secondaryButtonStyle = `flex items-center justify-center gap-2 rounded-lg font-semibold transition py-1.5 sm:py-2 w-full rounded-lg px-4 text-lg text-[${primaryColor}] shadow-none hover:bg-white border border-[${primaryColor}] bg-transparent cursor-pointer`;

const AboutUs: React.FC = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return (
    <section className="bg-[#f8f8f8] py-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-[#18181b]">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Welcome to Bicycle Store - where passion meets innovation. We are
            dedicated to providing high-quality bicycles for riders of all
            levels.
          </p>
        </div>

        {/* Our Story & Mission */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Our Story */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-3xl font-semibold text-[#18181b]">Our Story</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Founded in 2010, Bicycle Store started with a simple vision: to
              make high-quality bicycles accessible to everyone. From humble
              beginnings, we have grown into a trusted name in the cycling
              community, offering premium bikes for all kinds of riders.
            </p>
          </div>

          {/* Our Mission */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-3xl font-semibold text-[#18181b]">
              Our Mission
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              We strive to provide top-tier bicycles that balance performance,
              durability, and affordability. Our goal is to help you discover
              the joy of cycling while ensuring that every ride is smooth, safe,
              and enjoyable.
            </p>
          </div>
        </div>

        {/* Why Choose Us - Features */}
        <div className="mt-16">
          <h2 className="text-center text-4xl font-bold text-[#18181b]">
            Why Choose Us?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "🏆 Premium Quality",
                desc: "Our bikes are made with high-quality materials to ensure durability and performance.",
              },
              {
                title: "🚴 Wide Selection",
                desc: "From road bikes to mountain and electric bikes, we have something for every rider.",
              },
              {
                title: "💰 Affordable Pricing",
                desc: "We offer competitive pricing without compromising on quality.",
              },
              {
                title: "⚡ Fast Shipping",
                desc: "Enjoy quick and reliable delivery so you can start riding sooner.",
              },
              {
                title: "📞 Exceptional Support",
                desc: "Our customer service team is always ready to assist you with any inquiries.",
              },
              {
                title: "🌍 Sustainable Practices",
                desc: "We are committed to eco-friendly production and sustainable sourcing.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-[#b89579]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action (CTA) */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-[#18181b]">
            Join Our Journey
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-600">
            Become a part of our growing community. Explore our latest
            collections and discover the perfect ride for you.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/products">
              <button className={primaryButtonStyle}>Shop Now</button>
            </Link>
            <Link to="/contact">
              <button className={secondaryButtonStyle}>Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
