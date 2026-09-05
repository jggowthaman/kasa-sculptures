import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import hanuman from "../../assets/hanuman.png";
import shiva from "../../assets/lingam 1.png";
import murugan from "../../assets/muruga.png";
import Ramar from "../../assets/ramar.png";
import buddha from "../../assets/buddha.png";
import nandi from "../../assets/nandhi side.png";

const categories = [
  {
    title: "Hanuman",
    image: hanuman,
    desc: "Handcrafted granite hanuman sculptures.",
  },
  {
    title: "Shiva",
    image: shiva,
    desc: "Elegant Shiva idols carved by master artisans.",
  },
  {
    title: "Murugan",
    image: murugan,
    desc: "Traditional Murugan sculptures in premium granite.",
  },
  {
    title: "Ramar",
    image: Ramar,
    desc: "Beautiful Ramar idols for temples and homes.",
  },
  {
    title: "Buddha",
    image: buddha,
    desc: "Peaceful Buddha sculptures with timeless elegance.",
  },
  {
    title: "Nandi",
    image: nandi,
    desc: "Premium Nandi sculptures for temple entrances.",
  },
];

export default function Collections2() {
  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-16"
        >

          <p className="font-['Outfit'] uppercase tracking-[5px] text-[#B58A4A] mb-4">
            Browse Categories
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#3E3428]">
            Explore Our
            <span className="text-[#B58A4A]"> Collections</span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-gray-600 leading-10 max-w-4xl mx-auto mt-8">
            Discover handcrafted sculptures inspired by timeless
            traditions and created with unmatched craftsmanship.
          </p>

        </motion.div>

        {/* Categories */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .1,
              }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              <div className="overflow-hidden">

                <motion.img
                  src={item.image}
                  alt={item.title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: .6 }}
                  className="w-full h-[320px] object-cover"
                />

              </div>

              <div className="p-8 text-center">

                <h3 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#3E3428] mb-4 group-hover:text-[#B58A4A] transition">
                  {item.title}
                </h3>

                <p className="font-['Outfit'] text-lg leading-8 text-gray-600 mb-8">
                  {item.desc}
                </p>

                <Link
                  to="/gallery"
                  className="font-['Outfit'] uppercase tracking-[3px] text-[#B58A4A] hover:tracking-[5px] transition-all duration-300"
                >
                  View Sculptures →
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}