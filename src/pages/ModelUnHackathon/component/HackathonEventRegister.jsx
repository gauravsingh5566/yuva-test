import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { ButtonGroup, YmBreadCrumbs } from 'pages/ModelUnParliament';
import DatePickerOwn from 'pages/modelUN/component/DatePickerOwn';
import { useHackathonContext } from '../context/contextHackathon';
const eventType = [
  {
    id: 1,
    type: "Intra Institutional",
    body: "Students from the same educational institute can participate",
    show: "Register Student",
  },
  {
    id: 2,
    type: "Inter Institutional",
    body: "Students from other educational institutions will also participate",
    show: "Register Teacher",
  },
];
export const HackathonEventRegister = () => {
    const { stepCount, setStepCount } = useHackathonContext();

    const renderStepper = () => {
  
      switch (true) {
        case stepCount === 1:
          return (
            <div>
              <Registration />
            </div>
          );
        case stepCount === 2:
          return (
            <div>
              <AppointmentBookTeacher />
            </div>
          );
        case stepCount === 3:
          return (
            <div>
              <LastDateRegis />
            </div>
          );
        case stepCount === 4:
          return (
            <div>
              <LastDateEvent />
            </div>
          );
        case stepCount === 5:
          return (
            <div>
              <Congratulations />
            </div>
          );
        case stepCount === 6:
          return (
            <div>
              <AppointStudentCoordinator />
            </div>
          );
        case stepCount === 7:
          return (
            <div>
              <AppointStudentMediaTeam />
            </div>
          );
        case stepCount === 8:
          return (
            <div>
              <ChooseEventTheme />
            </div>
          );
      }
    };
    return (
      <>
        <div>{renderStepper()}</div>
      </>
    )
}
const Registration = () => {

    const [selectedType, setSelectedType] = useState(eventType[0]?.type);
  
    const { stepCount, setStepCount } = useHackathonContext();
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
    return (
  
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Registration" />
        <div className="px-5">
          <span className='fs-2 fw-600'>Choose Event Type</span>
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <div className='d-flex flex-column  py-5'>
                {eventType.map((acc, index) => {
                  return (
                    <>
  
                      <Card
                        onClick={() => setSelectedType(acc.type)}
                        style={{ borderColor: "transparent" }}
                        className={`cursor-pointer rounded-4 mb-4 border-3 ${selectedType === acc.type && "border-blue"
                          }`}
                        key={acc.id}
                      >
                        <Card.Body>
                          <div className="form-check d-flex ">
                            <span>
                              <input
                                onChange={() => setSelectedType(acc.type)}
                                className="form-check-input"
                                type="radio"
                                name="account"
                                id={acc.type}
                                value={acc.type}
                                checked={selectedType === acc.type}
                              />
                            </span>
                            <div className="form-check-label ms-2 " for={acc.type}>
                              <div>
                                <span className="fw-500 fs-22px">
  
                                  {acc.type}
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: "#9A9A9A",
                                  }}
                                  className="fs-15px fw-500"
                                >
  
                                  {acc.body}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
  
                    </>
                  );
                })}
              </div>
              <ButtonGroup handleNext={handleNext} btnName="Save & Continue" btnPrev="Discard" stepCount={stepCount} />
            </div>
          </div>
        </div>
  
      </>
  
  
    );
  };
  
