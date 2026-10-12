import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  Navigate,
  useRouteError,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../public_pages/home/Home";
import SearchPage from "../public_pages/search/SearchPage";
import AllProduct from "../public_pages/all_product/AllProduct";
import ProductDetails from "../public_pages/product_details/ProductDetails";
import CartPage from "../public_pages/cart/CartPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminOverview from "@/admin_pages/overview/AdminOverview";
import AllOrders from "@/admin_pages/OrdersAdmin/AllOrders";
import AddProduct from "@/admin_pages/AddProduct/AddProduct";
import Addcategory from "@/admin_pages/addCategory/Addcategory";
import Userinfo from "@/admin_pages/usersinfo/Userinfo";
import Addbanner from "@/admin_pages/addBanners/Addbanner";
import Addoffer from "@/admin_pages/offers/Addoffer";
import ProductList from "@/admin_pages/allProduct/AllProduct";
import EditProduct from "@/admin_pages/editProduct/EditProduct";
import LoginPage from "@/authPages/LoginPage";
import RegisterPage from "@/authPages/RegisterPage";
import OrderDetails from "@/admin_pages/OrdersAdmin/OrderDetails";
import UserLayout from "@/layouts/UserLayout";
import UserOrderList from "@/user_pages/UserOrderList";
import ProfileSetting from "@/user_pages/ProfileSetting";
import AdminGuard from "./AdminGuarg";
import ShippingPolicy from "@/public_pages/ShippingPolicy/ShippingPolicy";
import ReturnPolicy from "@/public_pages/ReturnPolicy/ReturnPolicy";
import TermsPage from "@/public_pages/TermsPage";
import Contact from "@/public_pages/Contact";
import SupportPage from "@/public_pages/SupportPage";
import PrivacyPolicyPage from "../public_pages/PrivacyPolicyPage";
import UserGuard from "./UserGuard";
function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "This page could not be loaded.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <section className="w-full max-w-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--market-leaf)]">
          Page error
        </p>
        <h1 className="mt-3 text-2xl font-black text-slate-900">
          We couldn&apos;t open this page
        </h1>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-[var(--market-leaf)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--market-leaf-deep)]"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Back to shop
          </Link>
        </div>
      </section>
    </main>
  );
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search/:query",
        element: <SearchPage />,
      },
      {
        path: "all_products",
        element: <AllProduct />,
      },
      {
        path: "product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicy />,
      },
      {
        path: "return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserGuard />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <UserOrderList />,
          },
          {
            path: "profile",
            element: <ProfileSetting />,
          },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "orders", element: <AllOrders /> },
          { path: "orders/:id", element: <OrderDetails /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "edit-product/:id", element: <EditProduct /> },
          { path: "all-product", element: <ProductList /> },
          { path: "add-categories", element: <Addcategory /> },
          { path: "users", element: <Userinfo /> },
          { path: "banners", element: <Addbanner /> },
          { path: "offers", element: <Addoffer /> },
        ],
      },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
]);
