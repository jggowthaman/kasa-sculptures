import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineClock,
} from "react-icons/hi";

import chooseImg from "../../assets/vinayakar.png";

const features = [
  {
    icon: HiOutlineBadgeCheck,
    title: "Master Craftsmanship",
    desc: "Every sculpture is handcrafted with exceptional attention to detail.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Premium Quality",
    desc: "Only the finest granite and stone materials are carefully selected.",
  },
  {
    icon: HiOutlineCube,
    title: "Custom Designs",
    desc: "Unique sculptures and architectural works tailored to every client.",
  },
  {
    icon: HiOutlineClock,
    title: "On-Time Delivery",
    desc: "Professional execution with timely completion of every project.",
  },
];

export default function Home4() {
  return (
    <section className="bg-[#F8F5EF] py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="w-full h-[720px] object-cover rounded-lg"
          >
            <motion.img
              src={chooseImg}
              alt="Workshop"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: .6 }}
              className="w-full h-[650px] object-cover"
            />
          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-base md:text-lg font-medium mb-4">
              Why Choose Us
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#3E3428] mb-8">
              Excellence Carved Into
              <span className="text-[#B58A4A]"> Every Creation</span>
            </h2>

            <p className="font-['Outfit'] text-xl md:text-2xl text-[#666] leading-10 tracking-wide mb-12">
              Combining traditional craftsmanship with modern precision,
              KASA LUXE delivers timeless stone sculptures and architectural
              masterpieces that stand for generations.
            </p>

            <div className="space-y-8">

              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: .5,
                      delay: index * .15,
                    }}
                    whileHover={{ x: 8 }}
                   className="group flex gap-6 items-start cursor-pointer"
                  >

                    <div className="w-20 h-20 rounded-full bg-[#B58A4A] flex items-center justify-center text-white text-4xl shrink-0 shadow-lg">

                      <Icon />

                    </div>

                    <div>

                      <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#3E3428] mb-3 group-hover:text-[#B58A4A] transition-all duration-300">
                        {item.title}
                      </h3>

                      <p className="font-['Outfit'] text-lg text-[#666] leading-8 tracking-wide">
                        {item.desc}
                      </p>

                    </div>

                  </motion.div>
                );
              })}

            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              className="mt-12"
            >

              <Link
                to="/about"
                className="inline-block
font-['Outfit']
bg-[#B58A4A]
text-white
px-12
py-5
uppercase
tracking-[3px]
text-[17px]
font-medium
rounded-sm
hover:bg-[#8A642F]
hover:shadow-xl
transition-all
duration-300"
              >
                Learn More
              </Link>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}