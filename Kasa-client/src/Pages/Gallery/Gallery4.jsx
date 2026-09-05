import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ctaImg from "../../assets/img4.jpg";

export default function Gallery4() {
  return (
    <section className="relative min-h-[650px] md:min-h-[700px] overflow-hidden flex items-center">

      {/* Background Image */}

      <motion.img
        src={ctaImg}
        alt="Custom Stone Sculpture"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/75" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/90
          via-black/75
          to-black/50
        "
      />

      {/* Decorative Border */}

      <div
        className="
          absolute
          inset-5
          sm:inset-8
          md:inset-12
          border
          border-[#B58A4A]/30
          pointer-events-none
        "
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          max-w-[1100px]
          mx-auto
          px-6
          sm:px-8
          lg:px-10
          py-24
          text-center
        "
      >

        {/* Small Heading */}

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            font-['Outfit']
            uppercase
            tracking-[4px]
            sm:tracking-[6px]
            text-[#D4AF37]
            text-sm
            md:text-base
            mb-6
          "
        >
          Crafted For Your Vision
        </motion.p>

        {/* Heading */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.9,
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
          Looking For A
          <span className="block text-[#D4AF37]">
            Custom Sculpture?
          </span>
        </motion.h2>

        {/* Gold Line */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          whileInView={{
            width: 90,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
            duration: 0.7,
          }}
          className="
            h-[2px]
            bg-[#B58A4A]
            mx-auto
            mt-8
          "
        />

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          className="
            mt-8
            max-w-3xl
            mx-auto
            font-['Cormorant_Garamond']
            italic
            text-xl
            sm:text-2xl
            md:text-3xl
            leading-9
            md:leading-10
            text-[#E8E2D8]
          "
        >
          From divine stone idols to magnificent temple sculptures,
          our artisans transform your ideas into timeless works of art.
          Every creation is carefully crafted to reflect your vision,
          tradition and individuality.
        </motion.p>

        {/* Features */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-x-8
            gap-y-4
            text-[#E8E2D8]
          "
        >

          {[
            "Custom Sizes",
            "Premium Stone",
            "Handcrafted",
            "Worldwide Export",
          ].map((feature, index) => (
            <div
              key={feature}
              className="flex items-center gap-2"
            >
              <span className="text-[#B58A4A] text-lg">
                ✦
              </span>

              <span
                className="
                  font-['Outfit']
                  text-sm
                  sm:text-base
                  tracking-[1px]
                "
              >
                {feature}
              </span>
            </div>
          ))}

        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="
            mt-12
            flex
            flex-col
            sm:flex-row
            justify-center
            items-center
            gap-4
            sm:gap-5
          "
        >

          {/* WhatsApp */}

          <a
            href="https://wa.me/919940676481?text=Hello%20KASA%20LUXE,%20I%20would%20like%20to%20enquire%20about%20a%20custom%20sculpture."
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              bg-[#B58A4A]
              hover:bg-[#98723A]
              text-white
              px-4
              sm:px-10
              py-4
              rounded-sm
              font-['Outfit']
              text-sm
              sm:text-base
              uppercase
              tracking-[2px]
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
            "
          >
            Enquire on WhatsApp
          </a>

          {/* Contact */}

          <Link
            to="/contact"
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              border
              border-[#D4AF37]
              text-[#D4AF37]
              hover:bg-[#D4AF37]
              hover:text-black
              px-9
              sm:px-10
              py-4
              rounded-sm
              font-['Outfit']
              text-sm
              sm:text-base
              uppercase
              tracking-[2px]
              transition-all
              duration-300
            "
          >
            Contact Our Team
          </Link>

        </motion.div>

        {/* Bottom Text */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="
            mt-10
            font-['Cormorant_Garamond']
            italic
            text-lg
            sm:text-xl
            text-gray-400
          "
        >
          Every stone has a story. Let us help you create yours.
        </motion.p>

      </div>

    </section>
  );
}