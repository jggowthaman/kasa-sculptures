import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineX,
  HiOutlineExternalLink,
} from "react-icons/hi";

import logo from "../../assets/kasa-logo-footer.png";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: HiOutlineViewGrid,
    },
    {
      name: "Sculptures",
      path: "/admin/sculptures",
      icon: HiOutlineCollection,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: HiOutlineViewGrid,
    },

    {
      name: "Services",
      path: "/admin/services",
      icon: HiOutlineCog,
    },
    {
      name: "Enquiries",
      path: "/admin/enquiries",
      icon: HiOutlineMail,
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-[280px]
          h-screen
          bg-[#111111]
          border-r
          border-[#B58A4A]/30
          flex
          flex-col
          transition-transform
          duration-300
          ease-in-out
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}
        <div className="h-24 px-6 flex items-center border-b border-[#2A2A2A]">

          <img
            src={logo}
            alt="KASA LUXE"
            className="w-16 h-auto object-contain"
          />

          <div className="ml-3">

            <h1
              className="
                font-['Cormorant_Garamond']
                text-2xl
                font-semibold
                tracking-wide
                text-[#B58A4A]
              "
            >
              KASA LUXE
            </h1>

            <p
              className="
                font-['Outfit']
                text-[9px]
                uppercase
                tracking-[3px]
                text-gray-400
              "
            >
              Admin Panel
            </p>

          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              ml-auto
              lg:hidden
              text-gray-300
              hover:text-[#B58A4A]
              transition
            "
          >
            <HiOutlineX className="text-2xl" />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-7 overflow-y-auto">

          <p
            className="
              px-4
              mb-4
              text-[10px]
              uppercase
              tracking-[3px]
              text-gray-500
              font-['Outfit']
            "
          >
            Main Menu
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  whileHover={{ x: active ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3.5
                    rounded-sm
                    text-left
                    font-['Outfit']
                    text-sm
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-[#B58A4A] text-white shadow-lg"
                        : "text-gray-300 hover:bg-[#1E1E1E] hover:text-[#B58A4A]"
                    }
                  `}
                >

                  <Icon className="text-xl shrink-0" />

                  <span>{item.name}</span>

                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}

                </motion.button>
              );
            })}

          </div>

          {/* Divider */}
          <div className="my-7 border-t border-[#2A2A2A]" />

          {/* Website */}
          <p
            className="
              px-4
              mb-4
              text-[10px]
              uppercase
              tracking-[3px]
              text-gray-500
              font-['Outfit']
            "
          >
            Website
          </p>

          <motion.button
            type="button"
            onClick={() => handleNavigate("/")}
            whileHover={{ x: 4 }}
            className="
              w-full
              flex
              items-center
              gap-4
              px-4
              py-3.5
              rounded-sm
              text-gray-300
              hover:bg-[#1E1E1E]
              hover:text-[#B58A4A]
              transition
              font-['Outfit']
              text-sm
              text-left
            "
          >
            <HiOutlineExternalLink className="text-xl" />

            <span>View Website</span>
          </motion.button>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#2A2A2A]">

          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full
              flex
              items-center
              gap-4
              px-4
              py-3.5
              rounded-sm
              text-gray-400
              hover:text-red-400
              hover:bg-[#1E1E1E]
              transition
              font-['Outfit']
              text-sm
              text-left
            "
          >
            <HiOutlineLogout className="text-xl" />

            <span>Logout</span>

          </motion.button>

        </div>

      </aside>
    </>
  );
}