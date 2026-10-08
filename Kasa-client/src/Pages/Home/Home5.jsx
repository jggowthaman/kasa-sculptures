import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import project1 from "../../assets/t13.jpeg";
import project2 from "../../assets/v1.png";
import project3 from "../../assets/t10.jpeg";


const projects = [
  {
    image: project1,
    title: "Temple Entrance",
  },
  {
    image: project2,
    title: "Vinayakar",
  },
  {
    image: project3,
    title: "Temple Pillars",
  },

];

export default function Home5() {
  return (
    <section className="py-24 bg-white overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-16"
        >

          <p className="uppercase tracking-[5px] text-[#B58A4A] mb-4">
            Our Projects
          </p>

          <h2 className="text-5xl text-[#3E3428] mb-6">
            Timeless Masterpieces
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-8">
            Explore some of our finest stone sculptures,
            temple architecture, and custom carving projects
            crafted with exceptional precision.
          </p>

        </motion.div>

        {/* Gallery */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .15,
              }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">

                <motion.h3
                  initial={{ y: 40 }}
                  whileInView={{ y: 0 }}
                  className="text-white text-3xl mb-3"
                >
                  {project.title}
                </motion.h3>

                <Link
                  to="/services"
                  className="text-[#D4AF37] uppercase tracking-[2px] hover:tracking-[4px] transition-all"
                >
                  View Project →
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mt-16"
        >

          <Link
            to="/services"
            className="inline-block bg-[#B58A4A] text-white px-10 py-4 uppercase tracking-[2px] hover:bg-[#8A642F] transition"
          >
            View All Projects
          </Link>

        </motion.div>

      </div>

    </section>
  );
}