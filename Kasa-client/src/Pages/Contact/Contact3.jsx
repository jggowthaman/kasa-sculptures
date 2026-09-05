import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/enquiries";

export default function Contact3() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Minimum 3 characters";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.phone.trim()
      )
    ) {
      newErrors.phone =
        "Enter valid mobile number";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Invalid email";
    }

    // Service
    if (!formData.service) {
      newErrors.service =
        "Select a service";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message =
        "Message is required";
    } else if (
      formData.message.trim().length < 10
    ) {
      newErrors.message =
        "Minimum 10 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      // =================================================
      // SAVE ENQUIRY TO DATABASE
      // =================================================

      const enquiryData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),

        // Service is stored as subject
        subject: formData.service,

        message: formData.message.trim(),

        // General contact enquiry
        sculpture_id: null,
      };

      console.log(
        "SENDING ENQUIRY:",
        enquiryData
      );

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            enquiryData
          ),
        }
      );

      const data =
        await response.json();

      console.log(
        "ENQUIRY RESPONSE:",
        data
      );

      // =================================================
      // CHECK API RESPONSE
      // =================================================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to submit enquiry."
        );
      }

      // =================================================
      // WHATSAPP
      // =================================================

      const phoneNumber =
        "919944817224";

      const whatsappMessage = `
Hello KASA LUXE,

I would like to make an enquiry.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Service:
${formData.service}

Message:
${formData.message}

Thank You.
`;

      const whatsappUrl =
        `https://wa.me/${phoneNumber}` +
        `?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      // =================================================
      // OPEN WHATSAPP
      // =================================================

      window.open(
        whatsappUrl,
        "_blank"
      );

      // =================================================
      // SUCCESS
      // =================================================

      alert(
        "Enquiry submitted successfully! WhatsApp is opening."
      );

      // =================================================
      // RESET FORM
      // =================================================

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error(
        "ENQUIRY SUBMIT ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to submit enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="py-20 bg-[#111111]">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <p className="
              font-['Outfit']
              uppercase
              tracking-[6px]
              text-[#D4AF37]
              mb-5
              mt-5
            ">
              Send Enquiry
            </p>

            <h2 className="
              font-['Cormorant_Garamond']
              text-5xl
              md:text-6xl
              lg:text-7xl
              text-white
              font-semibold
              leading-tight
            ">
              Start Your

              <span className="
                text-[#D4AF37]
              ">
                {" "}
                Dream Project
              </span>
            </h2>

            <p className="
              mt-8
              font-['Cormorant_Garamond']
              italic
              text-2xl
              leading-10
              text-gray-300
            ">
              Fill out the enquiry form and
              our team will get in touch with
              you through WhatsApp to discuss
              your sculpture, temple
              architecture or custom project.
            </p>

          </motion.div>

          {/* =================================================
              FORM
          ================================================= */}

          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              bg-[#1B1B1B]
              rounded-2xl
              p-4
              shadow-2xl
              space-y-7
            "
          >

            {/* =================================================
                NAME
            ================================================= */}

            <div>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
                className="
                  w-full
                  bg-transparent
                  border
                  border-gray-600
                  rounded-lg
                  px-5
                  py-4
                  text-white
                  text-lg
                  focus:border-[#D4AF37]
                  outline-none
                  disabled:opacity-50
                "
              />

              {errors.name && (
                <p className="
                  text-red-400
                  mt-2
                ">
                  {errors.name}
                </p>
              )}

            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div>

              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
                maxLength={10}
                className="
                  w-full
                  bg-transparent
                  border
                  border-gray-600
                  rounded-lg
                  px-5
                  py-4
                  text-white
                  text-lg
                  focus:border-[#D4AF37]
                  outline-none
                  disabled:opacity-50
                "
              />

              {errors.phone && (
                <p className="
                  text-red-400
                  mt-2
                ">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
                className="
                  w-full
                  bg-transparent
                  border
                  border-gray-600
                  rounded-lg
                  px-5
                  py-4
                  text-white
                  text-lg
                  focus:border-[#D4AF37]
                  outline-none
                  transition-all
                  duration-300
                  disabled:opacity-50
                "
              />

              {errors.email && (
                <p className="
                  text-red-400
                  mt-2
                  text-sm
                ">
                  {errors.email}
                </p>
              )}

            </div>

            {/* =================================================
                SERVICE
            ================================================= */}

            <div>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={submitting}
                className="
                  w-full
                  bg-[#1B1B1B]
                  border
                  border-gray-600
                  rounded-lg
                  px-5
                  py-4
                  text-white
                  text-lg
                  focus:border-[#D4AF37]
                  outline-none
                  disabled:opacity-50
                "
              >

                <option value="">
                  Select Service
                </option>

                <option value="Stone Sculptures">
                  Stone Sculptures
                </option>

                <option value="Temple Architecture">
                  Temple Architecture
                </option>

                <option value="Custom Stone Carving">
                  Custom Stone Carving
                </option>

                <option value="Worldwide Export">
                  Worldwide Export
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              {errors.service && (
                <p className="
                  text-red-400
                  mt-2
                  text-sm
                ">
                  {errors.service}
                </p>
              )}

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <div>

              <textarea
                rows={6}
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                disabled={submitting}
                className="
                  w-full
                  bg-transparent
                  border
                  border-gray-600
                  rounded-lg
                  px-5
                  py-4
                  text-white
                  text-lg
                  resize-none
                  focus:border-[#D4AF37]
                  outline-none
                  transition-all
                  duration-300
                  disabled:opacity-50
                "
              />

              {errors.message && (
                <p className="
                  text-red-400
                  mt-2
                  text-sm
                ">
                  {errors.message}
                </p>
              )}

            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <motion.button
              whileHover={{
                scale: submitting
                  ? 1
                  : 1.03,
              }}
              whileTap={{
                scale: submitting
                  ? 1
                  : 0.98,
              }}
              type="submit"
              disabled={submitting}
              className="
                w-full
                bg-[#B58A4A]
                hover:bg-[#98723A]
                text-white
                py-3
                rounded-lg
                font-['Outfit']
                text-lg
                uppercase
                tracking-[3px]
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {submitting
                ? "Submitting..."
                : "Send Enquiry via WhatsApp"}
            </motion.button>

          </motion.form>

        </div>

      </div>

    </section>
  );
}