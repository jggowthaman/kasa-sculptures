import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import galleryHero from "../../assets/gods.png";

export default function Gallery1() {
  return (
    <section className="relative min-h-[75svh] overflow-hidden flex items-center">

      {/* Background */}
      <motion.img
        src={galleryHero}
        alt="KASA LUXE Sculpture Gallery"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-[1450px] mx-auto w-full px-6 sm:px-8 lg:px-10 mt-30 mb-2">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl"
        >

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="
              font-['Outfit']
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-[#D4AF37]
              text-sm
              md:text-lg
              mb-5
            "
          >
            KASA LUXE Gallery
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="
              font-['Cormorant_Garamond']
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              font-semibold
              leading-tight
              text-white
            "
          >
            Discover Our
            <span className="block text-[#D4AF37]">
              Stone Masterpieces
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="
              mt-7
              max-w-3xl
              font-['Cormorant_Garamond']
              italic
              text-xl
              sm:text-2xl
              lg:text-3xl
              leading-9
              lg:leading-10
              text-[#E8E2D8]
            "
          >
            Explore our collection of handcrafted stone sculptures,
            divine idols, temple masterpieces and timeless works of
            traditional South Indian craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-10"
          >
            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-[#D4AF37]
                px-8
                sm:px-10
                py-4
                text-[#D4AF37]
                hover:bg-[#D4AF37]
                hover:text-black
                font-['Outfit']
                uppercase
                tracking-[2px]
                text-sm
                sm:text-base
                transition-all
                duration-300
              "
            >
              Custom Enquiry
            </Link>
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}