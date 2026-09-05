import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import img1 from "../../assets/amman face.png";
import img2 from "../../assets/narasimmar.png";
import img3 from "../../assets/murugan1.png";
import img4 from "../../assets/perumal2.png";
import img5 from "../../assets/nandhi side.png";
import img6 from "../../assets/buddha1.png";

const collections = [
  {
    id: "Amman",
    image: img1,
    title: "Amman",
    material: "Premium Black Granite",
  },
  {
    id: "narasimmar",
    image: img2,
    title: "Narasimmar",
    material: "Natural Stone Sculpture",
  },
  {
    id: "lord-murugan",
    image: img3,
    title: "Lord Murugan",
    material: "Premium Granite",
  },
  {
    id: "perumal",
    image: img4,
    title: "Perumal",
    material: "Traditional Granite",
  },
  {
    id: "nandi",
    image: img5,
    title: "Nandi",
    material: "Temple Granite",
  },
  {
    id: "buddha",
    image: img6,
    title: "Buddha",
    material: "Handcrafted Stone",
  },
];

export default function Collections4() {
  return (
    <section
      id="gallery"
      className="py-24 bg-[#F8F5EF] overflow-hidden"
    >
      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-['Outfit'] uppercase tracking-[5px] text-[#B58A4A] mb-4">
            Luxury Gallery
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
            Discover Our
            <span className="text-[#B58A4A]"> Masterpieces</span>
          </h2>

          <p
            className="
            mt-6
            font-['Cormorant_Garamond']
            italic
            text-xl
            md:text-2xl
            text-gray-600
            leading-10
            max-w-4xl
            mx-auto
            "
          >
            Every sculpture is handcrafted by skilled artisans using
            traditional techniques, preserving India's rich heritage
            for generations.
          </p>
        </motion.div>

        {/* Gallery */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {collections.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-lg overflow-hidden shadow-xl"
            >

              <div className="overflow-hidden">

               <Link to={`/collections/${item.id}`}>
  <div className="overflow-hidden">
    <motion.img
      src={item.image}
      alt={item.title}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.6 }}
      className="w-full h-[420px] object-cover cursor-pointer"
    />
  </div>
</Link>

              </div>

              <div className="p-8">

                <h3
                  className="
                  font-['Cormorant_Garamond']
                  text-4xl
                  font-semibold
                  text-[#3E3428]
                  mb-3
                  group-hover:text-[#B58A4A]
                  transition
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  font-['Outfit']
                  text-lg
                  text-gray-600
                  leading-8
                  mb-8
                  "
                >
                  {item.material}
                </p>

                <Link
                  to={`/gallery/${item.id}`}
                  className="
                  inline-flex
                  items-center
                  font-['Outfit']
                  uppercase
                  tracking-[3px]
                  text-[#B58A4A]
                  hover:tracking-[5px]
                  transition-all
                  duration-300
                  "
                >
                  View Details →
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}