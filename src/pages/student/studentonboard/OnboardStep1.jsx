import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { Avatar, FormControl, FormHelperText, FormLabel, InputAdornment } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';
import { apiAuth } from 'api';
import { Popup } from 'layout/Popup';
const OnboardStep1 = ({ formik, profile, setProfile }) => {
  let [education, setEducation] = useState('');
  const { userData } = useGlobalContext();
  // console.log(userData.instituteId)
  async function getEductaionType() {
    try {
      const res = await apiAuth.get('/student/onboard/education?instituteId=' + userData.instituteId);
      if (res.status === 200) {
        // console.log(res?.data?.result)
        setEducation(res?.data?.result[0]?.question2);
      }
    } catch (err) {}
  }
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
  function render(education) {
    switch (education) {
      case 'school':
        return (
          <>
            <option key="12th" value={'12th'}>
              12th
            </option>
            <option key="11th" value={'11th'}>
              11th
            </option>
            <option key="10th" value={'10th'}>
              {' '}
              10th
            </option>
            <option key="9th" value={'9th'}>
              9th
            </option>
            <option key="8th" value={'8th'}>
              8th
            </option>
            <option key="7th" value={'7th'}>
              7th
            </option>
            <option key="6th" value={'6th'}>
              6th
            </option>
            <option key="below 6th" value={'below 6th'}>
              below 6th
            </option>
          </>
        );
      case 'college':
        return (
          <>
            <option key="post-grad" value={'post-graduation'}>
              Post Graduation
            </option>
            <option key="grad" value={'graduation'}>
              Graduation
            </option>
            <option key="diploma" value={'diploma'}>
              Diploma
            </option>
          </>
        );
      case 'university':
        return (
          <>
            <option key="doctorate" value={'doctorate'}>
              Doctorate
            </option>
            <option key="post-grad" value={'post-graduation'}>
              Post Graduation
            </option>
            <option key="grad" value={'graduation'}>
              Graduation
            </option>
            <option key="diploma" value={'diploma'}>
              Diploma
            </option>
          </>
        );
      case 'other':
        return (
          <>
            <option key="doctorate" value={'doctorate'}>
              Doctorate
            </option>
            <option key="post-grad" value={'post-graduation'}>
              Post Graduation
            </option>
            <option key="grad" value={'graduation'}>
              Graduation
            </option>
            <option key="diploma" value={'diploma'}>
              Diploma
            </option>
            <option key="12th" value={'12th'}>
              12th
            </option>
            <option key="11th" value={'11th'}>
              11th
            </option>
            <option key="10th" value={'10th'}>
              {' '}
              10th
            </option>
            <option key="9th" value={'9th'}>
              9th
            </option>
            <option key="8th" value={'8th'}>
              8th
            </option>
            <option key="7th" value={'7th'}>
              7th
            </option>
            <option key="6th" value={'6th'}>
              6th
            </option>
            <option key="below 6th" value={'below 6th'}>
              below 6th
            </option>
          </>
        );
      default:
        return (
          <>
            <option key="doctorate" value={'doctorate'}>
              Doctorate
            </option>
            <option key="post-grad" value={'post-graduation'}>
              Post Graduation
            </option>
            <option key="grad" value={'graduation'}>
              Graduation
            </option>
            <option key="diploma" value={'diploma'}>
              Diploma
            </option>
            <option key="12th" value={'12th'}>
              12th
            </option>
            <option key="11th" value={'11th'}>
              11th
            </option>
            <option key="10th" value={'10th'}>
              {' '}
              10th
            </option>
            <option key="9th" value={'9th'}>
              9th
            </option>
            <option key="8th" value={'8th'}>
              8th
            </option>
            <option key="7th" value={'7th'}>
              7th
            </option>
            <option key="6th" value={'6th'}>
              6th
            </option>
            <option key="below 6th" value={'below 6th'}>
              below 6th
            </option>
          </>
        );
    }
  }
  useEffect(() => {
    getEductaionType();
  }, []);
  // console.log(education)
  return (
    <div className="row row-cols-1 row-cols-lg-2 border rounded-5 g-0" style={{ overflow: 'hidden' }}>
      <div className="col d-none d-lg-block">
        <img src="/assets/images/covers/onboardstudent1.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
      </div>
      <div className="col">
        <div className="row gy-4 p-3 p-md-4 p-xl-5">
          {/* ===============
        PassWord
        =============== */}
          <div className="col-12">
            <div className="gy-4 row align-items-center justify-content-between">
              <div className="col-12 col-lg-6 my-3">
                <span className="font-ubd fw-thin text-dark fs-5">Profile Picture</span>
                <br />
                <span>( Upload a Hi-resolution PNG or JPEG file only. )</span> <br />
                <span>( Max profile picture size 2mb )</span>
              </div>
              <div className="col-12 col-lg-6 my-3">
                <div className="d-flex align-items-center justify-content-between justify-content-lg-end">
                  <div className="rounded-4 d-flex-align-items-center">
                    <IconButton color="primary" aria-label="upload picture" component="label" className="btn bg-white">
                      <span className="fw-regular">Upload&nbsp;</span>
                      <input
                        hidden
                        name="profile"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        // onChange={(e) => setProfile(e.target.files[0])}
                        onChange={profileValidate}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </div>
                  <Avatar
                    alt=""
                    name="profilepic"
                    src={profile ? URL.createObjectURL(profile) : 'assets/images/avatars/avatar1.png'}
                    sx={{ width: 96, height: 96 }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <FormControl fullWidth>
              <FormLabel id="question3" className="text-dark mb-2">
                Education <span className="text-danger fs-5">*</span>
              </FormLabel>
              <select
                id="class"
                name="class"
                value={formik?.values.class}
                onChange={formik?.handleChange}
                error={formik?.errors.class && formik?.touched.class}
                className="form-select py-3">
                {render(education)}
                {/* <MenuItem key="doctorate" value={"doctorate"}>Doctorate</MenuItem>
                <MenuItem key="post-grad" value={"post-graduation"}>Post Graduation</MenuItem>,
                <MenuItem key="grad" value={"graduation"}>Graduation</MenuItem>,
                <MenuItem key="diploma" value={"diploma"}>Diploma</MenuItem>,
                <MenuItem key="12th" value={"12th"}>12th</MenuItem>,
                <MenuItem key="11th" value={"11th"}>11th</MenuItem>,
                <MenuItem key="10th" value={"10th"}> 10th</MenuItem>,
                <MenuItem key="9th" value={"9th"}>9th</MenuItem>,
                <MenuItem key="8th" value={"8th"}>8th</MenuItem>,
                <MenuItem key="7th" value={"7th"}>7th</MenuItem>,
                <MenuItem key="6th" value={"6th"}>6th</MenuItem>,
                <MenuItem key="below 6th" value={"below 6th"}>below 6th</MenuItem> */}
              </select>
              <FormHelperText>{formik?.touched?.class && formik?.errors?.class}</FormHelperText>
            </FormControl>
          </div>
          {/* ==================
        Bio 
        ================== */}
          <div className="col-12">
            <span className="font-ubd fw-thin text-dark fs-5">Add a short bio about yourself</span>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              placeholder="Write a note about yourself for everyone to see…"
              multiline
              rows={4}
              size="large"
              value={formik?.values.bio}
              onChange={formik?.handleChange}
              error={formik?.touched.bio && Boolean(formik?.errors.bio)}
              helperText={formik?.touched.bio && formik?.errors.bio}
            />
            {formik?.values?.bio?.length} Characters ( {400 > formik?.values?.bio?.length ? 400 - formik?.values?.bio?.length : 0} left )
          </div>
          {/* ==================
        Socials 
        ================== */}
          <span className="font-ubd fw-thin text-dark">Link your Social Media Accounts</span>
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
          {/* ==================
        Some Questions 
        ================== */}
          <span className="font-ubd fw-thin text-dark">{/* Can give a  Heading Here */}</span>
        </div>
      </div>
    </div>
  );
};

export default OnboardStep1;
