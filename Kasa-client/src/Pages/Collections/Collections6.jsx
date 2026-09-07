import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ctaImg from "../../assets/img4.jpg";

export default function Collections6() {
  return (
    <section className="relative py-28 overflow-hidden">

      {/* Background */}

      <motion.img
        src={ctaImg}
        alt="Custom Sculpture"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 8 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60"></div>

      {/* Content */}

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-10 text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="font-['Outfit'] uppercase tracking-[6px] text-[#D4AF37] mb-5"
        >
          Let's Create Something Timeless
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .2, duration: .8 }}
          className="
          font-['Cormorant_Garamond']
          text-5xl
          md:text-6xl
          lg:text-7xl
          font-semibold
          leading-tight
          text-white
          "
        >
          Looking For A
          <span className="text-[#D4AF37]"> Custom Sculpture?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .4, duration: .8 }}
          className="
          mt-8
          font-['Cormorant_Garamond']
          italic
          text-xl
          md:text-2xl
          lg:text-3xl
          text-gray-300
          leading-10
          max-w-4xl
          mx-auto
          "
        >
          From divine stone idols to magnificent temple architecture,
          KASA LUXE transforms your vision into timeless works of art.
          Contact our artisans today and begin your journey toward a
          masterpiece that will last for generations.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .6, duration: .8 }}
          className="mt-14 flex flex-col sm:flex-row justify-center gap-5"
        >

          <a
            href="https://wa.me/919940676481?text=Hello%20KASA%20LUXE,%20I%20would%20like%20to%20enquire%20about%20a%20custom%20stone%20sculpture."
            target="_blank"
            rel="noopener noreferrer"
            className="
            inline-flex
            justify-center
            items-center
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
            duration-300
            hover:scale-105
            "
          >
            Enquire on WhatsApp
          </a>

          <Link
            to="/contact"
            className="
            inline-flex
            justify-center
            items-center
            border
            border-[#D4AF37]
            text-[#D4AF37]
            hover:bg-[#D4AF37]
            hover:text-black
            px-10
            py-4
            rounded-sm
            font-['Outfit']
            text-lg
            uppercase
            tracking-[2px]
            transition-all
            duration-300
            "
          >
            Contact Us
          </Link>

        </motion.div>

        {/* Bottom Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .8, duration: .8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >

          {[
            { number: "30+", label: "Years Experience" },
            { number: "500+", label: "Projects Completed" },
            { number: "250+", label: "Happy Clients" },
            { number: "100%", label: "Handcrafted Quality" },
          ].map((item) => (
            <div key={item.label}>
              <h3 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#D4AF37]">
                {item.number}
              </h3>

              <p className="font-['Outfit'] text-lg text-gray-300 mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </motion.div>

      </div>

    </section>
  );
}