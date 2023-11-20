import { CheckCircle, Email, VerifiedRounded } from '@mui/icons-material';
import { Button, FormControl, InputLabel, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { apiJson } from 'api';
import { useFormik } from 'formik';
import useError from 'lib/errorResponse';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [state, setState] = useState();
  const [form, setForm] = useState(-1);
  const { ErrorResponder } = useError();
  const [loading, setLoading] = useState('loading');
  const verifyFunction = async () => {
    try {
      if (token) {
        const res = await apiJson.get(`auth/verify-account?token=` + token);

        setState(res?.data?.status);
        switch (res?.data?.status) {
          case 'success':
            toast.dismiss();
            setLoading(false);
            toast.success(res?.data?.message);
            // setTimeout(() => {
            //   navigate("/login");
            // }, 10000);
            break;
          case 'invalid':
            toast.dismiss();
            // toast.warning(res?.data?.message);
            setLoading(false);
            break;
          case 'error':
            toast.dismiss();
            // toast.error(res?.data?.message);
            setLoading(false);
            break;
        }
      } else {
        navigate('/error');
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };

  const { handleSubmit, setFieldValue, handleChange, values } = useFormik({
    initialValues: {
      email: '',
      name: '',
      type: '',
    },
    onSubmit: async ({ email, name, type }, action) => {
      try {
        toast.loading('Loading......');
        const res = await apiJson.post('/auth/send-verification-email', {
          email,
          name,
          type,
        });
        setUser(res.data?.decoded);
        switch (res?.data?.status) {
          case 'success':
            toast.dismiss();
            toast.success(res?.data?.message);
            setForm(0);
            break;
          case 'warning':
            toast.dismiss();
            toast.warning(res?.data?.message);
            break;
          case 'error':
            toast.dismiss();
            toast.error(res?.data?.message);
            break;
        }
      } catch (error) {
        ErrorResponder(error);
      }
    },
  });
  useEffect(() => {
    verifyFunction();
  }, []);

  return (
    <div className="constainer min-vh-50">
      {loading ? (
        'Verifying Your Account Please Wait..'
      ) : (
        <div className="container my-auto w-75  mt-5">
          {state === 'success' && (
            <div className="card p-2 w-lg-50 m-lg-5 shadow  m-auto text-center">
              <h3 className="text-sucess">Welcome To Yuvamanthan!</h3>
              {user?.type !== 'institue' ? (
                <>
                  <p>
                    Your account has been successfully verified. <VerifiedRounded color="success" /> <br /> A member of the Yuvamanthan team will be
                    in touch with you shortly to assist you with logging in to your account. For additional information, please contact us at
                    modelg20@yuvamanthan.org.
                  </p>
                  <Link to={'/login'}>
                    <Button variant="outlined" color="success" className="mx-auto p-2 px-3 shadow-sm bg-white">
                      LogIn
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-success">
                    Your Account is Verified Now. <VerifiedRounded /> <br />
                    We’re thrilled to have you join our community of learners. Our platform offers a wide range of resources and opportunities to help
                    you achieve your goals. Our team is dedicated to providing you with the best possible learning experience and we’re always here to
                    support you. We can’t wait to see all that you’ll accomplish. Let’s get started on this exciting journey together!
                  </p>
                  <Link to="/login">
                    <Button variant="contained" className="border mx-auto bg-success text-light shadow-sm">
                      Login Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
          {state === 'error' && (
            <div className="card p-3 w-lg-50 m-lg-5 shadow  m-auto text-center">
              {form === -1 && (
                <div className="constainer m-auto text-center">
                  <h3>Verification Link is Expired</h3>
                  <p>Get verification Link by Clicling button below. </p>
                  <Button variant="contained" className="border text-light shadow" onClick={() => setForm(1)}>
                    Get Verification Link
                  </Button>
                </div>
              )}
              {form === 1 && (
                <div className="constainer d-flex justify-content-center text-center">
                  <form className="mx-auto mt-3" onSubmit={handleSubmit}>
                    <h4>Get Verification Email</h4>
                    <FormControl fullWidth>
                      <InputLabel id="type text-start">Who you Are</InputLabel>
                      <Select required className="m-2" onChange={(e) => setFieldValue('type', e.target.value)} id="type" fullWidth>
                        <MenuItem value="institute">Institute</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField fullWidth className="m-2" name="name" required label="Name" onChange={handleChange} />
                    <TextField fullWidth className="m-2" name="email" label="Email" required onChange={handleChange} />
                    <Button type="submit" variant="contained" className="border m-2" fullWidth>
                      Submit
                    </Button>
                  </form>
                </div>
              )}
              {form === 0 && (
                <div className="p-2  m-auto text-center">
                  <h3 className="text-info">
                    verification email send successfully <Email className="m-auto mb-1 fs-3" />{' '}
                  </h3>
                  <p>A verification email has been sent to your inbox. Please check your email to complete the verification process.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountVerify;
