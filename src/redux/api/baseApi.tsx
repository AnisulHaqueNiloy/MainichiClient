import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ROOT = (
  import.meta.env.VITE_API_URL || "https://api.mainichihalalshop.com"
).replace(/\/+$/, "");

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ROOT}/api`,
    credentials: "include",
  }),

  tagTypes: [
    "User", // Profile & Auth
    "Product", // Product list & details
    "Category", // Category & Subcategory
    "Order", // User orders
    "AdminOrder", // Admin order management
    "AdminUser", // Admin user management
    "Review", // Product reviews & ratings
    "DashboardStats", // Admin dashboard summary
    "SubCategory", // Subcategory filters
    "Offer",
    "Orders",
    "Users",
    "Banner",
  ],

  endpoints: () => ({}),
});
