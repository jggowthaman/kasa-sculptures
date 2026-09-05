import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import featuredImg from "../../assets/vinayakar face.png";

export default function Collections3() {
  return (
    <section className="py-24 bg-white overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-md shadow-2xl"
          >
            <motion.img
              src={featuredImg}
              alt="Featured Sculpture"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full h-[650px] object-cover"
            />
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[5px] text-[#B58A4A] mb-5">
              Featured Masterpiece
            </p>

            <h2 className="font-['Cormorant_Garamond']
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            text-[#3E3428]
            leading-tight
            mb-8">

              Granite

              <span className="text-[#B58A4A]">
                {" "}Lord Ganesha
              </span>

            </h2>

            <p className="font-['Cormorant_Garamond']
            italic
            text-2xl
            leading-10
            text-gray-600
            mb-8">

              A magnificent handcrafted granite sculpture created
              by skilled artisans using traditional South Indian
              carving techniques, combining devotion, elegance,
              and timeless craftsmanship.

            </p>

            {/* Details */}

            <div className="grid grid-cols-2 gap-6 mb-10">

              <div>
                <h4 className="font-['Outfit'] text-[#B58A4A] uppercase tracking-[2px] mb-2">
                  Material
                </h4>

                <p className="font-['Cormorant_Garamond'] text-2xl text-[#3E3428]">
                  Premium Black Granite
                </p>
              </div>

              <div>
                <h4 className="font-['Outfit'] text-[#B58A4A] uppercase tracking-[2px] mb-2">
                  Available Sizes
                </h4>

                <p className="font-['Cormorant_Garamond'] text-2xl text-[#3E3428]">
                  2ft • 3ft • 5ft
                </p>
              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-5">

              <Link
                to="/gallery/granite-ganesha"
                className="inline-flex justify-center items-center
                bg-[#B58A4A]
                hover:bg-[#9A7238]
                text-white
                px-10
                py-4
                rounded-sm
                font-['Outfit']
                text-lg
                uppercase
                tracking-[2px]
                transition-all
                duration-300"
              >
                View Details
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hello%20KASA%20LUXE,%20I'm%20interested%20in%20the%20Granite%20Lord%20Ganesha%20sculpture."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center
                border
                border-[#B58A4A]
                text-[#B58A4A]
                hover:bg-[#B58A4A]
                hover:text-white
                px-5
                py-4
                rounded-sm
                font-['Outfit']
                text-lg
                uppercase
                tracking-[2px]
                transition-all
                duration-300"
              >
                WhatsApp Enquiry
              </a>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}