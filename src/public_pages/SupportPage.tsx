import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Truck,
  RefreshCw,
  CreditCard,
  Package,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Clock,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders placed before 2:00 PM qualify for next-day delivery across Japan via Sagawa Takkyubin or Yamato Takkyubin. You will receive a confirmation call before dispatch.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We operate exclusively on Cash-on-Delivery (COD). Pay the total bill—including shipping—in cash to the delivery person when your package arrives. Please have the exact amount ready.",
  },
  {
    question: "How much is shipping?",
    answer:
      "Tokyo area: 1,000 JPY. Osaka and other prefectures: 1,200 JPY. Charges may vary based on location and package weight.",
  },
  {
    question: "Can I return a product?",
    answer:
      'Yes. We offer a hassle-free return under our "Latemodel Restoration Supply" initiative. Contact support with your Order ID and we will guide you through a full refund once the return is verified.',
  },
  {
    question: "How do I track my order?",
    answer:
      "After your order is confirmed by phone and dispatched, tracking details are provided through our partner carriers (Sagawa or Yamato Takkyubin). You can also check order status in your account under Orders.",
  },
  {
    question: "Are all products certified halal?",
    answer:
      "Yes. Mainichi Halal Food Shop supplies premium halal groceries that meet global halal standards with Japanese quality precision.",
  },
];

const helpTopics = [
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Timelines, carriers, and shipping charges across Japan.",
    to: "/shipping-policy",
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    description: "Hassle-free returns and how to request a refund.",
    to: "/return-policy",
  },
  {
    icon: CreditCard,
    title: "Payment (COD)",
    description: "Cash-on-delivery terms and what to prepare at arrival.",
    to: "/terms",
  },
  {
    icon: Package,
    title: "Orders & Products",
    description: "Browse our halal grocery range and place a new order.",
    to: "/all_products",
  },
];

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-16 px-6 bg-white text-[#1A2E1A] font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1F5F1] text-[#1F5E3B] mb-6">
            <Headphones size={32} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
            Customer Support
          </h1>
          <div className="w-20 h-1.5 bg-[#1F5E3B] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            Need help with an order, delivery, or return? Mainichi Halal Food
            Shop is here to assist you across Japan.
          </p>
        </header>

        {/* Quick help topics */}
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
            How can we help?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.title}
                  to={topic.to}
                  className="p-6 rounded-[1.5rem] bg-gray-50 border border-gray-100 hover:shadow-lg hover:shadow-green-900/5 hover:-translate-y-1 transition-all group"
                >
                  <div className="mb-4 p-3 bg-white rounded-xl shadow-sm w-fit text-[#1F5E3B] group-hover:bg-[#1F5E3B] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{topic.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {topic.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="text-[#1F5E3B]" size={28} />
            <h2 className="text-2xl font-black uppercase">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm hover:bg-gray-100/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#1F5E3B] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-black uppercase text-center mb-8">
            Contact Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="tel:0474814515"
              className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-green-900/5 transition-all"
            >
              <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
                <Phone className="text-[#1F5E3B]" size={24} />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Call Us
              </p>
              <p className="font-bold text-lg">04-7481-4515</p>
              <p className="text-xs text-gray-400 mt-1">WhatsApp: 090-1703-9984</p>
            </a>

            <a
              href="mailto:support@japanhalalfood.com"
              className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-green-900/5 transition-all"
            >
              <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
                <Mail className="text-[#1F5E3B]" size={24} />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Email
              </p>
              <p className="font-bold text-lg break-all">
                support@japanhalalfood.com
              </p>
            </a>

            <div className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
              <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
                <MessageSquare className="text-[#1F5E3B]" size={24} />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                FAX
              </p>
              <p className="font-bold text-lg">04-7481-4516</p>
            </div>
          </div>
        </section>

        {/* Hours + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="flex items-center gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="p-4 bg-[#1A2E1A] text-white rounded-2xl shrink-0">
              <Clock size={28} />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm">Support Hours</h4>
              <p className="text-gray-500 text-sm">
                Monday — Saturday: 10:00 AM - 08:00 PM
              </p>
              <p className="text-gray-400 text-xs mt-1 italic">
                Closed on Sundays & Public Holidays
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#1A2E1A] text-white flex flex-col justify-center text-center md:text-left">
            <p className="font-bold mb-1">Still need assistance?</p>
            <p className="text-gray-300 text-sm mb-4">
              Reach our team directly or visit the contact page for full details.
            </p>
            <Link
              to="/contact"
              className="inline-flex justify-center md:justify-start text-sm font-bold uppercase tracking-wider text-[#8FCB9B] hover:text-white transition-colors"
            >
              Go to Contact →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
