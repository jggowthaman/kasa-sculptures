import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/kasalogo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menus = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Collections", path: "/collections" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
className="fixed top-0 left-0 w-full z-50 bg-[#F5F1E8] border-b border-[#D9CCB5] shadow-md transition-all duration-300 p-1"
    >
      <div className="max-w-[1450px] mx-auto h-24 px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}

      <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="KASA LUXE"
    className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain"
  />
</Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-14">

          {menus.map((item) => (
            <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `relative uppercase text-[15px] tracking-[2px] font-medium transition-all duration-500 ${
      isActive
        ? "text-[#B58A4A]"
        : "text-[#3D352D] hover:text-[#B58A4A]"
    }`
  }
>
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute left-0 -bottom-2 w-full h-[1px] bg-[#B58A4A]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-6">
<Link
  to="/contact"
  className="
    border
    border-[#B58A4A]
    px-8
    py-3
    uppercase
    tracking-[2px]
    text-sm
    text-[#B58A4A]
    hover:bg-[#B58A4A]
    hover:text-white
    transition-all
    duration-500
    rounded-sm
  "
>
  Get A Quote
</Link>

   <button
  onClick={() => setOpen(true)}
  className="block lg:hidden text-[#B58A4A] hover:text-[#8A642F] transition duration-300"
>
  <HiOutlineMenuAlt3 size={34} />
</button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(true)}
          className={`lg:hidden text-3xl ${
            scroll ? "text-[#222]" : "text-white"
          }`}
        >
          <HiOutlineMenuAlt3
  className="text-[34px] text-[#1E1E1E] hover:text-[#B58A4A] transition-all duration-300"
/>
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-80 h-screen bg-[#111] p-8"
          >

            <div className="flex justify-end">

              <HiX
                onClick={() => setOpen(false)}
                className="text-3xl text-white cursor-pointer"
              />

            </div>

            <div className="mt-14 flex flex-col gap-8">

              {menus.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="uppercase tracking-[3px] text-[#F5F5F5] hover:text-[#B58A4A] transition"
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
  to="/contact"
  onClick={() => setOpen(false)}
  className="
    mt-8
    border
    border-[#B58A4A]
    py-3
    text-center
    text-[#B58A4A]
    uppercase
    tracking-[2px]
    rounded-sm
    hover:bg-[#B58A4A]
    hover:text-white
    transition-all
    duration-300
  "
>
  Get A Quote
</Link>
            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  );
}