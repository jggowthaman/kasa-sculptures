import { motion } from "framer-motion";
import {
  HiOutlineOfficeBuilding,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import templeImg from "../../assets/img2.jpg";

const features = [
  {
    icon: <HiOutlineOfficeBuilding />,
    title: "Temple Construction",
    desc: "Complete traditional temple construction using authentic South Indian architectural principles.",
  },
  {
    icon: <HiOutlineHome />,
    title: "Mandapam & Gopuram",
    desc: "Beautifully handcrafted mandapams, gopurams, sanctums, and stone pillars.",
  },
  {
    icon: <HiOutlineSparkles />,
    title: "Heritage Restoration",
    desc: "Restoring ancient temples and damaged sculptures while preserving their original beauty.",
  },
  {
    icon: <HiOutlineGlobeAlt />,
    title: "International Projects",
    desc: "Executing temple architecture and sculpture projects across multiple countries.",
  },
];

export default function Services3() {
  return (
    <section className="py-28 bg-white overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >

            <motion.img
              src={templeImg}
              alt="Temple Architecture"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: .8 }}
              className="w-full h-[700px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] mb-5">
              Temple Architecture
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923] leading-tight">
              Preserving Sacred
              <span className="text-[#B58A4A]"> Architecture</span>
            </h2>

            <p className="font-['Cormorant_Garamond'] italic text-2xl leading-10 text-gray-600 mt-8">
              Every temple is a timeless symbol of devotion and
              craftsmanship. Our artisans specialize in designing,
              constructing, and restoring temples using authentic
              traditional techniques that preserve India's rich
              architectural heritage.
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-6 mt-14">

              {features.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * .15,
                    duration: .6,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-[#F8F5EF] rounded-xl p-6 border border-[#E8DDCA]"
                >

                  <div className="text-5xl text-[#B58A4A] mb-5">
                    {item.icon}
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923] mb-4">
                    {item.title}
                  </h3>

                  <p className="font-['Outfit'] text-gray-600 leading-8">
                    {item.desc}
                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}