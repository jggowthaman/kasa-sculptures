import { Link, NavLink } from "react-router-dom";
import logo from "../assets/kasa-logo-footer.png";

import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
} from "react-icons/hi";

import { motion } from "framer-motion";

export default function Footer() {
  // =====================================================
  // ANIMATION
  // =====================================================

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // =====================================================
  // QUICK LINKS
  // =====================================================

  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Collections",
      path: "/collections",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // =====================================================
  // SERVICES
  // =====================================================

  const services = [
    {
      name: "Stone Sculptures",
      path: "/services",
    },
    {
      name: "Temple Architecture",
      path: "/services",
    },
    {
      name: "Custom Stone Carving",
      path: "/services",
    },
    {
      name: "Worldwide Export",
      path: "/services",
    },
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <motion.footer
      className="
        w-full
        bg-[#111111]
        text-[#F8F4EE]
        pt-14
        sm:pt-16
        lg:pt-20
        overflow-hidden
      "
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={container}
    >
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          max-w-[1450px]
          mx-auto

          px-5
          sm:px-8
          lg:px-10

          grid

          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4

          gap-y-12
          sm:gap-y-14
          lg:gap-x-12
          lg:gap-y-0
        "
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <motion.div
          variants={item}
          className="
            min-w-0
            text-center
            sm:text-left
          "
        >
          {/* LOGO */}

          <motion.img
            src={logo}
            alt="KASA LUXE"
            className="
              w-24
              sm:w-28
              h-auto
              mb-5
              mx-auto
              sm:mx-0
              object-contain
            "
            whileHover={{
              scale: 1.05,
              rotate: 1,
            }}
            transition={{
              duration: 0.4,
            }}
          />

          {/* BRAND NAME */}

          <h2
            className="
              font-['Cormorant_Garamond']

              text-3xl
              sm:text-4xl
              lg:text-3xl

              font-semibold

              tracking-wide

              text-[#B58A4A]
            "
          >
            KASA LUXE
          </h2>

          {/* COMPANY NAME */}

          <p
            className="
              mt-2
              sm:mt-3

              font-['Outfit']

              text-base
              sm:text-lg
              lg:text-lg

              leading-7
              sm:leading-8

              text-gray-300

              max-w-sm

              mx-auto
              sm:mx-0
            "
          >
            Kamatchi Amman Sculpture & Architects
          </p>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              sm:mt-5

              text-gray-400

              leading-6
              sm:leading-7

              text-sm

              font-['Outfit']

              max-w-md

              mx-auto
              sm:mx-0
            "
          >
            Crafting timeless stone sculptures with
            traditional South Indian craftsmanship for
            homes, temples, resorts and heritage projects.
          </p>
        </motion.div>

        {/* =====================================================
            QUICK LINKS
        ===================================================== */}

        <motion.div
          variants={item}
          className="
            min-w-0
            text-center
            sm:text-left
          "
        >
          <h3
            className="
              font-['Cormorant_Garamond']

              text-3xl
              sm:text-3xl
              lg:text-4xl

              font-semibold

              text-[#B58A4A]

              mb-6
              sm:mb-8

              tracking-wide
            "
          >
            Quick Links
          </h3>

          <div
            className="
              flex
              flex-col
              items-center
              sm:items-start
              gap-3
              sm:gap-4
            "
          >
            {quickLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{
                  x: 6,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Link
                  to={link.path}
                  className="
                    group
                    relative
                    inline-block

                    font-['Outfit']

                    text-base
                    sm:text-lg
                    lg:text-lg

                    tracking-wide

                    text-gray-300

                    hover:text-[#B58A4A]

                    transition-all
                    duration-300
                  "
                >
                  {link.name}

                  <span
                    className="
                      absolute
                      left-0
                      -bottom-1

                      h-[1px]

                      w-0

                      bg-[#B58A4A]

                      transition-all
                      duration-300

                      group-hover:w-full
                    "
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <motion.div
          variants={item}
          className="
            min-w-0
            text-center
            sm:text-left
          "
        >
          <h3
            className="
              font-['Cormorant_Garamond']

              text-3xl
              sm:text-3xl
              lg:text-4xl

              font-semibold

              text-[#B58A4A]

              mb-6
              sm:mb-8

              tracking-wide
            "
          >
            Services
          </h3>

          <div
            className="
              flex
              flex-col
              items-center
              sm:items-start

              gap-3
              sm:gap-4
            "
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                whileHover={{
                  x: 6,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <NavLink
                  to={service.path}
                  className="
                    group
                    relative
                    inline-block

                    font-['Outfit']

                    text-base
                    sm:text-lg
                    lg:text-lg

                    tracking-wide

                    text-gray-300

                    hover:text-[#B58A4A]

                    transition-all
                    duration-300
                  "
                >
                  {service.name}

                  <span
                    className="
                      absolute
                      left-0
                      -bottom-1

                      h-[1px]

                      w-0

                      bg-[#B58A4A]

                      transition-all
                      duration-300

                      group-hover:w-full
                    "
                  />
                </NavLink>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
            CONTACT
        ===================================================== */}

        <motion.div
          variants={item}
          className="
            min-w-0
            text-center
            sm:text-left
          "
        >
          <h3
            className="
              font-['Cormorant_Garamond']

              text-3xl
              sm:text-3xl
              lg:text-4xl

              font-semibold

              text-[#B58A4A]

              mb-6
              sm:mb-8

              tracking-wide
            "
          >
            Contact
          </h3>

          <div
            className="
              flex
              flex-col

              gap-5

              text-gray-300
            "
          >
            {/* LOCATION */}

            <div
              className="
                flex
                items-start

                gap-3

                text-left
              "
            >
              <HiOutlineLocationMarker
                className="
                  text-[#B58A4A]

                  text-2xl
                  sm:text-3xl

                  shrink-0

                  mt-1
                "
              />

              <p
                className="
                  min-w-0

                  font-['Outfit']

                  text-sm
                  sm:text-base
                  lg:text-lg

                  leading-6
                  sm:leading-7

                  text-gray-300

                  break-words
                "
              >
                First Street, Mariyappan Thottam,
                Kalpakkam Road, Mamallapuram,
                Tamil Nadu - 603 104
              </p>
            </div>

            {/* PHONE */}

            <div
              className="
                flex
                items-start

                gap-3

                text-left
              "
            >
              <HiOutlinePhone
                className="
                  text-[#B58A4A]

                  text-2xl
                  sm:text-3xl

                  shrink-0

                  mt-1
                "
              />

              <p
                className="
                  min-w-0

                  font-['Outfit']

                  text-sm
                  sm:text-base
                  lg:text-lg

                  leading-6
                  sm:leading-7

                  text-gray-300

                  break-words
                "
              >
                +91 99406 76481
                <br />
                +91 94443 19463
                <br />
                +91 87544 64818
              </p>
            </div>

            {/* EMAIL */}

            <div
              className="
                flex
                items-start

                gap-3

                text-left
              "
            >
              <HiOutlineMail
                className="
                  text-[#B58A4A]

                  text-2xl
                  sm:text-3xl

                  shrink-0

                  mt-1
                "
              />

              <p
                className="
                  min-w-0

                  font-['Outfit']

                  text-sm
                  sm:text-base
                  lg:text-lg

                  leading-6
                  sm:leading-7

                  text-gray-300

                  break-all
                "
              >
                kasaluxeofficial@gmail.com
              </p>
            </div>

            {/* WORKING HOURS */}

            <div
              className="
                flex
                items-start

                gap-3

                text-left
              "
            >
              <HiOutlineClock
                className="
                  text-[#B58A4A]

                  text-2xl
                  sm:text-3xl

                  shrink-0

                  mt-1
                "
              />

              <p
                className="
                  min-w-0

                  font-['Outfit']

                  text-sm
                  sm:text-base
                  lg:text-lg

                  leading-6
                  sm:leading-7

                  text-gray-300
                "
              >
                Mon - Sat
                <br className="sm:hidden" />
                <span className="hidden sm:inline">
                  {" "}
                  :
                </span>{" "}
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <motion.div
        variants={item}
        className="
          border-t
          border-[#2A2A2A]

          mt-14
          sm:mt-16
          lg:mt-20
        "
      >
        <div
          className="
            max-w-[1450px]
            mx-auto

            px-5
            sm:px-8
            lg:px-10

            py-6
            sm:py-7

            flex
            flex-col

            md:flex-row

            justify-between

            items-center

            gap-5
            md:gap-6
          "
        >
          {/* COPYRIGHT */}

          <div
            className="
              flex
              flex-col
              sm:flex-row

              items-center

              gap-2
              sm:gap-3

              text-center
              sm:text-left

              font-['Outfit']

              text-xs
              sm:text-sm
              lg:text-base

              text-gray-400

              min-w-0
            "
          >
            <p>
              © 2026 KASA LUXE.
              <span className="hidden sm:inline">
                {" "}
                All Rights Reserved.
              </span>
            </p>

            <span
              className="
                hidden
                sm:inline

                text-gray-600
              "
            >
              |
            </span>

            <p>
              <span>All Rights Reserved.</span>
            </p>

            <span
              className="
                hidden
                sm:inline

                text-gray-600
              "
            >
              |
            </span>

            <p>
              Designed by{" "}
              <span
                className="
                  font-['Cormorant_Garamond']

                  text-xl
                  sm:text-2xl

                  font-semibold

                  text-[#B58A4A]

                  hover:text-[#D4AF37]

                  transition
                  duration-300
                "
              >
                Webniqo
              </span>
            </p>
          </div>

          {/* POLICY LINKS */}

          <div
            className="
              flex
              flex-col
              sm:flex-row

              items-center

              justify-center

              gap-3
              sm:gap-6
              lg:gap-8

              text-center

              font-['Outfit']

              text-xs
              sm:text-sm
              lg:text-base

              text-gray-400

              w-full
              md:w-auto
            "
          >
            <Link
              to="/privacy-policy"
              className="
                hover:text-[#B58A4A]

                transition
                duration-300
              "
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="
                hover:text-[#B58A4A]

                transition
                duration-300
              "
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}