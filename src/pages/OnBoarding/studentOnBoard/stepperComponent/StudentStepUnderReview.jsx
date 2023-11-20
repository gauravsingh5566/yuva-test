import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Modal } from 'react-bootstrap';
import { apiJson } from "api";
import { useGlobalContext } from "global/context";

const admins  =[
  {
    name:'Danish Kamal', 
    designation:'Principal',
  },
 
  {
    name:'Saurabh Sharma', 
    designation:'Principal',
  },
]





export const StudentStepUnderReview = () => {

  const {userData} = useGlobalContext()
     
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
    studentFormik,
  } = useContext(OnBoardContext);

  const [selectedOption, setSelectedOption] = useState({});
  const [moderators, setmoderators] = useState([])
  const getManagerData = ()=>{
    const instituteId = studentFormik?.values.institute_id || userData?.instituteId
    apiJson('api/v2/institute/getInstituteManager/institute/'+instituteId)
    .then((res)=>{
      setmoderators(res.data.result);
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
  useEffect(()=>{
    getManagerData()
  },[])


const handleSelectChange = (option) => {
  setSelectedOption(option);
};

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
  // Modal Toggle
  const [showModal, setShowModal] = useState(false);
    const handleShowModal = () =>{
      setShowModal(true)
    }
    const handleClose = () =>{
      setShowModal(false)
    }
  return (
    <>
       <div className="">


<div className="mb-2">
  <span className=" fs-35px fw-600">Under Review</span>
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
          You are just one step away from activating your Yuvamanthan account to access all features. Reach out to any of the institutional admins or moderators listed below to initiate the activation process.
      </span>
    </div>

        <div>
          <div className="mb-4">
            <span className="fw-500s md-4 fs-19px " style={{
            }}>Admin</span>
            <div className="mt-4">
              {
                admins?.map((a)=>{
                  return <>
                    <div className="row justify-content-between mb-4 ms-4">
                        <div className="col-4">
                          <span style={{fontWeight:'500',color:'#300095'}} className="me-4 ">{a.name}</span>
                        </div>
                        <div className="col-4">
                        <span style={{color:'#7B5EA1'}}>{a.designation}</span>
                        </div>
                      <div className="col-4">
                          <div className="d-flex">
                            <div className="me-4 cursor-pointer"><MailIcon onClick={handleShowModal} style={{color:'#FAB400'}}/></div>
                            <div className="cursor-pointer"><PhoneIcon style={{color:'#1300F3'}} /></div>
                          </div>
                      </div>
                    </div>
                  </>
                })
              }
            </div>
          </div>
          <div className="mb-50">
            <div className="mb-4">
              <span className="fw-500 fs-19px">Moderators</span>
            </div>
            <div>
              {
                moderators?.map((m)=>{
                  return (
                    <div className="row justify-content-between mb-4 ms-4">
                        <div className="col-4">
                          <span className="me-4" style={{fontWeight:'500',color:'#300095'}}>{m.name}</span>
                        </div>
                       <div className="col-4">
                        <span style={{color:'#7B5EA1'}}>{m.designation}</span>
                       </div>
                      <div className="col-4">
                      <div className="d-flex ">
                          <div className="me-4">
                            <span className="cursor-pointer"><MailIcon onClick={handleShowModal} style={{color:'#FAB400'}}/></span>
                          </div>
                          <div>
                            <span className="cursor-pointer" ><PhoneIcon style={{color:'#1300F3'}}/></span>
                          </div>
                      </div>
                      </div>

                    </div>
                  )
                })

              }
            </div>
          </div>
          <div>
        <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className=" fw-bold color-black" style={{fontSize: "25px",fontFamily: "Poppins"}}>
          Request Approval
          </Modal.Title>
          </Modal.Header>

          <Modal.Body className="">
            <div className="d-flex justify-content-between align-items-center p-2">

            <div className="d-flex justify-content-between align-items-center col-8" style={{fontFamily: "Poppins",fontSize: "19px"}}>
              <div>
                <span className="fw-500" style={{color :"black"}}>To</span>
              </div>
              
              <div>
                <span className="fw-500" style={{color: "#300095"}}>Danish Kamal</span>
              </div>
              <div>
                <span  className="fw-500" style={{color: "#7B5EA1"}}>Principal</span>
              </div>
              </div>

              <div>
                <span><PhoneIcon style={{color:'#1300F3'}}/></span>
              </div>

            </div>

            <div>
              <div className="mt-2">
              <span className="fw-500" style={{fontFamily: "Poppins", fontSize: "16px", color: "black"}}>Message</span>
              </div>

              <div className="mt-2" style={{ fontStyle: 'italic', fontFamily: "Poppins"}}>
                <textarea type="text" className="form-control p-3 rounded fw-500 box-shadow-0 resize-none border-0" name="" id="" placeholder="Eg. Hi Sir, Please complete my verification process as soon as possible."  style={{ color: "#B6B6B6",background: "#EDEDED", fontSize: "16px",}}>
                </textarea>
              </div>

              <div className="mt-3 mb-3 d-flex justify-content-between align-items-center text-center">
                <div>
                  <button onClick={handleClose} className="rounded" style={{ height: "36px", width: "122px" , background: "#E7E7E7", color: "#747474"}}>Discard</button>
                </div>
                <div>
                  <button type="submit" className="rounded" style={{ height: "36px", width: "99px", background: "#C08EFF", color: "#2B0062"}}>Send</button>
                </div>
              </div>

              <div>

              </div>
            </div>

          </Modal.Body>
        </Modal>
        </div>
        </div>

        
    
  <div className="d-flex justify-content-between mt-4 z-index-1 ">
    <button disabled onClick={handleBack} className="btn-onboard-disabled">
      Previous
    </button>
    {/* btn-onboard-disabled */}
    {/* btn-onboard-fill-disabled? */}
    <button disabled onClick={handleNextChild} className="btn-onboard-fill-disabled" >
      Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
    </button>
  </div>
</div>
    </>
  )
}
