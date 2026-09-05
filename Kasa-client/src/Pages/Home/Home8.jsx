import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import gallery1 from "../../assets/perumal.png";
import gallery2 from "../../assets/narasimmar.png";
import gallery3 from "../../assets/varaagi.png";
import gallery4 from "../../assets/vinayakar face.png";
import gallery5 from "../../assets/lingam.png";
import gallery6 from "../../assets/murugan1.png";

const gallery = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Home8() {
  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">

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
            Our Gallery
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#3E3428] leading-tight mb-6">
            Crafted With Passion &
            <span className="text-[#B58A4A]"> Precision</span>
          </h2>

         <p className="font-['Outfit'] text-xl md:text-2xl text-[#666] max-w-4xl mx-auto leading-10 tracking-wide">
            Discover our collection of handcrafted stone sculptures,
            temple architecture, granite carvings, and artistic masterpieces.
          </p>

        </motion.div>

        {/* Gallery */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >

         {gallery.map((image, index) => (
  <Link key={index} to="/collections">
    <motion.div
      variants={item}
      whileHover={{
  y: -12,
  scale: 1.02,
}}
      className="relative overflow-hidden rounded-xl group shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500"
    >
      <motion.img
        src={image}
        alt={`Gallery ${index + 1}`}
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.6 }}
       className="w-full h-[450px] object-cover"
      />

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          className="
font-['Outfit']
border
border-white
px-10
py-4
text-white
text-base
font-medium
uppercase
tracking-[4px]
backdrop-blur-sm
bg-white/10
rounded-sm"
        >
          View Artwork
        </motion.div>
      </div>
    </motion.div>
  </Link>
))}

        </motion.div>

      </div>

    </section>
  );
}