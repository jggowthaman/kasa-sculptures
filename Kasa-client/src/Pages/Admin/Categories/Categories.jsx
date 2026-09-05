import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = "http://localhost:5000/api/categories";

export default function Categories() {
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

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load categories."
        );
      }

      setCategories(data.categories || []);
    } catch (error) {
      console.error("Fetch Categories Error:", error);

      setError(
        error.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchCategories();
  }, []);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setStatus("Active");
    setError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (category) => {
    setEditingCategory(category);

    setName(category.name || "");

    setDescription(category.description || "");

    setStatus(category.status || "Active");

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingCategory(null);

    setName("");
    setDescription("");
    setStatus("Active");

    setError("");
  };

  // =====================================================
  // ADD / UPDATE CATEGORY
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: categoryName,
        description: description.trim(),
        status,
      };

      let response;

      if (editingCategory) {
        // UPDATE
        response = await fetch(
          `${API_URL}/${editingCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // CREATE
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save category."
        );
      }

      closeModal();

      await fetchCategories();
    } catch (error) {
      console.error("Save Category Error:", error);

      setError(
        error.message || "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE CATEGORY
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

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete category."
        );
      }

      await fetchCategories();
    } catch (error) {
      console.error("Delete Category Error:", error);

      setError(
        error.message || "Unable to delete category."
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
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

      {/* MAIN CONTENT */}

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
                onChange={(e) => setSearch(e.target.value)}
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

            /* EMPTY */

            <div className="bg-white border border-[#E1D7C7] py-20 text-center">

              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923]">
                No Categories Found
              </h2>

              <p className="mt-2 text-gray-500 text-sm">
                Click "Add Category" to create one.
              </p>

            </div>

          ) : (

            /* CATEGORY GRID */

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {filteredCategories.map((category, index) => (

                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-[#E1D7C7] p-6 shadow-sm"
                >

                  {/* TOP */}

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
                        category.status === "Active"
                          ? "px-3 py-1.5 text-xs bg-green-50 text-green-600"
                          : "px-3 py-1.5 text-xs bg-gray-100 text-gray-500"
                      }
                    >
                      {category.status}
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 text-sm text-gray-500 leading-6 min-h-[48px]">
                    {category.description ||
                      "No description added."}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-6 pt-5 border-t border-[#EDE7DC] flex gap-3">

                    <button
                      onClick={() =>
                        openEditModal(category)
                      }
                      className="flex-1 py-2.5 border border-[#D9CCB5] text-[#5C5146] hover:border-[#B58A4A] hover:text-[#B58A4A] transition flex items-center justify-center gap-2 text-sm"
                    >
                      <HiOutlinePencil />

                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(category)
                      }
                      className="w-11 border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
                      title="Delete category"
                    >
                      <HiOutlineTrash />
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>
          )}

        </div>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-5"
            onClick={closeModal}
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
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#F5F1E8] shadow-2xl"
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
                  onClick={closeModal}
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
                      setDescription(e.target.value);
                      setError("");
                    }}
                    rows={4}
                    placeholder="Enter category description..."
                    className="w-full px-4 py-3.5 bg-white border border-[#D9CCB5] focus:border-[#B58A4A] outline-none text-sm resize-none"
                  />

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