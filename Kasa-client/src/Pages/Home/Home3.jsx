import { motion } from "framer-motion";
import service1 from "../../assets/gods.png";
import service2 from "../../assets/temple1.png";
import service3 from "../../assets/statue.png";
// import service4 from "../../assets/img3.jpg";

const services = [
  {
    image: service1,
    title: "Stone Sculptures",
    desc: "Handcrafted granite and marble sculptures created with traditional South Indian artistry.",
  },
  {
    image: service2,
    title: "Temple Architecture",
    desc: "Complete temple construction and architectural stone works with timeless craftsmanship.",
  },
  {
    image: service3,
    title: "Custom Stone Carving",
    desc: "Personalized stone carvings for homes, villas, resorts and commercial spaces.",
  },

];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function Home3() {
  return (
    <section className="bg-white py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-16"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-base md:text-lg font-medium mb-4">
            Our Services
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#3E3428] leading-tight mb-6">
            Crafting Excellence In Every Stone
          </h2>

          <p className="max-w-3xl mx-auto font-['Outfit'] text-[#6B6258] text-xl leading-10 font-light tracking-wide">  
            Every sculpture is handcrafted with precision,
            devotion, and decades of experience to create
            timeless masterpieces.
          </p>

        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >

          {services.map((service) => (

            <motion.div
              key={service.title}
              variants={card}
              whileHover={{
                y: -15,
              }}
              transition={{ duration: .4 }}
              className="group bg-[#F8F5EF] rounded-md overflow-hidden shadow-lg"
            >

              <div className="overflow-hidden">

                <motion.img
                  src={service.image}
                  alt={service.title}
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{ duration: .6 }}
                  className="w-full h-72 object-cover"
                />

              </div>

              <div className="p-8">

                <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#3E3428] mb-4 group-hover:text-[#B58A4A] transition-all duration-300">
                  {service.title}
                </h3>

                <p className="font-['Outfit'] text-[17px] text-[#6B6258] leading-8 tracking-wide mb-8">
                  {service.desc}
                </p>

               

              </div>

            </motion.div>

          ))}

        </motion.div>

      </div>

    </section>
  );
}