const AppointmentBookTeacher = () => {
  
    const [showModal, setShowModal] = useState(false);
    const { stepCount, setStepCount } = useHackathonContext();
    const [formData, setFormData] = useState({})
    const [accountManagers, setAccountManagers] = useState([])
  
  
    const handleFormData = (name, value) => {
      setFormData({ ...formData, [name]: value, })
    }
   // <=======Validation schema for AppointmentBookTeacher======> 
  
    const validation = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email().required('Required'),
      phone: Yup.number().required('Required'),
     
    })
  // <=========== Handle Add  function ===========>
    const handleAddManager = () => {
      setAccountManagers([...accountManagers, formData]);
      setFormData([])
      setShowModal(false)
    }
  // <=========== Handle Remove function ===========>
    const handleRemove = (i) => {
      const updatedManagers = accountManagers.filter((_, index) => index !== i);
      setAccountManagers(updatedManagers);
    };
  //  <=========== Formik initial value =========== >
    const initialValues = {
      name: '',
      designation: '',
      email: '',
      phone: '',
      typeOfManager: {},
    }
  // <=============Handle Next Step ============>
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
  // <=============Handle Previous Step ============>
    const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
  // <=========== Handle open modal ===============>
    const handleShowModal = () => {
      setShowModal(true);
    }
  // <=========== Handle Close modal ===============>
    const hideModal = () => {
      setShowModal(false)
  
    }
  
    const customStyles = {
      control: (provided) => ({
        ...provided,
        padding: '3px',
        border: 'none',
        background: '#eeeeee4d',
        // boxShadow:'none'
      }),
  
    };
  // <==============Handle onSubmit function Modal form =========>> 
    const onSubmit = () => {
      handleAddManager()
      // handleFormData()
      formik.resetForm()
    }
  // <==============Handle formik for  Modal form =========>> 
    const formik = useFormik({
      initialValues,
      validationSchema: validation,
      onSubmit
    })
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon"  end="Registration" />
        <div className="px-5">
          <span className='fs-2 fw-600'>Appoint a Teacher Coordinators</span>
          <p className='fs-5 fw-500 ' style={{ color: "#979797", marginBottom:"30px" }}>A Teacher Coordinator will help manage, coordinate <br />and organise the event.</p>
          <div className="col-12 col-md-8 col-lg-8">
            <div className="card px-2 dashed-border rounded-4 cursor-pointer mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <span>
                      <AddCircleIcon color="success" style={{ fontSize: "35px" }} />
                    </span>
                  </div>
                  <div className="ms-2">
                    <span className="fs-5 fw-500" onClick={handleShowModal}>
                      Search or Add new teacher coordinator
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
              <span className="fs-6 fw-semibold color-purple ">
                <span className="me-2">
                  <AssignmentTwoToneIcon style={{ fontSize: "25px" }} />
                </span>
                You can add up to 20 Coordinators at a time.
              </span>
            </div>
  
       {/* <============ Display added user ====================>  */}
            <div className="d-flex flex-column" >
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-4 fw-500">Teacher Coordinators</span>
                <div className="d-flex">
                  <img src="/images/OnBoarding/arrow-left.png" />
                  <img src="/images/OnBoarding/arrow-right.png" />
                </div>
              </div>
              <div style={{
                overflowX: 'hidden',
                height: '189px'
              }} className="thin-scroll">
                {
                  accountManagers.length === 0 ? <div className="text-center mt-4">
                    <span className="color-grey fs-19px fw-400">No Account Manager Selected</span>
                  </div> :
                    accountManagers?.map((c, index) => {
                     
                      return (
                        <>
                          <div className="d-flex justify-content-between align-items-center rounded mb-2 px-3" style={{background:"#F9F9F9"}}>
                            <span className="fs-5 fw-500">{c.name}</span>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <div className="p-2">
                              
                                  <Select
                                   className='background-purple rounded '
                                    styles={customStyles}
                                    options={coordinators}
                                    defaultValue={c.typeOfManager}
                                   
                                    getOptionLabel={
                                      (option) => {
                                        return (
                                          <>
                                            <div>
                                              <span className='color-purple'>{option.des}</span>
                                            </div>
                                          </>
                                        )
                                      }
                                    }
                                  />
                                </div>
                              </div>
                              <div onClick={() => handleRemove(index)} className="d-flex align-items-center justify-content-center cursor-pointer " style={{
                                background: '#FFD6D6',
                                width: '37px',
                                height: '37px',
                                borderRadius: '7px'
                              }}>
                                <span> <RemoveCircleTwoToneIcon color='error' /></span>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })
                }
              </div>
            </div>
       {/* <============ Display added user end ====================>  */}
  
            <div className="row">
              <ButtonGroup handleNext={handleNext} btnName="Save & Continue" btnPrev="Previous" stepCount={stepCount} handlePrev={handlePrev} />
            </div>
  
  
  
          </div>
        </div>
  
        {/*============= ADD Teacher Coordinator Modal Start ===============> */}
        <Modal show={showModal} onHide={hideModal} size="lg" centered>
          <Modal.Body>
  
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="mb-4">
                  <span className="fs-2 fw-600 color-black ">New Coordinator</span>
                </div>
                <div >
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Full Name</span>
                      <input type='text' value={formik.values.name} onChange={(e) => {
                        handleFormData('name', e.target.value)
                        formik.setFieldValue('name', e.target.value)
                      }} placeholder="Name here..." className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.name && formik.touched.name && <span className="text-danger">{formik.errors.name}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Designation</span>
                      <Select
                        styles={customStyles}
                        options={designations}
                        // value={selectedTypeOfSchool}
                        defaultValue={formik.values.designation}
  
                        onChange={(e) => {
                          handleFormData('designation', e.des)
                          formik.setFieldValue('designation', e.des)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />
                      {
                        formik.errors.designation && formik.touched.designation && <span className="text-danger">{formik.errors.designation}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Email ID</span>
                      <input value={formik.values.email} onChange={(e) => {
                        handleFormData('email', e.target.value)
                        formik.setFieldValue('email', e.target.value)
                      }} placeholder="abc@gmail.com" type='email' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.email && formik.touched.email && <span className="text-danger">{formik.errors.email}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Phone</span>
                      <input value={formik.values.phone} onChange={(e) => {
                        handleFormData('phone', e.target.value)
                        formik.setFieldValue('phone', e.target.value)
                      }} placeholder="98979***87" type='number' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.touched.phone && formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Types of Coordinator</span>
                      <Select
                        styles={customStyles}
                        options={coordinators}
                        defaultValue={formik.values.typeOfManager}
                        onChange={(selected) => {
                          handleFormData('typeOfManager', selected)
                          formik.setFieldValue('typeOfManager', selected)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />{
                        formik.touched.typeOfManager && formik.errors.typeOfManager && <span className="text-danger">{formik.errors.typeOfManager}</span>
                      }
  
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <div className="mb-4"></div>
                      <button style={{
                        width: '249px',
                        height: '50px'
                      }} type='submit' className="col-11 col-lg-5 text-center color-white fs-19px fw-500  background-purple-button rounded-4">
                        Add Coordinator
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/*============= ADD Teacher Coordinator Modal End===============> */}
  
      </>
  
    )
  
  }
const LastDateRegis = () => {
  
    const { stepCount, setStepCount } = useHackathonContext();
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
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
  
    const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Registration" />
  
        <div className='px-5'>
          <div className="mb-2">
            <span className="fs-32px fw-600" >Last date of registration of students  </span>
          </div>
          <div className="mb-50">
            <span className="fs-5 fw-500" style={{ color: "#979797" }}>
              You can change this date at any time
            </span>
          </div>
  
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8 mb-4">
              <DatePickerOwn />
              <ButtonGroup handleNext={handleNext} btnName="Save & Continue" btnPrev="Previous" stepCount={stepCount} handlePrev={handlePrev} />
            </div>
          </div>
        </div>
      </>
    );
  };
const LastDateEvent = () => {
    const { stepCount, setStepCount } = useHackathonContext();
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
    const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Registration" />
        <div className='mx-5'>
          <div className="mb-2">
            <span className="fs-32px fw-600">Date of the Proposed Event  </span>
          </div>
          <div className="mb-50">
            <span className="fs-20px fw-500" style={{ color: "#979797" }}>
              You can change this date at any time
            </span>
          </div>
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8 mb-4">
              <DatePickerOwn />
              <ButtonGroup handleNext={handleNext} btnName="Create Event" btnPrev="Previous" stepCount={stepCount} handlePrev={handlePrev} />
            </div>
          </div>
  
  
        </div>
      </>
    );
  };
  
const Congratulations = () => {
    const { stepCount, setStepCount } = useHackathonContext();
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Registration" />
        <div className="mt-4 py-4 px-5">
          <div className="d-flex mt-2 justify-content-center align-items-center">
            <div style={{ position: "relative" }}>
              <img
                src="/images/model-UN/prize.png"
                style={{ position: "absolute", top: 0, left: "82px" }}
              />
              <img src="/images/model-UN/piece-of-paper.png" />
            </div>
          </div>
  
          <div className="d-flex justify-content-center mb-4">
            <span className="fs-35px fw-600">Congratulations!</span>
          </div>
  
          <div className=" d-flex justify-content-center mb-4">
            <span className="fs-5 fw-500">
              Congratulations on completing your registration for <span className='fs-5 fw-700'>Yuvamanthan Youth Parliament!</span> We're thrilled that you've taken the initiative to organize this event. Here are a few impactful next steps you might consider (although you can also entrust these steps to your teacher coordinator if you prefer):
            </span>
          </div>
  
          <div className="d-flex justify-content-center">
            <div
              className="card px-2 dashed-border rounded-4 cursor-pointer text-center mb-4"
              style={{
                width: "535px",
                height: "63px",
              }}
            >
              <div onClick={() => handleNext()} className="card-body p-0 m-0 d-flex justify-content-center align-items-center">
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
                      Search or Add new coordinator
                    </span>
                  </div>
  
                </div>
  
              </div>
  
  
            </div>
  
          </div>
          <div className='text-center'>
            <button className="btn-onboard-fill">
              Go To Event
            </button>
          </div>
  
        </div>
      </>
    );
  };
