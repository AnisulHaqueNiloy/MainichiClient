import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowUpRight,
  CheckCircle,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SubCategorySection } from "./subCategorySection";

gsap.registerPlugin(ScrollTrigger);

const promoCampaigns = [
  {
    eyebrow: "Fresh picks · Japan",
    title: "Brighten your everyday basket.",
    description:
      "Colorful produce and nourishing favorites, chosen for your table.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85",
    theme: "fresh",
  },
  {
    eyebrow: "Pantry essentials · Halal",
    title: "Bring home the flavor.",
    description: "Spices and pantry staples for the meals you love to make.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85",
    theme: "pantry",
  },
  {
    eyebrow: "From Japan’s waters",
    title: "Seafood night, sorted.",
    description:
      "Explore quality seafood and easy favorites for a special meal.",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1400&q=85",
    theme: "seafood",
  },
] as const;

const CategoryPromoBanner = ({
  campaign,
}: {
  campaign: (typeof promoCampaigns)[number];
}) => {
  const themeStyles = {
    fresh: {
      surface: "bg-[var(--market-leaf)]",
      fade: "from-[var(--market-leaf)] via-[var(--market-leaf)]/90",
      text: "text-white",
      eyebrow: "text-white/75",
      badge: "bg-[var(--market-sun)] text-slate-900",
      action: "text-white",
    },
    pantry: {
      surface: "bg-slate-900",
      fade: "from-slate-900 via-slate-900/90",
      text: "text-white",
      eyebrow: "text-amber-200",
      badge: "bg-white text-slate-900",
      action: "text-amber-200",
    },
    seafood: {
      surface: "bg-white",
      fade: "from-white via-white/90",
      text: "text-slate-900",
      eyebrow: "text-[var(--market-leaf)]",
      badge: "bg-[var(--market-leaf)] text-white",
      action: "text-[var(--market-leaf)]",
    },
  }[campaign.theme];

  return (
    <Link
      to="/all_products"
      className={`group relative block min-h-[236px] overflow-hidden rounded-lg border border-slate-200 ${themeStyles.surface} shadow-sm transition-shadow hover:shadow-md sm:min-h-[220px]`}
    >
      <img
        src={campaign.image}
        alt=""
        loading="lazy"
        className="absolute inset-y-0 right-0 h-full w-[46%] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] sm:w-[48%]"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${themeStyles.fade} to-transparent`}
      />
      <div className="relative z-10 flex min-h-[236px] max-w-[62%] flex-col items-start justify-center px-4 py-6 sm:min-h-[220px] sm:max-w-[58%] sm:px-9">
        <span
          className={`mb-2 rounded-sm px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${themeStyles.badge}`}
        >
          {campaign.eyebrow}
        </span>
        <h3
          className={`max-w-xl text-xl font-black leading-tight sm:text-3xl ${themeStyles.text}`}
        >
          {campaign.title}
        </h3>
        <p
          className={`mt-1 line-clamp-2 max-w-lg text-xs sm:text-sm ${themeStyles.text} opacity-80`}
        >
          {campaign.description}
        </p>
        <span
          className={`mt-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wide sm:text-xs ${themeStyles.action}`}
        >
          Shop groceries{" "}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

const FeaturedSections = ({
  categories,
  subcategoryProducts,
}: {
  categories: any[];
  subcategoryProducts: Record<string, any[]>;
}) => {
  const categorySliderRef = useRef<HTMLDivElement | null>(null);

  // API theke categories fetch kora (Subcategories shoho)
  // Shob subcategories ke ekta flat array-te niye asha
  const sublist = categories?.flatMap((cat: any) => cat.subcategories) || [];
  useEffect(() => {
    if (categories) {
      gsap.fromTo(
        ".trust-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      );
    }
  }, [categories]);

  return (
    <div className="my-3 overflow-hidden bg-slate-50">
      {/* ১. Trust Badges */}
      <div className="mx-3 px-1 md:mx-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Halal Certified",
              desc: "100% Sharia Compliant",
              icon: <CheckCircle className="text-[var(--market-leaf)]" />,
            },
            {
              title: "Express Delivery",
              desc: "Across Japan in 24h",
              icon: <Truck className="text-[var(--market-leaf)]" />,
            },
            {
              title: "Japan Quality",
              desc: "Strict Quality Control",
              icon: <ShieldCheck className="text-[var(--market-leaf)]" />,
            },
            {
              title: "Customer Support",
              desc: "Multi-language Help",
              icon: <Headphones className="text-[var(--market-leaf)]" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="trust-card flex items-center gap-3 rounded-lg border border-[var(--market-line)] bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h5 className="font-bold text-[var(--market-ink)] text-sm uppercase">
                  {item.title}
                </h5>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ২. Header Section */}
      <div ref={categorySliderRef} className="my-10 px-4 text-center md:px-8">
        <h2 className="text-3xl font-black text-[var(--market-ink)] md:text-4xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-gray-500">
          Find your favorite halal essentials quickly
        </p>
      </div>

      {/* ৩. Dynamic Category-wise Product Sections */}
      <div className="mx-3 mb-12 space-y-14 px-1 md:mx-8">
        {sublist.map((sub: any, index: number) => (
          <div key={sub._id} className="space-y-10">
            <SubCategorySection
              sub={sub}
              products={subcategoryProducts[sub._id] || []}
            />
            {(index + 1) % 3 === 0 && index < sublist.length - 1 && (
              <CategoryPromoBanner
                campaign={
                  promoCampaigns[Math.floor(index / 3) % promoCampaigns.length]
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSections;
