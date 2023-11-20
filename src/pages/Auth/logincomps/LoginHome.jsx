import { Person2Outlined, SchoolOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h4 className="text-center mt-5">Who are you?</h4>{' '}
        <div className="row g-2 row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xxl-2 justify-content-around">
          <div className="col">
            <Button
              variant="contained"
              color="warning"
              fullWidth
              className="text-initial text-nowrap fw-light fs-5 m-1 rounded"
              sx={{ p: 2 }}
              onClick={() => navigate('/login/institute')}
              startIcon={<SchoolOutlined sx={{ mr: 0, height: 35, width: 35 }} />}>
              An&nbsp;Institution
            </Button>
          </div>
          <div className="col">
            <Button
              variant="contained"
              fullWidth
              color="success"
              className="text-initial fw-light text-start fs-5 m-1 rounded"
              sx={{ p: 2 }}
              startIcon={<Person2Outlined sx={{ mr: 0, height: 35, width: 35 }} />}
              onClick={() => navigate('/login/student')}>
              A&nbsp;Student
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHome;
