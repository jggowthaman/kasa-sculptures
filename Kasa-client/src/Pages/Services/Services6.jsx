import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineBadgeCheck,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
  HiOutlineCube,
} from "react-icons/hi";

import serviceImg from "../../assets/img1.jpg";

const points = [
  {
    icon: <HiOutlineCube />,
    title: "Premium Stone Selection",
  },
  {
    icon: <HiOutlineSparkles />,
    title: "Handcrafted by Master Artisans",
  },
  {
    icon: <HiOutlineGlobeAlt />,
    title: "Worldwide Export Services",
  },
  {
    icon: <HiOutlineBadgeCheck />,
    title: "Custom Designs Available",
  },
];

export default function Services6() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background */}

      <motion.img
        src={serviceImg}
        alt="KASA LUXE"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 8 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-20 max-w-[1300px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#D4AF37] mb-5">
            Why Choose KASA LUXE
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight">
            Crafting Heritage
            <br />

            <span className="text-[#D4AF37]">
              Into Every Stone
            </span>
          </h2>

          <p
            className="
            mt-10
            font-['Cormorant_Garamond']
            italic
            text-2xl
            md:text-3xl
            leading-10
            text-gray-300
            max-w-5xl
            mx-auto
            "
          >
            Every sculpture reflects decades of craftsmanship,
            devotion, and artistic excellence. Our mission is to
            preserve India's timeless sculptural heritage while
            delivering masterpieces to clients across the world.
          </p>

        </motion.div>

        {/* Features */}

        <div className="grid sm:grid-cols-2 gap-6 mt-20 ">

          {points.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
                duration: .6,
              }}
              whileHover={{
                y: -8,
              }}
              className="
              bg-white/10
              backdrop-blur-md
              border
              border-white/10
              rounded-xl
              p-4
              flex
              items-center
              gap-5
              "
            >

              <div className="text-5xl text-[#D4AF37]">
                {item.icon}
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-3xl text-white font-semibold">
                {item.title}
              </h3>

            </motion.div>

          ))}

        </div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .4 }}
          className="mt-20 flex flex-col sm:flex-row justify-center gap-6"
        >

          <a
            href="https://wa.me/919940676481"
            target="_blank"
            rel="noopener noreferrer"
            className="
            bg-[#B58A4A]
            hover:bg-[#9A7238]
            text-white
            px-3
            py-4
            rounded-sm
            uppercase
            tracking-[2px]
            font-['Outfit']
            text-lg
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
            border
            border-[#D4AF37]
            text-[#D4AF37]
            hover:bg-[#D4AF37]
            hover:text-black
            px-5
            py-4
            rounded-sm
            uppercase
            tracking-[2px]
            font-['Outfit']
            text-lg
            transition-all
            duration-300
            "
          >
            View Collections
          </Link>

        </motion.div>

      </div>

    </section>
  );
}