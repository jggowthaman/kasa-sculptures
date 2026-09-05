import { motion } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineArchive,
  HiOutlineTruck,
  HiOutlineShieldCheck,
} from "react-icons/hi";

import exportImg from "../../assets/worker.png";

const exportSteps = [
  {
    icon: <HiOutlineArchive />,
    title: "Secure Packaging",
    description:
      "Every sculpture is professionally packed using premium protective materials to ensure safe transportation.",
  },
  {
    icon: <HiOutlineTruck />,
    title: "Worldwide Shipping",
    description:
      "Reliable logistics and shipping solutions delivering sculptures safely across India and international destinations.",
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: "Quality Assurance",
    description:
      "Each sculpture undergoes a detailed quality inspection before dispatch to maintain our highest standards.",
  },
  {
    icon: <HiOutlineGlobeAlt />,
    title: "Global Clients",
    description:
      "Trusted by temples, architects, institutions, and private collectors across multiple countries worldwide.",
  },
];

export default function Services5() {
  return (
    <section className="py-28 bg-white overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >

            <motion.img
              src={exportImg}
              alt="Worldwide Export"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[700px] object-cover"
            />

          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] mb-5">
              Global Export
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923] leading-tight">
              Delivering
              <span className="text-[#B58A4A]"> Worldwide</span>
            </h2>

            <p className="font-['Cormorant_Garamond'] italic text-2xl leading-10 text-gray-600 mt-8">
              Our handcrafted stone sculptures are admired not only across
              India but also by clients around the world. With secure
              packaging and trusted logistics, every masterpiece reaches
              its destination safely while preserving its exceptional
              craftsmanship.
            </p>

          </motion.div>

        </div>

        {/* Export Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          {exportSteps.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-[#F8F5EF] rounded-2xl p-8 shadow-lg border border-[#E8DDCA]"
            >

              <div className="text-5xl text-[#B58A4A] mb-6">
                {item.icon}
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923] mb-5">
                {item.title}
              </h3>

              <p className="font-['Outfit'] text-lg leading-8 text-gray-600">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}