import React, { useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import { pop2, Popup } from 'layout/Popup';
import StudentOtpComponent from '../StudentOtpComponent';
import { toast } from 'react-toastify';

const StudentLogin = () => {
  const { setUser, setToken, token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const [showOTP, setShowOTP] = useState(false);
  const [submitState, setSubmitState] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const location = useLocation();
  const navigate = useNavigate();
  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlesubmit = async (e) => {
    toast.dismiss();
    toast.loading('Logging In Please Wait...');
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitState(true);
      const res = await apiJson.post(`auth/login?type=0`, {
        identifier: email,
        password,
      });
      setSubmitState(false);
      switch (res?.data?.status) {
        case 'SUCCESS':
          setUser(res.data.user);
          setToken(res.data.jwt);
          toast.dismiss();
          toast.success('Loggedin Successfully');
          window.location.replace('/dashboard/');
          break;
        case 'ERROR':
          toast.dismiss();
          toast.error(res?.data?.message);
          break;
        case 'ONBOARD':
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace('/dashboard/onboard');
          break;
        case 'NOTFOUND':
          toast.dismiss();
          toast.warning(res?.data?.message);
          break;
        case 'OTP':
          setShowOTP(true);
          toast.dismiss();
          toast.success('OTP Sent Successfully to your email Address');
          break;
        case 'WARNING':
          toast.dismiss();
          toast.warning(res?.data?.message);
          break;
        default:
          toast.dismiss();
          toast.error('Error while logging you In');
          break;
      }
      setLoading(false);
    } catch (error) {
      setSubmitState(false);
      toast.dismiss();
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      if (location?.state?.nextRoute) {
        navigate(location?.state?.nextRoute);
      } else {
        navigate('/dashboard/');
      }
    }
  }, [token]);

  return (
    <>
      {loading && pop2.loading()}
      {!showOTP ? (
        <form onSubmit={handlesubmit} className="login-card container py-5" style={{ maxWidth: '450px' }}>
          <p>{'Log in as an Student'}</p>
          <div className="mb-3">
            <TextField
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Enter your Email ID"
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                required
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </FormControl>
          </div>
          <div className="mt-3 text-center">
            <Button
              disabled={submitState}
              type="submit"
              name="login-btn"
              id="login-btn"
              color="warning"
              className={submitState ? 'rounded-3 bg-success' : 'rounded-3'}
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 2 }}>
              {submitState ? (
                <div className="d-flex justify-content-around text-light">
                  {' '}
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">loading...</span>
                  </div>
                  <span className="text-light mx-3 text-capitalize">Logging...</span>{' '}
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </div>
          <div className="text-center mt-4">
            <Link to={`/forget-password`} className="text-end w-100">
              Forgot Password ?
            </Link>{' '}
          </div>
        </form>
      ) : (
        <StudentOtpComponent globalEmail={email} />
      )}
    </>
  );
};

export default StudentLogin;
