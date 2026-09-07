import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <section className="bg-[#F8F5EF] min-h-screen pt-36 pb-24">

      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] mb-4">
            Legal Information
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923]">
            Terms & Conditions
          </h1>

          <p className="mt-6 font-['Outfit'] text-gray-600">
            Last Updated: August 2026
          </p>

        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2, duration: .8 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10"
        >

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              1. Acceptance of Terms
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              By accessing and using the KASA LUXE website, you agree to
              comply with these Terms & Conditions. If you do not agree
              with any part of these terms, please discontinue using our
              website.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              2. Products & Services
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              KASA LUXE specializes in handcrafted stone sculptures,
              temple architecture, custom stone
              carvings, and worldwide export services. Product images
              displayed on this website are for reference and may vary
              slightly due to handcrafted production.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              3. Quotations & Orders
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              All quotations provided through WhatsApp, phone, or email
              are subject to confirmation. Prices may vary depending on
              material, size, design complexity, customization, and
              shipping requirements.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              4. Custom Orders
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              Custom sculpture projects are created according to customer
              specifications. Once production has begun, modifications or
              cancellations may not be possible depending on the stage of
              completion.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              5. Shipping & Export
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              Delivery schedules may vary depending on the destination,
              shipping method, customs clearance, and production timeline.
              KASA LUXE is not responsible for delays caused by third-party
              logistics providers or government authorities.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              6. Intellectual Property
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              All website content including photographs, artwork, text,
              logos, designs, and graphics are the property of KASA LUXE
              and may not be copied, reproduced, or distributed without
              written permission.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              7. Limitation of Liability
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              While we strive to provide accurate information, KASA LUXE
              makes no guarantees regarding the completeness or accuracy
              of the website content. We are not liable for any indirect,
              incidental, or consequential damages arising from the use of
              this website.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              8. Changes to Terms
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              We reserve the right to update or modify these Terms &
              Conditions at any time. Changes will become effective
              immediately upon publication on this page.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              9. Governing Law
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              These Terms & Conditions shall be governed by the laws of
              India. Any disputes arising from the use of this website
              shall be subject to the jurisdiction of the competent courts
              in Tamil Nadu.
            </p>

          </div>

          <div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              10. Contact Information
            </h2>

            <div className="space-y-3 font-['Outfit'] text-gray-700 leading-8">

              <p><strong>KASA LUXE</strong></p>

              <p>📍 Mamallapuram, Tamil Nadu, India</p>

              <p>📞 +91 99406 76481 | +91 87544 64818</p>

              <p>📧 kasaluxeofficial@gmail.com</p>

              <p>💬 WhatsApp: +91 99406 76481 | +91 87544 64818</p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}