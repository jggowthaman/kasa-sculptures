import { motion } from "framer-motion";
import {
  HiOutlineStar,
  HiOutlineUserCircle,
} from "react-icons/hi";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Temple Trustee",
    review:
      "KASA LUXE delivered exceptional craftsmanship for our temple renovation. Every sculpture reflects devotion, precision, and timeless artistry.",
  },
  {
    name: "Priya Srinivasan",
    role: "Architect",
    review:
      "Their attention to detail and premium stone quality exceeded our expectations. The custom carvings became the highlight of our project.",
  },
  {
    name: "Arun Prakash",
    role: "Villa Owner",
    review:
      "From consultation to installation, the entire experience was professional. The handcrafted granite sculpture transformed our entrance beautifully.",
  },
];

export default function About7() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">
            Client Testimonials
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-8">
            Trusted By Those
            <span className="text-[#B58A4A]"> We Serve</span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-gray-300 leading-relaxed">
            Every completed project reflects our dedication to quality,
            artistry, and customer satisfaction.
          </p>

        </motion.div>

        {/* Testimonials */}

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="bg-[#1B1B1B] border border-[#2D2D2D] hover:border-[#B58A4A] rounded-xl p-10 shadow-xl transition-all duration-500"
            >

              {/* Stars */}

              <div className="flex gap-1 text-[#D4AF37] text-2xl mb-6">

                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar key={i} />
                ))}

              </div>

              {/* Review */}

              <p className="font-['Cormorant_Garamond'] italic text-2xl text-gray-200 leading-relaxed mb-10">
                "{item.review}"
              </p>

              {/* Client */}

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-[#B58A4A] flex items-center justify-center text-white text-3xl">
                  <HiOutlineUserCircle />
                </div>

                <div>

                  <h4 className="font-['Cormorant_Garamond'] text-3xl text-white font-semibold">
                    {item.name}
                  </h4>

                  <p className="font-['Outfit'] text-lg text-gray-400">
                    {item.role}
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}