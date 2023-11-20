import React, { useEffect } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import moment from 'moment';
import { useGlobalContext } from 'global/context';
import { apiJsonAuth } from 'api';
import { Chip } from '@mui/material';
import { useParams } from 'react-router-dom';

export function Notifications() {
  const { id } = useParams();
  const { userData } = useGlobalContext();
  const [notify, setNotify] = React.useState([]);
  function fetchNotification() {
    apiJsonAuth
      .get('/public/notification', {
        unique_id: userData?.id,
        reference_id: userData?.instituteId,
        role: userData?.role,
      })
      .then((result) => {
        setNotify(result.data.notify);
      })
      .catch((error) => console.error(error));
  }
  React.useEffect(() => {
    if (userData) {
      // fetchNotification();
    }
  }, []);

  useEffect(() => {
    if (id) {
      window.location = '#note' + id;
    }
  });

  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <div className="container my-2">
      <h3 className="my-3 lh-1 mt-1 text-center fw-bold " style={{ textShadow: '2px 2px 5px lightblue' }}>
        Notification <NotificationsNoneIcon className="fw-bold" color="info" />
      </h3>
      <div className="d-flex justify-content-center">
        <div className="mx-auto">
          {notify?.map(({ id, heading, subheading, desc, createdAt }) => (
            <div
              key={id}
              id={'note' + id}
              style={{ maxWidth: '800px' }}
              className="d-flex bg-light shadow-lg justify-content-between align-items-center p-3 hover-s shadow-sm rounded-3 mb-3">
              <div className="d-flex ">
                <div>
                  <h6 className="text-dark my-1">
                    <strong>{heading} </strong>
                  </h6>
                  <p className="my-1 text-decoration-underline text-ligth">{subheading}</p>
                  <div dangerouslySetInnerHTML={createMarkup(desc)}></div>
                  <Chip label={moment(createdAt).fromNow()} variant="outlined" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
