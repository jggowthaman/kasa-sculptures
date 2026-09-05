import { motion } from "framer-motion";
import logo from "../assets/kasa-logo.png";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-[#111111] flex items-center justify-center"
    >
      <div className="text-center">

        {/* Logo */}

        <motion.img
          src={logo}
          alt="KASA LUXE"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="w-40 mx-auto"
        />

        {/* Brand */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .4,
          }}
          className="mt-6 font-['Cormorant_Garamond'] text-5xl text-[#B58A4A]"
        >
          KASA LUXE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-3 uppercase tracking-[6px] text-gray-300 font-['Outfit']"
        >
          Divine Sculptures
        </motion.p>

        {/* Tagline */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-5 text-[#D8D2C8] italic font-['Cormorant_Garamond'] text-2xl"
        >
          Crafting Timeless Heritage
        </motion.p>

        {/* Progress Bar */}

        <div className="w-72 h-[2px] bg-[#333] rounded-full overflow-hidden mx-auto mt-10">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.2,
            }}
            className="h-full bg-[#B58A4A]"
          />

        </div>

        {/* Loading */}

        <motion.p
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-5 text-gray-400 font-['Outfit'] tracking-[4px]"
        >
          LOADING...
        </motion.p>

      </div>
    </motion.div>
  );
}