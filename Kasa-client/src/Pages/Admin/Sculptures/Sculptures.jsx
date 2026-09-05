import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineCollection,
  HiOutlinePhotograph,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = `${import.meta.env.VITE_API_URL}/api/sculptures`;

export default function Sculptures() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sculptures, setSculptures] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // FETCH SCULPTURES FROM BACKEND
  // =====================================================

  const fetchSculptures = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch sculptures"
        );
      }

      setSculptures(
        Array.isArray(data.sculptures)
          ? data.sculptures
          : []
      );
    } catch (err) {
      console.error("Fetch sculptures error:", err);

      setError(
        err.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchSculptures();
  }, []);

  // =====================================================
  // CREATE CATEGORY LIST FROM DATABASE
  // =====================================================

  const categories = [
    "All",
    ...new Set(
      sculptures
        .map((item) => item.category_name)
        .filter(Boolean)
    ),
  ];

  const statuses = [
    "All",
    "Active",
    "Inactive",
  ];

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredSculptures = sculptures.filter(
    (sculpture) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        sculpture.name
          ?.toLowerCase()
          .includes(searchValue) ||
        sculpture.category_name
          ?.toLowerCase()
          .includes(searchValue) ||
        sculpture.material
          ?.toLowerCase()
          .includes(searchValue) ||
        sculpture.height
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "All" ||
        sculpture.category_name === category;

      const matchesStatus =
        status === "All" ||
        sculpture.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    }
  );

  // =====================================================
  // DELETE SCULPTURE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sculpture?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete sculpture."
        );
      }

      // Remove immediately from UI
      setSculptures((prev) =>
        prev.filter(
          (sculpture) => sculpture.id !== id
        )
      );
    } catch (err) {
      console.error(
        "Delete sculpture error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete sculpture."
      );
    }
  };

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

    return `${import.meta.env.VITE_API_URL}/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  // =====================================================
  // COUNTS
  // =====================================================

  const activeCount = sculptures.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = sculptures.filter(
    (item) => item.status === "Inactive"
  ).length;

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-['Outfit']">

      {/* ================= SIDEBAR ================= */}

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* ================= MAIN ================= */}

      <main className="lg:ml-[280px] min-h-screen">

        {/* ================= NAVBAR ================= */}

        <AdminNavbar
          setIsOpen={setSidebarOpen}
          title="Sculptures"
        />

        {/* ================= CONTENT ================= */}

        <div className="p-5 sm:p-8 lg:p-10">

          {/* ================= PAGE HEADING ================= */}

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

            <div className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-5
            ">

              <div>

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
                  Sculptures
                </h1>

                <p className="
                  mt-2
                  text-gray-500
                  max-w-2xl
                  text-sm
                  sm:text-base
                ">
                  Manage your sculpture collection,
                  details, images and availability.
                </p>

              </div>

              {/* ADD SCULPTURE */}

              <motion.button
                type="button"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  navigate(
                    "/admin/sculptures/add"
                  )
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#B58A4A]
                  hover:bg-[#967039]
                  text-white
                  px-6
                  py-3.5
                  uppercase
                  tracking-[1.5px]
                  text-sm
                  transition-all
                  duration-300
                  shadow-sm
                "
              >

                <HiOutlinePlus className="text-xl" />

                Add Sculpture

              </motion.button>

            </div>

          </motion.div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="
              mb-6
              px-5
              py-4
              bg-red-50
              border
              border-red-200
              text-red-600
              text-sm
            ">
              {error}
            </div>
          )}

          {/* ================= STAT SUMMARY ================= */}

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            mb-7
          ">

            {/* TOTAL */}

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
                delay: 0.1,
              }}
              className="
                bg-white
                border
                border-[#E1D7C7]
                p-5
              "
            >

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              ">
                Total
              </p>

              <h2 className="
                mt-2
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-[#2F2923]
              ">
                {sculptures.length}
              </h2>

            </motion.div>

            {/* ACTIVE */}

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
                delay: 0.2,
              }}
              className="
                bg-white
                border
                border-[#E1D7C7]
                p-5
              "
            >

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              ">
                Active
              </p>

              <h2 className="
                mt-2
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-green-600
              ">
                {activeCount}
              </h2>

            </motion.div>

            {/* INACTIVE */}

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
                delay: 0.3,
              }}
              className="
                bg-white
                border
                border-[#E1D7C7]
                p-5
              "
            >

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              ">
                Inactive
              </p>

              <h2 className="
                mt-2
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-red-500
              ">
                {inactiveCount}
              </h2>

            </motion.div>

            {/* CATEGORIES */}

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
                delay: 0.4,
              }}
              className="
                bg-white
                border
                border-[#E1D7C7]
                p-5
              "
            >

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              ">
                Categories
              </p>

              <h2 className="
                mt-2
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-[#B58A4A]
              ">
                {Math.max(
                  categories.length - 1,
                  0
                )}
              </h2>

            </motion.div>

          </div>

          {/* ================= FILTERS ================= */}

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
              delay: 0.3,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              p-5
              mb-7
            "
          >

            <div className="
              flex
              items-center
              gap-2
              mb-5
            ">

              <HiOutlineFilter className="
                text-[#B58A4A]
                text-xl
              " />

              <h2 className="
                font-['Cormorant_Garamond']
                text-2xl
                font-semibold
                text-[#2F2923]
              ">
                Search & Filter
              </h2>

            </div>

            <div className="
              grid
              md:grid-cols-3
              gap-4
            ">

              {/* SEARCH */}

              <div className="relative">

                <HiOutlineSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#B58A4A]
                    text-xl
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search sculptures..."
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    bg-[#F8F5EF]
                    border
                    border-[#D9CCB5]
                    outline-none
                    text-sm
                    text-[#2F2923]
                    placeholder:text-gray-400
                    focus:border-[#B58A4A]
                    transition
                  "
                />

              </div>

              {/* CATEGORY */}

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  w-full
                  px-4
                  py-3
                  bg-[#F8F5EF]
                  border
                  border-[#D9CCB5]
                  outline-none
                  text-sm
                  text-[#2F2923]
                  focus:border-[#B58A4A]
                  transition
                "
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}

              </select>

              {/* STATUS */}

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  w-full
                  px-4
                  py-3
                  bg-[#F8F5EF]
                  border
                  border-[#D9CCB5]
                  outline-none
                  text-sm
                  text-[#2F2923]
                  focus:border-[#B58A4A]
                  transition
                "
              >

                {statuses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Status"
                      : item}
                  </option>
                ))}

              </select>

            </div>

          </motion.div>

          {/* ================= COLLECTION ================= */}

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
              duration: 0.7,
              delay: 0.4,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              shadow-sm
            "
          >

            {/* COLLECTION HEADER */}

            <div className="
              px-5
              sm:px-7
              py-5
              border-b
              border-[#E1D7C7]
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-2
            ">

              <div>

                <h2 className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  font-semibold
                  text-[#2F2923]
                ">
                  Sculpture Collection
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  {loading
                    ? "Loading..."
                    : `${filteredSculptures.length} sculpture${
                        filteredSculptures.length !== 1
                          ? "s"
                          : ""
                      } found`}
                </p>

              </div>

              <div className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
              ">

                <HiOutlineCollection className="
                  text-[#B58A4A]
                  text-xl
                " />

                {sculptures.length} Total

              </div>

            </div>

            {/* ================= LOADING ================= */}

            {loading && (
              <div className="
                py-20
                text-center
              ">

                <div className="
                  w-10
                  h-10
                  mx-auto
                  border-4
                  border-[#D9CCB5]
                  border-t-[#B58A4A]
                  rounded-full
                  animate-spin
                " />

                <p className="
                  mt-4
                  text-sm
                  text-gray-500
                ">
                  Loading sculptures...
                </p>

              </div>
            )}

            {/* ================= DESKTOP TABLE ================= */}

            {!loading && (
              <div className="hidden lg:block overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-[#F8F5EF]">

                      <th className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Sculpture
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Category
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Material
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Height
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Status
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-right
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredSculptures.map(
                      (sculpture, index) => (

                        <motion.tr
                          key={sculpture.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: index * 0.05,
                          }}
                          className="
                            border-t
                            border-[#EEE7DA]
                            hover:bg-[#FCFAF6]
                            transition
                          "
                        >

                          {/* SCULPTURE */}

                          <td className="
                            px-6
                            py-5
                          ">

                            <div className="
                              flex
                              items-center
                              gap-4
                            ">

                              <div className="
                                w-14
                                h-14
                                bg-[#F5F1E8]
                                border
                                border-[#E1D7C7]
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                              ">

                                {sculpture.image ? (

                                  <img
                                    src={getImageUrl(
                                      sculpture.image
                                    )}
                                    alt={
                                      sculpture.name
                                    }
                                    className="
                                      w-full
                                      h-full
                                      object-cover
                                    "
                                  />

                                ) : (

                                  <HiOutlinePhotograph className="
                                    text-2xl
                                    text-[#B58A4A]
                                  " />

                                )}

                              </div>

                              <div>

                                <p className="
                                  font-['Cormorant_Garamond']
                                  text-xl
                                  font-semibold
                                  text-[#2F2923]
                                ">
                                  {sculpture.name}
                                </p>

                                <p className="
                                  text-xs
                                  text-gray-400
                                  mt-1
                                ">
                                  ID #{sculpture.id}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* CATEGORY */}

                          <td className="px-6 py-5">

                            <span className="
                              inline-flex
                              px-3
                              py-1
                              bg-[#F5F1E8]
                              text-[#8A642F]
                              text-xs
                            ">
                              {sculpture.category_name ||
                                "Uncategorized"}
                            </span>

                          </td>

                          {/* MATERIAL */}

                          <td className="
                            px-6
                            py-5
                            text-sm
                            text-gray-600
                          ">
                            {sculpture.material ||
                              "Not specified"}
                          </td>

                          {/* HEIGHT */}

                          <td className="
                            px-6
                            py-5
                            text-sm
                            text-gray-600
                          ">
                            {sculpture.height ||
                              "Not specified"}
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={
                                sculpture.status ===
                                "Active"
                                  ? `
                                    inline-flex
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    bg-green-50
                                    text-green-600
                                  `
                                  : `
                                    inline-flex
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    bg-red-50
                                    text-red-500
                                  `
                              }
                            >
                              {sculpture.status}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td className="
                            px-6
                            py-5
                          ">

                            <div className="
                              flex
                              items-center
                              justify-end
                              gap-2
                            ">

                              {/* VIEW */}

                              <button
                                type="button"
                                title="View"
                                onClick={() =>
                                  navigate(
                                    `/gallery/${sculpture.id}`
                                  )
                                }
                                className="
                                  w-9
                                  h-9
                                  flex
                                  items-center
                                  justify-center
                                  border
                                  border-[#E1D7C7]
                                  text-gray-500
                                  hover:text-[#B58A4A]
                                  hover:border-[#B58A4A]
                                  transition
                                "
                              >
                                <HiOutlineEye className="text-lg" />
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                title="Edit"
                                onClick={() =>
                                  navigate(
                                    `/admin/sculptures/edit/${sculpture.id}`
                                  )
                                }
                                className="
                                  w-9
                                  h-9
                                  flex
                                  items-center
                                  justify-center
                                  border
                                  border-[#E1D7C7]
                                  text-gray-500
                                  hover:text-[#B58A4A]
                                  hover:border-[#B58A4A]
                                  transition
                                "
                              >
                                <HiOutlinePencil className="text-lg" />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    sculpture.id
                                  )
                                }
                                className="
                                  w-9
                                  h-9
                                  flex
                                  items-center
                                  justify-center
                                  border
                                  border-[#E1D7C7]
                                  text-gray-500
                                  hover:text-red-500
                                  hover:border-red-300
                                  transition
                                "
                              >
                                <HiOutlineTrash className="text-lg" />
                              </button>

                            </div>

                          </td>

                        </motion.tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* ================= MOBILE ================= */}

            {!loading && (
              <div className="
                lg:hidden
                divide-y
                divide-[#EEE7DA]
              ">

                {filteredSculptures.map(
                  (sculpture, index) => (

                    <motion.div
                      key={sculpture.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="p-5"
                    >

                      {/* TOP */}

                      <div className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      ">

                        <div className="
                          flex
                          items-center
                          gap-4
                        ">

                          <div className="
                            w-14
                            h-14
                            shrink-0
                            bg-[#F5F1E8]
                            border
                            border-[#E1D7C7]
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                          ">

                            {sculpture.image ? (

                              <img
                                src={getImageUrl(
                                  sculpture.image
                                )}
                                alt={
                                  sculpture.name
                                }
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                "
                              />

                            ) : (

                              <HiOutlinePhotograph className="
                                text-2xl
                                text-[#B58A4A]
                              " />

                            )}

                          </div>

                          <div>

                            <h3 className="
                              font-['Cormorant_Garamond']
                              text-xl
                              font-semibold
                              text-[#2F2923]
                            ">
                              {sculpture.name}
                            </h3>

                            <p className="
                              text-xs
                              text-gray-400
                              mt-1
                            ">
                              ID #{sculpture.id}
                            </p>

                          </div>

                        </div>

                        <span
                          className={
                            sculpture.status ===
                            "Active"
                              ? `
                                shrink-0
                                px-2.5
                                py-1
                                rounded-full
                                text-[10px]
                                font-medium
                                bg-green-50
                                text-green-600
                              `
                              : `
                                shrink-0
                                px-2.5
                                py-1
                                rounded-full
                                text-[10px]
                                font-medium
                                bg-red-50
                                text-red-500
                              `
                          }
                        >
                          {sculpture.status}
                        </span>

                      </div>

                      {/* DETAILS */}

                      <div className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        gap-4
                        mt-5
                        text-sm
                      ">

                        <div>

                          <p className="
                            text-[10px]
                            uppercase
                            tracking-wider
                            text-gray-400
                          ">
                            Category
                          </p>

                          <p className="
                            text-gray-600
                            mt-1
                          ">
                            {sculpture.category_name ||
                              "Not specified"}
                          </p>

                        </div>

                        <div>

                          <p className="
                            text-[10px]
                            uppercase
                            tracking-wider
                            text-gray-400
                          ">
                            Material
                          </p>

                          <p className="
                            text-gray-600
                            mt-1
                          ">
                            {sculpture.material ||
                              "Not specified"}
                          </p>

                        </div>

                        <div>

                          <p className="
                            text-[10px]
                            uppercase
                            tracking-wider
                            text-gray-400
                          ">
                            Height
                          </p>

                          <p className="
                            text-gray-600
                            mt-1
                          ">
                            {sculpture.height ||
                              "Not specified"}
                          </p>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="
                        flex
                        items-center
                        gap-2
                        mt-5
                        pt-4
                        border-t
                        border-[#EEE7DA]
                      ">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/gallery/${sculpture.id}`
                            )
                          }
                          className="
                            flex-1
                            py-2.5
                            border
                            border-[#D9CCB5]
                            text-gray-600
                            hover:text-[#B58A4A]
                            hover:border-[#B58A4A]
                            transition
                            text-xs
                            uppercase
                            tracking-wider
                          "
                        >
                          <HiOutlineEye className="
                            inline
                            mr-2
                            text-base
                          " />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/sculptures/edit/${sculpture.id}`
                            )
                          }
                          className="
                            flex-1
                            py-2.5
                            border
                            border-[#D9CCB5]
                            text-gray-600
                            hover:text-[#B58A4A]
                            hover:border-[#B58A4A]
                            transition
                            text-xs
                            uppercase
                            tracking-wider
                          "
                        >
                          <HiOutlinePencil className="
                            inline
                            mr-2
                            text-base
                          " />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              sculpture.id
                            )
                          }
                          className="
                            w-11
                            h-10
                            flex
                            items-center
                            justify-center
                            border
                            border-[#D9CCB5]
                            text-gray-500
                            hover:text-red-500
                            hover:border-red-300
                            transition
                          "
                        >
                          <HiOutlineTrash className="text-lg" />
                        </button>

                      </div>

                    </motion.div>
                  )
                )}

              </div>
            )}

            {/* ================= EMPTY STATE ================= */}

            {!loading &&
              filteredSculptures.length === 0 && (

                <div className="
                  py-20
                  px-5
                  text-center
                ">

                  <div className="
                    w-16
                    h-16
                    mx-auto
                    bg-[#F5F1E8]
                    rounded-full
                    flex
                    items-center
                    justify-center
                  ">

                    <HiOutlineCollection className="
                      text-3xl
                      text-[#B58A4A]
                    " />

                  </div>

                  <h3 className="
                    mt-5
                    font-['Cormorant_Garamond']
                    text-2xl
                    font-semibold
                    text-[#2F2923]
                  ">
                    No Sculptures Found
                  </h3>

                  <p className="
                    mt-2
                    text-sm
                    text-gray-500
                  ">
                    Try changing your search or filter.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-5
                      text-sm
                      text-[#B58A4A]
                      hover:text-[#8A642F]
                      transition
                    "
                  >
                    Clear Filters
                  </button>

                </div>
              )}

          </motion.div>

        </div>

      </main>

    </div>
  );
}