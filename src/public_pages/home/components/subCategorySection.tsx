import { ShoppingCart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const IMG_URL = import.meta.env.VITE_API_URL;
import { useSubCategoryProducts } from "@/customHooks/useSubCategoryProducts";

export const SubCategorySection = ({
  sub,
  products,
}: {
  sub: any;
  products: any[];
}) => {
  const dispatch = useDispatch();
  const { products: queriedProducts } = useSubCategoryProducts(
    sub._id,
    5,
    products.length > 0,
  );
  const visibleProducts = products.length > 0 ? products : queriedProducts;

  if (visibleProducts.length === 0) return null;

  return (
    <div className="category-block animate-in fade-in duration-700">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="flex items-center gap-3 text-2xl font-black text-[var(--market-ink)] md:text-3xl">
          <span className="h-2 w-2 rounded-full bg-[var(--market-tomato)]"></span>
          {sub.name}
        </h2>
        <Link to={`all_products/?subCategory=${sub._id}`}>
          <button className="flex cursor-pointer items-center gap-1 text-sm font-bold text-gray-600 transition-all hover:text-[var(--market-tomato)]">
            View All <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {visibleProducts.map((product: any) => (
          <Link key={product._id} to={`product/${product.slug}`}>
            <div className="group overflow-hidden rounded-lg border border-[var(--market-line)] bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--market-leaf)] hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {product.bestSeller && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--market-leaf)] px-2.5 py-1 text-[9px] font-bold text-white">
                    HOT
                  </span>
                )}
                <img
                  // Backend theke asha image path fix (http://localhost:5000 add kora hoyeche)
                  src={
                    product.images?.[0]
                      ? `${IMG_URL}${product.images[0]}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full  transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  aria-label={`Add ${product.title} to cart`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dispatch(
                      addToCart({
                        id: product._id,
                        name: product.title,
                        price: product.price,
                        qty: 1,
                        img: product.images?.[0]
                          ? `${IMG_URL}${product.images[0]}`
                          : "/placeholder.png",
                        desc: product.desc,
                        slug: product.slug,
                      }),
                    );
                  }}
                  className="absolute bottom-3 right-3 rounded-lg bg-[var(--market-leaf)] p-2.5 text-white opacity-100 shadow-lg transition-colors hover:bg-[var(--market-leaf-deep)] sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
              <div className="p-4">
                <p className="mb-1 line-clamp-1 text-[9px] font-black uppercase tracking-widest text-[var(--market-leaf)]">
                  {product.title}
                </p>
                <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-bold text-[var(--market-ink)] transition-colors group-hover:text-[var(--market-tomato)]">
                  {product.desc}
                </h3>
                <p className="text-lg font-black text-[var(--market-ink)]">
                  ¥{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
