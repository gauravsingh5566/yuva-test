import { apiAuth } from "api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { editStudentBasicProfile } from "schema/editProfile";
import { useOutletContext } from "react-router-dom";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
import { Divider, FormHelperText, MenuItem, Select } from "@mui/material";
import moment from "moment";
import ProfilePic from "./StudentEditProfilePic";
import { ListDivider } from "@mui/joy";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import StudentEditAdditionalDetails from "./StudentEditAdditionalDetails";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";

const StudentEditBasicDetails = () => {
  const { ErrorResponder } = useError();
  const { token, userData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [userdata, fullDetails, fetchDetails] = useOutletContext();
  let [education, setEducation] = useState("");

  // console.log(userData)
  // Basic Update Formik
  // console.log(fullDetails)
  const basicFormik = useFormik({
    initialValues: {
      first_name: fullDetails?.first_name,
      middle_name: fullDetails?.middle_name,
      last_name: fullDetails?.last_name,
      contact: fullDetails?.contact,
      email: fullDetails?.email,
      dob: fullDetails?.dob?.slice(0, 10),
      father_name: fullDetails?.father_name,
      gender: fullDetails?.gender,
      class: fullDetails?.class,
    },
    enableReinitialize: true,
    validationSchema: editStudentBasicProfile,
    onSubmit: async (values, { resetForm }) => {
      toast.loading("Loading....");
      const formData = new FormData();
      // console.log("after submit", values);
      formData.append("first_name", values.first_name);
      // formData.append("middle_name", values.middle_name);
      formData.append("last_name", values.last_name);
      formData.append("contact", values.contact);
      formData.append("email", values.email);
      formData.append("dob", values.dob);
      formData.append("father_name", values.father_name);
      formData.append("gender", values.gender);
      formData.append("class", values.class);
      if (token) {
        setLoading(true);
        try {
          const res = await apiAuth.put(`/student/profile?update_type=basic`, formData, {
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
            Swal.fire({
              width: 400,
              title: error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection",
              icon: "error",
            });
          }
          ErrorResponder(error);
        }
      }
    },
  });
  async function getEductaionType() {
    try {
      const res = await apiAuth.get("/student/onboard/education?instituteId=" + userData?.instituteId);
      if (res.status === 200) {
        // console.log(res?.data?.result)
        setEducation(res?.data?.result[0]?.question2);
      }
    } catch (err) {}
  }
  useEffect(() => {
    getEductaionType();
  }, []);

  function render(education) {
    switch (education) {
      case "school":
        return (
          <>
            <option key="12th" value={"12th"}>
              12th
            </option>
            <option key="11th" value={"11th"}>
              11th
            </option>
            <option key="10th" value={"10th"}>
              {" "}
              10th
            </option>
            <option key="9th" value={"9th"}>
              9th
            </option>
            <option key="8th" value={"8th"}>
              8th
            </option>
            <option key="7th" value={"7th"}>
              7th
            </option>
            <option key="6th" value={"6th"}>
              6th
            </option>
            <option key="below 6th" value={"below 6th"}>
              below 6th
            </option>
          </>
        );
        break;
      case "college":
        return (
          <>
            <option key="post-grad" value={"post-graduation"}>
              Post Graduation
            </option>
            <option key="grad" value={"graduation"}>
              Graduation
            </option>
            <option key="diploma" value={"diploma"}>
              Diploma
            </option>
          </>
        );
        break;
      case "university":
        return (
          <>
            <option key="doctorate" value={"doctorate"}>
              Doctorate
            </option>
            <option key="post-grad" value={"post-graduation"}>
              Post Graduation
            </option>
            <option key="grad" value={"graduation"}>
              Graduation
            </option>
            <option key="diploma" value={"diploma"}>
              Diploma
            </option>
          </>
        );
        break;
      case "other":
        return (
          <>
            <option key="doctorate" value={"doctorate"}>
              Doctorate
            </option>
            <option key="post-grad" value={"post-graduation"}>
              Post Graduation
            </option>
            <option key="grad" value={"graduation"}>
              Graduation
            </option>
            <option key="diploma" value={"diploma"}>
              Diploma
            </option>
            <option key="12th" value={"12th"}>
              12th
            </option>
            <option key="11th" value={"11th"}>
              11th
            </option>
            <option key="10th" value={"10th"}>
              {" "}
              10th
            </option>
            <option key="9th" value={"9th"}>
              9th
            </option>
            <option key="8th" value={"8th"}>
              8th
            </option>
            <option key="7th" value={"7th"}>
              7th
            </option>
            <option key="6th" value={"6th"}>
              6th
            </option>
            <option key="below 6th" value={"below 6th"}>
              below 6th
            </option>
          </>
        );
        break;
      default:
        return (
          <>
            <option key="doctorate" value={"doctorate"}>
              Doctorate
            </option>
            <option key="post-grad" value={"post-graduation"}>
              Post Graduation
            </option>
            <option key="grad" value={"graduation"}>
              Graduation
            </option>
            <option key="diploma" value={"diploma"}>
              Diploma
            </option>
            <option key="12th" value={"12th"}>
              12th
            </option>
            <option key="11th" value={"11th"}>
              11th
            </option>
            <option key="10th" value={"10th"}>
              {" "}
              10th
            </option>
            <option key="9th" value={"9th"}>
              9th
            </option>
            <option key="8th" value={"8th"}>
              8th
            </option>
            <option key="7th" value={"7th"}>
              7th
            </option>
            <option key="6th" value={"6th"}>
              6th
            </option>
            <option key="below 6th" value={"below 6th"}>
              below 6th
            </option>
          </>
        );
        break;
    }
  }
  useEffect(() => {
    getEductaionType();
  }, []);
  // console.log(education)
  return (
    <>
      <div>
        <ProfilePic />
        <div className="mt-4">
          <h4 className="mt-4 text-secondary">Basic Details</h4>
          <hr />
          <form onSubmit={basicFormik.handleSubmit}>
            {/* Name  */}
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Enter Full Name</h5>
              </div>
              <div className="col">
                <div className="row g-2">
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      size="large"
                      value={basicFormik.values.first_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={basicFormik.handleChange}
                      error={basicFormik.touched.first_name && Boolean(basicFormik.errors.first_name)}
                      helperText={basicFormik.touched.first_name && basicFormik.errors.first_name}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <TextField
                      fullWidth
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      size="large"
                      value={basicFormik.values.last_name}
                      onChange={basicFormik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      error={basicFormik.touched.last_name && Boolean(basicFormik.errors.last_name)}
                      helperText={basicFormik.touched.last_name && basicFormik.errors.last_name}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Number  */}
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Contact Number</h5>
              </div>
              <div className="col">
                <TextField fullWidth id="contact" name="contact" label="Contact" size="large" value={basicFormik.values.contact} onChange={basicFormik.handleChange} InputLabelProps={{ shrink: true }} error={basicFormik.touched.contact && Boolean(basicFormik.errors.contact)} helperText={basicFormik.touched.contact && basicFormik.errors.contact} />
              </div>
            </div>
            {/* Enter Email Address  */}
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
                  value={basicFormik.values.email}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={true}
                  error={basicFormik.touched.email && Boolean(basicFormik.errors.email)}
                  helperText={basicFormik.touched.email && basicFormik.errors.email}
                />
              </div>
            </div>
            {/* Enter Dob  */}
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Date Of Birth</h5>
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="dob"
                  name="dob"
                  type="date"
                  inputProps={{
                    max: moment().format("YYYY-MM-DD"),
                  }}
                  label="Date of Birth"
                  size="large"
                  value={basicFormik.values.dob}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={basicFormik.touched.dob && Boolean(basicFormik.errors.dob)}
                  helperText={basicFormik.touched.dob && basicFormik.errors.dob}
                />
              </div>
            </div>
            {/* Guardian Name  */}
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Guardian's Name</h5>
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  id="father_name"
                  name="father_name"
                  label="Guardian's Name"
                  size="large"
                  value={basicFormik.values.father_name}
                  onChange={basicFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={basicFormik.touched.father_name && Boolean(basicFormik.errors.father_name)}
                  helperText={basicFormik.touched.father_name && basicFormik.errors.father_name}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Class</h5>
              </div>
              <div className="col">
                <FormControl fullWidth size="lg">
                  <select id="class" name="class" class="form-select py-3" value={basicFormik?.values?.class} onChange={basicFormik?.handleChange} error={basicFormik?.errors?.class && basicFormik?.touched?.class}>
                    {render(education)}
                  </select>
                  <FormHelperText>{basicFormik.touched.class && basicFormik.errors.class}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
              <div className="col">
                <h5>Gender</h5>
              </div>
              <div className="col">
                <FormControl>
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={basicFormik.values.gender} id="gender" name="gender" onChange={basicFormik.handleChange} InputLabelProps={{ shrink: true }} row>
                    <FormControlLabel value="female" control={<Radio />} label="Female" checked={basicFormik.values.gender === "female"} />
                    <FormControlLabel value="male" control={<Radio />} label="Male" checked={basicFormik.values.gender === "male"} />
                    <FormControlLabel value="other" control={<Radio />} label="Other" checked={basicFormik.values.gender === "other"} />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="mt-3">
              <Button color="success" disabled={loading} startIcon={loading ? <Spinner size="sm" /> : <CheckCircleOutlineOutlined />} variant="outlined" size="large" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-4">
          <StudentEditAdditionalDetails />
        </div>
      </div>
    </>
  );
};

export default StudentEditBasicDetails;
