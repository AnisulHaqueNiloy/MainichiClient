import { ChevronDown, ChevronRight, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useState } from "react";

const IMG_URL = import.meta.env.VITE_API_URL;

const CategorySidebar = ({
  initialCategories,
}: {
  initialCategories?: any[];
}) => {
  const { data: queriedCategories, isLoading: isQueryLoading } =
    useGetCategoriesQuery(undefined, { skip: Boolean(initialCategories) });
  const categories = initialCategories || queriedCategories || [];
  const isLoading = !initialCategories && isQueryLoading;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getFullImageUrl = (path?: string) => {
    if (!path) return null;
    return path?.startsWith("http") ? path : `${IMG_URL}${path}`;
  };

  return (
    <aside className="w-full shrink-0 border-b border-[var(--market-line)] bg-white text-[var(--market-ink)] lg:w-60 lg:border-b-0 lg:border-r">
      <div className="p-3 lg:sticky lg:top-0 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
        <div className="mb-2 px-1 lg:mb-3 lg:px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Shop by category
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--market-leaf)]" />
          </div>
        ) : (
          <nav
            aria-label="Product categories"
            className="flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0"
          >
            <Link
              to="/all_products"
              className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-[var(--market-ink)] transition-colors hover:bg-blue-50 hover:text-[var(--market-leaf)] lg:w-full lg:gap-3 lg:py-2.5 lg:text-sm"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[var(--market-leaf)] lg:h-8 lg:w-8">
                <Star className="h-3.5 w-3.5 fill-current lg:h-4 lg:w-4" />
              </span>
              Most Popular
            </Link>

            {categories?.map((category) => {
              const hasSubcategories = Boolean(category.subcategories?.length);
              const isExpanded = expandedCategory === category._id;
              const imageUrl = getFullImageUrl(category.image);

              return (
                <div key={category._id} className="shrink-0 lg:shrink">
                  <div className="flex items-center gap-1 rounded-lg transition-colors hover:bg-slate-50">
                    <Link
                      to={`/all_products?category=${category._id}`}
                      className="flex min-w-0 max-w-[190px] items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-700 lg:max-w-none lg:flex-1 lg:gap-3 lg:py-2.5 lg:text-sm"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="h-7 w-7 rounded-md border border-slate-200 object-cover lg:h-8 lg:w-8"
                        />
                      ) : (
                        <span className="h-7 w-7 rounded-md bg-slate-100 lg:h-8 lg:w-8" />
                      )}
                      <span className="truncate">{category.name}</span>
                    </Link>
                    {hasSubcategories && (
                      <button
                        type="button"
                        aria-label={`${isExpanded ? "Hide" : "Show"} ${category.name} subcategories`}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedCategory(isExpanded ? null : category._id)
                        }
                        className="mr-1 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-[var(--market-leaf)]"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubcategories && isExpanded && (
                    <div className="ml-12 space-y-1 border-l border-slate-200 py-1 pl-3">
                      {category.subcategories?.map((subcategory: any) => (
                        <Link
                          key={subcategory._id}
                          to={`/all_products?subCategory=${subcategory._id}`}
                          className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-slate-500 hover:bg-slate-50 hover:text-[var(--market-leaf)]"
                        >
                          <ChevronRight className="h-3 w-3" />
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>
    </aside>
  );
};

export default CategorySidebar;