const AppointStudentCoordinator = () => {
    const { stepCount, setStepCount } = useHackathonContext();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({})
    const [accountManagers, setAccountManagers] = useState([])
  
  
    const handleFormData = (name, value) => {
      setFormData({ ...formData, [name]: value, })
    }
   // <=======Validation schema for AppointStudentCoordinator ======> 
    const validation = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email().required('Required'),
      phone: Yup.string().required('Phone Number is Required')
        .matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
    })
  // <=========== Handle Add  function ===========>
    const handleAddManager = () => {
      setAccountManagers([...accountManagers, formData]);
      setFormData([])
      setShowModal(false)
    }
  // <=========== Handle Remove function ===========>
    const handleRemoveManager = (i) => {
      const updatedManagers = accountManagers.filter((_, index) => index !== i);
      setAccountManagers(updatedManagers);
    };
  //  <=========== Formik initial value =========== >
    const initialValues = {
      name: '',
      designation: '',
      email: '',
      phone: '',
      typeOfManager: '',
    }
  // <=========== Handle open modal ===============>
    const handleShowModal = () => {
      setShowModal(true);
    }
  // <=========== Handle Close modal ===============>
    const hideModal = () => {
      setShowModal(false)
  
    }
  
    const customStyles = {
      control: (provided) => ({
        ...provided,
        padding: '3px',
        border: 'none',
        background: '#eeeeee4d',
        // boxShadow:'none'
      }),
  
    };
  // <==============Handle onSubmit function Modal form =========>> 
    const onSubmit = () => {
      handleAddManager()
      // handleFormData()
      formik.resetForm()
    }
  // <==============Handle formik for  Modal form =========>> 
    const formik = useFormik({
      initialValues,
      validationSchema: validation,
      onSubmit
    })
  // <=============Handle Next Step ============>
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
  // <=============Handle Previous Step ============>
    const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
  
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Team" />
        <div className="px-5">
          <div className="col-12 col-md-8 col-lg-8 ">
            <div className="mb-2">
              <span className=" fs-2 fw-semibold">Appoint a Student Coordinators</span>
            </div>
            <div className="mb-50">
              <span className="color-grey fs-15px fw-500">
                They will form the core team of the Secretariat. The Secretariat is responsible for helping the Teacher Coordinator/s in the organisation and logistics of various activities.
              </span>
            </div>
  
            <div className="card px-2 dashed-border rounded-4 cursor-pointer mb-4" onClick={handleShowModal}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <span>
                    <AddCircleIcon color="success" style={{ fontSize: "35px" }} />
                    </span>
                  </div>
                  <div className="ms-2">
                    <span className="fs-5 fw-500" >
                      Search or Add Secretariat Member
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
              <span className="fs-6 fw-semibold color-purple ">
                <span className="me-2">
                <AssignmentTwoToneIcon style={{ fontSize: "25px" }} />
                </span>
                You may appoint up to 6 student coordinators who will help organise the event.
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
              <div>
                {accountManagers.length === 0 ? <div className="text-center mt-4">
                  <span className="color-grey fs-19px fw-400">No Account Manager Selected</span>
                </div> :
                  accountManagers?.map((c, index) => {
                    return (
                      <>
                        <div className="d-flex justify-content-between align-items-center mb-3 p-2" style={{ background: "#F9F9F9" }}>
                          <span className="fs-5 fw-500">{c.name}</span>
                          <div className="d-flex align-items-center">
                            <div className="me-3 cursor-pointer">
                              <div className="p-2" >
                                <span className="color-purple fs-17px fw-semibold text-center" style={{
                                  width: "170px !important",
                                  padding: "7px 12px",
                                  borderRadius: "8px",
                                  border: "none",
                                  background: "#F1EBFF",
                                  textAlign: "center",
                                  height: "37px",
                                }}>
                                  {c.typeOfManager}
                                </span>
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-center justify-content-center cursor-pointer "
                              style={{
                                background: "#FFD6D6",
                                width: "37px",
                                height: "37px",
                                borderRadius: "7px",
                              }}
                              onClick={() => handleRemoveManager(index)}
                            >
                              <RemoveCircleTwoToneIcon color='error' />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <ButtonGroup handleNext={handleNext} btnName="Save & Continue" btnPrev="Previous" stepCount={stepCount} handlePrev={handlePrev} />
  
          </div>
        </div>
        {/*============= ADD Teacher Coordinator Modal Start ===============> */}
        <Modal show={showModal} onHide={hideModal} size="lg" centered>
          <Modal.Body>
  
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="mb-4">
                  <span className="fs-2 fw-600 color-black ">New Coordinator</span>
                </div>
                <div >
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Full Name</span>
                      <input type='text' value={formik.values.name} onChange={(e) => {
                        handleFormData('name', e.target.value)
                        formik.setFieldValue('name', e.target.value)
                      }} placeholder="Name here..." className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.name && formik.touched.name && <span className="text-danger">{formik.errors.name}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Designation</span>
                      <Select
                        styles={customStyles}
                        options={designations}
                        // value={selectedTypeOfSchool}
                        defaultValue={formik.values.designation}
  
                        onChange={(e) => {
                          handleFormData('designation', e.des)
                          formik.setFieldValue('designation', e.des)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />
                      {
                        formik.errors.designation && formik.touched.designation && <span className="text-danger">{formik.errors.designation}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Email ID</span>
                      <input value={formik.values.email} onChange={(e) => {
                        handleFormData('email', e.target.value)
                        formik.setFieldValue('email', e.target.value)
                      }} placeholder="abc@gmail.com" type='email' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.email && formik.touched.email && <span className="text-danger">{formik.errors.email}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Phone</span>
                      <input value={formik.values.phone} onChange={(e) => {
                        handleFormData('phone', e.target.value)
                        formik.setFieldValue('phone', e.target.value)
                      }} placeholder="763******32" type='number' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.touched.phone && formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Types of Coordinator</span>
                      <Select
                        styles={customStyles}
                        options={coordinators}
                        defaultValue={formik.values.typeOfManager}
                        onChange={(selected) => {
                          handleFormData('typeOfManager', selected.des)
                          formik.setFieldValue('typeOfManager', selected.des)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />{
                        formik.touched.typeOfManager && formik.errors.typeOfManager && <span className="text-danger">{formik.errors.typeOfManager}</span>
                      }
  
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <div className="mb-4"></div>
                      <button style={{
                        width: '249px',
                        height: '50px'
                      }} type='submit' className="col-11 col-lg-5 text-center color-white fs-19px fw-500  background-purple-button rounded-4">
                        Add Coordinator
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/*============= ADD Teacher Coordinator Modal End===============> */}
  
      </>
    );
  };
const AppointStudentMediaTeam = () => {
    const { stepCount, setStepCount } = useHackathonContext();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({})
    const [accountManagers, setAccountManagers] = useState([])
  
  
    const handleFormData = (name, value) => {
      setFormData({ ...formData, [name]: value, })
    }
  
   // <=======Validation schema for  AppointStudentMediaTeam ======> 
    const validation = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email().required('Required'),
      phone: Yup.number().required('Required'),
    
    })
  // <=========== Handle Add  function ===========>
   
    const handleAddManager = () => {
      setAccountManagers([...accountManagers, formData]);
      setFormData([])
      setShowModal(false)
    }
  // <=========== Handle Remove function ===========>
  
    const handleRemove = (i) => {
      const updatedManagers = accountManagers.filter((_, index) => index !== i);
      setAccountManagers(updatedManagers);
    };
  //  <=========== Formik initial value =========== >
    const initialValues = {
      name: '',
      designation: '',
      email: '',
      phone: '',
      typeOfManager: '',
      typeOfJournalist: {}
    }
  
  // <=========== Handle open modal ===============>
    const handleShowModal = () => {
      setShowModal(true);
    }
  // <=========== Handle Close modal ===============>
    const hideModal = () => {
      setShowModal(false)
  
    }
  
    const customStyles = {
      control: (provided) => ({
        ...provided,
        padding: '3px',
        border: 'none',
        background: '#eeeeee4d',
        // boxShadow:'none'
      }),
  
    };
  // <==============Handle onSubmit function Modal form =========>> 
    const onSubmit = () => {
      handleAddManager()
      // handleFormData()
      formik.resetForm()
    }
  
  // <==============Handle formik for  Modal form =========>> 
    const formik = useFormik({
      initialValues,
      validationSchema: validation,
      onSubmit
    })
  // <=============Handle Next Step ============>
  
    const handleNext = () => {
      setStepCount(stepCount + 1);
    };
  // <=============Handle Previous Step ============>
   const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
  
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Team" />
        <div className="px-5">
          <div className="col-12 col-md-8 col-lg-8 ">
            <div className="mb-2">
              <span className=" fs-2 fw-semibold">Appoint a Student Media Team</span>
            </div>
            <div className="mb-50">
              <span className="color-grey fs-15px fw-500">
                They will be required to click photos/videos, write the content for promotional activities and draw the summary of the event. They will act as Photographers, Reporters and Caricaturists.ties.
              </span>
            </div>
  
            <div className="card px-2 dashed-border rounded-4 cursor-pointer mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center"  onClick={handleShowModal}>
                  <div className="me-2">
                    <span>
                    <AddCircleIcon color="success" style={{ fontSize: "35px" }} />
                    </span>
                  </div>
                  <div className="ms-2">
                    <span className="fs-5 fw-500">
                      Search or Add Student Journalist
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
              <span className="fs-6 fw-semibold color-purple ">
                <span className="me-2">
                <AssignmentTwoToneIcon style={{ fontSize: "25px" }} />
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
              <div>
                {accountManagers.length === 0 ? <div className="text-center mt-4">
                  <span className="color-grey fs-19px fw-400">No Account Manager Selected</span>
                </div> :
                  accountManagers?.map((c, index) => {
                    return (
                      <>
                        <div className="d-flex justify-content-between align-items-center mb-3 px-3" style={{background:"#F9F9F9"}}>
                          <span className="fs-5 fw-500">{c.name}</span>
                          <div className="d-flex align-items-center">
                            <div className="me-3 cursor-pointer">
                              <div className="p-2" >
                              
                                <Select
                                   className='background-purple rounded '
                                    styles={customStyles}
                                    options={coordinators}
                                    defaultValue={c.typeofJournalist}
                                   
                                    getOptionLabel={
                                      (option) => {
                                        return (
                                          <>
                                            <div>
                                              <span className='color-purple'>{option.des}</span>
                                            </div>
                                          </>
                                        )
                                      }
                                    }
                                  />
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-center justify-content-center cursor-pointer "
                              style={{
                                background: "#FFD6D6",
                                width: "37px",
                                height: "37px",
                                borderRadius: "7px",
                              }}
                              onClick={() => handleRemove(index)}
                            >
                             <RemoveCircleTwoToneIcon color='error' />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <ButtonGroup handleNext={handleNext} btnName="Save & Continue" btnPrev="Previous" stepCount={stepCount} handlePrev={handlePrev} />
  
          </div>
        </div>
        {/*============= ADD Teacher Coordinator Modal Start ===============> */}
        <Modal show={showModal} onHide={hideModal} size="lg" centered>
          <Modal.Body>
  
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="mb-4">
                  <span className="fs-2 fw-600 color-black ">New Coordinator</span>
                </div>
                <div >
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Full Name</span>
                      <input type='text' value={formik.values.name} onChange={(e) => {
                        handleFormData('name', e.target.value)
                        formik.setFieldValue('name', e.target.value)
                      }} placeholder="Name here..." className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.name && formik.touched.name && <span className="text-danger">{formik.errors.name}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Designation</span>
                      <Select
                        styles={customStyles}
                        options={designations}
                        // value={selectedTypeOfSchool}
                        defaultValue={formik.values.designation}
  
                        onChange={(e) => {
                          handleFormData('designation', e.des)
                          formik.setFieldValue('designation', e.des)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />
                      {
                        formik.errors.designation && formik.touched.designation && <span className="text-danger">{formik.errors.designation}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Email ID</span>
                      <input value={formik.values.email} onChange={(e) => {
                        handleFormData('email', e.target.value)
                        formik.setFieldValue('email', e.target.value)
                      }} placeholder="abc@abc.com" type='email' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.errors.email && formik.touched.email && <span className="text-danger">{formik.errors.email}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Phone</span>
                      <input value={formik.values.phone} onChange={(e) => {
                        handleFormData('phone', e.target.value)
                        formik.setFieldValue('phone', e.target.value)
                      }} placeholder="99******99" type='number' className="form-control border-0 box-shadow-0 background-grey" />
                      {
                        formik.touched.phone && formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>
                      }
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Types of Coordinator</span>
                      <Select
                        styles={customStyles}
                        options={coordinators}
                        defaultValue={formik.values.typeOfManager}
                        onChange={(selected) => {
                          handleFormData('typeOfManager', selected.des)
                          formik.setFieldValue('typeOfManager', selected.des)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />{
                        formik.touched.typeOfManager && formik.errors.typeOfManager && <span className="text-danger">{formik.errors.typeOfManager}</span>
                      }
  
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <span className="fs-19px fw-500 color-black">Types of Journalist</span>
                      <Select
                        styles={customStyles}
                        options={JournalistType}
                        defaultValue={formik.values.typeofJournalist}
                        onChange={(selected) => {
                          handleFormData('typeofJournalist', selected)
                          formik.setFieldValue('typeofJournalist', selected)
                        }}
                        getOptionLabel={
                          (option) => {
                            return (
                              <>
                                <div>
                                  <span>{option.des}</span>
                                </div>
                              </>
                            )
                          }
                        }
                      />
  
                      {
                        formik.touched.typeOfJournalist && formik.errors.typeOfJournalist && <span className="text-danger">{formik.errors.typeOfJournalist}</span>
                      }
  
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                      <div className="mb-4"></div>
                      <button style={{
                        width: '249px',
                        height: '50px'
                      }} type='submit' className="col-11 col-lg-5 text-center color-white fs-19px fw-500  background-purple-button rounded-4">
                        Add Coordinator
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/*============= ADD Teacher Coordinator Modal End===============> */}
  
      </>
    );
  };
const ChooseEventTheme = () => {
    const { stepCount, setStepCount } = useHackathonContext();
    const customStyles = {
      control: (provided) => ({
        ...provided,
        padding: '3px',
        border: 'none',
        background: '#eeeeee4d',
        // boxShadow:'none'
      }),
  
    };
    const handlePrev = () => {
      setStepCount(stepCount - 1);
    };
    return (
      <>
        <YmBreadCrumbs start='Events' middle="Yuvamanthan Hackathon" end="Theme" />
        <div className="px-5">
          <div className="col-12 col-md-8 col-lg-8 ">
            <div className="mb-2">
              <span className="fs-32px fw-600">Choose a Event Theme</span>
            </div>
            <div className="mb-50">
              <span className="fs-5 fw-500" style={{ color: "#979797" }}>
                Choose a theme for the event that you want to organise.
              </span>
            </div>
  
            <div className='mb-5'>
              <span className="fs-19px fw-500 mb-2 d-block">Select a event theme</span>
              <div>
                <Select
                  styles={customStyles}
                  options={designations}
                  defaultValue={designations[0]}
                  getOptionLabel={(option) => {
                    return (
                      <>
                        <div className="">
                          <span className=" fs-19px fw-500 text-center">
                            {option.des}
                          </span>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <ButtonGroup btnName="Submit" btnPrev='Previous' stepCount={stepCount} handlePrev={handlePrev} />
          </div>
  
        </div>
      </>
    );
  };
  
  const designations = [
    {
      value: 1,
      des: 'Teacher',
    },
    {
      value: 2,
      des: 'Student',
    },
    {
      value: 3,
      des: 'Manager',
    },
  ]
  const coordinators = [
    {
      value: 1,
      des: 'Moderator',
    },
    {
      value: 2,
      des: 'Admin',
    },
    {
      value: 3,
      des: 'Manager',
    },
  ]
  const JournalistType = [
    {
      value: 1,
      des: 'Reporter',
    },
    {
      value: 2,
      des: 'Photographer',
    },
  
  ]