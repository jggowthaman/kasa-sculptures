import { motion } from "framer-motion";
import {
  HiOutlineCube,
  HiOutlineOfficeBuilding,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const expertise = [
  {
    icon: HiOutlineCube,
    title: "Custom Sculptures",
    desc: "Bespoke granite and marble sculptures created to match each client's unique vision and artistic preferences.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Temple Architecture",
    desc: "Traditional temple structures, pillars, mandapams, and sacred stone architecture built with precision.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Premium Stone Selection",
    desc: "Every project begins with carefully selected natural granite and marble to ensure lasting beauty.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Trusted Craftsmanship",
    desc: "Our experienced artisans combine heritage techniques with modern precision to deliver exceptional quality.",
  },
];

export default function About4() {
  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">
            Our Expertise
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2E2419] leading-tight mb-8">
            Excellence Built Through
            <br />
            <span className="text-[#B58A4A]">
              Skill & Tradition
            </span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-[#5B5247] leading-relaxed">
            Every sculpture, every pillar, and every architectural masterpiece
            reflects our dedication to preserving India's timeless stone carving heritage.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8">

          {expertise.map((item, index) => {
            const Icon = item.icon;

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
                  y: -10,
                  scale: 1.02,
                }}
                className="group bg-white rounded-xl shadow-xl p-10 border border-[#ECE5D9] hover:border-[#B58A4A] transition-all duration-500"
              >

                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: .8 }}
                  className="w-20 h-20 rounded-full bg-[#B58A4A] text-white flex items-center justify-center text-4xl mb-8"
                >
                  <Icon />
                </motion.div>

                <h3 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#2E2419] mb-5 group-hover:text-[#B58A4A] transition-colors">
                  {item.title}
                </h3>

                <p className="font-['Outfit'] text-lg lg:text-xl leading-9 text-gray-600">
                  {item.desc}
                </p>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>
  );
}