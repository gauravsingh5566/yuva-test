import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { instituteregisterSchema } from "schema/register";
import { apiJson } from "api";
import ReCAPTCHA from "react-google-recaptcha";
import { pop2, Popup } from "layout/Popup";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import useCurrentLocation from "lib/useCurrentLocation";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useParams, useSearchParams } from "react-router-dom";
import SimpleCaptcha from "global/SimpleCaptcha";

const RegisterFormComponent = ({ setPageStep, setGlobalEmail, setGlobalPass }) => {
  // Required States
  const [tnc, setTnc] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  let ecoclub = searchParams.get('eco_club');

  // Password Show Hide Handler
  const handleClickShowPassword = (setState) => setState((show) => !show);
  // Password Show Hide Handler
  const handleClickShowConfirmPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Fetch States and Live Location
  const { liveState, liveDistrict, liveCountry, livePostalCode, currentAddress, states, statesList, districtList, setSelectedState } = useCurrentLocation();
  //On Submit Handler
  const onSubmit = async (values, action) => {
    toast.dismiss();
    toast.loading('Submitting the form');
    try {
      setSubmitState(true);
      const registerto = await apiJson.post('register/institution', {
        ...values,
        pincode: String(values.pincode),
      });
      if (registerto) {
        setSubmitState(false);
      }
      switch (registerto?.data?.status) {
        case 'success':
          setGlobalEmail(values?.email);
          setGlobalPass(values?.password);
          toast.dismiss();
          toast.success(registerto?.data?.message);
          action.resetForm();
          setPageStep('result');
          break;
        case 'warning':
          toast.dismiss();
          toast.warning('Account Already Exist');
          break;
        case 'error':
          toast.dismiss();
          toast.error(registerto?.data?.message);
          break;
      }
    } catch (error) {
      setSubmitState(false);
      const msg = error?.response?.data?.message ? error?.response?.data?.message : "OOps Something went wrong";
      toast.dismiss();
      toast.error(msg);
    }
  };
  //End On Submit Handler
  // Formik Hook
  const { values, errors, touched, handleSubmit, handleChange, submitForm, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      first_name: '',
      last_name: '',
      institute_name: '',
      institute_address: '',
      state: '',
      district: '',
      pincode: '',
      email: '',
      confirm_email: '',
      contact: '',
      password: '',
      confirm_password: '',
      club: ecoclub ? ecoclub : '',
    },
    enableReinitialize: true,
    validationSchema: instituteregisterSchema,
    onSubmit,
  });
  //End Formik Hook
  // state Wise District Show
  //   const handleStateIndexChange = async (stateValue) => {
  //     if (stateValue?.length && states?.length) {
  //       let index = await states?.findIndex(
  //         (state) => state?.state?.toLowerCase() === stateValue.toLowerCase()
  //       );
  //       setDistricts(states[index]?.District);
  //     }
  //   };
  //   useEffect(() => {
  //     handleStateIndexChange(values?.state);
  //   }, [values?.state, states]);
  //   useEffect(() => {
  //     console.log(values);
  //   }, [values]);

  useEffect(() => {
    if (liveState && liveCountry && livePostalCode && currentAddress) {
      setFieldValue('state', liveState);
      setFieldValue('district', liveDistrict);
      setFieldValue('institute_address', currentAddress);
      setFieldValue('pincode', livePostalCode);
    }
  }, [liveState]);

  // For Captcha
  const [verified, setVerified] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-2 px-0 px-md-3 px-lg-4">
        <h4 className="fs-2 mb-0">Registration Form</h4>
        <span className="rounded-3 fs-6">( Please fill in your details carefully in the fields marked as follows )</span>
        <div className="row g-3 mt-4 rounded">
          <>
            <div className="col-12 col-lg-2">
              <FormControl fullWidth>
                <InputLabel>
                  Title <b className="text-danger">*</b>
                </InputLabel>
                <Select id="title" name="title" label={"Title"} value={values.title} onChange={handleChange} error={errors.title && touched.title}>
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                  <MenuItem value="Ms.">Ms.</MenuItem>
                  <MenuItem value="Dr.">Dr.</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-lg-5">
              <TextField
                type="text"
                id="first_name"
                name="first_name"
                fullWidth
                className="rounded"
                label={
                  <span>
                    First Name <b className="text-danger">*</b>
                  </span>
                }
                value={values.first_name}
                onChange={handleChange}
                error={touched.first_name && errors.first_name}
                helperText={touched.first_name && errors.first_name}
              />
            </div>
            <div className="col-12 col-md-12 col-lg-5">
              <TextField type="text" id="last_name" size="large" fullWidth label={<span>Last Name (optional)</span>} value={values.last_name} onChange={handleChange} error={touched.last_name && errors.last_name} helperText={touched.last_name && errors.last_name} />
            </div>
            <div className="col-12">
              <TextField
                type="text"
                id="institute_name"
                fullWidth
                size="large"
                label={
                  <span>
                    Institution / School Name where the event will be organised <b className="text-danger">*</b>
                  </span>
                }
                value={values.institute_name}
                onChange={handleChange}
                error={touched.institute_name && errors.institute_name}
                helperText={touched.institute_name && errors.institute_name}
              />
            </div>
            <div className="col-12">
              <TextField
                type="text"
                id="institute_address"
                name="institute_address"
                label={
                  <span>
                    Institution / School Address <b className="text-danger">*</b>
                  </span>
                }
                value={values.institute_address}
                multiline
                fullWidth
                rows={3}
                onChange={handleChange}
                error={errors.institute_address && touched.institute_address}
                helperText={touched.institute_address && errors.institute_address}
              />
            </div>
            <div className="col-12 col-lg-4">
              <FormControl fullWidth>
                <InputLabel>
                  Select State <b className="text-danger">*</b>
                </InputLabel>
                <Select
                  id="state"
                  name="state"
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedState(e.target.value);
                  }}
                  value={values?.state}
                  label={"Select State"}
                  error={errors?.state && touched?.state}>
                  {statesList?.map((state, i) => {
                    return (
                      <MenuItem key={i} value={state?.state}>
                        {state?.state}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormHelperText className="text-danger">{touched.state && errors.state}</FormHelperText>
            </div>
            <div className="col-12 col-lg-4">
              <FormControl fullWidth>
                <InputLabel>
                  Select District <b className="text-danger">*</b>
                </InputLabel>
                <Select id="district" name="district" disabled={districtList.length === 0} label={"Select District"} value={values.district} onChange={handleChange} error={touched.district && errors.district}>
                  {districtList?.map((district, i) => {
                    return (
                      <MenuItem key={i} value={district?.district}>
                        {district?.district}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText className="text-danger">{touched.district && errors.district}</FormHelperText>
              </FormControl>
            </div>
            <div className="col-12 col-lg-4">
              <TextField
                id="pincode"
                name="pincode"
                fullWidth
                label={
                  <span>
                    Pincode <b className="text-danger">*</b>
                  </span>
                }
                value={values.pincode}
                onChange={handleChange}
                error={errors.pincode && touched.pincode}
                type="number"
                helperText={errors.pincode && touched.pincode && errors?.pincode}
              />
            </div>
            {/* contact Information  */}
            <div className="col-12">
              <hr />
              <h6 className="fw-regular">Contact Information</h6>
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="email"
                name="email"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                label={
                  <span>
                    Email Address <b className="text-danger">*</b>
                  </span>
                }
                error={errors.email && touched.email}
                helperText={touched.email && errors?.email}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="confirm_email"
                name="confirm_email"
                type="email"
                value={values.confirm_email}
                fullWidth
                onChange={handleChange}
                label={
                  <span>
                    Confirm Email Address <b className="text-danger">*</b>
                  </span>
                }
                error={errors.confirm_email && touched.confirm_email}
                helperText={touched.confirm_email && errors?.confirm_email}
              />
            </div>
            <div className="col-12">
              <TextField
                id="contact"
                name="contact"
                fullWidth
                label={
                  <span>
                    Contact Number <b className="text-danger">*</b>
                  </span>
                }
                value={values.contact}
                onChange={handleChange}
                error={errors.contact && touched.contact}
                helperText={touched.contact && errors.contact}
                type="tel"
              />
            </div>
            <div className="col-12 col-lg-6">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  required
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{touched.password && errors.password}</FormHelperText>
              </FormControl>
            </div>
            <div className="col-12 col-lg-6">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm_password"
                  name="confirm_password"
                  required
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirm_password}
                  onChange={handleChange}
                  error={touched.confirm_password && Boolean(errors.confirm_password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowConfirmPassword(setShowConfirmPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{touched.confirm_password && errors.confirm_password}</FormHelperText>
              </FormControl>
            </div>
            <div className="col-12">
              <SimpleCaptcha verified={verified} setVerified={setVerified} />
            </div>
            {/* Model G20 Terms and Conditions * */}
            <div className="col-12">
              <h5>
                Model G20 Terms and Conditions <b className="text-danger">*</b>
              </h5>
              <div className="form-check">
                <input id="termscheck" style={{ cursor: "pointer" }} aria-labelledby={"termscheck-label"} className="form-check-input" type="checkbox" value="accept" checked={tnc} onChange={(e) => setTnc(e.target.checked)} />
                <label id="termscheck-label" className="form-check-label">
                  I agree all the information provided by me is true and i agree to the{" "}
                  <span className="text-primary" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#g20instituteModal">
                    terms of conditions.
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12">
              <Button type="submit" variant="contained" color="success" fullWidth size="large" className={submitState ? "text-capitalize py-3 rounded-3 fs-5 fw-regular font-ubd bg-success" : "text-capitalize py-3 rounded-3 fs-5 fw-regular font-ubd"} disabled={!tnc || submitState || !verified}>
                {!tnc ? (
                  'Please Accept Terms and Conditions'
                ) : submitState ? (
                  <div className="d-flex justify-content-around text-light">
                    {" "}
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">loading...</span>
                    </div>
                    <span className="text-light mx-3 text-capitalize">Registering...</span>{" "}
                  </div>
                ) : (
                  'Register Now'
                )}
              </Button>
            </div>
          </>
        </div>
      </form>
      {/* terms and conditions pop  */}
      <div className="modal fade" id="g20instituteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Terms and Conditions
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h5> THE EVENT</h5>
              <p> Model G20 or (the “Event”) is a voluntary exercise designed for young learners and professionals who wish to ace the art of public speaking and diplomacy. </p>
              <p>GLC holds no patents or copyrights for (the “Event”) and is merely a coordinator/agency to help organize (the “Event”) in educational institutions and venues decided by their authorities.</p>
              <h5>APPLICATION TERMS</h5>
              <p>The institution is an educational institute that is duly registered and has appointed the (the “Applicant”) to act on behalf of it to organize (the “Event”).</p>
              <p>GLC or its associates do not know (the “Applicant”) personally and expect all information shared by the applicant to be true and fair. Any liability arising out of the falsification of information will be the sole responsibility of the applicant.</p>
              <p>
                GLC and its associates will not be responsible to pay any amount of remuneration or money to (the “Applicant”) or their associates to organize (the “Event”). The applicant understands that (the “Applicant”) is “Volunteering” to organize the event on their campus and all responsibility for the same lies with the (the “Applicant”).
                (the “Applicant”) will be free to arrange sponsorships for the (the “Event”) from sources they deem fit for the same. GLC or its associates will have no role in this, nor will they be responsible for any financial or physical loss due to the same. This is just an application and not a confirmation from GLC for the appointment of
                “Campus Sherpa”.
              </p>
              <h5>PARTICIPATION</h5>
              <p>
                Unless otherwise defined in the special terms of the event as outlined on the event webpage or as communicated at or in connection with the event itself (the “Special Terms”): Everyone who is of legal age (i.e. 18 years old) is eligible to participate in the event (the “Event”). Participation in the Event is free of charge and does
                not require the purchase of a product or service. By participating, you agree to the Special Terms and to these general terms of participation (the “GTP”; Special Terms and GTP equal the “Terms”) fully and unconditionally. On reserves the right to exclude any participant from partaking in the Event without providing any reasons.
              </p>
              <h5>RECORDINGS</h5>
              <p>
                By participating in the Event, you consent to interview(s), photography, audio recording, video recording, or any other recordings (the “Recordings”) and the release, publication, exhibition, or reproduction of these Recordings can be used for news, webcasts, promotional purposes, telecasts, advertising, inclusion on websites,
                social media, or any other purpose (the “Release”) by GLC and its affiliates. Recordings may be used to promote similar events in the future, to highlight the Event, or to exhibit the capabilities of GLC (or any of its partners). You release GLC and all persons involved from any liability and waive all rights you may have to any
                claims for payment or royalties in connection with the Recordings and/or the Release (including any claims connected with the taking, recording, digitizing, or publicizing of the Recordings).
              </p>
              <h5>LIABILITY</h5>
              <p>
                GLC accepts no responsibility for any damage, loss, liabilities, injury, or disappointment incurred or suffered by any participant as a result of entering and participating in the Event. Nothing in these Terms shall exclude the liability of GLC for fraud or fraudulent misrepresentation or for death or personal injury resulting from
                GLC’s negligence. You agree to indemnify, defend, and hold harmless GLCS from and against any loss, expense, liability, damage, or claim (including reasonable attorneys’ fees) which may be asserted by a third party arising from your negligence or willful misconduct and omission. GLC or its affiliates will not be responsible for any
                loss (as mentioned above).
              </p>
              <h5>DATA PROTECTION</h5>
              <p>By registering for or participating in the Event, you acknowledge and consent to the processing of your personal data in accordance with GLC’s Privacy Notice.</p>
              <h5>MISCELLANEOUS</h5>
              <p>
                There shall be no correspondence relating to this Event or the Terms. GLC has the right to cancel or terminate the relationship at any time without prior notice and without providing any reasons. On reserves the right to change or amend the Terms at any time. The laws of India will govern the Event and the Terms without regard to
                its conflict of laws provisions.
              </p>
              <p>The exclusive place of jurisdiction for all controversies and claims is Faridabad, Haryana INDIA.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterFormComponent;
