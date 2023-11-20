import { FilePresentTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { pop2, Popup } from "layout/Popup";
import { apiJson } from "api";
import { toast } from "react-toastify";
import { Box, Modal, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CheckCircle } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdminInstituteRegistration() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const captchaRef = useRef();
  const navigator = useNavigate();
  const [tnc, setTnc] = useState(false);
  const [state, setState] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const closeBtn = useRef();
  let [password, setPassword] = React.useState("");
  let [email, setEmail] = useState("");
  const [copiedLink, setCopiedLink] = React.useState(false);

  React.useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  }, [copiedLink]);

  const onSubmit = async (values, action) => {
    try {
      const registerto = await apiJson.post("/admin/institute-register", { ...values, pincode: String(values.pincode) });
      if (registerto.status === 200) {
        setEmail(registerto?.data?.result?.username);
        setPassword(registerto?.data?.result?.password);
        handleOpen();
        action.resetForm();
        toast.dismiss();
        toast.success("Registered Successfully");
        closeBtn.current.click();
      }
    } catch (error) {
      if (error?.response?.status === 400 || error?.response?.status === 409) {
        console.error(error);
        toast.warning(error?.response?.data?.message);
      }
    }
  };
  const { values, errors, touched, handleSubmit, handleChange, submitForm } = useFormik({
    initialValues: {
      title: "Mr.",
      first_name: "",
      last_name: "",
      institute_name: "",
      institute_address: "",
      state: "",
      district: "",
      pincode: "",
      email: "",
      confirm_email: "",
      contact: "",
      sendemail: false,
    },
    // validationSchema: instituteregisterSchema,
    onSubmit,
  });
  const [states, setStates] = useState([]);
  const fetchStates = async () => {
    try {
      const res = await apiJson.get("/public/stateanddistrict");
      if (res.status === 200) {
        setStates(res.data.data);
      }
    } catch (error) {
      Popup("error", "Error Geting States", "Please try again later or reload the website");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStates();
  }, []);
  const setActiveState = (id) => {
    setState(states.findIndex((x) => x.state === id));
  };
  return (
    <div className="h-100">
      <Button type="button" variant="outlined" color="success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="text-capitalize  rounded-3 h-100 px-4 ">
        <FilePresentTwoTone />
        Insitute&nbsp;Register
      </Button>
      <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Insitute Register
              </h5>
              <button type="button" ref={closeBtn} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* <GotoTop /> */}
              <div className="container">
                <div className="row">
                  <div className="col">
                    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: "1100px" }}>
                      <div className="row g-3 gy-2 text-dark fw-semibold">
                        <div className="col-4 col-lg-2">
                          <span className="form-label">Title </span>
                          <select required id="title" value={values.title} onChange={handleChange} className={errors.title && touched.title ? "form-select py-3 ps-3 pe-3 border-danger" : "form-select py-3 ps-3 pe-3"}>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                        </div>
                        <div className="col-8 col-lg-5">
                          <span className="form-label">
                            First Name <b className="text-danger">*</b>
                          </span>
                          <input required type="text" id="first_name" value={values.first_name} onChange={handleChange} className={errors.first_name && touched.first_name ? "form-control border-danger" : "form-control"} />
                          {errors.first_name && touched.first_name && <span className="text-danger fnt-small">{errors.first_name}</span>}
                        </div>
                        <div className="col-12 col-md-12 col-lg-5">
                          <span className="form-label">
                            Last Name <b className="text-danger">*</b>
                          </span>
                          <input required type="text" id="last_name" value={values.last_name} onChange={handleChange} className={errors.last_name && touched.last_name ? "form-control border-danger" : "form-control"} />
                          {touched.last_name && <span className="text-danger fnt-small">{errors.last_name}</span>}
                        </div>

                        <div className="col-12 ">
                          <span className="form-label">
                            Institution/College Name where the event will be organised <b className="text-danger">*</b>
                          </span>
                          <input required type="text" id="institute_name" value={values.institute_name} onChange={handleChange} className={errors.institute_name && touched.institute_name ? "form-control border-danger" : "form-control"} />
                          {errors.institute_name && touched.institute_name && <span className="text-danger fnt-small">{errors.institute_name}</span>}
                        </div>
                        <div className="col-12">
                          <span className="form-label">
                            Institution/College Address <b className="text-danger">*</b>
                          </span>
                          <input required type="text" id="institute_address" value={values.institute_address} onChange={handleChange} className={errors.institute_address && touched.institute_address ? "form-control border-danger" : "form-control"} />
                          {errors.institute_address && touched.institute_address && <span className="text-danger fnt-small">{errors.institute_address}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            State <b className="text-danger">*</b>
                          </span>
                          <select
                            required
                            id="state"
                            name="state"
                            onChange={handleChange}
                            onChangeCapture={(e) => {
                              setActiveState(e.target.value);
                            }}
                            className={touched.state && errors.state ? "form-control border-danger" : "form-control"}
                            type="text">
                            <option value={""}>--Select State--</option>
                            {states.map((state, i) => {
                              return (
                                <option key={i} value={state?.state}>
                                  {state?.state}
                                </option>
                              );
                            })}
                          </select>
                          {errors.state && touched.state && <span className="text-danger fnt-small">{errors.state}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            District <b className="text-danger">*</b>
                          </span>
                          <select required id="district" name="district" value={values.district} onChange={handleChange} className={errors.district && touched.district ? "form-control border-danger" : "form-control"} type="text">
                            <option value={""}>--Select District--</option>
                            {states[state]?.District.map((district, i) => {
                              return (
                                <option key={i} value={district.district}>
                                  {district.district}
                                </option>
                              );
                            })}
                          </select>
                          {errors.district && touched.district && <span className="text-danger fnt-small">{errors.district}</span>}
                        </div>
                        <div className="col-12 col-lg-4">
                          <span className="form-label">
                            Pincode <b className="text-danger">*</b>
                          </span>
                          <input required id="pincode" name="pincode" value={values.pincode} onChange={handleChange} className={errors.pincode && touched.pincode ? "form-control border-danger" : "form-control"} type="number" />
                          {errors.pincode && touched.pincode && <span className="text-danger fnt-small">{errors.pincode}</span>}
                        </div>
                        {/* contact Information  */}
                        <div className="col-12">
                          <hr className="my-4" />
                          <h5>Contact Information</h5>
                        </div>
                        <div className="col-12 col-lg-6">
                          <span className="form-label">
                            Email <b className="text-danger">*</b>
                          </span>
                          <input required id="email" name="email" value={values.email} onChange={handleChange} className={errors.email && touched.email ? "form-control border-danger" : "form-control"} type="email" />
                          {errors.email && touched.email && <span className="text-danger fnt-small">{errors.email}</span>}
                        </div>
                        <div className="col-12 col-lg-6">
                          <span className="form-label">
                            Confirm Email <b className="text-danger">*</b>
                          </span>
                          <input required id="confirm_email" name="confirm_email" value={values.confirm_email} onChange={handleChange} className={errors.confirm_email ? "form-control border-danger" : "form-control"} type="email" />
                          {errors.confirm_email && touched.confirm_email && <span className="text-danger fnt-small">{errors.confirm_email}</span>}
                        </div>
                        <div className="col-12">
                          <span className="form-label">
                            Contact Number <b className="text-danger">*</b>
                          </span>
                          <input required id="contact" value={values.contact} onChange={handleChange} className={errors.contact && touched.contact ? "form-control border-danger" : "form-control"} type="tel" />
                          {errors.contact && touched.contact && <span className="text-danger fnt-small">{errors.contact}</span>}
                        </div>

                        <div className="col-12 form-check">
                          <input class="form-check-input" onChange={handleChange} type="checkbox" value={values.sendemail} id="sendemail" />

                          <label class="form-check-label" htmlfor="semdemail">
                            Would you like to send a welcome mail on given email id.
                          </label>
                        </div>
                        {/* Model G20 Terms and Conditions * */}
                        <div className="col-12">
                          <Button type="submit" variant="contained" color="warning" fullWidth size="large" className="hover-ripple text-capitalize py-3">
                            REGISTER NOW
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* <!-- background shape --> */}
            </div>
            <div class="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              {/* <button type="button" class="btn btn-primary">Understood</button>
               */}
              {/* <div className="col-12">
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  fullWidth
                  size="large"
                  className="hover-ripple text-capitalize py-3"
                >
                  REGISTER NOW
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
              <strong> Registered Succesfully</strong>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Username : </strong>&nbsp;{email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Password : </strong>&nbsp;{password}
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              className="px-2 py-1 border-2 rounded-0 rounded-bottom mt-4"
              color={copiedLink ? "success" : "warning"}
              onClick={() => {
                navigator.clipboard.writeText(password);
                setCopiedLink(true);
              }}>
              {!copiedLink ? <ContentCopyIcon /> : <CheckCircle />} <br />
              {copiedLink ? <small>COPIED</small> : <small>COPY</small>}
            </Button>
            <p className="text-center mb-0">
              <strong>Copy The Password</strong>
            </p>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AdminInstituteRegistration;
