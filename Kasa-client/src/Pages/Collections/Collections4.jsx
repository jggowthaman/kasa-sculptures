import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

export default function Collections4() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH CATEGORIES FROM DATABASE
  // =====================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      console.log("COLLECTIONS CATEGORIES:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load categories."
        );
      }

      const fetchedCategories = Array.isArray(data.categories)
        ? data.categories
        : [];

      // Show only 6 categories
      setCategories(fetchedCategories.slice(0, 6));
    } catch (error) {
      console.error(
        "COLLECTIONS CATEGORY ERROR:",
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
  // IMAGE URL
  // =====================================================

  const getImageUrl = (category) => {
    // Support possible backend image fields
    const image =
      category.image ||
      category.image_url ||
      category.category_image ||
      category.thumbnail ||
      "";

    if (!image) {
      return "/placeholder.jpg";
    }

    // Already complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Remove starting slash
    const cleanImage = image.startsWith("/")
      ? image.substring(1)
      : image;

    return `${import.meta.env.VITE_API_URL}/${cleanImage}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="py-24 bg-[#F8F5EF] overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

          <div className="text-center">
            <p
              className="
                font-['Outfit']
                uppercase
                tracking-[4px]
                text-[#B58A4A]
                text-sm
              "
            >
              Loading Categories...
            </p>
          </div>

        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section
      id="collections"
      className="py-24 bg-[#F8F5EF] overflow-hidden"
    >
      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        {/* =================================================
            HEADING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
          className="text-center mb-16"
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
              tracking-[5px]
              text-[#B58A4A]
              mb-4
            "
          >
            Luxury Categories
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
              md:text-6xl
              lg:text-7xl
              font-semibold
              text-[#3E3428]
            "
          >
            Discover Our{" "}
            <span className="text-[#B58A4A]">
              Categories
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
              mt-6
              font-['Cormorant_Garamond']
              italic
              text-xl
              md:text-2xl
              text-gray-600
              leading-10
              max-w-4xl
              mx-auto
            "
          >
            Explore our divine stone sculpture collections,
            handcrafted with traditional artistry and
            generations of South Indian craftsmanship.
          </motion.p>
        </motion.div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="text-center py-10">

            <h3
              className="
                font-['Cormorant_Garamond']
                text-4xl
                font-semibold
                text-[#3E3428]
              "
            >
              Unable to Load Categories
            </h3>

            <p className="mt-4 text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchCategories}
              className="
                mt-6
                px-7
                py-3
                bg-[#B58A4A]
                text-white
                rounded-sm
                font-['Outfit']
                uppercase
                tracking-[2px]
              "
            >
              Try Again
            </button>

          </div>
        )}

        {/* =================================================
            CATEGORY GRID
        ================================================= */}

        {!error && categories.length > 0 && (
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
              lg:gap-10
            "
          >

            {categories.map((category, index) => (

              <motion.article
                key={category.id || category.name || index}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                }}
                className="
                  group
                  bg-white
                  rounded-lg
                  overflow-hidden
                  shadow-xl
                  hover:shadow-2xl
                  transition-all
                  duration-500
                "
              >

                {/* =================================================
                    CATEGORY IMAGE
                ================================================= */}

                <Link
                  to="/gallery"
                  className="block"
                >
                  <div className="overflow-hidden">

                    <motion.img
                      src={getImageUrl(category)}
                      alt={`${category.name} stone sculpture category by KASA LUXE`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.jpg";
                      }}
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="
                        w-full
                        h-[360px]
                        sm:h-[380px]
                        lg:h-[420px]
                        object-cover
                        cursor-pointer
                      "
                    />

                  </div>
                </Link>

                {/* =================================================
                    CATEGORY CONTENT
                ================================================= */}

                <div className="p-8 text-center">

                  {/* Category Name */}

                  <h3
                    className="
                      font-['Cormorant_Garamond']
                      text-4xl
                      font-semibold
                      text-[#3E3428]
                      mb-4
                      group-hover:text-[#B58A4A]
                      transition-colors
                      duration-300
                    "
                  >
                    {category.name}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      font-['Outfit']
                      text-base
                      sm:text-lg
                      text-gray-600
                      leading-8
                      mb-7
                    "
                  >
                    Explore our handcrafted{" "}
                    {category.name} sculptures,
                    created with traditional
                    stone carving techniques.
                  </p>

                  {/* View Category */}

                  <Link
                    to="/gallery"
                    className="
                      inline-flex
                      items-center
                      font-['Outfit']
                      uppercase
                      tracking-[3px]
                      text-[#B58A4A]
                      hover:tracking-[5px]
                      transition-all
                      duration-300
                    "
                  >
                    View Category →
                  </Link>

                </div>

              </motion.article>

            ))}

          </div>
        )}

        {/* =================================================
            NO CATEGORIES
        ================================================= */}

        {!error && categories.length === 0 && (
          <div className="text-center py-16">

            <h3
              className="
                font-['Cormorant_Garamond']
                text-4xl
                font-semibold
                text-[#3E3428]
              "
            >
              No Categories Available
            </h3>

            <p
              className="
                mt-4
                font-['Outfit']
                text-gray-600
                text-lg
              "
            >
              Categories added by the admin will
              appear here.
            </p>

          </div>
        )}

        {/* =================================================
            EXPLORE FULL CATEGORY
        ================================================= */}

        {!error && categories.length > 0 && (
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
            transition={{
              duration: 0.7,
            }}
            className="flex justify-center mt-14"
          >
            <Link
              to="/gallery"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                border
                border-[#B58A4A]
                text-[#B58A4A]
                hover:bg-[#B58A4A]
                hover:text-white
                px-10
                sm:px-12
                py-4
                rounded-sm
                font-['Outfit']
                uppercase
                tracking-[2px]
                text-sm
                sm:text-base
                transition-all
                duration-300
              "
            >
              Explore Full Categories

              <span className="text-lg">
                →
              </span>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}