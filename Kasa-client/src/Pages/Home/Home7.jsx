import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ctaBg from "../../assets/img3.jpg";

export default function Home7() {
  return (
    <section
      className="relative py-32 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* Small Heading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="uppercase tracking-[6px] text-[#D4AF37] mb-5"
        >
          Let's Build Something Timeless
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
        >
          Transform Your Vision Into
          <span className="text-[#D4AF37]"> Stone Art</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-lg leading-8 max-w-3xl mx-auto mt-8"
        >
          Whether it's temple architecture, handcrafted sculptures,
          custom carvings, or, our artisans are
          ready to bring your ideas to life with unmatched craftsmanship.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
  to="/contact"
  className="inline-flex items-center justify-center min-w-[250px] px-8 py-4 bg-[#B58A4A] text-white uppercase tracking-[2px] rounded-sm hover:bg-[#8A642F] transition duration-300"
>
  Get Free Consultation
</Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
  to="/services"
  className="inline-flex items-center justify-center min-w-[250px] px-8 py-4 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[2px] rounded-sm hover:bg-[#D4AF37] hover:text-black transition duration-300"
>
  Explore Services
</Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}