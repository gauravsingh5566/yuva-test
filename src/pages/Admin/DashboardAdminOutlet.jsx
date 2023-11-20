import { useGlobalContext } from "global/context";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowBackIosNewOutlined } from "@mui/icons-material";

const DashboardAdminOutlet = () => {
  const { adminRoles } = useGlobalContext();
  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };
  function handleClick(event) {
    event.preventDefault();
  }
  const { pathname } = useLocation();
  return (
    <div className="min-vh-100">
      <Outlet />
    </div>
  );
};

export default DashboardAdminOutlet;
