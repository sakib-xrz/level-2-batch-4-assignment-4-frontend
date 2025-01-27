import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar maxWidth={false} />
      <div>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 px-4 py-5 lg:py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
