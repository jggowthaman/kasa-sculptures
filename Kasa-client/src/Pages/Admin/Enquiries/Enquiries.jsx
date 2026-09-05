import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineX,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = `${import.meta.env.VITE_API_URL}/api/enquiries`;

export default function Enquiries() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  // =====================================================
  // FETCH ENQUIRIES
  // =====================================================

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        API_URL
      );

      const data =
        await response.json();

      console.log(
        "ENQUIRIES API:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch enquiries."
        );
      }

      setEnquiries(
        Array.isArray(data.enquiries)
          ? data.enquiries
          : []
      );
    } catch (error) {
      console.error(
        "FETCH ENQUIRIES ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD ENQUIRIES
  // =====================================================

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredEnquiries =
    enquiries.filter((enquiry) => {
      const searchText =
        search.toLowerCase();

      const name =
        enquiry.name?.toLowerCase() || "";

      const email =
        enquiry.email?.toLowerCase() || "";

      const phone =
        enquiry.phone?.toLowerCase() || "";

      const service =
        enquiry.subject?.toLowerCase() || "";

      const message =
        enquiry.message?.toLowerCase() || "";

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        phone.includes(searchText) ||
        service.includes(searchText) ||
        message.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        enquiry.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to update status."
        );
      }

      // Update list
      setEnquiries((prev) =>
        prev.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status: newStatus,
              }
            : enquiry
        )
      );

      // Update opened enquiry
      if (
        selectedEnquiry &&
        selectedEnquiry.id === id
      ) {
        setSelectedEnquiry({
          ...selectedEnquiry,
          status: newStatus,
        });
      }
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to update status."
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    enquiry
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete the enquiry from ${enquiry.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${enquiry.id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to delete enquiry."
        );
      }

      setEnquiries((prev) =>
        prev.filter(
          (item) =>
            item.id !== enquiry.id
        )
      );

      if (
        selectedEnquiry &&
        selectedEnquiry.id ===
          enquiry.id
      ) {
        setSelectedEnquiry(null);
      }

      alert(
        "Enquiry deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE ENQUIRY ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to delete enquiry."
      );
    }
  };

  // =====================================================
  // WHATSAPP
  // =====================================================

  const openWhatsApp = (
    enquiry
  ) => {
    if (!enquiry.phone) {
      alert(
        "Phone number is not available."
      );
      return;
    }

    let phone =
      enquiry.phone.replace(
        /\D/g,
        ""
      );

    // India number
    if (phone.length === 10) {
      phone = `91${phone}`;
    }

    const whatsappMessage = `
Hello ${enquiry.name},

Thank you for contacting KASA LUXE.

Service:
${enquiry.subject || "General Enquiry"}

Message:
${enquiry.message}

Thank You.
`;

    const whatsappURL =
      `https://wa.me/${phone}` +
      `?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    window.open(
      whatsappURL,
      "_blank"
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
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
  // STATISTICS
  // =====================================================

  const totalEnquiries =
    enquiries.length;

  const newEnquiries =
    enquiries.filter(
      (enquiry) =>
        enquiry.status === "New"
    ).length;

  const readEnquiries =
    enquiries.filter(
      (enquiry) =>
        enquiry.status === "Read"
    ).length;

  const todayEnquiries =
    enquiries.filter((enquiry) => {
      if (!enquiry.created_at) {
        return false;
      }

      const enquiryDate =
        new Date(
          enquiry.created_at
        ).toDateString();

      const today =
        new Date().toDateString();

      return (
        enquiryDate === today
      );
    }).length;

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
            Loading enquiries...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // UI
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

        <AdminNavbar
          setIsOpen={setSidebarOpen}
          title="Enquiries"
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

            <p className="
              text-[#B58A4A]
              uppercase
              tracking-[4px]
              text-xs
              mb-2
            ">
              Customer Communication
            </p>

            <h1 className="
              font-['Cormorant_Garamond']
              text-4xl
              sm:text-5xl
              font-semibold
              text-[#2F2923]
            ">
              Enquiries
            </h1>

            <p className="
              mt-2
              text-gray-500
              text-sm
              sm:text-base
            ">
              View and manage enquiries
              received from your customers.
            </p>

          </motion.div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="
              mb-6
              p-4
              bg-red-50
              border
              border-red-200
              text-red-600
            ">
              {error}
            </div>
          )}

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            lg:gap-6
            mb-8
          ">

            <StatCard
              title="Total"
              value={totalEnquiries}
              icon={
                <HiOutlineChatAlt2 />
              }
            />

            <StatCard
              title="New"
              value={newEnquiries}
              icon={
                <HiOutlineMail />
              }
            />

            <StatCard
              title="Read"
              value={readEnquiries}
              icon={
                <HiOutlineCheckCircle />
              }
            />

            <StatCard
              title="Today"
              value={todayEnquiries}
              icon={
                <HiOutlineClock />
              }
            />

          </div>

          {/* =================================================
              SEARCH + FILTER
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
              delay: 0.1,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              p-5
              mb-6
            "
          >

            <div className="
              flex
              flex-col
              md:flex-row
              gap-4
              md:items-center
              md:justify-between
            ">

              {/* SEARCH */}

              <div className="
                relative
                w-full
                md:max-w-md
              ">

                <HiOutlineSearch className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#B58A4A]
                  text-xl
                " />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search enquiries..."
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
                    focus:border-[#B58A4A]
                  "
                />

              </div>

              {/* STATUS */}

              <div className="
                flex
                items-center
                gap-3
              ">

                <span className="
                  text-sm
                  text-gray-500
                ">
                  Status:
                </span>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="
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

                  <option value="All">
                    All
                  </option>

                  <option value="New">
                    New
                  </option>

                  <option value="Read">
                    Read
                  </option>

                </select>

              </div>

            </div>

          </motion.div>

          {/* =================================================
              TABLE
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
              delay: 0.2,
            }}
            className="
              bg-white
              border
              border-[#E1D7C7]
              shadow-sm
              overflow-hidden
            "
          >

            {/* DESKTOP HEADER */}

            <div className="
              hidden
              lg:grid
              grid-cols-[1.3fr_1.5fr_1.3fr_1fr_1fr_120px]
              gap-4
              px-6
              py-4
              bg-[#111111]
              text-white
              text-xs
              uppercase
              tracking-[1.5px]
            ">

              <span>
                Customer
              </span>

              <span>
                Contact
              </span>

              <span>
                Service
              </span>

              <span>
                Date
              </span>

              <span>
                Status
              </span>

              <span className="text-right">
                Actions
              </span>

            </div>

            {/* ROWS */}

            {filteredEnquiries.length >
            0 ? (

              <div>

                {filteredEnquiries.map(
                  (
                    enquiry,
                    index
                  ) => (

                    <motion.div
                      key={
                        enquiry.id
                      }
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index *
                          0.05,
                      }}
                      className="
                        border-b
                        border-[#EDE7DC]
                        last:border-b-0
                        hover:bg-[#FCFAF6]
                        transition
                      "
                    >

                      {/* DESKTOP */}

                      <div className="
                        hidden
                        lg:grid
                        grid-cols-[1.3fr_1.5fr_1.3fr_1fr_1fr_120px]
                        gap-4
                        items-center
                        px-6
                        py-5
                      ">

                        {/* CUSTOMER */}

                        <div>

                          <p className="
                            font-medium
                            text-[#2F2923]
                          ">
                            {
                              enquiry.name
                            }
                          </p>

                          <p className="
                            mt-1
                            text-xs
                            text-gray-400
                          ">
                            #
                            {
                              enquiry.id
                            }
                          </p>

                        </div>

                        {/* CONTACT */}

                        <div className="
                          space-y-1
                        ">

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            {
                              enquiry.email ||
                              "No email"
                            }
                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                          ">
                            {
                              enquiry.phone
                            }
                          </p>

                        </div>

                        {/* SERVICE */}

                        <div>

                          <p className="
                            text-sm
                            text-[#5C5146]
                          ">
                            {
                              enquiry.subject ||
                              "General Enquiry"
                            }
                          </p>

                          {enquiry.sculpture_name && (
                            <p className="
                              mt-1
                              text-xs
                              text-[#B58A4A]
                            ">
                              Sculpture:{" "}
                              {
                                enquiry.sculpture_name
                              }
                            </p>
                          )}

                        </div>

                        {/* DATE */}

                        <p className="
                          text-sm
                          text-gray-500
                        ">
                          {
                            formatDate(
                              enquiry.created_at
                            )
                          }
                        </p>

                        {/* STATUS */}

                        <StatusBadge
                          status={
                            enquiry.status
                          }
                        />

                        {/* ACTIONS */}

                        <div className="
                          flex
                          justify-end
                          gap-2
                        ">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEnquiry(
                                enquiry
                              )
                            }
                            title="View enquiry"
                            className="
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              border
                              border-[#D9CCB5]
                              text-[#5C5146]
                              hover:border-[#B58A4A]
                              hover:text-[#B58A4A]
                            "
                          >
                            <HiOutlineEye />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openWhatsApp(
                                enquiry
                              )
                            }
                            title="WhatsApp"
                            className="
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              bg-[#B58A4A]
                              text-white
                              hover:bg-[#967039]
                            "
                          >
                            <HiOutlineChatAlt2 />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                enquiry
                              )
                            }
                            title="Delete enquiry"
                            className="
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              border
                              border-red-100
                              text-red-400
                              hover:bg-red-50
                              hover:text-red-600
                            "
                          >
                            <HiOutlineTrash />
                          </button>

                        </div>

                      </div>

                      {/* MOBILE */}

                      <div className="
                        lg:hidden
                        p-5
                      ">

                        <div className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        ">

                          <div>

                            <p className="
                              text-xs
                              text-gray-400
                            ">
                              Customer
                            </p>

                            <h3 className="
                              mt-1
                              font-['Cormorant_Garamond']
                              text-2xl
                              font-semibold
                              text-[#2F2923]
                            ">
                              {
                                enquiry.name
                              }
                            </h3>

                          </div>

                          <StatusBadge
                            status={
                              enquiry.status
                            }
                          />

                        </div>

                        <div className="
                          mt-4
                          space-y-2
                        ">

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            {
                              enquiry.email ||
                              "No email"
                            }
                          </p>

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            {
                              enquiry.phone
                            }
                          </p>

                          <p className="
                            text-sm
                            text-[#5C5146]
                          ">
                            {
                              enquiry.subject ||
                              "General Enquiry"
                            }
                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                          ">
                            {
                              formatDate(
                                enquiry.created_at
                              )
                            }
                          </p>

                        </div>

                        <p className="
                          mt-4
                          text-sm
                          text-gray-600
                          line-clamp-3
                        ">
                          {
                            enquiry.message
                          }
                        </p>

                        <div className="
                          mt-5
                          pt-4
                          border-t
                          border-[#EDE7DC]
                          flex
                          gap-3
                        ">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEnquiry(
                                enquiry
                              )
                            }
                            className="
                              flex-1
                              py-2.5
                              border
                              border-[#D9CCB5]
                              text-[#5C5146]
                              flex
                              items-center
                              justify-center
                              gap-2
                            "
                          >
                            <HiOutlineEye />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openWhatsApp(
                                enquiry
                              )
                            }
                            className="
                              w-11
                              bg-[#B58A4A]
                              text-white
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <HiOutlineChatAlt2 />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                enquiry
                              )
                            }
                            className="
                              w-11
                              border
                              border-red-100
                              text-red-400
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <HiOutlineTrash />
                          </button>

                        </div>

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            ) : (

              <div className="
                py-20
                px-5
                text-center
              ">

                <HiOutlineChatAlt2 className="
                  mx-auto
                  text-5xl
                  text-[#B58A4A]
                " />

                <h3 className="
                  mt-4
                  font-['Cormorant_Garamond']
                  text-3xl
                  font-semibold
                  text-[#2F2923]
                ">
                  No Enquiries Found
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-gray-500
                ">
                  Try changing your
                  search or status filter.
                </p>

              </div>

            )}

          </motion.div>

        </div>

      </main>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedEnquiry && (

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
              z-[100]
              bg-black/60
              flex
              items-center
              justify-center
              p-5
              overflow-y-auto
            "
            onClick={() =>
              setSelectedEnquiry(null)
            }
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
              className="
                w-full
                max-w-xl
                bg-[#F5F1E8]
                shadow-2xl
                my-8
              "
            >

              {/* HEADER */}

              <div className="
                flex
                items-center
                justify-between
                px-6
                py-5
                bg-[#111111]
              ">

                <div>

                  <p className="
                    text-[#B58A4A]
                    uppercase
                    tracking-[3px]
                    text-[10px]
                  ">
                    Customer Enquiry
                  </p>

                  <h2 className="
                    mt-1
                    font-['Cormorant_Garamond']
                    text-3xl
                    font-semibold
                    text-white
                  ">
                    Enquiry Details
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedEnquiry(
                      null
                    )
                  }
                  className="
                    w-9
                    h-9
                    flex
                    items-center
                    justify-center
                    text-gray-300
                    hover:text-[#B58A4A]
                  "
                >
                  <HiOutlineX
                    className="text-2xl"
                  />
                </button>

              </div>

              {/* DETAILS */}

              <div className="
                p-6
                sm:p-8
              ">

                {/* CUSTOMER */}

                <div className="
                  flex
                  items-center
                  gap-4
                  pb-6
                  border-b
                  border-[#D9CCB5]
                ">

                  <div className="
                    w-14
                    h-14
                    bg-[#111111]
                    text-[#B58A4A]
                    flex
                    items-center
                    justify-center
                    text-2xl
                  ">
                    <HiOutlineUser />
                  </div>

                  <div>

                    <h3 className="
                      font-['Cormorant_Garamond']
                      text-3xl
                      font-semibold
                      text-[#2F2923]
                    ">
                      {
                        selectedEnquiry.name
                      }
                    </h3>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Enquiry #
                      {
                        selectedEnquiry.id
                      }
                    </p>

                  </div>

                </div>

                {/* CONTACT */}

                <div className="
                  grid
                  sm:grid-cols-2
                  gap-5
                  py-6
                  border-b
                  border-[#D9CCB5]
                ">

                  <DetailItem
                    icon={
                      <HiOutlineMail />
                    }
                    label="Email"
                    value={
                      selectedEnquiry.email ||
                      "Not provided"
                    }
                  />

                  <DetailItem
                    icon={
                      <HiOutlinePhone />
                    }
                    label="Phone"
                    value={
                      selectedEnquiry.phone
                    }
                  />

                  <DetailItem
                    icon={
                      <HiOutlineChatAlt2 />
                    }
                    label="Service"
                    value={
                      selectedEnquiry.subject ||
                      "General Enquiry"
                    }
                  />

                  <DetailItem
                    icon={
                      <HiOutlineCalendar />
                    }
                    label="Date"
                    value={formatDate(
                      selectedEnquiry.created_at
                    )}
                  />

                </div>

                {/* SCULPTURE */}

                {selectedEnquiry.sculpture_name && (
                  <div className="
                    py-5
                    border-b
                    border-[#D9CCB5]
                  ">

                    <DetailItem
                      icon={
                        <HiOutlineChatAlt2 />
                      }
                      label="Sculpture"
                      value={
                        selectedEnquiry.sculpture_name
                      }
                    />

                  </div>
                )}

                {/* MESSAGE */}

                <div className="py-6">

                  <p className="
                    text-xs
                    uppercase
                    tracking-[1.5px]
                    text-gray-400
                    mb-3
                  ">
                    Customer Message
                  </p>

                  <div className="
                    bg-white
                    border
                    border-[#E1D7C7]
                    p-5
                  ">

                    <p className="
                      text-sm
                      text-gray-600
                      leading-7
                      whitespace-pre-wrap
                    ">
                      {
                        selectedEnquiry.message
                      }
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <div className="mb-6">

                  <p className="
                    text-xs
                    uppercase
                    tracking-[1.5px]
                    text-gray-400
                    mb-3
                  ">
                    Update Status
                  </p>

                  <div className="
                    grid
                    grid-cols-2
                    gap-2
                  ">

                    {[
                      "New",
                      "Read",
                    ].map(
                      (status) => (

                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            updateStatus(
                              selectedEnquiry.id,
                              status
                            )
                          }
                          className={`
                            py-3
                            border
                            text-xs
                            uppercase
                            tracking-[1px]
                            transition

                            ${
                              selectedEnquiry.status ===
                              status
                                ? "border-[#B58A4A] bg-[#B58A4A] text-white"
                                : "border-[#D9CCB5] text-[#5C5146] hover:border-[#B58A4A]"
                            }
                          `}
                        >
                          {status}
                        </button>

                      )
                    )}

                  </div>

                </div>

                {/* WHATSAPP */}

                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      selectedEnquiry
                    )
                  }
                  className="
                    w-full
                    py-3.5
                    bg-[#B58A4A]
                    hover:bg-[#967039]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    mb-3
                  "
                >
                  <HiOutlineChatAlt2 />
                  Open WhatsApp
                </button>

                {/* CLOSE */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedEnquiry(
                      null
                    )
                  }
                  className="
                    w-full
                    py-3.5
                    border
                    border-[#D9CCB5]
                    text-[#5C5146]
                    hover:border-[#B58A4A]
                  "
                >
                  Close
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  icon,
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
        sm:p-6
        shadow-sm
      "
    >

      <div className="
        flex
        items-center
        justify-between
        gap-3
      ">

        <div>

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
            sm:text-4xl
            font-semibold
            text-[#2F2923]
          ">
            {value}
          </p>

        </div>

        <div className="
          w-11
          h-11
          sm:w-12
          sm:h-12
          bg-[#F5F1E8]
          text-[#B58A4A]
          flex
          items-center
          justify-center
          text-2xl
        ">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({
  status,
}) {
  const statusStyles = {
    New:
      "bg-blue-50 text-blue-600",

    Read:
      "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1.5
        text-xs
        font-medium
        whitespace-nowrap
        ${
          statusStyles[status] ||
          "bg-gray-100 text-gray-600"
        }
      `}
    >
      {status}
    </span>
  );
}

// =====================================================
// DETAIL ITEM
// =====================================================

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="
      flex
      gap-3
    ">

      <div className="
        w-10
        h-10
        shrink-0
        bg-[#111111]
        text-[#B58A4A]
        flex
        items-center
        justify-center
        text-lg
      ">
        {icon}
      </div>

      <div className="
        min-w-0
      ">

        <p className="
          text-xs
          uppercase
          tracking-[1px]
          text-gray-400
        ">
          {label}
        </p>

        <p className="
          mt-1
          text-sm
          text-[#3D352D]
          break-words
        ">
          {value}
        </p>

      </div>

    </div>
  );
}