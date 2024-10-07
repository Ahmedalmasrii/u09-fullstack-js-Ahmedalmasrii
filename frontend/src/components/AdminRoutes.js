import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
// Kontrollerar om användaren är admin
  return user && user.isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
