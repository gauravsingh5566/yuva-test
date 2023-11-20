import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiJson, postVerifyCaptcha } from 'api';
import { Popup } from 'layout/Popup';
import ReCAPTCHA from 'react-google-recaptcha';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';

const theme = createTheme();

export default function ForgetPassword() {
  const [type, setType] = useState(0);
  const navigate = useNavigate();
  const captchaRef = useRef();
  const [email, setEmail] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaValue = await captchaRef.current.getValue();
    try {
      if (recaptchaValue) {
        Popup('loading', 'Processing your request');
        const res = await apiJson.post(
          `auth/forgot`,
          {
            type: type,
            email: email,
          },
          {
            headers: {
              recaptchavalue: recaptchaValue,
            },
          }
        );
        if (res?.status == 200) {
          Popup('success', res.data.message);
          navigate('/login');
          captchaRef.current.reset();
        }
      } else {
        toast.error('Please verify Captcha');
      }
    } catch (error) {
      Popup('error', error?.response?.data?.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="border rounded-4" style={{ overflow: 'hidden' }}>
        <div className="row row-cols-1 row-cols-lg-2  g-0">
          <div className="col">
            <img src="/images/forgot-pass.jpg" alt="" className="w-100 d-block" />
          </div>
          <div className="col bg-light">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className="h-100 p-2 p-lg-4">
              <div className="d-flex align-items-center h-100 flex-column justify-content-center">
                <Typography component="h1" variant="h4" className="fw-bold">
                  Reset Password
                </Typography>
                <div className="text-dark fs-6 text-center">You can reset your password in few clicks</div>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel>You are a / an</InputLabel>
                    <Select label={'You are a / an'} value={type} onChange={(e) => setType(e.target.value)}>
                      <MenuItem value={0}>Student</MenuItem>
                      <MenuItem value={1}>Institution</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    placeholder="What is your registered email?"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" fullWidth className="text-initial" variant="contained" sx={{ mt: 3, mb: 2, p: 2 }}>
                    Reset Password
                  </Button>
                  <a href={'mailto:help@yuvamanthan.org'} className="text-center">
                    Facing Issue? <span className="text-dark">Drop us a Mail</span>
                  </a>
                </Box>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
