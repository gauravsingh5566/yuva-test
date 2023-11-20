import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { HelpOutlineTwoTone } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, MenuItem, Select, Tooltip } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';

const Step1 = ({ formik, details }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (details?.bio) {
      formik.setFieldValue('bio', details?.bio);
    }
  }, [details]);
  const instituteLevelWiseOptions = () => {
    switch (formik?.values?.question2) {
      case 'school':
        return [
          <MenuItem key="Upper primary/Middle School(Standards VI to VIII)" value="Upper primary/Middle School(Standards VI to VIII)">
            Upper primary/Middle School(Standards VI to VIII)
          </MenuItem>,
          <MenuItem key="General/Lower Secondary School (IX to X)" value="General/Lower Secondary School (IX to X)">
            General/Lower Secondary School (IX to X)
          </MenuItem>,
          <MenuItem key="Upper/ Senior Secondary (XI and XII)" value="Upper/ Senior Secondary (XI and XII)">
            Upper/ Senior Secondary (XI and XII)
          </MenuItem>,
        ];
        break;
      case 'college':
        return [
          <MenuItem key="Graduation only" value="Graduation only">
            Graduation only
          </MenuItem>,
          <MenuItem key="Post Graduation only" value="Post Graduation only">
            Post Graduation only
          </MenuItem>,
          <MenuItem key="Graduation and Post Graduation" value="Graduation and Post Graduation">
            Graduation and Post Graduation
          </MenuItem>,
        ];
        break;
      case 'university':
        return [
          <MenuItem key="Graduation only" value="Graduation only">
            Graduation only
          </MenuItem>,
          <MenuItem key="Post Graduation only" value="Post Graduation only">
            Post Graduation only
          </MenuItem>,
          <MenuItem key="Graduation and Post Graduation" value="Graduation and Post Graduation">
            Graduation and Post Graduation
          </MenuItem>,
          <MenuItem key="Doctoral" value="Doctoral">
            Doctoral
          </MenuItem>,
        ];
        break;
      case 'other':
        return [
          <MenuItem key="Upper primary/Middle School(Standards VI to VIII)" value="Upper primary/Middle School(Standards VI to VIII)">
            Upper primary/Middle School(Standards VI to VIII)
          </MenuItem>,
          <MenuItem key="General/Lower Secondary School (IX to X)" value="General/Lower Secondary School (IX to X)">
            General/Lower Secondary School (IX to X)
          </MenuItem>,
          <MenuItem key="Upper/ Senior Secondary (XI and XII)" value="Upper/ Senior Secondary (XI and XII)">
            Upper/ Senior Secondary (XI and XII)
          </MenuItem>,
          <MenuItem key="Graduation only" value="Graduation only">
            Graduation only
          </MenuItem>,
          <MenuItem key="Post Graduation only" value="Post Graduation only">
            Graduation only
          </MenuItem>,
          <MenuItem key="Graduation and Post Graduation" value="Graduation and Post Graduation">
            Graduation and Post Graduation
          </MenuItem>,
          <MenuItem key="Doctoral" value="Doctoral">
            Doctoral
          </MenuItem>,
        ];
        break;
    }
  };
  return (
    <div className="row row-cols-1 row-cols-lg-2 border rounded-4 g-0" style={{ overflow: 'hidden' }}>
      <div className="col  d-none d-lg-block bg-light-white2-grad">
        <img src="/images/onboard/instituteonboard1.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
      </div>
      <div className="col rounded">
        <div className="row gy-2 p-3 p-md-4 p-xl-5">
          {/* ===============
        PassWord
        =============== */}
          {/* <span className="font-ubd fw-thin text-dark">
            Password <small className="text-danger fs-5">*</small>
          </span>
          <div className="col-12 col-md-6">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik?.values.password}
                onChange={formik?.handleChange}
                error={formik?.touched.password && Boolean(formik?.errors.password)}
                helperText={formik?.touched.password && formik?.errors?.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(setShowPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="text-danger">{formik?.touched.password && formik?.errors?.password}</FormHelperText>
            </FormControl>
          </div>
          <div className="col-12 col-md-6">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formik?.values.confirm_password}
                onChange={formik?.handleChange}
                error={formik?.touched.confirm_password && Boolean(formik?.errors.confirm_password)}
                helperText={formik?.touched.confirm_password && formik?.errors.confirm_password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(setShowConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div> */}
          <div className="col-12">
            <FormControl fullWidth>
              <FormLabel id="question2" className="text-dark mb-2">
                Type of Institution <span className="text-danger fs-5">*</span>
              </FormLabel>
              <Select
                id="question2"
                name="question2"
                value={formik?.values.question2}
                onChange={formik?.handleChange}
                error={formik?.errors.question2 && formik?.touched.question2}>
                <MenuItem value="school">School</MenuItem>
                <MenuItem value="college">College</MenuItem>
                <MenuItem value="university">University</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-12">
            <FormControl fullWidth>
              <FormLabel id="question3" className="text-dark mb-2">
                Participants Profile <span className="text-danger fs-5">*</span>{' '}
                <Tooltip title="Who is expected to participate?">
                  <HelpOutlineTwoTone className="fs-5" />
                </Tooltip>
              </FormLabel>
              <Select
                id="question3"
                name="question3"
                value={formik?.values.question3}
                onChange={formik?.handleChange}
                error={formik?.errors.question3 && formik?.touched.question3}>
                {instituteLevelWiseOptions()}
              </Select>
            </FormControl>
          </div>
          {/* ==================
        Bio 
        ================== */}
          <span className="font-ubd fw-thin text-dark fs-6">Add a Short Bio</span>
          <div className="col-12">
            <TextField
              fullWidth
              id="bio"
              name="bio"
              placeholder="XYZ University is a world-renowned academic institution that has been at the forefront of innovation and excellence in education for over a century."
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
        Some Questions 
        ================== */}
          <span className="font-ubd fw-thin text-dark">{/* Can give a  Heading Here */}</span>
          <div className="col-12">
            <FormLabel id="question1" className="text-dark">
              Number of students in your institution (Approx) ?
            </FormLabel>
            <TextField
              id="question1"
              label="Enter Count"
              type={'number'}
              fullWidth
              className="mt-2"
              variant="outlined"
              value={formik?.values.question1}
              onChange={formik?.handleChange}
              error={formik?.touched.question1 && Boolean(formik?.errors.question1)}
              helperText={formik?.touched.question1 && formik?.errors.question1}
            />
          </div>
          <div className="col-12">
            <FormControl>
              <FormLabel id="question4" className="text-dark">
                Does your institute conduct Model United Nations ?
              </FormLabel>
              <RadioGroup
                row
                id="question4"
                name="question4"
                value={formik?.values.question4}
                onChange={formik?.handleChange}
                error={formik?.touched.question4 && Boolean(formik?.errors.question4)}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>{formik?.touched.question4 && formik?.errors.question4}</FormHelperText>
            </FormControl>
          </div>
          <div className="col-12">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" className="text-dark">
                Does your institute conduct Youth Parliament ?
              </FormLabel>
              <RadioGroup
                row
                id="question5"
                name="question5"
                value={formik?.values.question5}
                onChange={formik?.handleChange}
                error={formik?.touched.question5 && Boolean(formik?.errors.question5)}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>{formik?.touched.question5 && formik?.errors.question5}</FormHelperText>
            </FormControl>
          </div>
          {/* <div className="col-12 col-lg-6">
            <FormControl>
              <FormLabel id="question6" className="text-dark">
                Would you like to use Yuvamanthan’s printing services to print your summit collaterals?
              </FormLabel>
              <RadioGroup
                row
                id="question6"
                name="question6"
                value={formik?.values.question6}
                onChange={formik?.handleChange}
                error={formik?.touched.question6 && Boolean(formik?.errors.question6)}
                helperText={formik?.touched.question6 && formik?.errors.question6}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No thanks we have our own printers" />
              </RadioGroup>
            </FormControl>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Step1;
