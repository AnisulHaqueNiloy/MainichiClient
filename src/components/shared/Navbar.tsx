import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Loader2,
  LogOut,
  Settings,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// RTK Query & Redux Hooks
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/authApi";
import { useSelector } from "react-redux";

import LanguageDropdown from "../translation/LanguageDropdown";

const IMG_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Search State ---
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // 1. Auth Status & User Data
  const { data: user, isLoading: isUserLoading } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";

  // 2. Cart Count
  const cartState = useSelector((state: any) => state.cart);
  const items = cartState?.items || cartState?.cartItems || [];
  const totalCartCount = items.reduce(
    (total: number, item: any) => total + (item.qty || item.quantity || 1),
    0,
  );

  // --- Search Handler ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Backend service 'keyword' filter support kore, tai query param e keyword pathachchi
      navigate(
        `/all_products?keyword=${encodeURIComponent(searchTerm.trim())}`,
      );
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${IMG_URL}${path}`;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-[var(--market-line)] bg-white text-[var(--market-ink)] shadow-sm">
      <div className="bg-[var(--market-leaf)] text-white">
        <div className="mx-auto flex min-h-[4.5rem] items-center justify-between gap-3 px-4 py-2 lg:gap-5 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[var(--market-leaf)] shadow-sm">
              <span className="text-xl font-black">✦</span>
            </div>
            <h1 className="text-base font-black leading-tight tracking-tight text-white sm:text-lg">
              MainichiHalal <br className="sm:hidden" />
              <span className="text-[var(--market-sun)]">Shop</span>
            </h1>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 border-l border-white/25 pl-4 text-xs font-semibold sm:flex lg:pl-5">
            <MapPin className="h-4 w-4 text-[var(--market-sun)]" />
            <span className="leading-tight">
              Delivery across
              <br />
              Japan
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden min-w-0 flex-1 items-center lg:flex">
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-sm"
            >
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search groceries and household essentials"
                className="h-11 min-w-0 flex-1 rounded-none border-0 bg-white pl-4 text-[var(--market-ink)] placeholder:text-slate-500 focus-visible:ring-0"
              />
              <Button
                type="submit"
                aria-label="Search products"
                className="h-11 w-14 rounded-none bg-[var(--market-sun)] text-slate-900 hover:bg-yellow-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden xl:flex items-center gap-6 font-medium text-white/90 mr-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--market-sun)] font-bold"
                    : "hover:text-white"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--market-sun)] font-bold"
                    : "hover:text-white"
                }
                to="/all_products"
              >
                Shop All
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--market-sun)] font-bold"
                    : "hover:text-white"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              <div className="hidden md:block">
                <LanguageDropdown />
              </div>

              {!isAdmin && (
                <Link to="/cart">
                  <div className="relative cursor-pointer group">
                    <ShoppingCart className="h-6 w-6 text-white group-hover:text-[var(--market-sun)]" />
                    {totalCartCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--market-sun)] text-[10px] font-bold text-slate-900">
                        {totalCartCount}
                      </span>
                    )}
                  </div>
                </Link>
              )}

              <div className="border-l border-white/25 hidden md:block pl-3 md:pl-5 ml-1">
                {isUserLoading ? (
                  <Loader2 className="animate-spin text-[var(--market-sun)] w-6 h-6" />
                ) : isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-10 px-2 gap-2 rounded-md bg-white/15 text-white hover:bg-white/25"
                      >
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white overflow-hidden">
                          {user.image ? (
                            <img
                              src={getFullImageUrl(user.image)!}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <span className="text-sm font-bold text-white hidden xl:inline-block max-w-[100px] truncate">
                          {user.name.split(" ")[0]}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 mt-2 p-2 rounded-2xl border-gray-100 shadow-xl"
                    >
                      <div className="px-3 py-3">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-[var(--market-ink)] truncate">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate(isAdmin ? "/admin" : "/user")}
                        className="cursor-pointer py-3 rounded-xl gap-3"
                      >
                        {isAdmin ? <Settings size={18} /> : <User size={18} />}{" "}
                        {isAdmin ? "Admin Dashboard" : "Dashboard"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer py-3 rounded-xl gap-3 text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <LogOut size={18} /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="rounded-md px-4 font-bold text-white hover:bg-white/10"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-[var(--market-sun)] hover:bg-yellow-300 rounded-md px-4 text-slate-900 font-bold">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-7 h-7 text-white" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15 px-4 py-2 lg:hidden">
          <form
            onSubmit={handleSearch}
            className="flex overflow-hidden rounded-md bg-white"
          >
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search groceries"
              className="h-10 min-w-0 flex-1 rounded-none border-0 bg-white pl-3 text-[var(--market-ink)] focus-visible:ring-0"
            />
            <Button
              type="submit"
              aria-label="Search products"
              className="h-10 w-12 rounded-none bg-[var(--market-sun)] text-slate-900 hover:bg-yellow-300"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden h-10 items-center gap-8 border-b border-slate-200 px-6 text-xs font-bold uppercase tracking-wide text-slate-700 lg:flex xl:px-8">
        <NavLink
          to="/all_products"
          className="flex items-center gap-2 hover:text-[var(--market-leaf)]"
        >
          <Menu className="h-4 w-4" /> Shop by category
        </NavLink>
        <NavLink to="/all_products" className="hover:text-[var(--market-leaf)]">
          All groceries
        </NavLink>
        <NavLink to="/" className="hover:text-[var(--market-leaf)]">
          Popular picks
        </NavLink>
        <NavLink
          to="/shipping-policy"
          className="hover:text-[var(--market-leaf)]"
        >
          Delivery information
        </NavLink>
        <NavLink
          to="/contact"
          className="ml-auto hover:text-[var(--market-leaf)]"
        >
          Help line
        </NavLink>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 bg-white text-[var(--market-ink)] z-[150] md:hidden transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <h1 className="text-lg font-bold text-[var(--market-ink)]">
            HALAL JAPAN
          </h1>
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8 text-gray-600" />
          </Button>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Mobile User Profile */}
          {isLoggedIn && (
            <div className="flex items-center gap-4 rounded-lg bg-slate-100 p-4">
              <div className="w-12 h-12 bg-[var(--market-leaf)] rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                {user.image ? (
                  <img
                    src={getFullImageUrl(user.image)!}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name[0]
                )}
              </div>
              <div>
                <p className="font-bold text-[var(--market-ink)]">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* Mobile Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--market-leaf)]" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="h-14 rounded-lg border border-slate-200 bg-slate-50 pl-12"
            />
          </form>

          <div className="pt-2">
            <LanguageDropdown />
          </div>

          <div className="space-y-4">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold"
            >
              Home
            </NavLink>
            <NavLink
              to="/all_products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold"
            >
              Shop All
            </NavLink>
            <NavLink
              to={isAdmin ? "/admin" : "/user"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold text-[var(--market-leaf)]"
            >
              {isAdmin ? "Admin Panel" : "User Panel"}
            </NavLink>
            {!isAdmin && (
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-2xl font-bold"
              >
                My Cart ({totalCartCount})
              </NavLink>
            )}
          </div>

          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="w-full h-14 rounded-2xl bg-red-50 text-red-600 font-bold"
              >
                Logout
              </Button>
            ) : (
              <div className="grid gap-4">
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-14 rounded-lg bg-blue-50 font-bold text-[var(--market-leaf)]"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-14 rounded-lg bg-[var(--market-leaf)] text-white font-bold"
                >
                  Register Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
