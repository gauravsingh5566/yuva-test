import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StateHeader = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div
        className="p-4"
        style={{
          background: `url(/images/events/goa/goabg.jpg) no-repeat center`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 0 2000px rgba(23,23,23,0.6)',
        }}>
        <div className="container">
          <div
            className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between h-100"
            style={{ minHeight: '160px' }}>
            <div>
              <h1 className="text-white text-center text-lg-start">
                <span style={{ textShadow: '2px 2px var(--main-color)' }}>About YMG20</span>{' '}
                <span className="text-primary" style={{ textShadow: '2px 2px white' }}>
                  {' '}
                  Goa
                </span>
              </h1>{' '}
            </div>
            <div>
              <Button
                // color="warning"
                variant="contained"
                sx={{ p: 2 }}
                className="text-initial fs-6 font-ubd rounded-4 bg-primary hover-ripple"
                onClick={() => navigate('/registration')}>
                Register as an Institute
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StateHeader;
