import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-hot-toast";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import { Divider, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { editInstituteBasicProfile } from "schema/editProfile";
import { useOutletContext } from "react-router-dom";
import InstituteAdditionalDetails from "./InstituteAdditionalDetails";
import useError from "lib/errorResponse";
import { CheckCircleOutlineOutlined, Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import * as Yup from "yup";
import { InputAdornment } from "@mui/material";
import useCurrentLocation from "lib/useCurrentLocation";
import InstituteProfilePic from "./InstituteProfilePic";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";

const additionalDetailsSchema = new Yup.object().shape({
  title: Yup.string().max(10).required("Title is Required"),
  first_name: Yup.string().max(100).required("First Name is Required"),
  last_name: Yup.string().max(100).notRequired(),
  email: Yup.string().email().required("Email is required"),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  fb: Yup.string()
    .matches(/(?:www.facebook.com|www.fb.com|facebook.com|fb.com)/, "facebook profile url must match www.facebook.com")
    .notRequired(),
  twitter: Yup.string()
    .matches(/(?:twitter.com|www.twitter.com)/, "twitter profile url must match www.twitter.com")
    .notRequired(),
  insta: Yup.string()
    .matches(/(?:instagram.com|www.instagram.com)/, "Instagram profile url must match www.instagram.com")
    .notRequired(),
  lkd: Yup.string()
    .matches(/(?:linkedin.com|www.linkedin.com)/, "Linkedin profile url must match www.linkedin.com")
    .notRequired(),
  ytb: Yup.string()
    .matches(/(?:youtube.com|www.youtube.com)/, "Youtube profile url must match www.youtube.com")
    .notRequired(),
  institution_name: Yup.string().required("Institution name is required"),
  bio: Yup.string().max(400, "Too long! ( max 400 characters )").notRequired(),
  institution_address: Yup.string().required("Institution Address is required"),
  state: Yup.string().max(50).required("State is required"),
  district: Yup.string().max(50).required("District is required"),
  pincode: Yup.string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});

const InstituteBasicDetails = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [districts, setDistricts] = useState([]);
  const [details, fetchDetails] = useOutletContext();
  const { statesList, districtList, setSelectedState } = useCurrentLocation();
  // Bsic Formik
  const basicFormik = useFormik({
    initialValues: {
      title: details?.title,
      first_name: details?.first_name,
      middle_name: details?.middle_name,
      last_name: details?.last_name,
      contact: details?.contact,
      email: details?.email,
      fb: details?.fb,
      twitter: details?.twitter,
      insta: details?.insta,
      lkd: details?.lkd,
      ytb: details?.ytb,
      institution_name: details?.institution_name,
      bio: details?.bio,
      institution_address: details?.institution_address,
      state: details?.state,
      district: details?.district,
      pincode: details?.pincode,
    },
    enableReinitialize: true,
    validationSchema: additionalDetailsSchema,

    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const newBio = values.bio.replaceAll("'", "’");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("first_name", values.first_name);
      formData.append("middle_name", values.middle_name);
      formData.append("last_name", values.last_name);
      formData.append("contact", values.contact);
      formData.append("fb", values.fb);
      formData.append("twitter", values.twitter);
      formData.append("insta", values.insta);
      formData.append("lkd", values.lkd);
      formData.append("ytb", values.ytb);
      formData.append("institution_name", values.institution_name);
      formData.append("bio", newBio);
      formData.append("institution_address", values.institution_address);
      formData.append("state", values.state);
      formData.append("district", values.district);
      formData.append("pincode", values.pincode);
      if (token) {
        try {
          const res = await apiAuth.put(`/institute/profile?update_type=basic`, formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              width: 400,
            });
            resetForm();
            fetchDetails();
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
    },
  });

  useEffect(() => {
    if (details?.title) {
      setSelectedState(details?.state);
      basicFormik.setFieldValue("title", details?.title);
      basicFormik.setFieldValue("state", details?.state);
      basicFormik.setFieldValue("district", details?.district);
    }
  }, [details, districtList, statesList]);

  return (
    <>
      <div>
        <InstituteProfilePic />
        <form onSubmit={basicFormik.handleSubmit}>
          {/* Personal Details  */}
          <h4 className="mt-4 text-secondary">Contact Details</h4>
          <Divider className="my-2" />
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Full Name</h5>
              <p className="fs-6">This name will be reflected to public as principal name.</p>
            </div>
            <div className="col">
              <div className="row g-2">
                <div className="col-12 col-lg-2">
                  <select id="title" name="title" className="form-select h-100 py-3" label="Title" value={basicFormik.values.title} onChange={basicFormik.handleChange} required>
                    <option value={"Mr."}>Mr.</option>
                    <option value={"Ms."}>Ms.</option>
                    <option value={"Miss"}>Miss</option>
                  </select>
                </div>
                <div className="col-12 col-lg-5">
                  <TextField
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    value={basicFormik.values.first_name}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.first_name && Boolean(basicFormik.errors.first_name)}
                    required
                    helperText={basicFormik.touched.first_name && basicFormik.errors.first_name}
                  />
                </div>
                <div className="col-12 col-lg-5">
                  <TextField
                    fullWidth
                    required
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    value={basicFormik.values.last_name}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.last_name && Boolean(basicFormik.errors.last_name)}
                    helperText={basicFormik.touched.last_name && basicFormik.errors.last_name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Contact Number</h5>
            </div>
            <div className="col">
              <TextField
                fullWidth
                required
                id="contact"
                name="contact"
                label="Contact"
                size="large"
                InputLabelProps={{ shrink: true }}
                value={basicFormik.values.contact}
                onChange={basicFormik.handleChange}
                error={basicFormik.touched.contact && Boolean(basicFormik.errors.contact)}
                helperText={basicFormik.touched.contact && basicFormik.errors.contact}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Email Address</h5>
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                size="large"
                InputLabelProps={{ shrink: true }}
                value={basicFormik.values.email}
                onChange={basicFormik.handleChange}
                error={basicFormik.touched.email && Boolean(basicFormik.errors.email)}
                disabled={true}
                helperText={basicFormik.touched.email && basicFormik.errors.email}
              />
            </div>
          </div>
          <h4 className="mt-4 text-secondary">Institution Details</h4>
          <Divider className="my-2" />
          {/* Institutional Details  */}
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Institution Name</h5>
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="institution_name"
                name="institution_name"
                label="Institute Name"
                multiline
                rows={3}
                size="large"
                InputLabelProps={{ shrink: true }}
                value={basicFormik.values.institution_name}
                onChange={basicFormik.handleChange}
                error={basicFormik.touched.institution_name && Boolean(basicFormik.errors.institution_name)}
                helperText={basicFormik.touched.institution_name && basicFormik.errors.institution_name}
              />
            </div>
          </div>
          {/* Institute Address  */}
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Institution Address</h5>
            </div>
            <div className="col">
              <div className="row g-2">
                <div className="col-12">
                  <TextField
                    fullWidth
                    id="institution_address"
                    name="institution_address"
                    label="Institute Address"
                    multiline
                    rows={3}
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    value={basicFormik.values.institution_address}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.institution_address && Boolean(basicFormik.errors.institution_address)}
                    helperText={basicFormik.touched.institution_address && basicFormik.errors.institution_address}
                  />
                </div>
                {/* Location information */}
                <div className="col-12 col-lg-4">
                  <div>
                    <label htmlFor="state">
                      Select State <b className="text-danger">*</b>
                    </label>
                    <select id="state" className="py-3 rounded bg-white form-select" name="state" onChange={basicFormik.handleChange} onChangeCapture={(e) => setSelectedState(e.target.value)} value={basicFormik.values?.state} label={"Select State"} error={basicFormik.touched.state && Boolean(basicFormik.errors.state)}>
                      {statesList?.map((state, i) => {
                        return (
                          <option key={i} value={state?.state}>
                            {state?.state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormHelperText className="text-danger">{basicFormik.touched.state && basicFormik.errors.state}</FormHelperText>
                </div>
                <div className="col-12 col-lg-4">
                  <div>
                    <label htmlFor="district">
                      Select District <b className="text-danger">*</b>
                    </label>
                    <select className="py-3 rounded bg-white form-select" id="district" name="district" label={"Select District"} disabled={districtList.length === 0} value={basicFormik.values.district} onChange={basicFormik.handleChange} error={basicFormik.touched.district && basicFormik.errors.district}>
                      {districtList?.map((district, i) => {
                        return (
                          <option key={i} value={district?.district}>
                            {district?.district}
                          </option>
                        );
                      })}
                    </select>
                    <FormHelperText className="text-danger">{basicFormik.touched.district && basicFormik.errors.district}</FormHelperText>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <TextField
                    id="pincode"
                    name="pincode"
                    className="mt-3"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={
                      <span>
                        Pincode <b className="text-danger">*</b>
                      </span>
                    }
                    value={basicFormik.values.pincode}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.errors.pincode && basicFormik.touched.pincode}
                    type="number"
                    helperText={basicFormik.errors.pincode && basicFormik.touched.pincode && basicFormik.errors?.pincode}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Institute Bio  */}
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>About Institute</h5>
              <p className="fs-6">
                Write a Description about your institution{" "}
                <span className="text-secondary">
                  ({basicFormik?.values?.bio?.length} Characters , {400 - basicFormik?.values?.bio?.length} left)
                </span>
              </p>
            </div>
            <div className="col">
              <TextField fullWidth id="bio" name="bio" label="Bio" multiline rows={4} size="large" InputLabelProps={{ shrink: true }} value={basicFormik.values.bio} onChange={basicFormik.handleChange} error={basicFormik.touched.bio && Boolean(basicFormik.errors.bio)} helperText={basicFormik.touched.bio && basicFormik.errors.bio} />
            </div>
          </div>
          {/* Social Media Links  */}
          <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
            <div className="col">
              <h5>Social Links</h5>
            </div>
            <div className="col">
              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="fb"
                    name="fb"
                    label="Facebook"
                    size="large"
                    type={"url"}
                    value={basicFormik.values.fb}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.fb && Boolean(basicFormik.errors.fb)}
                    helperText={basicFormik.touched.fb && basicFormik.errors.fb}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook sx={{ color: "blue" }} />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="twitter"
                    name="twitter"
                    label="Twitter"
                    type={"url"}
                    size="large"
                    value={basicFormik.values.twitter}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.twitter && Boolean(basicFormik.errors.twitter)}
                    helperText={basicFormik.touched.twitter && basicFormik.errors.twitter}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Twitter sx={{ color: "skyblue" }} />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="insta"
                    name="insta"
                    label="Instagram"
                    type={"url"}
                    size="large"
                    value={basicFormik.values.insta}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.insta && Boolean(basicFormik.errors.insta)}
                    helperText={basicFormik.touched.insta && basicFormik.errors.insta}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram sx={{ color: "red" }} />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="lkd"
                    name="lkd"
                    label="LinkedIn"
                    type={"url"}
                    size="large"
                    value={basicFormik.values.lkd}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.lkd && Boolean(basicFormik.errors.lkd)}
                    helperText={basicFormik.touched.lkd && basicFormik.errors.lkd}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedIn sx={{ color: "blue" }} />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    fullWidth
                    id="ytb"
                    name="ytb"
                    label="Youtube"
                    type={"url"}
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    value={basicFormik.values.ytb}
                    onChange={basicFormik.handleChange}
                    error={basicFormik.touched.ytb && Boolean(basicFormik.errors.ytb)}
                    helperText={basicFormik.touched.ytb && basicFormik.errors.ytb}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <YouTube sx={{ color: "red" }} />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button startIcon={<CheckCircleOutlineOutlined />} color="success" variant="outlined" className="py-2" size="large" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InstituteBasicDetails;
