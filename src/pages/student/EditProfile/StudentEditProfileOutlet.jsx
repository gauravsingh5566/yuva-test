import React, { useEffect, useState } from "react";
import { useGlobalContext } from "global/context";
import { apiAuth } from "api";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
const StudentEditProfile = () => {
  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  const [fullDetails, setFullDetails] = React.useState();
  async function fetchCountriesAndDesignation() {}
  const fetchDetails = async () => {
    toast.dismiss();
    toast.loading("Loading....");
    try {
      const res = await apiAuth.get("/student/detail", {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        toast.dismiss();
        setFullDetails(res.data.result[0]);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      // fetchDetails();
      // fetchCountriesAndDesignation();
    }
  }, [token]);
  return (
    <>
      <div className="container py-4">
        <div className="header">
          <h3 className="fs-3">Profile Settings</h3>
          <p>Here you can modify your details and preferences</p>
        </div>
        <div className="settings-navs">
          <NavLink to={"/setting/"} className={"d-inline-block me-2 mb-2"}>
            General
          </NavLink>
          <NavLink to={"/setting/event"} className={"d-inline-block me-2 mb-2"}>
            Event
          </NavLink>
          <NavLink to={"/setting/account"} className={"d-inline-block me-2 mb-2"}>
            Accounts
          </NavLink>
        </div>
        <div className="mt-4">
          <Outlet context={[userData, fullDetails, fetchDetails]} />
        </div>
      </div>
    </>
  );
};

export default StudentEditProfile;
