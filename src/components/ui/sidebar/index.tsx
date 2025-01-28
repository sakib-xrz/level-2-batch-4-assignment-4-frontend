import { Link, useLocation } from "react-router-dom";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import { useAppSelector } from "../../../redux/hooks";
import { IUser } from "../../../types/user.types";
import { cn } from "../../../utils/cn";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const token = useAppSelector(useCurrentToken);

  const { data, isLoading } = useGetProfileQuery({}, { skip: !token });

  const user: IUser = data?.data;

  const sidebarNavOptions = {
    ADMIN: [
      { key: "/profile", label: "Profile" },
      { key: "/users", label: "Users" },
      { key: "/all-products", label: "Products" },
      { key: "/orders", label: "Orders" },
    ],
    CUSTOMER: [
      { key: "/profile", label: "Profile" },
      { key: "/my-orders", label: "My Orders" },
    ],
  };
  return (
    <div className="sticky top-[81px] z-50 hidden h-[calc(100vh-80px)] w-full space-y-1 border-r border-gray-200 bg-white p-2 lg:block">
      {isLoading ? (
        <div className="space-y-1">
          <div className="block h-10 animate-pulse rounded-sm bg-gray-200 px-3"></div>
          <div className="block h-10 animate-pulse rounded-sm bg-gray-200 px-3"></div>
          <div className="block h-10 animate-pulse rounded-sm bg-gray-200 px-3"></div>
          <div className="block h-10 animate-pulse rounded-sm bg-gray-200 px-3"></div>
        </div>
      ) : (
        sidebarNavOptions[user?.role as "ADMIN" | "CUSTOMER"]?.map(
          (item, index) => (
            <Link
              key={index}
              to={item.key}
              className={cn(
                "block rounded-sm px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-200",
                {
                  "bg-gray-900 text-white hover:bg-gray-900 hover:text-white":
                    pathname === item.key,
                },
              )}
            >
              {item.label}
            </Link>
          ),
        )
      )}
    </div>
  );
}
