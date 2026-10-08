import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineClock,
} from "react-icons/hi";

import chooseImg from "../../assets/imgowner.png";

const features = [
  {
    icon: HiOutlineBadgeCheck,
    title: "Master Craftsmanship",
    desc: "Every sculpture is handcrafted with exceptional attention to detail.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Premium Quality",
    desc: "Only the finest granite and stone materials are carefully selected.",
  },
  {
    icon: HiOutlineCube,
    title: "Custom Designs",
    desc: "Unique sculptures and architectural works tailored to every client.",
  },
  {
    icon: HiOutlineClock,
    title: "On-Time Delivery",
    desc: "Professional execution with timely completion of every project.",
  },
];

export default function Home4() {
  return (
    <section className="bg-[#F8F5EF] py-16 sm:py-20 lg:py-28 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">

          {/* =====================================================
              IMAGE SECTION
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              relative
              w-full
              max-w-[650px]
              mx-auto
              lg:mx-0
            "
          >

            {/* Image Wrapper */}
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-lg
                shadow-2xl
                bg-[#E8E1D5]
              "
            >

              <motion.img
                src={chooseImg}
                alt="KASA LUXE Sculptor and Stone Sculpture"
                whileHover={{
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="
                  block
                  w-full
                  h-auto
                  object-contain

                  lg:h-[600px]
                  lg:object-cover
                  lg:object-center

                  transition-transform
                  duration-700
                "
              />

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />

            </div>

          </motion.div>


          {/* =====================================================
              RIGHT CONTENT
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              w-full
              pt-2
              lg:pt-0
            "
          >

            {/* Small Heading */}
            <p
              className="
                font-['Outfit']
                uppercase
                tracking-[3px]
                sm:tracking-[5px]
                lg:tracking-[6px]

                text-[#B58A4A]

                text-sm
                sm:text-base
                lg:text-lg

                font-medium
                mb-4
              "
            >
              Why Choose Us
            </p>


            {/* Main Heading */}
            <h2
              className="
                font-['Cormorant_Garamond']

                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-[54px]
                xl:text-[62px]

                font-semibold

                leading-[1.08]

                text-[#3E3428]

                mb-6
                sm:mb-8
              "
            >
              Excellence Carved Into
              <span className="text-[#B58A4A]">
                {" "}Every Creation
              </span>
            </h2>


            {/* Decorative Line */}
            <div className="flex items-center gap-3 mb-7">

              <span className="w-12 h-[2px] bg-[#B58A4A]" />

              <span className="w-2 h-2 rounded-full bg-[#B58A4A]" />

            </div>


            {/* Description */}
            <p
              className="
                font-['Outfit']

                text-base
                sm:text-lg
                md:text-xl
                lg:text-[21px]
                xl:text-[22px]

                text-[#666]

                leading-7
                sm:leading-8
                lg:leading-9

                tracking-wide

                mb-9
                sm:mb-11
              "
            >
              Combining traditional craftsmanship with modern precision,
              KASA LUXE delivers timeless stone sculptures and architectural
              masterpieces that stand for generations.
            </p>


            {/* =================================================
                FEATURES
            ================================================== */}

            <div className="space-y-6 sm:space-y-7 lg:space-y-8">

              {features.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12,
                    }}
                    whileHover={{
                      x: 6,
                    }}
                    className="
                      group
                      flex
                      items-start
                      gap-4
                      sm:gap-5
                      lg:gap-6
                    "
                  >

                    {/* Icon */}
                    <div
                      className="
                        w-14
                        h-14

                        sm:w-16
                        sm:h-16

                        lg:w-[72px]
                        lg:h-[72px]

                        rounded-full

                        bg-[#B58A4A]

                        flex
                        items-center
                        justify-center

                        text-white

                        text-2xl
                        sm:text-3xl
                        lg:text-4xl

                        shrink-0

                        shadow-lg

                        transition-all
                        duration-300

                        group-hover:bg-[#8A642F]
                        group-hover:scale-105
                      "
                    >
                      <Icon />
                    </div>


                    {/* Feature Content */}
                    <div className="flex-1 pt-1">

                      <h3
                        className="
                          font-['Cormorant_Garamond']

                          text-2xl
                          sm:text-3xl
                          lg:text-[32px]

                          font-semibold

                          text-[#3E3428]

                          leading-tight

                          mb-1
                          sm:mb-2

                          group-hover:text-[#B58A4A]

                          transition-colors
                          duration-300
                        "
                      >
                        {item.title}
                      </h3>


                      <p
                        className="
                          font-['Outfit']

                          text-sm
                          sm:text-base
                          lg:text-lg

                          text-[#666]

                          leading-6
                          sm:leading-7
                          lg:leading-8

                          tracking-wide
                        "
                      >
                        {item.desc}
                      </p>

                    </div>

                  </motion.div>
                );
              })}

            </div>


            {/* =================================================
                BUTTON
            ================================================== */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="mt-9 sm:mt-11"
            >

              <Link
                to="/about"
                className="
                  inline-flex
                  items-center
                  justify-center

                  font-['Outfit']

                  bg-[#B58A4A]
                  text-white

                  px-8
                  sm:px-10
                  lg:px-12

                  py-3.5
                  sm:py-4
                  lg:py-5

                  uppercase

                  tracking-[2px]
                  sm:tracking-[3px]

                  text-sm
                  sm:text-base

                  font-medium

                  rounded-sm

                  hover:bg-[#8A642F]

                  hover:shadow-xl

                  transition-all
                  duration-300
                "
              >
                Learn More
              </Link>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}