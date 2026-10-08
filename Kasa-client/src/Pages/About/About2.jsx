import { motion } from "framer-motion";
import {
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
} from "react-icons/hi";

import aboutImg from "../../assets/c0.jpeg";

const features = [

 
  "Premium Granite & Marble Works",
  "Temple Architecture Specialists",
];

export default function About2() {
  return (
    <section className="bg-[#F8F5EF] py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >

            <div className="overflow-hidden rounded-md shadow-2xl">

              <motion.img
                src={aboutImg}
                alt="Our Story"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: .6 }}
                className="w-full h-[420px] sm:h-[520px] lg:h-[700px] object-cover"
              />

            </div>

            {/* Experience Card */}

            

          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .9 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-lg mb-5">

              Our Story

            </p>

            <h3 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl leading-tight text-[#2E2419] font-semibold mb-8">

              The Path My Father Showed Me
              <br />

             

            </h3>

            <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl leading-relaxed text-[#5B5247] mb-8">

              I saw how he could look at a piece of stone and imagine what it could become.
He was a simple, hardworking man who wanted only one thing for his family — a better life.


            </p>

            <p className="font-['Outfit'] text-lg md:text-xl leading-10 text-gray-600 mb-12">

              He brought our family from our native Pudukkottai to Mahabalipuram, a place deeply connected with the heritage of Indian stone sculpture.
That decision changed the course of our lives.
Mahabalipuram became not only our home, but the place where my journey as a sculptor truly took shape.
I began helping my father when I was just five years old.
At that age, I did not understand that I was learning a craft.


            </p>

            {/* Features */}

            <div className="space-y-6">

              {features.map((item, index) => (

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
                  className="flex items-center gap-5"
                >

                  <div className="w-12 h-12 rounded-full bg-[#B58A4A] flex items-center justify-center text-white">

                    <HiOutlineBadgeCheck size={24} />

                  </div>

                  <h4 className="font-['Cormorant_Garamond'] text-2xl text-[#3E3428]">

                    {item}

                  </h4>

                </motion.div>

              ))}

            </div>

            {/* Quote */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12 border-l-4 border-[#B58A4A] pl-6"
            >

              <HiOutlineSparkles className="text-[#B58A4A] text-3xl mb-4" />

              <p className="font-['Cormorant_Garamond'] italic text-2xl leading-relaxed text-[#4D453C]">

Craft is not only about creating something beautiful.
It is about creating a life for the people you love.


              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}