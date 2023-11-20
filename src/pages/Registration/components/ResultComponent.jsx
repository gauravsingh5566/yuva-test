import React from 'react';
import { Button } from '@mui/material';
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiJson } from 'api';
import { Popup, pop2 } from 'layout/Popup';
import { useGlobalContext } from 'global/context';
import { Dashboard } from '@mui/icons-material';

const ResultComponent = ({ globalEmail, globalPass }) => {
  const navigate = useNavigate();
  const { setUser, setToken } = useGlobalContext();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      Popup('loading');
      let type = 1;
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
    <div className="text-center h-100 px-lg-4">
      <div className="d-flex align-items-center justify-content-center">
        <div>
          <ConfettiExplosion />
          <img src="/images/verifyemail.jpg" alt="" className="w-100 mb-2" style={{ maxHeight: '150px', objectFit: 'contain' }} />
          <h4>Verify Account</h4>
          <p className="fs-6">
            To activate your account and access our services, please verify your email address by clicking the verification link we sent to your email
            ({globalEmail}). If you can't find the email, kindly check your spam folder. Once verified, you'll be all set to enjoy our platform.
          </p>
          <p className="fs-6">
            Stay connected ! <br />
            {/* <Button onClick={handlesubmit} className="rounded text-capitalize mt-3" size="large" variant="outlined" color="warning" startIcon={<Dashboard />}>Dashboard</Button> */}
          </p>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="text-start ">
        <h6>What is a YMG20 Institutional Dashboard?</h6>
        <p className="fs-6">
          We have created a dashboard through which you will be able to invite students and even affiliated colleges in your institution to
          participate in the Yuvamanthan Model G20 summit. The YMG20 Institutional Dashboard can also be used to manage the summits by assigning
          roles, countries and tracks to the participants.
        </p>
        <hr />
        <span className="text-dark">
          <b className="text-danger">*</b> Due to bulk emailing sometimes our emails might get delivered to the wrong folders. Please check your
          emails spam and promotional folders and add us to your safe senders' list.
        </span>
      </div>
    </div>
  );
};

export default ResultComponent;
