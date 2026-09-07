import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import featuredImg from "../../assets/vinayakar face.png";

export default function Collections3() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* =====================================================
              FEATURED IMAGE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
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
            }}
            className="
              overflow-hidden
              rounded-md
              shadow-2xl
            "
          >
            <motion.img
              src={featuredImg}
              alt="Traditional stone sculpture by KASA LUXE"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                w-full
                h-[500px]
                md:h-[600px]
                lg:h-[650px]
                object-cover
              "
            />
          </motion.div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
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
            }}
          >

            {/* Small Heading */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                font-['Outfit']
                uppercase
                tracking-[5px]
                text-[#B58A4A]
                mb-5
              "
            >
              Featured Collection
            </motion.p>

            {/* Main Heading */}

            <motion.h2
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
                delay: 0.15,
                duration: 0.8,
              }}
              className="
                font-['Cormorant_Garamond']
                text-5xl
                md:text-6xl
                lg:text-7xl
                font-semibold
                text-[#3E3428]
                leading-tight
                mb-8
              "
            >
              Divine Stone{" "}
              <span className="text-[#B58A4A]">
                Sculptures
              </span>
            </motion.h2>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.25,
                duration: 0.8,
              }}
              className="
                font-['Cormorant_Garamond']
                italic
                text-xl
                md:text-2xl
                leading-9
                md:leading-10
                text-gray-600
                mb-10
              "
            >
              Discover our collection of divine stone sculptures,
              carefully handcrafted by skilled artisans using
              traditional South Indian stone carving techniques.
              Each creation reflects devotion, heritage and
              timeless craftsmanship.
            </motion.p>

            {/* =====================================================
                DETAILS
            ===================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

              {/* Material */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                }}
              >
                <h4
                  className="
                    font-['Outfit']
                    text-[#B58A4A]
                    uppercase
                    tracking-[2px]
                    mb-2
                  "
                >
                  Materials
                </h4>

                <p
                  className="
                    font-['Cormorant_Garamond']
                    text-xl
                    md:text-2xl
                    text-[#3E3428]
                  "
                >
                  Granite & Natural Stone
                </p>
              </motion.div>

              {/* Craftsmanship */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.6,
                }}
              >
                <h4
                  className="
                    font-['Outfit']
                    text-[#B58A4A]
                    uppercase
                    tracking-[2px]
                    mb-2
                  "
                >
                  Craftsmanship
                </h4>

                <p
                  className="
                    font-['Cormorant_Garamond']
                    text-xl
                    md:text-2xl
                    text-[#3E3428]
                  "
                >
                  Traditional Hand Carving
                </p>
              </motion.div>

            </div>

            {/* =====================================================
                BUTTONS
            ===================================================== */}

            <div className="flex flex-col sm:flex-row gap-4">

              {/* Gallery Button */}

              <Link
                to="/gallery"
                className="
                  inline-flex
                  justify-center
                  items-center
                  bg-[#B58A4A]
                  hover:bg-[#9A7238]
                  text-white
                  px-8
                  md:px-10
                  py-4
                  rounded-sm
                  font-['Outfit']
                  text-base
                  md:text-lg
                  uppercase
                  tracking-[2px]
                  transition-all
                  duration-300
                  hover:shadow-lg
                "
              >
                Explore Collection
              </Link>

              {/* WhatsApp */}

              <a
                href="https://wa.me/919940676481?text=Hello%20KASA%20LUXE,%20I%20would%20like%20to%20know%20more%20about%20your%20stone%20sculptures."
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  justify-center
                  items-center
                  border
                  border-[#B58A4A]
                  text-[#B58A4A]
                  hover:bg-[#B58A4A]
                  hover:text-white
                  px-6
                  md:px-8
                  py-4
                  rounded-sm
                  font-['Outfit']
                  text-base
                  md:text-lg
                  uppercase
                  tracking-[2px]
                  transition-all
                  duration-300
                "
              >
                WhatsApp Enquiry
              </a>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}