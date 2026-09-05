import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import notFoundImg from "../../assets/img4.jpg";

export default function Error404() {
  return (
    <section className="relative min-h-screen overflow-hidden py-5">

      {/* Background */}

      <motion.img
        src={notFoundImg}
        alt="404"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60"></div>

      {/* Content */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 lg:px-10 py-5 mt-5">

        <div className="text-center max-w-5xl pt-5">

          {/* 404 */}

          <motion.h1
            initial={{ opacity: 0, scale: .6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: .8,
            }}
            className="font-['Cormorant_Garamond']
            text-[120px]
            sm:text-[150px]
            md:text-[200px]
            lg:text-[240px]
            font-semibold
            leading-none
            text-[#B58A4A]"
          >
            404
          </motion.h1>

          {/* Divider */}

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{
              delay: .4,
              duration: .8,
            }}
            className="h-[2px] bg-[#B58A4A] mx-auto my-6"
          />

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .4,
              duration: .8,
            }}
            className="font-['Cormorant_Garamond']
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            text-white
            leading-tight"
          >
            Every Masterpiece
            <br />

            <span className="text-[#B58A4A]">
              Has Its Place
            </span>

          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .6,
              duration: .8,
            }}
            className="mt-8
            font-['Cormorant_Garamond']
            italic
            text-xl
            sm:text-2xl
            md:text-3xl
            leading-relaxed
            text-[#E7E1D8]
            max-w-3xl
            mx-auto"
          >
            Unfortunately, the page you are looking for
            cannot be found.

            Continue exploring our handcrafted granite
            sculptures and timeless architectural masterpieces.
          </motion.p>

          {/* Button */}

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
            className="mt-14"
          >

            <Link
              to="/"
              className="inline-flex items-center justify-center
              bg-[#B58A4A]
              hover:bg-[#98723A]
              text-white
              px-10
              sm:px-12
              py-4
              sm:py-5
              rounded-sm
              uppercase
              tracking-[3px]
              text-sm
              sm:text-base
              font-['Outfit']
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-2xl"
            >
              Return To Home
            </Link>

          </motion.div>

        </div>

      </div>

    </section>
  );
}