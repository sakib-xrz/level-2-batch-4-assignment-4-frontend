import { Link } from "react-router-dom";

export default function Footer() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Bicycle Store
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0">
            {navItems.map((item, index) => (
              <li key={index} className="me-4 hover:underline md:me-6">
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <img
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
            alt="logo"
          />
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto" />
        <span className="block text-sm text-gray-500 sm:text-center">
          Copyright ©{new Date().getFullYear()} Developed by{" "}
          <a
            href="https://sakib-dev.xyz/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Md Sakibul Islam
          </a>{" "}
        </span>
      </div>
    </footer>
  );
}
