import React, { useContext, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import Select from 'react-select';
import BackupIcon from "@mui/icons-material/Backup";
// import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from "react-bootstrap";
import * as Yup from 'yup';
import { apiJson } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";

const Achievements = [
  {
    Position:'Winner',
    Title:'Pencil Sketch',
  },
  {
    Position:'First Runner-Up',
    Title:'Fast and Furious',
  },
]

export const StudentStepAchievement = () => {
     


  const {setUser, setToken,userData} = useGlobalContext()
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

  const handleEditExp = (i)=>{
    setcurrentIndex(i)
    const array = [...expArray]
    formik.setValues(array[i])
    setisUpdating(true)
    handleShowModal()
  }

  const handleRemoveExp = (i)=>{
    setExpArray((a)=>{
      const newArray = [...a];
      newArray.splice(i,1)
      return newArray
    })
  }
  const handleEditSubmit = (i)=>{
    let array = [...expArray]
     array[i] = formik.values;
     setExpArray(array)
    handleCloseModal()

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

  
  const validation = Yup.object({
    position: Yup.string().required('Required'),
    competition: Yup.string().required('Required'),
    
})
const initialValues = {
  position: 'Winner',
  competition: '',

}

const handleSubmitOnboardData = ()=>{
  apiJson.put('v2/register/student/on-board-data',{...studentFormik.values,role:userData.role})
  .then((res)=>{
    setUser(res.data.user)
    setToken(res.data.token)
  }).then(()=>{
    handleNextChild()
  }).catch((error)=>{
    console.log(error.message)
  })
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

  return (
    <>
       <div className="">


    <div className="mb-2">
      <span className=" fs-35px fw-600">Achievements</span>
    </div>

    <div className="mb-50">
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

    <div className='mb-2'>
      <span className='fs-19px fw-500'>List down some of your feats and achievements (Optional)</span>
    </div>

    <div onClick={handleShowModal} className='card px-2 dashed-border rounded-4 cursor-pointer mb-4'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <div className='me-2' >
              <span ><AddCircleIcon style={{
                    fontSize: '35px',
                    color: '#4CAF50',
              }} /></span>
            </div>
            <div className=''>
              <span className='fs-5' >
                Add achievement
              </span>
            </div>
          </div>
        </div>
    </div>

    <div className="mb-50">
      <div className="p-3 background-purple border-purple rounded-3  cursor-pointer">
          <span className="me-2"><img src="./images/onBoarding/note.png"/></span> 
          <span className="color-purple-dark fw-500 fs-15px">  You can add up to 10 achievements only.</span>
      </div>
    </div>
    {expArray?.length>0 &&  <div className="d-flex flex-column mb-50">
          <div className="d-flex justify-content-between mb-4">
            <span style={{
              color: '#3A3A3A'
            }} className="fw-500 fs-19px display-4">Achievements</span>
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
                <div className="row align-items-center   py-2 ">
                    <span className="text-center  color-white fs-17px fw-500 col-3"> Position</span>
                    <span className="text-center  color-white fs-17px  fw-500 col-5"> Title</span>
                </div>
                

              </div>
                <div className="thin-scroll" style={{maxHeight:'200px ', overflow:'scroll', overflowX:'hidden'}}>
                  {
                    expArray?.map((e,index)=>{
                      return (
                        <div className="row align-items-center  py-2 mb-2">
                            <span className=" text-center fs-15px fw-400 col-3"> {e.position}</span>
                            <span className=" text-center  fs-15px fw-400 col-5"> {e.competition}</span>
                            <span className=" text-center  fs-15px fw-400 col-2"> </span>
                            <div className="fs-15px fw-400 col-2"> 
                              <div className="d-flex justify-content-end">
                                <span onClick={()=>{
                                 formik.resetForm()
                                  handleEditExp(index)
                                 }
                                }  className="cursor-pointer"> <img src="./images/onBoarding/pen.png"/></span>
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

      <button onClick={handleSubmitOnboardData} className="btn-onboard-fill">
        Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
      </button>
    </div>


</div>

  <Modal  show={showExperienceModal} onHide={handleCloseModal} size="lg">
          <Modal.Body>
            <div className="p-3">
             {isUpdating?<h4>Edit Experience</h4>   :  <h4>Add Experience</h4>}
            </div>
          <div className="p-3">
          <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-6 mb-2">
              <span className="fw-500 fs-19px mb-2 d-block text-dark">Position Earned</span>
              
              <Select
                  styles={customStylesNumber}
                  options={positions}
                  defaultValue={positions.find((o)=>o.name===formik.values.position)}
                  onChange = {(e)=>{
                    formik.setFieldValue('position', e.name)
                  }}
                  getOptionLabel={
                      (option) => {
                          return (
                              <>
                                  <div className="p-2">
                                      <span className=" fs-6 ">{option.name}</span>
                                  </div>
                              </>
                          )
                      }
                  }
              />
              {
                formik.errors.position && formik.touched.position && <span className="text-danger">
                  {formik.errors.position}
                </span>
              }
            </div>
            <div className="col-12 col-md-6 mb-2">
              <span className="fw-500 fs-19px mb-2 d-block text-dark">Name of the title or a competition</span>
              <input value={formik.values.competition} className="form-control border-0 box-shadow-0 background-grey " placeholder="Write competition..." onChange={(e)=>formik.setFieldValue('competition', e.target.value)} type="text" />
              {
                formik.errors.competition && formik.touched.competition && <span className="text-danger">
                  {formik.errors.competition}
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


const customStylesNumber = {
  control: (provided) => ({
      ...provided,
      padding: '5px 0  ',
      border: 'none',
      color: '#4A00E8',
      background:'#fafafa!important',
      width: '100&',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'none',
      borderRadius: '10px'
  }),

};


const positions = [
  {
    value:1,
    name:'Winner',
  },
  {
    value:2,
    name:'First Runner Up',
  },
  {
    value:3,
    name:'Second Runner Up',
  },
  {
    value:4,
    name:'Third Runner Up',
  },
  {
    value: 5,
    name: 'Fourth Runner Up',
  },
  {
    value: 6,
    name: 'Fifth Runner Up',
  },
  {
    value: 7,
    name: 'Finalist',
  },
  {
    value: 8,
    name: 'Semi-Finalist',
  },
  {
    value: 9,
    name: 'Honorable Mention',
  },
]