import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineClipboardCheck,
  HiOutlinePhotograph,
} from "react-icons/hi";

const API_URL =
  "http://localhost:5000/api/services";

const SERVER_URL =
  "http://localhost:5000";

// =====================================================
// ICONS
// =====================================================

const serviceIcons = [
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineClipboardCheck,
];

// =====================================================
// SERVICES COMPONENT
// =====================================================

export default function Services2() {
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) return null;

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${SERVER_URL}${
      image.startsWith("/")
        ? ""
        : "/"
    }${image}`;
  };

  // =====================================================
  // FETCH SERVICES FROM ADMIN DATABASE
  // =====================================================

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          API_URL
        );

        const data =
          await response.json();

        console.log(
          "PUBLIC SERVICES:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load services."
          );
        }

        if (data.success) {
          // Only show Active services
          const activeServices =
            Array.isArray(
              data.services
            )
              ? data.services.filter(
                  (service) =>
                    service.status ===
                    "Active"
                )
              : [];

          setServices(
            activeServices
          );
        } else {
          throw new Error(
            data.message ||
              "Failed to load services."
          );
        }
      } catch (err) {
        console.error(
          "FETCH PUBLIC SERVICES ERROR:",
          err
        );

        setError(
          err.message ||
            "Unable to load services."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="
        py-24
        bg-[#F8F5EF]
        overflow-hidden
      ">

        <div className="
          max-w-[1450px]
          mx-auto
          px-6
          lg:px-10
        ">

          <div className="
            flex
            justify-center
            items-center
            min-h-[250px]
          ">

            <div className="
              text-center
            ">

              <div className="
                w-12
                h-12
                mx-auto
                border-4
                border-[#D9CCB5]
                border-t-[#B58A4A]
                rounded-full
                animate-spin
              " />

              <p className="
                mt-5
                font-['Outfit']
                text-gray-500
              ">
                Loading our services...
              </p>

            </div>

          </div>

        </div>

      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="
        py-24
        bg-[#F8F5EF]
        overflow-hidden
      ">

        <div className="
          max-w-[1450px]
          mx-auto
          px-6
          lg:px-10
          text-center
        ">

          <p className="
            font-['Outfit']
            text-red-500
          ">
            Unable to load services.
          </p>

        </div>

      </section>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section className="
      py-24
      bg-[#F8F5EF]
      overflow-hidden
    ">

      <div className="
        max-w-[1450px]
        mx-auto
        px-6
        lg:px-10
      ">

        {/* =================================================
            HEADING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-center
            mb-20
          "
        >

          <p className="
            font-['Outfit']
            uppercase
            tracking-[6px]
            text-[#B58A4A]
            text-sm
            md:text-base
            mb-5
          ">
            Our Expertise
          </p>

          <h2 className="
            font-['Cormorant_Garamond']
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            text-[#2F2923]
            leading-tight
          ">
            Premium Stone
            <span className="
              text-[#B58A4A]
            ">
              {" "}
              Services
            </span>
          </h2>

          <p className="
            font-['Cormorant_Garamond']
            italic
            text-xl
            md:text-2xl
            lg:text-3xl
            leading-10
            text-gray-600
            max-w-5xl
            mx-auto
            mt-8
          ">
            We combine generations of
            traditional craftsmanship with
            architectural excellence to create
            timeless stone masterpieces for
            temples, homes, resorts, public
            spaces, and international projects.
          </p>

        </motion.div>

        {/* =================================================
            NO SERVICES
        ================================================= */}

        {services.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              text-center
              py-16
            "
          >

            <HiOutlinePhotograph
              className="
                text-5xl
                text-[#B58A4A]
                mx-auto
                mb-5
              "
            />

            <h3 className="
              font-['Cormorant_Garamond']
              text-3xl
              font-semibold
              text-[#2F2923]
            ">
              Our Services
            </h3>

            <p className="
              mt-3
              font-['Outfit']
              text-gray-500
            ">
              Our services will be displayed
              here soon.
            </p>

          </motion.div>

        ) : (

          /* =================================================
              SERVICE CARDS
          ================================================= */

          <div className="
            grid
            sm:grid-cols-2
            xl:grid-cols-5
            gap-8
          ">

            {services.map(
              (service, index) => {

                const Icon =
                  serviceIcons[
                    index %
                      serviceIcons.length
                  ];

                const imageUrl =
                  getImageUrl(
                    service.image
                  );

                return (
                  <motion.div
                    key={service.id}
                    initial={{
                      opacity: 0,
                      y: 60,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        index * 0.15,
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="
                      group
                      bg-white
                      rounded-2xl
                      overflow-hidden
                      border
                      border-[#E7DDCF]
                      shadow-lg
                      hover:shadow-2xl
                      transition-all
                      duration-500
                    "
                  >

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    {imageUrl ? (

                      <div className="
                        w-full
                        h-52
                        overflow-hidden
                      ">

                        <img
                          src={imageUrl}
                          alt={
                            service.title
                          }
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-700
                          "
                        />

                      </div>

                    ) : null}

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="
                      p-10
                    ">

                      {/* ICON */}

                      <div className="
                        w-20
                        h-20
                        rounded-full
                        bg-[#B58A4A]/10
                        flex
                        items-center
                        justify-center
                        mb-8
                        group-hover:bg-[#B58A4A]
                        transition-all
                        duration-500
                      ">

                        <div className="
                          text-5xl
                          text-[#B58A4A]
                          group-hover:text-white
                          transition-all
                          duration-500
                        ">
                          <Icon />
                        </div>

                      </div>

                      {/* TITLE */}

                      <h3 className="
                        font-['Cormorant_Garamond']
                        text-4xl
                        font-semibold
                        text-[#2F2923]
                        mb-6
                      ">
                        {service.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="
                        font-['Outfit']
                        text-lg
                        leading-9
                        text-gray-600
                      ">
                        {
                          service.description
                        }
                      </p>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        )}

      </div>

    </section>
  );
}