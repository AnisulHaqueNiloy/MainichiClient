import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import SidebarFilter from "./components/SidebarFilter";
import ProductCard from "@/components/shared/ProductCard";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGetProductsQuery } from "@/redux/features/admin/products";
import SEO from "@/components/shared/SEO";

// 🎯 API Response er structure define korun jate TS error na dey
interface IProductResponse {
  success: boolean;
  data: any[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: string | number;
    limit: string | number;
  };
}

const AllProduct = ({
  initialResponse,
}: {
  initialResponse?: IProductResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters
  const subCategory = searchParams.get("subCategory") || "";
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;

  // Local states for filtering
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState("newest");

  // Products fetch kora (As IProductResponse type casting)
  const canUseInitialResponse =
    Boolean(initialResponse) &&
    Array.isArray(initialResponse?.data) &&
    !category &&
    !subCategory &&
    !keyword &&
    page === 1 &&
    priceRange[0] === 0 &&
    priceRange[1] === 15000 &&
    sortBy === "newest";

  const { data: queriedResponse, isLoading: isQueryLoading } =
    useGetProductsQuery(
      {
        category,
        subCategory,
        keyword,
        page,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort:
          sortBy === "low"
            ? "priceLow"
            : sortBy === "high"
              ? "priceHigh"
              : "newest",
        limit: 12,
      },
      { skip: canUseInitialResponse },
    ) as { data: IProductResponse | undefined; isLoading: boolean };

  // 🎯 Error Fix: Optional chaining er sathe default value set kora hoyeche
  const apiResponse = canUseInitialResponse ? initialResponse : queriedResponse;
  const products = apiResponse?.data || [];
  const meta = apiResponse?.meta || { totalCount: 0, totalPages: 1 };
  const isProductsLoading = !canUseInitialResponse && isQueryLoading;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const pageTitle = keyword
    ? `Search: "${keyword}" - Halal Groceries`
    : subCategory || category
      ? "Category Products - 100% Halal Food"
      : "All Halal Products & Groceries in Japan";

  return (
    <div className="w-full px-3 py-6 lg:px-4 lg:py-8">
      <SEO
        title={pageTitle}
        description={`Explore all ${meta.totalCount || ""} certified halal groceries, spices, meats, and snacks available in Japan with fast cash-on-delivery shipping.`}
        url={`/all_products${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ""}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.mainichihalalfoodshop.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "All Products",
              item: "https://www.mainichihalalfoodshop.com/all_products",
            },
          ],
        }}
      />
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--market-ink)] lg:text-4xl">
            {keyword
              ? `Results for "${keyword}"`
              : subCategory || category
                ? "Filtered Products"
                : "All Products"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Showing {meta.totalCount} results
          </p>
        </div>
      </div>

      <main className="flex-1">
        <div className="mb-5 flex flex-col gap-2 rounded-lg border border-[var(--market-line)] bg-white p-1.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <SidebarFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <div className="flex justify-end px-1">
            <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[190px] rounded-lg border border-gray-200 bg-white font-semibold shadow-sm">
                <SelectValue placeholder="Sort by: Newest" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isProductsLoading ? (
          <div className="flex justify-center py-20">
            <Loader2
              className="animate-spin text-[var(--market-leaf)]"
              size={40}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      name: product.title,
                      image: product.images?.[0] || "",
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400 font-bold">
                  No products found in this criteria.
                </div>
              )}
            </div>

            {meta.totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent className="gap-2">
                  <Button
                    variant="ghost"
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="rounded-xl bg-white shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </Button>

                  {[...Array(meta.totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "ghost"}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold ${
                        page === i + 1
                          ? "bg-[var(--market-leaf)] text-white shadow-md"
                          : "bg-white"
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="ghost"
                    disabled={page >= meta.totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="rounded-xl bg-white shadow-sm"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AllProduct;
