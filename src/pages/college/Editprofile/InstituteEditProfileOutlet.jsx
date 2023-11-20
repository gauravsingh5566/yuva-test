import React, { useState } from "react";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useError from "lib/errorResponse";

const InstituteEditProfile = () => {
  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  const [details, setDetails] = useState({});
  // fetchDetails
  const fetchDetails = async () => {
    if (token) {
      try {
        const res = await apiAuth.post(
          "/institute",
          {
            instituteId: userData.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setDetails(res.data.result[0]);
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  useEffect(() => {
    if (token) {
      fetchDetails();
    }
  }, [token]);

  return (
    <div className="container py-4">
      <div className="header">
        <h3 className="fs-3">Profile Settings</h3>
        <p>Here you can modify your details and preferences</p>
      </div>
      <div className="settings-navs">
        <NavLink to={"/setting/"} className={"d-inline-block"}>
          General
        </NavLink>
        <NavLink to={"/setting/infrastructure"} className={"d-inline-block"}>
          Infrastructure
        </NavLink>
        <NavLink to={"/setting/event"} className={"d-inline-block"}>
          Event
        </NavLink>
        <NavLink to={"/setting/account"} className={"d-inline-block"}>
          Accounts
        </NavLink>
      </div>
      <div className="mt-4">
        <Outlet context={[details, fetchDetails]} />
      </div>
    </div>
  );
};

export default InstituteEditProfile;
