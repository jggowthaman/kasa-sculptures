import { motion } from "framer-motion";
import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineBadgeCheck,
    title: "Master Craftsmanship",
    desc: "Every sculpture is handcrafted by skilled artisans with decades of traditional experience.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Premium Stone Quality",
    desc: "We carefully select the finest granite and natural stone for every masterpiece.",
  },
  {
    icon: HiOutlineCube,
    title: "Custom Sculptures",
    desc: "From small home idols to monumental temple sculptures, every creation is made to your vision.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Worldwide Projects",
    desc: "Successfully delivering sculptures and temple projects across India and international locations.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Trusted Heritage",
    desc: "Preserving India's artistic heritage through timeless craftsmanship and exceptional quality.",
  },
  {
    icon: HiOutlineClock,
    title: "Reliable Delivery",
    desc: "Professional planning and careful execution ensure every project is delivered on time.",
  },
];

export default function Collections5() {
  return (
    <section className="py-24 bg-white overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[5px] text-[#B58A4A] mb-4">
            Why Choose KASA LUXE
          </p>

          <h2
            className="
            font-['Cormorant_Garamond']
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            text-[#3E3428]
            "
          >
            Excellence Beyond
            <span className="text-[#B58A4A]"> Every Sculpture</span>
          </h2>

          <p
            className="
            mt-8
            max-w-4xl
            mx-auto
            font-['Cormorant_Garamond']
            italic
            text-xl
            md:text-2xl
            leading-10
            text-gray-600
            "
          >
            Every masterpiece reflects devotion, precision, and generations
            of traditional South Indian craftsmanship.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-[#F8F5EF] rounded-xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
              >

                <div className="w-18 h-18 rounded-full bg-[#B58A4A] flex items-center justify-center text-white text-4xl mb-8">
                  <Icon />
                </div>

                <h3
                  className="
                  font-['Cormorant_Garamond']
                  text-4xl
                  font-semibold
                  text-[#3E3428]
                  mb-5
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  font-['Outfit']
                  text-lg
                  leading-8
                  text-gray-600
                  "
                >
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