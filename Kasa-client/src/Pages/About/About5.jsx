import { motion } from "framer-motion";
import {
  HiOutlineChatAlt2,
  HiOutlineCube,
  HiOutlinePencilAlt,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const process = [
  {
    number: "01",
    icon: HiOutlineChatAlt2,
    title: "Consultation",
    desc: "Understanding your vision, requirements, dimensions, and architectural preferences before every project begins.",
  },
  {
    number: "02",
    icon: HiOutlineCube,
    title: "Stone Selection",
    desc: "Carefully choosing premium granite and natural stones that ensure durability, elegance, and timeless beauty.",
  },
  {
    number: "03",
    icon: HiOutlinePencilAlt,
    title: "Hand Crafting",
    desc: "Our skilled artisans transform raw stone into remarkable sculptures using traditional carving techniques.",
  },
  {
    number: "04",
    icon: HiOutlineCheckCircle,
    title: "Delivery & Installation",
    desc: "Every masterpiece is safely delivered and professionally installed with complete quality assurance.",
  },
];

export default function About5() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">
            Our Craftsmanship
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-8">
            From Vision To
            <span className="text-[#B58A4A]"> Timeless Art</span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-gray-300 leading-relaxed">
            Every sculpture follows a meticulous journey where
            traditional craftsmanship meets artistic excellence.
          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative">

          {/* Line */}

          <div className="hidden lg:block absolute top-16 left-0 w-full h-[2px] bg-[#3A3A3A]"></div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 relative">

            {process.map((step, index) => {
              const Icon = step.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .7,
                    delay: index * .15,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                  }}
                  className="relative text-center"
                >

                  {/* Number */}

                  <h3 className="font-['Cormorant_Garamond'] text-6xl text-[#2C2C2C] font-bold mb-4">

                    {step.number}

                  </h3>

                  {/* Icon */}

                  <motion.div
                    whileHover={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: .8,
                    }}
                    className="mx-auto w-20 h-20 rounded-full bg-[#B58A4A] text-white flex items-center justify-center text-4xl relative z-10"
                  >

                    <Icon />

                  </motion.div>

                  {/* Title */}

                  <h4 className="font-['Cormorant_Garamond'] text-3xl text-white font-semibold mt-8 mb-5">

                    {step.title}

                  </h4>

                  {/* Description */}

                  <p className="font-['Outfit'] text-lg text-gray-300 leading-9">

                    {step.desc}

                  </p>

                </motion.div>

              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}