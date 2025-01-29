"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import UserProfile from "./user-profile";
import { IUser } from "../../../types/user.types";
import UserProfileBox from "./user-profile-box";

interface INavItem {
  maxWidth?: boolean;
}

export default function Navbar({ maxWidth = true }: INavItem) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const token = useAppSelector(useCurrentToken);

  const { data, isLoading } = useGetProfileQuery({}, { skip: !token });

  const user: IUser = data?.data;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const authMobileMenuItems = {
    ADMIN: [
      { key: "/profile", label: "Profile" },
      { key: "/users", label: "Users" },
      { key: "/all-products", label: "Manage Products" },
      { key: "/orders", label: "Orders" },
    ],
    CUSTOMER: [
      { key: "/profile", label: "Profile" },
      { key: "/my-orders", label: "My Orders" },
    ],
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white">
      <nav
        aria-label="Global"
        className={cn(
          "mx-auto flex h-20 items-center justify-between px-4",
          {
            "max-w-none": !maxWidth,
          },
          {
            "max-w-7xl": maxWidth,
          },
        )}
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Bicycle Store
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "text-sm font-semibold text-gray-500 uppercase decoration-2 underline-offset-2 hover:underline",
                {
                  "text-gray-900 underline": pathname === item.href,
                },
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {token ? (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
            <UserProfile user={user} isLoading={isLoading} />
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2">
            <Link to="/login" className="text-sm font-semibold text-gray-900">
              Log in
            </Link>
            <Link to="/register" className="ml-4">
              <Button type="primary">Sign up</Button>
            </Link>
          </div>
        )}
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10 bg-black opacity-50" />
          <div className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white px-4 py-6">
            <div className="flex items-center justify-between">
              {token ? (
                <UserProfileBox user={user} />
              ) : (
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-900"
                >
                  Bicycle Store
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-semibold text-gray-500 hover:bg-gray-50",
                    {
                      "bg-gray-100 text-gray-900": pathname === item.href,
                    },
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {token ? (
                <>
                  <hr className="h-[1px] border-0 bg-gray-300" />
                  {authMobileMenuItems[user?.role as "ADMIN" | "CUSTOMER"]?.map(
                    (item, index) => (
                      <Link
                        key={index}
                        to={item.key}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-base font-semibold text-gray-500 hover:bg-gray-50",
                          {
                            "bg-gray-100 text-gray-900": pathname === item.key,
                          },
                        )}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                  <div
                    onClick={() => {
                      navigate("/logout");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full"
                  >
                    <Button type="primary" className="w-full" danger>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-base font-semibold text-gray-500 hover:bg-gray-50",
                      {
                        "bg-gray-100 text-gray-900": pathname === "/login",
                      },
                    )}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button type="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
