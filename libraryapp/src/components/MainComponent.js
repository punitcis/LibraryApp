import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const MainComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default MainComponent;
