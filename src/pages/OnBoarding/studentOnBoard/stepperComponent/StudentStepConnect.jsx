import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import Select from 'react-select';
import * as Yup from 'yup';

import { apiJson } from "api";
import { useFormik } from "formik";


// const college = [
//   {
//     value:'1',
//     name:'AMC Engineering College',
//     address:'AMC Campus , Banglore, karnataka 560606'
//   },
//   {
//     value:'2',
//     name:'AMC Boys College',
//     address:'AMC Campus , Banglore, karnataka 560606'
//   },
//   {
//     value:'3',
//     name:'Indian Institute Of Technology',
//     address:'AMC Campus , Banglore, karnataka 560606'
//   },
//   {
//     value:'4',
//     name:'AMC Engineering College',
//     address:'AMC Campus , Banglore, karnataka 560606'
//   },
// ]



export const StudentStepConnect = () => {
  
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
  } = useContext(OnBoardContext);

  const [selectedOption, setSelectedOption] = useState({});
  const [college, setcollege] = useState([])


  const initialValues = {
    institution_name:studentFormik.values.institution_name|| '',
    logo:  '',
    district:'',
    state:'',
    pincode:'',
   
}
const validation = Yup.object({
  institution_name: Yup.string().required('Required'),
})

const onSubmit = () => {

    handleNextChild()
}

const formik = useFormik({
  initialValues,
  validationSchema: validation,
  onSubmit
})
const handleSelectChange = (option) => {
  setSelectedOption(option);
};
  const getAllInstitute = ()=>{
    apiJson.get('v2/institute/getAllInstitute')
    .then((res)=>{
      setcollege(res.data.result)
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  useEffect(()=>{
    getAllInstitute()
  },[])

  const handleBack = () => {
    setActiveChildStep(activeChildStep - 1);
    if (activeChildStep <= 0) {
      setCount(count - 1);
      setActiveStep(activeStep - 1);
      setActiveChildStep(0);
    }
    if (activeStep < 0) {
      setActiveStep(0);
    }
    if (activeChildStep < 0) {
      setActiveChildStep(0);
    }
    console.log("active", activeStep, " activechild", activeChildStep, " ");
  };

  const handleNextChild = () => {
    setActiveChildStep(activeChildStep + 1);

    if (activeChildStep >= stepperArray[count]?.childStep?.length - 1) {
      setActiveStep(activeStep + 1);
      setCount(count + 1);
      setActiveChildStep(0);
      console.log(
        "active step",
        activeStep,
        "stepperlength",
        stepperArray.length
      );
      if (activeStep > stepperArray.length - 2) {
        console.log("inside the if condition");
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
    console.log("this is length", stepperArray?.length);
    console.log(
      "active step ",
      activeStep,
      "stepperArray",
      stepperArray.length
    );
  }
  return (
    <>
      <div>
        <div className="mb-2">
          <span className=" fs-35px fw-600">Connect Your Institute</span>
        </div>
        <div >
          <div className="mb-4">
            <span
              className="fs-19px fw-500 color-grey"
              
            >
            Find your current insitute
            </span>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <span className="fs-19px fw-500">
              Search Your Institute
            </span>

          </div>
        </div>

        
        <div className="mb-4">
            <Select
                styles={customStyles}
                options={college}
                defaultValue = {college?.find((i)=>i.institution_name===formik.values.institution_name)}
                onChange={(selected) => {
                  setStudenteData('institution_name', selected.institution_name)
                  setStudenteData('institute_id', selected.value)
                  formik.setFieldValue('institution_name', selected.institution_name)
                  formik.setFieldValue('logo', selected.logo)
                  formik.setFieldValue('district', selected.district)
                  formik.setFieldValue('state', selected.state)
                  formik.setFieldValue('pincode', selected.pincode)
                                }}
                getOptionLabel={
                  (option)=>{
                    return (
                      <>
                        <div className="mb-2 d-flex align-items-center z-index-1">
                          <div className="insitute-logo" style={{height:'50px', width:'50px'}}>
                            <img className="h-100 w-100" src={option.logo || './images/social-icons/institute-logo.avif'} />
                          </div>
                            <div className="ms-3">
                              <span className="fs-6 fw-semibold">{option.institution_name}</span>

                            </div>
                        </div>
                      </>
                    )
                  }
                }
             />
              
        </div>
   { formik?.values?.institution_name &&  
     <div className="d-flex flex-column p-4 rounded-4 shadow">
          <div className="d-flex mb-4">
            <div className="me-3 rounded-3" style={{height:'92px', width:'92px'}}>
                <img className="w-100 h-100 rounded-3" src={formik.values.logo ||"./images/onBoarding/university.png"} />
            </div>
            <div className="d-flex flex-column">
              <span className="fs-19px fw-500 mb-1"> {formik.values.institution_name}</span>
              <span className="color-grey fs-14px fw-500">{formik.values.district}{","} {formik.values.state}{", Pincode:"} {formik.values.pincode} </span>
            </div>
          </div>
          <div>
            <button className="background-purple fw-500 fs-15px color-purple-dark px-3 py-2   rounded-3">Selected</button>
          </div>
        </div>}
        <div className="d-flex justify-content-between mt-4 z-index-1">
          <button onClick={handleBack} className="btn-onboard">
            Previous
          </button>

          <button onClick={handleNextChild} className="btn-onboard-fill">
            Next Step<span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
          </button>
        </div>
      </div> 
    </>
  )
}

const customStyles = {
  control : (provided) => ({
    ...provided,
    padding : '3px',
    border: 'none',
    background: '#eeeeee4d',
  })
}