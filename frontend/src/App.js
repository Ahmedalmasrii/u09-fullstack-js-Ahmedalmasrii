import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import ContactPage from "./pages/contactPage";
import OffersPage from "./pages/OffersPage";

import ServicesPage from "./pages/ServicesPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/BookingPage";
import Footer from "./components/Footer";

import AdminRoute from "./components/AdminRoutes";

import { AuthProvider } from "./components/AuthContext"; 
import PrivateRoute from "./components/PrivateRoute"; 

// Registrerar Service Worker
if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registrerad med scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker-registrering misslyckades:", error);
        });
    });
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          
          {" "}
            {/* Ny route */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route
              path="/services/:serviceId"
              element={<ServicesPage />}
            />{" "}
            {/* Dynamisk route */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
