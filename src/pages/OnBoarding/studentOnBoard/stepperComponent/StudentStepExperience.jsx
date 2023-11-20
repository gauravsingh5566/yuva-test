import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import * as Yup from 'yup';

// import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { apiJson } from "api";
import { useGlobalContext } from "global/context";

const experience = [
  {
    title:'Software Engineer',
    company:'Govardhan Learning Cloud',
    city:'Delhi',
  },
  {
    title:'Software Developer',
    company:'Flyhigh Group of Institutes',
    city:'Singrauli',
  },
]



export const StudentStepExperience = () => {
  const {setUser, setToken, userData} = useGlobalContext()
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

  const [showExperienceModal, setShowExperienceModal] = useState(false)

  const [current, setCurrent] = useState(false)
  const [expArray, setExpArray] = useState([])
  const [isUpdating , setisUpdating] = useState(false)
  const [currentIndex, setcurrentIndex] = useState(null)

  const validation = Yup.object({
    company: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    city: Yup.string().required('Required'),

})
const initialValues = {
  company: '',
  designation: '',
  description:'',
  since:'',
  till:'',
  country:'',
  state:'',
  city:'',  

}
  const handleEditExp = (i)=>{
    setcurrentIndex(i)
    const array = [...expArray]
    formik.setValues(array[i])
    setisUpdating(true)
    handleShowModal()
  }

  const handleEditSubmit = (i)=>{
    let array = [...expArray]
     array[i] = formik.values;
     setExpArray(array)
    handleCloseModal()

  }

  const handleRemoveExp = (i)=>{
    setExpArray((a)=>{
      const newArray = [...a];
      newArray.splice(i,1)
      return newArray
    })
  }
  const handleCloseModal = ()=>{
    setShowExperienceModal(false)
    setisUpdating(false)
    setcurrentIndex(null)
    formik.resetForm()
  }
  const handleShowModal = ()=>{
   
    setShowExperienceModal(true)
  }

  useEffect(()=>{
    setStudenteData('experience', expArray)
  },[expArray])

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
  
  const handleSubmitOnboardData = ()=>{

    // if type student
    if(userData.role==='student'){
      apiJson.put('v2/register/student/on-board-data',studentFormik.values)
    .then((res)=>{
      setUser(res.data.user)
      setToken(res.data.token)
    }).then(()=>{
      handleNextChild()
    }).catch((error)=>{
      console.log(error.message)
    })
    }else{
      handleNextChild()
    }
    
  } 

const onSubmit = (value) => {
  console.log('index===>', currentIndex)
  if(isUpdating){
    handleEditSubmit(currentIndex)
  }else{
    const array = [...expArray,value]
    setExpArray(array);
    handleCloseModal()
    formik.resetForm()
    setCurrent(false)
    console.log(array)
  }
}
const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit
})


