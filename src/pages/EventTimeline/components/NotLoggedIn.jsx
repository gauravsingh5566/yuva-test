import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login');
  };
  const handleClickReg = () => {
    navigate('/register');
  };

  return (
    <>
      <div className=" border rounded-4  mb-3 ">
        <div className=" p-3 ">
          <div className=" text-start text-dark ms-2">
            <h5>Login/Register Here</h5>
          </div>
          <br />
          <div className="d-flex">
            <button
              onClick={handleClickLogin}
              style={{
                padding: '6px 15px',
                borderRadius: '12px',
                marginRight: '12px',
              }}
              class="btn btn-primary">
              Login/Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotLoggedIn;
