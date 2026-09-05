import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  HiOutlineCollection,
  HiOutlineViewGrid,
  HiOutlineMail,
  
  HiOutlinePlus,
  HiOutlineArrowRight,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL =
  "http://localhost:5000/api/dashboard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [dashboardData, setDashboardData] =
    useState({
      stats: {
        totalSculptures: 0,
        totalCategories: 0,
        galleryImages: 0,
        totalEnquiries: 0,
        activeSculptures: 0,
        featuredSculptures: 0,
        totalServices: 0,
        activeServices: 0,
        newEnquiries: 0,
      },

      recentSculptures: [],

      recentEnquiries: [],
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        API_URL
      );

      const data =
        await response.json();

      console.log(
        "DASHBOARD API RESPONSE:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to load dashboard data."
        );
      }

      setDashboardData({
        stats: {
          totalSculptures:
            Number(
              data.stats?.totalSculptures ||
                0
            ),

          totalCategories:
            Number(
              data.stats?.totalCategories ||
                0
            ),

          galleryImages:
            Number(
              data.stats?.galleryImages ||
                0
            ),

          totalEnquiries:
            Number(
              data.stats?.totalEnquiries ||
                0
            ),

          activeSculptures:
            Number(
              data.stats?.activeSculptures ||
                0
            ),

          featuredSculptures:
            Number(
              data.stats?.featuredSculptures ||
                0
            ),

          totalServices:
            Number(
              data.stats?.totalServices ||
                0
            ),

          activeServices:
            Number(
              data.stats?.activeServices ||
                0
            ),

          newEnquiries:
            Number(
              data.stats?.newEnquiries ||
                0
            ),
        },

        recentSculptures:
          Array.isArray(
            data.recentSculptures
          )
            ? data.recentSculptures
            : [],

        recentEnquiries:
          Array.isArray(
            data.recentEnquiries
          )
            ? data.recentEnquiries
            : [],
      });
    } catch (error) {
      console.error(
        "DASHBOARD ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      title: "Total Sculptures",

      value:
        dashboardData.stats
          .totalSculptures,

      icon: HiOutlineCollection,

      description:
        "Sculptures in catalog",
    },

    {
      title: "Categories",

      value:
        dashboardData.stats
          .totalCategories,

      icon: HiOutlineViewGrid,

      description:
        "Categories available",
    },



    {
      title: "Enquiries",

      value:
        dashboardData.stats
          .totalEnquiries,

      icon: HiOutlineMail,

      description:
        "Customer enquiries",
    },
  ];

  // =====================================================
  // RECENT SCULPTURES
  // =====================================================

  const recentSculptures =
    dashboardData.recentSculptures;

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return "—";
    }

    return `₹${Number(
      price
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {
    if (status === "Active") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Inactive") {
      return "bg-red-50 text-red-500";
    }

    return "bg-gray-50 text-gray-500";
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="
        min-h-screen
        bg-[#F5F1E8]
        font-['Outfit']
      ">

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="
          lg:ml-[280px]
          min-h-screen
        ">

          <AdminNavbar
            setIsOpen={setSidebarOpen}
            title="Dashboard"
          />

          <div className="
            min-h-[calc(100vh-80px)]
            flex
            items-center
            justify-center
            p-6
          ">

            <div className="
              text-center
            ">

              <div className="
                w-12
                h-12
                border-4
                border-[#D9CCB5]
                border-t-[#B58A4A]
                rounded-full
                animate-spin
                mx-auto
              " />

              <p className="
                mt-4
                text-gray-500
              ">
                Loading dashboard...
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="
      min-h-screen
      bg-[#F5F1E8]
      font-['Outfit']
    ">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="
        lg:ml-[280px]
        min-h-screen
      ">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <AdminNavbar
          setIsOpen={setSidebarOpen}
          title="Dashboard"
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="
          p-5
          sm:p-8
          lg:p-10
        ">

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
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
                bg-red-50
                border
                border-red-200
                p-4
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div className="
                flex
                items-center
                gap-3
              ">

                <HiOutlineExclamationCircle
                  className="
                    text-xl
                    text-red-500
                    shrink-0
                  "
                />

                <p className="
                  text-sm
                  text-red-600
                ">
                  {error}
                </p>

              </div>

              <button
                type="button"
                onClick={fetchDashboard}
                className="
                  px-4
                  py-2
                  bg-red-500
                  text-white
                  text-sm
                  flex
                  items-center
                  gap-2
                  hover:bg-red-600
                "
              >
                <HiOutlineRefresh />
                Retry
              </button>

            </motion.div>
          )}

          {/* =================================================
              WELCOME
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

            <p className="
              text-[#B58A4A]
              uppercase
              tracking-[4px]
              text-xs
              mb-2
            ">
              Welcome Back
            </p>

            <h1 className="
              font-['Cormorant_Garamond']
              text-4xl
              sm:text-5xl
              font-semibold
              text-[#2F2923]
            ">
              KASA LUXE Overview
            </h1>

            <p className="
              mt-2
              text-gray-500
              max-w-2xl
              text-sm
              sm:text-base
            ">
              Manage your sculptures,
              categories, services and
              customer enquiries from one
              place.
            </p>

          </motion.div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-10
          ">

            {stats.map(
              (stat, index) => {
                const Icon =
                  stat.icon;

                return (
                  <motion.div
                    key={stat.title}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.1,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      bg-white
                      border
                      border-[#E1D7C7]
                      p-6
                      shadow-sm
                      hover:shadow-lg
                      transition-shadow
                      duration-300
                    "
                  >

                    <div className="
                      flex
                      items-start
                      justify-between
                    ">

                      <div>

                        <p className="
                          text-sm
                          text-gray-500
                        ">
                          {stat.title}
                        </p>

                        <h3 className="
                          mt-2
                          font-['Cormorant_Garamond']
                          text-4xl
                          font-semibold
                          text-[#2F2923]
                        ">
                          {stat.value}
                        </h3>

                      </div>

                      <div className="
                        w-12
                        h-12
                        bg-[#F5F1E8]
                        text-[#B58A4A]
                        flex
                        items-center
                        justify-center
                        rounded-full
                      ">

                        <Icon className="
                          text-2xl
                        " />

                      </div>

                    </div>

                    <p className="
                      mt-4
                      text-xs
                      text-gray-400
                    ">
                      {stat.description}
                    </p>

                  </motion.div>
                );
              }
            )}

          </div>

          {/* =================================================
              LIVE SUMMARY
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              mb-10
            "
          >

            <SummaryCard
              title="Active Sculptures"
              value={
                dashboardData.stats
                  .activeSculptures
              }
            />

            <SummaryCard
              title="Featured Sculptures"
              value={
                dashboardData.stats
                  .featuredSculptures
              }
            />

            <SummaryCard
              title="Total Services"
              value={
                dashboardData.stats
                  .totalServices
              }
            />

            <SummaryCard
              title="New Enquiries"
              value={
                dashboardData.stats
                  .newEnquiries
              }
            />

          </motion.div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            className="mb-10"
          >

            <h2 className="
              font-['Cormorant_Garamond']
              text-3xl
              font-semibold
              text-[#2F2923]
            ">
              Quick Actions
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
              mb-5
            ">
              Manage your website content
              quickly.
            </p>

            <div className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
            ">

              {/* ADD SCULPTURE */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/sculptures/add"
                  )
                }
                className="
                  bg-[#111111]
                  text-white
                  p-6
                  flex
                  items-center
                  justify-between
                  group
                  hover:bg-[#B58A4A]
                  transition-all
                  duration-300
                  text-left
                "
              >

                <div>

                  <HiOutlinePlus className="
                    text-3xl
                    text-[#B58A4A]
                    group-hover:text-white
                    mb-3
                  " />

                  <h3 className="
                    font-['Cormorant_Garamond']
                    text-2xl
                    font-semibold
                  ">
                    Add Sculpture
                  </h3>

                  <p className="
                    text-sm
                    text-gray-400
                    group-hover:text-white/80
                    mt-1
                  ">
                    Add a new sculpture to
                    your collection.
                  </p>

                </div>

                <HiOutlineArrowRight className="
                  text-2xl
                  group-hover:translate-x-2
                  transition-transform
                " />

              </button>

              {/* MANAGE SCULPTURES */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/sculptures"
                  )
                }
                className="
                  bg-white
                  border
                  border-[#E1D7C7]
                  p-6
                  flex
                  items-center
                  justify-between
                  group
                  hover:border-[#B58A4A]
                  transition-all
                  duration-300
                  text-left
                "
              >

                <div>

                  <HiOutlineCollection className="
                    text-3xl
                    text-[#B58A4A]
                    mb-3
                  " />

                  <h3 className="
                    font-['Cormorant_Garamond']
                    text-2xl
                    font-semibold
                    text-[#2F2923]
                  ">
                    Manage Sculptures
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-1
                  ">
                    View and manage your
                    sculpture catalog.
                  </p>

                </div>

                <HiOutlineArrowRight className="
                  text-2xl
                  text-[#B58A4A]
                  group-hover:translate-x-2
                  transition-transform
                " />

              </button>

              {/* VIEW ENQUIRIES */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/enquiries"
                  )
                }
                className="
                  bg-white
                  border
                  border-[#E1D7C7]
                  p-6
                  flex
                  items-center
                  justify-between
                  group
                  hover:border-[#B58A4A]
                  transition-all
                  duration-300
                  text-left
                "
              >

                <div>

                  <HiOutlineMail className="
                    text-3xl
                    text-[#B58A4A]
                    mb-3
                  " />

                  <h3 className="
                    font-['Cormorant_Garamond']
                    text-2xl
                    font-semibold
                    text-[#2F2923]
                  ">
                    View Enquiries
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-1
                  ">
                    Check customer enquiries
                    and requests.
                  </p>

                </div>

                <HiOutlineArrowRight className="
                  text-2xl
                  text-[#B58A4A]
                  group-hover:translate-x-2
                  transition-transform
                " />

              </button>

            </div>

          </motion.div>

          {/* =================================================
              RECENT SCULPTURES
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              shadow-sm
              mb-10
            "
          >

            {/* HEADER */}

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
              justify-between
              gap-3
            ">

              <div>

                <h2 className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  font-semibold
                  text-[#2F2923]
                ">
                  Recent Sculptures
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Recently added sculptures.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/sculptures"
                  )
                }
                className="
                  text-sm
                  text-[#B58A4A]
                  hover:text-[#8A642F]
                  transition
                "
              >
                View All →
              </button>

            </div>

            {/* TABLE */}

            {recentSculptures.length >
            0 ? (

              <div className="
                overflow-x-auto
              ">

                <table className="
                  w-full
                  min-w-[850px]
                ">

                  <thead>

                    <tr className="
                      bg-[#F8F5EF]
                      text-left
                    ">

                      <th className="
                        px-6
                        py-4
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
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Price
                      </th>

                      <th className="
                        px-6
                        py-4
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                      ">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {recentSculptures.map(
                      (sculpture) => (

                        <tr
                          key={
                            sculpture.id
                          }
                          className="
                            border-t
                            border-[#EEE7DA]
                            hover:bg-[#FCFAF6]
                            transition
                          "
                        >

                          <td className="
                            px-6
                            py-5
                          ">

                            <div>

                              <p className="
                                font-medium
                                text-[#2F2923]
                              ">
                                {
                                  sculpture.name
                                }
                              </p>

                              <p className="
                                mt-1
                                text-xs
                                text-gray-400
                              ">
                                Added{" "}
                                {formatDate(
                                  sculpture.created_at
                                )}
                              </p>

                            </div>

                          </td>

                          <td className="
                            px-6
                            py-5
                            text-gray-600
                          ">
                            {
                              sculpture.category ||
                              sculpture.category_name ||
                              "—"
                            }
                          </td>

                          <td className="
                            px-6
                            py-5
                            text-gray-600
                          ">
                            {
                              sculpture.material ||
                              "—"
                            }
                          </td>

                          <td className="
                            px-6
                            py-5
                            text-gray-600
                          ">
                            {
                              sculpture.height ||
                              "—"
                            }
                          </td>

                          <td className="
                            px-6
                            py-5
                            text-gray-600
                            font-medium
                          ">
                            {formatPrice(
                              sculpture.price
                            )}
                          </td>

                          <td className="
                            px-6
                            py-5
                          ">

                            <span
                              className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ${getStatusClass(
                                  sculpture.status
                                )}
                              `}
                            >
                              {
                                sculpture.status ||
                                "Unknown"
                              }
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="
                py-16
                text-center
              ">

                <HiOutlineCollection className="
                  mx-auto
                  text-5xl
                  text-[#D9CCB5]
                " />

                <h3 className="
                  mt-4
                  font-['Cormorant_Garamond']
                  text-2xl
                  font-semibold
                  text-[#2F2923]
                ">
                  No Sculptures Yet
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-gray-500
                ">
                  Add your first sculpture
                  to see it here.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/admin/sculptures/add"
                    )
                  }
                  className="
                    mt-5
                    px-5
                    py-2.5
                    bg-[#B58A4A]
                    text-white
                    text-sm
                    hover:bg-[#967039]
                  "
                >
                  Add Sculpture
                </button>

              </div>

            )}

          </motion.div>

          {/* =================================================
              RECENT ENQUIRIES
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              shadow-sm
            "
          >

            {/* HEADER */}

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
              justify-between
              gap-3
            ">

              <div>

                <h2 className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  font-semibold
                  text-[#2F2923]
                ">
                  Recent Enquiries
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Latest customer enquiries.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/enquiries"
                  )
                }
                className="
                  text-sm
                  text-[#B58A4A]
                  hover:text-[#8A642F]
                  transition
                "
              >
                View All →
              </button>

            </div>

            {/* ENQUIRIES */}

            {dashboardData
              .recentEnquiries
              .length > 0 ? (

              <div>

                {dashboardData.recentEnquiries.map(
                  (
                    enquiry,
                    index
                  ) => (

                    <div
                      key={
                        enquiry.id
                      }
                      className="
                        px-5
                        sm:px-7
                        py-5
                        border-b
                        border-[#EEE7DA]
                        last:border-b-0
                        hover:bg-[#FCFAF6]
                        transition
                      "
                    >

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        justify-between
                        gap-4
                      ">

                        <div className="
                          min-w-0
                        ">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <div className="
                              w-10
                              h-10
                              shrink-0
                              bg-[#F5F1E8]
                              text-[#B58A4A]
                              rounded-full
                              flex
                              items-center
                              justify-center
                            ">
                              <HiOutlineMail />
                            </div>

                            <div>

                              <h3 className="
                                font-medium
                                text-[#2F2923]
                              ">
                                {
                                  enquiry.name
                                }
                              </h3>

                              <p className="
                                text-xs
                                text-gray-400
                                mt-1
                              ">
                                {
                                  enquiry.email ||
                                  enquiry.phone ||
                                  "No contact details"
                                }
                              </p>

                            </div>

                          </div>

                          <p className="
                            mt-3
                            text-sm
                            text-gray-600
                            line-clamp-2
                            sm:ml-[52px]
                          ">
                            {
                              enquiry.message
                            }
                          </p>

                        </div>

                        <div className="
                          sm:text-right
                          shrink-0
                        ">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium

                              ${
                                enquiry.status ===
                                "New"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-green-50 text-green-600"
                              }
                            `}
                          >
                            {
                              enquiry.status ||
                              "New"
                            }
                          </span>

                          <p className="
                            mt-2
                            text-xs
                            text-gray-400
                          ">
                            {formatDate(
                              enquiry.created_at
                            )}
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="
                py-16
                text-center
              ">

                <HiOutlineMail className="
                  mx-auto
                  text-5xl
                  text-[#D9CCB5]
                " />

                <h3 className="
                  mt-4
                  font-['Cormorant_Garamond']
                  text-2xl
                  font-semibold
                  text-[#2F2923]
                ">
                  No Enquiries Yet
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-gray-500
                ">
                  Customer enquiries will
                  appear here.
                </p>

              </div>

            )}

          </motion.div>

        </div>

      </main>

    </div>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        bg-white
        border
        border-[#E1D7C7]
        p-5
        shadow-sm
      "
    >

      <p className="
        text-xs
        uppercase
        tracking-[1px]
        text-gray-400
      ">
        {title}
      </p>

      <p className="
        mt-2
        font-['Cormorant_Garamond']
        text-3xl
        font-semibold
        text-[#2F2923]
      ">
        {value}
      </p>

    </motion.div>
  );
}