import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
