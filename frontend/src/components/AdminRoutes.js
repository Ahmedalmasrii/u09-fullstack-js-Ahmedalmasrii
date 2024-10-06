import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Använd AuthContext

const AdminRoute = ({ children }) => {
  const { user } = useAuth(); // Får tillgång till user från AuthContext

  // Kontrollerar om användaren är admin
  return user && user.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
