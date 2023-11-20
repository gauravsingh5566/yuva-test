import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { VerifiedTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import { pop2 } from "layout/Popup";
import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import YuvaLoader from "pages/Forum/components/Loader/YuvaLoader";
import RegisterAsk from "./RegisterAsk";
import SimpleCaptcha from "global/SimpleCaptcha";

const MainLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useGlobalContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useParams();
  useEffect(() => {
    if (user?.length) {
      async function linkLogin() {
        setLoading(true);
        try {
          const res = await apiJson.post(`auth/linkLogin`, {
            user,
          });
          switch (res?.data?.status) {
            case "SUCCESS":
              setUser(res.data.user);
              setToken(res.data.jwt);
              window.location.replace("/dashboard/");
              break;
            case "ERROR":
              pop2.error({
                title: "Error while logging In",
                description: res?.data?.message,
                timer: 2000,
              });
              break;
            case "ONBOARD":
              setUser(res.data.user);
              setToken(res.data.jwt);
              window.location.replace("/dashboard/onboard");
              break;
            case "NOTFOUND":
              toast.dismiss();
              toast.warning("Account Not Found");
              break;
            case "WARNING":
              toast.warning(res?.data?.message);
              break;
            case "INVALID_TOKEN":
              toast.warning(res?.data?.message);
              break;
          }
          setLoading(false);
        } catch (err) {
          toast.error();
          toast.warning("Login failed please try again later");
          setLoading(false);
        }
      }
      linkLogin();
    }
  }, [user]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitState(true);
      const res = await apiJson.post(`auth/login`, {
        identifier: email,
        password,
      });
      if (res) {
        setSubmitState(false);
      }
      switch (res?.data?.status) {
        case "success":
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace("/dashboard/");
          break;
        case "error":
          toast.error(res?.data?.message);
          break;
        case "warning":
          toast.warning(res?.data?.message);
          break;
      }
      setLoading(false);
    } catch (error) {
      setSubmitState(false);
      if (error) {
        toast.error();
        toast.warning("Login failed please try again later");
        setLoading(false);
      }
    }
  };

  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const handleClose = () => setshowRegisterPopup(false);
  const handleShow = () => setshowRegisterPopup(true);
  return (
    <>
      <div className="font-ubd text-initial mb-2 mt-5">
        <h2 className="fs-3">Sign In</h2>
        <p className="text-dark"> Enter Your Credentials to Continue.</p>
      </div>
      <form onSubmit={handlesubmit} className="login-card mt-3">
        <div className="mb-3">
          <TextField type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Enter your Email ID" fullWidth required />
        </div>
        <div className="mb-1">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="mt-3">
          <Button disabled={submitState} type="submit" name="login-btn" id="login-btn" color="warning" className={submitState ? "rounded-3 bg-success" : "rounded-3"} variant="contained" fullWidth sx={{ py: 2, mt: 2 }}>
            {submitState ? (
              <div className="d-flex justify-content-around text-light">
                {" "}
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">loading...</span>
                </div>
                <span className="text-light mx-3 text-capitalize">Logging...</span>{" "}
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link to={`/forget-password`} className="text-end w-100">
            Forgot Password ?
          </Link>{" "}
          <br />
          {
            <>
              <span className="font-ubd text-initial">
                Do not have an account yet ? &nbsp;
                <a type="button" className="text-link" onClick={handleShow}>
                  Register Now
                </a>
              </span>
            </>
          }
        </div>
      </form>

      {showRegisterPopup && <RegisterAsk handleClose={handleClose} />}
      {loading && <YuvaLoader />}
    </>
  );
};

export default MainLoginForm;
