import React from "react";

const primaryColor = "#b89579";

const primaryButtonStyle = `flex items-center justify-center gap-2 rounded-lg font-semibold transition py-1.5 sm:py-2 w-full rounded-lg px-4 text-lg text-white shadow-none hover:bg-[#a48d70] bg-[${primaryColor}] cursor-pointer`;

const ContactUs: React.FC = () => {
  return (
    <section className="bg-[#f8f8f8] py-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#18181b]">Contact Us</h1>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Have questions or need support? Reach out to us!
          </p>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-[#b89579] focus:ring-[#b89579]"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-[#b89579] focus:ring-[#b89579]"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-[#b89579] focus:ring-[#b89579]"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Submit Button */}

            <button type="submit" className={primaryButtonStyle}>
              Send Message
            </button>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">You can also reach us via</p>
          <p className="mt-2 text-lg font-semibold text-[#18181b]">
            📧 support@bicyclestore.com
          </p>
          <p className="text-lg font-semibold text-[#18181b]">
            📞 +88 01540581443
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
