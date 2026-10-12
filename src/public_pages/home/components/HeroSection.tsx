import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useGetOfferQuery } from "@/redux/features/admin/offer";
import { useGetBannersQuery } from "@/redux/features/admin/bannerApi";
import { getImageUrl } from "@/lib/utils";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85";

const HeroSection = ({
  initialCategories,
  initialBanners,
  initialOffer,
}: {
  initialCategories?: any[];
  initialBanners?: any[];
  initialOffer?: any;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: queriedCategories } = useGetCategoriesQuery(undefined, {
    skip: Boolean(initialCategories?.length),
  });
  const { data: queriedOffer } = useGetOfferQuery(undefined, {
    skip: Boolean(initialOffer),
  });
  const { data: bannersResponse } = useGetBannersQuery(undefined, {
    skip: Boolean(initialBanners?.length),
  });

  const category = initialCategories?.length
    ? initialCategories
    : queriedCategories || [];
  const banners = initialBanners?.length
    ? initialBanners
    : bannersResponse?.data || bannersResponse || [];
  const offerData = initialOffer || queriedOffer;

  const getFullImageUrl = (path?: string) => {
    return getImageUrl(path);
  };

  const goToSlide = (slide: number) => {
    if (banners.length === 0) return;
    setCurrentSlide((slide + banners.length) % banners.length);
  };

  // Banner Auto-slider logic for dynamic banners
  useEffect(() => {
    if (banners.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 10000); // 10 seconds interval
      return () => clearInterval(slideInterval);
    }
  }, [banners.length]);

  // Helper to check if file is a video
  const isVideoFile = (url: string) => {
    return url.match(/\.(mp4|webm|mov|ogg|quicktime)$/i);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* --- Headline Marquee --- */}
      {/* {!isOfferLoading && offerData?.isActive && (
        <div className="bg-[#1F5E3B] text-white py-2 overflow-hidden relative z-[60]">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-10 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            <p>{offerData.text}</p>
            <p>{offerData.text}</p>
          </div>
        </div>
      )} */}

      {offerData?.isActive && (
        <div className="bg-[var(--market-leaf)] text-white py-2 overflow-hidden relative z-[60] border-y border-white/10">
          {/* Container-ta flex hobe ebong content repeat hobe */}
          <div className="flex whitespace-nowrap animate-marquee">
            {/* 4-5 bar repeat korle boro screen-e faka hobe na */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 mx-5">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  {offerData.text}
                </p>
                {/* Dot ba Star divider dile repetition sundor lage */}
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Dynamic Banner Slider --- */}
      <div className="relative h-[390px] min-h-[370px] w-full overflow-hidden bg-white sm:h-[360px] lg:h-[380px]">
        {banners.length > 0 ? (
          banners.map((item: any, index: number) => (
            <div
              key={item._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 w-full h-full">
                {isVideoFile(item.image) ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    key={getFullImageUrl(item.image)}
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={getFullImageUrl(item.image)}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={getFullImageUrl(item.image)}
                    alt={item.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = FALLBACK_HERO_IMAGE;
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[68%] sm:object-contain sm:object-right"
                  />
                )}
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 z-[15] bg-gradient-to-r from-white via-white/80 to-transparent" />
              </div>

              {/* Banner Content */}
              <div className="relative z-[20] flex h-full items-center px-4 pr-16 text-slate-900 sm:px-8 sm:pr-20 lg:px-12">
                <div className="max-w-[620px] space-y-3 py-6 sm:space-y-4 sm:py-8">
                  <div className="mb-6 h-1 w-14 rounded-full bg-[var(--market-leaf)]" />
                  <span className="inline-block rounded-sm bg-[var(--market-leaf)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    The Standard of Purity in Japan
                  </span>
                  <h2 className="text-4xl font-black leading-[1.05] md:text-6xl">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <NavLink to="all_products" className="cursor-pointer">
                      <Button className="h-11 rounded-md bg-[var(--market-leaf)] px-6 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--market-leaf-deep)]">
                        Start Shopping
                      </Button>
                    </NavLink>
                    <NavLink to="all_products" className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="h-11 rounded-md border-slate-300 bg-white/90 px-6 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-100"
                      >
                        View Offers
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>

              {index === currentSlide && banners.length > 1 && (
                <div className="absolute right-4 top-4 z-[30] flex items-center gap-2 sm:right-8 sm:top-6">
                  <button
                    type="button"
                    aria-label="Previous banner"
                    onClick={() => goToSlide(currentSlide - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-800 transition-colors hover:bg-[var(--market-leaf)] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-2">
                    {banners.map((banner: any, bannerIndex: number) => (
                      <button
                        key={banner._id}
                        type="button"
                        aria-label={`Go to banner ${bannerIndex + 1}`}
                        onClick={() => goToSlide(bannerIndex)}
                        className={`h-1.5 rounded-full transition-all ${bannerIndex === currentSlide ? "w-6 bg-[var(--market-leaf)]" : "w-1.5 bg-slate-300"}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Next banner"
                    onClick={() => goToSlide(currentSlide + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-800 transition-colors hover:bg-[var(--market-leaf)] hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          /* Fallback when no banners exist */
          <div className="absolute inset-0">
            <img
              src={FALLBACK_HERO_IMAGE}
              alt="Fresh vegetables and seasonal groceries"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/55 to-transparent" />
            <div className="relative z-20 flex h-full items-center px-5 pr-16 text-white sm:px-9 sm:pr-20 lg:px-12">
              <div className="max-w-[620px] space-y-3 py-6 sm:space-y-4 sm:py-8">
                <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                  MainichiHalal Shop
                </span>
                <h2 className="max-w-[560px] text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
                  Good food, thoughtfully sourced.
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                  Discover halal groceries and everyday favorites for your
                  kitchen in Japan.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <NavLink to="all_products" className="cursor-pointer">
                    <Button className="h-11 rounded-md bg-[var(--market-leaf)] px-6 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--market-leaf-deep)]">
                      Start Shopping
                    </Button>
                  </NavLink>
                  <NavLink to="all_products" className="cursor-pointer">
                    <Button
                      variant="outline"
                      className="h-11 rounded-md border-white/70 bg-white/90 px-6 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-white"
                    >
                      View Offers
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Category Cards --- */}
      <div className="overflow-hidden bg-white py-8">
        <div className="mx-3 px-1 md:mx-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {category?.map((cat: any) => (
              <Link
                key={cat?._id}
                to={`all_products?category=${cat?._id}&page=1`}
                className="mx-auto w-full max-w-[220px]"
              >
                <div className="group cursor-pointer overflow-hidden rounded-lg border border-[var(--market-line)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--market-leaf)] hover:shadow-lg">
                  <div className="aspect-[1.08] w-full overflow-hidden bg-slate-100">
                    <img
                      src={getFullImageUrl(cat.image)}
                      alt={cat.name}
                      loading="eager"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_HERO_IMAGE;
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="min-h-12 px-2 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--market-ink)] transition-colors group-hover:text-[var(--market-leaf)]">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
