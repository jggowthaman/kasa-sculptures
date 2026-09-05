import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/varagi.png";
import { HiCheckCircle } from "react-icons/hi";

export default function Home2() {
  return (
    <section className="bg-[#F8F5EF] py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 md:px-10 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={aboutImg}
              alt="Stone Sculptor"
              className="rounded-md shadow-2xl w-full h-[600px] object-cover"
            />

            <div className="absolute -bottom-8 -right-8 bg-[#B58A4A] text-white p-8 rounded-md shadow-xl">

              <h2 className="text-5xl font-bold">
                30+
              </h2>

              <p className="uppercase tracking-[3px] mt-2 text-sm">
                Years Experience
              </p>

            </div>

          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <p className="uppercase tracking-[5px] text-[#B58A4A] mb-3">
              About KASA LUXE
            </p>

            <h2 className="text-5xl lg:text-6xl text-[#3E3428] leading-tight">
              Preserving Heritage Through
              <span className="text-[#B58A4A]"> Timeless Stone Art</span>
            </h2>
<p className="mt-8 font-['Cormorant_Garamond'] text-[24px] md:text-[26px] text-[#5A5248] leading-10 font-medium tracking-wide">

  For decades, KASA LUXE has been dedicated to crafting
  exceptional granite sculptures, temple architecture,
  and custom stone carvings that celebrate India's rich
  artistic heritage. Every creation reflects precision,
  devotion, and unmatched craftsmanship.

</p>
            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
  {[
    "Temple Sculptures",
    "Granite Carvings",
    "Custom Architecture",
    "Worldwide Export",
  ].map((item) => (
    <motion.div
      key={item}
      whileHover={{ x: 10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 group cursor-pointer"
    >
      <HiCheckCircle className="text-[#B58A4A] text-2xl group-hover:rotate-12 transition-all duration-300" />

      <p className="font-['Cormorant_Garamond'] text-2xl font-semibold tracking-wide text-[#3E3428] group-hover:text-[#B58A4A] transition-all duration-300">
        {item}
      </p>
    </motion.div>
  ))}
</div>

            {/* Button */}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12"
            >

              <Link
                to="/about"
                className="inline-block bg-[#B58A4A] text-white px-10 py-4 uppercase tracking-[2px] hover:bg-[#8A642F] transition duration-300"
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