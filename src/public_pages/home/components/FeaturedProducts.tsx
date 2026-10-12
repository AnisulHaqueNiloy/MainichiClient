import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/shared/ProductCard";

const FeaturedProducts = ({
  products,
  isLoading = false,
}: {
  products: any[];
  isLoading?: boolean;
}) => {
  if (products.length === 0 && !isLoading) return null;

  return (
    <section className="bg-[var(--market-mint)] px-3 py-12 md:px-8 lg:py-16">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--market-leaf)]">
            <Sparkles className="h-4 w-4" />
            Shop the aisles
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[var(--market-ink)] md:text-4xl">
            Popular groceries
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Everyday halal groceries, ready for your basket.
          </p>
        </div>
        <Link
          to="/all_products"
          className="group inline-flex items-center gap-2 self-start rounded-lg border border-blue-200 px-4 py-2 text-sm font-bold text-[var(--market-leaf)] transition-colors hover:bg-blue-50 sm:self-auto"
        >
          Browse all products
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {isLoading && products.length === 0
          ? Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="aspect-[0.76] animate-pulse rounded-lg bg-slate-200"
              />
            ))
          : products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  name: product.title,
                  image: product.images?.[0] || "",
                }}
              />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
