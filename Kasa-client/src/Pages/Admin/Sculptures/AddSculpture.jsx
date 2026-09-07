import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  HiOutlineArrowLeft,
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineX,
  HiOutlineCheck,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = `${import.meta.env.VITE_API_URL}/api/sculptures`;
const CATEGORY_API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

const materials = [
  "Black Granite",

];

const heights = [
  "2 Feet",
  "3 Feet",
  "4 Feet",
  "5 Feet",
  "6 Feet",
  "7 Feet",
  "8 Feet",
  "9 Feet",
  "10 Feet",
  "Custom",
];

export default function AddSculpture() {
  const navigate = useNavigate();

  const mainImageRef = useRef(null);
  const galleryImageRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    material: "",
    height: "",
    customHeight: "",
    price: "",
    description: "",
    featured: false,
    status: "Active",
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const response = await fetch(CATEGORY_API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load categories."
          );
        }

        setCategories(
          Array.isArray(data.categories)
            ? data.categories
            : []
        );
      } catch (error) {
        console.error("Category fetch error:", error);

        setErrors((prev) => ({
          ...prev,
          category: "Unable to load categories from server.",
        }));
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        mainImage: "Please select a valid image.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        mainImage:
          "Main image must be less than 5MB.",
      }));
      return;
    }

    if (mainImage?.preview) {
      URL.revokeObjectURL(mainImage.preview);
    }

    setMainImage({
      file,
      preview: URL.createObjectURL(file),
    });

    setErrors((prev) => ({
      ...prev,
      mainImage: "",
    }));
  };

  // =====================================================
  // GALLERY IMAGES
  // =====================================================

  const handleGalleryImages = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const validFiles = [];
    let galleryError = "";

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        galleryError =
          "Only image files are allowed.";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        galleryError =
          "Each gallery image must be less than 5MB.";
        return;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
      });
    });

    setGalleryImages((prev) => [
      ...prev,
      ...validFiles,
    ]);

    setErrors((prev) => ({
      ...prev,
      galleryImages: galleryError,
    }));

    e.target.value = "";
  };

  // =====================================================
  // REMOVE MAIN IMAGE
  // =====================================================

  const removeMainImage = () => {
    if (mainImage?.preview) {
      URL.revokeObjectURL(mainImage.preview);
    }

    setMainImage(null);

    if (mainImageRef.current) {
      mainImageRef.current.value = "";
    }
  };

  // =====================================================
  // REMOVE GALLERY IMAGE
  // =====================================================

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.preview) {
        URL.revokeObjectURL(
          imageToRemove.preview
        );
      }

      return prev.filter(
        (_, i) => i !== index
      );
    });
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name =
        "Sculpture name is required.";
    } else if (
      formData.name.trim().length < 3
    ) {
      newErrors.name =
        "Sculpture name must be at least 3 characters.";
    }

    // CATEGORY
    if (!formData.category) {
      newErrors.category =
        "Please select a category.";
    }

    // MATERIAL
    if (!formData.material) {
      newErrors.material =
        "Please select a material.";
    }

    // HEIGHT
    if (!formData.height) {
      newErrors.height =
        "Please select a height.";
    }

    // CUSTOM HEIGHT
    if (
      formData.height === "Custom" &&
      !formData.customHeight.trim()
    ) {
      newErrors.customHeight =
        "Please enter the custom height.";
    }

    // PRICE
    if (
      formData.price === "" ||
      formData.price === null ||
      formData.price === undefined
    ) {
      newErrors.price =
        "Sculpture price is required.";
    } else if (Number(formData.price) < 0) {
      newErrors.price =
        "Price cannot be negative.";
    }

    // DESCRIPTION
    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required.";
    } else if (
      formData.description.trim().length < 20
    ) {
      newErrors.description =
        "Description must be at least 20 characters.";
    }

    // MAIN IMAGE
    if (!mainImage) {
      newErrors.mainImage =
        "Please upload a main image.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    setErrors((prev) => ({
      ...prev,
      submit: "",
    }));

    try {
      const finalHeight =
        formData.height === "Custom"
          ? formData.customHeight.trim()
          : formData.height;

      // =================================================
      // FORM DATA
      // =================================================

      const data = new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "category_id",
        formData.category
      );

      data.append(
        "material",
        formData.material
      );

      data.append(
        "height",
        finalHeight
      );

      // PRICE
      data.append(
        "price",
        formData.price
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "featured",
        formData.featured ? "1" : "0"
      );

      // =================================================
      // MAIN IMAGE
      // =================================================

      if (mainImage?.file) {
        data.append(
          "image",
          mainImage.file
        );
      }

      // =================================================
      // GALLERY IMAGES
      // =================================================

      galleryImages.forEach((image) => {
        if (image?.file) {
          data.append(
            "galleryImages",
            image.file
          );
        }
      });

      // =================================================
      // SEND TO BACKEND
      // =================================================

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      console.log(
        "CREATE SCULPTURE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to add sculpture."
        );
      }

      alert(
        "Sculpture added successfully!"
      );

      navigate("/admin/sculptures");

    } catch (error) {
      console.error(
        "ADD SCULPTURE ERROR:",
        error
      );

      setErrors((prev) => ({
        ...prev,
        submit:
          error.message ||
          "Something went wrong.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-['Outfit']">

      {/* SIDEBAR */}

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* MAIN */}

      <main className="lg:ml-[280px] min-h-screen">

        {/* NAVBAR */}

        <AdminNavbar
          setIsOpen={setSidebarOpen}
          title="Add Sculpture"
        />

        <div className="p-5 sm:p-8 lg:p-10">

          {/* HEADER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-8"
          >

            <button
              type="button"
              onClick={() =>
                navigate("/admin/sculptures")
              }
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-gray-500
                hover:text-[#B58A4A]
                transition
                mb-5
              "
            >
              <HiOutlineArrowLeft />
              Back to Sculptures
            </button>

            <p className="
              text-[#B58A4A]
              uppercase
              tracking-[4px]
              text-xs
              mb-2
            ">
              Sculpture Management
            </p>

            <h1 className="
              font-['Cormorant_Garamond']
              text-4xl
              sm:text-5xl
              font-semibold
              text-[#2F2923]
            ">
              Add New Sculpture
            </h1>

            <p className="
              mt-2
              text-gray-500
              max-w-2xl
              text-sm
              sm:text-base
            ">
              Add the sculpture details,
              dimensions, price and images
              that will appear on the KASA LUXE
              website.
            </p>

          </motion.div>

          {/* SUBMIT ERROR */}

          {errors.submit && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mb-6
                p-4
                bg-red-50
                border
                border-red-200
                text-red-600
                text-sm
              "
            >
              {errors.submit}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="
              grid
              xl:grid-cols-[1fr_380px]
              gap-7
            ">

              {/* =================================================
                  LEFT
              ================================================= */}

              <div className="space-y-7">

                {/* BASIC INFORMATION */}

                <motion.section
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    shadow-sm
                  "
                >

                  <div className="
                    px-6
                    sm:px-8
                    py-5
                    border-b
                    border-[#E1D7C7]
                  ">

                    <h2 className="
                      font-['Cormorant_Garamond']
                      text-3xl
                      font-semibold
                      text-[#2F2923]
                    ">
                      Basic Information
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      Enter the main information
                      about the sculpture.
                    </p>

                  </div>

                  <div className="
                    p-6
                    sm:p-8
                    space-y-6
                  ">

                    {/* NAME */}

                    <div>

                      <label className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[#3D352D]
                      ">
                        Sculpture Name
                        <span className="
                          text-red-500
                          ml-1
                        ">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Example: Lord Ganesha Sculpture"
                        className={`
                          w-full
                          px-4
                          py-3.5
                          bg-[#F8F5EF]
                          border
                          outline-none
                          text-sm
                          text-[#2F2923]
                          placeholder:text-gray-400
                          transition
                          ${
                            errors.name
                              ? "border-red-400"
                              : "border-[#D9CCB5] focus:border-[#B58A4A]"
                          }
                        `}
                      />

                      {errors.name && (
                        <p className="
                          mt-1.5
                          text-xs
                          text-red-500
                        ">
                          {errors.name}
                        </p>
                      )}

                    </div>

                    {/* CATEGORY + MATERIAL */}

                    <div className="
                      grid
                      md:grid-cols-2
                      gap-5
                    ">

                      {/* CATEGORY */}

                      <div>

                        <label className="
                          block
                          mb-2
                          text-sm
                          font-medium
                          text-[#3D352D]
                        ">
                          Category
                          <span className="
                            text-red-500
                            ml-1
                          ">
                            *
                          </span>
                        </label>

                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`
                            w-full
                            px-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            outline-none
                            text-sm
                            text-[#2F2923]
                            transition
                            ${
                              errors.category
                                ? "border-red-400"
                                : "border-[#D9CCB5] focus:border-[#B58A4A]"
                            }
                          `}
                        >

                          <option value="">
                            {categoriesLoading
                              ? "Loading Categories..."
                              : "Select Category"}
                          </option>

                          {categories.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}

                        </select>

                        {errors.category && (
                          <p className="
                            mt-1.5
                            text-xs
                            text-red-500
                          ">
                            {errors.category}
                          </p>
                        )}

                      </div>

                      {/* MATERIAL */}

                      <div>

                        <label className="
                          block
                          mb-2
                          text-sm
                          font-medium
                          text-[#3D352D]
                        ">
                          Material
                          <span className="
                            text-red-500
                            ml-1
                          ">
                            *
                          </span>
                        </label>

                        <select
                          name="material"
                          value={formData.material}
                          onChange={handleChange}
                          className={`
                            w-full
                            px-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            outline-none
                            text-sm
                            text-[#2F2923]
                            transition
                            ${
                              errors.material
                                ? "border-red-400"
                                : "border-[#D9CCB5] focus:border-[#B58A4A]"
                            }
                          `}
                        >

                          <option value="">
                            Select Material
                          </option>

                          {materials.map((item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          ))}

                        </select>

                        {errors.material && (
                          <p className="
                            mt-1.5
                            text-xs
                            text-red-500
                          ">
                            {errors.material}
                          </p>
                        )}

                      </div>

                    </div>

                    {/* HEIGHT */}

                    <div>

                      <label className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[#3D352D]
                      ">
                        Height
                        <span className="
                          text-red-500
                          ml-1
                        ">
                          *
                        </span>
                      </label>

                      <select
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className={`
                          w-full
                          px-4
                          py-3.5
                          bg-[#F8F5EF]
                          border
                          outline-none
                          text-sm
                          text-[#2F2923]
                          transition
                          ${
                            errors.height
                              ? "border-red-400"
                              : "border-[#D9CCB5] focus:border-[#B58A4A]"
                          }
                        `}
                      >

                        <option value="">
                          Select Height
                        </option>

                        {heights.map((item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}

                      </select>

                      {errors.height && (
                        <p className="
                          mt-1.5
                          text-xs
                          text-red-500
                        ">
                          {errors.height}
                        </p>
                      )}

                    </div>

                    {/* CUSTOM HEIGHT */}

                    {formData.height === "Custom" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                      >

                        <label className="
                          block
                          mb-2
                          text-sm
                          font-medium
                          text-[#3D352D]
                        ">
                          Custom Height
                          <span className="
                            text-red-500
                            ml-1
                          ">
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          name="customHeight"
                          value={formData.customHeight}
                          onChange={handleChange}
                          placeholder="Example: 12 Feet"
                          className={`
                            w-full
                            px-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            outline-none
                            text-sm
                            text-[#2F2923]
                            placeholder:text-gray-400
                            ${
                              errors.customHeight
                                ? "border-red-400"
                                : "border-[#D9CCB5] focus:border-[#B58A4A]"
                            }
                          `}
                        />

                        {errors.customHeight && (
                          <p className="
                            mt-1.5
                            text-xs
                            text-red-500
                          ">
                            {errors.customHeight}
                          </p>
                        )}

                      </motion.div>
                    )}

                    {/* PRICE */}

                    <div>

                      <label className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[#3D352D]
                      ">
                        Sculpture Price
                        <span className="
                          text-red-500
                          ml-1
                        ">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <span className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-[#B58A4A]
                          font-medium
                          text-lg
                        ">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="Example: 25000"
                          min="0"
                          step="0.01"
                          className={`
                            w-full
                            pl-10
                            pr-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            outline-none
                            text-sm
                            text-[#2F2923]
                            placeholder:text-gray-400
                            transition
                            ${
                              errors.price
                                ? "border-red-400"
                                : "border-[#D9CCB5] focus:border-[#B58A4A]"
                            }
                          `}
                        />

                      </div>

                      {errors.price && (
                        <p className="
                          mt-1.5
                          text-xs
                          text-red-500
                        ">
                          {errors.price}
                        </p>
                      )}

                    </div>

                    {/* DESCRIPTION */}

                    <div>

                      <label className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[#3D352D]
                      ">
                        Description
                        <span className="
                          text-red-500
                          ml-1
                        ">
                          *
                        </span>
                      </label>

                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="7"
                        placeholder="Write a detailed description about the sculpture..."
                        className={`
                          w-full
                          px-4
                          py-3.5
                          bg-[#F8F5EF]
                          border
                          outline-none
                          text-sm
                          text-[#2F2923]
                          placeholder:text-gray-400
                          resize-none
                          transition
                          ${
                            errors.description
                              ? "border-red-400"
                              : "border-[#D9CCB5] focus:border-[#B58A4A]"
                          }
                        `}
                      />

                      <div className="
                        flex
                        justify-between
                        mt-1.5
                      ">

                        {errors.description ? (
                          <p className="
                            text-xs
                            text-red-500
                          ">
                            {errors.description}
                          </p>
                        ) : (
                          <span />
                        )}

                        <span className="
                          text-xs
                          text-gray-400
                        ">
                          {formData.description.length} characters
                        </span>

                      </div>

                    </div>

                  </div>

                </motion.section>

                {/* =================================================
                    MAIN IMAGE
                ================================================= */}

                <motion.section
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    shadow-sm
                  "
                >

                  <div className="
                    px-6
                    sm:px-8
                    py-5
                    border-b
                    border-[#E1D7C7]
                  ">

                    <h2 className="
                      font-['Cormorant_Garamond']
                      text-3xl
                      font-semibold
                      text-[#2F2923]
                    ">
                      Main Sculpture Image
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      This image will be the
                      primary image shown in
                      the sculpture collection.
                    </p>

                  </div>

                  <div className="
                    p-6
                    sm:p-8
                  ">

                    <input
                      ref={mainImageRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMainImage}
                      className="hidden"
                    />

                    {!mainImage ? (
                      <button
                        type="button"
                        onClick={() =>
                          mainImageRef.current?.click()
                        }
                        className={`
                          w-full
                          min-h-[280px]
                          border-2
                          border-dashed
                          flex
                          flex-col
                          items-center
                          justify-center
                          px-5
                          text-center
                          transition
                          ${
                            errors.mainImage
                              ? "border-red-400 bg-red-50/30"
                              : "border-[#D9CCB5] hover:border-[#B58A4A] bg-[#FCFAF6]"
                          }
                        `}
                      >

                        <div className="
                          w-16
                          h-16
                          rounded-full
                          bg-[#F5F1E8]
                          flex
                          items-center
                          justify-center
                          text-[#B58A4A]
                          mb-4
                        ">
                          <HiOutlinePhotograph className="text-3xl" />
                        </div>

                        <h3 className="
                          font-['Cormorant_Garamond']
                          text-2xl
                          font-semibold
                          text-[#2F2923]
                        ">
                          Upload Main Image
                        </h3>

                        <p className="
                          text-sm
                          text-gray-500
                          mt-2
                        ">
                          Click to select an image
                        </p>

                        <p className="
                          text-xs
                          text-gray-400
                          mt-1
                        ">
                          JPG, JPEG, PNG or WEBP
                          • Max 5MB
                        </p>

                      </button>
                    ) : (
                      <div className="relative">

                        <img
                          src={mainImage.preview}
                          alt="Main sculpture preview"
                          className="
                            w-full
                            h-[350px]
                            object-cover
                            border
                            border-[#D9CCB5]
                          "
                        />

                        <div className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                          p-4
                          bg-gradient-to-t
                          from-black/70
                          to-transparent
                          flex
                          items-end
                          justify-between
                        ">

                          <p className="
                            text-white
                            text-sm
                            truncate
                            pr-4
                          ">
                            {mainImage.file.name}
                          </p>

                          <button
                            type="button"
                            onClick={removeMainImage}
                            className="
                              w-9
                              h-9
                              shrink-0
                              rounded-full
                              bg-red-500
                              text-white
                              flex
                              items-center
                              justify-center
                              hover:bg-red-600
                              transition
                            "
                          >
                            <HiOutlineX />
                          </button>

                        </div>

                      </div>
                    )}

                    {errors.mainImage && (
                      <p className="
                        mt-2
                        text-xs
                        text-red-500
                      ">
                        {errors.mainImage}
                      </p>
                    )}

                  </div>

                </motion.section>

                {/* =================================================
                    GALLERY
                ================================================= */}

                <motion.section
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    shadow-sm
                  "
                >

                  <div className="
                    px-6
                    sm:px-8
                    py-5
                    border-b
                    border-[#E1D7C7]
                  ">

                    <h2 className="
                      font-['Cormorant_Garamond']
                      text-3xl
                      font-semibold
                      text-[#2F2923]
                    ">
                      Gallery Images
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      Add additional images of
                      the sculpture.
                    </p>

                  </div>

                  <div className="
                    p-6
                    sm:p-8
                  ">

                    <input
                      ref={galleryImageRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImages}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        galleryImageRef.current?.click()
                      }
                      className="
                        w-full
                        py-4
                        border
                        border-dashed
                        border-[#D9CCB5]
                        bg-[#FCFAF6]
                        hover:border-[#B58A4A]
                        text-[#5C5146]
                        hover:text-[#B58A4A]
                        transition
                        flex
                        items-center
                        justify-center
                        gap-3
                        text-sm
                      "
                    >
                      <HiOutlineUpload className="text-xl" />
                      Add Gallery Images
                    </button>

                    {errors.galleryImages && (
                      <p className="
                        mt-2
                        text-xs
                        text-red-500
                      ">
                        {errors.galleryImages}
                      </p>
                    )}

                    {galleryImages.length > 0 && (
                      <div className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        lg:grid-cols-4
                        gap-4
                        mt-5
                      ">

                        {galleryImages.map(
                          (image, index) => (
                            <div
                              key={`${image.file.name}-${index}`}
                              className="
                                relative
                                group
                              "
                            >

                              <img
                                src={image.preview}
                                alt={`Gallery ${index + 1}`}
                                className="
                                  w-full
                                  h-32
                                  object-cover
                                  border
                                  border-[#D9CCB5]
                                "
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeGalleryImage(index)
                                }
                                className="
                                  absolute
                                  top-2
                                  right-2
                                  w-8
                                  h-8
                                  rounded-full
                                  bg-black/70
                                  text-white
                                  flex
                                  items-center
                                  justify-center
                                  opacity-0
                                  group-hover:opacity-100
                                  transition
                                "
                              >
                                <HiOutlineX />
                              </button>

                            </div>
                          )
                        )}

                      </div>
                    )}

                    <p className="
                      mt-4
                      text-xs
                      text-gray-400
                    ">
                      You can select multiple
                      images. Each image should
                      be less than 5MB.
                    </p>

                  </div>

                </motion.section>

              </div>

              {/* =================================================
                  RIGHT
              ================================================= */}

              <div className="space-y-7">

                {/* PUBLISHING */}

                <motion.section
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    shadow-sm
                  "
                >

                  <div className="
                    px-6
                    py-5
                    border-b
                    border-[#E1D7C7]
                  ">

                    <h2 className="
                      font-['Cormorant_Garamond']
                      text-2xl
                      font-semibold
                      text-[#2F2923]
                    ">
                      Publishing
                    </h2>

                  </div>

                  <div className="
                    p-6
                    space-y-6
                  ">

                    {/* STATUS */}

                    <div>

                      <label className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-[#3D352D]
                      ">
                        Status
                      </label>

                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="
                          w-full
                          px-4
                          py-3
                          bg-[#F8F5EF]
                          border
                          border-[#D9CCB5]
                          outline-none
                          text-sm
                          focus:border-[#B58A4A]
                        "
                      >

                        <option value="Active">
                          Active
                        </option>

                        <option value="Inactive">
                          Inactive
                        </option>

                      </select>

                    </div>

                    {/* FEATURED */}

                    <label className="
                      flex
                      items-start
                      gap-3
                      cursor-pointer
                    ">

                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="
                          mt-1
                          w-4
                          h-4
                          accent-[#B58A4A]
                        "
                      />

                      <div>

                        <p className="
                          text-sm
                          font-medium
                          text-[#2F2923]
                        ">
                          Featured Sculpture
                        </p>

                        <p className="
                          text-xs
                          text-gray-500
                          mt-1
                          leading-5
                        ">
                          Display this sculpture
                          in featured sections
                          of the website.
                        </p>

                      </div>

                    </label>

                  </div>

                </motion.section>

                {/* IMAGE GUIDELINES */}

                <motion.section
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className="
                    bg-[#111111]
                    text-white
                    p-6
                    shadow-sm
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  ">

                    <HiOutlinePhotograph
                      className="
                        text-2xl
                        text-[#B58A4A]
                      "
                    />

                    <h2 className="
                      font-['Cormorant_Garamond']
                      text-2xl
                      font-semibold
                    ">
                      Image Guidelines
                    </h2>

                  </div>

                  <ul className="
                    space-y-3
                    text-sm
                    text-gray-300
                    leading-6
                  ">

                    <li className="
                      flex
                      gap-2
                    ">
                      <HiOutlineCheck
                        className="
                          text-[#B58A4A]
                          mt-1
                          shrink-0
                        "
                      />
                      Use clear, high-quality
                      sculpture photos.
                    </li>

                    <li className="
                      flex
                      gap-2
                    ">
                      <HiOutlineCheck
                        className="
                          text-[#B58A4A]
                          mt-1
                          shrink-0
                        "
                      />
                      Prefer simple backgrounds.
                    </li>

                    <li className="
                      flex
                      gap-2
                    ">
                      <HiOutlineCheck
                        className="
                          text-[#B58A4A]
                          mt-1
                          shrink-0
                        "
                      />
                      Recommended format:
                      JPG, PNG or WEBP.
                    </li>

                    <li className="
                      flex
                      gap-2
                    ">
                      <HiOutlineCheck
                        className="
                          text-[#B58A4A]
                          mt-1
                          shrink-0
                        "
                      />
                      Keep each image below
                      5MB.
                    </li>

                  </ul>

                </motion.section>

                {/* ACTIONS */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    p-6
                  "
                >

                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      w-full
                      py-3.5
                      bg-[#B58A4A]
                      hover:bg-[#967039]
                      text-white
                      uppercase
                      tracking-[2px]
                      text-sm
                      font-medium
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >
                    {submitting
                      ? "Adding Sculpture..."
                      : "Add Sculpture"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/admin/sculptures")
                    }
                    disabled={submitting}
                    className="
                      w-full
                      mt-3
                      py-3.5
                      border
                      border-[#D9CCB5]
                      text-[#5C5146]
                      hover:border-[#B58A4A]
                      hover:text-[#B58A4A]
                      transition
                      text-sm
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                </motion.div>

              </div>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}