useEffect(()=>{
  if(current){
    
    formik.setFieldValue('till', 'Present')
  }
  else{
    formik.setFieldValue('till', '')
  }
},[current])
  return (
    <>
      <div className="">


        <div className="mb-2">
          <span className=" fs-35px fw-600">Experience</span>
        </div>

        <div className="mb-4">
          <span
            className=""
            style={{
              color: "#989898",
              fontSize: "19px",
              fontWeight: "500",
            }}
          >
            Help us to bring you best curated services for you
          </span>
        </div>

        <div className="mb-5">
          <span
            className=""
            style={{
              color: "#5200FF",
              fontSize: "19px",
              fontWeight: "400",
            }}
          >
            Currently working as <span style={{color: "#5200FF",  fontSize: "19px",
              fontWeight: "700",}}>Polity Professor</span> in AMC College 
          </span>
        </div>

        <div className='mb-2'>
          <span className='fs-19px fw-500'>Add work experience (if any)</span>
        </div>

        <div onClick={handleShowModal}  className='card px-2 dashed-border cursor-pointer rounded-4 mb-50'>
          <div className='card-body'>
            <div className='d-flex align-items-center'>
              <div className='me-2' >
                <span ><AddCircleIcon style={{
                  fontSize: '35px',
                  color: '#4CAF50',
                }} /></span>
              </div>
              <div className=''>
                <span className='fs-19px fw-500' >
                  Add new experience
                </span>
              </div>
            </div>
          </div>
        </div>
      {expArray.length>0 && <div className="d-flex flex-column mb-50">
          <div className="d-flex justify-content-between mb-4">
            <span style={{
              color: '#3A3A3A'
            }} className="fw-500 fs-19px">Experiences</span>
            <div>
              <span className="cursor-pointer"><img src="./images/onBoarding/arrow-left.png" /></span>
              <span className="cursor-pointer"><img src="./images/onBoarding/arrow-right.png" /></span>
            </div>
          </div>
          <div className="card p-0 m-0" style={{
            borderTopLeftRadius: "21px",
            borderTopRightRadius: "21px",
            background:'#FAFAFA',
            border:'none',
          }}>
            <div className="card-body p-0 m-0"> 
            <div
                className="row mb-2"
                style={{
                  height: "43px",
                  background:'#0014C8',
                  borderTopLeftRadius: "21px",
                  borderTopRightRadius: "21px",
                  margin: "0",
                }}
              >
                <div className="row  py-2 ">
                    <span className="text-center  color-white fs-17px fw-500 col-3"> Title</span>
                    <span className="text-center  color-white fs-17px  fw-500 col-5"> Company</span>
                    <span className="text-center  color-white fs-17px  fw-500 col-2"> City</span>
                </div>
                

              </div>
                <div>
                  {
                    expArray?.map((e,index)=>{
                      return (
                        <div className="row px-5 py-2 mb-2">
                            <span className=" text-center fs-15px fw-400 col-3"> {e.designation}</span>
                            <span className=" text-center  fs-15px fw-400 col-5"> {e.company}</span>
                            <span className=" text-center  fs-15px fw-400 col-2"> {e.city}</span>
                            <div className="fs-15px fw-400 col-2"> 
                              <div className="d-flex justify-content-end">
                                <span onClick={()=>{
                                 formik.resetForm()
                                  handleEditExp(index)
                                 }
                                } className="cursor-pointer"> <img src="./images/onBoarding/pen.png"/></span>
                                <span onClick={()=>handleRemoveExp(index)} className="ms-4 cursor-pointer" ><img src="./images/onBoarding/remove.png"/></span>
                              </div>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>

              
            </div>
          </div>
        </div>}

        <div className="d-flex justify-content-between mt-4 z-index-1 ">
          <button onClick={handleBack} className="btn-onboard">
            Previous
          </button>

          <button onClick={handleNextChild} className="btn-onboard-fill">
            Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
          </button>
        </div>


      </div>

      <Modal  show={showExperienceModal} onHide={handleCloseModal} size="lg">
        <Modal.Body>
          <div className="p-3">
             {  isUpdating?<h4>Edit Experience</h4>: <h4>Add Experience</h4>}
          </div>
        <div className="p-3">
        <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12 col-lg-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Name of the company</span>
            <input value={formik.values.company} className="form-control border-0 box-shadow-0 background-grey " placeholder="Write company name..." onChange={(e)=>formik.setFieldValue('company', e.target.value)} type="text" />
            {
              formik.errors.company && formik.touched.company && <span className="text-danger">
                {formik.errors.company}
              </span>
            }
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Designation</span>
            <input value={formik.values.designation} className="form-control border-0 box-shadow-0 background-grey " placeholder="Write designation..." onChange={(e)=>formik.setFieldValue('designation', e.target.value)} type="text" />
            {
              formik.errors.designation && formik.touched.designation && <span className="text-danger">
                {formik.errors.designation}
              </span>
            }
          </div>

          <div className="col-12  mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Describe your work here</span>
            <textarea value={formik.values.description} className={`form-control rounded-3 resize-none  box-shadow-0 background-grey ${formik.errors.description && formik.touched.description ?'border-danger border-2 ':' border-0'}` }placeholder="Write description..." onChange={(e)=>formik.setFieldValue('description', e.target.value)} type="text" style={{height:'54px'}}/>
            {
              formik.errors.description && formik.touched.description && <span className="text-danger">
                {formik.errors.description}
              </span>
            }
          </div>
          <div className="col-12 col-md-12 mb-2">
          <div className="card col-5 ">

          <div className="card-body px-2 py-1">
            <div className="d-flex  "><input class="form-check-input me-2" type="checkbox" value={current} onChange={()=>setCurrent(!current)} checked={current}></input>
            <span className="fw-500 fs-14px mb-2 d-block text-secondary">Currently Working</span></div>
            </div>
          </div>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Since</span>
            <input value={formik.values.since} className="form-control border-0 box-shadow-0 background-grey "  onChange={(e)=>formik.setFieldValue('since', e.target.value)} type="date" />
            {
              formik.errors.since && formik.touched.since && <span className="text-danger">
                {formik.errors.since}
              </span>
            }
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Till</span>
          {current || formik.values.till ?
                      <input  value={formik.values.till} className="form-control border-0 box-shadow-0 background-grey " disabled={current} onChange={(e)=>formik.setFieldValue('till', e.target.value)} type="text" />
            :<input  value={formik.values.till} className="form-control border-0 box-shadow-0 background-grey "  onChange={(e)=>formik.setFieldValue('till', e.target.value)} type="date" />

          }
            {
              formik.errors.till && formik.touched.till && <span className="text-danger">
                {formik.errors.till}
              </span>
            }
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">Country</span>
            <input value={formik.values.country} className="form-control border-0 box-shadow-0 background-grey " placeholder="Enter Country..." onChange={(e)=>formik.setFieldValue('country', e.target.value)} type="text" />
           
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">State</span>
            <input value={formik.values.state} className="form-control border-0 box-shadow-0 background-grey " placeholder="Enter State..." onChange={(e)=>formik.setFieldValue('state', e.target.value)} type="text" />
            
          </div>
          <div className="col-12 col-md-6 mb-2">
            <span className="fw-500 fs-19px mb-2 d-block text-dark">City</span>
            <input value={formik.values.city} className="form-control border-0 box-shadow-0 background-grey " placeholder="Enter City..." onChange={(e)=>formik.setFieldValue('city', e.target.value)} type="text" />
            {
              formik.errors.city && formik.touched.city &&
               <span className="text-danger">
                {formik.errors.city}
              </span>
            }
          </div>


          <div className="text-end">
              <button type="submit" className="btn-onboard-fill">

                  <span >Submit</span>
              </button>
          </div>
        </div>

        </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
