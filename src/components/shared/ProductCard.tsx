import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { getImageUrl } from "@/lib/utils";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const rawImage = product.image || product.images?.[0] || "";
  const imageUrl = getImageUrl(rawImage);

  return (
    <Link to={`/product/${product?.slug || product?._id}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--market-line)] bg-white shadow-[0_4px_18px_rgba(16,75,50,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--market-leaf)] hover:shadow-[0_12px_28px_rgba(16,75,50,0.16)]">
        <div className="relative aspect-square overflow-hidden bg-[var(--market-mint)]">
          {product.stock === "out-of-stock" && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[9px] font-bold uppercase text-white">
              Out of Stock
            </span>
          )}
          <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm backdrop-blur-md transition-colors hover:bg-[#FCECF1] hover:text-[#C94F72]">
            <Heart size={16} />
          </button>
          <img
            src={imageUrl || "/placeholder.png"}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          {/* 🎯 FIXED: Object render na kore string (name) render kora hoyeche */}
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-[var(--market-leaf)]">
            {product.category?.name || "General"}
          </p>

          <h3 className="mb-1 line-clamp-2 min-h-10 text-sm font-bold text-[var(--market-ink)]">
            {product.name}
          </h3>

          <div className="mb-3 flex items-center gap-1 text-[#F4B942]">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold text-gray-800">
              {product.ratings?.average || 0}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              ({product.ratings?.count || 0})
            </span>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="text-lg font-black text-[var(--market-tomato)]">
                ¥{product.price}
              </p>
              {product.discountPrice && (
                <p className="text-xs text-gray-400 line-through">
                  ¥{product.discountPrice}
                </p>
              )}
            </div>
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                dispatch(
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    qty: 1,
                    img: imageUrl,
                    desc: product.desc,
                    slug: product.slug,
                  }),
                );
              }}
              className="rounded-lg bg-[var(--market-tomato)] p-2.5 text-white shadow-md transition-all hover:bg-[var(--market-tomato-deep)]"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
