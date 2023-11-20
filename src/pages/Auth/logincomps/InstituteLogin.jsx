import React, { useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Popup, pop2 } from 'layout/Popup';
import { apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import OtpComponent from 'pages/Registration/components/OtpComponent';
import { toast } from 'react-toastify';
const InstituteLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setToken, token } = useGlobalContext();
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = useState(1);
  const [submitState, setSubmitState] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useParams();

  useEffect(() => {
    if (user?.length) {
      async function linkLogin() {
        setLoading(true);
        try {
          const res = await apiJson.post(`auth/linkLogin`, {
            user,
          });
          switch (res?.data?.status) {
            case 'SUCCESS':
              setUser(res.data.user);
              setToken(res.data.jwt);
              window.location.replace('/dashboard/');
              break;
            case 'ERROR':
              pop2.error({
                title: 'Error while logging In',
                description: res?.data?.message,
                timer: 2000,
              });
              break;
            case 'ONBOARD':
              setUser(res.data.user);
              setToken(res.data.jwt);
              window.location.replace('/dashboard/onboard');
              break;
            case 'NOTFOUND':
              toast.dismiss();
              toast.warning('Account Not Found');
              break;
            case 'WARNING':
              toast.warning(res?.data?.message);
              break;
            case 'INVALID_TOKEN':
              toast.warning(res?.data?.message);
              break;
          }
          setLoading(false);
        } catch (err) {
          toast.error();
          toast.warning('Login failed please try again later');
          setLoading(false);
        }
      }
      linkLogin();
    }
  }, [user]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitState(true);
      const res = await apiJson.post(`auth/login?type=${type}`, {
        identifier: email,
        password,
      });
      if (res) {
        setSubmitState(false);
      }
      switch (res?.data?.status) {
        case 'SUCCESS':
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace('/dashboard/');
          break;
        case 'ERROR':
          pop2.error({
            title: 'Error while logging In',
            description: res?.data?.message,
            timer: 2000,
          });
          break;
        case 'OTP':
          setShowOtp(true);
          toast.dismiss();
          toast.success(res?.data?.message);
          break;
        case 'ONBOARD':
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace('/dashboard/onboard');
          break;
        case 'NOTFOUND':
          toast.dismiss();
          toast.warning('Account Not Found');
          break;
        case 'WARNING':
          toast.warning(res?.data?.message);
          break;
      }
      setLoading(false);
    } catch (error) {
      setSubmitState(false);
      if (error) {
        toast.error();
        toast.warning('Login failed please try again later');
        setLoading(false);
      }
    }
  };
  return (
    <>
      {!showOtp ? (
        <form onSubmit={handlesubmit} className="login-card container py-5" style={{ maxWidth: '450px' }}>
          <p>{'Log in as an Institute'}</p>
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
          <div className="mb-1">
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
            <Link
              to={`/forget-password`}
              //   state={{ type: usertype }}
              className="text-end w-100">
              Forgot Password ?
            </Link>{' '}
            <br />
            {
              <>
                <span className="font-ubd text-initial">
                  Do not have an account yet?{' '}
                  {/* <Link to={"/registration"} className="text-end w-100 fw-bold ">
                Register
              </Link> */}
                  <a href="/registration" className="text-end w-100 fw-bold">
                    Register
                  </a>
                </span>
              </>
            }
          </div>
        </form>
      ) : (
        <OtpComponent globalEmail={email} loginPage={true} />
      )}
      {loading && pop2.loading()}
    </>
  );
};

export default InstituteLogin;
