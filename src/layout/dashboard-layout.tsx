import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar maxWidth={false} />
      <div>
        <div className="flex">
          <aside className="hidden w-[300px] xl:block">
            <Sidebar />
          </aside>
          <div className="w-full px-4 py-5 lg:py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
