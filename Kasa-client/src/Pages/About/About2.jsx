import { motion } from "framer-motion";
import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
} from "react-icons/hi";

import aboutImg from "../../assets/hanuman double.png";

const features = [
  "30+ Years of Stone Craftsmanship",
  "Traditional South Indian Sculpture",
  "Premium Granite & Marble Works",
  "Temple Architecture Specialists",
];

export default function About2() {
  return (
    <section className="bg-[#F8F5EF] py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >

            <div className="overflow-hidden rounded-md shadow-2xl">

              <motion.img
                src={aboutImg}
                alt="Our Story"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: .6 }}
                className="w-full h-[420px] sm:h-[520px] lg:h-[700px] object-cover"
              />

            </div>

            {/* Experience Card */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .5 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-8 bg-white shadow-2xl px-8 py-6 rounded-md"
            >

              <h2 className="font-['Cormorant_Garamond'] text-5xl text-[#B58A4A] font-semibold">
                30+
              </h2>

              <p className="font-['Outfit'] uppercase tracking-[3px] text-gray-600">
                Years Experience
              </p>

            </motion.div>

          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .9 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">

              Our Story

            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl leading-tight text-[#2E2419] font-semibold mb-8">

              A Legacy Carved
              <br />

              <span className="text-[#B58A4A]">
                In Stone
              </span>

            </h2>

            <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl leading-relaxed text-[#5B5247] mb-8">

              KASA LUXE has been preserving India's artistic heritage through
              handcrafted granite sculptures and temple architecture for over
              three decades.

            </p>

            <p className="font-['Outfit'] text-lg md:text-xl leading-10 text-gray-600 mb-12">

              Every sculpture we create is a reflection of devotion,
              precision, and timeless craftsmanship. From intricate temple
              carvings to custom architectural masterpieces, our artisans
              transform natural stone into enduring works of art admired for
              generations.

            </p>

            {/* Features */}

            <div className="space-y-6">

              {features.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .5,
                    delay: index * .15,
                  }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-5"
                >

                  <div className="w-12 h-12 rounded-full bg-[#B58A4A] flex items-center justify-center text-white">

                    <HiOutlineBadgeCheck size={24} />

                  </div>

                  <h4 className="font-['Cormorant_Garamond'] text-2xl text-[#3E3428]">

                    {item}

                  </h4>

                </motion.div>

              ))}

            </div>

            {/* Quote */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12 border-l-4 border-[#B58A4A] pl-6"
            >

              <HiOutlineSparkles className="text-[#B58A4A] text-3xl mb-4" />

              <p className="font-['Cormorant_Garamond'] italic text-2xl leading-relaxed text-[#4D453C]">

                "Every masterpiece begins with a vision,
                dedication, and the timeless beauty of stone."

              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}