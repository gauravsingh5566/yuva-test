import React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import { apiAuth } from 'api';
import Swal from 'sweetalert2';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';

const Banner = ({ details }) => {
  const [banner, setBanner] = React.useState('');
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
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
        const res = await apiAuth.put(`/institute/profile?update_type=banner`, formData, {
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
        ErrorResponder(error);
        // if (error) {
        //   Swal.fire({
        //     width: 400,
        //     title: error.response.data.message
        //       ? error.response.data.message
        //       : "Something Went Wrong Check  your Network Connection",
        //     icon: "error",
        //   });
        // }
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
          <img
            src={banner ? URL.createObjectURL(banner) : process.env.REACT_APP_API_BASE_URL + details?.banner}
            alt=""
            className="w-100 border rounded-3"
            style={{ height: '200px', objectFit: 'cover' }}
          />
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
