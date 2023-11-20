import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import * as yup from "yup";
import { Autocomplete, Box, FormHelperText } from "@mui/material";
import { api, apiJson } from "api";
import { pop2, Popup } from "layout/Popup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, OutlinedInput } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useError from "lib/errorResponse";
import VerficationEmailMessage from "pages/Auth/VerficationEmailMessage";
import { toast } from "react-toastify";
import SimpleCaptcha from "global/SimpleCaptcha";
import { useGoogleRecaptcha } from "hooks";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  confirm_email: yup
    .string()
    .oneOf([yup.ref("email"), null], "Email must match")
    .required("Confirm Email is Required"),
  dob: yup.string().required("Pin code is Required"),
  first_name: yup.string().max(100).required("First Name is Required"),
  last_name: yup.string().max(100).notRequired(),
  father_name: yup.string().max(100).notRequired(),
  instituteId: yup.string().required("Institute is Required"),
  contact: yup
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password is Required"),
});

const StudentOpenRegisterForm = () => {
  const { ReCaptchaHandler, ReCaptchaLoading } = useGoogleRecaptcha();
  const { user } = useParams();
  const [instituteList, setInstituteList] = useState([]);
  const [globalEmail, setGlobalEmail] = useState(null);
  const [globalPass, setGlobalPass] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  const { ErrorResponder } = useError();
  const fetchInstituteList = async () => {
    try {
      const res = await api("/public/institute-list");
      switch (res?.data?.status) {
        case "success":
          setInstituteList(res?.data?.result);
          break;
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user === "teacher" || user === "student") {
    } else {
      navigate("/error");
    }
  }, [user]);
  useEffect(() => {
    fetchInstituteList();
  }, []);
  // OTP Verification
  const [verificationMessage, setverificationMessage] = useState(false);
  // Password Show Hide Handler
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // End Password Show Hide
  // Main Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      dob: "2001-01-26",
      instituteId: "",
      father_name: "",
      last_name: "",
      contact: "",
      gender: "female",
      confirm_password: "",
      confirm_email: "",
    },
    validationSchema,
    onSubmit: async (values, action) => {
      const captchaReturn = await ReCaptchaHandler();
      if (captchaReturn) {
        delete values.confirm_email;
        const RegisterPayload = {
          ...values,
        };
        try {
          setSubmitState(true);
          const res = await apiJson.post("/register/student?userType=" + user, RegisterPayload);
          if (res) {
            setSubmitState(false);
          }
          switch (res?.data?.status) {
            case "success":
              toast?.success(res?.data?.message);
              setverificationMessage(true);
              break;
            case "warning":
              toast.warning(res?.data?.message);
              break;
            case "error":
              toast.error(res?.data?.message);
              break;
            default:
              break;
          }
        } catch (error) {
          setSubmitState(false);
          ErrorResponder(error);
        }
      } else {
        toast.error("Captcha Validation Failed Please reload and try Again");
      }
    },
  });
  // End Main Formik
  return (
    <>
      <div className="p-2 p-md-3 p-lg-4">
        {!verificationMessage ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-lg-6">
                <TextField fullWidth id="first_name" name="first_name" label="First Name" size="large" value={formik.values.first_name} onChange={formik.handleChange} error={formik.touched.first_name && Boolean(formik.errors.first_name)} helperText={formik.touched.first_name && formik.errors.first_name} />
              </div>
              <div className="col-12 col-lg-6">
                <TextField fullWidth id="last_name" name="last_name" label="Last Name" size="large" value={formik.values.last_name} onChange={formik.handleChange} error={formik.touched.last_name && Boolean(formik.errors.last_name)} helperText={formik.touched.last_name && formik.errors.last_name} />
              </div>
              <div className="col-12">
                <TextField fullWidth id="contact" name="contact" label="Mobile Number" size="large" className="rounded-0" value={formik.values.contact} onChange={formik.handleChange} error={formik.touched.contact && Boolean(formik.errors.contact)} helperText={formik.touched.contact && formik.errors.contact} />
              </div>
              <div className="col-12">
                <TextField fullWidth id="email" name="email" label="Email Address" size="large" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
              </div>
              <div className="col-12">
                <TextField fullWidth id="confirm_email" name="confirm_email" label="Confirm Email Address" size="large" InputLabelProps={{ shrink: true }} value={formik.values.confirm_email} onChange={formik.handleChange} onPaste={(e) => e.preventDefault()} error={formik.touched.confirm_email && Boolean(formik.errors.confirm_email)} helperText={formik.touched.confirm_email && formik.errors.confirm_email} />
              </div>
              <div className="col-12">
                <div className="text-dark">Search Your Institute ( search by entering name ).</div>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="institute-select"
                  inputValue={formik?.values?.instituteId}
                  onInputChange={(event, newValue) => {
                    formik?.setFieldValue("instituteId", newValue);
                  }}
                  options={instituteList}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <img loading="lazy" style={{ objectFit: "cover" }} className="rounded-circle  me-3" width="20" height={20} src={option.icon} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => <TextField value={formik?.values?.instituteId} {...params} label="Select Your Institute ( Write Name For Searching )" fullWidth />}
                />
              </div>
              <div className="col-12">
                <TextField fullWidth id="dob" name="dob" type="date" label="Date of Birth" size="large" max="2022-01-01" min="2007-01-01" value={formik.values.dob} onChange={formik.handleChange} error={formik.touched.dob && Boolean(formik.errors.dob)} helperText={formik.touched.dob && formik.errors.dob} />
              </div>
              <div className="col-12">
                <FormControl>
                  <FormLabel id="gender-label">Gender</FormLabel>
                  <RadioGroup aria-labelledby="gender-label" defaultValue={formik.values.gender} id="gender" name="gender" onChange={formik.handleChange} row>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-12 col-lg-6">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{formik.touched.password && formik.errors.password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-lg-6">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{formik.touched.confirm_password && formik.errors.confirm_password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <Button disabled={submitState && !ReCaptchaLoading} color="warning" variant="contained" className={submitState ? "py-3 bg-success" : "py-3"} size="large" fullWidth type="submit">
                  {submitState ? (
                    <div className="d-flex justify-content-around text-light">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">loading...</span>
                      </div>
                      <span className="text-light mx-3 text-capitalize">Submitting...</span>{" "}
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <VerficationEmailMessage globalEmail={globalEmail} globalPass={globalPass} />
        )}
      </div>
    </>
  );
};

export default StudentOpenRegisterForm;
