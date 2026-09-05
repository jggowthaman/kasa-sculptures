import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/categories";

export default function Gallery2({
  activeCategory,
  setActiveCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      console.log("GALLERY CATEGORIES:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load categories."
        );
      }

      /*
        Your API may return:

        {
          success: true,
          categories: [...]
        }
      */

      const fetchedCategories = Array.isArray(
        data.categories
      )
        ? data.categories
        : [];

      setCategories(fetchedCategories);

      // If no category is selected yet,
      // select All Sculptures.
      if (!activeCategory) {
        setActiveCategory("All Sculptures");
      }
    } catch (error) {
      console.error(
        "GALLERY CATEGORY ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    fetchCategories();
  }, []);

  // =====================================================
  // CATEGORY NAMES
  // =====================================================

  const categoryNames = categories.map(
    (category) => category.name
  );

  // =====================================================
  // ALL CATEGORY + DATABASE CATEGORIES
  // =====================================================

  const displayCategories = [
    "All Sculptures",
    ...categoryNames,
  ];

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="
        py-24
        md:py-5
        bg-[#F8F5EF]
        overflow-hidden
      ">

        <div className="
          max-w-[1450px]
          mx-auto
          px-6
          sm:px-8
          lg:px-10
          text-center
        ">

          <p className="
            font-['Outfit']
            uppercase
            tracking-[4px]
            text-[#B58A4A]
            text-sm
          ">
            Loading Collections...
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
      md:py-5
      bg-[#F8F5EF]
      overflow-hidden
    ">

      <div className="
        max-w-[1450px]
        mx-auto
        px-6
        sm:px-8
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-center
            max-w-4xl
            mx-auto
          "
        >

          {/* Small Heading */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
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
            }}
            className="
              font-['Outfit']
              uppercase
              tracking-[4px]
              md:tracking-[5px]
              text-[#B58A4A]
              text-sm
              md:text-base
              mb-5
            "
          >
            Explore By Category
          </motion.p>

          {/* Main Heading */}

          <motion.h2
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
            transition={{
              delay: 0.15,
              duration: 0.8,
            }}
            className="
              font-['Cormorant_Garamond']
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-semibold
              leading-tight
              text-[#3E3428]
            "
          >
            Discover Our

            <span className="text-[#B58A4A]">
              {" "}Collections
            </span>
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="
              mt-7
              font-['Cormorant_Garamond']
              italic
              text-xl
              sm:text-2xl
              md:text-3xl
              leading-9
              md:leading-10
              text-gray-600
            "
          >
            Explore handcrafted divine sculptures and
            timeless stone masterpieces created by
            skilled artisans using generations of
            traditional craftsmanship.
          </motion.p>

        </motion.div>

        {/* =================================================
            CATEGORY BUTTONS
        ================================================= */}

        {error ? (
          <div className="
            mt-12
            text-center
          ">

            <p className="
              text-red-500
              text-sm
            ">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchCategories}
              className="
                mt-4
                px-5
                py-2
                bg-[#B58A4A]
                text-white
                text-sm
              "
            >
              Try Again
            </button>

          </div>
        ) : (

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="
              mt-14
              flex
              flex-wrap
              justify-center
              gap-3
              md:gap-4
            "
          >

            {displayCategories.map(
              (category) => {

                const active =
                  activeCategory === category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      relative
                      px-5
                      sm:px-6
                      md:px-7
                      py-3
                      sm:py-3.5
                      border
                      rounded-sm
                      font-['Outfit']
                      uppercase
                      tracking-[1.5px]
                      sm:tracking-[2px]
                      text-xs
                      sm:text-sm
                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                            bg-[#B58A4A]
                            border-[#B58A4A]
                            text-white
                            shadow-lg
                          `
                          : `
                            bg-transparent
                            border-[#D9CCB5]
                            text-[#3E3428]
                            hover:border-[#B58A4A]
                            hover:text-[#B58A4A]
                          `
                      }
                    `}
                  >

                    {category}

                    {/* Active Indicator */}

                    {active && (
                      <motion.span
                        layoutId="galleryCategoryLine"
                        className="
                          absolute
                          left-1/2
                          -translate-x-1/2
                          -bottom-[7px]
                          w-8
                          h-[2px]
                          bg-[#B58A4A]
                        "
                      />
                    )}

                  </motion.button>
                );
              }
            )}

          </motion.div>

        )}

        {/* =================================================
            SELECTED CATEGORY
        ================================================= */}

        <motion.div
          key={activeCategory}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            text-center
            mt-12
          "
        >

          <p className="
            font-['Outfit']
            text-xs
            sm:text-sm
            tracking-[2px]
            uppercase
            text-gray-500
          ">
            Showing Collection
          </p>

          <h3 className="
            mt-2
            font-['Cormorant_Garamond']
            text-3xl
            md:text-4xl
            font-semibold
            text-[#B58A4A]
          ">
            {activeCategory ||
              "All Sculptures"}
          </h3>

        </motion.div>

      </div>

    </section>
  );
}