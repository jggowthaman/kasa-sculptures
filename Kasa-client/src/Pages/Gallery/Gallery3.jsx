import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/sculptures`;

export default function Gallery3({ activeCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(6);

  // =====================================================
  // FETCH SCULPTURES FROM DATABASE
  // =====================================================

  const fetchSculptures = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      console.log("GALLERY SCULPTURES:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load sculptures."
        );
      }

      const sculptures = Array.isArray(data.sculptures)
        ? data.sculptures
        : [];

      setProducts(sculptures);
    } catch (error) {
      console.error(
        "GALLERY SCULPTURES ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to load sculptures."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD SCULPTURES
  // =====================================================

  useEffect(() => {
    fetchSculptures();
  }, []);

  // =====================================================
  // FILTER BY STATUS
  // =====================================================

  const activeProducts = products.filter(
    (product) =>
      product.status === "Active" ||
      product.status === undefined
  );

  // =====================================================
  // FILTER BY CATEGORY
  // =====================================================

  const filteredProducts =
    !activeCategory ||
    activeCategory === "All Sculptures"
      ? activeProducts
      : activeProducts.filter(
          (product) =>
            String(product.category_name)
              .trim()
              .toLowerCase() ===
            String(activeCategory)
              .trim()
              .toLowerCase()
        );

  // =====================================================
  // RESET WHEN CATEGORY CHANGES
  // =====================================================

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  // =====================================================
  // VISIBLE PRODUCTS
  // =====================================================

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  // =====================================================
  // MORE PRODUCTS
  // =====================================================

  const hasMoreProducts =
    visibleCount < filteredProducts.length;

  // =====================================================
  // VIEW MORE
  // =====================================================

  const handleViewMore = () => {
    setVisibleCount(filteredProducts.length);
  };

  // =====================================================
  // SHOW LESS
  // =====================================================

  const handleShowLess = () => {
    setVisibleCount(6);

    setTimeout(() => {
      document
        .getElementById("gallery-products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    // Already a complete URL
    if (image.startsWith("http://")) {
      return image;
    }

    if (image.startsWith("https://")) {
      return image;
    }

    // Remove starting slash if present
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
      <section
        id="gallery-products"
        className="
          py-24
          md:py-5
          bg-[#F8F5EF]
          overflow-hidden
        "
      >
        <div
          className="
            max-w-[1450px]
            mx-auto
            px-6
            sm:px-8
            lg:px-10
            text-center
          "
        >
          <p
            className="
              font-['Outfit']
              uppercase
              tracking-[4px]
              text-[#B58A4A]
              text-sm
            "
          >
            Loading Sculptures...
          </p>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section
        id="gallery-products"
        className="
          py-24
          md:py-5
          bg-[#F8F5EF]
        "
      >
        <div className="text-center px-6">

          <h3
            className="
              font-['Cormorant_Garamond']
              text-4xl
              font-semibold
              text-[#3E3428]
            "
          >
            Unable to Load Sculptures
          </h3>

          <p className="mt-4 text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchSculptures}
            className="
              mt-6
              bg-[#B58A4A]
              text-white
              px-7
              py-3
              rounded-sm
              font-['Outfit']
              uppercase
              tracking-[2px]
            "
          >
            Try Again
          </button>

        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section
      id="gallery-products"
      className="
        py-24
        md:py-5
        bg-[#F8F5EF]
        overflow-hidden
      "
    >
      <div
        className="
          max-w-[1450px]
          mx-auto
          px-6
          sm:px-8
          lg:px-10
        "
      >

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
            mb-16
          "
        >
          <p
            className="
              font-['Outfit']
              uppercase
              tracking-[5px]
              text-[#B58A4A]
              text-sm
              md:text-base
              mb-5
            "
          >
            {activeCategory === "All Sculptures"
              ? "Our Masterpieces"
              : activeCategory}
          </p>

          <h2
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
            {activeCategory === "All Sculptures"
              ? "Explore Our"
              : "Explore"}

            <span className="text-[#B58A4A]">
              {activeCategory === "All Sculptures"
                ? " Stone Sculptures"
                : ` ${activeCategory} Sculptures`}
            </span>
          </h2>

          <p
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
            Discover handcrafted sculptures created
            with premium natural stone and generations
            of traditional South Indian craftsmanship.
          </p>
        </motion.div>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <AnimatePresence mode="wait">

          {filteredProducts.length > 0 ? (

            <motion.div
              key={activeCategory}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-8
                lg:gap-10
              "
            >

              {visibleProducts.map(
                (product, index) => {

                  return (
                    <motion.article
                      key={product.id}
                      initial={{
                        opacity: 0,
                        y: 50,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -10,
                      }}
                      className="
                        group
                        bg-white
                        rounded-xl
                        overflow-hidden
                        shadow-lg
                        hover:shadow-2xl
                        transition-shadow
                        duration-500
                      "
                    >

                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <Link
                        to={`/gallery/${product.id}`}
                        className="block"
                      >
                        <div
                          className="
                            relative
                            overflow-hidden
                          "
                        >

                          <motion.img
                            src={getImageUrl(
                              product.image
                            )}
                            alt={product.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.jpg";
                            }}
                            whileHover={{
                              scale: 1.08,
                            }}
                            transition={{
                              duration: 0.7,
                              ease: "easeOut",
                            }}
                            className="
                              w-full
                              h-[340px]
                              sm:h-[380px]
                              lg:h-[420px]
                              object-cover
                              cursor-pointer
                            "
                          />

                          {/* Status */}

                          <div
                            className="
                              absolute
                              top-5
                              left-5
                              bg-white/95
                              backdrop-blur-sm
                              px-4
                              py-2
                              rounded-sm
                              shadow-md
                            "
                          >
                            <span
                              className="
                                font-['Outfit']
                                text-xs
                                uppercase
                                tracking-[1.5px]
                                text-[#B58A4A]
                              "
                            >
                              {product.status ||
                                "Available"}
                            </span>
                          </div>

                          {/* Hover Overlay */}

                          <motion.div
                            initial={{
                              opacity: 0,
                            }}
                            whileHover={{
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                            className="
                              absolute
                              inset-0
                              bg-black/35
                              flex
                              items-center
                              justify-center
                              pointer-events-none
                            "
                          >
                            <span
                              className="
                                border
                                border-white
                                text-white
                                px-6
                                py-3
                                font-['Outfit']
                                uppercase
                                tracking-[2px]
                                text-sm
                                bg-black/20
                                backdrop-blur-sm
                              "
                            >
                              View Sculpture
                            </span>
                          </motion.div>

                        </div>
                      </Link>

                      {/* =================================================
                          PRODUCT CONTENT
                      ================================================= */}

                      <div className="p-7 sm:p-8">

                        {/* Category */}

                        <p
                          className="
                            font-['Outfit']
                            uppercase
                            tracking-[3px]
                            text-[#B58A4A]
                            text-xs
                            sm:text-sm
                          "
                        >
                          {product.category_name ||
                            "Sculpture"}
                        </p>

                        {/* Title */}

                        <h3
                          className="
                            mt-3
                            font-['Cormorant_Garamond']
                            text-3xl
                            sm:text-4xl
                            font-semibold
                            text-[#3E3428]
                            group-hover:text-[#B58A4A]
                            transition-colors
                            duration-300
                          "
                        >
                          {product.name}
                        </h3>

                        {/* Material */}

                        {product.material && (
                          <p
                            className="
                              mt-3
                              font-['Outfit']
                              text-base
                              sm:text-lg
                              text-gray-600
                            "
                          >
                            {product.material}
                          </p>
                        )}

                        {/* Bottom Section */}

                        <div
                          className="
                            mt-7
                            pt-5
                            border-t
                            border-[#E8E0D4]
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >

                          {/* Price */}

                          <div>

                            <p
                              className="
                                font-['Outfit']
                                text-xs
                                uppercase
                                tracking-[1.5px]
                                text-gray-400
                                mb-1
                              "
                            >
                              Pricing
                            </p>

                            <p
                              className="
                                font-['Cormorant_Garamond']
                                text-2xl
                                sm:text-3xl
                                font-semibold
                                text-[#B58A4A]
                              "
                            >
                              {product.price !==
                                null &&
                              product.price !==
                                undefined
                                ? `₹${Number(
                                    product.price
                                  ).toLocaleString(
                                    "en-IN"
                                  )}`
                                : "Enquire"}
                            </p>

                          </div>

                          {/* View Details */}

                          <Link
                            to={`/gallery/${product.id}`}
                            className="
                              inline-flex
                              items-center
                              justify-center
                              border
                              border-[#B58A4A]
                              px-2
                              py-3
                              font-['Outfit']
                              uppercase
                              tracking-[1.5px]
                              text-xs
                              sm:text-sm
                              text-[#B58A4A]
                              hover:bg-[#B58A4A]
                              hover:text-white
                              transition-all
                              duration-300
                              rounded-sm
                              whitespace-nowrap
                            "
                          >
                            View Details
                          </Link>

                        </div>

                      </div>

                    </motion.article>
                  );
                }
              )}

            </motion.div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                min-h-[300px]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <h3
                className="
                  font-['Cormorant_Garamond']
                  text-4xl
                  md:text-5xl
                  font-semibold
                  text-[#3E3428]
                "
              >
                No Sculptures Found
              </h3>

              <p
                className="
                  mt-4
                  font-['Outfit']
                  text-gray-600
                  text-lg
                "
              >
                There are currently no sculptures
                in the{" "}
                {activeCategory || "selected"}{" "}
                collection.
              </p>

              <Link
                to="/contact"
                className="
                  mt-7
                  inline-flex
                  items-center
                  justify-center
                  bg-[#B58A4A]
                  hover:bg-[#98723A]
                  text-white
                  px-7
                  py-3
                  rounded-sm
                  font-['Outfit']
                  uppercase
                  tracking-[2px]
                  text-sm
                  transition-all
                  duration-300
                "
              >
                Enquire With Us
              </Link>

            </motion.div>
          )}

        </AnimatePresence>

        {/* =================================================
            VIEW MORE / SHOW LESS
        ================================================= */}

        {filteredProducts.length > 6 && (
          <motion.div
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
              duration: 0.7,
            }}
            className="
              flex
              justify-center
              mt-14
            "
          >

            {hasMoreProducts ? (

              <motion.button
                type="button"
                onClick={handleViewMore}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                  px-9
                  sm:px-11
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
                View More Items

                <span className="text-lg">
                  ↓
                </span>
              </motion.button>

            ) : (

              <motion.button
                type="button"
                onClick={handleShowLess}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                  px-9
                  sm:px-11
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
                Show Less

                <span className="text-lg">
                  ↑
                </span>
              </motion.button>
            )}

          </motion.div>
        )}

        {/* =================================================
            BOTTOM NOTE
        ================================================= */}

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
            duration: 0.8,
          }}
          className="
            text-center
            mt-16
          "
        >

          <p
            className="
              font-['Cormorant_Garamond']
              italic
              text-xl
              md:text-2xl
              text-gray-600
            "
          >
            Custom sizes and designs are available
            on request.
          </p>

          <Link
            to="/contact"
            className="
              inline-flex
              mt-5
              font-['Outfit']
              uppercase
              tracking-[2px]
              text-sm
              text-[#B58A4A]
              hover:text-[#8F682F]
              transition
            "
          >
            Request a Custom Sculpture →
          </Link>

        </motion.div>

      </div>
    </section>
  );
}