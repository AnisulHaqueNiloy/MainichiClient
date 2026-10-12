import { Mail, Globe, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import icon from "../../assets/whatsapp (1).png";
import { useGetCategoriesQuery } from "../../redux/features/admin/category";

const Footer = ({ initialCategories }: { initialCategories?: any[] }) => {
  const currentYear = new Date().getFullYear();

  const { data: queriedCategories } = useGetCategoriesQuery(undefined, {
    skip: Boolean(initialCategories),
  });
  const category = initialCategories || queriedCategories || [];
  return (
    <footer className="border-t border-slate-800 bg-slate-800 pb-8 pt-12 text-white">
      {/* মেইন কন্টেইনার উইথ রেসপনসিভ মার্জিন */}
      <div className="md:mx-14 mx-4">
        <section className="relative mb-12 min-h-72.5 overflow-hidden border-y border-white/15 bg-[#111923] sm:min-h-82.5">
          <div className="absolute inset-y-0 right-0 grid w-full grid-cols-3 sm:w-[62%]">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
              alt="Colorful fresh produce"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
              alt="Japanese pantry spices"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80"
              alt="Fresh seafood prepared Japanese style"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-[#111923] via-[#111923]/95 to-[#111923]/25" />
          <div className="relative flex min-h-72.5 flex-col justify-center px-5 py-8 sm:min-h-82.5 sm:px-9 lg:px-12">
            <span className="mb-3 inline-flex w-fit -rotate-2 bg-(--market-sun) px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm">
              Japan · halal · everyday
            </span>
            <div className="relative w-fit">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1 -top-5 select-none text-[58px] font-black uppercase leading-none text-transparent opacity-40 sm:-top-8 sm:text-[100px]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,.8)" }}
              >
                MARKET
              </span>
              <h2 className="relative text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl">
                HALAL
              </h2>
              <span className="absolute -right-10 -top-2 rotate-6 text-xs font-black uppercase tracking-[0.16em] text-(--market-sun) sm:-right-16 sm:text-sm">
                日本の食卓
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-white/80 sm:text-base">
              Good food, trusted choices. Bringing halal favorites closer to
              home in Japan.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/90">
              <span className="border border-white/30 px-2.5 py-1.5">
                Fresh produce
              </span>
              <span className="border border-white/30 px-2.5 py-1.5">
                Pantry spices
              </span>
              <span className="border border-white/30 px-2.5 py-1.5">
                Seafood picks
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-5 right-5 hidden rotate-[-8deg] border-2 border-(--market-sun) px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-(--market-sun) sm:block"
            >
              Market fresh
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* ১. লোগো এবং ডেসক্রিপশন */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--market-leaf)">
                <img
                  src="/logo-white.svg" // আপনার লোগো পাথ এখানে দিন
                  alt="Halal Japan"
                  className="w-6 h-6 invert brightness-0"
                />
              </div>
              <h2 className="text-xl font-black tracking-tighter text-white">
                HALAL <span className="text-blue-300">JAPAN</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Premium halal grocery provider in Japan. We bridge the gap between
              global halal standards and Japanese quality precision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.mainichihalalfoodshop.com/"
                target="blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-300 transition-all hover:bg-(--market-leaf) hover:text-white"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mainichihalals@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-300 transition-all hover:bg-(--market-leaf) hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* ২. কুইক ক্যাটাগরি */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-300">
              Quick Categories
            </h4>
            {/* all_products?category=69d22cf9ecbd315d015abbc8&page=1 */}
            <ul className="space-y-3 text-sm font-medium text-white/65">
              {category?.slice(0, 4).map((item) => (
                <li
                  key={item._id}
                  className="transition-colors hover:text-blue-300"
                >
                  <Link
                    to={`all_products?category=${item._id}&page=1`}
                    className="cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ৩. ইনফরমেশন */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-300">
              Information
            </h4>
            <ul className="space-y-3 text-sm font-medium text-white/65">
              <li className="hover:text-blue-300 cursor-pointer transition-colors">
                <Link to="/support">Support</Link>
              </li>
              <li className="hover:text-blue-300 cursor-pointer transition-colors">
                <Link to="/shipping-policy">Shipping Guide</Link>
              </li>
              <li className="hover:text-blue-300 cursor-pointer transition-colors">
                <Link to="/return-policy">Return Policy</Link>
              </li>
              <li className="hover:text-blue-300 cursor-pointer transition-colors">
                <Link to="/terms">Terms & Conditions</Link>
              </li>

              <li className="hover:text-blue-300 cursor-pointer transition-colors">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* ৪. কন্টাক্ট ইনফো */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-300">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-sm text-white/65">
                <MapPin size={20} className="shrink-0 text-blue-300" />
                <span>
                  1.15.3 Yachiyodai Higashi, Yachiyo-shi, Chiba Prefecture
                  276-0032, Japan.
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/65">
                <Phone size={18} className="shrink-0 text-blue-300" />
                <span className="block">0474814515 </span>
                <div className="flex items-center gap-2">
                  <img src={icon} alt="" className="w-4 h-4" />
                  09017039984
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ৫. কপিরাইট এবং লিগ্যাল */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            © {currentYear} Mainichi Halal Food Shop, LTD. ALL RIGHTS RESERVED.
            - AnisulHaque
          </p>
          {/* <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Cookie Policy
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
