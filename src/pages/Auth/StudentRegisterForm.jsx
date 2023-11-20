import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { studentRegisterSchema } from 'schema/register';
import { Avatar, FormHelperText } from '@mui/material';
import { toast } from 'react-toastify';
import { api, apiJson, postVerifyCaptcha } from 'api';
import { pop2, Popup } from 'layout/Popup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputLabel, OutlinedInput } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useError from 'lib/errorResponse';
import VerficationEmailMessage from './VerficationEmailMessage';
import SimpleCaptcha from 'global/SimpleCaptcha';

const StudentRegisterForm = ({ collegeId, permissions }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  const [globalEmail, setGlobalEmail] = useState('');
  const [globalPass, setGlobalPass] = useState('');
  const [type, setType] = useState('student');
  //const captchaRef = useRef();
  let definedType = new URLSearchParams(useLocation().search).get('type');
  const { ErrorResponder } = useError();
  // OTP Verification
  const [verificationMessage, setverificationMessage] = useState(false);
  // Password Show Hide Handler
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (definedType === 'teacher' || definedType === 'student') {
      setType(definedType);
    } else if ((definedType !== 'teacher' || definedType !== 'student') && permissions?.defaultType) {
      setType(permissions?.defaultType);
    } else if (permissions?.defaultType) {
      setType(permissions?.defaultType);
    }
  }, [permissions, definedType]);
  // End Password Show Hide
  // Main Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      dob: '2001-01-26',
      first_name: '',
      last_name: '',
      contact: '',
      father_name: '',
      gender: 'female',
      confirm_password: '',
      confirm_email: '',
    },
    validationSchema: studentRegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      // if (values.dob < "1993-01-01") {
      //   toast.warning("Age should be less than 28 years");
      // } else if (values.dob > "2018-01-01") {
      //   toast.warning("Age must be more than 6 years");
      // } else
      {
        const RegisterPayload = {
          ...values,
          instituteId: collegeId,
        };
        try {
          setSubmitState(true);
          Popup('loading', 'Submiting the form...');
          const res = await apiJson.post('/register/student?userType=' + type, RegisterPayload);
          if (res) {
            setSubmitState(false);
          }
          switch (res?.data?.status) {
            case 'success':
              pop2.success({
                title: 'Registered Succesfully',
                description: res?.data?.message,
              });
              setverificationMessage(true);
              //captchaRef.current.reset();
              break;
            case 'warning':
              toast.warning(res?.data?.message);
              //captchaRef.current.reset();
              break;
            case 'error':
              toast.error(res?.data?.message);
              //captchaRef.current.reset();
              break;
            default:
              break;
          }
        } catch (error) {
          setSubmitState(false);
          ErrorResponder(error);
          //captchaRef.current.reset();
        }
      }
    },
  });
  // End Main Formik
  useEffect(() => {
    setGlobalEmail(formik?.values?.email);
    setGlobalPass(formik?.values?.password);
  }, [formik?.values?.email, formik?.values?.password]);

  //Captcha
  const [verified, setVerified] = useState(false);
  return (
    <div className="p-2 p-md-3 p-lg-4">
      {!verificationMessage ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <TextField
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                size="large"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                fullWidth
                id="last_name"
                name="last_name"
                label="Last Name (optional)"
                size="large"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                id="contact"
                name="contact"
                label="Mobile Number"
                size="large"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                size="large"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                id="confirm_email"
                name="confirm_email"
                label="Confirm Email Address"
                size="large"
                value={formik.values.confirm_email}
                onChange={formik.handleChange}
                onPaste={(e) => e.preventDefault()}
                error={formik.touched.confirm_email && Boolean(formik.errors.confirm_email)}
                helperText={formik.touched.confirm_email && formik.errors.confirm_email}
              />
            </div>
            <div className="col-12 col-lg-6 ">
              <TextField
                fullWidth
                id="dob"
                name="dob"
                type="date"
                label="Date of Birth"
                size="large"
                max="2022-01-01"
                min="2007-01-01"
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            </div>
            <div className="col-12 col-lg-6">
              <FormControl>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="gender-label"
                  defaultValue={formik.values.gender}
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  row>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                id="father_name"
                name="father_name"
                label="Guardian's Name"
                size="large"
                value={formik.values.father_name}
                onChange={formik.handleChange}
                error={formik.touched.father_name && Boolean(formik.errors.father_name)}
                helperText={formik.touched.father_name && formik.errors.father_name}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(setShowPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
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
                  required
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(setShowPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="text-danger">{formik.touched.confirm_password && formik.errors.confirm_password}</FormHelperText>
              </FormControl>
            </div>
            <div className="col-12">
              <SimpleCaptcha verified={verified} setVerified={setVerified} />
            </div>
            <div className="col-12">
              <Button
                disabled={submitState || !verified}
                color="warning"
                variant="contained"
                className={submitState ? 'py-3 bg-success' : 'py-3'}
                size="large"
                fullWidth
                type="submit">
                {submitState ? (
                  <div className="d-flex justify-content-around text-light">
                    {' '}
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">loading...</span>
                    </div>
                    <span className="text-light mx-3 text-capitalize">Submitting...</span>{' '}
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <VerficationEmailMessage globalEmail={globalEmail} globalPass={globalPass} />
      )}
    </div>
  );
};

export default StudentRegisterForm;
