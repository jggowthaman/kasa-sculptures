import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/sculptures`;

export default function Collections2() {
  const [sculptures, setSculptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH SCULPTURES
  // =====================================================

  const fetchSculptures = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      console.log("COLLECTIONS SCULPTURES:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load sculptures."
        );
      }

      // Same response structure as Gallery
      const fetchedSculptures = Array.isArray(data.sculptures)
        ? data.sculptures
        : [];

      // Only show 6 sculptures
      setSculptures(fetchedSculptures.slice(0, 6));
    } catch (error) {
      console.error(
        "COLLECTIONS SCULPTURES ERROR:",
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
  // FILTER ACTIVE SCULPTURES
  // =====================================================

  const activeSculptures = sculptures.filter(
    (sculpture) =>
      sculpture.status === "Active" ||
      sculpture.status === undefined
  );

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    // Already complete URL
    if (image.startsWith("http://")) {
      return image;
    }

    if (image.startsWith("https://")) {
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
            <p className="font-['Outfit'] uppercase tracking-[4px] text-[#B58A4A] text-sm">
              Loading Collections...
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
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

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
          className="text-center max-w-4xl mx-auto mb-16"
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
            Our Masterpieces
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
            Explore Our{" "}
            <span className="text-[#B58A4A]">
              Collections
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
            Discover handcrafted divine sculptures and
            timeless stone masterpieces created by
            skilled artisans using generations of
            traditional craftsmanship.
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
                text-3xl
                font-semibold
                text-[#3E3428]
              "
            >
              Unable to Load Sculptures
            </h3>

            <p className="mt-3 text-red-500">
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
        )}

        {/* =================================================
            SCULPTURE GRID
        ================================================= */}

        {!error && activeSculptures.length > 0 && (
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
              lg:gap-10
            "
          >

            {activeSculptures.map((product, index) => (

              <motion.article
                key={product.id}
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
                  amount: 0.15,
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

                  <div className="relative overflow-hidden">

                    <motion.img
                      src={getImageUrl(product.image)}
                      alt={
                        product.name
                          ? `${product.name} stone sculpture by KASA LUXE`
                          : "KASA LUXE stone sculpture"
                      }
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
                        h-[320px]
                        sm:h-[360px]
                        lg:h-[380px]
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
                        {product.status || "Available"}
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
                    CONTENT
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
                    {product.category_name || "Sculpture"}
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

                  {/* Description */}

                  {product.description && (
                    <p
                      className="
                        mt-3
                        font-['Outfit']
                        text-base
                        leading-7
                        text-gray-600
                        line-clamp-2
                      "
                    >
                      {product.description}
                    </p>
                  )}

                  {/* Material */}

                  {product.material && (
                    <p
                      className="
                        mt-3
                        font-['Outfit']
                        text-base
                        text-gray-500
                      "
                    >
                      {product.material}
                    </p>
                  )}

                  {/* =================================================
                      BOTTOM
                  ================================================= */}

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
                        {product.price !== null &&
                        product.price !== undefined &&
                        product.price !== ""
                          ? `₹${Number(
                              product.price
                            ).toLocaleString("en-IN")}`
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
                        px-3
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

            ))}

          </div>
        )}

        {/* =================================================
            NO SCULPTURES
        ================================================= */}

        {!error && activeSculptures.length === 0 && (
          <div className="text-center py-16">

            <h3
              className="
                font-['Cormorant_Garamond']
                text-4xl
                font-semibold
                text-[#3E3428]
              "
            >
              No Sculptures Available
            </h3>

            <p
              className="
                mt-4
                font-['Outfit']
                text-gray-600
              "
            >
              New sculptures will appear here once
              they are added by the admin.
            </p>

          </div>
        )}

        {/* =================================================
            VIEW ALL GALLERY
        ================================================= */}

        {!error && activeSculptures.length > 0 && (
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
              Explore Full Gallery
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