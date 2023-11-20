import Select from "react-select";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ModelUnContext from "../context/contextModelUn";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePickerOwn from "./DatePickerOwn";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { useFormik } from "formik";
import { apiJson, apiJsonAuth } from "api";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";

export const ModelUnComponent = () => {
    const {
        currentStep,
        setCurrentStep,
        formik
    } = useContext(ModelUnContext)
    let stepComponent = modelUnRegistrationSteps[currentStep]


  return (
    <>
      <>
        <div className="pt-4 px-5">{modelUnRegistrationSteps[currentStep]}</div>
      </>
    </>
  );
};
// 0
const Registration = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(eventType[0]?.type);
  const [showType, setShowType] = useState("");
  const [validEmail, setValidEmail] = useState("");

  const {
    currentStep,
    setCurrentStep,
    formik
} = useContext(ModelUnContext)
  return (
    <div className="">
      <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>
     <div className="mt-4">
       <span className="fw-600 fs-31px">Choose Event Type</span>
       </div>

      <div className="col-12 col-sm-12 col-md-8 col-lg-7">
     <div
       style={{
         height: "65vh",
       }}
       className=" d-flex flex-column justify-content-between mt-3"
     >
       <div>
       <form onSubmit={formik.handleSubmit}>
         {eventType.map((acc, index) => {
           return (
             <>
               {!acc.showFor && (
                 <Card
                   onClick={() => setSelectedType(acc.type)}
                   style={{ borderColor: "transparent" , background: "#FAFAFA"}}
                   className={`cursor-pointer rounded-4 mb-4  border-3 ${
                     index === 0  && "border-blue"}
                     ${acc.diabledcss ? 'btn-onboard-fill-disabled-Inter' : null }`
                   }
                 >
                   <Card.Body className=""  >
                     <div className="form-check d-flex ">
                       <span>
                         <input
                          //  onChange={() => setSelectedType(acc.type)}
                          onChange={(e)=> formik.setFieldValue("eventType", acc.type)}
                           className="form-check-input"
                           type="radio"
                           name="eventType"
                           id={acc.type}
                          //  value={acc.type}
                          value={formik.values.eventType}
                           checked={index === 0}
                         />
                       </span>
                       <div className="form-check-label ms-2 " for={acc.type}>
                         <div>
                           <span className="fw-500 fs-22px">
                             {" "}
                             {acc.type} 
                             &nbsp;
                             {
                              index == 1 && 
                             <span  className="fw-500" style={{color: "#413B64",  fontSize: "16px"}}>Upcoming Feature</span>
                              }
                           </span>
                         </div>
                         <div>
                           <span
                             style={{
                               color: "#9A9A9A",
                             }}
                             className="fs-15px fw-500"
                           >
                             {" "}
                             {acc.body}
                           </span>
                         </div>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               )}
             </>
           );
         })}
      </form>
       </div>
       <div className=" d-flex justify-content-between mt-4">
         <button
           className="btn-onboard fs-19px fw-500"
           //   onClick={() => setStep(1)}
         >
           Discard
         </button>
        <button
            onClick={() => { setCurrentStep(1) }}
           className="btn-onboard-fill btn-block"
         >
           Save & Continue{" "}
           <span className="ms-4">
             <img src="/images/onBoarding/right-icon.png" />
           </span>
         </button>
       </div>
     </div>
      </div>
    
    </div>
  );
};

const ChooseFormat = () =>{
  const [selectedType, setSelectedType] = useState(chooseFormat[0]?.type);
  // console.log(selectedType);

  const {
    currentStep,
    setCurrentStep,
    formik,
    format
} = useContext(ModelUnContext)
  return (
    <div>
        <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>

    {/* ChhoseFormat */}
    <div className="mt-3 mb-2 d-flex align-items-center" >
      <div>
        <span className="contetnt-appoint fs-2 fw-semibold">
        Choose Format
        </span>
      </div>
      <div>
        <div className="ms-3"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
      </div>
    </div>
    

    <div className="col-12 col-sm-12 col-md-8 col-lg-7 mt-3">
        <div>
          <span></span>
        </div>
      <form onSubmit={formik.handleSubmit}>
         {format.map((acc, index) => {
           return (
             <>
               {!acc.showFor && (
                 <Card
                   onClick={() => {setSelectedType(acc.event_format)
                    formik.setFieldValue("chooseFormat", acc.event_format)
                  }}
                   style={{ borderColor: "transparent" , background: "#FAFAFA"}}
                   className={`cursor-pointer rounded-4 mb-4  border-3 ${
                    index === 0 && "border-blue"
                    // formik.values.chooseFormat === acc.event_format && "border-blue"
                   }   ${index !== 0 ? 'btn-onboard-fill-disabled-Inter' : null }  `}
                  //  }   ${acc.diabledcss ? 'btn-onboard-fill-disabled-Inter' : null }  `}
                 >
                   <Card.Body className=""  >
                     <div className="form-check d-flex ">
                       <span>
                         <input
                          //  onChange={() => setSelectedType(acc.type)}
                          onChange={(e)=> formik.setFieldValue("chooseFormat", acc.event_format)}
                           className="form-check-input"
                           type="radio"
                           name="chooseFormat"
                           id={acc.event_format}
                          //  value={acc.event_format}
                          value={formik.values.chooseFormat}
                          checked={index === 0}
                          //  checked={formik.values.chooseFormat === acc.event_format}
                         />
                       </span>
                       <div className="form-check-label ms-2 " for={acc.event_format}>
                         <div>
                           <span className="fw-500 fs-22px">
                             {" "}
                             {acc.event_format}
                           </span>
                         </div>
                         <div>
                           <span
                             style={{
                               color: "#9A9A9A",
                             }}
                             className="fs-15px fw-500"
                           >
                             {" "}
                             {acc.description}
                           </span>
                         </div>
                         <div>
                           <span
                             style={{
                               color: "#9A9A9A",
                             }}
                             className="fs-13px fw-500"
                           >
                             {" "}
                             {acc.event_content}
                           </span>
                         </div>
                       </div>
                       
                     </div>
                   </Card.Body>
                 </Card>
               )}
             </>
           );
         })}
         {/* {formik.errors.chooseFormat && formik.touched.chooseFormat ?
          <span className="text-danger">{formik.errors.chooseFormat}</span> : null} */}
      </form>
        <div className="d-flex justify-content-between  mt-4">
        <button
        
          onClick={()=>{setCurrentStep(0)}}
          className="btn-onboard fs-19px fw-500"
        >
          Previous
        </button>
        <button
          onClick={()=>setCurrentStep(3)}
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>

      </div>
     
    </div>
  )
}

