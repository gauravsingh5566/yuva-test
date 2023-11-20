import { api } from "api";
import { useGlobalContext } from "global/context";
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { CallMadeTwoTone, Dashboard, PersonRounded, SpeakerNotesSharp } from "@mui/icons-material";
import { Popup } from "layout/Popup";
import GotoTop from "layout/GotoTop";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useGlobalContext();
  const [usertype, setUsertype] = useState(2);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    Popup("loading");
    try {
      let userType = 0;
      const res = await api.post(`auth/login?type=${userType}`, {
        identifier: email,
        password,
      });
      if (res.status == 200) {
        setUser(res.data.user);
        setToken(res.data.jwt);
        if (location?.state?.nextRoute) {
          navigate(location?.state?.nextRoute);
          window.location.reload(true);
        } else {
          navigate("/dashboard/");
          window.location.reload(true);
        }
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error) {
        Swal.fire({
          width: 400,
          title: error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <GotoTop />
      {/* <!-- ========== Start Login ========== --> */}
      <div className="row justify-content-between g-0">
        <div className="col-12 col-lg-7">
          <div className="h-100 w-100 d-none d-lg-block min-vh-100" style={{ borderRadius: "0px 80px 80px 0px", overflow: "hidden", boxShadow: "inset 0 0 0 2000px rgb(0,0,0,0.5)" }}>
            <img src="https://glcloud.in/images/static/events/hansraj/img53.webp" alt="" className="w-100 h-100 fit-cover" />
          </div>
        </div>
        <div className="col-12 col-lg-5 py-5">
          <div className="container" style={{ maxWidth: 600 }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <img src="/logo.png" alt="logo" style={{ height: 50 }} />
              </div>
              <div>
                <h5>
                  Having Trouble <Link to={"/help"}>Get Help</Link>
                </h5>
              </div>
            </div>
            
            <Outlet context={[email, setEmail, password, setPassword, handlesubmit, setUsertype, usertype]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
