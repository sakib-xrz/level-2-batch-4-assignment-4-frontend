import React from "react";
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import Container from "../../../components/shared/container";

const features = [
  {
    title: "Premium Quality",
    description:
      "All our bicycles are made from high-end materials to ensure durability and performance.",
    icon: <SafetyCertificateOutlined className="text-4xl text-[#c2ab8e]" />,
  },
  {
    title: "Super Fast Shipping",
    description:
      "Get your bicycle delivered to your doorstep quickly with our fast nationwide shipping.",
    icon: <ThunderboltOutlined className="text-4xl text-[#c2ab8e]" />,
  },
  {
    title: "24/7 Customer Support",
    description:
      "We provide round-the-clock support to assist you with any inquiries or issues.",
    icon: <CustomerServiceOutlined className="text-4xl text-[#c2ab8e]" />,
  },
  {
    title: "Exclusive Deals & Offers",
    description:
      "Enjoy special discounts and rewards on your first purchase and seasonal sales.",
    icon: <GiftOutlined className="text-4xl text-[#c2ab8e]" />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <Container className="text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-[#18181b]">Why Choose Us?</h2>
          <p className="mt-2 text-gray-600">
            Experience the best quality, service, and value.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-center text-xl font-semibold text-[#18181b]">
                {feature.title}
              </h3>
              <p className="mt-2 text-center text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseUs;