// 1
const AppointCoordinators = () => {
   const [openSearch,setOpenSearch] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [coordinators, setCoordinators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {userData} = useGlobalContext()
    const {
        currentStep,
        setCurrentStep,
    } = useContext(ModelUnContext)

    useEffect(()=>{
      setSearchResults(coordinatorData)
    },[coordinatorData])
// Search handler ==
const handleSearch = (event) => {
  const value = event.target.value;
  setSearchTerm(value);
  const results = coordinatorData.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setSearchResults(results);
};

  ///  ============ User Search modal open handler ===================== \\
  const searchOpenHandle = () => {
    setOpenSearch(true)
  }
  ///  ============ User Search modal hide handler ===================== \\
  const searchHideHandle = () => {
    setOpenSearch(false)
  }
    const handleShowModal = () =>{
      setOpenSearch(false)
      setShowModal(true)
    }
    const handleClose = () =>{
      setShowModal(false)
    }

  const validationSchema = yup.object().shape({
      name: yup.string().required("name is required"),
      designation: yup.string().required("designation is required"),
      email: yup.string()
        .required("Email is required")
        .email("Invalid Email Address"),
      phone: yup
        .string()
        .required("Phone Number is Required")
        .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
        typeOfCoordinator: yup.string().required("Coordinator is required"),
    });
    
const formik = useFormik({
  initialValues: {
    name : "",
    designation: rolesArray[0].value,
    email: "",
    phone : "",
    typeOfCoordinator : "Limited Access",
    eventcoordinators : []
  },
  validationSchema : validationSchema,
  // onSubmit

  onSubmit : async(values, action) =>{
    console.log("values", values);
    setShowModal(false)
    
    let temp = [...coordinators, values];
    console.log("temp1", temp);
     temp = temp?.map((i)=>{
      return {
        name:i.name,
        designation:i.designation,
        email:i.email,
        phone:i.phone,
        typeOfCoordinator:i.typeOfCoordinator,
      }
    })
    console.log("temp2", temp);
    formik.setFieldValue("eventcoordinators", temp)
    setCoordinators(temp)
  }
})



const handleteacherCoordinators = async()=>{
  try {
    if(userData?.role === "institute"){
      const res = await apiJsonAuth.post(`api/v2/modelUn-institute/create-coordinator/institute/${userData.id}`,coordinators)
      console.log("res", res);
    }
  } catch (error) {
    console.log(error);
  }
}

 const handleData =(email) =>{
  const res = coordinatorData.find((i) => i?.email === email);
  const updatedCoordinatorData = searchResults.filter((i) => i?.email !== email);

  // Create a new array with the existing coordinators and the new coordinator
  const temp = [...coordinators, res];

  // Map the array to extract specific properties from each coordinator
  const mappedCoordinators = temp?.map((i) => ({
    name: i.name,
    designation: i.designation,
    email: i.email,
    phone: i.phone,
    typeOfCoordinator: i.typeOfCoordinator,
  }));
  console.log(mappedCoordinators,"reshhd")
  // Set the formik field value and update the state with the new coordinators
  formik.setFieldValue("eventcoordinators", mappedCoordinators);
  setCoordinators(mappedCoordinators);
    // Filter coordinatorData based on ids in the coordinators array
    let filteredCoordinatorData = updatedCoordinatorData.filter((coordinator) =>
    mappedCoordinators.some((selected) => selected.email !== coordinator.email)
  );

  // Update coordinatorData with the filtered array
  setSearchResults(filteredCoordinatorData);
  searchHideHandle();
 }

// handleDelete
const handleDelete = (email) =>{
  const updatedCoordinatorData = coordinators.find((i) => i?.email === email);
  console.log("updatedCoordinatorData", updatedCoordinatorData)
  if(coordinatorData.some((item) => item.email === updatedCoordinatorData.email)){

    setSearchResults([...searchResults,updatedCoordinatorData])
  }
 // Create a new array without the deleted coordinator
 const updatedCoordinators = coordinators.filter((coordinator) => coordinator.email !== email);
 setCoordinators(updatedCoordinators);

}
const handleChageDesignation = (selectedOption,index)=>{
  coordinators.map((item, i) => (i === index ? { ...item, designation: selectedOption.name} : item));
  console.log(selectedOption,index,"hjajhs")
}


  return (
    <>
    <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>
      <div className="mt-3 mb-2" >
        <span className="contetnt-appoint fs-2 fw-semibold">
          Appoint a Teacher Coordinators
        </span>
      </div>

      <div className="mb-50">
        <span className="color-grey fs-17px fw-500">
        A Teacher Coordinator will help manage, coordinate and organise the event.
        </span>
      </div>

      <div className="col-12 col-sm-12 col-md-8 col-lg-7">
      <div className="card px-2 dashed-border rounded-4 cursor-pointer mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="me-2">
              <span>
                <img
                  src={"/images/OnBoarding/plus-green.png"}
                  style={{
                    fontSize: "35px",
                    color: "#4CAF50",
                  }}
                />
              </span>
            </div>
            <div className="ms-2" onClick={searchOpenHandle}>
              <span className="fs-5 fw-500">
                Search or Add new teacher coordinator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
        <span className="fs-6 fw-semibold color-purple ">
          <span className="me-2">
            {<img src="/images/onBoarding/note.png" />}
          </span>
          You can add up to 20 Coordinators at a time.
        </span>
      </div>
      

      <div className="d-flex flex-column mb-50">
        <div className="d-flex justify-content-between mb-4">
          <span className="fs-4 fw-500">Teacher Coordinators</span>
          <div className="d-flex">
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-left.png"
            />
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-right.png"
            />
          </div>
        </div>
        <div className="scroll-modelun-register">
          {coordinators?.map((c, id) => {
            
            return (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3 me-1">
                  <span className="fs-5 fw-500">{c.name}</span>
                  <div className="d-flex align-items-center">
                    <div className="me-3 cursor-pointer">
                      <Select
                        styles={customStylesPurple}
                        options={rolesArray}
                        defaultValue={
                          rolesArray.find((i) => i.name === c?.designation)
                        }
                       onChange={()=>handleChageDesignation(id)}
                        getOptionLabel={(option) => {
                          return (
                            <>
                              <div className="p-2">
                                <span className="color-purple fs-17px fw-semibold text-center">
                                  {option.name}
                                </span>
                              </div>
                            </>
                          );
                        }}
                      />
                    </div>
                    <div onClick={()=> handleDelete(c?.email)}
                      className="d-flex align-items-center justify-content-center cursor-pointer "
                      style={{
                        background: "#FFD6D6",
                        width: "37px",
                        height: "37px",
                        borderRadius: "7px",
                      }}
                      >
                      <img
                        className="cursor-pointer"
                        src="/images/onBoarding/remove-2.png"
                        />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="d-flex justify-content-between  mt-4">
        <button
          onClick={()=>setCurrentStep(6)}
          className="btn-onboard fs-19px fw-500"
        >
          Previous
        </button>

        <form >
        <button
        type="submit"
          onClick={
            ()=>{
              handleteacherCoordinators();
              setCurrentStep(8) 

            }
            // coordinators.length !== 0 ?
            // : null
          }
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </form>

      </div>
      </div>
     
     {/*  ========= Open search user modal for assign  teacher coordinator  for  same  institute =======*/}
     <div className="container" >
      <Modal show={openSearch} className="left-rounded-modal" onHide={searchHideHandle} size="lg">
      <div className="modal-content">  
          <span className="content-title fw-600 color-black fs-2 px-5 mt-3">
          Add Teacher Coordinator
          </span>
      <span className="fs-19px px-5 mt-4" style={{color:"#000000"}}>Search for the Teacher here by typing their name</span>
        <Modal.Body>
       
                <form>
                <div className="mt-2 px-4">
                  <input className="search-handle" type="text" name="userName" placeholder="Type a name"  value={searchTerm}
        onChange={handleSearch}/>
                 
                    </div>
                    <div className="bg-light mt-3 px-5 mx-4" style={{width:"65%"}}>
                     <div className="databox overflow-y-auto">

                      {searchResults.map((i)=>
                        (

                          <div className="d-flex justify-content-between mt-2 cursor-pointer " onClick={()=>handleData(i?.email)} key={i?.email}>
                            <span className="fs-19px">{i?.name}</span>
                            <span className="fs-19px" style={{color:"#5A00EE"}}>{i?.designation}</span>
                          </div> 
                        )
                      )}
                     </div>
                      <div className="d-flex align-items-center cursor-pointer mt-3" onClick={handleShowModal}>
                        <div className="me-2">
                          <span>
                            <img
                              src={"/images/OnBoarding/plus-green.png"}
                              style={{
                                fontSize: "35px",
                                color: "#4CAF50",
                              }}
                            />
                          </span>
                        </div>
                        <div className="ms-2" >
                          <span className="fs-5 fw-500">
                           Add New
                          </span>
                        </div>
                      </div>
                    </div>
                     
                </form>
        </Modal.Body>
      </div>
      </Modal>
    </div>

       {/* ======= ADD external user for as a  Teacher coordinator  Modal =========  */}
    <div className="container" >
      <Modal show={showModal} className="left-rounded-modal" onHide={handleClose} size="lg">
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="content-title fw-600 color-black fs-34px px-5">
            Appoint a Teacher Coordinator
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <div class="bd-example-modal-lg px-5">
            <div className="row">
              <div className="column col-12  col-lg-10 ">
                <form onSubmit={formik.handleSubmit}>
              <div className="row">
              {/* name */}
                <div className="firstName col-12  col-md-12  col-lg-6">
                  <div>
                    <div>
                  <label className="color-black fw-500 fs-19px">Full Name</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" placeholder="Name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} id="" />
                  {formik.errors.name && formik.touched.name ?
                      <span className="text-danger">{formik.errors.name}</span> : null}
                    </div>
                  </div>
                </div>

                {/* Designation */}
                <div className="typesOfcoordinator col-12 col-md-12 col-lg-6">
                  <div>
                    <div>
                <label className="color-black fw-500 fs-19px">Designation</label>
                    </div>
                    <div className="mt-2">
                  <select className="input-selects" name="designation"  value={formik.values.designation} onChange={formik.handleChange}>
                    {rolesArray.map((item)=>(

                    <option key={item?.value} value={item?.name}>{item?.name}</option>
                    ))}
                    
                  </select>
                  {formik.errors.designation && formik.touched.designation ?
                      <span className="text-danger">{formik.errors.designation}</span> : null}
                    </div>
                  </div>
                </div>

                {/* email */}
                <div className="emailId col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Email ID</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" type="email" name="EmailId" placeholder="EmailId" id=""  value={formik.values.email} onChange={(e)=>{formik.setFieldValue("email", e.target.value)}}/>
                    {formik.errors.email && formik.touched.email ?
                      <span className="text-danger">{formik.errors.email}</span> : null}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="phone col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="col-12">
              <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Phone</label>
              </div>
              <div className="d-flex" >
                <div className="mt-2">
                  <select className="input-selects-phone input-group-text fw-500">
                    <option value="">+91</option>
                  </select>
                </div>
                <div className="mt-2" style={{ width: "100%"}}>
                  <input className="input-handle-phone" type="text" name="phone" placeholder="99********88" id=""  value={formik.values.phone} onChange={formik.handleChange}/>
                  {formik.errors.phone && formik.touched.phone ?
                      <span className="text-danger">{formik.errors.phone}</span> : null}
                </div>
              </div>
            </div>
          </div>

                {/* typeOfCoordinator */}
                <div className="typesOfcoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Types of Coordinator</label>
                    </div>
                    <div className="mt-2">
                  <select name="typeOfCoordinator" className="input-selects" value={formik.values.typeOfCoordinator} onChange={formik.handleChange}>
                    <option value="Full Access">Full Access</option>
                    <option value="Limited Access">Limited Access</option>
                  </select>
                  {formik.errors.typeOfCoordinator && formik.touched.typeOfCoordinator ?
                      <span className="text-danger">{formik.errors.typeOfCoordinator}</span> : null}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="addCoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div className="w-100 d-flex">
                  <input className="input-handle text-align-center"  type="submit" value="Add Coordinator" style={{background: "#6100FF", color:"white"}}/>
                  </div>
                </div>
              </div>

                </form>
              </div>
            </div>
            <div className="mt-4 mb-3 col-12 col-sm-12 col-md-12 col-lg-10">
              <div className="adminRight d-flex justify-content- align-items-center">
                <div><img src="/modelUn/Clipboard.png" alt="" /></div>
              <div className="admin-content"><span className="color-purple">Admin Has full rights to all admin features of the portal.</span></div>
              </div>
            </div>
            </div>


        </Modal.Body>
      </div>
      </Modal>
    </div>

    </>
  );
};
// 5
const AppointStudentCoordinators = () => {
  const [openSearch,setOpenSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [secretariatType,setSecretariatType] = useState("Executive Board")
  const [coordinators, setCoordinators] = useState([])
  const { currentStep, setCurrentStep} = useContext(ModelUnContext)
console.log("secretariatTyp",secretariatType)
  useEffect(() => {
    setSearchResults(coordinatorData)
  }, [coordinatorData])
  // Search handler ==
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const results = coordinatorData.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  ///  ============ User Search modal open handler ===================== \\
  const searchOpenHandle = () => {
    setOpenSearch(true)
  }
  ///  ============ User Search modal hide handler ===================== \\
  const searchHideHandle = () => {
    setOpenSearch(false)
  }
    const handleShowModal = () =>{
      setShowModal(true)
      searchHideHandle()
    }
    const handleClose = () =>{
      setShowModal(false)
    }

    const validationSchema = yup.object().shape({
      userName: yup.string().required("Username is required"),
      userType: yup.string().required("UserType is required"),
      EmailId: yup.string()
        .required("Email is required")
        .email("Invalid Email Address"),
      phone: yup
        .string()
        .required("Phone Number is Required")
        .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
      coordinator: yup.string().required("Designation is required"),
    });
    const onSubmit = (values) => {
      const temp = [...coordinators, values];
      setCoordinators(temp)
    }
const formik = useFormik({
  initialValues: {
    userName : "",
    userType: "",
    EmailId: "",
    phone : "",
    coordinator : ""
  },
  validationSchema : validationSchema,
  onSubmit
})
const handleData =(email) =>{
  const res = coordinatorData.find((i) => i?.email === email);
  // const updatedCoordinatorData = searchResults.filter((i) => i?.email !== email);

  // // Create a new array with the existing coordinators and the new coordinator
  // const temp = [...coordinators, res];

  // // Map the array to extract specific properties from each coordinator
  // const mappedCoordinators = temp?.map((i) => ({
  //   name: i.name,
  //   designation: i.designation,
  //   email: i.email,
  //   phone: i.phone,
  //   typeOfCoordinator: i.typeOfCoordinator,
  // }));
  // console.log(mappedCoordinators,"reshhd")
  // // Set the formik field value and update the state with the new coordinators
  // formik.setFieldValue("eventcoordinators", mappedCoordinators);
  // setCoordinators(mappedCoordinators);
  //   // Filter coordinatorData based on ids in the coordinators array
  //   let filteredCoordinatorData = updatedCoordinatorData.filter((coordinator) =>
  //   mappedCoordinators.some((selected) => selected.email !== coordinator.email)
  // );

  // // Update coordinatorData with the filtered array
  // setSearchResults(filteredCoordinatorData);
  searchHideHandle();
 }

// Delete
const handleDelete = (id)=>{
  const temp = [...coordinators]
  temp.splice(id, 1);
  setCoordinators(temp)
}
  return (
    <>
    <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>
      <div className="mt-3 mb-2">
        <span className=" fs-2 fw-semibold">
          Appoint a Secretariat Members
        </span>
      </div>

      <div className="mb-50  col-12 col-sm-12 col-md-7">
        <span className="color-grey fs-15px fw-500">
        They will form the core team of the Secretariat. The Secretariat is responsible for helping the Teacher Coordinator/s in the organisation and logistics of various activities.
        </span>
      </div>

      <div className="col-12 col-sm-12 col-md-8 col-lg-7">
      <div  className="card px-2 dashed-border rounded-4 cursor-pointer mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center" onClick={searchOpenHandle}>
            <div className="me-2">
              <span>
                <img
                  src={"/images/OnBoarding/plus-green.png"}
                  style={{
                    fontSize: "35px",
                    color: "#4CAF50",
                  }}
                />
              </span>
            </div>
            <div className="ms-2">
              <span className="fs-5 fw-500">
                Search or Add Secretariat Member
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
        <span className="fs-6 fw-semibold color-purple d-flex">
          <div>
          <span className="me-2">
            {<img src="/images/onBoarding/note.png" />}
          </span>
          </div>
          <div>
          You may appoint up to 6 student coordinators who will help organise the event.
          </div>
        </span>
      </div>

      <div className="d-flex flex-column mb-50">
        <div className="d-flex justify-content-between mb-4">
          <span className="fs-4 fw-500">Secretariat Members</span>
          <div className="d-flex">
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-left.png"
            />
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-right.png"
            />
          </div>
        </div>
        <div className="scroll-modelun-register">
          {coordinators?.map((c, id) => {
            return (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-5 fw-500">{c.userName}</span>
                  <div className="d-flex align-items-center">
                    <div className="me-3 cursor-pointer">
                      <Select
                        styles={customStylesPurple}
                        options={SecretariatMember}
                        defaultValue={SecretariatMember[0]}
                        getOptionLabel={(option) => {
                          return (
                            <>
                              <div className="p-2">
                                <span className="color-purple fs-17px fw-semibold text-center">
                                  {option.des}
                                </span>
                              </div>
                            </>
                          );
                        }}
                      />
                    </div>
                    <div onClick={()=> handleDelete(id)}
                      className="d-flex align-items-center justify-content-center cursor-pointer "
                      style={{
                        background: "#FFD6D6",
                        width: "37px",
                        height: "37px",
                        borderRadius: "7px",
                      }}
                    >
                      <img
                        className="cursor-pointer"
                        src="/images/onBoarding/remove-2.png"
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="d-flex justify-content-between  mt-4">
        <button
          onClick={()=>setCurrentStep(7)}
          className=" btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button
          onClick={()=>setCurrentStep(9)}
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>
      </div>

 {/*  ========= Open search user modal for assign SECRETARIAT MEMBERS  for  same  institute =======*/}
 <div className="container" >
      <Modal show={openSearch} className="left-rounded-modal" onHide={searchHideHandle} size="lg">
      <div className="modal-content">  
          <span className="content-title fw-600 color-black fs-2 px-5 mt-3">
          Add Secretariat Member
          </span>
      <span className="fs-19px px-5 mt-4" style={{color:"#000000"}}>Search for the Student here by typing their name</span>
        <Modal.Body>
       
                <form>
                <div className="mt-2 px-4">
                  <input className="search-handle" type="text" name="userName" placeholder="Type a name"  value={searchTerm}
        onChange={handleSearch}/>
                 
                    </div>
                    <div className="bg-light mt-3 px-5 mx-4" style={{width:"65%"}}>
                     <div className="databox overflow-y-auto">

                      {searchResults.map((i)=>
                        (

                          <div className="d-flex justify-content-between mt-2 cursor-pointer " onClick={()=>handleData(i?.email)} key={i?.email}>
                            <span className="fs-19px">{i?.name}</span>
                            <span className="fs-19px" style={{color:"#5A00EE"}}>{i?.designation}</span>
                          </div> 
                        )
                      )}
                     </div>
                      <div className="d-flex align-items-center cursor-pointer mt-3" onClick={handleShowModal}>
                        <div className="me-2">
                          <span>
                            <img
                              src={"/images/OnBoarding/plus-green.png"}
                              style={{
                                fontSize: "35px",
                                color: "#4CAF50",
                              }}
                            />
                          </span>
                        </div>
                        <div className="ms-2" >
                          <span className="fs-5 fw-500">
                           Add New
                          </span>
                        </div>
                      </div>
                    </div>
                     
                </form>
        </Modal.Body>
      </div>
      </Modal>
    </div>
     {/* ======= ADD external user for as a  SECRETARIAT MEMBERS  Modal =========  */}
      <div className="container" >
      <Modal show={showModal} className="left-rounded-modal" onHide={handleClose} size="lg">
  <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="content-title fw-600 color-black fs-34px px-5">
          New Secretariat Member 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <div class="bd-example-modal-lg px-5">
            <div className="row">
              <div className="column col-12  col-lg-10 ">
                <form onSubmit={formik.handleSubmit}>
              <div className="row">
              {/* userName */}
                <div className="firstName col-12  col-md-12  col-lg-6">
                  <div>
                    <div>
                  <label className="color-black fw-500 fs-19px">Full Name</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" type="text" name="userName" value={formik.values.userName} onChange={formik.handleChange} id="" />
                  {formik.errors.userName && formik.touched.userName ? (<span className="text-danger">{formik.errors.userName}</span>) : (null)}
                    </div>
                  </div>
                </div>

                {/* Designation */}
                <div className="typesOfcoordinator col-12 col-md-12 col-lg-6">
                  <div>
                    <div>
                <label className="color-black fw-500 fs-19px">User Type</label>
                    </div>
                    <div className="mt-2">
                  <select className="input-selects" name="userType"  value={formik.values.userType} onChange={formik.handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                    <option value="external">External</option>
                  </select>
                  {formik.errors.userType && formik.touched.userType ? (
                    <span className="text-danger">{formik.errors.userType}</span>
                  ) : (null)}
                    </div>
                  </div>
                </div>

                {/* EmailId */}
                <div className="emailId col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Email ID</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" type="email" name="EmailId" id=""  value={formik.values.EmailId} onChange={(e)=>{formik.setFieldValue("EmailId", e.target.value)}}/>
                    {formik.errors.EmailId && formik.touched.EmailId ? (
                      <span className="text-danger">{formik.errors.EmailId}</span>
                    ) : (null)}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="phone col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="col-12">
              <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Phone</label>
              </div>
              <div className="d-flex" >
                <div className="mt-2">
                  <select className="input-selects-phone input-group-text fw-500">
                    <option value="">+91</option>
                  </select>
                </div>
                <div className="mt-2" style={{ width: "100%"}}>
                  <input className="input-handle-phone" type="text" name="phone" id=""  value={formik.values.phone} onChange={formik.handleChange}/>
                  {formik.errors.phone && formik.touched.phone ? (
                      <span className="text-danger">{formik.errors.phone}</span>
                    ) : (null)}
                </div>
              </div>
            </div>
          </div>
          {/* type */}

          <div className="typesOfcoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Secretariat Type</label>
                    </div>
                    <div className="mt-2">
                  <select name="coordinator" className="input-selects" onChange={(e)=>setSecretariatType(e.target.value)}>
                    <option value="Executive Board">Executive Board</option>
                    <option value="Organisation Committee">Organisation Committee</option>
                    <option value="Judging and Jury">Judging and Jury</option>
                  </select>
                    </div>
                  </div>
                </div>
                {/* Coordinator */}
                {secretariatType === "Executive Board" && (
                <div className="typesOfcoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Assign Designation</label>
                    </div>
                    <div className="mt-2">
                  <select name="coordinator" className="input-selects" value={formik.values.coordinator} onChange={formik.handleChange}>
                    <option value="Chairperson">Chairperson</option>
                    <option value="Vice-Chairperson">Vice-Chairperson</option>
                    <option value="Director">Director </option>
                  </select>
                  {formik.errors.coordinator && formik.touched.coordinator ? (
                      <span className="text-danger">{formik.errors.coordinator}</span>
                    ) : (null)}
                    </div>
                  </div>
                </div>)}
                {secretariatType === "Organisation Committee" && (
                <div className="typesOfcoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Assign Designation</label>
                    </div>
                    <div className="mt-2">
                  <select name="coordinator" className="input-selects" value={formik.values.coordinator} onChange={formik.handleChange}>
                    <option value="Secretary-General">Secretary-General</option>
                    <option value="Deputy-Secretary-General">Deputy-Secretary-General</option>
                    <option value="Director-General">Director-General</option>
                    <option value="Under-Secretary-General">Under-Secretary-General</option>
                    <option value="Member OC">Member OC</option>
                  </select>
                  {formik.errors.coordinator && formik.touched.coordinator ? (
                      <span className="text-danger">{formik.errors.coordinator}</span>
                    ) : (null)}
                    </div>
                  </div>
                </div>)}
                {secretariatType === "Judging and Jury" && (
                <div className="typesOfcoordinator col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Assign Designation</label>
                    </div>
                    <div className="mt-2">
                  <select name="coordinator" className="input-selects" value={formik.values.coordinator} onChange={formik.handleChange}>
                    <option value="Jury Member">Jury Member</option>
                  </select>
                  {formik.errors.coordinator && formik.touched.coordinator ? (
                      <span className="text-danger">{formik.errors.coordinator}</span>
                    ) : (null)}
                    </div>
                  </div>
                </div>)}
                

                {/* Button */}
                <div className="addCoordinator col-12 col-sm-12 col-md-12 col-lg-6  mt-3">
                  <div className="w-100">
                  <input className="input-handle" type="submit" style={{background: "#6100FF", color:"white"}} value="Add Coordinator"/>
                  </div>
                </div>
              </div>
                </form>
              </div>
            </div>
            <div className="mt-4 mb-3 col-12 col-sm-12 col-md-12 col-lg-10">
              <div className="adminRight d-flex justify-content- align-items-center">
                <div><img src="/modelUn/Clipboard.png" alt="" /></div>
              <div className="admin-content"><span className="" style={{color: "#979797"}}>The Secretariat is responsible for helping the...</span></div>
              </div>
            </div>
            </div>
        </Modal.Body>
      </div>
      </Modal>
  </div>
    </>
  );
};
// 6
const AppointStudentMediaTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [coordinators, setCoordinators] = useState([])

  const navigate = useNavigate()

    const {
        currentStep,
        setCurrentStep
    } = useContext(ModelUnContext)

    const handleShowModal = () =>{
      setShowModal(true)
    }
    const handleClose = () =>{
      setShowModal(false)
    }

    const handleNaviageTeam = () =>{
      navigate("/model-un/teamRegistration")
    }

    const validationSchema = yup.object().shape({
      userName: yup.string().required("Username is required"),
      assignRole: yup.string().required("AssignRole is required"),
      EmailId: yup.string()
        .required("Email is required")
        .email("Invalid Email Address"),
      phone: yup
        .string()
        .required("Phone Number is Required")
        .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
    });

    // Submit btn
    const onSubmit = (values) => {
      console.log("values", values);
      const temp = [...coordinators, values];
      console.log("temp", temp);
      setCoordinators(temp)
    }
    console.log("coordinators", coordinators);
const formik = useFormik({
  initialValues: {
    userName : "",
    assignRole: "",
    EmailId: "",
    phone : "",

  },
  validationSchema : validationSchema,
  onSubmit
})

// Delete
const handleDelete = (id)=>{
  const temp = [...coordinators];
  temp.splice(id, 1)
  setCoordinators(temp)
}

  return (
    <>
    <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>
      <div className="mt-3 mb-2">
        <span className=" fs-2 fw-semibold">Appoint Press Corps Members</span>
      </div>

      <div className="mb-50 col-12 col-sm-12 col-md-7">
        <span className="color-grey fs-15px fw-500">
        They will be required to click photos/videos, write the content for promotional activities and draw the summary of the event. They will act as Photographers, Reporters and Caricaturists.
        </span>
      </div>

      <div className="col-12 col-sm-12 col-md-8 col-lg-7">
      <div className="card px-2 dashed-border rounded-4 cursor-pointer mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center" onClick={handleShowModal}>
            <div className="me-2">
              <span>
                <img
                  src={"/images/OnBoarding/plus-green.png"}
                  style={{
                    fontSize: "35px",
                    color: "#4CAF50",
                  }}
                />
              </span>
            </div>
            <div className="ms-2">
              <span className="fs-5 fw-500">
              Add Press Corps Members
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
        <span className="fs-6 fw-semibold color-purple ">
          <span className="me-2">
            {<img src="/images/onBoarding/note.png" />}
          </span>
          Select up to 10 students who will act like journalists for the events
        </span>
      </div>

      <div className="d-flex flex-column mb-50">
        <div className="d-flex justify-content-between mb-4">
          <span className="fs-4 fw-500">Secretariat Members</span>
          <div className="d-flex">
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-left.png"
            />
            <img
              className="cursor-pointer"
              src="/images/OnBoarding/arrow-right.png"
            />
          </div>
        </div>
        <div className="scroll-modelun-register">
          {coordinators?.map((c,id) => {
            return (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-5 fw-500">{c.userName}</span>
                  <div className="d-flex align-items-center">
                    <div className="me-3 cursor-pointer">
                      <Select
                        styles={customStylesPurple}
                        options={studentMedia}
                        defaultValue={studentMedia[0]}
                        getOptionLabel={(option) => {
                          return (
                            <>
                              <div className="p-2">
                                <span className="color-purple fs-17px fw-semibold text-center">
                                  {option.des}
                                </span>
                              </div>
                            </>
                          );
                        }}
                      />
                    </div>
                    <div onClick={()=> handleDelete(id)}
                      className="d-flex align-items-center justify-content-center cursor-pointer "
                      style={{
                        background: "#FFD6D6",
                        width: "37px",
                        height: "37px",
                        borderRadius: "7px",
                      }}
                    >
                      <img
                        className="cursor-pointer"
                        src="/images/onBoarding/remove-2.png"
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="d-flex justify-content-between  mt-4">
        <button
          onClick={()=>setCurrentStep(8)}
          className="btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button
          onClick={handleNaviageTeam}
          className="btn-onboard-fill"
        >
          <span>Submit</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>

      </div>

      <div className="container" >
      <Modal show={showModal} className="left-rounded-modal" onHide={handleClose} size="lg">
  <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="content-title fw-600 color-black fs-34px px-5">
          New Press Corps Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <div class="bd-example-modal-lg px-5" style={{height: ""}}>
            <div className="row">
              <div className="column col-12  col-lg-10 ">
                <form onSubmit={formik.handleSubmit}>
              <div className="row">
              {/* userName */}
                <div className="firstName col-12  col-md-12  col-lg-6">
                  <div>
                    <div>
                  <label className="color-black fw-500 fs-19px">Full Name</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" type="text" name="userName" placeholder="Name" value={formik.values.userName} onChange={formik.handleChange} id="" />
                  {formik.errors.userName && formik.touched.userName ? 
                  (<span className="text-danger">{formik.errors.userName}</span>) : (null)}
                    </div>
                  </div>
                </div>

                {/* assignRole */}
                <div className="typesOfcoordinator col-12 col-md-12 col-lg-6">
                  <div>
                    <div>
                <label className="color-black fw-500 fs-19px">Assign Role</label>
                    </div>
                    <div className="mt-2">
                  <select className="input-selects" name="assignRole"  value={formik.values.assignRole} onChange={formik.handleChange}>
                    <option value="Reporter">Reporter</option>
                    <option value="Photographer">Photographer</option>
                    <option value="Caricaturist">Caricaturist</option>
                  </select>
                  {formik.errors.assignRole && formik.touched.assignRole ? 
                  (<span className="text-danger">{formik.errors.assignRole}</span>) : (null)}
                    </div>
                  </div>
                </div>

                {/* EmailId */}
                <div className="emailId col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Email ID</label>
                    </div>
                    <div className="mt-2">
                  <input className="input-handle" type="email" name="EmailId" id="" placeholder="EmailId"  value={formik.values.EmailId} onChange={(e)=>{formik.setFieldValue("EmailId", e.target.value)}}/>
                  {formik.errors.EmailId && formik.touched.EmailId ? 
                  (<span className="text-danger">{formik.errors.EmailId}</span>) : (null)}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="phone col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="col-12">
              <div className="mt-4">
                <label className="color-black fw-500 fs-19px">Phone</label>
              </div>
              <div className="d-flex" >
                <div className="mt-2">
                  <select className="input-selects-phone input-group-text fw-500">
                    <option value="">+91</option>
                  </select>
                </div>
                <div className="mt-2" style={{ width: "100%"}}>
                  <input className="input-handle-phone" type="text" name="phone" id="" placeholder="99******88"  value={formik.values.phone} onChange={formik.handleChange}/>
                  {formik.errors.phone && formik.touched.phone ? 
                  (<span className="text-danger">{formik.errors.phone}</span>) : (null)}
                </div>
              </div>
            </div>
          </div>

                {/* Button */}
                <div className="addCoordinator col-lg-12 mt-3">
                  <div className="" >
                  <input className="input-handle" type="submit" style={{background: "#6100FF", color:"white"}} value="Add Member"/>
                  </div>
                </div>
              </div>
                </form>
              </div>
            </div>
            </div>


        </Modal.Body>
      </div>
      </Modal>
  </div>
    </>
  );
};
// 4
const Congratulations = () => {
  const [viewSummary, setViewSummary] = useState(false);
    const {
        currentStep,
        setCurrentStep,
        formik
    } = useContext(ModelUnContext)

    const navigate = useNavigate()
    const handleCountinue = ()=> {
        navigate("/new-dashboard")
    }

    const handleToggleViewSummary = ()=>{
      setViewSummary(!viewSummary)
    }

  return (
    <>
      <div className="py-1">
      <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
      </div>

      <div className="col-12 col-sm-12 col-md-8 col-lg-8">
        <div className="d-flex mt-4 justify-content-center align-items-center">
          <div style={{ position: "relative" }}>
            <img
              src="/images/model-UN/prize.png"
              style={{ position: "absolute", top: 0, left: "100px", width: "125px",height: "125px" }}
            />
            <img style={{width: "328px",height: "140px"}} src="/images/model-UN/piece-of-paper.png" />
          </div>
        </div>

        <div className="d-flex justify-content-center mb-4">
          <span className="fs-35px fw-600">Congratulations!</span>
        </div>

        <div className=" d-flex justify-content-center mb-4">
          <span className="fs-19px fw-500">
            Congratulations on completing your registration for{" "}
            <span className="fw-700 fs-19px">Yuvamanthan Youth Parliament!</span>{" "}
            We're thrilled that you've taken the initiative to organize this
            event. Here are a few impactful next steps you might consider
            (although you can also entrust these steps to your teacher
            coordinator if you prefer):
          </span>
        </div>

          
          {/* Add New Teacher Coordinator */}
        <div className="d-flex justify-content-center">
          <div
            className="card px-2 dashed-border rounded-4 cursor-pointer text-center mb-4"
            style={{
              width: "535px",
              height: "63px",
            }}
          >
            <div onClick={()=>setCurrentStep(7)} className="card-body p-0 m-0 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-around align-items-center col-12">
                <div className="d-flex align-items-center">
                <div className="me-2">
                  <span>
                    <img
                      src={"/images/OnBoarding/plus-green.png"}
                      style={{
                        fontSize: "35px",
                        color: "#4CAF50",
                      }}
                    />
                  </span>
                </div>
                <div className="ms-2">
                  <span className="fs-5 fw-500">
                  Add New Teacher Coordinator
                  </span>
                </div>
                </div>
                <div>
                 <div className="ms-3"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Add Secretariat Members */}
        <div className="d-flex justify-content-center">
          <div
            className="card px-2 dashed-border rounded-4 cursor-pointer text-center mb-4"
            style={{
              width: "535px",
              height: "63px",
            }}
          >
            <div onClick={()=>setCurrentStep(8)} className="card-body p-0 m-0 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-evenly align-items-center col-12">
                <div className="d-flex align-items-center col-9">
                <div className="me-2">
                  <span>
                    <img
                      src={"/images/OnBoarding/plus-green.png"}
                      style={{
                        fontSize: "35px",
                        color: "#4CAF50",
                      }}
                    />
                  </span>
                </div>
                <div className="ms-2">
                  <span className="fs-5 fw-500">
                  Add Secretariat Members
                  </span>
                </div>
                </div>
                <div>
                 <div className="ms-3"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
                </div>
              </div>
            </div>
          </div>
          </div>


        {/* Add Member of Press Corps */}
        <div className="d-flex justify-content-center">
          <div
            className="card px-2 dashed-border rounded-4 cursor-pointer text-center mb-4"
            style={{
              width: "535px",
              height: "63px",
            }}
          >
             <div onClick={()=>setCurrentStep(9)} className="card-body p-0 m-0 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-around align-items-center col-12">
                <div className="me-3 d-flex align-items-center col-8">
                <div className="me-2">
                  <span>
                    <img
                      src={"/images/OnBoarding/plus-green.png"}
                      style={{
                        fontSize: "35px",
                        color: "#4CAF50",
                      }}
                    />
                  </span>
                </div>
                <div className="ms-2">
                  <span className="fs-5 fw-500">
                  Add Member of Press Corps
                  </span>
                </div>
                </div>
                <div>
                 <div className="ms-2"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
                </div>
              </div>
            </div>
            </div>
            </div>


            {/* View summary */}
            <div>
              <div className="d-flex justify-content-center mx-auto">
              <div><span className="fw-600 fs-19px" style={{color: "#9000E9"}}>View event summary</span></div>
              <div onClick={handleToggleViewSummary}><div><KeyboardArrowDownIcon sx={{color: "#7D0092"}}/></div></div>
              </div>
                
                {
                  viewSummary ? (
                    <>
              <div className="mt-2 d-flex flex-row align-items-center">
                <div style={{flexGrow: "0" , border: "1px"}}><span className="fw-500 fs-15px" style={{color: "#B4B4B4"}}>Overview</span></div>
                <div style={{flexGrow: "1", height: "2.5px", margin: "0 0 0 0.8rem", background: "#E0E0E0"}}></div>
              </div>

              <div className="mt-2 d-flex">
                <div className="col-3">
                <div className="mt-3 fw-500"><span>Event Type</span></div>
                <div className="mt-3 fw-500"><span>Event Format</span></div>
                {/* <div className="mt-3 fw-500"><span>Selected Theme</span></div> */}
                {/* <div className="mt-3 fw-500"><span>Sub Theme</span></div> */}
                <div className="mt-3 fw-500"><span>Date of Event</span></div>
                <div className="mt-3 fw-500"><span>Registration Deadline</span></div>
                <div className="mt-3 fw-500"><span>Venue</span></div>
                <div className="mt-3 fw-500"><span>Event Time</span></div>
                </div>
                
                <div className="ms-5">
                <div className="mt-3 fw-700 fs-19px"><span>{formik.values.eventType}</span></div>
                <div className="mt-2 fw-700 fs-19px"><span>{formik.values.chooseFormat}</span></div>
                {/* <div className="mt-3 fw-700 fs-19px"><span>{formik.values.eventTheme}</span></div> */}
                {/* <div className="mt-3 fw-700 fs-19px"><span>{formik.values.}</span></div> */}
                <div className="mt-2 fw-700 fs-19px"><span>{formik.values.lastDateEvent}</span></div>
                <div className="mt-3 fw-700 fs-19px"><span>{formik.values.lastDateRegis}</span></div>
                <div className="mt-3 fw-700 fs-19px"><span>{formik.values.venue}</span></div>
                <div className="mt-3 fw-700 fs-19px"><span>{formik.values.event_time}</span></div>
                </div>
              </div>

              {/* Committees */}
              <div className="mt-3 d-flex flex-row align-items-center">
                <div style={{flexGrow: "0" , border: "1px"}}><span className="fw-500 fs-15px" style={{color: "#B4B4B4"}}>Committees</span></div>
                <div style={{flexGrow: "1", height: "2.5px", margin: "0 0 0 0.8rem", background: "#E0E0E0"}}></div>
              </div>

              <div className="mt-2 row">
      <div className="scroll-modelun-register">
          {/* {dataForm?.map((ele, id)=>{
            console.log(ele)
            return (
            <> */}
      {  formik?.values.slectedCommittee?.map((i)=>{
        return <>
        <div className="d-flex justify-content-around align-items-center mt-1" style={{background: "#F9F9F9", height: "55px", borderRadius: "8px"}}>
          <div className="col-8"><span className="fw-500 fs-19px" style={{color: "#3A3A3A"}}>{i.committee}</span></div>
          <div className=""><span className="fs-19px fw-500" style={{color: "#4A00E8"}}>{i.slots}</span></div>
          </div>
        </>
      })  
          }
            
      </div>
          </div>
                    </>
                  ) : (null)
                }


            </div>

        <div className="d-flex justify-content-center  mt-2"  >
        <button
          onClick={handleCountinue}
          className="btn-onboard-fill"
        >
          <span>Go to Event</span>
        </button>
      </div>
      </div>

        
      </div>
    </>
  );
};

// 7
const ChooseEventTheme = () => {
    const {
        currentStep,
        setCurrentStep,
        formik,
        eventTheme,
        subTheme
    } = useContext(ModelUnContext)

    const [subThemeToggle, setSubThemeToggle] = useState(false);

    const themeToggle = () =>{
      setSubThemeToggle(true)
    }
    // console.log("subTheme", subTheme.mainthemeId);
  return (
    <>
      <div>
      <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>

    {/* Choose EventTheme */}
        <div className="d-flex align-items-center mt-3 mb-2">
          <div>
          <span className="fs-32px fw-600">Choose a Event Theme</span>
          </div>
          <div>
        <div className="ms-3"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
      </div>
        </div>

        <div className="mb-50">
          <span className="fs-20px fw-500" style={{color: "#979797"}}>
            Choose a theme for the event that you want to organise.
          </span>
        </div>
        
        <div className="col-12 col-sm-12 col-md-8 col-lg-7">
          <form onSubmit={formik.handleSubmit}>
        {/* Sub theme */}
        <div className="mt-4">
          <span className="fs-19px fw-500 mb-2 d-block">Select a sub theme</span>
          <div  onClick={themeToggle}>
            <Select 
            onChange={(e)=> formik.setFieldValue("subTheme", e.dataValues?.sub_theme_title)}
              styles={customStyles}
              options={subTheme}
              defaultValue={subTheme[0]}
              getOptionLabel={(option, id) => {
                // console.log("option", option.dataValues);
                return (
                  <>
                    <div key={id} className="">
                      <span className=" fs-19px fw-500 text-center">
                        {option?.dataValues?.sub_theme_title}
                      </span>
                    </div>
                  </>
                );
              }}
            />
          </div>
          {formik.errors.subTheme && formik.touched.subTheme ?
          <span className="text-danger">{formik.errors.subTheme}</span> : null}
        </div> 

            {/* Theme title */}
            { subThemeToggle &&  
              <div>
                <span className="fs-19px fw-500 mb-2 d-block mt-4">Enter your theme title</span>
                <div className="col-12">
                  <input
                  //  onChange={(e)=> formik.setFieldValue("eventTheme", eventTheme)}
                  name="eventTheme"
                  onChange={formik.handleChange}
                  value={formik.values.eventTheme} 
                  style={{width: "100%", height: "45px", background: "#a2a2a221",  border: "none", outline: "none" ,padding: "11px", borderRadius: "8px"}} placeholder="Eg. Protect Earth"/>
                </div>
                {/* {formik.errors.eventTheme && formik.touched.eventTheme ?
                <span className="text-danger">{formik.errors.eventTheme}</span> : null} */}
              </div>
            }

        <div className="d-flex justify-content-between align-items-end mx-auto mt-5">
        <button
          onClick={()=>setCurrentStep(1)}
          className="btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button
        type="submit"
          onClick={
            formik.values.subTheme ?
              ()=> setCurrentStep(3) :
              null
           }
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>
      </form>

        </div>
      </div>
    </>
  );
};


const init =  {
  committee: "",
  slots: "",
}
// 8
const PositionAllotment = () =>{
    const {
        currentStep,
        setCurrentStep,
        formik,
        setUnData,
    } = useContext(ModelUnContext)

// Delete

const [committeeForm, setCommitteeForm] = useState(formik?.values?.slectedCommittee||[]);
// const [committeeForm, setCommitteeForm] = useState([]);
const [dataForm, setDataForm] = useState([]);
const [committeeArray, setCommitteeArray] = useState([])
const [expandComm, setExpandComm] = useState(false)
const [errorHandle, setErrorHandle] = useState("")
const [tracks, setTracks] = useState([])

const newHandleChange = ()=>{
  setUnData('slectedCommittee',committeeForm);
}

  // handle input committee and slots
  const handlePositionsChange = (e,title,change,id) => {
      const isAlreadyAdded = committeeForm?.some((item) => item?.committee === title);
  console.log("isAlreadyAdded", isAlreadyAdded)

      if (isAlreadyAdded) {
        if(change){
          setCommitteeForm((prevForm) =>
          prevForm.map((item) =>
            item.committee === title
              ? { ...item, slots: parseInt(e.target.value), committeeId:id }
              : item
          )
        );
        }
        else{
        setCommitteeForm((prevForm) => prevForm?.filter((item) => item?.committee !== title));
        }
      } else {
        setCommitteeForm((prevForm) => [...prevForm, { committee: title, slots: change && e.target.value, }]);
      }
  };

  const handleTrack =(track, id)=>{
    console.log("track", track);

    const hasG20Committee = committeeForm?.find((ele) => ele?.committee === "G20");
  
    if (hasG20Committee) {
     
      const existingCommitteeForm = [...committeeForm]; // Make a copy of the array

      // Find the index of the committee with "G20"
      const index = existingCommitteeForm.findIndex((ele) => ele?.committee === "G20");

      if (index !== -1) {
        // Create a new array of objects to add
        
        console.log(existingCommitteeForm[index])
        let tracksTemp =  existingCommitteeForm[index]?.tracks || []
        // Update the existing object with the new array of objects
        existingCommitteeForm[index] = {
          ...existingCommitteeForm[index],
          tracks: [...tracksTemp, {name: track}],
        };
  
        // Use setCommitteeForm to update the state
        setCommitteeForm(existingCommitteeForm);
      }
    }
    
  }


  // const handleTrack =()=>{

  // }

  console.log("committeeForm", committeeForm)

  const getAllCommittee = ()=>{
    apiJson('api/v2/modelUn-institute/getAllCommitee')
    .then((res)=>{
      setCommitteeArray(res.data.result)
    })
  }
  useEffect(()=>{
    getAllCommittee()
  },[])

  const handleNextComm = () => {
    let emptyFieldIndex = committeeForm.findIndex((ele) => (!ele?.committee || !ele?.slots) && ele?.committee !== "G20");

    if ( emptyFieldIndex !== -1) {
      toast.dismiss()
      toast.error("Slots isRequired")
    } else  {
      setCurrentStep(4);
    }
  };
  

  return(
    <>
    <div>
     <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>

      {/* Select Committees */}
        <div className="d-flex align-items-center mt-3">
          <div>
          <span className="fs-32px fw-600">Select Committees</span>
          </div>
          <div>
        <div className="ms-3"><HelpOutlineIcon sx={{color: "#5686E1", fontSize: "20px"}}/></div>
      </div>
        </div>

        <div><span className="fw-500 fs-20px" style={{color: "#979797"}}>Allot a your desired number of positions to each committees</span></div>

      {/* Select  committee */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-11">
        <form onSubmit={formik.handleSubmit}>
      <div className="mt-4">
      <div className="col-12">

        <div className="row ">

          <div className="d-flex justify-content-between col-8">
            <div><span className="fs-19px fw-600">Committee</span></div>
            <div><span className="fs-19px fw-600">No. of Students</span></div>
          </div>

          <div className="">
          <div className="row">
            {committeeArray.map((ele,i)=>{
               const committeeItem = committeeForm?.find((item, i) => item?.committee === ele?.committees) || { committee: "", slots: 0};
                return (
                  <>
                  <div key={i} className={`col-lg-6 mt-3 ${ele?.diabledcss ? "btn-onboard-fill-disabled-Committee" : null}`}>
              <div className="d-flex align-items-center">
                <div><input style={{height: "18px", width:"18px"}} onClick={() => ele?.committees === "G20" } className="inputcheck" type="checkbox" 
                name="committee" checked={committeeItem?.committee === ele?.committees} onChange={(e)=>{
                  handlePositionsChange(e,ele?.committees, false, ele.id)
                }}/></div>
              
                <div className="col-12 ms-3">
                  <span className="fs-19px fw-500 d-block" style={{ fontFamily : "Poppins"}}>{ele?.committees}</span>
                  <span className="fs-19px fw-600" style={{color :"#4A00E8", fontFamily : "Poppins"}}>{ele?.range}</span>
                </div>
              </div>
              </div>

              <div className={`col-lg-6 mt-3 ${ele.committees === "G20" ? "btn-onboard-fill-disabled-Committee" : null}` }>
              <div className="d-flex justify-content-around align-items-center" style={{ width: "300px"}}>
                <div>

                <div style={{width: "140px", height :"46px"}}>
                  <input style={{width : "100%", height :"45px",  borderRadius: "8px", background: "#F9F9F9", color: "#BCBCBC",padding: "6px",border: "none"}}
                   placeholder="Min 15" 
                  type="number" name="slots" value={committeeForm?.find((i)=>i?.committee==ele?.committees)?.slots} onChange={(e)=> handlePositionsChange(e,ele?.committees, true, ele.id)}/>
                  {/* {committeeItem?.committee === ele?.committees && <div className="text-center"><span className="text-danger">{errorHandle}</span></div>} */}
                  

                </div>

                </div>
                <div className="">
                  <span className="fs-19px fw-500" style={{color: "#4A00E8"}}>Details</span>
                </div>
              </div>
              </div>
              
                    <div>
                    {ele?.committees === "G20" && (
                    <div>
                      {committeeItem?.committee === ele?.committees && 
                        <div>
                          <div><span >Select Track</span></div>
                      {committeeTrack?.map((ele) => (
                        <div key={ele?.id}>
                            <div className="expand">
                    <div className="col-3">
                            <div className="d-flex align-items-center mt-2">
                              <div>
                                <input type="checkbox" className="inputcheck" name="tracks" style={{ width: "18px", height: "18px" }} 
                                // checked={committeeItem?.committee === ele?.track}
                                onChange={(e)=> handleTrack( ele?.track, ele.id)}
                                />
                              </div>
                              <div>
                                <span>{ele?.track}</span>
                              </div>
                            </div>
                      </div>
                          </div>
                        </div>
                      ))}
                        </div>
                      }
                      </div>
                  )}
                  </div>
              <div className="col-10">
              <hr style={{color: "#F1F1F1"}}/>
              </div>
                  </>
                )
              })
            }
          </div>
          </div>
          </div>
        </div>

      </div>

      </form>
   

    <div className="d-flex justify-content-between mt-5 mb-2 col-8">
        <button
          onClick={()=>setCurrentStep(1)}
          className="btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button
          onClick={()=>{
            newHandleChange()
            handleNextComm()
          }}
          className="btn-onboard-fill"
          type=""
          >
          Save & Contitue
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>

        </div>


    </div>
    </>
  )
}

// 2
const LastDateRegis = () => {

    const {
        currentStep,
        setCurrentStep,
        formik
    } = useContext(ModelUnContext)

    const [lastDate, setLastDate] = useState("")
    const setDate = (date) =>{
      console.log("--**date", date);
      setLastDate(date)
    }

    useEffect(()=>{
      formik.setFieldValue("lastDateRegis", lastDate)
    },[lastDate])


    const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(true);

  useEffect(() => {
    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerOpen]);

  const handleClickOutside = (event) => {
    if (
      selectedDate &&
      event.target &&
      !event.target.classList.contains('react-datepicker')
    ) {
      setIsDatePickerOpen(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div>
      <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registrations</span>
      </div>
        <div className="mt-3">
          <span className="fs-32px fw-600">Last date of registration of students  </span>
        </div>
        <div className="mt-3 ">
          <span className="fs-20px fw-500" style={{color: "#979797"}}>
          You can change this date at any time
          </span>
        </div>
        
     
        <div className="mt-3 col-12 col-sm-12 col-md-8 col-lg-7">
          <form onSubmit={formik.handleSubmit}>
          <div className="d-flex gap-3">
            <div className="mb-3 col-12 col-md-8 col-lg-8 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">Venue</label>
              <input type="text" className="form-control shadow-none rounded-3" name="venue" onChange={(e)=>{formik.setFieldValue("venue", e.target.value)}} id="exampleFormControlInput1" placeholder="Add your venue" />
              <div className="ms-2">
      {formik.errors.venue && formik.touched.venue ?
      <span className="text-danger">{formik.errors.venue}</span> : null}
      </div>
            </div>
            <div className="col-12 col-md-8 col-lg-8">

              <label htmlFor="event_time" className="form-label">Event Time</label>
              <input type="time" className="form-control shadow-none rounded-3" onChange={(e)=>{formik.setFieldValue("event_time", e.target.value)}} name ="event_time"id="event_time" />
              <div className="ms-2">
      {formik.errors.event_time && formik.touched.event_time ?
      <span className="text-danger">{formik.errors.event_time}</span> : null}
      </div>
            </div>
          </div>
      <div className="mt-4 mb-4">
      <DatePickerOwn setDate={setDate}/>
      </div>

      <div className="ms-2">
      {formik.errors.lastDateRegis && formik.touched.lastDateRegis ?
      <span className="text-danger">{formik.errors.lastDateRegis}</span> : null}
      </div>


        <div className="d-flex justify-content-between  mt-4">
        <button
          onClick={()=>setCurrentStep(3)}
          className="btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button
        type="submit"
        
          onClick={
            formik.values.lastDateRegis ? 
            ()=>setCurrentStep(5) : null
          }
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>
      </form>

      </div>
      </div>
    </>
  );
};

// 3
const LastDateEvent = () => {
    const {
        currentStep,
        setCurrentStep,
        formik
    } = useContext(ModelUnContext)
    const [lastDate, setLastDate] = useState("")

    const setDate = (date) =>{
      console.log("--**date", date);
      setLastDate(date)
    }

    useEffect(()=>{
      formik.setFieldValue("lastDateEvent", lastDate)
    },[lastDate])
  return (
    <>
      <div>
      <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
      </div>
        <div className="mt-3">
          <span className="fs-32px fw-600">Date of the Proposed Event  </span>
        </div>
        <div className="mt-3">
          <span className="fs-20px fw-500" style={{color: "#979797"}}>
          You can change this date at any time
          </span>
        </div>

        <div className="col-12 col-sm-12 col-md-8 col-lg-7">
          <form onSubmit={formik.handleSubmit}>
        <div className="mt-4 mb-4 ">
      <DatePickerOwn setDate={setDate}/>
      </div>

      <div className="ms-2">
      {formik.errors.lastDateEvent && formik.touched.lastDateEvent ?
      <span className="text-danger">{formik.errors.lastDateEvent}</span> : null}
      </div>
      

        <div className="d-flex justify-content-between  mt-4">
        <button
          onClick={()=>setCurrentStep(4)}
          className="btn-onboard fs-19px fw-500"
          style={{color: "#808080"}}
        >
          Previous
        </button>
        <button 
        // type="submit"
        onClick={
          (e)=>{
            e.preventDefault()
            if(formik.isValid){
              formik.handleSubmit()
              setCurrentStep(6);
            }
          }
        }
          className="btn-onboard-fill"
        >
          <span>Save & Continue</span>
          <img className="ms-2" src="/images/onBoarding/right-icon.png" />
        </button>
      </div>
      </form>
        </div>

        
      </div>
    </>
  );
};

const eventType = [
  {
    type: "Intra Institutional",
    body: "Students from the same educational institute can participate",
    show: "Register Student",
  },
  {
    type: "Inter Institutional",
    body: "Students from other educational institutions will also participate",
    show: "Register Teacher",
    diabledcss: "btn-onboard-fill-disabled-Inter",
  },
];

const chooseFormat = [
  {
    type: "IMission Life",
    body: "Description about model 2",
    show: "In partnership with United Nations Development Programme",
  },
  {
    type: "Bharat@2047",
    body: "Description about model 2",
  },
  {
    type: "IGNITING INDIA'S JOURNEY TO 2047",
    body: "PROMOTION OF SYSTEM OF ALTERNATIVE HEALTHCARE FOR A HEALTHY FUTURE.",
  },
];

const committee = [
  {
    value: 1,
    committee: "United Nations Development Programme (UNDP)",
    range: "Min 15 - Max 170 students can participate",
    disabledcss: false,
    slots: 0
  },
  {
    value: 2,
    committee: "All India Political Parties Meeting (AIPPM)",
    range: "Min 15 - Max 170 students can participate",
    disabledcss: false,
    slots: 0
  },
  {
    value: 3,
    committee: "United Nations Environment Programme (UNEP)",
    range: "Min 15 - Max 170 students can participate",
    disabledcss: false,
    slots: 0
  },
  {
    value: 4,
    committee: "World Health Organization (WHO)",
    range: "Min 15 - Max 170 students can participate",
    diabledcss: "btn-onboard-fill-disabled-Inter",
    disabledcss: true,
    slots: 0
  },
  {
    value: 5,
    committee: "United Nations Women (UNW)",
    range: "Min 15 - Max 170 students can participate",
    diabledcss: "btn-onboard-fill-disabled-Inter",
    disabledcss: true,
    slots: 0
  },
  {
    value: 6,
    committee: "Conference of the Parties (COP28)",
    range: "Min 15 - Max 170 students can participate",
    disabledcss: true,
    slots: 0
  },
  {
    value: 7,
    committee: "Group of Twenty (G20)",
    range: "Min 15 - Max 170 students can participate",
    disabledcss: true,
    slots: 0
  },
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "3px",
    border: "none",
    background: "#a2a2a221",
    color:'black'
    // boxShadow:'none'
  }),
};
const customStylesPurple = {
  control: (provided) => ({
    ...provided,
    width: "170px",
    padding: "",
    border: "none",
    background: "#F1EBFF",
    textAlign: "center",
    height: "37px",
    // boxShadow:'none'
  }),
};
const customStylesNumber = {
  control: (provided) => ({
    ...provided,
    padding: "5px 0  ",
    border: "none",
    background: "#F1EBFF",
    color: "#4A00E8",
    width: "100&",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    borderRadius: "10px",
  }),
};

const designations = [
  {
    value: 1,
    des: "Moderator",
  },
  {
    value: 2,
    des: "Admin",
  },
  {
    value: 3,
    des: "Manager",
  },
];

const SecretariatMember = [
  {
    value: 1,
    des: "Climate Change",
  }
];

const subTheme = [
  {
    value: 1,
    des: "Global Warming",
  },
  {
    value: 2,
    des: "Global Warming",
  },
  {
    value: 3,
    des: "Global Warming",
  }
];

const studentMedia = [
  {
    value: 1,
    des: "Photographer",
  },
  {
    value: 2,
    des: "Reporter",
  }
];

const committeeTrack = [
  { 
    id : 1,
    name : "G20",
    track : "Track 1"
  },
  { 
    id : 2,
    name : "G20",
    track : "Track 2"
  },
  { 
    id : 3,
    name : "G20",
    track : "Track 3"
  },
  { 
    id : 4,
    name : "G20",
    track : "Track 4"
  }
]

const coordinatorData = [
  {
    name:"Shailesh sainee",
    designation:"Teacher",
    email:"shaileshsainee3450@gmail.com",
    phone:8419810848,
    typeOfCoordinator:"Full Access",
  },
  {
    name:"Sahil gagan",
    designation:"Principal",
    email:"sahlgagan@gmail.com",
    phone:8419810866,
    typeOfCoordinator:"Limited Access",
  },
  {
    name:"Nitesh Rawat",
    designation:"Teacher",
    email:"Nitesh@gmail.com",
    phone:8419810822,
    typeOfCoordinator:"Full Access",
  },
  {
    name:"Sanjay Verma",
    designation:"Teacher",
    email:"sanjaykum@gmail.com",
    phone:841981767,
    typeOfCoordinator:"Limited Access",
  },
  {
    name:"Sachin Yadav",
    designation:"Vice Principal",
    email:"sachin082@gmail.com",
    phone:8419832422,
    typeOfCoordinator:"Limited Access",
  }
]
const rolesArray = [
  { value: 'principal', name: 'Principal' },
  { value: 'vicePrincipal', name: 'Vice Principal' },
  { value: 'headmaster', name: 'Headmaster/Headmistress' },
  { value: 'schoolAdministrator', name: 'School Administrator' },
  { value: 'schoolCoordinator', name: 'School Coordinator' },
  { value: 'teacher', name: 'Teacher' },
  { value: 'subjectTeacher', name: 'Subject Teacher' },
  { value: 'specialEducator', name: 'Special Educator' },
  { value: 'schoolCounselor', name: 'School Counselor' },
  { value: 'librarian', name: 'Librarian' },
  { value: 'physicalEducationTeacher', name: 'Physical Education Teacher (PET)' },
  { value: 'labAssistant', name: 'Lab Assistant' },
  { value: 'administrativeStaff', name: 'Administrative Staff' },
  { value: 'itCoordinator', name: 'IT Coordinator/IT Teacher' },
  { value: 'artTeacher', name: 'Art Teacher' },
  { value: 'musicTeacher', name: 'Music Teacher' },
  { value: 'danceTeacher', name: 'Dance Teacher' },
  { value: 'sportsCoach', name: 'Sports Coach' },
  { value: 'director', name: 'Director' },
  { value: 'academicHead', name: 'Academic Head' },
  { value: 'subjectExperts', name: 'Subject Experts/Faculty' },
  { value: 'teachingMentor', name: 'Teaching/Subject Mentor' },
  { value: 'contentDeveloper', name: 'Content Developer' },
  { value: 'academicCoordinator', name: 'Academic Coordinator' },
  { value: 'centerManager', name: 'Center Manager' },
  { value: 'marketingManager', name: 'Marketing Manager' },
  { value: 'admissionCounselor', name: 'Admission Counselor' },
  { value: 'frontOfficeExecutive', name: 'Front Office Executive' },
  { value: 'onlinePlatformManager', name: 'Online Platform Manager' },
  { value: 'digitalMarketingExecutive', name: 'Digital Marketing Executive' },
  { value: 'courseCoordinator', name: 'Course Coordinator' },
  { value: 'administrativeStaff', name: 'Administrative Staff' },
  { value: 'testCoordinator', name: 'Test Coordinator' },
  { value: 'researchAnalyst', name: 'Research Analyst' },
  { value: 'itSupportSpecialist', name: 'IT Support Specialist' },
  { value: 'onlineContentModerator', name: 'Online Content Moderator' },
  { value: 'onlineLearningFacilitator', name: 'Online Learning Facilitator' }
];


// if adding component then add afterward (latest at-last position)
const modelUnRegistrationSteps  = [
    <Registration/>,//0
    <ChooseFormat/>,//1
    <ChooseEventTheme/>,//2
    <PositionAllotment/>, //3
    <LastDateRegis/>,//4
    <LastDateEvent/>,//5
    <Congratulations/>,     //6
    <AppointCoordinators/>,//7
    <AppointStudentCoordinators/>,//8
    <AppointStudentMediaTeam/>,//9
]