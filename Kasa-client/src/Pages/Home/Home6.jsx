import { motion } from "framer-motion";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

const achievements = [
  {
    icon: HiOutlineOfficeBuilding,
    number: "30+",
    title: "Years Experience",
    desc: "Three decades of excellence in stone craftsmanship.",
  },
  {
    icon: HiOutlineSparkles,
    number: "500+",
    title: "Projects Completed",
    desc: "Successfully delivered sculptures and temple projects.",
  },
  {
    icon: HiOutlineUserGroup,
    number: "250+",
    title: "Happy Clients",
    desc: "Trusted by families, temples, architects, and builders.",
  },
  {
    icon: HiOutlineBadgeCheck,
    number: "100%",
    title: "Quality Commitment",
    desc: "Premium craftsmanship with complete client satisfaction.",
  },
];

export default function Home6() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-16"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-base md:text-lg font-medium mb-4">
            Our Achievements
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-6xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6">
            Excellence Built Over Generation
          </h2>

<p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl lg:text-[32px] text-[#E5E0D6] max-w-4xl mx-auto leading-relaxed font-medium tracking-wide">
  Every sculpture reflects passion, precision, and a commitment to
  preserving India's timeless stone carving heritage.
</p>

        </motion.div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
               whileHover={{
  y: -12,
  scale: 1.03,
}}
                className="bg-[#1B1B1B] rounded-xl p-10 border border-[#2C2C2C] hover:border-[#B58A4A] hover:shadow-2xl transition-all duration-500"
              >

                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: .8 }}
                  className="w-20 h-20 rounded-full bg-[#B58A4A] flex items-center justify-center text-white text-4xl mb-8 shadow-lg"
                >
                  <Icon />
                </motion.div>

                <h3 className="font-['Cormorant_Garamond'] text-6xl md:text-7xl font-bold text-[#D4AF37] mb-3 leading-none">
                  {item.number}
                </h3>

                <h4 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-white mb-4">
                  {item.title}
                </h4>

                <p className="font-['Outfit'] text-lg text-gray-300 leading-8 tracking-wide">
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