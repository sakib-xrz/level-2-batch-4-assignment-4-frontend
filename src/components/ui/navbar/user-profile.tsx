"use client";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import UserProfileBox from "./user-profile-box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, LogOut, ShoppingBag, User, UserRound, Users } from "lucide-react";
import { IUser } from "../../../types/user.types";

interface UserProfileProps {
  user: IUser;
  isLoading: boolean;
}

export default function UserProfile({ user, isLoading }: UserProfileProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  if (isLoading) {
    return (
      <div className="hidden w-[10.2rem] animate-pulse items-center gap-2 border-gray-300 p-1 sm:rounded-md sm:border md:flex">
        <div className="size-9 rounded-full bg-gray-200"></div>
        <div className="space-y-1 pr-2">
          <p className="h-3.5 w-16 animate-pulse rounded-sm bg-gray-200"></p>
          <p className="h-2.5 w-20 animate-pulse rounded-sm bg-gray-200"></p>
        </div>
      </div>
    );
  }

  const dropdownItems: { [key: string]: MenuProps["items"] } = {
    ADMIN: [
      {
        key: `/profile`,
        label: (
          <Link to={`/profile`} className="flex items-center gap-2">
            <User className="size-5" /> Profile
          </Link>
        ),
      },
      {
        key: "/users",
        label: (
          <Link to="/users" className="flex items-center gap-2">
            <Users className="size-5" /> Users
          </Link>
        ),
      },
      {
        key: "/all-products",
        label: (
          <Link to="/all-products" className="flex items-center gap-2">
            <Box className="size-5" /> Product
          </Link>
        ),
      },
      {
        key: "/orders",
        label: (
          <Link to="/orders" className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            Orders
          </Link>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "/logout",
        label: (
          <div
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <LogOut className="size-5" /> Logout
          </div>
        ),
        danger: true,
      },
    ],

    CUSTOMER: [
      {
        key: `/profile`,
        label: (
          <Link to={`/profile`} className="flex items-center gap-2">
            <UserRound className="size-5" /> Profile
          </Link>
        ),
      },
      {
        key: "/my-orders",
        label: (
          <Link to="/my-orders" className="flex items-center gap-2">
            <ShoppingBag className="size-5" /> My Orders
          </Link>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "/logout",
        label: (
          <div
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <LogOut className="size-5" /> Logout
          </div>
        ),
        danger: true,
      },
    ],
  };

  const items = dropdownItems[user.role];

  return (
    <Dropdown
      menu={{
        items,
        selectedKeys: [pathname],
      }}
      placement="bottomRight"
      className="max-md:hidden"
    >
      <div>
        <UserProfileBox user={user} />
      </div>
    </Dropdown>
  );
}
