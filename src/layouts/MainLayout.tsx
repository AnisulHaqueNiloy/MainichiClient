import Footer from "@/components/shared/Footer";
import CategorySidebar from "@/components/shared/CategorySidebar";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <CategorySidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
