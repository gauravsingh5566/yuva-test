import { apiAuth } from 'api';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, IconButton } from '@mui/material';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';

const Banner = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [banner, setBanner] = React.useState('');
  // Banner Photo upload
  async function uploadBanner(e) {
    e.preventDefault();
    Swal.fire({
      width: 300,
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const formData = new FormData();
    formData.append('file', banner);
    if (token) {
      try {
        const res = await apiAuth.put(`/student/profile?update_type=banner`, formData, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            width: 400,
          });
        }
      } catch (error) {
        if (error) {
          Swal.fire({
            width: 400,
            title: error.response.data.message ? error.response.data.message : 'Something Went Wrong Check  your Network Connection',
            icon: 'error',
          });
        }
        ErrorResponder(error);
      }
    }
  }

  return (
    <>
      <div className="col">
        <h3 className="text-initial fs-2 ps-4 border-start border-3 border-warning">Banner Photo</h3>
      </div>
      <div className="col">
        <form onSubmit={uploadBanner}>
          <img src={banner && URL.createObjectURL(banner)} alt="" className="w-100 border rounded-3" style={{ height: '200px' }} />
          <div className="d-flex align-items-center">
            <IconButton color="primary" aria-label="upload picture" component="label" sx={{ width: 76, height: 76 }}>
              <input hidden accept="image/*" type="file" required onChange={(e) => setBanner(e.target.files[0])} />
              <PhotoCamera />
            </IconButton>
            <Button color="warning" variant="contained" className="py-3 rounded-pill" size="large" type="submit">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Banner;
