import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineTrash,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = "http://localhost:5000/api/sculptures";
const SERVER_URL = "http://localhost:5000";

const categories = [
  "Ganesha",
  "Shiva",
  "Murugan",
  "Lakshmi",
  "Nandi",
  "Buddha",
  "Temple Sculpture",
];

const materials = [
  "Black Granite",
  "White Marble",
  "Granite",
  "Sandstone",
  "Green Stone",
  "Other",
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

export default function EditSculpture() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mainImageRef = useRef(null);
  const galleryImageRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [sculpture, setSculpture] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      category_id: "",
      material: "",
      height: "",
      customHeight: "",
      description: "",
      price: "",
      featured: false,
      status: "Active",
    });

  // =====================================================
  // IMAGE STATES
  // =====================================================

  const [existingMainImage, setExistingMainImage] =
    useState(null);

  const [newMainImage, setNewMainImage] =
    useState(null);

  const [existingGalleryImages, setExistingGalleryImages] =
    useState([]);

  const [newGalleryImages, setNewGalleryImages] =
    useState([]);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) return null;

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
  // FETCH SCULPTURE
  // =====================================================

  useEffect(() => {
    const fetchSculpture = async () => {
      try {
        setLoading(true);
        setErrors({});

        const response = await fetch(
          `${API_URL}/${id}`
        );

        const data = await response.json();

        console.log(
          "EDIT SCULPTURE RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load sculpture."
          );
        }

        const item = data.sculpture;

        if (!item) {
          throw new Error(
            "Sculpture data not found."
          );
        }

        setSculpture(item);

        // =================================================
        // FORM DATA
        // =================================================

        setFormData({
          name: item.name || "",

          category_id:
            item.category_id
              ? String(item.category_id)
              : "",

          material:
            item.material || "",

          height:
            item.height || "",

          customHeight: "",

          description:
            item.description || "",

          price:
            item.price !== null &&
            item.price !== undefined
              ? String(item.price)
              : "",

          featured:
            Number(item.featured) === 1,

          status:
            item.status || "Active",
        });

        // =================================================
        // MAIN IMAGE
        // =================================================

        setExistingMainImage(
          item.image || null
        );

        // =================================================
        // GALLERY IMAGES
        // =================================================

        const gallery =
          Array.isArray(data.galleryImages)
            ? data.galleryImages
            : [];

        setExistingGalleryImages(gallery);

      } catch (error) {
        console.error(
          "FETCH SCULPTURE ERROR:",
          error
        );

        setErrors({
          fetch:
            error.message ||
            "Unable to load sculpture.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSculpture();
    }
  }, [id]);

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
        mainImage:
          "Please select a valid image.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        mainImage:
          "Image must be less than 5MB.",
      }));
      return;
    }

    if (newMainImage?.preview) {
      URL.revokeObjectURL(
        newMainImage.preview
      );
    }

    setNewMainImage({
      file,
      preview:
        URL.createObjectURL(file),
    });

    setErrors((prev) => ({
      ...prev,
      mainImage: "",
    }));
  };

  // =====================================================
  // REMOVE NEW MAIN IMAGE
  // =====================================================

  const removeNewMainImage = () => {
    if (newMainImage?.preview) {
      URL.revokeObjectURL(
        newMainImage.preview
      );
    }

    setNewMainImage(null);

    if (mainImageRef.current) {
      mainImageRef.current.value = "";
    }
  };

  // =====================================================
  // REMOVE EXISTING MAIN IMAGE
  // =====================================================

  const removeExistingMainImage = () => {
    setExistingMainImage(null);
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
          "Each image must be less than 5MB.";
        return;
      }

      validFiles.push({
        file,
        preview:
          URL.createObjectURL(file),
      });
    });

    setNewGalleryImages((prev) => [
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
  // REMOVE EXISTING GALLERY
  // =====================================================

  const removeExistingGalleryImage = (
    index
  ) => {
    setExistingGalleryImages(
      (prev) =>
        prev.filter(
          (_, i) => i !== index
        )
    );
  };

  // =====================================================
  // REMOVE NEW GALLERY
  // =====================================================

  const removeNewGalleryImage = (
    index
  ) => {
    setNewGalleryImages((prev) => {
      const image = prev[index];

      if (image?.preview) {
        URL.revokeObjectURL(
          image.preview
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

    if (!formData.name.trim()) {
      newErrors.name =
        "Sculpture name is required.";
    } else if (
      formData.name.trim().length < 3
    ) {
      newErrors.name =
        "Sculpture name must be at least 3 characters.";
    }

    if (!formData.category_id) {
      newErrors.category =
        "Please select a category.";
    }

    if (!formData.material) {
      newErrors.material =
        "Please select a material.";
    }

    if (!formData.height) {
      newErrors.height =
        "Please select a height.";
    }

    if (
      formData.height === "Custom" &&
      !formData.customHeight.trim()
    ) {
      newErrors.customHeight =
        "Please enter the custom height.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required.";
    } else if (
      formData.description.trim().length < 20
    ) {
      newErrors.description =
        "Description must be at least 20 characters.";
    }

    if (
      formData.price === "" ||
      formData.price === null ||
      formData.price === undefined
    ) {
      newErrors.price =
        "Sculpture price is required.";
    } else if (
      Number.isNaN(
        Number(formData.price)
      ) ||
      Number(formData.price) < 0
    ) {
      newErrors.price =
        "Please enter a valid price.";
    }

    if (
      !existingMainImage &&
      !newMainImage
    ) {
      newErrors.mainImage =
        "Please keep or upload a main image.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // UPDATE SCULPTURE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setSubmitting(true);

      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));

      const data = new FormData();

      // =================================================
      // BASIC DATA
      // =================================================

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "category_id",
        formData.category_id
      );

      data.append(
        "material",
        formData.material
      );

      const finalHeight =
        formData.height === "Custom"
          ? formData.customHeight.trim()
          : formData.height;

      data.append(
        "height",
        finalHeight
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "price",
        formData.price
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

      if (newMainImage?.file) {
        data.append(
          "image",
          newMainImage.file
        );
      }

      // =================================================
      // EXISTING GALLERY IMAGES
      // =================================================
      //
      // Send IDs of gallery images that should remain.
      //
      // This allows the backend to delete the images
      // removed from the edit page.
      // =================================================

      const remainingGalleryIds =
        existingGalleryImages
          .filter(
            (item) =>
              item &&
              typeof item === "object" &&
              item.id
          )
          .map((item) => item.id);

      data.append(
        "existingGalleryIds",
        JSON.stringify(
          remainingGalleryIds
        )
      );

      // =================================================
      // NEW GALLERY IMAGES
      // =================================================

      newGalleryImages.forEach(
        (image) => {
          if (image?.file) {
            data.append(
              "galleryImages",
              image.file
            );
          }
        }
      );

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "UPDATING SCULPTURE:",
        id
      );

      for (const pair of data.entries()) {
        console.log(
          pair[0],
          pair[1]
        );
      }

      // =================================================
      // API REQUEST
      // =================================================

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result =
        await response.json();

      console.log(
        "UPDATE SCULPTURE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update sculpture."
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to update sculpture."
        );
      }

      alert(
        "Sculpture updated successfully!"
      );

      navigate("/admin/sculptures");

    } catch (error) {
      console.error(
        "UPDATE SCULPTURE ERROR:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Unable to update sculpture. Please try again.",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="
        min-h-screen
        bg-[#F5F1E8]
        flex
        items-center
        justify-center
      ">
        <div className="text-center">

          <div className="
            w-12
            h-12
            mx-auto
            border-4
            border-[#D9CCB5]
            border-t-[#B58A4A]
            rounded-full
            animate-spin
          " />

          <p className="
            mt-5
            text-gray-500
          ">
            Loading sculpture...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // FETCH ERROR
  // =====================================================

  if (errors.fetch || !sculpture) {
    return (
      <div className="
        min-h-screen
        bg-[#F5F1E8]
        flex
        items-center
        justify-center
        px-5
      ">

        <div className="text-center">

          <div className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-[#111111]
            text-[#B58A4A]
            flex
            items-center
            justify-center
          ">
            <HiOutlinePhotograph
              className="text-4xl"
            />
          </div>

          <h1 className="
            mt-6
            font-['Cormorant_Garamond']
            text-4xl
            font-semibold
            text-[#2F2923]
          ">
            Sculpture Not Found
          </h1>

          <p className="
            mt-2
            text-gray-500
          ">
            {errors.fetch ||
              "The sculpture you are trying to edit does not exist."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/sculptures"
              )
            }
            className="
              mt-6
              px-6
              py-3
              bg-[#B58A4A]
              text-white
              uppercase
              tracking-[1.5px]
              text-sm
              hover:bg-[#967039]
              transition
            "
          >
            Back to Sculptures
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="
      min-h-screen
      bg-[#F5F1E8]
      font-['Outfit']
    ">

      {/* SIDEBAR */}

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* MAIN */}

      <main className="
        lg:ml-[280px]
        min-h-screen
      ">

        <AdminNavbar
          setIsOpen={setSidebarOpen}
          title="Edit Sculpture"
        />

        <div className="
          p-5
          sm:p-8
          lg:p-10
        ">

          {/* =================================================
              HEADER
          ================================================= */}

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
                navigate(
                  "/admin/sculptures"
                )
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
              Edit Sculpture
            </h1>

            <p className="
              mt-2
              text-gray-500
              max-w-2xl
              text-sm
              sm:text-base
            ">
              Update the details, dimensions,
              price and images of this sculpture.
            </p>

          </motion.div>

          {/* ERROR */}

          {errors.submit && (
            <div className="
              mb-6
              p-4
              bg-red-50
              border
              border-red-200
              text-red-600
              text-sm
            ">
              {errors.submit}
            </div>
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

                {/* =================================================
                    BASIC INFORMATION
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
                      Update the main sculpture information.
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

                    {/* CATEGORY / MATERIAL */}

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
                          name="category_id"
                          value={
                            formData.category_id
                          }
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
                            ${
                              errors.category
                                ? "border-red-400"
                                : "border-[#D9CCB5] focus:border-[#B58A4A]"
                            }
                          `}
                        >

                          <option value="">
                            Select Category
                          </option>

                          {categories.map(
                            (item, index) => (
                              <option
                                key={index + 1}
                                value={index + 1}
                              >
                                {item}
                              </option>
                            )
                          )}

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
                          value={
                            formData.material
                          }
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

                          {materials.map(
                            (item) => (
                              <option
                                key={item}
                                value={item}
                              >
                                {item}
                              </option>
                            )
                          )}

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
                        value={
                          formData.height
                        }
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

                        {heights.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}

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

                    {formData.height ===
                      "Custom" && (
                      <div>

                        <label className="
                          block
                          mb-2
                          text-sm
                          font-medium
                          text-[#3D352D]
                        ">
                          Custom Height
                        </label>

                        <input
                          type="text"
                          name="customHeight"
                          value={
                            formData.customHeight
                          }
                          onChange={handleChange}
                          placeholder="Example: 12 Feet"
                          className="
                            w-full
                            px-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            border-[#D9CCB5]
                            focus:border-[#B58A4A]
                            outline-none
                            text-sm
                          "
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

                      </div>
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

                      <div className="
                        relative
                      ">

                        <span className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-[#B58A4A]
                          font-medium
                        ">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          value={
                            formData.price
                          }
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          placeholder="Enter price"
                          className={`
                            w-full
                            pl-9
                            pr-4
                            py-3.5
                            bg-[#F8F5EF]
                            border
                            outline-none
                            text-sm
                            text-[#2F2923]
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
                        value={
                          formData.description
                        }
                        onChange={handleChange}
                        rows="7"
                        className={`
                          w-full
                          px-4
                          py-3.5
                          bg-[#F8F5EF]
                          border
                          outline-none
                          text-sm
                          text-[#2F2923]
                          resize-none
                          ${
                            errors.description
                              ? "border-red-400"
                              : "border-[#D9CCB5] focus:border-[#B58A4A]"
                          }
                        `}
                      />

                      {errors.description && (
                        <p className="
                          mt-1.5
                          text-xs
                          text-red-500
                        ">
                          {errors.description}
                        </p>
                      )}

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
                      Replace the existing main image if required.
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
                      onChange={
                        handleMainImage
                      }
                      className="hidden"
                    />

                    {/* NEW IMAGE */}

                    {newMainImage ? (

                      <div className="relative">

                        <img
                          src={
                            newMainImage.preview
                          }
                          alt="New main sculpture"
                          className="
                            w-full
                            h-[350px]
                            object-cover
                            border
                            border-[#D9CCB5]
                          "
                        />

                        <button
                          type="button"
                          onClick={
                            removeNewMainImage
                          }
                          className="
                            absolute
                            top-4
                            right-4
                            w-10
                            h-10
                            rounded-full
                            bg-red-500
                            text-white
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <HiOutlineX />
                        </button>

                      </div>

                    ) : existingMainImage ? (

                      <div className="relative">

                        <img
                          src={getImageUrl(
                            existingMainImage
                          )}
                          alt={
                            formData.name
                          }
                          className="
                            w-full
                            h-[350px]
                            object-cover
                            border
                            border-[#D9CCB5]
                          "
                        />

                        <button
                          type="button"
                          onClick={
                            removeExistingMainImage
                          }
                          className="
                            absolute
                            top-4
                            right-4
                            w-10
                            h-10
                            rounded-full
                            bg-red-500
                            text-white
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <HiOutlineTrash />
                        </button>

                      </div>

                    ) : (

                      <div className="
                        w-full
                        min-h-[280px]
                        bg-[#FCFAF6]
                        border-2
                        border-dashed
                        border-[#D9CCB5]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                      ">

                        <HiOutlinePhotograph
                          className="
                            text-4xl
                            text-[#B58A4A]
                            mb-4
                          "
                        />

                        <h3 className="
                          font-['Cormorant_Garamond']
                          text-2xl
                          font-semibold
                          text-[#2F2923]
                        ">
                          No Main Image
                        </h3>

                      </div>

                    )}

                    <button
                      type="button"
                      onClick={() =>
                        mainImageRef.current?.click()
                      }
                      className="
                        mt-5
                        w-full
                        py-3.5
                        border
                        border-dashed
                        border-[#D9CCB5]
                        bg-[#FCFAF6]
                        hover:border-[#B58A4A]
                        hover:text-[#B58A4A]
                        transition
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        text-[#5C5146]
                      "
                    >
                      <HiOutlineUpload
                        className="text-xl"
                      />

                      Replace Main Image
                    </button>

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
                      Manage additional sculpture images.
                    </p>

                  </div>

                  <div className="
                    p-6
                    sm:p-8
                  ">

                    {/* EXISTING */}

                    {existingGalleryImages.length >
                      0 && (

                      <div className="mb-7">

                        <p className="
                          text-sm
                          font-medium
                          text-[#3D352D]
                          mb-4
                        ">
                          Existing Images
                        </p>

                        <div className="
                          grid
                          grid-cols-2
                          sm:grid-cols-3
                          lg:grid-cols-4
                          gap-4
                        ">

                          {existingGalleryImages.map(
                            (
                              image,
                              index
                            ) => {

                              const imageSrc =
                                typeof image ===
                                "string"
                                  ? image
                                  : image?.image;

                              return (
                                <div
                                  key={
                                    image?.id ||
                                    index
                                  }
                                  className="
                                    relative
                                    group
                                  "
                                >

                                  <img
                                    src={getImageUrl(
                                      imageSrc
                                    )}
                                    alt={`Gallery ${
                                      index +
                                      1
                                    }`}
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
                                      removeExistingGalleryImage(
                                        index
                                      )
                                    }
                                    className="
                                      absolute
                                      top-2
                                      right-2
                                      w-8
                                      h-8
                                      rounded-full
                                      bg-red-500
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
                              );
                            }
                          )}

                        </div>

                      </div>
                    )}

                    {/* FILE INPUT */}

                    <input
                      ref={galleryImageRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={
                        handleGalleryImages
                      }
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
                        hover:text-[#B58A4A]
                        transition
                        flex
                        items-center
                        justify-center
                        gap-3
                        text-sm
                      "
                    >
                      <HiOutlineUpload
                        className="text-xl"
                      />

                      Add More Gallery Images
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

                    {/* NEW */}

                    {newGalleryImages.length >
                      0 && (

                      <div className="mt-7">

                        <p className="
                          text-sm
                          font-medium
                          text-[#3D352D]
                          mb-4
                        ">
                          New Images
                        </p>

                        <div className="
                          grid
                          grid-cols-2
                          sm:grid-cols-3
                          lg:grid-cols-4
                          gap-4
                        ">

                          {newGalleryImages.map(
                            (
                              image,
                              index
                            ) => (

                              <div
                                key={`${image.file.name}-${index}`}
                                className="
                                  relative
                                  group
                                "
                              >

                                <img
                                  src={
                                    image.preview
                                  }
                                  alt={`New gallery ${
                                    index +
                                    1
                                  }`}
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
                                    removeNewGalleryImage(
                                      index
                                    )
                                  }
                                  className="
                                    absolute
                                    top-2
                                    right-2
                                    w-8
                                    h-8
                                    rounded-full
                                    bg-red-500
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

                      </div>
                    )}

                  </div>

                </motion.section>

              </div>

              {/* =================================================
                  RIGHT
              ================================================= */}

              <div className="space-y-7">

                {/* =================================================
                    PUBLISHING
                ================================================= */}

                <motion.section
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
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
                        value={
                          formData.status
                        }
                        onChange={
                          handleChange
                        }
                        className="
                          w-full
                          px-4
                          py-3
                          bg-[#F8F5EF]
                          border
                          border-[#D9CCB5]
                          focus:border-[#B58A4A]
                          outline-none
                          text-sm
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
                        checked={
                          formData.featured
                        }
                        onChange={
                          handleChange
                        }
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
                          Show this sculpture in
                          featured sections of the website.
                        </p>

                      </div>

                    </label>

                  </div>

                </motion.section>

                {/* =================================================
                    SCULPTURE DETAILS
                ================================================= */}

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
                    delay: 0.1,
                  }}
                  className="
                    bg-[#111111]
                    text-white
                    p-6
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  ">

                    <HiOutlineCheck
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
                      Sculpture Details
                    </h2>

                  </div>

                  <div className="
                    space-y-4
                    text-sm
                  ">

                    <div className="
                      flex
                      justify-between
                      gap-4
                      border-b
                      border-white/10
                      pb-3
                    ">

                      <span className="
                        text-gray-400
                      ">
                        ID
                      </span>

                      <span className="
                        text-white
                      ">
                        #{sculpture.id}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                      gap-4
                      border-b
                      border-white/10
                      pb-3
                    ">

                      <span className="
                        text-gray-400
                      ">
                        Category
                      </span>

                      <span className="
                        text-white
                      ">
                        {sculpture.category_name ||
                          "—"}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                      gap-4
                      border-b
                      border-white/10
                      pb-3
                    ">

                      <span className="
                        text-gray-400
                      ">
                        Material
                      </span>

                      <span className="
                        text-white
                      ">
                        {formData.material ||
                          "—"}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                      gap-4
                      border-b
                      border-white/10
                      pb-3
                    ">

                      <span className="
                        text-gray-400
                      ">
                        Height
                      </span>

                      <span className="
                        text-white
                      ">
                        {formData.height ===
                        "Custom"
                          ? formData.customHeight
                          : formData.height ||
                            "—"}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-gray-400
                      ">
                        Price
                      </span>

                      <span className="
                        text-[#B58A4A]
                        font-semibold
                      ">
                        ₹
                        {formData.price
                          ? Number(
                              formData.price
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "0"}
                      </span>

                    </div>

                  </div>

                </motion.section>

                {/* =================================================
                    IMAGE GUIDELINES
                ================================================= */}

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
                    delay: 0.2,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    p-6
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
                      text-[#2F2923]
                    ">
                      Image Guidelines
                    </h2>

                  </div>

                  <ul className="
                    space-y-3
                    text-sm
                    text-gray-500
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

                      Use clear,
                      high-quality photos.
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

                      Prefer simple
                      backgrounds.
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

                      JPG, PNG or WEBP
                      recommended.
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

                      Keep each image
                      below 5MB.
                    </li>

                  </ul>

                </motion.section>

                {/* =================================================
                    SAVE
                ================================================= */}

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
                    delay: 0.3,
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
                      ? "Saving Changes..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() =>
                      navigate(
                        "/admin/sculptures"
                      )
                    }
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