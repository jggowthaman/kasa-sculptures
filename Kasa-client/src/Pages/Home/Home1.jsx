import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero from "../../assets/img1.jpg";

export default function Home1() {
  return (
    <section className="relative w-full min-h-[calc(100vh-112px)] pt-31 overflow-hidden pb-3">
      {/* Background Image */}
      <motion.img
        src={hero}
        alt="Stone Sculpture"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
       className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1450px] mx-auto min-h-[calc(100vh-112px)] px-6 lg:px-10 flex items-center">
        <div className="max-w-3xl">

          {/* Small Heading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="uppercase tracking-[6px] text-[#D4AF37] text-sm md:text-base mb-5"
          >
            Timeless Stone Craftsmanship
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl
xl:text-7xl
2xl:text-8xl font-bold leading-tight text-white"
          >
            Crafting <span className="text-[#D4AF37]">Divine</span> Stone
            Sculptures With Tradition & Excellence
          </motion.h1>

          {/* Description */}
      <motion.p
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2 }}
  className="
    mt-8
    max-w-xl lg:max-w-2xl
    text-[22px] md:text-[24px]
    leading-10
    font-['Cormorant_Garamond']
    font-medium
    tracking-wide
    italic
    text-[#F5F1E8]
  "
>
  KASA LUXE creates handcrafted granite sculptures, temple
  architecture, and custom stone carvings with unmatched artistry
  and decades of traditional expertise.
</motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="mt-10 flex flex-col md:flex-row gap-5"
          >
            <Link
              to="/services"
              className="px-8 py-4 bg-[#B58A4A] text-white uppercase tracking-[2px] hover:bg-[#8A642F] transition-all duration-300 text-center"
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 border border-white text-white uppercase tracking-[2px] hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white uppercase tracking-[4px] text-xs mb-2">
          Scroll
        </span>

        <div className="w-[2px] h-14 bg-white/50 relative overflow-hidden">
          <motion.div
            animate={{ y: [-20, 60] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-full h-5 bg-[#D4AF37]"
          />
        </div>
      </motion.div>
    </section>
  );
}