import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import contactHero from "../../assets/img4.jpg";

export default function Contact1() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-30 lg:pt-32 py-5">

      {/* Background */}

      <motion.img
        src={contactHero}
        alt="Contact KASA LUXE"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Luxury Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>

      {/* Content */}

      <div className="relative z-20 max-w-[1450px] mx-auto min-h-[100svh] px-6 sm:px-8 lg:px-10 flex items-center">

        <div className="max-w-4xl">

          {/* Small Heading */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="
              font-['Outfit']
              uppercase
              tracking-[6px]
              text-[#D4AF37]
              text-sm
              md:text-lg
              mb-6
            "
          >
            Contact KASA LUXE
          </motion.p>

          {/* Main Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .2,
              duration: .9,
            }}
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
            Let's Create
            <br />

            <span className="text-[#D4AF37]">
              Something Timeless
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .5,
              duration: .9,
            }}
            className="
              mt-8
              font-['Cormorant_Garamond']
              italic
              text-xl
              sm:text-2xl
              lg:text-3xl
              leading-10
              text-[#E8E2D8]
              max-w-3xl
            "
          >
            Whether you're looking for a handcrafted stone sculpture,
            temple architecture, custom carving, or international export,
            our artisans are ready to transform your vision into a timeless
            masterpiece crafted with precision and tradition.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .8,
              duration: .8,
            }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >

            <a
              href="https://wa.me/919940676481"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                justify-center
                items-center
                bg-[#B58A4A]
                hover:bg-[#98723A]
                px-3
                py-4
                rounded-sm
                font-['Outfit']
                text-lg
                uppercase
                tracking-[2px]
                text-white
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Enquire on WhatsApp
            </a>

            <Link
              to="/collections"
              className="
                inline-flex
                justify-center
                items-center
                border
                border-[#D4AF37]
                px-5
                py-4
                rounded-sm
                font-['Outfit']
                text-lg
                uppercase
                tracking-[2px]
                text-[#D4AF37]
                hover:bg-[#D4AF37]
                hover:text-black
                transition-all
                duration-300
              "
            >
              View Collections
            </Link>

          </motion.div>

        </div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >

        <div className="w-7 h-12 border-2 border-[#D4AF37] rounded-full flex justify-center">

          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"
          />

        </div>

      </motion.div>

    </section>
  );
}