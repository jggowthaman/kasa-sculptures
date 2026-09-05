import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
  HiOutlineHeart,
} from "react-icons/hi";

const commitments = [
  {
    icon: HiOutlineShieldCheck,
    title: "Authentic Craftsmanship",
    desc: "Every sculpture is handcrafted by experienced artisans using traditional South Indian carving techniques passed down through generations.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Finest Stone Quality",
    desc: "We carefully source premium granite and natural stone to ensure exceptional durability, beauty, and long-lasting value.",
  },
  {
    icon: HiOutlineHeart,
    title: "Client-Centric Approach",
    desc: "Every project is tailored to our clients' vision with personalized consultation and dedicated support from start to finish.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Timeless Heritage",
    desc: "Our creations celebrate India's rich cultural legacy while blending traditional artistry with contemporary architectural excellence.",
  },
];

export default function About6() {
  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">

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
            Our Commitment
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2E2419] leading-tight mb-8">
            Excellence In Every
            <span className="text-[#B58A4A]"> Detail</span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-[#5E5448] leading-relaxed">
            Every project reflects our unwavering commitment to quality,
            authenticity, and artistic perfection.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {commitments.map((item, index) => {
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
                  y: -12,
                  scale: 1.03,
                }}
                className="bg-white rounded-xl shadow-xl border border-[#ECE5D9] hover:border-[#B58A4A] p-10 group transition-all duration-500"
              >

                {/* Icon */}

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

                {/* Title */}

                <h3 className="font-['Cormorant_Garamond'] text-3xl lg:text-4xl font-semibold text-[#2E2419] mb-6 group-hover:text-[#B58A4A] transition-colors">

                  {item.title}

                </h3>

                {/* Description */}

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