import React from "react";
import { Button } from "antd";
import Container from "../../../components/shared/container";

const StaticSections: React.FC = () => {
  return (
    <>
      {/* How It Works Section */}
      <section className="bg-[#f8f8f8] text-gray-900">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-[#18181b]">How It Works</h2>
            <p className="mt-2 text-gray-600">
              A simple process to get your perfect ride.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Browse Our Collection",
                desc: "Explore our range of premium bicycles and find the best fit for your needs.",
              },
              {
                step: "2",
                title: "Place Your Order",
                desc: "Add your favorite bike to the cart and complete the secure checkout process.",
              },
              {
                step: "3",
                title: "Enjoy Your Ride",
                desc: "Get fast delivery and start enjoying your brand-new bike right away!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <span className="text-3xl font-extrabold text-[#b89579]">
                  {item.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Join Our Community Section */}
      <section className="bg-[#18181b] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-[#b89579]">
            Join Our Community
          </h2>
          <p className="mt-2 text-gray-400">
            Be the first to know about exclusive deals, product launches, and
            special events.
          </p>

          {/* Newsletter Signup */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500"
              />
              <Button
                type="primary"
                className="border-none !bg-[#b89579] px-6 py-3 text-black hover:!bg-[#a48d70]"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <p className="mt-4 text-gray-400">
            Follow us for the latest updates on social media.
          </p>
        </div>
      </section>
    </>
  );
};

export default StaticSections;
