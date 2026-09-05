import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import aboutImg from "../../assets/img1.jpg";

export default function About1() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-28 lg:pt-32 pb-3">

      {/* Background */}

      <motion.img
        src={aboutImg}
        alt="About KASA"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

      {/* Content */}

      <div className="relative z-20 max-w-[1450px] mx-auto min-h-[100svh] px-6 sm:px-8 lg:px-10 flex items-center">

        <div className="max-w-3xl">

          {/* Small Heading */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
           className="
font-['Outfit']
uppercase
tracking-[5px]
md:tracking-[7px]
lg:tracking-[8px]
text-[#D4AF37]
text-sm
md:text-lg
font-medium
my-4
"
          >
            About KASA LUXE
          </motion.p>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
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
lg:text-[88px]
xl:text-[100px]
leading-[1.05]
font-semibold
tracking-tight
text-white
"
          >
            Crafting Timeless
            <br />

            <span className="text-[#C89A3D]">
              Stone Heritage
            </span>

          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 35 }}
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
md:text-[28px]
lg:text-[32px]
leading-relaxed
tracking-wide
text-[#E9E3D7]
max-w-3xl
"
          >
            For over three decades, KASA LUXE has preserved
            India's rich sculptural heritage through handcrafted
            granite sculptures, temple architecture, and bespoke
            stone creations admired across generations.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .8,
              duration: .8,
            }}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
          >

            <Link
              to="/services"
              className="
font-['Outfit']
inline-flex
items-center
justify-center
w-full
sm:w-auto
px-3
py-5
text-[16px]
font-medium
uppercase
tracking-[3px]
rounded-sm
bg-[#B58A4A]
text-white
hover:bg-[#98723A]
hover:shadow-2xl
transition-all
duration-300
"
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
             className="
font-['Outfit']
inline-flex
items-center
justify-center
w-full
sm:w-auto
px-10
py-5
text-[16px]
font-medium
uppercase
tracking-[3px]
rounded-sm
border
border-[#C89A3D]
text-[#C89A3D]
hover:bg-[#C89A3D]
hover:text-black
hover:shadow-2xl
transition-all
duration-300
"
            >
              Contact Us
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