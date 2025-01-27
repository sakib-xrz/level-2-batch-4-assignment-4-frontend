import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
