import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineCube,
  HiOutlineSparkles,
  HiOutlineAdjustments,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

import sculptureImg from "../../assets/elephant2.png";

const features = [
  {
    icon: <HiOutlineCube />,
    title: "Granite Sculptures",
    desc: "Traditional handcrafted granite sculptures with timeless beauty.",
  },
  {
    icon: <HiOutlineSparkles />,
    title: "Marble Sculptures",
    desc: "Elegant marble idols and decorative sculptures with premium finishing.",
  },
  {
    icon: <HiOutlineAdjustments />,
    title: "Custom Designs",
    desc: "Personalized sculptures designed according to your vision and dimensions.",
  },
  {
    icon: <HiOutlineBadgeCheck />,
    title: "Premium Finishing",
    desc: "Every sculpture is carefully polished and finished by experienced artisans.",
  },
];

export default function Services4() {
  return (
    <section className="py-28 bg-[#F8F5EF] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] mb-5">
              Custom Sculptures
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923] leading-tight">
              Handcrafted
              <span className="text-[#B58A4A]"> Stone Masterpieces</span>
            </h2>

            <p className="font-['Cormorant_Garamond'] italic text-2xl leading-10 text-gray-600 mt-8">
              Every sculpture is carefully handcrafted by skilled artisans
              using premium granite and marble. From divine idols to
              architectural sculptures, each creation reflects generations
              of craftsmanship and artistic excellence.
            </p>

            <Link
              to="/collections"
              className="inline-flex mt-10 bg-[#B58A4A] hover:bg-[#9A7238] text-white px-5 py-4 rounded-sm font-['Outfit'] uppercase tracking-[2px] transition-all duration-300 hover:scale-105"
            >
              Explore Collections
            </Link>

          </motion.div>

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >

            <motion.img
              src={sculptureImg}
              alt="Stone Sculptures"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: .8 }}
              className="w-full h-[700px] object-cover"
            />

          </motion.div>

        </div>

        {/* Features */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .15,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#E8DDCA]"
            >

              <div className="text-5xl text-[#B58A4A] mb-6">
                {item.icon}
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923] mb-4">
                {item.title}
              </h3>

              <p className="font-['Outfit'] text-lg leading-8 text-gray-600">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}