import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlinePhone,
} from "react-icons/hi";

import ctaBg from "../../assets/img3.jpg";

export default function Contact5() {
  return (
    <section className="relative py-25 overflow-hidden">

      {/* Background */}

      <motion.img
        src={ctaBg}
        alt="Luxury Sculpture"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 8 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60"></div>

      {/* Content */}

      <div className="relative z-20 max-w-[1100px] mx-auto px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-['Outfit'] uppercase tracking-[6px] text-[#D4AF37] mb-6"
        >
          Begin Your Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="
          font-['Cormorant_Garamond']
          text-5xl
          md:text-6xl
          lg:text-7xl
          font-semibold
          text-white
          leading-tight
          "
        >
          Transform Your Vision
          <br />

          <span className="text-[#D4AF37]">
            Into Timeless Stone Art
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
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
          From handcrafted stone sculptures to magnificent temple
          architecture, every masterpiece begins with a conversation.
          Let's create something extraordinary together.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-14 flex flex-col sm:flex-row justify-center gap-5"
        >

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="
            inline-flex
            items-center
            justify-center
            gap-3
            bg-[#B58A4A]
            hover:bg-[#98723A]
            text-white
            px-2
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
            <HiOutlinePhone className="text-2xl" />
            Chat on WhatsApp
          </a>

          <Link
            to="/collections"
            className="
            inline-flex
            items-center
            justify-center
            gap-2
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
            Explore Collections
            <HiOutlineArrowRight />
          </Link>

        </motion.div>

        {/* Decorative Divider */}

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "180px" }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-[2px] bg-[#D4AF37] mx-auto mt-20"
        ></motion.div>

      </div>

    </section>
  );
}