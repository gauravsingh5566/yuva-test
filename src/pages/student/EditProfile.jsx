import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { studentRegisterSchema } from 'schema/register';
import { toast } from 'react-hot-toast';
import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';

const EditProfile = () => {
  const { ErrorResponder } = useError();
  const [profile, setProfile] = useState('');
  const { token } = useGlobalContext();
  let collegeId = 5;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      dob: '2001-01-26',
      first_name: '',
      middle_name: '',
      last_name: '',
      contact: '',
      father_name: '',
      gender: 'female',
      confirm_password: '',
    },
    validationSchema: studentRegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      toast.dismiss();
      toast.loading('Submiting the form');
      const formData = new FormData();
      formData.append('profile', profile);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('dob', values.dob);
      formData.append('instituteId', collegeId);
      formData.append('first_name', values.first_name);
      formData.append('middle_name', values.middle_name);
      formData.append('last_name', values.last_name);
      formData.append('contact', values.contact);
      formData.append('father_name', values.father_name);
      formData.append('gender', values.gender);
      if (token) {
        try {
          const res = await apiAuth.post('/auth/register?type=0', formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status == 200) {
            toast.dismiss();
            toast.success('Registered Successfully');
            resetForm();
            setProfile('');
          }
        } catch (error) {
          if (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
          }
          ErrorResponder(error);
        }
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row gy-4">
        <div className="col-12 col-lg-4">
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            size="large"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </div>
        <div className="col-12 col-lg-4">
          <TextField
            fullWidth
            id="middle_name"
            name="middle_name"
            label="Middle Name"
            size="large"
            value={formik.values.middle_name}
            onChange={formik.handleChange}
            error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
            helperText={formik.touched.middle_name && formik.errors.middle_name}
          />
        </div>
        <div className="col-12 col-lg-4">
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            size="large"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="contact"
            name="contact"
            label="Contact"
            size="large"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
          />
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="dob"
            name="dob"
            type="date"
            label="Date of Birth"
            size="large"
            value={formik.values.dob}
            onChange={formik.handleChange}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="father_name"
            name="father_name"
            label="Father's Name"
            size="large"
            value={formik.values.father_name}
            onChange={formik.handleChange}
            error={formik.touched.father_name && Boolean(formik.errors.father_name)}
            helperText={formik.touched.father_name && formik.errors.father_name}
          />
        </div>
        <div className="col-12">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formik.values.gender}
              id="gender"
              name="gender"
              onChange={formik.handleChange}
              row>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="col-12 col-lg-6">
          <TextField
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
          />
        </div>
        <div className="col-12">
          <Button color="warning" variant="contained" className="py-3" size="large" fullWidth type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
