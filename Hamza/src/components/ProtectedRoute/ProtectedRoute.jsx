import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ isloggedIn, children }) {
  if (!isloggedIn) {
    return <Navigate to={"/sign-in"} replace />;
  }
  return children;
}

export default ProtectedRoute;                                                                                                  
