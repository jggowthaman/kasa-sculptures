import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/s0.png";
import { HiCheckCircle } from "react-icons/hi";

export default function Home2() {
  const features = [
    "I saw his discipline.",
    "I saw his strength.",
    "My father gave me the foundation.",
    "My education gave me the knowledge.",
  ];

  return (
    <section className="bg-[#F8F5EF] py-16 sm:py-20 lg:py-28 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">

          {/* =====================================================
              IMAGE SECTION
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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

            {/* Image Container */}
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

              <img
                src={aboutImg}
                alt="KASA LUXE stone sculpture and sculptor"
                className="
                  block
                  w-full
                  h-auto
                  object-contain

                  lg:h-[560px]
                  lg:object-cover
                  lg:object-center

                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
              />

              {/* Very subtle image overlay */}
              <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />

            </div>


            {/* =================================================
                EXPERIENCE BADGE
            ================================================== */}
            {/* <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                absolute
                bottom-4
                right-4

                sm:bottom-5
                sm:right-5

                lg:-bottom-7
                lg:-right-7

                bg-[#B58A4A]
                text-white

                px-5
                py-4

                sm:px-7
                sm:py-5

                lg:px-8
                lg:py-6

                rounded-md
                shadow-xl

                text-center
                min-w-[135px]

                sm:min-w-[165px]
                lg:min-w-[180px]
              "
            >

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-semibold
                  leading-none
                "
              >
                30+
              </h2>

              <p
                className="
                  uppercase
                  tracking-[2px]
                  sm:tracking-[3px]
                  mt-2
                  text-[9px]
                  sm:text-xs
                  whitespace-nowrap
                "
              >
                Years Experience
              </p>

            </motion.div> */}

          </motion.div>


          {/* =====================================================
              CONTENT SECTION
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              w-full
              pt-4
              lg:pt-0
            "
          >

            {/* Small Heading */}
            <p
              className="
                uppercase
                tracking-[3px]
                sm:tracking-[5px]
                text-[#B58A4A]
                mb-4
                text-sm
                sm:text-base
                font-medium
              "
            >
              About KASA LUXE
            </p>


            {/* Main Heading */}
            <h2
              className="
                text-[#3E3428]
                text-4xl
                sm:text-5xl
                lg:text-[54px]
                xl:text-[60px]
                leading-[1.1]
                font-normal
              "
            >
              From Kamatchiamman to KASA LUXE
              <span className="text-[#B58A4A]">.</span>
            </h2>


            {/* Decorative Line */}
            <div className="flex items-center gap-3 mt-6">

              <span className="w-12 h-[2px] bg-[#B58A4A]" />

              <span className="w-2 h-2 rounded-full bg-[#B58A4A]" />

            </div>


            {/* Description */}
            <p
              className="
                mt-7
                sm:mt-8

                font-['Cormorant_Garamond']

                text-[19px]
                sm:text-[21px]
                lg:text-[22px]
                xl:text-[24px]

                text-[#5A5248]

                leading-8
                sm:leading-9
                lg:leading-10

                font-medium
                tracking-wide
              "
            >
              In 1995, we opened our own shop, Kamatchiamman Sculpture and
              Architecture. It began with a simple purpose — to continue the
              craft our family had dedicated its life to. What began as a
              family workshop slowly grew into something much larger.

              <br />
              <br />

              Today, after more than 30 years of experience, I look back with
              gratitude. My father spent his life taking our family's craft
              across different parts of India. I wanted to take that same
              craft one step further.
            </p>


            {/* =================================================
                FEATURES
            ================================================== */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2

                gap-x-8
                gap-y-5

                mt-8
                sm:mt-10
              "
            >

              {features.map((feature, index) => (

                <motion.div
                  key={feature}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    x: 6,
                  }}
                  className="
                    flex
                    items-start
                    gap-3
                    group
                  "
                >

                  <HiCheckCircle
                    className="
                      text-[#B58A4A]
                      text-xl
                      sm:text-2xl
                      flex-shrink-0
                      mt-1

                      transition-transform
                      duration-300

                      group-hover:rotate-12
                    "
                  />

                  <p
                    className="
                      font-['Cormorant_Garamond']
                      text-lg
                      sm:text-xl
                      lg:text-[21px]

                      font-semibold
                      tracking-wide

                      text-[#3E3428]

                      leading-7

                      transition-colors
                      duration-300

                      group-hover:text-[#B58A4A]
                    "
                  >
                    {feature}
                  </p>

                </motion.div>

              ))}

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

                  bg-[#B58A4A]
                  text-white

                  px-8
                  sm:px-10

                  py-3.5
                  sm:py-4

                  rounded-sm

                  uppercase
                  tracking-[2px]

                  text-sm
                  sm:text-base

                  font-medium

                  hover:bg-[#8A642F]

                  transition-all
                  duration-300

                  shadow-md
                  hover:shadow-lg
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