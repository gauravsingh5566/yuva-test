import React, { useState, useEffect } from 'react';
import { useGlobalContext } from 'global/context';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from 'api';
import { toast } from 'react-hot-toast';
import { Avatar } from '@mui/material';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';
const DashboardHeader = ({ setEdit }) => {
  const navigate = useNavigate();
  const { userData, token, removeToken, removeUser } = useGlobalContext();
  const [details, setDetails] = useState({});
  const [isEdit, setIsEdit] = useState(setEdit);
  const { ErrorResponder } = useError();
  const fetchDetails = async () => {
    try {
      const res = await apiAuth.get('/student/detail', {
        headers: { Authorization: token },
      });
      if (res.status === 200) {
        setDetails(res.data.result[0]);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  useEffect(() => {
    if (token) {
      // fetchDetails();
    }
  }, [token]);

  return (
    <React.Fragment>
      <div className="container">
        <div>
          <img
            src="https://img.freepik.com/free-vector/abstract-shape-with-halftone-background_1409-1277.jpg?t=st=1674384483~exp=1674385083~hmac=c15416d4a9483d729a0d4b544a11cd5eb151ac8ae4ba8757adcf420aaa7565bb"
            alt=""
            className="w-100 rounded-4"
            style={{ height: '330px', objectFit: 'cover' }}
          />
        </div>
        <div className="d-flex justify-content-between p-3">
          <div className="d-flex">
            <Avatar
              alt={details ? details?.first_name : 'Avatar'}
              src={details?.profile}
              sx={{ width: 146, height: 146 }}
              style={{ marginTop: '-40px' }}
              className="ms-4 shadow-lg"
            />
            <div className="p-2" style={{ maxWidth: '650px' }}>
              <h3 className="fs-2 text-initial">
                {details?.first_name} {details?.middle_name} {details?.last_name}
              </h3>
              <p className="fs-6">{details?.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeader;
