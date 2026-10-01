import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/authApi";
const IMG_URL = import.meta.env.VITE_API_URL || "";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // API Logout Mutation Hook
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: user } = useGetMeQuery(undefined);
  // console.log(user.image)
  // --- Logout Handler with SweetAlert2 ---
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d71920",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      background: "#fff",
      color: "#1f2937",
    });

    if (result.isConfirmed) {
      try {
        // 1. Call the logout API
        await logoutApi(undefined).unwrap();

        // 2. Clear Redux State

        // 3. Clear Token
        localStorage.removeItem("token");

        // 4. Success Alert & Redirect
        Swal.fire({
          title: "Logged Out!",
          text: "See you again soon.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/", { replace: true });
      } catch (error: any) {
        console.error("Logout Error:", error);

        // Force logout on error

        localStorage.removeItem("token");
        navigate("/");

        Swal.fire({
          title: "Session Cleared",
          text: "You have been logged out.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Orders", path: `/user` },
    {
      icon: <ShoppingBag size={20} />,
      label: "Profile",
      path: `/user/profile`,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-6 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo Area */}
        <div className="mb-10 px-4 flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <h1 className="text-2xl font-black tracking-tighter text-(--market-leaf)">
                HALAL JPN
              </h1>
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              User Panel
            </p>
          </div>
          <button
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-(--market-leaf) text-white shadow-sm shadow-red-100"
                    : "text-slate-600 hover:bg-red-50 hover:text-(--market-leaf)"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Area */}
        <div className="absolute bottom-8 left-6 right-6">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoggingOut ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="hidden text-lg font-black uppercase tracking-tight text-slate-900 sm:block">
              Welcome Back, {user?.name}
            </h2>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-slate-900">{user?.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-(--market-leaf)">
                {user?.name}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-red-50 font-black text-(--market-leaf)">
              {user?.image ? (
                <img
                  src={
                    user.image.startsWith("http")
                      ? user.image
                      : `${IMG_URL}${user.image}`
                  }
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="p-4 md:p-8 lg:p-10 animate-in fade-in duration-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
