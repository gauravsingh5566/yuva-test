import React, { useState } from "react";
import { useOutletContext, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import { Popup } from "layout/Popup";

const StudentLogin_V2 = () => {
  const { setUser, setToken } = useGlobalContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const location = useLocation();
  const navigate = useNavigate();
  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    Popup("loading");
    try {
      const res = await apiJson.post(`v2/auth/login?type=0`, {
        identifier: email,
        password,
      });
      if (res.status == 200) {
        setUser(res.data.user);
        setToken(res.data.jwt);
        Popup("success", res.data.message);
        if (location?.state?.nextRoute) {
          navigate(location?.state?.nextRoute);
          window.location.reload();
        } else {
          navigate("/dashboard/");
          window.location.reload();
        }
      }
    } catch (error) {
      if (error) {
        Popup("error", error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="font-ubd text-initial mb-2 mt-4">
        <h2 className="fs-2">Sign In</h2>
        <div className="text-dark fs-6"> Enter Your Credentials to Continue.</div>
      </div>
      <form onSubmit={handlesubmit} className="login-card container py-5" style={{ maxWidth: "450px" }}>
        <p>{"Log in as an Student"}</p>
        <div className="mb-3">
          <TextField type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Enter your Email ID" fullWidth required />
        </div>
        <div className="mb-3">
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
        <div className="mt-3 text-center">
          <Button type="submit" name="login-btn" id="login-btn" color="warning" className="rounded-3" variant="contained" fullWidth sx={{ mt: 3, py: 2 }}>
            Login
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link to={`/forget-password`} className="text-end w-100">
            Forgot Password ?
          </Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default StudentLogin_V2;
