import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineCube,
  HiOutlineGlobeAlt,
} from "react-icons/hi";



const features = [
  {
    icon: <HiOutlineOfficeBuilding />,
    title: "Traditional Workshop",
  },
  {
    icon: <HiOutlineCube />,
    title: "Premium Stone Materials",
  },
  {
    icon: <HiOutlineGlobeAlt />,
    title: "Worldwide Export",
  },
  {
    icon: <HiOutlineLocationMarker />,
    title: "Located in Mamallapuram",
  },
];

export default function Contact4() {
  return (
    <section className="py-28 bg-[#F8F5EF] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Google Map */}

<motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="rounded-2xl overflow-hidden shadow-2xl border border-[#E6DCCB]"
>

  <iframe
    title="KASA LUXE Location"
    src="https://www.google.com/maps?q=J55P%2BGGQ%2C+First+street%2C+East+Coast+Rd%2C+Mariyappan+Thottam%2C+Kalpakkam%2C+Mahabalipuram%2C+Tamil+Nadu&z=14&t=m&hl=en&output=embed"
    width="100%"
    height="650"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-[450px] md:h-[550px] lg:h-[650px] border-0"
  ></iframe>

 

</motion.div>
          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] mb-5">
              Visit Our Workshop
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923] leading-tight">
              Where Every Stone
              <span className="text-[#B58A4A]">
                {" "}Comes To Life
              </span>
            </h2>

            <p className="mt-8 font-['Cormorant_Garamond'] italic text-2xl leading-10 text-gray-600">
              Our workshop in Mamallapuram is where generations of
              craftsmanship continue to shape timeless sculptures,
              temple architecture, and custom stone masterpieces.
              Every creation is carefully handcrafted using premium
              natural stone and traditional techniques.
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-6 mt-14">

              {features.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .6,
                    delay: index * .15,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                  bg-white
                  rounded-xl
                  border
                  border-[#E6DCCB]
                  p-6
                  shadow-lg
                  flex
                  items-center
                  gap-5
                  "
                >

                  <div className="text-4xl text-[#B58A4A]">
                    {item.icon}
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#2F2923]">
                    {item.title}
                  </h3>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}