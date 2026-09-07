import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlineArrowLeft,
  HiOutlinePhotograph,
  HiOutlineX,
} from "react-icons/hi";

import { FaWhatsapp } from "react-icons/fa";

// =====================================================
// API
// =====================================================

const API_URL = `${import.meta.env.VITE_API_URL}/api/sculptures`;
const ENQUIRY_API = `${import.meta.env.VITE_API_URL}/api/enquiries`;
const SERVER_URL = import.meta.env.VITE_API_URL;

// IMPORTANT:
// Replace this with the client's actual WhatsApp number.
// Country code required. Do not use + or spaces.
const WHATSAPP_NUMBER = "919940676481";

// =====================================================
// COMPONENT
// =====================================================

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // ===================================================
  // SCULPTURE
  // ===================================================

  const [sculpture, setSculpture] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // ENQUIRY
  // ===================================================

  const [showEnquiry, setShowEnquiry] = useState(false);

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // FETCH SCULPTURE
  // =====================================================

  useEffect(() => {
    const fetchSculpture = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${productId}`);

        const data = await response.json();

        console.log("PRODUCT DETAILS RESPONSE:", data);

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Sculpture not found."
          );
        }

        setSculpture(data.sculpture);

        setGalleryImages(
          Array.isArray(data.galleryImages)
            ? data.galleryImages
            : []
        );

        if (data.sculpture?.image) {
          setSelectedImage(data.sculpture.image);
        }
      } catch (err) {
        console.error("PRODUCT DETAILS ERROR:", err);

        setError(
          err.message || "Unable to load sculpture."
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchSculpture();
    }
  }, [productId]);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${SERVER_URL}${
      image.startsWith("/") ? "" : "/"
    }${image}`;
  };

  // =====================================================
  // PRICE
  // =====================================================

  const getFormattedPrice = () => {
    if (
      sculpture?.price === null ||
      sculpture?.price === undefined ||
      sculpture?.price === ""
    ) {
      return "Price on Request";
    }

    const numericPrice = Number(sculpture.price);

    if (Number.isNaN(numericPrice)) {
      return "Price on Request";
    }

    return `₹${numericPrice.toLocaleString("en-IN")}`;
  };

  // =====================================================
  // OPEN ENQUIRY
  // =====================================================

  const handleWhatsAppOrder = () => {
    if (!sculpture) {
      return;
    }

    setCustomerData({
      name: "",
      phone: "",
      email: "",
      message: `I am interested in ordering the ${sculpture.name} sculpture.`,
    });

    setFormErrors({});
    setShowEnquiry(true);
  };

  // =====================================================
  // CLOSE ENQUIRY
  // =====================================================

  const closeEnquiry = () => {
    if (submitting) {
      return;
    }

    setShowEnquiry(false);
    setFormErrors({});
  };

  // =====================================================
  // CUSTOMER FORM CHANGE
  // =====================================================

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomerData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateCustomerForm = () => {
    const errors = {};

    // NAME
    if (!customerData.name.trim()) {
      errors.name = "Name is required.";
    } else if (customerData.name.trim().length < 3) {
      errors.name =
        "Name must contain at least 3 characters.";
    }

    // PHONE
    if (!customerData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        customerData.phone.trim()
      )
    ) {
      errors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // EMAIL
    if (customerData.email.trim()) {
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          customerData.email.trim()
        )
      ) {
        errors.email =
          "Enter a valid email address.";
      }
    }

    // MESSAGE
    if (!customerData.message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // =====================================================
  // SAVE ENQUIRY + WHATSAPP
  // =====================================================

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();

    if (!sculpture) {
      return;
    }

    if (!validateCustomerForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const price = getFormattedPrice();

      // =================================================
      // DATABASE MESSAGE
      // =================================================

      const enquiryMessage = `
Customer is interested in ordering this sculpture.

Sculpture: ${sculpture.name}

Category: ${
        sculpture.category_name || "Sculpture"
      }

Price: ${price}

Material: ${
        sculpture.material || "Not specified"
      }

Height: ${
        sculpture.height || "Not specified"
      }

Customer Message:
${customerData.message.trim()}
      `.trim();

      // =================================================
      // SAVE TO DATABASE
      // =================================================

      const response = await fetch(
        ENQUIRY_API,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: customerData.name.trim(),

            phone: customerData.phone.trim(),

            email:
              customerData.email.trim() || null,

            subject: `Sculpture Order - ${sculpture.name}`,

            message: enquiryMessage,

            sculpture_id: sculpture.id,
          }),
        }
      );

      const data = await response.json();

      console.log("ENQUIRY RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save enquiry."
        );
      }

      // =================================================
      // WHATSAPP MESSAGE
      // =================================================

      const whatsappMessage = `
Hello KASA LUXE,

I am interested in ordering this sculpture.

Sculpture: ${sculpture.name}

Category: ${
        sculpture.category_name || "Sculpture"
      }

Material: ${
        sculpture.material || "Not specified"
      }

Height: ${
        sculpture.height || "Not specified"
      }

Price: ${price}

Customer Name: ${customerData.name.trim()}

Phone: ${customerData.phone.trim()}

Email: ${
        customerData.email.trim() ||
        "Not provided"
      }

Message:
${customerData.message.trim()}

Thank you.
      `.trim();

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      // =================================================
      // CLOSE MODAL
      // =================================================

      setShowEnquiry(false);

      // =================================================
      // CLEAR FORM
      // =================================================

      setCustomerData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      // =================================================
      // OPEN WHATSAPP
      // =================================================

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error(
        "ENQUIRY SUBMIT ERROR:",
        err
      );

      alert(
        err.message ||
          "Unable to submit enquiry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F5F1E8]
          flex
          items-center
          justify-center
          px-5
        "
      >
        <div className="text-center">
          <div
            className="
              w-12
              h-12
              mx-auto
              border-4
              border-[#D9CCB5]
              border-t-[#B58A4A]
              rounded-full
              animate-spin
            "
          />

          <p
            className="
              mt-5
              text-gray-500
              font-['Outfit']
            "
          >
            Loading sculpture...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !sculpture) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F5F1E8]
          flex
          items-center
          justify-center
          px-5
          pt-24
        "
      >
        <div
          className="
            text-center
            max-w-md
          "
        >
          <h1
            className="
              font-['Cormorant_Garamond']
              text-4xl
              md:text-5xl
              font-semibold
              text-[#2F2923]
            "
          >
            Sculpture Not Found
          </h1>

          <p
            className="
              mt-3
              text-gray-500
              text-sm
              sm:text-base
            "
          >
            {error ||
              "The sculpture you are looking for does not exist."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="
              mt-7
              px-6
              py-5
              bg-[#B58A4A]
              text-white
              uppercase
              tracking-[1.5px]
              text-sm
              hover:bg-[#967039]
              transition
            "
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const imageUrl = getImageUrl(
    selectedImage || sculpture.image
  );

  const formattedPrice = getFormattedPrice();

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      {/* =================================================
          MAIN PAGE
      ================================================= */}

      <div
        className="
          min-h-screen
          bg-[#F5F1E8]
          font-['Outfit']
          overflow-x-hidden
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-10

            pt-24
            pb-10

            sm:pt-28
            sm:pb-12

            lg:pt-32
            lg:pb-16
          "
        >
          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <motion.button
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            type="button"
            onClick={() => navigate("/gallery")}
            className="
              flex
              items-center
              gap-2

              text-sm
              sm:text-base

              text-gray-500
              hover:text-[#B58A4A]

              transition

              mb-8
              mt-5
              sm:mb-10
              lg:mb-12
            "
          >
            <HiOutlineArrowLeft />
            Back to Gallery
          </motion.button>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              grid
              lg:grid-cols-2

              gap-10
              sm:gap-12
              lg:gap-16

              items-start
            "
          >
            {/* =================================================
                IMAGE SECTION
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                w-full
                min-w-0
              "
            >
              {/* MAIN IMAGE */}

              <div
                className="
                  bg-white
                  border
                  border-[#E1D7C7]

                  p-2
                  sm:p-3

                  shadow-sm
                "
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={sculpture.name}
                    className="
                      w-full

                      aspect-square
                      sm:aspect-[4/3]
                      lg:aspect-square

                      object-cover
                      block
                    "
                  />
                ) : (
                  <div
                    className="
                      aspect-square
                      flex
                      flex-col
                      items-center
                      justify-center
                      bg-[#F5F1E8]
                      text-gray-400
                    "
                  >
                    <HiOutlinePhotograph
                      className="
                        text-5xl
                        text-[#B58A4A]
                      "
                    />

                    <p className="mt-3">
                      No image available
                    </p>
                  </div>
                )}
              </div>

              {/* =================================================
                  THUMBNAILS
              ================================================= */}

              {(sculpture.image ||
                galleryImages.length > 0) && (
                <div
                  className="
                    mt-4
                    sm:mt-5

                    flex
                    gap-2
                    sm:gap-3

                    overflow-x-auto

                    pb-2

                    scrollbar-thin
                  "
                >
                  {/* MAIN IMAGE */}

                  {sculpture.image && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          sculpture.image
                        )
                      }
                      className={`
                        flex-shrink-0

                        w-16
                        h-16

                        sm:w-20
                        sm:h-20

                        border
                        p-1
                        bg-white
                        transition

                        ${
                          selectedImage ===
                          sculpture.image
                            ? "border-[#B58A4A]"
                            : "border-[#E1D7C7]"
                        }
                      `}
                    >
                      <img
                        src={getImageUrl(
                          sculpture.image
                        )}
                        alt={sculpture.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </button>
                  )}

                  {/* EXTRA IMAGES */}

                  {galleryImages.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          item.image
                        )
                      }
                      className={`
                        flex-shrink-0

                        w-16
                        h-16

                        sm:w-20
                        sm:h-20

                        border
                        p-1
                        bg-white
                        transition

                        ${
                          selectedImage ===
                          item.image
                            ? "border-[#B58A4A]"
                            : "border-[#E1D7C7]"
                        }
                      `}
                    >
                      <img
                        src={getImageUrl(
                          item.image
                        )}
                        alt={sculpture.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* =================================================
                INFORMATION SECTION
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                w-full
                min-w-0

                lg:pt-2
              "
            >
              {/* CATEGORY */}

              <p
                className="
                  text-[#B58A4A]

                  uppercase
                  tracking-[3px]
                  sm:tracking-[4px]

                  text-[10px]
                  sm:text-xs

                  mb-3
                "
              >
                {sculpture.category_name ||
                  "Sculpture"}
              </p>

              {/* NAME */}

              <h1
                className="
                  font-['Cormorant_Garamond']

                  text-4xl
                  sm:text-5xl
                  md:text-6xl

                  font-semibold

                  text-[#2F2923]

                  leading-[1.05]

                  break-words
                "
              >
                {sculpture.name}
              </h1>

              {/* PRICE */}

              <div
                className="
                  mt-6
                  sm:mt-7

                  flex
                  flex-col
                  sm:flex-row

                  sm:items-center

                  gap-1
                  sm:gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    sm:text-xs

                    uppercase
                    tracking-[2px]
                    sm:tracking-[3px]

                    text-gray-400
                  "
                >
                  Price
                </span>

                <span
                  className="
                    text-2xl
                    sm:text-3xl

                    font-semibold

                    text-[#B58A4A]

                    font-['Cormorant_Garamond']

                    break-words
                  "
                >
                  {formattedPrice}
                </span>
              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  sm:mt-7

                  text-gray-600

                  leading-7
                  sm:leading-8

                  text-sm
                  sm:text-base
                "
              >
                {sculpture.description ||
                  "A handcrafted sculpture from KASA LUXE."}
              </p>

              {/* =================================================
                  DETAILS
              ================================================= */}

              <div
                className="
                  mt-7
                  sm:mt-9

                  border-y
                  border-[#D9CCB5]

                  divide-y
                  divide-[#E8DFD1]
                "
              >
                {/* CATEGORY */}

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-5

                    py-4
                    sm:py-5
                  "
                >
                  <span
                    className="
                      text-xs
                      sm:text-sm

                      text-gray-400

                      flex-shrink-0
                    "
                  >
                    Category
                  </span>

                  <span
                    className="
                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]

                      text-right

                      break-words

                      max-w-[60%]
                    "
                  >
                    {sculpture.category_name ||
                      "Not specified"}
                  </span>
                </div>

                {/* MATERIAL */}

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-5

                    py-4
                    sm:py-5
                  "
                >
                  <span
                    className="
                      text-xs
                      sm:text-sm

                      text-gray-400

                      flex-shrink-0
                    "
                  >
                    Material
                  </span>

                  <span
                    className="
                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]

                      text-right

                      break-words

                      max-w-[60%]
                    "
                  >
                    {sculpture.material ||
                      "Not specified"}
                  </span>
                </div>

                {/* HEIGHT */}

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-5

                    py-4
                    sm:py-5
                  "
                >
                  <span
                    className="
                      text-xs
                      sm:text-sm

                      text-gray-400

                      flex-shrink-0
                    "
                  >
                    Height
                  </span>

                  <span
                    className="
                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]

                      text-right

                      break-words

                      max-w-[60%]
                    "
                  >
                    {sculpture.height ||
                      "Not specified"}
                  </span>
                </div>
              </div>

              {/* =================================================
                  WHATSAPP ORDER
              ================================================= */}

              <div
                className="
                  mt-7
                  sm:mt-9

                  bg-[#111111]

                  p-5
                  sm:p-7

                  rounded-sm
                "
              >
                <p
                  className="
                    text-[#B58A4A]

                    uppercase

                    tracking-[2px]
                    sm:tracking-[3px]

                    text-[10px]
                    sm:text-xs
                  "
                >
                  Interested in this sculpture?
                </p>

                <p
                  className="
                    mt-2

                    text-white

                    font-['Cormorant_Garamond']

                    text-xl
                    sm:text-2xl

                    leading-tight
                  "
                >
                  Order directly through WhatsApp
                </p>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="
                    mt-5

                    w-full

                    inline-flex
                    items-center
                    justify-center

                    gap-3

                    px-6
                    sm:px-7

                    py-3.5

                    bg-[#25D366]
                    hover:bg-[#1ebe5d]

                    text-white

                    uppercase

                    tracking-[1px]
                    sm:tracking-[1.5px]

                    text-xs
                    sm:text-sm

                    font-medium

                    transition
                    duration-300

                    rounded-sm
                  "
                >
                  <FaWhatsapp className="text-xl" />

                  Order on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CUSTOMER ENQUIRY MODAL
      ===================================================== */}

      <AnimatePresence>
        {showEnquiry && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0

              z-[999]

              bg-black/70
              backdrop-blur-sm

              flex
              items-start
              sm:items-center
              justify-center

              p-3
              sm:p-5

              overflow-y-auto
            "
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeEnquiry();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                w-full

                max-w-xl

                my-2
                sm:my-5

                max-h-[94vh]

                overflow-y-auto

                bg-[#F8F5EF]

                rounded-xl

                shadow-2xl
              "
            >
              {/* =================================================
                  MODAL HEADER
              ================================================= */}

              <div
                className="
                  sticky
                  top-0
                  z-10

                  flex
                  items-start
                  justify-between

                  gap-4

                  p-4
                  sm:p-6

                  bg-[#F8F5EF]

                  border-b
                  border-[#DED3C3]
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-[#B58A4A]

                      uppercase

                      tracking-[2px]
                      sm:tracking-[3px]

                      text-[10px]
                      sm:text-xs
                    "
                  >
                    Sculpture Enquiry
                  </p>

                  <h2
                    className="
                      mt-1

                      font-['Cormorant_Garamond']

                      text-2xl
                      sm:text-3xl

                      font-semibold

                      text-[#2F2923]

                      leading-tight

                      break-words
                    "
                  >
                    {sculpture.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeEnquiry}
                  disabled={submitting}
                  className="
                    flex-shrink-0

                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-full

                    text-xl
                    text-gray-500

                    hover:text-[#B58A4A]
                    hover:bg-white

                    transition

                    disabled:opacity-50
                  "
                >
                  <HiOutlineX />
                </button>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmitEnquiry}
                className="
                  p-4
                  sm:p-6

                  space-y-4
                  sm:space-y-5
                "
              >
                {/* NAME */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]
                    "
                  >
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="
                      w-full

                      border
                      border-[#D9CCB5]

                      bg-white

                      rounded-lg

                      px-4
                      py-3

                      text-sm
                      sm:text-base

                      outline-none

                      focus:border-[#B58A4A]

                      transition
                    "
                  />

                  {formErrors.name && (
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-red-500
                      "
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* PHONE */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]
                    "
                  >
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleCustomerChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    className="
                      w-full

                      border
                      border-[#D9CCB5]

                      bg-white

                      rounded-lg

                      px-4
                      py-3

                      text-sm
                      sm:text-base

                      outline-none

                      focus:border-[#B58A4A]

                      transition
                    "
                  />

                  {formErrors.phone && (
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-red-500
                      "
                    >
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]
                    "
                  >
                    Email Address

                    <span className="text-gray-400">
                      {" "}
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="
                      w-full

                      border
                      border-[#D9CCB5]

                      bg-white

                      rounded-lg

                      px-4
                      py-3

                      text-sm
                      sm:text-base

                      outline-none

                      focus:border-[#B58A4A]

                      transition
                    "
                  />

                  {formErrors.email && (
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-red-500
                      "
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      sm:text-sm

                      font-medium

                      text-[#3D352D]
                    "
                  >
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows={4}
                    value={customerData.message}
                    onChange={handleCustomerChange}
                    placeholder="Tell us about your requirement..."
                    className="
                      w-full

                      border
                      border-[#D9CCB5]

                      bg-white

                      rounded-lg

                      px-4
                      py-3

                      text-sm
                      sm:text-base

                      outline-none

                      resize-none

                      focus:border-[#B58A4A]

                      transition
                    "
                  />

                  {formErrors.message && (
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-red-500
                      "
                    >
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    SCULPTURE SUMMARY
                ================================================= */}

                <div
                  className="
                    bg-white

                    border
                    border-[#E2D8C9]

                    rounded-lg

                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-4
                    "
                  >
                    <span
                      className="
                        text-xs
                        sm:text-sm

                        text-gray-500

                        flex-shrink-0
                      "
                    >
                      Sculpture
                    </span>

                    <span
                      className="
                        font-medium

                        text-[#3D352D]

                        text-xs
                        sm:text-sm

                        text-right

                        break-words
                      "
                    >
                      {sculpture.name}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-4

                      mt-3
                    "
                  >
                    <span
                      className="
                        text-xs
                        sm:text-sm

                        text-gray-500
                      "
                    >
                      Category
                    </span>

                    <span
                      className="
                        text-xs
                        sm:text-sm

                        font-medium

                        text-[#3D352D]

                        text-right
                      "
                    >
                      {sculpture.category_name ||
                        "Sculpture"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-4

                      mt-3
                    "
                  >
                    <span
                      className="
                        text-xs
                        sm:text-sm

                        text-gray-500
                      "
                    >
                      Price
                    </span>

                    <span
                      className="
                        font-semibold

                        text-[#B58A4A]

                        text-xs
                        sm:text-sm

                        text-right
                      "
                    >
                      {formattedPrice}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    w-full

                    flex
                    items-center
                    justify-center

                    gap-3

                    bg-[#25D366]
                    hover:bg-[#1ebe5d]

                    disabled:opacity-60
                    disabled:cursor-not-allowed

                    text-white

                    py-3.5
                    sm:py-4

                    px-4

                    rounded-lg

                    font-['Outfit']

                    uppercase

                    tracking-[1px]
                    sm:tracking-[2px]

                    text-xs
                    sm:text-sm

                    transition
                  "
                >
                  <FaWhatsapp className="text-lg sm:text-xl" />

                  {submitting
                    ? "Saving Enquiry..."
                    : "Save Enquiry & Continue to WhatsApp"}
                </button>

                <p
                  className="
                    text-center

                    text-[10px]
                    sm:text-xs

                    leading-5

                    text-gray-500

                    px-2
                  "
                >
                  Your enquiry will be saved securely
                  and you will then be redirected to
                  WhatsApp.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}