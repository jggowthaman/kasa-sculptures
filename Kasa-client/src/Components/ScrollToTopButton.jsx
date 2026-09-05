import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{
            scale: 1.1,
            rotate: 360,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="
          fixed
          bottom-6
          right-6
          md:bottom-8
          md:right-8
          z-[999]
          w-14
          h-14
          md:w-16
          md:h-16
          rounded-full
          bg-[#B58A4A]
          text-white
          shadow-2xl
          hover:bg-[#98723A]
          flex
          items-center
          justify-center
          transition-all
          duration-300"
        >
          <HiArrowUp className="text-2xl md:text-3xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}