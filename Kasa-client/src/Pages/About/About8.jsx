import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ctaImg from "../../assets/arts.png";

export default function About8() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background Image */}

      <motion.img
        src={ctaImg}
        alt="KASA LUXE"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}

      <div className="relative z-10 max-w-[1450px] mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="max-w-4xl mx-auto text-center"
        >

          {/* Small Heading */}

          <p className="font-['Outfit'] uppercase tracking-[7px] text-[#B58A4A] text-lg mb-6">

            Let's Create Together

          </p>

          {/* Main Heading */}

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight font-semibold mb-8">

            Transform Your Vision
            <br />

            Into A
            <span className="text-[#B58A4A]">
              {" "}Timeless Masterpiece
            </span>

          </h2>

          {/* Description */}

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-[#E6E1D8] leading-relaxed max-w-3xl mx-auto">

            Whether you're planning a temple, villa,
            heritage Sculptures, or custom sculpture,
            our master craftsmen are ready to bring your
            vision to life with unmatched artistry.

          </p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: .3,
              duration: .8,
            }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-14"
          >

            <Link
              to="/contact"
              className="font-['Outfit'] inline-flex justify-center items-center bg-[#B58A4A] hover:bg-[#98723A] text-white px-12 py-5 text-lg uppercase tracking-[3px] rounded-sm transition-all duration-300 hover:shadow-2xl"
            >
              Get Free Consultation
            </Link>

            <Link
              to="/collections"
              className="font-['Outfit'] inline-flex justify-center items-center border border-[#B58A4A] text-[#B58A4A] hover:bg-[#B58A4A] hover:text-white px-12 py-5 text-lg uppercase tracking-[3px] rounded-sm transition-all duration-300"
            >
              View Collections
            </Link>

          </motion.div>

          {/* Decorative Line */}

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            viewport={{ once: true }}
            transition={{
              delay: .6,
              duration: 1,
            }}
            className="h-[2px] bg-[#B58A4A] mx-auto mt-20"
          />

        </motion.div>

      </div>

    </section>
  );
}