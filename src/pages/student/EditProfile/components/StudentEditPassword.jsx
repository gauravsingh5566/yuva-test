import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { CheckCircleOutlineOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { apiAuth } from "api";
import { FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import { Spinner } from "react-bootstrap";

const StudentEditPassword = () => {
  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  // password eye
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //Reset Password
  const passwordformik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object().shape({
      oldpassword: yup.string().required(),
      password: yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
        .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
        .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
        .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
      confirm_password: yup.string().oneOf([yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      toast.loading();
      setLoading(true);
      const formData = new FormData();
      formData.append("password", values.oldpassword);
      formData.append("newpassword", values.password);
      formData.append("type", userData.type);
      formData.append("email", userData.email);
      if (token) {
        try {
          const res = await apiAuth.post(`/auth/changepassword?id=${userData.id}`, formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            toast.dismiss();
            toast.success("Password Changed Successfully");
            resetForm();
            setLoading(false);
          }
        } catch (error) {
          ErrorResponder(error);
          setLoading(false);
        }
      }
    },
  });
  return (
    <>
      <div>
        <form onSubmit={passwordformik.handleSubmit} className="mt-5">
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Old Password</h5>
            </div>
            <div className="col">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                <OutlinedInput
                  id="oldpassword"
                  label="Old Password"
                  name="oldpassword"
                  type={showOldPassword ? "text" : "password"}
                  value={passwordformik.values.oldpassword}
                  onChange={passwordformik.handleChange}
                  error={passwordformik.touched.oldpassword && Boolean(passwordformik.errors.oldpassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowOldPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{passwordformik.touched.oldpassword && passwordformik.errors.oldpassword}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 mt-3 g-2">
            <div className="col">
              <h5>New Password</h5>
            </div>
            <div className="col">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={passwordformik.values.password}
                  onChange={passwordformik.handleChange}
                  error={passwordformik.touched.password && Boolean(passwordformik.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{passwordformik.touched.password && passwordformik.errors.password}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 mt-3 g-2">
            <div className="col">
              <h5>Confirm New Password</h5>
            </div>
            <div className="col">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                <OutlinedInput
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordformik.values.confirm_password}
                  onChange={passwordformik.handleChange}
                  error={passwordformik.touched.confirm_password && Boolean(passwordformik.errors.confirm_password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowConfirmPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{passwordformik.touched.confirm_password && passwordformik.errors.confirm_password}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div>
            <Button disabled={loading} startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />} color="success" variant="outlined" size="large" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default StudentEditPassword;
