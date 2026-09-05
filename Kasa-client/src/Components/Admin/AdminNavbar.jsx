import { motion } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({
  setIsOpen,
  title = "Dashboard",
}) {
  const navigate = useNavigate();

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-[#E1D7C7]
        px-5
        sm:px-8
        flex
        items-center
        justify-between
        sticky
        top-0
        z-30
      "
    >

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            lg:hidden
            flex
            items-center
            justify-center
            w-10
            h-10
            text-[#2F2923]
            hover:text-[#B58A4A]
            hover:bg-[#F5F1E8]
            transition
            rounded-sm
          "
          aria-label="Open admin menu"
        >
          <HiOutlineMenu className="text-2xl" />
        </button>

        {/* Page Title */}
        <div>

          <p
            className="
              hidden
              sm:block
              text-[10px]
              uppercase
              tracking-[3px]
              text-[#B58A4A]
              font-['Outfit']
            "
          >
            Administration
          </p>

          <h2
            className="
              font-['Cormorant_Garamond']
              text-2xl
              sm:text-3xl
              font-semibold
              text-[#2F2923]
            "
          >
            {title}
          </h2>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* View Website */}
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="
            hidden
            md:flex
            items-center
            gap-2
            px-4
            py-2
            border
            border-[#D9CCB5]
            text-[#5C5146]
            hover:border-[#B58A4A]
            hover:text-[#B58A4A]
            transition
            font-['Outfit']
            text-xs
            uppercase
            tracking-[1.5px]
          "
        >
          <HiOutlineExternalLink className="text-lg" />
          Website
        </motion.button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">

            <p
              className="
                font-['Outfit']
                font-medium
                text-sm
                text-[#2F2923]
              "
            >
              KASA Admin
            </p>

            <p
              className="
                font-['Outfit']
                text-[11px]
                text-gray-500
              "
            >
              Administrator
            </p>

          </div>

          {/* Avatar */}
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#B58A4A]
              text-white
              flex
              items-center
              justify-center
              font-['Cormorant_Garamond']
              text-xl
              font-semibold
              shadow-sm
            "
          >
            K
          </div>

        </div>

      </div>

    </header>
  );
}