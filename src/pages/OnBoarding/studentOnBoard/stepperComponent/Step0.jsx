import React, { useContext, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

export const Step0 = () => {


    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        studentFormik,
        setStudenteData,
      } = useContext(OnBoardContext)

      const [dob, setDob] = useState('2013-01-01');

      const handleDateChange = (event) => {
        setDob(event.target.value);
        console.log(event.target.value)
        formik.setFieldValue('dob', event.target.value)
        setStudenteData('date_of_birth', event.target.value)
      };

    const handleNextChild = () => {
        setActiveChildStep(activeChildStep + 1);
    
        if (activeChildStep >= stepperArray[count]?.childStep?.length-1 ) {
          setActiveStep(activeStep+1)
          setCount(count+1)
          setActiveChildStep(0)
          console.log("active step", activeStep , 'stepperlength', stepperArray.length)
          if(activeStep>stepperArray.length-2){
            console.log("inside the if condition")
            setCount(0);
            setActiveStep(0);
            setActiveChildStep(0);
          }
        }
        // if(activeStep>=stepperArray?.length-1){
        //   console.log("active step ", activeStep,"stepperArraydddddddddddddd", stepperArray.length)
        //   setActiveStep(0)
        //   setCount(0)
        // }
        console.log("this is length", stepperArray?.length)
        console.log("active step ", activeStep,"stepperArray", stepperArray.length)
    
      };

      
    const validation = Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      phone: Yup.number()
    .required('Required')
    .test('is-ten-digits', 'Phone number must be 10 digits', (value) => {
      return String(value).length === 10;
    }),
      dob: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      
  })
  const initialValues = {
    firstName: studentFormik.values.first_name ||'',
    lastName:studentFormik.values.last_name || '',
    phone:studentFormik.values.phone || '',
    dob:studentFormik.values.date_of_birth || '',
    gender:studentFormik.values.gender || '',
  }

  function copyValues() {
    const fieldMappings = {
      firstName: 'first_name',
      lastName: 'last_name',
      phone: 'phone',
      dob: 'date_of_birth',
      gender: 'gender',
      };
    const updatedValues = { ...studentFormik.values };
  
    for (const formikKey in fieldMappings) {
      const studentFormikKey = fieldMappings[formikKey];
      updatedValues[studentFormikKey] = formik.values[formikKey];
    }
  
    studentFormik.setValues(updatedValues);
  }
  const onSubmit = () => {
    copyValues()

      console.log()
      handleNextChild()
  }
  const formik = useFormik({
      initialValues,
      validationSchema: validation,
      onSubmit
  })


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-2 text-center text-lg-start">
        <span className=" fs-1 fw-600">About You</span>
      </div>
      <div>
        <div className="mb-50 text-center text-lg-start">
          <span
            className="fs-6 fw-500 color-grey"
          >
            Some detail about you
          </span>
        </div>
      </div>
      <div className="row mb-2">
        <div class=" mb-4 col-12 col-md-6">
          <span className="fs-5 mb-1 d-block">First Name</span>
          <input
            value={formik.values.firstName}
            type="text"
            class="form-control border-0  rounded-3  box-shadow-0"
            placeholder="First Name"
            onChange={(e)=>{
              setStudenteData('first_name', e.target.value)
              formik.setFieldValue('firstName', e.target.value)
            }}
            
          />
          {
              formik.touched.firstName && formik.errors.firstName && <span className="text-danger">{formik.errors.firstName}</span>
            }
        </div>
        <div class="mb-4 col-12 col-md-6">
          <span className="onboard-form-span mb-1 d-block">Last Name</span>
          <input
            value={formik.values.lastName}
            type="text"
            class="form-control  border-0  rounded-3 box-shadow-0"
            placeholder="Last Name"
            onChange={(e)=>{
              setStudenteData('last_name', e.target.value)
              formik.setFieldValue('lastName', e.target.value)
            }}
          />
          {
              formik.touched.lastName && formik.errors.lastName && <span className="text-danger">{formik.errors.lastName}</span>
            }
        </div>
        <div class="mb-4 col-12 col-md-6">
          <span className="onboard-form-span mb-1 d-block">Phone Number</span>
          <div class="d-flex">
            <select class="form-select rounded-3  border-0 box-shadow-0 w-auto me-2">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
            <input
             value={formik.values.phone}
              type="number"
              class="form-control rounded-3  box-shadow-0 border-0 box-shadow-0"
              placeholder="99*****99"
              onChange={(e)=>{
              setStudenteData('phone', e.target.value)
              formik.setFieldValue('phone',e.target.value)
            }}
            />
          
          </div>
          {
              formik.touched.phone && formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>
            }
        </div>
        <div class="mb-4 col-12 col-md-6">
          <span className="onboard-form-span mb-1 d-block">Date of Birth</span>
          <input
        value={formik.values.dob}
        type="date"
        className="form-control  border-0 rounded-3 box-shadow-0"
        placeholder="DOB"
        onChange={handleDateChange}
      />
      {
              formik.touched.dob && formik.errors.dob && <span className="text-danger">{formik.errors.dob}</span>
            }
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <span className="onboard-form-span mb-1 d-block">Gender</span>
        </div>
        <div className="d-flex">
          <div class="form-check me-4">
            <input
              class="form-check-input "
              type="radio"
              name="gender"
              id="Male"
              checked ={formik.values.gender==='male'}
              onChange={(e)=>{
              setStudenteData('gender', 'male')
              formik.setFieldValue('gender','male')
            }}
            />
            <label class="form-check-label" for="Male">
              Male
            </label>
          </div>
          <div class="form-check me-4">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="Female"
              checked ={formik.values.gender==='female'}
              onChange={(e)=>{
              setStudenteData('gender', 'female')
              formik.setFieldValue('gender','female')
            }}
            />
            <label class="form-check-label" for="Female">
              Female
            </label>
          </div>
          <div class="form-check me-4">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="Other"
              checked={formik.values.gender==='other'}
              onChange={(e)=>{
              setStudenteData('gender', 'other')
              formik.setFieldValue('gender','other')
            }}

            />
            <label class="form-check-label" for="Other">
              Other
            </label>
          </div>
        </div>
        {
              formik.touched.gender && formik.errors.gender && <span className="text-danger">{formik.errors.gender}</span>
            }
      </div>

        <div>
            <div className='d-flex p-2 rounded-3 border-1 border-purple background-purple' >
            <span className="me-2"><img src='./images/onBoarding/note.png'/></span>
                <span className='fw-500 fs-7 color-purple'>
                It’s important that all the details provided by should match with institute’s owned records.
                 </span>
            </div>
        </div>



      <div className="d-flex justify-content-between mt-4">
        <button className="btn-onboard"></button>

        <button type="submit" className="btn-onboard-fill">Next Step<span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span></button>
        
      </div>
    </form>
  );
};
