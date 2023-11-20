import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Avatar, InputAdornment, TextField, Tooltip } from '@mui/material';
import { DriveFolderUploadTwoTone, Facebook, HelpOutlineOutlined, Instagram, LinkedIn, Star, Twitter, YouTube } from '@mui/icons-material';
import { Popup } from 'layout/Popup';

const Step2 = ({ profile, setProfile, formik }) => {
  const profileValidate = (e) => {
    if (e.target?.files[0]?.size < 1500000) {
      setProfile(e.target?.files[0]);
    } else {
      if (e.target?.files[0]) {
        e.target.value = null;
        Popup('warning', 'Your profile picture should have a maximum file size of 2MB');
      }
    }
  };
  return (
    <div className="row row-cols-1  row-cols-lg-2 border rounded-4 g-0" style={{ overflow: 'hidden' }}>
      <div className="col p-1 p-sm-2  p-xs-3">
        {/* ==================
        Some Questions 
        ================== */}
        <div className="gy-4 row align-items-center justify-content-between p-2 p-md-4 p-lg-5">
          <div className="col-12 col-lg-6 my-3">
            <h3 className="fs-4 font-ubd fw-thin text-dark text-initial" style={{ fontWeight: 500 }}>
              Upload the logo of your institution
              <Tooltip arrow title={<span className="text-white fs-6">Upload a Hi-resolution PNG or JPEG file only.</span>}>
                <HelpOutlineOutlined sx={{ marginLeft: 1 }} />
              </Tooltip>
            </h3>
          </div>
          <div className="col-12 col-lg-6 my-3">
            <div className="d-flex align-items-center justify-content-between justify-content-lg-end">
              <IconButton
                color="primary"
                className="me-2"
                aria-label="upload picture"
                component="label"
                sx={{ width: 56, height: 56, fontSize: '30px !important' }}>
                <input hidden name="profile" accept=".png, .jpg, .jpeg" type="file" onChange={profileValidate} />
                <DriveFolderUploadTwoTone className="fs-1" />
              </IconButton>
              <Avatar alt="" name="profilepic" src={profile ? URL.createObjectURL(profile) : ''} sx={{ width: 96, height: 96 }} />
            </div>
          </div>
          {/* ==================
        Socials 
        ================== */}
          <hr />
          <div>
            <div className="row g-3">
              <p className="font-ubd text-dark">Link the social media accounts of your Institution</p>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="fb"
                  name="fb"
                  label="Facebook"
                  size="large"
                  type={'url'}
                  value={formik?.values.fb}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.fb)}
                  helperText={formik?.errors.fb}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook sx={{ color: 'blue' }} />{' '}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  type={'url'}
                  size="large"
                  value={formik?.values.twitter}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.twitter)}
                  helperText={formik?.errors.twitter}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter sx={{ color: 'skyblue' }} />{' '}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="insta"
                  name="insta"
                  label="Instagram"
                  type={'url'}
                  size="large"
                  value={formik?.values.insta}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.insta)}
                  helperText={formik?.errors.insta}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram sx={{ color: 'tomato' }} />{' '}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="lkd"
                  name="lkd"
                  label="LinkedIn"
                  type={'url'}
                  size="large"
                  value={formik?.values.lkd}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.lkd)}
                  helperText={formik?.errors.lkd}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn sx={{ color: 'blue' }} />{' '}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  id="ytb"
                  name="ytb"
                  label="Youtube"
                  type={'url'}
                  size="large"
                  value={formik?.values.ytb}
                  onChange={formik?.handleChange}
                  error={Boolean(formik?.errors.ytb)}
                  helperText={formik?.errors.ytb}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTube sx={{ color: 'red' }} />{' '}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col bg-light-white2-grad  d-none d-lg-block">
        <img src="/images/onboard/female-teacher.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
};

export default Step2;
