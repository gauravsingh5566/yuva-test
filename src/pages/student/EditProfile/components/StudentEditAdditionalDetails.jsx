import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { api, apiAuth } from "api";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Popup } from "layout/Popup";
import { Divider, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import { useGlobalContext } from "global/context";
import { useOutletContext } from "react-router-dom";
import { CheckCircleOutlineOutlined, Facebook, Instagram, LinkedIn, Token, Twitter, YouTube } from "@mui/icons-material";
import useError from "lib/errorResponse";
import useCurrentLocation from "lib/useCurrentLocation";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import { Spinner } from "react-bootstrap";

const validationSchema = new Yup.object({
  fb: Yup.string()
    .matches(/(www.facebook.com)/, "facebook profile url must match www.facebook.com")
    .notRequired(),
  twitter: Yup.string()
    .matches(/(www.twitter.com)/, "twitter profile url must match www.twitter.com")
    .notRequired(),
  insta: Yup.string()
    .matches(/(www.instagram.com)/, "Instagram profile url must match www.instagram.com")
    .notRequired(),
  lkd: Yup.string()
    .matches(/(www.linkedin.com)/, "Linkedin profile url must match www.linkedin.com")
    .notRequired(),
  ytb: Yup.string()
    .matches(/(www.youtube.com)/, "Youtube profile url must match www.youtube.com")
    .notRequired(),
  bio: Yup.string().max(400, "Too long! ( max 400 characters )").required(),
  address: Yup.string().required("Institution Address is required"),
  state: Yup.string().max(200).required("State is required"),
  pincode: Yup.string()
    .required("Pin code is Required")
    .matches(/^[0-9]{6}$/, "Invalid Pin code"),
});

const StudentEditAdditionalDetails = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [userData, fullDetails, fetchDetails] = useOutletContext();
  const { statesList, districtList, setSelectedState } = useCurrentLocation();
  useEffect(() => {
    setSelectedState(fullDetails?.state);
  }, [fullDetails]);
  // Additional Update Formik
  const additionalFormik = useFormik({
    initialValues: {
      fb: fullDetails?.fb ? fullDetails?.fb : "",
      twitter: fullDetails?.twitter,
      insta: fullDetails?.insta,
      lkd: fullDetails?.lkd,
      ytb: fullDetails?.ytb,
      bio: fullDetails?.bio,
      address: fullDetails?.address,
      state: fullDetails?.state,
      district: fullDetails?.district,
      pincode: fullDetails?.pincode,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      toast.loading("Submitting Please Wait...");
      const newBio = values.bio.replaceAll("'", "’");
      // console.log("Bio: ", newBio);
      const formData = new FormData();
      formData.append("fb", `${values.fb}`);
      formData.append("twitter", `${values.twitter}`);
      formData.append("insta", `${values.insta}`);
      formData.append("lkd", `${values.lkd}`);
      formData.append("ytb", `${values.ytb}`);
      // formData.append("bio", values.bio);
      formData.append("bio", newBio);
      formData.append("address", values.address);
      formData.append("dob", values.dob);
      formData.append("state", `${values.state}`);
      formData.append("district", `${values.district}`);
      formData.append("pincode", values.pincode);
      if (token) {
        try {
          const res = await apiAuth.put(`/student/profile?update_type=additional`, formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            toast.dismiss();
            toast.success(res.data.message);
            setLoading(false);
          }
        } catch (error) {
          if (error) {
            ErrorResponder(error);
            setLoading(false);
          }
        }
      }
    },
  });

  return (
    <>
      <div>
        <h4 className="mt-5 text-secondary">Additional Details</h4>
        <hr />
        <div>
          <form onSubmit={additionalFormik.handleSubmit}>
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Social Media Links</h5>
              </div>
              <div className="col">
                <div className="row g-2">
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="fb"
                      name="fb"
                      label="Facebook"
                      size="large"
                      type="url"
                      value={additionalFormik?.values?.fb}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.fb && Boolean(additionalFormik.errors.fb)}
                      helperText={additionalFormik.touched.fb && additionalFormik.errors.fb}
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
                      size="large"
                      type="url"
                      value={additionalFormik?.values?.twitter}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.twitter && Boolean(additionalFormik.errors.twitter)}
                      helperText={additionalFormik.touched.twitter && additionalFormik.errors.twitter}
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
                      size="large"
                      type="url"
                      value={additionalFormik?.values?.insta}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.insta && Boolean(additionalFormik.errors.insta)}
                      helperText={additionalFormik.touched.insta && additionalFormik.errors.insta}
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
                      size="large"
                      type="url"
                      value={additionalFormik?.values?.lkd}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.lkd && Boolean(additionalFormik.errors.lkd)}
                      helperText={additionalFormik.touched.lkd && additionalFormik.errors.lkd}
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
                      size="large"
                      type="url"
                      value={additionalFormik?.values?.ytb}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.ytb && Boolean(additionalFormik.errors.ytb)}
                      helperText={additionalFormik.touched.ytb && additionalFormik.errors.ytb}
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
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>
                  About me{" "}
                  <span className="fs-6 text-secondary">
                    {additionalFormik?.values?.bio?.length} Characters ( {400 - additionalFormik?.values?.bio?.length} left)
                  </span>
                </h5>
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  size="large"
                  value={additionalFormik?.values?.bio}
                  onChange={additionalFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={additionalFormik.touched.bio && Boolean(additionalFormik.errors.bio)}
                  helperText={additionalFormik.touched.bio && additionalFormik.errors.bio}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Address</h5>
              </div>
              <div className="col">
                <div className="row g-2">
                  <div className="col-12">
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      multiline
                      rows={3}
                      size="large"
                      value={additionalFormik?.values?.address}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.address && Boolean(additionalFormik.errors.address)}
                      helperText={additionalFormik.touched.address && additionalFormik.errors.address}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <div>
                      <label htmlFor="state">
                        Select State <b className="text-danger">*</b>
                      </label>
                      <select id="state" className="py-3 rounded bg-white form-select" name="state" onChange={additionalFormik.handleChange} onChangeCapture={(e) => setSelectedState(e.target.value)} value={additionalFormik.values?.state} label={"Select State"} error={additionalFormik.touched.state && Boolean(additionalFormik.errors.state)}>
                        {statesList?.map((state, i) => {
                          return (
                            <option key={i} value={state?.state}>
                              {state?.state}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <FormHelperText className="text-danger">{additionalFormik.touched.state && additionalFormik.errors.state}</FormHelperText>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div>
                      <label htmlFor="district">
                        Select District <b className="text-danger">*</b>
                      </label>
                      <select className="py-3 rounded bg-white form-select" id="district" name="district" label={"Select District"} disabled={districtList.length === 0} value={additionalFormik.values.district} onChange={additionalFormik.handleChange} error={additionalFormik.touched.district && additionalFormik.errors.district}>
                        {districtList?.map((district, i) => {
                          return (
                            <option key={i} value={district?.district}>
                              {district?.district}
                            </option>
                          );
                        })}
                      </select>
                      <FormHelperText className="text-danger">{additionalFormik.touched.district && additionalFormik.errors.district}</FormHelperText>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="pincode"
                      name="pincode"
                      label="Pin Code"
                      size="large"
                      value={additionalFormik.values.pincode}
                      onChange={additionalFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={additionalFormik.touched.pincode && Boolean(additionalFormik.errors.pincode)}
                      helperText={additionalFormik.touched.pincode && additionalFormik.errors.pincode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Button disabled={loading} startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />} color="success" variant="outlined" size="large" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentEditAdditionalDetails;
