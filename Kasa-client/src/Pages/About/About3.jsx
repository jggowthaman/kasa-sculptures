import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineLightBulb,
} from "react-icons/hi";

const values = [
  {
    icon: HiOutlineEye,
    title: "A Legacy in Stone",
    description:
      "When I think about my life, I do not think only about the sculptures we have created.I think about my father.I think about the little boy I once was, standing beside him and learning without even realising it.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "The Next Generation",
    description:
      "There is one part of this journey that makes me especially proud. My son, Gowthaman Sampath, is now carrying forward the legacy that my father once passed to me.",
  },
];

export default function About3() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">
            Beyond borders.
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-8">
            Vision That Inspires
            <br />

            <span className="text-[#B58A4A]">
              Mission That Delivers
            </span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our sculptures have now travelled to places including Malaysia, Singapore, Mauritius, Finland, Germany, Toronto, Tokyo, Montreal, Australia, South Africa, and many other parts of the world.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-10">

          {values.map((item, index) => {
            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .7,
                  delay: index * .2,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="bg-[#1B1B1B] border border-[#2D2D2D] hover:border-[#B58A4A] rounded-lg p-10 lg:p-14 shadow-xl transition-all duration-500"
              >

                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: .8 }}
                  className="w-20 h-20 rounded-full bg-[#B58A4A] flex items-center justify-center text-white text-4xl mb-8"
                >
                  <Icon />
                </motion.div>

                <h3 className="font-['Cormorant_Garamond'] text-4xl lg:text-5xl text-white font-semibold mb-6">
                  {item.title}
                </h3>

                <p className="font-['Outfit'] text-lg lg:text-xl text-gray-300 leading-10">
                  {item.description}
                </p>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>
  );
}