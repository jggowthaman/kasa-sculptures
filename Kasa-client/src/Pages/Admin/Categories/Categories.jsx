import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlinePhotograph,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;
const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Categories() {
  // =====================================================
  // STATE
  // =====================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("Active");

  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    const cleanImage = image.startsWith("/")
      ? image.slice(1)
      : image;

    return `${SERVER_URL}/${cleanImage}`;
  };

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok || !data.success) {
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
      console.error("Fetch Categories Error:", error);

      setError(
        error.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingCategory(null);
    setName("");
    setDescription("");
    setStatus("Active");
    setImageFile(null);
    setImagePreview("");
    setError("");
  };

  // =====================================================
  // ADD MODAL
  // =====================================================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const openEditModal = (category) => {
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingCategory(category);

    setName(category.name || "");

    setDescription(category.description || "");

    setStatus(category.status || "Active");

    setImageFile(null);

    setImagePreview(
      category.image
        ? getImageUrl(category.image)
        : ""
    );

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      event.target.value = "";

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";

      return;
    }

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setImageFile(file);

    setImagePreview(preview);

    setError("");
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = () => {
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);

    if (
      editingCategory &&
      editingCategory.image
    ) {
      setImagePreview(
        getImageUrl(editingCategory.image)
      );
    } else {
      setImagePreview("");
    }

    const input =
      document.getElementById("categoryImage");

    if (input) {
      input.value = "";
    }

    setError("");
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);

    resetForm();
  };

  // =====================================================
  // SAVE CATEGORY
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    // Image required when creating
    if (!editingCategory && !imageFile) {
      setError(
        "Please select a category image."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      // =================================================
      // FORM DATA
      // =================================================

      const formData = new FormData();

      formData.append("name", categoryName);

      formData.append(
        "description",
        description.trim()
      );

      formData.append("status", status);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // =================================================
      // URL
      // =================================================

      const url = editingCategory
        ? `${API_URL}/${editingCategory.id}`
        : API_URL;

      // =================================================
      // METHOD
      // =================================================

      const method = editingCategory
        ? "PUT"
        : "POST";

      console.log("Category request:", {
        url,
        method,
        name: categoryName,
        status,
        image: imageFile?.name || "existing image",
      });

      // =================================================
      // REQUEST
      // =================================================

      const response = await fetch(url, {
        method,
        body: formData,
      });

      // =================================================
      // READ RESPONSE
      // =================================================

      const responseText =
        await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          responseText ||
            `Server returned ${response.status}`
        );
      }

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            `Failed to ${
              editingCategory
                ? "update"
                : "create"
            } category.`
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setShowModal(false);

      resetForm();

      await fetchCategories();

    } catch (error) {
      console.error(
        "Save Category Error:",
        error
      );

      setError(
        error.message ||
          "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${category.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete category."
        );
      }

      await fetchCategories();

    } catch (error) {
      console.error(
        "Delete Category Error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete category."
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCategories =
    categories.filter((category) =>
      category.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================================
  // JSX
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
          title="Categories"
        />

        <div className="p-5 sm:p-8 lg:p-10">

          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

            <div>

              <p className="text-[#B58A4A] uppercase tracking-[3px] text-xs mb-2">
                Sculpture Management
              </p>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-semibold text-[#2F2923]">
                Categories
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                Manage your sculpture categories.
              </p>

            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#B58A4A] hover:bg-[#967039] text-white uppercase tracking-[1.5px] text-sm transition"
            >
              <HiOutlinePlus className="text-xl" />
              Add Category
            </button>

          </div>

          {/* ERROR */}

          {error && !showModal && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* SEARCH */}

          <div className="bg-white border border-[#E1D7C7] p-5 mb-6">

            <div className="relative max-w-md">

              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B58A4A] text-xl" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search category..."
                className="w-full pl-12 pr-4 py-3 bg-[#F8F5EF] border border-[#D9CCB5] outline-none text-sm focus:border-[#B58A4A]"
              />

            </div>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="bg-white border border-[#E1D7C7] py-20 text-center">

              <div className="w-10 h-10 mx-auto border-4 border-[#D9CCB5] border-t-[#B58A4A] rounded-full animate-spin" />

              <p className="mt-4 text-gray-500 text-sm">
                Loading categories...
              </p>

            </div>

          ) : filteredCategories.length === 0 ? (

            <div className="bg-white border border-[#E1D7C7] py-20 text-center">

              <HiOutlinePhotograph className="mx-auto text-5xl text-[#B58A4A]" />

              <h2 className="mt-4 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923]">
                No Categories Found
              </h2>

              <p className="mt-2 text-gray-500 text-sm">
                Click "Add Category" to create one.
              </p>

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {filteredCategories.map(
                (category, index) => (

                  <motion.div
                    key={category.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="bg-white border border-[#E1D7C7] overflow-hidden shadow-sm"
                  >

                    {/* IMAGE */}

                    <div className="relative w-full h-56 bg-[#EDE7DC] overflow-hidden">

                      {category.image ? (

                        <img
                          src={getImageUrl(
                            category.image
                          )}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                          <HiOutlinePhotograph className="text-5xl text-[#B58A4A]" />

                          <span className="mt-2 text-xs">
                            No Image
                          </span>

                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="text-xs text-gray-400">
                            Category
                          </p>

                          <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923]">
                            {category.name}
                          </h2>

                        </div>

                        <span
                          className={
                            category.status ===
                            "Active"
                              ? "px-3 py-1.5 text-xs bg-green-50 text-green-600"
                              : "px-3 py-1.5 text-xs bg-gray-100 text-gray-500"
                          }
                        >
                          {category.status}
                        </span>

                      </div>

                      <p className="mt-4 text-sm text-gray-500 leading-6 min-h-[48px]">
                        {category.description ||
                          "No description added."}
                      </p>

                      <div className="mt-6 pt-5 border-t border-[#EDE7DC] flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              category
                            )
                          }
                          className="flex-1 py-2.5 border border-[#D9CCB5] text-[#5C5146] hover:border-[#B58A4A] hover:text-[#B58A4A] transition flex items-center justify-center gap-2 text-sm"
                        >
                          <HiOutlinePencil />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              category
                            )
                          }
                          className="w-11 border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
                        >
                          <HiOutlineTrash />
                        </button>

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          MODAL
      ===================================================== */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-5 overflow-y-auto"
            onClick={() => {
              if (!saving) {
                closeModal();
              }
            }}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="w-full max-w-lg bg-[#F5F1E8] shadow-2xl my-5"
            >

              {/* MODAL HEADER */}

              <div className="bg-[#111111] px-6 py-5 flex items-center justify-between">

                <div>

                  <p className="text-[#B58A4A] uppercase tracking-[3px] text-[10px]">
                    Category Management
                  </p>

                  <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-semibold text-white">
                    {editingCategory
                      ? "Edit Category"
                      : "Add Category"}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="text-gray-300 hover:text-[#B58A4A]"
                >
                  <HiOutlineX className="text-2xl" />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8"
              >

                {/* ERROR */}

                {error && (
                  <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* NAME */}

                <div className="mb-5">

                  <label className="block mb-2 text-sm font-medium text-[#3D352D]">
                    Category Name
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Example: Ganesha"
                    disabled={saving}
                    className="w-full px-4 py-3.5 bg-white border border-[#D9CCB5] focus:border-[#B58A4A] outline-none text-sm"
                  />

                </div>

                {/* DESCRIPTION */}

                <div className="mb-5">

                  <label className="block mb-2 text-sm font-medium text-[#3D352D]">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(
                        e.target.value
                      );
                      setError("");
                    }}
                    rows={4}
                    placeholder="Enter category description..."
                    disabled={saving}
                    className="w-full px-4 py-3.5 bg-white border border-[#D9CCB5] focus:border-[#B58A4A] outline-none text-sm resize-none"
                  />

                </div>

                {/* IMAGE */}

                <div className="mb-5">

                  <label className="block mb-2 text-sm font-medium text-[#3D352D]">
                    Category Image

                    {!editingCategory && (
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    )}
                  </label>

                  {imagePreview ? (

                    <div className="relative mb-4">

                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="w-full h-52 object-cover border border-[#D9CCB5]"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={saving}
                        className="absolute top-3 right-3 w-9 h-9 bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition"
                      >
                        <HiOutlineX />
                      </button>

                    </div>

                  ) : (

                    <div className="w-full h-40 border-2 border-dashed border-[#D9CCB5] bg-white flex flex-col items-center justify-center">

                      <HiOutlinePhotograph className="text-4xl text-[#B58A4A]" />

                      <p className="mt-2 text-sm text-gray-500">
                        No image selected
                      </p>

                    </div>

                  )}

                  <label
                    htmlFor="categoryImage"
                    className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 border border-[#B58A4A] text-[#B58A4A] hover:bg-[#B58A4A] hover:text-white cursor-pointer transition text-sm"
                  >
                    <HiOutlinePhotograph />

                    {imageFile
                      ? "Change Image"
                      : editingCategory?.image
                      ? "Replace Image"
                      : "Choose Image"}
                  </label>

                  <input
                    id="categoryImage"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    disabled={saving}
                    className="hidden"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    JPG, JPEG, PNG or WEBP • Maximum 5 MB
                  </p>

                </div>

                {/* STATUS */}

                <div className="mb-7">

                  <label className="block mb-2 text-sm font-medium text-[#3D352D]">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    disabled={saving}
                    className="w-full px-4 py-3.5 bg-white border border-[#D9CCB5] focus:border-[#B58A4A] outline-none text-sm"
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col-reverse sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="flex-1 py-3.5 border border-[#D9CCB5] text-[#5C5146] hover:border-[#B58A4A] hover:text-[#B58A4A] transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3.5 bg-[#B58A4A] hover:bg-[#967039] text-white uppercase tracking-[1.5px] text-sm transition disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingCategory
                      ? "Save Changes"
                      : "Add Category"}
                  </button>

                </div>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}