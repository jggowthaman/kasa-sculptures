import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePhotograph,
  HiOutlineX,
  HiOutlineCheck,
} from "react-icons/hi";

import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import AdminNavbar from "../../../Components/Admin/AdminNavbar";

const API_URL = "http://localhost:5000/api/services";
const SERVER_URL = "http://localhost:5000";

export default function AdminServices() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingService, setEditingService] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      status: "Active",
    });

  const [image, setImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [error, setError] =
    useState("");

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    return `${SERVER_URL}${
      imagePath.startsWith("/")
        ? ""
        : "/"
    }${imagePath}`;
  };

  // =====================================================
  // FETCH SERVICES
  // =====================================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        API_URL
      );

      const data =
        await response.json();

      console.log(
        "SERVICES RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch services."
        );
      }

      setServices(
        Array.isArray(data.services)
          ? data.services
          : []
      );
    } catch (err) {
      console.error(
        "FETCH SERVICES ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD SERVICES
  // =====================================================

  useEffect(() => {
    fetchServices();
  }, []);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      status: "Active",
    });

    setImage(null);
    setImagePreview(null);
    setError("");

    setModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title || "",
      description:
        service.description || "",
      status:
        service.status || "Active",
    });

    setImage(null);

    setImagePreview(
      service.image
        ? getImageUrl(service.image)
        : null
    );

    setError("");
    setModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingService(null);
    setImage(null);
    setImagePreview(null);
    setError("");
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5MB."
      );
      return;
    }

    setImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

    setError("");
  };

  // =====================================================
  // REMOVE SELECTED IMAGE
  // =====================================================

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Service title is required."
      );
      return;
    }

    if (!formData.description.trim()) {
      setError(
        "Service description is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data =
        new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "status",
        formData.status
      );

      if (image) {
        data.append(
          "image",
          image
        );
      }

      const url = editingService
        ? `${API_URL}/${editingService.id}`
        : API_URL;

      const method = editingService
        ? "PUT"
        : "POST";

      const response =
        await fetch(url, {
          method,
          body: data,
        });

      const result =
        await response.json();

      console.log(
        "SERVICE SAVE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save service."
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to save service."
        );
      }

      alert(
        editingService
          ? "Service updated successfully!"
          : "Service added successfully!"
      );

      closeModal();

      await fetchServices();
    } catch (err) {
      console.error(
        "SAVE SERVICE ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE SERVICE
  // =====================================================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setSaving(true);

      const response =
        await fetch(
          `${API_URL}/${deleteId}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete service."
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to delete service."
        );
      }

      setDeleteId(null);

      await fetchServices();

      alert(
        "Service deleted successfully!"
      );
    } catch (err) {
      console.error(
        "DELETE SERVICE ERROR:",
        err
      );

      alert(
        err.message ||
          "Unable to delete service."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RETURN
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
          title="Services"
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
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-5
              mb-8
            "
          >

            <div>

              <p className="
                text-[#B58A4A]
                uppercase
                tracking-[4px]
                text-xs
                mb-2
              ">
                KASA LUXE
              </p>

              <h1 className="
                font-['Cormorant_Garamond']
                text-4xl
                sm:text-5xl
                font-semibold
                text-[#2F2923]
              ">
                Services
              </h1>

              <p className="
                mt-2
                text-gray-500
                text-sm
                sm:text-base
              ">
                Manage the services displayed
                on your KASA LUXE website.
              </p>

            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3.5
                bg-[#B58A4A]
                hover:bg-[#967039]
                text-white
                uppercase
                tracking-[1.5px]
                text-sm
                transition
              "
            >
              <HiOutlinePlus
                className="text-xl"
              />

              Add Service
            </button>

          </motion.div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && !modalOpen && (
            <div className="
              mb-6
              p-4
              bg-red-50
              border
              border-red-200
              text-red-600
              text-sm
            ">
              {error}
            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="
              bg-white
              border
              border-[#E1D7C7]
              min-h-[350px]
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
                  mt-4
                  text-gray-500
                  text-sm
                ">
                  Loading services...
                </p>

              </div>

            </div>

          ) : services.length === 0 ? (

            /* =================================================
                EMPTY
            ================================================= */

            <motion.div
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
                min-h-[400px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-8
              "
            >

              <div className="
                w-20
                h-20
                bg-[#F5F1E8]
                rounded-full
                flex
                items-center
                justify-center
                mb-5
              ">

                <HiOutlinePhotograph
                  className="
                    text-4xl
                    text-[#B58A4A]
                  "
                />

              </div>

              <h2 className="
                font-['Cormorant_Garamond']
                text-3xl
                font-semibold
                text-[#2F2923]
              ">
                No Services Yet
              </h2>

              <p className="
                mt-2
                text-gray-500
                max-w-md
                text-sm
              ">
                Add your first KASA LUXE
                service to display it on
                your website.
              </p>

              <button
                type="button"
                onClick={openAddModal}
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
                Add First Service
              </button>

            </motion.div>

          ) : (

            /* =================================================
                SERVICES GRID
            ================================================= */

            <div className="
              grid
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
            ">

              {services.map(
                (service, index) => {

                  const imageUrl =
                    getImageUrl(
                      service.image
                    );

                  return (
                    <motion.div
                      key={service.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.05,
                      }}
                      className="
                        bg-white
                        border
                        border-[#E1D7C7]
                        overflow-hidden
                        group
                      "
                    >

                      {/* IMAGE */}

                      <div className="
                        relative
                        h-52
                        bg-[#F5F1E8]
                        overflow-hidden
                      ">

                        {imageUrl ? (

                          <img
                            src={imageUrl}
                            alt={
                              service.title
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition
                              duration-500
                            "
                          />

                        ) : (

                          <div className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                          ">

                            <HiOutlinePhotograph
                              className="
                                text-5xl
                                text-[#B58A4A]
                              "
                            />

                          </div>

                        )}

                        {/* STATUS */}

                        <span
                          className={`
                            absolute
                            top-4
                            right-4
                            px-3
                            py-1
                            text-xs
                            uppercase
                            tracking-[1px]
                            ${
                              service.status ===
                              "Active"
                                ? "bg-[#B58A4A] text-white"
                                : "bg-gray-500 text-white"
                            }
                          `}
                        >
                          {service.status}
                        </span>

                      </div>

                      {/* CONTENT */}

                      <div className="
                        p-6
                      ">

                        <h2 className="
                          font-['Cormorant_Garamond']
                          text-2xl
                          font-semibold
                          text-[#2F2923]
                        ">
                          {service.title}
                        </h2>

                        <p className="
                          mt-3
                          text-sm
                          text-gray-500
                          leading-6
                          line-clamp-3
                        ">
                          {
                            service.description
                          }
                        </p>

                        {/* ACTIONS */}

                        <div className="
                          mt-6
                          pt-5
                          border-t
                          border-[#E8DFD1]
                          flex
                          gap-3
                        ">

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                service
                              )
                            }
                            className="
                              flex-1
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              py-3
                              border
                              border-[#D9CCB5]
                              text-[#5C5146]
                              hover:border-[#B58A4A]
                              hover:text-[#B58A4A]
                              transition
                              text-sm
                            "
                          >
                            <HiOutlinePencil />

                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(
                                service.id
                              )
                            }
                            className="
                              w-12
                              py-3
                              border
                              border-red-200
                              text-red-500
                              hover:bg-red-500
                              hover:text-white
                              transition
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
                  );
                }
              )}

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {modalOpen && (
        <div className="
          fixed
          inset-0
          z-[100]
          bg-black/50
          flex
          items-center
          justify-center
          p-5
          overflow-y-auto
        ">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              w-full
              max-w-2xl
              bg-white
              shadow-2xl
              my-8
            "
          >

            {/* MODAL HEADER */}

            <div className="
              px-6
              sm:px-8
              py-5
              border-b
              border-[#E1D7C7]
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  text-[#B58A4A]
                  uppercase
                  tracking-[3px]
                  text-xs
                ">
                  KASA LUXE
                </p>

                <h2 className="
                  mt-1
                  font-['Cormorant_Garamond']
                  text-3xl
                  font-semibold
                  text-[#2F2923]
                ">
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-[#B58A4A]
                  transition
                "
              >
                <HiOutlineX
                  className="text-2xl"
                />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="
                p-6
                sm:p-8
                space-y-6
              "
            >

              {error && (
                <div className="
                  p-4
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  text-sm
                ">
                  {error}
                </div>
              )}

              {/* TITLE */}

              <div>

                <label className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-[#3D352D]
                ">
                  Service Name
                  <span className="
                    text-red-500
                    ml-1
                  ">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Stone Sculptures"
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
                  rows="6"
                  placeholder="Describe this service..."
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
                    resize-none
                  "
                />

              </div>

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
                  onChange={handleChange}
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
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

              {/* IMAGE */}

              <div>

                <label className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-[#3D352D]
                ">
                  Service Image
                </label>

                <input
                  id="serviceImage"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={
                    handleImageChange
                  }
                  className="hidden"
                />

                {imagePreview ? (

                  <div className="
                    relative
                    w-full
                    h-56
                    bg-[#F5F1E8]
                    overflow-hidden
                    border
                    border-[#D9CCB5]
                  ">

                    <img
                      src={imagePreview}
                      alt="Service preview"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={
                        removeImage
                      }
                      className="
                        absolute
                        top-3
                        right-3
                        w-9
                        h-9
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

                ) : (

                  <label
                    htmlFor="serviceImage"
                    className="
                      w-full
                      h-48
                      bg-[#FCFAF6]
                      border-2
                      border-dashed
                      border-[#D9CCB5]
                      hover:border-[#B58A4A]
                      flex
                      flex-col
                      items-center
                      justify-center
                      cursor-pointer
                      transition
                    "
                  >

                    <HiOutlinePhotograph
                      className="
                        text-4xl
                        text-[#B58A4A]
                      "
                    />

                    <p className="
                      mt-3
                      text-sm
                      text-[#5C5146]
                    ">
                      Click to upload image
                    </p>

                    <p className="
                      mt-1
                      text-xs
                      text-gray-400
                    ">
                      JPG, PNG or WEBP • Max 5MB
                    </p>

                  </label>

                )}

              </div>

              {/* BUTTONS */}

              <div className="
                pt-4
                border-t
                border-[#E1D7C7]
                flex
                flex-col-reverse
                sm:flex-row
                gap-3
                sm:justify-end
              ">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    px-6
                    py-3.5
                    border
                    border-[#D9CCB5]
                    text-[#5C5146]
                    hover:border-[#B58A4A]
                    hover:text-[#B58A4A]
                    transition
                    text-sm
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    px-7
                    py-3.5
                    bg-[#B58A4A]
                    hover:bg-[#967039]
                    text-white
                    transition
                    text-sm
                    uppercase
                    tracking-[1.5px]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >
                  {saving
                    ? "Saving..."
                    : editingService
                    ? "Update Service"
                    : "Add Service"}
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteId && (
        <div className="
          fixed
          inset-0
          z-[110]
          bg-black/50
          flex
          items-center
          justify-center
          p-5
        ">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              w-full
              max-w-md
              bg-white
              p-7
              shadow-2xl
            "
          >

            <div className="
              w-14
              h-14
              rounded-full
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              mx-auto
            ">
              <HiOutlineTrash
                className="text-2xl"
              />
            </div>

            <h2 className="
              mt-5
              text-center
              font-['Cormorant_Garamond']
              text-3xl
              font-semibold
              text-[#2F2923]
            ">
              Delete Service?
            </h2>

            <p className="
              mt-2
              text-center
              text-sm
              text-gray-500
              leading-6
            ">
              This action cannot be undone.
              The service will be permanently
              removed from the database.
            </p>

            <div className="
              mt-7
              flex
              gap-3
            ">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                disabled={saving}
                className="
                  flex-1
                  py-3
                  border
                  border-[#D9CCB5]
                  text-[#5C5146]
                  hover:border-[#B58A4A]
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={saving}
                className="
                  flex-1
                  py-3
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition
                  disabled:opacity-60
                "
              >
                {saving
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </motion.div>

        </div>
      )}

    </div>
  );
}