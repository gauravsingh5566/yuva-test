// require('dotenv').config();
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { instituteregisterSchema } from '../../schema/register';
import { apiJson, postVerifyCaptcha } from '../../api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { pop2, Popup } from 'layout/Popup';
import { Button } from '@mui/material';
import OtpVerifyInstitute from './OtpVerifyInstitute';
import Geocode from 'react-geocode';

const InstituteRegComp = () => {
  const captchaRef = useRef();
  const navigator = useNavigate();
  const [tnc, setTnc] = useState(false);
  const [state, setState] = useState(0);
  const [states, setStates] = useState([]);
  const [stateValue, setStateValue] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const params = useParams();
  let [administrativeAreaLevel1, setAdministrativeAreaLevel1] = useState('');
  let [administrativeAreaLevel3, setAdministrativeAreaLevel3] = useState('');
  let [country, setcountry] = useState('');
  let [postalCode, setPostalcode] = useState();
  const [coords, setCoords] = useState({});
  const [addres, setAddres] = useState('');
  const apiKey = 'AIzaSyBxphSkk_cMLJE6Ii12fiToBaXuxGYQukQ';
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage('en');
  Geocode.setRegion('IN');
  Geocode.setLocationType('ROOFTOP');
  Geocode.enableDebug();
  const fetchLatLong = () => {
    window?.navigator?.geolocation?.getCurrentPosition((geolocation) => {
      const coordinates = geolocation?.coords;
      setCoords(coordinates);
      if (coordinates) {
        Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
          (response) => {
            let address = response.results[0].formatted_address;
            // console.log(response.results[0].address_components)
            response.results[0].address_components.forEach((values, index) => {
              // console.log(values.types)
              // console.log(values.types.includes("country"))
              if (values.types[0].toLowerCase() === 'postal_code') {
                // console.log("POSTAL", values.long_name);
                address = address.replace(values.long_name, '');
                setPostalcode(values.long_name);
                // console.log(address)
              }
              if (values.types[0].toLowerCase() === 'country') {
                address = address.replace(values.long_name, '');
                // console.log(address)
                setcountry(values.long_name);
              }
              if (values.types[0].toLowerCase() === 'administrative_area_level_3') {
                // console.log(values.long_name)
                address = address.replace(values.long_name, '');

                setAdministrativeAreaLevel3(values.long_name);
                // console.log(administrativeAreaLevel3)
              }
              if (values.types[0].toLowerCase() === 'administrative_area_level_1') {
                address = address.replace(values.long_name, '');
                // console.log(address)
                setAdministrativeAreaLevel1(values.long_name);
              }
              address = address.replace(',  ,', '');
              if (address.endsWith(',') || address.endsWith(' ')) {
                // console.log(index)
              }
            });
            setAddres(address);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  };
  const handleOtp = async () => {
    try {
      const response = await apiJson.post('/auth/sendotp?type=institutions', { name: values?.institute_name, email: values?.email });
      if (response) {
        setShowOtp(true);
        pop2.success({ title: response?.data?.message, timer: 1500 });
      }
    } catch (error) {
      pop2.error({ title: error?.response?.data?.message });
    }
  };
  const checkOtp = async (email, otp) => {
    try {
      const response = await apiJson.post('/auth/verifyotp', { email, otp });
      if (response.status === 200) {
        setShowOtp(false);
        setVerified(true);
      }
    } catch (error) {
      pop2.error({ title: error?.response?.data?.message });
    }
  };
  useEffect(() => {
    if (verified) {
      submitForm();
    }
  }, [verified]);
  useEffect(() => {
    if (params?.state && states.length) {
      states.forEach((element) => {
        // console.log(element?.state.toLowerCase())
        if (element?.state.toLowerCase() === params?.state.toLowerCase()) {
          setStateValue(element?.state);
        }
      });
    }
  }, [states]);
  const onSubmit = async (values, action) => {
    const recaptchaValue = captchaRef.current.executeAsync();
    Promise.resolve(recaptchaValue).then(async (resValue) => {
      if (resValue) {
        // alert("Captcha Resolved");
        try {
          pop2.loading('Initiating Captcha Varification');
          const checkCaptcha = await postVerifyCaptcha({ recaptchaValue: resValue });
          captchaRef.current.reset();
          if (checkCaptcha.data.status === 'error') {
            Swal.fire({
              title: 'Error',
              text: checkCaptcha.data.message,
              icon: 'error',
            });
          } else {
            if (verified) {
              Popup('loading');
              // captchaRef.current.reset();
              const registerto = await apiJson.post('register/institution', { ...values, pincode: String(values.pincode) });
              if (registerto.status === 200) {
                Swal.fire({
                  title: 'Registered',
                  text: registerto?.data?.message,
                  icon: 'success',
                });
                action.resetForm();
                navigator('/');
              }
            } else {
              // pop2.warning({ title: "Plz Verify Your Account" });
              handleOtp(values.institute_name, values.email);
            }
          }
        } catch (error) {
          if (error?.response?.status === 400 || error?.response?.status === 409) {
            pop2.warning({ title: 'Warning', description: error?.response?.data?.message });
          } else {
            pop2.error({ title: 'Error', description: error?.response?.data?.message });
          }
        }
      } else {
        alert('Captcha Failed');
      }
    });
  };
  const { values, errors, touched, handleSubmit, handleChange, submitForm } = useFormik({
    initialValues: {
      title: 'Mr.',
      first_name: '',
      last_name: '',
      institute_name: '',
      institute_address: addres ? addres : '',
      state: stateValue ?? administrativeAreaLevel1 ?? '',
      district: administrativeAreaLevel3 ? administrativeAreaLevel3 : '',
      pincode: postalCode ? postalCode : '',
      email: '',
      confirm_email: '',
      contact: '',
    },
    enableReinitialize: true,
    validationSchema: instituteregisterSchema,
    onSubmit,
  });
  const fetchStates = async () => {
    try {
      const res = await apiJson.get('/public/stateanddistrict');
      if (res.status === 200) {
        setStates(res.data.data);
      }
    } catch (error) {
      pop2.warning({ title: 'Registeration is not available right now. Please try again' });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStates();
    fetchLatLong();
  }, []);
  const setActiveState = (id) => {
    setState(states.findIndex((x) => x.state === id));
  };
  useEffect(() => {
    setActiveState();
  }, [administrativeAreaLevel1]);
  // captcha Load
  return (
    <>
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="container" style={{ maxWidth: '1100px' }}>
        <div className="row g-3 gy-2 text-dark fw-semibold">
          <div className="col-4 col-lg-2">
            <span className="form-label">Title </span>
            <select
              id="title"
              value={values.title}
              onChange={handleChange}
              className={errors.title && touched.title ? 'form-select py-3 ps-3 pe-3 border-danger' : 'form-select py-3 ps-3 pe-3'}>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="col-8 col-lg-5">
            <span className="form-label">
              First Name <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="first_name"
              value={values.first_name}
              onChange={handleChange}
              className={errors.first_name && touched.first_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.first_name && touched.first_name && <span className="text-danger fnt-small">{errors.first_name}</span>}
          </div>
          <div className="col-12 col-md-12 col-lg-5">
            <span className="form-label">
              Last Name <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="last_name"
              value={values.last_name}
              onChange={handleChange}
              className={errors.last_name && touched.last_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.last_name && touched.last_name && <span className="text-danger fnt-small">{errors.last_name}</span>}
          </div>
          <div className="col-12 ">
            <span className="form-label">
              Institution/College Name where the event will be organised <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="institute_name"
              value={values.institute_name}
              onChange={handleChange}
              className={errors.institute_name && touched.institute_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.institute_name && touched.institute_name && <span className="text-danger fnt-small">{errors.institute_name}</span>}
          </div>
          <div className="col-12">
            <span className="form-label">
              Institution/College Address <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="institute_address"
              value={values.institute_address}
              onChange={handleChange}
              className={errors.institute_address && touched.institute_address ? 'form-control border-danger' : 'form-control'}
            />
            {errors.institute_address && touched.institute_address && <span className="text-danger fnt-small">{errors.institute_address}</span>}
          </div>
          <div className="col-12 col-lg-4">
            <span className="form-label">
              State <b className="text-danger">*</b>
            </span>
            <select
              id="state"
              name="state"
              // disabled={stateValue}
              onChange={handleChange}
              onChangeCapture={(e) => {
                setActiveState(e.target.value);
              }}
              value={values?.state}
              className={errors.state && touched.state ? 'form-control border-danger' : 'form-control'}
              type="text">
              <option value={''}>--Select State--</option>
              {states.map((state, i) => {
                return (
                  <option key={i} value={state.state}>
                    {state.state}
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
            <select
              id="district"
              name="district"
              defaultValue={administrativeAreaLevel3}
              value={values.district}
              onChange={handleChange}
              className={errors.district && touched.district ? 'form-control border-danger' : 'form-control'}
              type="text">
              <option value={''}>{administrativeAreaLevel3 ?? '--Select District--'}</option>
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
            <input
              id="pincode"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              className={errors.pincode && touched.pincode ? 'form-control border-danger' : 'form-control'}
              type="number"
            />
            {errors.pincode && touched.pincode && <span className="text-danger fnt-small">{errors.pincode}</span>}
          </div>
          {/* contact Information  */}
          <div className="col-12">
            <hr className="my-4" />
            <h5>Contact Information</h5>
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">Email</span>
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email && touched.email ? 'form-control border-danger' : 'form-control'}
              type="email"
            />
            {errors.email && touched.email && <span className="text-danger fnt-small">{errors.email}</span>}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Confirm Email <b className="text-danger">*</b>
            </span>
            <input
              id="confirm_email"
              value={values.confirm_email}
              onChange={handleChange}
              className={errors.confirm_email && touched.confirm_email ? 'form-control border-danger' : 'form-control'}
              type="email"
            />
            {errors.confirm_email && touched.confirm_email && <span className="text-danger fnt-small">{errors.confirm_email}</span>}
          </div>
          <div className="col-12">
            <span className="form-label">
              Contact Number <b className="text-danger">*</b>
            </span>
            <input
              id="contact"
              value={values.contact}
              onChange={handleChange}
              className={errors.contact && touched.contact ? 'form-control border-danger' : 'form-control'}
              type="tel"
            />
            {errors.contact && touched.contact && <span className="text-danger fnt-small">{errors.contact}</span>}
          </div>
          {/* Model G20 Terms and Conditions * */}
          <div className="col-12">
            <h5>
              Model G20 Terms and Conditions <b className="text-danger">*</b>
            </h5>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="accept" checked={tnc} onChange={(e) => setTnc(e.target.checked)} />
              <span className="form-check-label">
                I agree all the information provided by me is true and i agree to the{' '}
                <span className="text-primary" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#g20instituteModal">
                  terms of conditions.
                </span>
              </span>
            </div>
          </div>
          <div className="col-12">
          </div>
          <div className="col-12">
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              className="hover-ripple text-capitalize py-3"
              disabled={!tnc}>
              {!tnc ? 'Please Accept Terms and Conditions' : 'REGISTER NOW'}
            </Button>
          </div>
        </div>
      </form>
      <div className="col-12">
        <OtpVerifyInstitute handleOtp={handleOtp} checkOtp={checkOtp} email={values.email} show={showOtp} setShowOtp={setShowOtp} />
      </div>
    </>
  );
};

export default InstituteRegComp;
