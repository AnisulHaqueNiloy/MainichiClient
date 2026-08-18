import { UserRound, LockKeyhole, ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-[#1A2E1A]">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Privacy Policy</h1>
        <p className="text-gray-500">
          Please read this privacy policy carefully to understand how we handle
          your information.
        </p>
      </header>

      <div className="space-y-12">
        {/* Information Collection */}
        <section className="flex gap-6 items-start">
          <UserRound className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">Information Collection</h3>

            <p className="text-gray-600 leading-relaxed">
              At <strong>Mainichi Halal Shop</strong>, we respect your privacy.
              We do not intentionally collect or maintain unnecessary personal
              information. When information is required to process an order or
              provide delivery services, we only use the information necessary
              to fulfill your request.
            </p>
          </div>
        </section>

        {/* Use of Information */}
        <section className="flex gap-6 items-start">
          <LockKeyhole className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">
              Use of Customer Information
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Any customer information provided through Mainichi Halal Shop is
              used only for legitimate business purposes, including:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Processing and fulfilling customer orders.</li>
              <li>Delivering products to the provided address.</li>
              <li>Contacting customers regarding their orders.</li>
              <li>Providing customer support when necessary.</li>
              <li>Improving our ordering and delivery services.</li>
            </ul>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="flex gap-6 items-start">
          <ShieldCheck className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">Information Sharing</h3>

            <p className="text-gray-600 leading-relaxed">
              We respect the privacy of our customers. Mainichi Halal Shop does
              not sell, rent, or share customers' personal information with
              third parties for marketing purposes. Information may only be
              shared when necessary to fulfill an order, provide a requested
              service, or comply with applicable law.
            </p>
          </div>
        </section>

        {/* Product & Halal Commitment */}
        <section className="flex gap-6 items-start">
          <ShieldCheck className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">
              Product Quality & Halal Commitment
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Mainichi Halal Shop is committed to providing halal products to
              our customers. We make reasonable efforts to maintain the quality,
              freshness, and proper handling of our products throughout the
              preparation and delivery process.
            </p>
          </div>
        </section>

        {/* Customer Inquiries */}
        <section className="flex gap-6 items-start">
          <UserRound className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">Customer Inquiries</h3>

            <p className="text-gray-600 leading-relaxed">
              Customers have the right to ask questions about our products,
              including inquiries regarding how products are prepared,
              processed, or handled. We aim to provide clear and transparent
              information about our products whenever such information is
              available.
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section className="flex gap-6 items-start">
          <LockKeyhole className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">Data Security</h3>

            <p className="text-gray-600 leading-relaxed">
              We take reasonable measures to protect customer information from
              unauthorized access, misuse, or disclosure. However, no electronic
              system or method of data transmission can be guaranteed to be
              completely secure.
            </p>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="flex gap-6 items-start">
          <ShieldCheck className="text-[#1F5E3B] shrink-0" size={40} />

          <div>
            <h3 className="font-bold text-2xl mb-4">
              Changes to This Privacy Policy
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Mainichi Halal Shop may update this Privacy Policy from time to
              time to reflect changes to our services or applicable
              requirements. Any updated version will be published on this page
              with a revised date.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        <p>© 2026 Mainichi Halal Shop. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
