import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";

const contactInfo = [
  {
    icon: <HiOutlinePhone />,
    title: "Phone Number",
    value: "+91 99406 76481",
    description: "Speak directly with our sculpture experts.",
  },
  {
    icon: <HiOutlineMail />,
    title: "Email Address",
    value: "kamatchiamman75@gmail.com",
    description: "Send us your project requirements anytime.",
  },
  {
    icon: <HiOutlineLocationMarker />,
    title: "Workshop Location",
    value: "Mamallapuram, Tamil Nadu",
    description: "Visit our workshop to experience our craftsmanship.",
  },
  {
    icon: <HiOutlineClock />,
    title: "Working Hours",
    value: "Mon - Sat | 9:00 AM - 6:00 PM",
    description: "We're available throughout the week for enquiries.",
  },
];

export default function Contact2() {
  return (
    <section className="py-28 bg-[#F8F5EF] overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >

          <p className="font-['Outfit'] uppercase tracking-[6px] text-[#B58A4A] text-sm md:text-base mb-5">
            Contact Information
          </p>

          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2923] leading-tight">
            We'd Love To
            <span className="text-[#B58A4A]"> Hear From You</span>
          </h2>

          <p className="font-['Cormorant_Garamond'] italic text-xl md:text-2xl lg:text-3xl leading-10 text-gray-600 max-w-5xl mx-auto mt-8">
            Whether you're planning a temple project, custom sculpture,
             or an international export enquiry,
            our team is here to assist you with expert guidance.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {contactInfo.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                bg-white
                rounded-2xl
                shadow-xl
                border
                border-[#E8DDCA]
                p-6
                text-center
                group
                transition-all
                duration-500
              "
            >

              {/* Icon */}

              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-[#B58A4A]/10
                  flex
                  items-center
                  justify-center
                  mb-8
                  group-hover:bg-[#B58A4A]
                  transition-all
                  duration-500
                "
              >

                <div className="text-5xl text-[#B58A4A] group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>

              </div>

              {/* Title */}

              <h3 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#2F2923] mb-5">
                {item.title}
              </h3>

              {/* Value */}

              <p className="font-['Outfit'] text-lg font-medium text-[#B58A4A] mb-4">
                {item.value}
              </p>

              {/* Description */}

              <p className="font-['Outfit'] text-gray-600 leading-8">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}