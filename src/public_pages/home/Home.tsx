import FeaturedSections from "./components/FeaturedSection";
import HeroSection from "./components/HeroSection";
import Newsletter from "./components/Newsletter";
import RollingGallery from "./components/RollingGallery";
import FeaturedProducts from "./components/FeaturedProducts";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useGetProductsQuery } from "@/redux/features/admin/products";
import { useGetBannersQuery } from "@/redux/features/admin/bannerApi";
import SEO from "@/components/shared/SEO";

export interface HomeData {
  categories: any[];
  banners: any[];
  offer: any;
  featuredProducts: any[];
  rollingProducts: any[];
  subcategoryProducts: Record<string, any[]>;
}

export default function Home({
  data = {
    categories: [],
    banners: [],
    offer: null,
    featuredProducts: [],
    rollingProducts: [],
    subcategoryProducts: {},
  },
}: {
  data?: HomeData;
}) {
  const { data: queriedCategories } = useGetCategoriesQuery(undefined, {
    skip: data.categories.length > 0,
  });
  const categories =
    data.categories.length > 0 ? data.categories : queriedCategories || [];
  const { data: bannerResponse } = useGetBannersQuery(undefined, {
    skip: data.banners.length > 0,
  });
  const banners = data.banners.length
    ? data.banners
    : Array.isArray(bannerResponse?.data)
      ? bannerResponse.data
      : Array.isArray(bannerResponse)
        ? bannerResponse
        : [];
  const { data: productResponse, isLoading: isProductsLoading } =
    useGetProductsQuery(
      { page: 1, limit: 8 },
      {
        skip: data.featuredProducts.length > 0,
      },
    ) as { data?: any; isLoading: boolean };
  const featuredProducts = data.featuredProducts.length
    ? data.featuredProducts
    : productResponse?.data || productResponse?.products || [];

  return (
    <div>
      <SEO
        title="100% Certified Halal Groceries in Japan"
        description="Shop fresh halal meat, chicken, beef, basmati rice, spices, and everyday pantry essentials online in Japan with fast nationwide delivery and Cash on Delivery (COD)."
        keywords="halal food japan, halal food online tokyo, halal grocery japan, mainichi halal, buy halal meat japan, halal food delivery japan"
        url="/"
      />
      <HeroSection
        initialCategories={categories}
        initialBanners={banners}
        initialOffer={data.offer}
      />
      <FeaturedProducts
        products={featuredProducts}
        isLoading={isProductsLoading && data.featuredProducts.length === 0}
      />
      <RollingGallery products={data.rollingProducts} />
      <FeaturedSections
        categories={categories}
        subcategoryProducts={data.subcategoryProducts}
      />
      <Newsletter />
    </div>
  );
}
