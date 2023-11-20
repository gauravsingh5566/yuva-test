import { apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import { Popup } from 'layout/Popup';
import React from 'react';
import { toast } from 'react-toastify';
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import { Button } from '@mui/material';

const VerficationEmailMessage = ({ globalEmail, globalPass }) => {
  const navigate = useNavigate();
  const { setUser, setToken } = useGlobalContext();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      Popup('loading');
      const res = await apiJson.post(`auth/login`, {
        identifier: globalEmail,
        password: globalPass,
      });
      switch (res?.data?.status) {
        case 'success':
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace('/dashboard/');
          break;
        case 'error':
        case 'notfound':
        case 'warning':
          navigate('/login');
          break;
        case 'onboard':
          setUser(res.data.user);
          setToken(res.data.jwt);
          window.location.replace('/dashboard/onboard');
          break;
      }
    } catch (error) {
      if (error) {
        toast.error();
        toast.warning('Login failed please try again later');
      }
    }
  };
  return (
    <div>
      <div className="text-center">
        <ConfettiExplosion />
        <img src="/images/verifyemail.jpg" alt="" className="w-100 mb-2" style={{ maxHeight: '150px', objectFit: 'contain' }} />
        <h4>Verify Account</h4>
        <p className="fs-6">
          To activate your account and access our services, please verify your email address by clicking the verification link we sent to your email (
          {globalEmail}). If you can't find the email, kindly check your spam folder. Once verified, you'll be all set to enjoy our platform.
        </p>
        <p className="fs-6">
          Stay connected ! <br />
          <Button
            onClick={handlesubmit}
            className="rounded text-capitalize mt-3"
            size="large"
            variant="outlined"
            color="warning"
            startIcon={<Dashboard />}>
            Dashboard
          </Button>
        </p>
      </div>
    </div>
  );
};

export default VerficationEmailMessage;
