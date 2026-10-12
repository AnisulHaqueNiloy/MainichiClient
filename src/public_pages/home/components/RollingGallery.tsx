import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import { getImageUrl } from "@/lib/utils";

// API theke asha product er type (Apnar provided interface onujayi)
interface IProduct {
  _id: string;
  title: string;
  images: string[];
}

const RenderRow = ({
  rowData,
  index,
  rowRefs,
}: {
  rowData: IProduct[];
  index: number;
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  // Infinite loop er jonno data repeat kora (at least 10-15 ta items thakle bhalo)
  const repeatedData = Array(10).fill(rowData).flat();

  const getFullImageUrl = (path: string) => {
    return getImageUrl(path);
  };

  return (
    <div className="flex mb-4 overflow-hidden select-none w-full">
      <div
        ref={(el) => {
          rowRefs.current[index] = el;
        }}
        className="flex gap-4 flex-nowrap"
      >
        {repeatedData.map((item, i) => (
          <Link
            key={`${item._id}-${i}`}
            to={`/product/${item?.slug || item?._id}`}
          >
            <div className="w-[200px] h-[140px] md:w-[350px] md:h-[220px] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm bg-gray-50">
              <img
                src={getFullImageUrl(item.images[0])}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const RollingGallery = ({ products }: { products: IProduct[] }) => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Shudhu jokhon data success-fully load hobe tokhon animation shuru hobe
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        const totalWidth = row.scrollWidth;
        const direction = index % 2 === 0 ? -1 : 1;

        // Initial Position
        gsap.set(row, {
          x: direction === 1 ? -totalWidth / 2 : 0,
        });

        // Loop Animation
        gsap.to(row, {
          x: direction === -1 ? -totalWidth / 2 : 0,
          duration: 350 + index * 10, // Speed adjust kora hoyeche
          ease: "none",
          repeat: -1,
        });
      });
    });

    return () => ctx.revert(); // GSAP Cleanup
  }, [products]);

  // Jodi kono product na thake
  if (products.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-[#fcfcfc] py-12">
      <div className="relative w-full overflow-hidden">
        {/* Row 1: Normal order */}
        <RenderRow rowData={products} index={0} rowRefs={rowRefs} />

        {/* Row 2: Reversed order (jodi products 2 tar beshi thake) */}
        <RenderRow
          rowData={[...products].reverse()}
          index={1}
          rowRefs={rowRefs}
        />

        {/* Row 3: Normal order */}
        <RenderRow rowData={products} index={2} rowRefs={rowRefs} />

        {/* Shadow Masks (Left & Right) */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default RollingGallery;
