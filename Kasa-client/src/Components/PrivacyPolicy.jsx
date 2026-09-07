import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <p className="mt-6 text-gray-600 font-['Outfit']">
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
              1. Introduction
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              KASA LUXE values your privacy and is committed to protecting
              your personal information. This Privacy Policy explains how
              we collect, use, and protect the information you share while
              visiting our website.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              2. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-3 font-['Outfit'] text-gray-700 leading-8">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Requested Service</li>
              <li>Project or Enquiry Details</li>
            </ul>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              3. How We Use Your Information
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              The information you provide is used only to respond to your
              enquiries, discuss your project requirements, provide
              quotations, and improve our customer service.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              4. WhatsApp Communication
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              Our enquiry form redirects your details to our official
              WhatsApp account. By submitting the form, you consent to
              communicating with us through WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              5. Cookies
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              Our website may use essential browser cookies to improve user
              experience. We do not use cookies to collect sensitive
              personal information.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              6. Third-Party Services
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              Our website may contain links or embedded content from
              third-party services such as Google Maps, WhatsApp, and social
              media platforms. These services operate under their own
              privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              7. Data Security
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              We take reasonable measures to safeguard your personal
              information. However, no method of internet transmission or
              electronic storage is completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              8. Policy Updates
            </h2>

            <p className="font-['Outfit'] text-gray-700 leading-8">
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with the revised update
              date.
            </p>
          </div>

          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#B58A4A] mb-4">
              9. Contact Us
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