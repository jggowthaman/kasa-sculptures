import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "./Components/Loader";
import Error404 from "./Pages/Error/Error404";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import ScrollToTop from "./Components/ScrollToTop";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Collections from "./Pages/Collections/Collections";
import Services from "./Pages/Services/Services";
import Contact from "./Pages/Contact/Contact";

import Gallery from "./Pages/Gallery/Gallery";
import ProductDetails from "./Pages/Gallery/ProductDetails";

// Admin
import AdminLogin from "./Pages/Admin/Login/AdminLogin";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import Sculptures from "./Pages/Admin/Sculptures/Sculptures";
import AddSculpture from "./Pages/Admin/Sculptures/AddSculpture";
import EditSculpture from "./Pages/Admin/Sculptures/EditSculpture";
import Categories from "./Pages/Admin/Categories/Categories";
import AdminServices from "./Pages/Admin/Services/AdminServices";
import Enquiries from "./Pages/Admin/Enquiries/Enquiries";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Check whether current page is an admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Don't show public loader on admin pages
  if (loading && !isAdminPage) {
    return <Loader />;
  }

  return (
    <>
      {/* Public Navbar */}
      {!isAdminPage && <Navbar />}

      {/* Reset scroll when route changes */}
      <ScrollToTop />

      <Routes>

        {/* ========================= */}
        {/* PUBLIC WEBSITE */}
        {/* ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/gallery/:productId"
          element={<ProductDetails />}
        />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        {/* Legal Pages */}

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />

        {/* ========================= */}
        {/* ADMIN */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
  path="/admin/sculptures"
  element={<Sculptures />}
/>

<Route
  path="/admin/sculptures/add"
  element={<AddSculpture />}
/>

<Route
  path="/admin/sculptures/edit/:id"
  element={<EditSculpture />}
/>

<Route
  path="/admin/categories"
  element={<Categories />}
/>

<Route
  path="/admin/services"
  element={<AdminServices />}
/>

<Route
  path="/admin/enquiries"
  element={<Enquiries />}
/>

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
          path="*"
          element={<Error404 />}
        />

      </Routes>

      {/* Public Scroll Button */}
      {!isAdminPage && <ScrollToTopButton />}

      {/* Public Footer */}
      {!isAdminPage && <Footer />}
    </>
  );
}