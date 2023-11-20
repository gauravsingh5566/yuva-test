import * as yup from 'yup';

// export const instituteregisterSchema = yup.object().shape({
//     title: yup.string().max(10).required("Title is Required"),
//     first_name: yup.string().max(100).required("First Name is Required"),
//     middle_name: yup.string().min(0).max(100),
//     last_name: yup.string().max(100).required("Last Name is Required"),
//     institute_name: yup.string().max(200).required("Institute is Required"),
//     institute_address: yup.string().max(1000).required("Institute Address is Required"),
//     state: yup.string().max(100).required("State is Required"),
//     district: yup.string().required("District is Required"),
//     pincode: yup
//       .string()
//       .required("Pin code is Required")
//       .matches(/^[0-9]{6}$/, "Invalid Pin code"),
//     email: yup.string().email().required("Email is required"),
//     confirm_email: yup.string().oneOf([yup.ref("email"), null], "Email must match"),
//     contact: yup
//       .string()
//       .required("Phone Number is Required")
//       .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
//   });

export const editInstituteBasicProfile = yup.object().shape({
  title: yup.string().max(10).required('Title is Required'),
  first_name: yup.string().max(100).required('First Name is Required'),
  last_name: yup.string().max(100).required('Last Name is Required'),
  email: yup.string().email().required('Email is required'),
  contact: yup
    .string()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
});

export const editStudentBasicProfile = yup.object().shape({
  first_name: yup.string().max(100).required('First Name is Required'),
  last_name: yup.string().max(100).required('Last Name is Required'),
  contact: yup
    .string()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
  email: yup.string().email().required('Email is required'),
  dob: yup.string().required('Pin code is Required'),
  father_name: yup.string().max(100).required('Father Name is Required'),
});
