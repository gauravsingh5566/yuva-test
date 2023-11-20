import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import AccessDenied from 'components/Fallback/AccessDenied';
import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function OfflineEventsList({ eventId, setEventId, loading, setImageCount }) {
  const [imgList, setImgList] = useState([]);
  function fetch() {
    apiAuth
      .get('/public/offline_event_image?id=' + eventId)
      .then((res) => {
        // console.log(res.data);
        setImgList(res.data?.result);
        setImageCount(res.data?.result?.length);
      })
      .catch((err) => {});
  }

  const handleDeleteImg = (img) => {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You want to delete this image!',
      icon: 'warning',
      showCancelButton: 'true',
      confirmButtonText: 'Yes',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        apiAuth
          .delete('/public/offline_event_image?id=' + img?.id)
          .then((res) => {
            toast.success(res?.data?.message);
            fetch();
          })
          .catch((err) => {
            toast.error('Something Is Wrong!!');
          });
      }
    });
  };

  useEffect(() => {
    if (eventId) {
      fetch();
    }
  }, [eventId, loading]);
  return (
    <div>
      <div className="container bg-light row row-cols-1 row-cols-sm-1 m-2  row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {imgList.length ? (
          imgList?.map((img, index) => (
            <div className=" position-relative">
              <div className=" position-absolute top-0 end-0">
                <IconButton onClick={() => handleDeleteImg(img)} className="bg-light">
                  <Delete
                    sx={{
                      color: 'RGB(235, 107, 52)',
                    }}
                  />
                </IconButton>
              </div>
              <img key={index} src={img?.link} className="img-thumbnail bg-light border-0 p-3" alt={img?.link} />
            </div>
          ))
        ) : (
          <AccessDenied
            img={'https://glcloud.in/images/static/graphics/certificatefallback.webp'}
            message={`Upload Images by Clicking "Add Event Images" Button`}
          />
        )}
        {/* {setEventId &&
          <div className='m-2 w-auto mx-auto w-auto d-flex justify-content-center  bg-light'>
            <Tooltip title="Add Event Images" >
              <button className='border-0 shadow-none bg-light w-auto' onClick={() => setEventId(eventId)} type="button" data-bs-toggle="modal" data-bs-target="#imageUploadModal">
                <div className="card p-4 bg-light mx-auto" ><Add /></div>
              </button>
            </Tooltip>
          </div>
        } */}
      </div>
    </div>
  );
}

export default OfflineEventsList;
