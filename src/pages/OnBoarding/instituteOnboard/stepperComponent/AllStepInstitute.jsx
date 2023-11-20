import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import Select from 'react-select';
import BackupIcon from "@mui/icons-material/Backup";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from "react-bootstrap";
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { FormatLineSpacing } from "@mui/icons-material";
import { toast } from "react-toastify";
import { apiAuth, apiJson } from "api";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { useGlobalContext } from "global/context";
import { useLocation, useNavigate } from "react-router-dom";
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import DuplicateAccount from "../DuplicateInstitute/DuplicateAccount";


export const AllStepInstitute = () => {
    const navigate = useNavigate()
    const {userData, setToken, setUser,token} = useGlobalContext()
    const [underReviewStatus, setUnderReviewStatus] = useState(false)


    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        handleNextModalStep,
        modalStep,
        setModalStep,
    } = useContext(OnBoardContext);

    // activeStep === 5 && activeChildStep === 0

    useEffect(()=>{
        if(token && userData.role=='institute' && userData.onBoardStatus===true && userData.reviewStatus===false){
            setActiveStep(5)
            setActiveChildStep(0)
        }
    },[userData])
    useEffect(()=>{
        if(token && userData.role=='institute' && userData.onBoardStatus===true && userData.reviewStatus===false){
            setActiveStep(5)
            setActiveChildStep(0)
        }
    },[])

  
    const createInstituteAfterReview = ()=>{
        // apiJson.post('v2/register/createInstituteAfterReview', {email:userData.email})
        // .then((res)=>{
        //     setUser(res.data.user)
        //     setToken(res.data.token)
        // })
        // .then(()=>{
        //     navigate("/dashboard")
        // })
        // .catch((error)=>{
        //     console.log(error.message)
        // })
    }

    const checkUnderReviewStatus = ()=>{
        apiJson.get('v2/register/checkUnderReviewStatus/email/'+userData.email)
        .then((res)=>{
            setUnderReviewStatus(res.data.result)
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    const checkUnderReviewStatusUser = ()=>{
        apiJson.get('v2/register/checkUnderReviewStatus/email/'+userData?.email+'/role/'+userData?.role)
        .then((res)=>{
            setUnderReviewStatus(res.data.result)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        // correct here later add under Review status in UserData
        if(token  && userData.onBoardStatus===true && userData.reviewStatus===false){
            if( userData.role=='institute'){
                let checkInterval = setInterval(()=>{
                    if(underReviewStatus){
                        clearInterval(checkInterval)
                    }
                    else{
                        checkUnderReviewStatus()
                    }
                },5000);
                return ()=>{
                    clearInterval(checkInterval)
                }
            }
            if(userData?.role==='teacher' || userData?.role==='student'){
                console.log('hi=>>')
                let checkInterval = setInterval(()=>{
                    if(underReviewStatus){
                        clearInterval(checkInterval)
                    }
                    else{
                        checkUnderReviewStatusUser()
                    }
                },5000);
                return ()=>{
                    clearInterval(checkInterval)
                }
            }
           
        }
    },[userData])


    useEffect(()=>{
        if(underReviewStatus){
            // createInstituteAfterReview()
        setUser({...userData, reviewStatus:true})
        navigate('/new-dashboard')

        }
    },[underReviewStatus])



    const renderStep = () => {
        switch (true) {
            case activeStep === 0 && activeChildStep === 0:
                return (
                    <div>
                        <Institution />
                    </div>
                );
            case activeStep === 0 && activeChildStep === 1:
                return (
                    <div>
                        <AboutInstitute />
                    </div>
                );
            case activeStep === 0 && activeChildStep === 2:
                return (
                    <div>
                        <RegisteredAddress />
                    </div>
                );
            case activeStep === 0 && activeChildStep === 3:
                return (
                    <div>
                        <Appearance />
                    </div>
                );
            case activeStep === 0 && activeChildStep === 4:
                return (
                    <div>
                        <SocialPresence />
                    </div>
                );

            case activeStep === 0 && activeChildStep === 5:
                return (
                    <div>
                        <Documents />
                    </div>
                );

            case activeStep === 1 && activeChildStep === 0:
                return (
                    <div>
                        <AboutYou />
                    </div>
                );

            case activeStep === 1 && activeChildStep === 1:
                return (
                    <div>
                        <Mailing />
                    </div>
                );

            case activeStep === 2 && activeChildStep === 0:
                return (
                    <div>
                        <AddCooordinators />
                    </div>
                );

            case activeStep === 3 && activeChildStep === 0:
                return (
                    <div>
                        <Preferences />
                    </div>
                );
            case activeStep === 3 && activeChildStep === 1:
                return (
                    <div>
                        <CreatePassword />
                    </div>
                );
            case activeStep === 4 && activeChildStep === 0:
                return (
                    <div>
                        <Done />
                    </div>
                );
            case activeStep === 5 && activeChildStep === 0:
                return (
                    <div>
                        <UnderReview />
                    </div>
                )

            default:
                return null;
        }
    };

    return (
        <>
            <div
                className="d-flex flex-column justify-content-between"
            >
                <div>{renderStep()}</div>
            </div>
        </>
    );
};

const customStyles = {
    control: (provided) => ({
        ...provided,
        padding: '3px',
        border: 'none',
        background: '#eeeeee4d',
        // boxShadow:'none'
    }),

};
const customStylesPurple = {
    control: (provided) => ({
        ...provided,
        width: '170px',
        padding: '',
        border: 'none',
        background: '#F1EBFF',
        textAlign: 'center',
        height: '37px'
        // boxShadow:'none'
    }),

};
const customStylesNumber = {
    control: (provided) => ({
        ...provided,
        padding: '5px 0  ',
        border: 'none',
        background: '#F1EBFF',
        color: '#4A00E8',
        width: '100&',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'none',
        borderRadius: '10px'
    }),

};

const Institution = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        selectedDesignation,
        setSelectedDesignation,
        instituteFormik,dropdownType, setdropdownType,
        setInstituteData,
    } = useContext(OnBoardContext);



    const [instituteDetail, setInstituteDetail] = useState();




    const validation = Yup.object({
        typeOfInstitute: Yup.string().required('Please Select Institute'),
        selectedTypeOfInstitute: Yup.string().when('typeOfInstitute', {
            is: 'College',
            then: Yup.string().required('Please Select One College'),
        }).when('typeOfInstitute', {
            is: 'School',
            then: Yup.string().required('Please Select One School'),
        }).when('typeOfInstitute', {
            is: 'University',
            then: Yup.string().required('Please Select One University'),
        }),


        board: Yup.string().when('typeOfInstitute', {
            is: 'School',
            then: Yup.string().required('Please select Board'),
        }),
        medium: Yup.string().when('typeOfInstitute', {
            is: 'Coaching Institute',
            then: Yup.string(),
            otherwise: Yup.string().required('Please Select Medium')
        }),
        otherCollege: Yup.string().when('selectedTypeOfInstitute', {
            is: 'Other (Please specify)',
            then: Yup.string().required(`Please select `)
        })
    })
    const initialValues = {
        typeOfInstitute:instituteFormik.values.type_of_inst|| '',
        selectedTypeOfInstitute: instituteFormik.values.type_of_college|| '',
        udise: instituteFormik.values.udise_code|| '',
        board: instituteFormik.values.education_board|| '',
        medium: instituteFormik.values.medium_of_education|| '',
        otherCollege: instituteFormik.values.type_of_inst|| '',
    }
    const onSubmit = () => {
        copyValues()
        handleNextChild()
    }
 
   

    function copyValues() {
        const fieldMappings = {
            typeOfInstitute: 'type_of_inst',
            selectedTypeOfInstitute: 'type_of_college',
            udise: 'udise_code',
            board: 'education_board',
            medium: 'medium_of_education',
          };
        const updatedValues = { ...instituteFormik.values };
      
        for (const formikKey in fieldMappings) {
          const instituteFormikKey = fieldMappings[formikKey];
          updatedValues[instituteFormikKey] = formik.values[formikKey];
        }
      
        instituteFormik.setValues(updatedValues);
      }



    const handleFormData = (name, value) => {
        setInstituteDetail({
            ...instituteDetail,
            [name]: value,
        })
    }
    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })


    useEffect(() => {
        if (formik.values.typeOfInstitute) {
            if (formik.values.typeOfInstitute === 'School') {
                setdropdownType(typeOfSelectedInstitute);
            } else if (formik.values.typeOfInstitute === 'College') {
                setdropdownType(collegeTypes);
            } else if (formik.values.typeOfInstitute === 'University') {
                setdropdownType(universityTypes);
            } else {
                setdropdownType([]);
            }
        }
    }, [formik.values.typeOfInstitute]);
    return (
        <>
            <div>
                <div className="mb-2">
                    <span className=" fs-2 fw-semibold">Institute Details</span>
                </div>

                <div className="mb-50">
                    <span
                        className=""
                        style={{
                            color: "grey",
                            fontSize: "17px",
                            fontWeight: "500",
                        }}
                    >
                        Details about your institute and  academics
                    </span>
                </div>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <div className='mb-2'>
                            <span className='fs-19px fw-500'>Type of Institute</span>
                        </div>
                        <div className="mb-4 col-6">
                            <Select
                                styles={customStyles}
                                options={typeOfSchool}
                                // value={selectedTypeOfSchool}
                                    defaultValue = {typeOfSchool.find((i)=>i.name===formik.values.typeOfInstitute)}
                                onChange={(selected) => {
                                    setSelectedDesignation(selected.name)
                                    handleFormData('typeOfInstitute', selected.name)
                                    formik.setFieldValue('typeOfInstitute', selected.name)
                                }}
                                getOptionLabel={
                                    (option) => {
                                        return (
                                            <>
                                                <div>
                                                    <span>{option.name}</span>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                            />
                            {
                                formik.touched.typeOfInstitute && formik.errors.typeOfInstitute &&
                                <span className="text-danger">
                                    {formik.errors.typeOfInstitute}
                                </span>
                            }

                        </div>

                        {formik.values.typeOfInstitute && <div className="p-2 rounded-4 background-purple border-purple mb-4">
                            <span className="me-1 "><img src="./images/onBoarding/note.png" /> </span>
                            <span className="color-purple">  Only for {formik.values.typeOfInstitute} who are operational under Indian boards</span>
                        </div>}

                        {formik.values.typeOfInstitute && formik.values.typeOfInstitute !== 'Coaching Institute' &&
                            <div className="row mb-2">
                                <div class=" mb-4 col-12 col-lg-6">
                                    <span className="fs-19px fw-500 mb-2 d-block">Type of {formik.values.typeOfInstitute}</span>
                                    <div className="">
                                        <Select
                                            styles={customStyles}
                                            options={dropdownType}
                                    defaultValue = {dropdownType.find((i)=>i.name===formik.values.selectedTypeOfInstitute)}

                                            onChange={(selected) => {
                                                handleFormData('innerType', selected.name)
                                                formik.setFieldValue('selectedTypeOfInstitute', selected.name)
                                            }}
                                            getOptionLabel={
                                                (option) => {
                                                    return (
                                                        <>
                                                            <div className="mb-2 d-flex z-index-1">
                                                                <span>{option.name}</span>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            }
                                        />
                                        {
                                            formik.touched.selectedTypeOfInstitute && formik.errors.selectedTypeOfInstitute &&
                                            <span className="text-danger">
                                                {formik.errors.selectedTypeOfInstitute}
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    formik.values.selectedTypeOfInstitute === 'Other (Please specify)' &&
                                    <div className="mb-4 col-12 col-lg-6">
                                        <span className="fs-19px fw-500 mb-2 d-block">Please Specify</span>
                                        <input placeholder="Please Specify" className="box-shadow-0 border-0 background-grey form-control" type="text" onChange={(e) => {
                                            handleFormData('innerType', e.target.value)
                                            formik.setFieldValue('otherCollege', e.target.value)
                                        }} />
                                        {
                                            formik.touched.otherCollege && formik.errors.otherCollege &&
                                            <span className="text-danger">
                                                {formik.errors.otherCollege}
                                            </span>
                                        }
                                    </div>
                                }

                                {formik.values.typeOfInstitute === 'School' &&
                                    <div class="mb-4 col-12 col-lg-6">
                                        <span className="fs-19px fw-500 mb-2 d-block">UDISE Code (optional)</span>
                                        <input
                                            className="box-shadow-0 border-0 background-grey form-control rounded-3"
                                            type="text"
                                            value={formik.values.udise}
                                            onChange={(e) => {
                                                handleFormData('code', e.target.value)
                                                formik.setFieldValue('udise', e.target.value)
                                            }}

                                            placeholder="Enter code here"
                                        />
                                        {
                                            formik.touched.udise && formik.errors.udise &&
                                            <span className="text-danger">
                                                {formik.errors.udise}
                                            </span>
                                        }
                                    </div>
                                }

                                {formik.values.typeOfInstitute === 'School' &&
                                    <div class="mb-4 col-12 col-lg-6">
                                        <span className="fs-19px fw-500 mb-2">Board</span>
                                        <div className="thin-scroll">
                                            <Select
                                                options={selectBoard}
                                                styles={customStyles}
                                    defaultValue = {selectBoard.find((i)=>i.name===formik.values.board)}

                                                onChange={(selected) => {
                                                    handleFormData('board', selected.name)
                                                    formik.setFieldValue('board', selected.name)
                                                }}
                                                getOptionLabel={
                                                    (option) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <span>{option.name}</span>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                }
                                            />
                                            {
                                                formik.touched.board && formik.errors.board &&
                                                <span className="text-danger">
                                                    {formik.errors.board}
                                                </span>
                                            }
                                        </div>
                                    </div>}
                                {formik.values.typeOfInstitute && <div class="mb-4 col-12 col-lg-6">
                                    <span className="onboard-form-span mb-2 d-block">Medium of Education</span>
                                    <div className="">
                                        <Select
                                            styles={customStyles}
                                            options={languages}
                                    defaultValue = {languages.find((i)=>i.name===formik.values.medium)}

                                            onChange={(selected) => {
                                                handleFormData('mediumOfEducation', selected.name)
                                                formik.setFieldValue('medium', selected.name)
                                            }}
                                            getOptionLabel={

                                                (option) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                <span>{option.name}</span>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            }
                                        />
                                        {
                                            formik.touched.medium && formik.errors.medium && <>
                                                <span className="text-danger">{formik.errors.medium}</span>
                                            </>
                                        }

                                    </div>
                                </div>}
                            </div>}
                    </div>
                    <div className="d-flex justify-content-between  mt-4">
                        {<button className="btn-onboard-disabled disabled">Previous</button>}

                        <button type="submit" onClick={() => {

                        }} className="btn-onboard-fill">

                            <span >Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};


const AboutInstitute = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        modalStep,
        setModalStep,
        handleNextModalStep,
        handleHideDuplicateWarning,
        handleShowDuplicateWarning,
        showDuplicateWarning,
        setShowDuplicateWarning,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);
    // const [isDuplicate,setIsDuplicate]= useState(true)
    const [duplicateIns,setDuplicateIns] = useState([]);
    const [instId,setInstId] = useState('')
    const [popupclass, setPopupclass] = useState(false);
    const [display, setdisplay] = useState(false)
    function displaynoneContent(id){
       setInstId(id);
      setdisplay("d-none")
    }
    const renderStepModal = () => {
        switch (true) {
            case modalStep === 0:
                return (
                    <div>
                        {/* <DuplicateWarning /> */}
                    </div>
                );

            case modalStep === 1:
                return (
                    <div>
                        {/* <DuplicateAccount /> */}
                    </div>
                );
            default:
                return null
        }
    }


    const validation = Yup.object({
        name: Yup.string().required('Write Insitute Name'),
        description: Yup.string().required('Write Description'),
    })
    const initialValues = {
        name: instituteFormik.values.institution_name|| '',
        description: instituteFormik.values.bio||'',

    }
    function copyValues() {
        const fieldMappings = {
            name: 'institution_name',
            description: 'bio',
          };
        const updatedValues = { ...instituteFormik.values };
      
        for (const formikKey in fieldMappings) {
          const instituteFormikKey = fieldMappings[formikKey];
          updatedValues[instituteFormikKey] = formik.values[formikKey];
        }
      
        instituteFormik.setValues(updatedValues);
      }
    const onSubmit = () => {
        copyValues()
        // handleShowDuplicateWarning()
        if(DuplicateInsDetail.some((i)=>i?.institute_name.includes(formik.values.name))){
           let duplicates = DuplicateInsDetail.filter((i)=>i?.institute_name.includes(formik.values.name))
           setDuplicateIns(duplicates);
            setPopupclass(true)
        }else{
            handleNextChild()
        }

    }
    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })
    const handleOutPop =() =>{

        setPopupclass(false)
        handleNextChild()
      }
   
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>

                    <div className="mb-2">
                        <span className=" fs-35px fw-600">About Institute</span>
                    </div>
                    <div className="mb-50">
                        <span
                            className="fs-19px fw-500 color-grey"

                        >
                            Tell us about your institute
                        </span>
                    </div>




                    <div className="mb-4">
                        <div className="d-flex">
                            <span className="fs-19px fw-500 mb-2 d-block">Name of the Institute</span><span className="ms-2"><img src="./images/onBoarding/question-mark.png" /></span>
                        </div>
                        <input value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)} placeholder="XYZ Institute" className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='text' />
                        {
                            formik.touched.name && formik.errors.name &&
                            <span className="text-danger">
                                {formik.errors.name}
                            </span>
                        }
                    </div>



                    <div className="background-purple border-purple rounded px-2 py-2 mb-50">
                        <span className="me-2"><img src="./images/onBoarding/note.png" /></span><span className="fs-15px fw-500 color-purple "> Institute name should match with valid proof of incorporation</span>
                    </div>


                    <div>
                        <span className="fw-500 fs-5 mb-2 d-block">Write a bit about your institute</span>
                        <div>
                            <textarea value={formik.values.description} onChange={(e) => formik.setFieldValue('description', e.target.value)} placeholder="e.g. XYZ University is a leading institution dedicated to fostering academic excellence and holistic growth for students" className={`form-control background-grey resize-none box-shadow-0 rounded-3  thin-scroll  ${(formik.touched.description && formik.errors.description) ? 'border-1 border-danger' : 'border-0'
                                }`} />
                            {
                                formik.touched.description && formik.errors.description &&
                                <span className="text-danger">
                                    {formik.errors.description}
                                </span>
                            }
                        </div>
                    </div>



                    <div className="d-flex justify-content-between  mt-4">
                        <button onClick={handleBack} className="btn-onboard">
                            Previous
                        </button>
                        <button type="submit" className="btn-onboard-fill">
                            <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                        </button>
                    </div>


                </div>
            </form>
            {/* Duplicate Institute modal start */}
            
    {/* ==============================popup============================== */}
  {popupclass && (

            <div className={`${popupclass ? 'popup' : 'popnone'}`}>

                <div className={`popedelement discussionBoardScroll ${popupclass ? 'toppopup' : 'popnone'}`} >

                    <div className={`text-center ${display ? 'd-none' : 'inneritems'}`}>
                        <p>Duplicate account warning!</p>
                        <p>We have noticed that  similar Yuvamanthan institutional account/s already exist!</p>
                    </div>

                    <div className={`${display ? 'd-none' : 'innerContent'}`}>
                        <p className='matchFoundPara'>{duplicateIns?.length} Matches Found</p>
                        {duplicateIns?.map((item)=>(
                            <div className="row colleges p-0 py-3" key={item?.id}>

                                <div className="col-lg-3">
                                    <img src={item?.insLogo} />
                                </div>
                                <div className="col-lg-9 para collegeItems">
                                    <p className='d-flex justify-content-between pe-5'>{item?.institute_name} <span>{item?.no_of_student} Students</span></p>
                                    <p className='collegeparaFirst'>{item?.address}</p>
                                    <div className='d-flex justify-content-between pe-5'>
                                        <h6> Admin <span className='collegeItemsSpan'>: {item?.name}</span></h6>
                                        <h6> Designation <span className='collegeItemsSpan'>: {item?.designation}</span> </h6>
                                    </div>
                                    <a href="#" className='text-end d-block text-decoration-none text-capitalize pe-5 detailbtn mt-2' onClick={() =>displaynoneContent(item?.id)}>detail</a>
                                </div>

                            </div>
                        ))}
                        <button className='border-0 bg-transparent d-block m-auto text-center nonepara' onClick={handleOutPop}>None of the above</button>
                    </div>


                    <div className={`${display ? 'duplicateAccount' : 'd-none'}`}>
                        <DuplicateAccount popupclass={popupclass}  setPopupclass={setPopupclass}  DuplicateInsDetail={DuplicateInsDetail} instId={instId}   handleNextChild={handleNextChild}/>
                    </div>

                </div>
            </div>   
  )}

            <Modal show={showDuplicateWarning} onHide={handleHideDuplicateWarning} size="lg" className="rounded-4" centered>
                <Modal.Body className="rounded-4" >
                    <div className="p-3">
                        {renderStepModal()}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};



// const DuplicateWarning = () => {
//     const {
//         activeStep,
//         setActiveStep,
//         activeChildStep,
//         setActiveChildStep,
//         count,
//         setCount,
//         stepperArray,
//         handleNextChild,
//         handleBack,
//         modalStep,
//         setModalStep,
//         handleNextModalStep,
//         handleHideDuplicateWarning,
//         handleShowDuplicateWarning,
//         showDuplicateWarning,
//         setShowDuplicateWarning,
//     } = useContext(OnBoardContext);
//     return (
//         <>
//             <div>
//                 <div className="d-flex px-3 py-3  mb-3 flex-column rounded-4 justify-content-center align-items-center" style={{
//                     background: '#FFFDD9'
//                 }}>
//                     <span style={{
//                         color: '#675D00',
//                     }} className="fs-19px fw-600 mb-3 d-block">Duplicate Account Warning!</span>
//                     <span style={{ color: 'black' }} className="fw-400 fs-19px col-10 text-center ">We have noticed that similar Yuvamanthan institutional account/s already exist!</span>
//                 </div>
//                 <div className=" d-flex rounded-4 p-2 mb-3" style={{
//                     border: '3px solid #4200FF'
//                 }} >
//                     <div style={{
//                         height: '145px',
//                         width: '145px',
//                     }}>
//                         <img src="./images/onBoarding/university-2.png" />
//                     </div>
//                     <div className="ms-2">
//                         <div className="mb-2">
//                             <span style={{
//                                 color: '#2D008D'
//                             }} className="fw-600 fs-19px mb-1 d-block">
//                                 Administrative Management College
//                             </span>
//                             <span
//                                 style={{
//                                     color: '#636363'
//                                 }}
//                                 className="fs-15px fw-500 mb-2 d-block"
//                             >AMC Campus, Bannerghatta Main Rd, Bengaluru, Karnataka 560083</span>
//                         </div>
//                         <div className=" row mb-4">
//                             <div className="col-6">
//                                 <span style={{ color: 'black' }}>Admin:</span>
//                                 <span>Saurabh Sharma</span>
//                             </div>
//                             <div className="col-6">
//                                 <span style={{ color: 'black' }}>Designation:</span>
//                                 <span>Principal</span>
//                             </div>
//                         </div>
//                         <div className="d-flex justify-content-end">
//                             <span
//                                 style={{
//                                     color: '#6100FF'
//                                 }}
//                                 onClick={() => {
//                                     setModalStep(1)
//                                 }} className="cursor-pointer fw-600 fs-15px  d-block">Claim Ownership </span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                     <span className="me-3 cursor-pointer"><img src="./images/onBoarding/left-icon.png" /></span>
//                     <span className="me-3">1</span>
//                     <span className="me-3">2</span>
//                     <span className="me-3">3</span>
//                     <span className="cursor-pointer"><img src="./images/onBoarding/right-icon-2.png" /></span>
//                 </div>

//             </div>
//         </>
//     )
// }

// const DuplicateAccount = () => {
//     const {
//         activeStep,
//         setActiveStep,
//         activeChildStep,
//         setActiveChildStep,
//         count,
//         setCount,
//         stepperArray,
//         handleNextChild,
//         handleBack,
//         modalStep,
//         setModalStep,
//         handleNextModalStep,
//         handleHideDuplicateWarning,
//         handleShowDuplicateWarning,
//         showDuplicateWarning,
//         setShowDuplicateWarning,
//     } = useContext(OnBoardContext);
//     return (
//         <>
//             <div>
//                 <div className="d-flex px-3 py-3  mb-3 flex-column rounded-4 justify-content-center align-items-center" style={{
//                     background: '#FFFDD9'
//                 }}>
//                     <span style={{
//                         color: '#675D00',
//                     }} className="fs-19px fw-600 mb-3 d-block">Duplicate Account</span>
//                     <span style={{ color: 'black' }} className="fw-400 fs-19px col-10 text-center ">We have noticed that similar Yuvamanthan institutional account/s already exist!</span>
//                 </div>
//                 <div className="d-flex justify-content-end">
//                     <span
//                         style={{
//                             color: '#6100FF'
//                         }}
//                         onClick={() => {
//                             setShowDuplicateWarning(false)
//                             setModalStep(0);
//                             handleNextChild()
//                         }} className="cursor-pointer fw-600 fs-15px  d-block">Claim Ownership </span>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                     <span className="me-3 cursor-pointer"><img src="./images/onBoarding/left-icon.png" /></span>
//                     <span className="me-3">1</span>
//                     <span className="me-3">2</span>
//                     <span className="me-3">3</span>
//                     <span className="cursor-pointer"><img src="./images/onBoarding/right-icon-2.png" /></span>
//                 </div>

//             </div>
//         </>
//     )
// }

const RegisteredAddress = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        setInstituteAddress,
        instituteAddress,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);

    const validation = Yup.object({
        country: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        pinCode: Yup.number().required('Required'),
    })
    const initialValues = {
        country: instituteFormik.values.country||'',
        state: instituteFormik.values.state||'',
        street: instituteFormik.values.street||'',
        city: instituteFormik.values.city||'',
        pinCode: instituteFormik.values.pinCode||'',
    }
    const onSubmit = () => {
        copyValues()
        setInstituteAddress({...formik.values})
        
        handleNextChild()
    }
    function copyValues() {
        const fieldMappings = {
            country: 'country',
            state: 'state',
            street: 'street',   
            city: 'city',
            pinCode: 'pinCode',
          };
        const updatedValues = { ...instituteFormik.values };
      
        for (const formikKey in fieldMappings) {
          const instituteFormikKey = fieldMappings[formikKey];
          updatedValues[instituteFormikKey] = formik.values[formikKey];
        }
      
        instituteFormik.setValues(updatedValues);
      }

    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })

    return (
        <>
          <form onSubmit={formik.handleSubmit}>
          <div>
                <div className='mb-2'>
                    <span className=' fs-35px fw-600'>Institute Address</span>
                </div>

                <div className="mb-50">
                    <span
                        className="fs-17px fw-500 color-grey"

                    >
                        Enter the registered address of your institute
                    </span>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 mb-4">
                        <span className="fs-5 fw-500 mb-2 d-block">Country</span>
                        <input value={formik.values.country} onChange={(e)=>formik.setFieldValue('country', e.target.value)} placeholder="Enter Country..." className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='text' />
                        {
                            formik.touched.country && formik.errors.country && <span className="text-danger">{formik.errors.country}</span>
                        }
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                        <span className="fs-5 fw-500 mb-2 d-block">State</span>
                        <input value={formik.values.state} onChange={(e)=>formik.setFieldValue('state', e.target.value)} placeholder="Enter State... " className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='text' />
                        {
                            formik.touched.state && formik.errors.state && <span className="text-danger">{formik.errors.state}</span>
                        }
                    </div>
                    <div className="col-12 col-lg-12 mb-4">
                        <span className="fs-5 fw-500 mb-2 d-block">Street Address</span>
                        <input value={formik.values.street} onChange={(e)=>formik.setFieldValue('street', e.target.value)}  placeholder="Enter Street Address..." className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='text' />
                        {
                            formik.touched.street && formik.errors.street && <span className="text-danger">{formik.errors.street}</span>
                        }
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                        <span className="fs-5 fw-500 mb-2 d-block">City</span>
                        <input value={formik.values.city} onChange={(e)=>formik.setFieldValue('city', e.target.value)} placeholder="Enter City..." className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='text' />
                        {
                            formik.touched.city && formik.errors.city && <span className="text-danger">{formik.errors.city}</span>
                        }
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                        <span className="fs-5 fw-500 mb-2 d-block">Pin Code</span>
                        <input value={formik.values.pinCode} onChange={(e)=>formik.setFieldValue('pinCode', e.target.value)} placeholder="Enter Pin Code..." className="form-control rounded-3 border-0 box-shadow-0 background-grey" type='number' />
                        {
                            formik.touched.pinCode && formik.errors.pinCode && <span className="text-danger">{formik.errors.pinCode}</span>
                        }
                    </div>
                </div>


                <div className="background-purple border-puple rounded-3 px-2 py-2 mb-50">
                    <span className="me-2"><img className="" src="./images/onBoarding/note.png" /></span>
                    <span className="fs-15px  fw-500 color-purple ">
                        Institute address should match with valid proof of address</span>
                </div>

                <div className="d-flex justify-content-between  mt-4">
                    <button  onClick={handleBack} className="btn-onboard">
                        Previous
                    </button>
                    <button type="submit" className="btn-onboard-fill">
                        <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                    </button>
                </div>





            </div>
          </form>
        </>
    );
};

const Appearance = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);
    const [image, setImage] = useState('');
    const [imageLink, setimageLink] = useState('');
    const [imageLoading, setImageLoading]= useState(false)
    const [url, setUrl] = useState('');
const [isValid, setIsValid] = useState(true);

    const validationSchema = Yup.object().shape({
        image: Yup.mixed()
        .when('logo', {
            is: (logo) => !logo,
            then: Yup.mixed()
              .required('Image is required')
              .test('fileSize', 'Image file is too large', (value) => {
                return value && value.size <= 5000000; // 5 MB limit
              })
              .test('fileType', 'Unsupported image file type', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
              }),
          }),
      });
     const  onSubmit=()=>{
        if (url === '' || isValid) {
            handleNextChild();
          }
    }
      const formik = useFormik({
        initialValues:{logo:instituteFormik.values.logo||'', image:''},
        validationSchema: validationSchema,
        onSubmit
    })


    const getImageLink = ()=>{
        setImageLoading(true)
        if(image){
            apiAuth.post('v2/register/uploadInstituteLogo',{img:image})
            .then((res)=>{
                setImageLoading(false)
                setimageLink(res.data.result);
                setInstituteData('logo',res.data.result)
                formik.setFieldValue('logo', res.data.result)
            }).catch((error)=>{
                setImageLoading(false)
                toast.dismiss()
                toast.error('Internal server Error')
            })
        }
    }
    useEffect(()=>{
        if(image){
            getImageLink()
        }
    },[image])

    function showFileInput() {
        var img = document.getElementById('img');
        img.click();
      }

      const validateURL = (inputURL) => {
        // Regular expression for a simple URL validation
        const urlPattern = /^(?!(https?:\/\/|www\.))[a-zA-Z]+\.[^\s/$.?#][^\s]*$/;
        return urlPattern.test(inputURL);
      };
    
       // ************To check URL validation************
       const handleURLChange = (e) => {
        const inputURL = e.target.value;
        setUrl(inputURL);
      
        if (inputURL === '' || validateURL(inputURL)) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      };

    return (
        <>
         <form onSubmit={formik.handleSubmit}>
         <div>
                <div className="mb-2">
                    <span className=" fs-35px fw-600">Appearance</span>
                </div>
                <div>
                    <div className="mb-50">
                        <span
                            className="fw-500 fs-19px color-grey"
                        >
                            Personalize your institute account
                        </span>
                    </div>
                </div>

                <div className="d-flex mb-4">
             {imageLoading?<>
                <div className="me-4 d-flex justify-content-center align-items-center" style={{ height: "100px", width: "100px" }}>
                    <div class="spinner-border" role="status">
                    </div>
                </div>
             </>   
             :    <div className="me-4  " style={{ height: "100px", width: "100px" }}>
                  {  formik?.values?.logo?<img
                            className="w-100 h-100 rounded-3"
                            src={formik?.values?.logo}
                         />: 
                            // <img
                            
                            <AccountBalanceTwoToneIcon style={{color: "#80808036"}} className="w-100 h-100 rounded-3"/>
                            // src={"./images/onBoarding/default_inst.png"}
                        // />
                        }
                    </div>}
                    <div className="">
                        <div className="mb-4">
                            <span className="fs-17px fw-500">
                                Upload your Institute Logo
                            </span>
                        </div>

                        <div
                            className="p-2 rounded-3 text-center w-auto border-1 cursor-pointer"
                            style={{
                                background: "#F0EBFF",
                            }}
                            onClick={showFileInput}
                        >
                        <input
                            type="file"
                            id="img"
                            style={{ display: 'none' }}
                            accept=".png, .jpg, .jpeg"
                            name="files[]"
                            onChange={(e) => {
                                if (e.target.files.length) {
                                    formik.setFieldValue('image',e.target.files[0])
                                setImage(e.target.files[0]);
                                }
                            }}
                            />

                            <span className="me-2 "><img src="./images/onBoarding/upload.png" /></span>
                            <span  className="fs-15px color-purple fw-500 text-center  mb-4"
                            >Upload
                            </span>
                           
                        </div>
                        <span className="text-danger">{formik.errors.image}</span>
                    </div>
                </div>


                <div className="d-flex  rounded-3 background-purple border-purple p-3">
                    <span className="me-1"><img src="./images/onBoarding/note.png" /> </span>
                    <span className="fw-500 fs-15px color-purple">
                        Image Quality: To avoid issues during uploading, ensure your logo does not exceed the 5MB file size limit. Only JPEG and PNG files are accepted.
                    </span>
                </div>

                <div className="my-4">
                    <div>
                        <div
                            className="mb-4"
                        >
                            <span className="onboard-form-span-sm">
                                Add a Institute' Website
                            </span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div
                                className="p-2 rounded-3  w-auto border-1 cursor-pointer"
                                style={{
                                    background: "#F0EBFF",
                                }}
                            >
                                <span className="color-purple fs-17px fw-500">https://</span>
                            </div>
                            <div className="ms-2" >
                                <input placeholder="example.com" className="border-0 box-shadow-0 form-control text-dark"   type="text"  value={url}  onChange={handleURLChange}/>
                               {!isValid && <span className="text-danger error-message">Invalid URL</span>}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-between  mt-4">
                    <button onClick={handleBack} className="btn-onboard">
                        Previous
                    </button>
                    <button type="submit"  className="btn-onboard-fill">
                        <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                    </button>
                </div>
            </div>
         </form>
        </>
    );
};

const SocialPresence = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
    } = useContext(OnBoardContext);

    const [urls, setUrls] = useState(Array(socialHandles.length).fill(''));
    const [isValid, setIsValid] = useState(Array(socialHandles.length).fill(true));

    // const validateURL = (inputURL) => {
    //     // Regular expression for a simple URL validation
    //     const urlPattern = /^(?!(https?:\/\/|www\.))[a-zA-Z]+\.[^\s/$.?#][^\s]*$/;
    //     return urlPattern.test(inputURL);
    //   };

      // ************To check URL validation************
const handleURLChange = (e,index) => {
    // const inputURL = e.target.value;
    // setUrl(inputURL);
  
    // if (inputURL === '' || validateURL(inputURL)) {
    //   setIsValid(true);
    // } else {
    //   setIsValid(false);
    // }
  
    const inputURL = e.target.value;
    const newUrls = [...urls];
    newUrls[index] = inputURL;
    setUrls(newUrls);
  
    const newIsValid = [...isValid];
    if (inputURL === '' || socialHandles[index].socialurls.test(inputURL)) {
      newIsValid[index] = true;
    } else {
      newIsValid[index] = false;
    }
    setIsValid(newIsValid);
  };
    return (
        <>
            <div>
                <div className="mb-2">
                    <span className=" fs-35px fw-600">Social Media</span>
                </div>
                <div >
                    <div className="mb-4">
                        <span
                            className="fs-19px fw-500 color-grey"
                        >
                            Expand your network and showcase achievements through integrated social media connections
                        </span>
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <span className="fs-19px fw-500">
                            Add your Social Media Accounts (Optional)
                        </span>
                    </div>

                    <div className="col-5">
                        {
                            socialHandles?.map((s, index) => {
                                return (
                                    <div className="cursor-pointer mb-4 ">
                                        <div className="d-flex align-items-center  ">
                                            <div className=" me-3 rounded-3 p-2 background-purple" style={{ height: '50px' }}>
                                                <img className=" rounded-3 h-100 " src={s.icon} alt='img' />
                                            </div>
                                            <div className="r">
                                                <input className="fs-19px fw-400 form-control background-grey border-0 box-shadow-0 rounded-3 " placeholder={s.url} type='text' value={urls[index]}  onChange={(e)=>handleURLChange(e,index)} />
                                                <div>
                                            {isValid[index] ? null : <span className="error text-danger">Invalid URL</span>}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={handleBack} className="btn-onboard">
                        Previous
                    </button>

                    <button onClick={() => {
                    if (urls.every((url,i) => url === '' || isValid[i])) {
                      handleNextChild();
                    }
                  }} className="btn-onboard-fill">
                        <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                    </button>
                </div>
            </div>
        </>
    );
};

const Documents = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);

    const [dragging, setDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);

    const validationSchema = Yup.object().shape({
        proof_of_id_file: Yup.mixed().required("proof_of_id_file is Required")
        .when('proof_of_id', {
            is: (proof_of_id) => !proof_of_id,
            then: Yup.mixed()
              .required('Proof of Identitiy is required')
              .test('fileType', 'Unsupported file', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg','application/pdf'].includes(value?.type);
              }),
          }),
          proof_of_address_file: Yup.mixed().required("proof_of_address_file is Required")
        .when('proof_of_address', {
            is: (proof_of_address) => !proof_of_address,
            then: Yup.mixed()
              .required('Proof of Address is required')
              .test('fileType', 'Unsupported file', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg','application/pdf'].includes(value?.type);
              }),
          }),
      });
        const onSubmit = () => {
            handleNextChild();
        };
      const formik = useFormik({
        initialValues:{
            proof_of_id:instituteFormik.values.proof_of_id||'',
            proof_of_address:instituteFormik.values.proof_of_address||'',
            proof_of_id_file:instituteFormik.values.proof_of_id_file||'',
            proof_of_address_file:instituteFormik.values.proof_of_address_file||''
        },
        validationSchema: validationSchema,
        onSubmit, 
    })

    const get_file1_link = ()=>{
        if(formik.values.proof_of_id_file){
            apiAuth.post('v2/register/uploadInstituteLogo',{img:formik.values.proof_of_id_file[0]})
            .then((res)=>{
                setInstituteData('proof_of_id',res.data.result)
                formik.setFieldValue('proof_of_id', res.data.result)
            }).catch((error)=>{
                toast.dismiss()
                toast.error('Internal server Error')
            })
        }
    }

    const get_file2_link = ()=>{
        if(formik.values.proof_of_address_file){
            apiAuth.post('v2/register/uploadInstituteLogo',{img:formik.values.proof_of_address_file[0]})
            .then((res)=>{
                setInstituteData('proof_of_address',res.data.result)
                formik.setFieldValue('proof_of_address', res.data.result)
            }).catch((error)=>{
                toast.dismiss()
                toast.error('Internal server Error')
            })
        }
    }

    useEffect(()=>{
        if(selectedFiles){
            get_file1_link()
        }
    },[selectedFiles])

    useEffect(()=>{
        if(selectedFiles2){
            get_file2_link()
        }
    },[selectedFiles2])



    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles(files);
        formik.setFieldValue('proof_of_id_file', files)
        instituteFormik.setFieldValue('proof_of_id_file', files)
    };
    const handleDrop2 = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles2(files);
        formik.setFieldValue('proof_of_address_file',files)
        instituteFormik.setFieldValue('proof_of_address_file',files)
    };

    const handleFileInputChange = (e) => {
        const fileTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        const files = Array.from(e.target.files);
          
            if (fileTypes.includes(files[0]?.type)) {
                
                // console.log("files[0]?.type", files[0]?.type, fileTypes.includes(files[0]?.type))
                setSelectedFiles(files);
                formik.setFieldValue('proof_of_id_file', files)
                instituteFormik.setFieldValue('proof_of_id_file', files)
            } else {
            //   console.log(`${files[0]?.name} is not a PDF, PNG, or JPG file.`);
            //   console.log("formik.values.proof_of_id_file", instituteFormik.values.proof_of_id_file)
            toast.dismiss();
            toast.error(`${formik?.errors?.proof_of_id_file}`);
            }
    };

    const handleFileInputChange2 = (e) => {
        const fileTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        const files = Array.from(e.target.files);

        if(fileTypes.includes(files[0]?.type)){
                // console.log("files[0]?.type", files[0]?.type, fileTypes.includes(files[0]?.type))

            setSelectedFiles2(files);
            formik.setFieldValue('proof_of_address_file',files)
            instituteFormik.setFieldValue('proof_of_address_file',files)
        }
        else{
            console.log(`${files[0]?.name} is not a PDF, PNG, or JPG file.`);
            //   console.log("formik.values.proof_of_address_file", instituteFormik.values.proof_of_address_file)
            toast.dismiss();
            toast.error(`${formik?.errors?.proof_of_address_file}`);
        }
    };

    const handleFileInputClick = (e, inputId) => {
        const fileInput = document.getElementById(inputId);
        if (fileInput) fileInput.click();
      };

      const removeFile = (i)=>{
        i===0?setSelectedFiles([]):setSelectedFiles2([])
        i===0?formik.setFieldValue('proof_of_id_file',[]):formik.setFieldValue('proof_of_address_file',[])
        i===0?instituteFormik.setFieldValue('proof_of_id_file',[]):instituteFormik.setFieldValue('proof_of_address_file',[])
      }

    const files = [
        {
            name: 'POA.pdf',
            size: '1MB'
        },
        {
            name: 'LatestDocument.pdf',
            size: '543KB'
        },
    ]

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () =>{
        setShowModal(true)
      }
      const handleClose = () =>{
        setShowModal(false)
      }


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
            <div>
                <div className="mb-2">
                    <span className=" fs-35px fw-600">Upload Documents</span>
                </div>
                <div className="mb-50">
                    <span
                        className="fs-19px fw-500 color-grey"

                    >
                        Assist us in verifying the authenticity of your institution.
                    </span>
                </div>
                <div className="row justify-content-between mb-4">
                    <div className="col-lg-6 col-12 px-4 py-2"
                    >
                        <div
                            className={`dashed-border-grey rounded-3 p-4 d-flex flex-column justify-content-center align-items-center cursor-pointer  file-drop-zone ${dragging ? "dragging" : ""}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={(e) => {
                                handleFileInputClick(e, 'input1')
                            }}
                            style={{minHeight:'159px'}}
                        >
                            <input
                                accept="image/jpeg, image/png , application/pdf"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                                id="input1" 
                            />
                           
                        { formik.values.proof_of_id_file.length>0? <span className="text-success"><TaskAltOutlinedIcon/></span> : <>
                          <span ><img src="./images/onBoarding/uploadCloud.png" className="fs-1" style={{ color: '23528E' }} /></span>
                            <span className="fw-500 fs-17px d-block ">Drag file here or click to</span>
                            <span className="color-purple fs-17px fw-500 text-decoration-underline cursor-pointer">Select file to upload</span>
                          </>}
                            <span className="color-grey">proof of identity</span>

                          
                        </div>
                        <div className="text-center">
                            {formik?.errors?.proof_of_id_file && formik?.touched?.proof_of_id_file ? 
                          (<span className="text-danger">{formik?.errors?.proof_of_id_file}</span>) : (null)}
                          </div>
                    </div>
                   

                    <div className="col-lg-6 col-12 px-4 py-2">
                    <div
                            className={`dashed-border-grey rounded-3 p-4 d-flex justify-content-center flex-column align-items-center cursor-pointer  file-drop-zone ${dragging ? "dragging" : ""}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop2}
                            onClick={(e) => {
                                handleFileInputClick(e, 'input2')
                            }}
                            style={{minHeight:'159px'}}
                        >
                            <input
                                type="file"
                                accept="image/jpeg, image/png , application/pdf"
                                style={{ display: "none" }}
                                id="input2" 
                                onChange={handleFileInputChange2}
                            />
                           
                       { formik.values.proof_of_address_file.length>0? <span className="text-success"><TaskAltOutlinedIcon/></span> :   <>

                           <span ><img src="./images/onBoarding/uploadCloud.png" className="fs-1" style={{ color: '23528E' }} /></span>
                            <span className="fw-500 fs-17px d-block ">Drag file here or click to</span>
                            <span className="color-purple fs-17px fw-500 text-decoration-underline cursor-pointer">Select file to upload</span>
                           </>}
                            <span className="color-grey">proof of address</span>

                           
                        </div>
                            <div className="text-center">
                            {formik?.errors?.proof_of_address_file && formik?.touched?.proof_of_address_file ? 
                  (<span className="text-danger">{formik?.errors?.proof_of_address_file}</span>) : (null)}
                  </div>
                    </div>
                </div>
                <div className="background-purple rounded-3 px-3 py-3 mb-50 border-purple d-flex">
                    <div>
                    <span className="me-2">{<img src="./images/onBoarding/note.png" />}</span>
                    </div>
                    <div><span style={{fontSize: "15px", fontWeight: "500", color: "#633CFF"}}>Accepted files types are .jpg .png or a pdf format. <span onClick={handleShowModal} className="fs-15px" style={{fontWeight: "400", color:"#633CFF"}}>Upto 2 files or 2 MB maximum, <span className="fs-15px color-purple text-decoration-underline" style={{cursor: "pointer",fontWeight: "400"}}>click here to know about poa and poi documents </span></span></span></div>
                    {/* <span className="fs-15px fw-500 color-purple "> <span className="me-2">{<img src="./images/onBoarding/note.png" />}</span>Accepted files types are .jpg .png or a pdf format. <span>Upto 2 files or 2 MB maximum, click here to know about poa and poi documents</span></span> */}
                </div>

                <div className="container">
                    <Modal show={showModal} onHide={handleClose}  size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title className="fw-bold fs-2 p-3" style={{color:"black"}}>
                                Documents that you can submit as proof of address and identity
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="bd-example-modal-lg p-4">
                            <div>

                            <div className="">
                        <p className="fw-bold fs-5"> Document for both identity and address:</p>     
                        <p>(a) Ration card</p>
                        <p>(b) Voter identity card</p>
                        <p>(c) Kisan photo passbook</p>
                        <p>(d) Indian passport</p>
                        <p>(e) Government-issued identity card/certificate, ST/SC/OBC certificate or marriage certificate, having photograph</p>
                        <p>(f) Disability identity card / certificate of disability</p>
                        <p>(g) Transgender identity card/certificate</p>
                        <p>(h) Certificate issued in UIDAI standard certificate format in respect of a sex worker</p>
                        <p>(i) Certificate issued in UIDAI standard certificate format by recognized shelter homes or orphanages</p>
                        <p>(j) Prisoner induction document issued by Prison Officer</p>
                        </div>
                        
                        <div className="mt-5" >
                        
                        <p className="fw-bold fs-5">Document for Identity:</p>
                        <p>(a) School leaving certificate / school transfer certificate with photograph</p>
                        <p>(b) Marksheet/certificate issued by recognized Board of Education or University with photograph</p>
                        <p>(c) PAN/e-PAN card</p>
                        <p>(d) Government/statutory-body/PSU-issued employee/pensioner photo identity card, pension payment order or medi-claim card</p>
                        <p>(e) Driving licence</p>
                        <p>(f) Freedom fighter photo identity card</p>
                        </div>
                        
                        <div className="mt-5" >
                        <p className="fw-bold fs-5">Document for Address:</p>
                        <p>(a) Electricity, water, gas or telephone/mobile/broadband bill (not more than three months old)</p>
                        <p>(b) Duly signed and stamped Scheduled Commercial Bank / Post Office passbook with photograph</p>
                        <p>(c) Duly signed and stamped Scheduled Commercial Bank / Post Office account/credit-card statement (not more than three months old)</p>
                        <p>(d) Valid rent, lease or leave & licence agreement</p>
                        <p>(e) Certificate issued in UIDAI Standard Certificate format by MP, MLA, MLC, Municipal Councillor, Group 'A' or ‘B’ Gazetted Officer, EPFO Officer or Tahsildar</p>
                        <p>(f) Certificate issued in UIDAI Standard Certificate format by Village Panchayat Head/Secretary, Village Revenue Officer or equivalent (for rural areas)</p>
                        <p>(g) Certificate issued to a student in UIDAI Standard Certificate format by the head of the recognized educational institution concerned</p>
                        <p>(h) Property tax receipt (not more than one year old)</p>
                        <p>(i) Valid registered sale agreement or gift deed</p>
                        <p>(j) Government/statutory-body/PSU-issued accommodation allotment letter (not more than one year old)</p>
                        <p>(k) Life or medical insurance policy (not more than one year old)</p>
                        </div>
                               
                            </div>

                            </div>
                        </Modal.Body>

                    </Modal>
                </div>



{
    formik.values.proof_of_id_file.length>0 &&
                <div>
                        <div className="mb-2 px-3 py-4 border-purple rounded-3 d-flex justify-content-between">
                            <span className="fw-500 fst-italic">{formik.values.proof_of_id_file[0]?.name}</span>
                            <div className="d-flex justify-content-between col-3">
                                <div>
                                <span className="fw-bold" style={{fontFamily: "Poppins"}}>POI</span>
                                </div>
                                <div>
                                <span>{(formik.values.proof_of_id_file[0]?.size / 1024).toFixed(2)} KB</span>
                               <span className="cursor-pointer" onClick={()=>removeFile(0)}> <img className="ms-4" src="./images/onBoarding/minus.png" /></span>
                               </div>
                            </div>
                        </div>
                </div>
    }
    {
    formik.values.proof_of_address_file.length >0 &&
                <div>
                        <div className="mb-2 px-3 py-4 border-purple rounded-3 d-flex justify-content-between">
                            <span className="fw-500 fst-italic">{formik.values.proof_of_address_file[0]?.name}</span>
                            <div className="d-flex justify-content-between  col-3">
                                <div>
                          <span className="fw-bold" style={{fontFamily: "Poppins"}}>POA</span>
                          </div>
                          <div>
                                <span>{(formik.values.proof_of_address_file[0]?.size / 1024).toFixed(2)} KB</span>
                               <span className="cursor-pointer" onClick={()=>removeFile(1)}> <img className="ms-4" src="./images/onBoarding/minus.png" /></span>
                               </div>
                            </div>
                        </div>
                </div>
    }

                <div className="d-flex justify-content-between  mt-4">
                    <button onClick={handleBack} className="btn-onboard">
                        Previous
                    </button>
                    <button type="submit" className="btn-onboard-fill">
                        <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                    </button>
                </div>


            </div>

            </form>
        </>
    );
};

const AboutYou = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        selectedDesignation,
        setSelectedDesignation,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);

    const [showDesList, setShowDesList] = useState([])
    useEffect(() => {
        if (selectedDesignation === 'School') {
            setShowDesList(designationSchool)
        }
        else if (selectedDesignation === 'Coaching Institute') {
            setShowDesList(designationCoachingInstitute)
        }
        else if (['College', 'University'].includes(selectedDesignation)) {
            setShowDesList(designationUniversityCollege)
        }

    }, [selectedDesignation])

    const validation = Yup.object().shape({
        first_name: Yup.string().required('Write First Name'),
        last_name: Yup.string().required('Write Last Name'),
        phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        designation: Yup.string().required('Select Designation'),
    })
    const initialValues = {
        first_name: instituteFormik.values.first_name|| '',
        last_name: instituteFormik.values.last_name||'',
        phone: instituteFormik.values.phone||'',
        designation: instituteFormik.values.designation||'',

    }
    function copyValues() {
        const fieldMappings = {
            first_name: 'first_name',
            last_name: 'last_name',
            phone: 'phone',
            designation: 'designation',
          };
        const updatedValues = { ...instituteFormik.values };
      
        for (const formikKey in fieldMappings) {
          const instituteFormikKey = fieldMappings[formikKey];
          updatedValues[instituteFormikKey] = formik.values[formikKey];
        }
      
        instituteFormik.setValues(updatedValues);
      }
    const onSubmit = () => {
        // handleShowDuplicateWarning()
        copyValues()
        handleNextChild()

    }
    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })


    return (
        <>
           <form onSubmit={formik.handleSubmit}>
           <div className="mb-2">
                <span className=" fs-35px fw-600">A bit about you</span>
            </div>
            <div className="mb-50">
                <span
                    className="fs-17px fw-500 color-grey"
                >
                   Share some personal details about the Admin
                </span>
            </div>

            <div className="row mb-2">
                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">First Name</span>
                    <input
                        value={formik.values.first_name}
                        type="text"
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter First Name..."
                        onChange={(e) => {
                                    
                                    formik.setFieldValue('first_name', e.target.value)
                                    instituteFormik.setFieldValue('first_name', e.target.value)
                                }}
                    />
                    <span className="text-danger">{formik.errors.first_name}</span>
                </div>
                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">Last Name</span>
                    <input
                     value={formik.values.last_name}
                        type="text"
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter Last Name..."
                        onChange={(e) => {
                                    
                                    formik.setFieldValue('last_name', e.target.value)
                                    instituteFormik.setFieldValue('last_name', e.target.value)
                                }}
                    />
                    <span className="text-danger">{formik.errors.last_name}</span>
                </div>

                <div class="mb-50 col-12 col-lg-12 ">
                    <span className="onboard-form-span d-block mb-2">Phone</span>
                    <div class=" row w-50">
                        {/* <div className="col-3">
                            <Select
                                styles={customStylesNumber}
                                options={countryCode}
                                defaultValue={countryCode[0]}
                                getOptionLabel={
                                    (option) => {
                                        return (
                                            <>
                                                <div className="p-2">
                                                    <span className="color-purple fs-6 fw-semibold">{option.code}</span>

                                                </div>
                                            </>
                                        )
                                    }
                                }
                            />
                            
                        </div> */}
                        <div className="col-12">
                            <input
                                 value={formik.values.phone}
                                type="number"
                                class="form-control rounded-3 border-0 background-grey box-shadow-0"
                                placeholder="99*****99"
                                onChange={(e) => {
                                    
                                    formik.setFieldValue('phone', e.target.value)
                                    instituteFormik.setFieldValue('phone', e.target.value)
                                }}
                            />
                            <span className="text-danger">{formik.errors.phone}</span>
                        </div>
                    </div>


                </div>
                <div class="mb-4 col-12 col-lg-12">
                    <span className="fs-5 fw-500 d-block mb-4 ">Tell us how you are associated with this institute  </span>
                    <div className="">
                        <Select
                            styles={customStyles}
                            options={showDesList}
                            value={showDesList.find((i)=>i.name===formik.values.designation)}
                            onChange={(selected) => {
                                
                                    formik.setFieldValue('designation', selected.name)
                                    instituteFormik.setFieldValue('designation', selected.name)
                                }}
                            getOptionLabel={
                                (option) => {
                                    return (
                                        <>
                                                <span>{option.name}</span>
                                        </>
                                    )
                                }
                            }
                        />
                        <span className="text-danger">{formik.errors.designation}</span>

                    </div>
                </div>
            </div>






            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button type="submit" className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
           </form>
        </>
    );
};

const Mailing = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        setInstituteAddress,
        instituteAddress,
        instituteFormik,
        setInstituteData,
        
    } = useContext(OnBoardContext);

    const [sameAddress, setSameAddress] = useState(false)



    const validation = Yup.object({
        country: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        pinCode: Yup.number().required('Required'),
    })
    const initialValues = {
        country:instituteFormik.values.admin_country|| '',
        state:instituteFormik.values.admin_state|| '',
        street:instituteFormik.values.admin_street|| '',
        city:instituteFormik.values.admin_city|| '',
        pinCode:instituteFormik.values.admin_pincode|| '',
    }
    

    const onSubmit = () => {
        handleNextChild()
        styleValue();
    }
    const styleValue = ()=>{
        console.log("naveen");
    }
    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })
    useEffect(()=>{
        if(sameAddress){
            formik.setValues({
                country: instituteAddress.country,
                state: instituteAddress.state,
                street: instituteAddress.street,
                city: instituteAddress.city,
                pinCode: instituteAddress.pinCode,
            });
            instituteFormik.setValues({ ...instituteFormik.values,
                admin_country: instituteAddress.country,
                admin_state: instituteAddress.state,
                admin_street: instituteAddress.street,
                admin_city: instituteAddress.city,
                admin_pincode: instituteAddress.pinCode,
            });
        }else{
            formik.setValues({
                country:instituteFormik.values.admin_country|| '',
                state:instituteFormik.values.admin_state|| '',
                street:instituteFormik.values.admin_street|| '',
                city:instituteFormik.values.admin_city|| '',  
                pinCode:instituteFormik.values.admin_pincode|| '',
            });
        }
    },[sameAddress])

    return (
        <>
           <form onSubmit={formik.handleSubmit}> 
           <div className="mb-2">
                <span className=" fs-2 fw-semibold">Mailing Address</span>
            </div>
            <div className="mb-50">
                <span className="fs-5 fw-500 color-grey">
                Enter your communication address
                </span>
            </div>

            <div className="mb-4 d-flex"> 
            <input className="form-check-input me-2" type="checkbox" value={sameAddress} onChange={()=>setSameAddress(!sameAddress)}/>
            <span className="fs-19px fw-500" style={{color:'#3A3A3A'}}>Same as Institute address</span>
            </div>

            <div className="row mb-2">
                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">Country</span>
                    <input
                        value={formik.values.country}
                        onChange={(e)=>{
                            formik.setFieldValue('country', e.target.value)
                            instituteFormik.setFieldValue('admin_country', e.target.value)
                            
                        }}
                        type="text"
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter Country..."
                    />
                    {
                        formik.touched.country && formik.errors.country && <span className="text-danger">{formik.errors.country}</span>
                    }
                </div>
                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">State</span>
                    <input
                        type="text"
                        value={formik.values.state}
                        onChange={(e)=>{
                            instituteFormik.setFieldValue('admin_state', e.target.value)
                            formik.setFieldValue('state', e.target.value)}}
                        className={"form-control rounded-3 box-shadow-0 background-grey border-0"}
                        placeholder="Enter State..."
                    />
                    {
                        formik.touched.state && formik.errors.state && <span className="text-danger">{formik.errors.state}</span>
                    }
                </div>
                <div class=" mb-4 col-12 col-lg-12">
                    <span className="onboard-form-span mb-2 d-block">Street Address</span>
                    <input
                        type="text"
                        value={formik.values.street}
                        onChange={(e)=>{
                            instituteFormik.setFieldValue('admin_street', e.target.value)
                            formik.setFieldValue('street', e.target.value)}}
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter Street Address..."
                    />
                    {
                        formik.touched.street && formik.errors.street && <span className="text-danger">{formik.errors.street}</span>
                    }
                </div>

                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">City</span>
                    <input
                        type="text"
                        value={formik.values.city}
                        onChange={(e)=>{
                            instituteFormik.setFieldValue('admin_city', e.target.value)
                            formik.setFieldValue('city', e.target.value)}}
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter City..."
                    />
                    {
                        formik.touched.city && formik.errors.city && <span className="text-danger">{formik.errors.city}</span>
                    }
                </div>
                <div class=" mb-4 col-12 col-lg-6">
                    <span className="onboard-form-span mb-2 d-block">Pin Code</span>
                    <input
                        type="number"
                        value={formik.values.pinCode}
                        onChange={(e)=>{
                            instituteFormik.setFieldValue('admin_pincode', e.target.value)
                            formik.setFieldValue('pinCode', e.target.value)}}
                        className="form-control rounded-3 box-shadow-0 background-grey border-0"
                        placeholder="Enter Pin Code..."
                    />
                    {
                        formik.touched.pinCode && formik.errors.pinCode && <span className="text-danger">{formik.errors.pinCode}</span>
                    }
                </div>

            </div>
            <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
                <span className="me-2">{<img src="./images/onBoarding/note.png" />}</span>
                <span className="fs-15px fw-500 color-purple "> You can enter any address you want and this doesn’t have to be in India.</span>
            </div>


            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button type="submit" className="btn-onboard-fill" >
                    <span>Next Steps</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
           </form>
        </>
    );
};
const AddCooordinators = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        selectedDesignation,
        setSelectedDesignation,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);

    const [managerModal, setManagerModel] = useState(false)
    const [showDesList, setShowDesList] = useState([])
    const [formData, setFormData] = useState({})
    const [accountManagers, setAccountManagers] = useState([])

    useEffect(()=>{
        setInstituteData('account_manager', accountManagers)
    },[accountManagers])
    useEffect(()=>{
        setAccountManagers(instituteFormik.values.account_manager)
    },[])

    const handleAddManager = () => {
        setAccountManagers([...accountManagers, formData]);
        setFormData([])
        setManagerModel(false)
    }
    const handleRemoveManager = (i) => {
        const updatedManagers = accountManagers.filter((_, index) => index !== i);
        setAccountManagers(updatedManagers);
    };

    const [typeManager, setTypeManager] = useState("Admin")

    const handleFormData = (name, value) => {
        setFormData({ ...formData, [name]: value, })

        if(value === "Admin"){
            setTypeManager("Admin")
        }else if(value === "Moderator"){
            setTypeManager("Moderator")
        }
        else{
            setTypeManager("Manager")
        }
    }

    useEffect(() => {
        if (selectedDesignation === 'School') {
            setShowDesList(designationSchool)
        }
        else if (selectedDesignation === 'Coaching Institute') {
            setShowDesList(designationCoachingInstitute)
        }
        else if (['College', 'University'].includes(selectedDesignation)) {
            setShowDesList(designationUniversityCollege)
        }

    }, [selectedDesignation])

    const showManagerModal = () => {
        setManagerModel(true)
    }
    const hideManagerModal = () => {
        setManagerModel(false)
        formik.resetForm()
    }

    
    const validation = Yup.object({
        name: Yup.string().required('Required'),
        designation: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        phone: Yup.string() // Use string for mobile number
        .required('Required')
        .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
        typeOfManager: Yup.string().required('Required'),
})

    const initialValues = {
        name: '',
        designation: '',
        email: '',
        phone: '',
        typeOfManager: '',
    }

    const onSubmit = () => {
        handleAddManager()
        // handleFormData()
        formik.resetForm()
    }

    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })
    


    return (
        <>
            <div className="mb-2">
                <span className=" fs-2 fw-semibold">Add Account Managers</span>
            </div>

            <div className="mb-50">
                <span
                    className="color-grey fs-17px fw-500"

                >
                    Add Teaching, Non-Teaching Staff or Students who can be assigned admin duties for Yuvamanthan Portal.
                </span>
            </div>



            <div onClick={showManagerModal} className='card px-2 dashed-border cursor-pointer mb-4'>
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                        <div className='me-2' >
                            <span ><img src={'./images/OnBoarding/plus-green.png'} style={{
                                fontSize: '35px',
                                color: '#4CAF50',
                            }} /></span>
                        </div>
                        <div className='ms-2'>
                            <span className='fs-5 fw-500' >
                                Add new account manager
                            </span>

                        </div>
                    </div>
                </div>
            </div>



            <div className="background-purple rounded px-2 py-2 mb-50 border-purple">
                <span className="fs-6 fw-semibold color-purple "> <span className="me-2">{<img src="./images/onBoarding/note.png" />}</span>You can add up to 20 account managers at a time.</span>
            </div>

            <div className="d-flex flex-column mb-50" >
                <div className="d-flex justify-content-between mb-4">
                    <span className="fs-4 fw-500">Account Management</span>
                    <div className="d-flex">
                        <img src="./images/OnBoarding/arrow-left.png" />
                        <img src="./images/OnBoarding/arrow-right.png" />
                    </div>
                </div>
                <div style={{
                    overflowX:'hidden',
                    height:'189px'
                }} className="thin-scroll">
                    {
                        accountManagers.length===0 ?<div className="text-center mt-4">
                            <span className="color-grey fs-19px fw-400">No Account Manager Selected</span>
                        </div>:
                        accountManagers?.map((c, index) => {
                            return (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fs-5 fw-500">{c.name}</span>
                                        <div className="d-flex align-items-center">
                                            <div className="me-3">
                                                <div className="p-2">
                                                    <span className="color-purple fs-17px fw-semibold text-center">{c.typeOfManager}</span>
                                                </div>
                                            </div>
                                            <div onClick={() => handleRemoveManager(index)} className="d-flex align-items-center justify-content-center cursor-pointer " style={{
                                                background: '#FFD6D6',
                                                width: '37px',
                                                height: '37px',
                                                borderRadius: '7px'
                                            }}>
                                               <span> <img src="./images/onBoarding/remove-2.png" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button onClick={handleNextChild} className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
            <Modal show={managerModal} className="left-rounded-modal" onHide={hideManagerModal} size="lg" centered>
                <div className="modal-content">
                <Modal.Body className="p-5">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className=" mb-4 ps-2">
                                <span className="fs-2 fw-600 color-black ">New Account Manager</span>
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
                                            options={showDesList}
                                            // value={selectedTypeOfSchool}
                                            defaultValue={formik.values.designation}
                                            
                                            onChange={(e) => {
                                                handleFormData('designation', e.name)
                                                formik.setFieldValue('designation', e.name)
                                            }}
                                            getOptionLabel={
                                                (option) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                <span>{option.name}</span>
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
                                        <input value={formik.values.phone} onChange={(e) =>{
                                             handleFormData('phone', e.target.value)
                                             formik.setFieldValue('phone', e.target.value)
                                        }} placeholder="99******99" type='number' className="form-control border-0 box-shadow-0 background-grey" />
                                        {
                                            formik.touched.phone && formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>
                                        }
                                    </div>
                                    <div className="col-12 col-lg-6 mb-3">
                                        <span className="fs-19px fw-500 color-black">Type of Manager</span>
                                        <Select
                                            styles={customStyles}
                                            options={designations}
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
                                            Add {typeManager}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="background-purple rounded px-2 py-2 mb-40 border-purple mt-3 col-10">
               { 
                typeManager === "Admin" ? (
                    <>
                     <span className="fs-6 fw-semibold color-purple "> <span className="me-2">
                    {<img src="./images/onBoarding/note.png" />}
                    </span>{typeManager} Has full rights to all admin of the portal.
                    </span>
                    </>
                ) : typeManager === "Moderator" ? (
                    <>
                     <span className="fs-6 fw-semibold color-purple "> <span className="me-2">
                    {<img src="./images/onBoarding/note.png" />}
                    </span>{typeManager} Can verify students who wish to access the portal and
                    <br/>
                     <span className="" style={{marginLeft: "33px"}}>perform admin duties like posting, announcements and</span>
                     <br/>
                    <span style={{marginLeft: "33px"}}>managing events.</span>

                    </span>
                    </>
                ) : (
                    <>
                     <span className="fs-6 fw-semibold color-purple "> 
                     <span className="me-2">
                    {<img src="./images/onBoarding/note.png" />}
                    </span>{typeManager} Can verify students who wish to access the Portal
                    <br/>
                    <span className="" style={{marginLeft: "33px"}}>perform admin duties like posting, announcements and</span>
                    <br/>
                    <span style={{marginLeft: "33px"}}>managing events.</span>
                    </span>
                    </>
                )
                    }
            </div>
                </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

const Preferences = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        instituteFormik,
        setInstituteData,
    } = useContext(OnBoardContext);
    const {setUser,setToken} = useGlobalContext()

    const [select, setselect] = useState('1')

    useEffect(()=>{
        setInstituteData('student_verification', select==='1'?false:true)
    },[select])
    useEffect(()=>{
        setInstituteData('student_verification', select==='1'?false:true)
    },[])

    const instituteRegisterDetail = ()=>{
        const data = {
            email:instituteFormik.values.email,
            institution_name:instituteFormik.values.institution_name,
            type_of_inst:instituteFormik.values.type_of_inst,
            type_of_college:instituteFormik.values.type_of_college,
            education_board :instituteFormik.values.education_board,
            udise_code:instituteFormik.values.udise_code,
            medium_of_education:instituteFormik.values.medium_of_education,
            bio:instituteFormik.values.bio,
            state:instituteFormik.values.state,
            street:instituteFormik.values.street,
            city:instituteFormik.values.city,
            pinCode:instituteFormik.values.pinCode,
            logo:instituteFormik.values.logo,
            website:instituteFormik.values.website,
            facebook_acc:instituteFormik.values.facebook_acc,
            twitter_acc:instituteFormik.values.twitter_acc,
            linkedin_acc:instituteFormik.values.linkedin_acc,
            insta_acc:instituteFormik.values.insta_acc,
            youtube_acc:instituteFormik.values.youtube_acc,
            proof_of_id:instituteFormik.values.proof_of_id,
            proof_of_address:instituteFormik.values.proof_of_address,
            first_name:instituteFormik.values.first_name,
            last_name:instituteFormik.values.last_name,
            phone:instituteFormik.values.phone,
            designation:instituteFormik.values.designation,
            admin_state:instituteFormik.values.admin_state,
            admin_street:instituteFormik.values.admin_street,
            admin_city:instituteFormik.values.admin_city,
            admin_pincode:instituteFormik.values.admin_pincode,
            student_verification:instituteFormik.values.student_verification,
            account_manager:instituteFormik.values.account_manager,
            is_account_verified:false,
        }
        console.log('this is data', data)
        apiJson.put('v2/register/institute/on-board-data',data)
        .then((res)=>{
            setUser(res.data.user)
            setToken(res.data.token)
            console.log('this is user=>>', res.data.result)
        }).catch((error)=>{
            toast.error('Internal Server Error')
        })
    }

    const onSubmit = () => {
        instituteRegisterDetail()
        handleNextChild()
    }

    return (
        <>
            <div className="mb-2">
                <span className=" fs-2 fw-semibold">Preferences</span>
            </div>
            <div className="mb-50">
                <span className="fs-5 fw-500 color-grey">
                    Define your preferences
                </span>
            </div>

            <div>
                <div className={` card cursor-pointer d-flex border-3  p-2  rounded-3 mb-4 ${select === '1' ? 'border-purple-dark' : 'border-transparent'}`}>

                    <div onClick={() => {setselect('1')}} className="card-body d-flex align-items-center">
                        <span>
                        <input onChange={() => setselect('1')} class="form-check-input me-4" type="radio" name="preference" value='1' id="1" checked={select === '1'} />

                        </span>
                        <span className="fw-500 fs-5">Allow students to register without verification.</span>

                    </div>
                </div>


                <div onClick={() => setselect('2')} className={`cursor-pointer card d-flex border-3 p-2  rounded-3 ${select === '2' ? 'border-purple-dark' : 'border-transparent'}`}>

                    <div className="card-body d-flex align-items-center">
<span>
<input onChange={() => setselect('2')} class="form-check-input me-4" type="radio" name="preference" value='2' id="2" checked={select === '2'} />

</span>
                        <span className="fw-500 fs-5">Make verification through coordinators (admin or moderator) mandatory for students</span>

                    </div>
                </div>

            </div>






            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button onClick={onSubmit} className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
        </>
    );
};
const CreatePassword = () => {
    const {setUser} = useGlobalContext()
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
        instituteFormik,
        setInstituteData
    } = useContext(OnBoardContext);
    const [select, setselect] = useState('1')


    const validation = Yup.object().shape({
        newPassword: Yup.string()
            .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{6,})/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number, and be at least 6 characters'
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
            });


      const initialValues = {
        newPassword:instituteFormik.values.password || '',
        confirmPassword:instituteFormik.values.password|| '',
    }
    const instituteRegisterDetail = ()=>{
        const data = {
            institution_name:instituteFormik.values.institution_name,
            email:instituteFormik.values.email,
            password:instituteFormik.values.password,
            type_of_inst:instituteFormik.values.type_of_inst,
            type_of_college:instituteFormik.values.type_of_college,
            education_board :instituteFormik.values.education_board,
            udise_code:instituteFormik.values.udise_code,
            medium_of_education:instituteFormik.values.medium_of_education,
            bio:instituteFormik.values.bio,
            state:instituteFormik.values.state,
            street:instituteFormik.values.street,
            city:instituteFormik.values.city,
            pinCode:instituteFormik.values.pinCode,
            logo:instituteFormik.values.logo,
            website:instituteFormik.values.website,
            facebook_acc:instituteFormik.values.facebook_acc,
            twitter_acc:instituteFormik.values.twitter_acc,
            linkedin_acc:instituteFormik.values.linkedin_acc,
            insta_acc:instituteFormik.values.insta_acc,
            youtube_acc:instituteFormik.values.youtube_acc,
            proof_of_id:instituteFormik.values.proof_of_id,
            proof_of_address:instituteFormik.values.proof_of_address,
            first_name:instituteFormik.values.first_name,
            last_name:instituteFormik.values.last_name,
            phone:instituteFormik.values.phone,
            designation:instituteFormik.values.designation,
            admin_state:instituteFormik.values.admin_state,
            admin_street:instituteFormik.values.admin_street,
            admin_city:instituteFormik.values.admin_city,
            admin_pincode:instituteFormik.values.admin_pincode,
            student_verification:instituteFormik.values.student_verification,
            is_account_verified:false,
        }
        console.log('this is data', data)
        apiJson.put('v2/register/institute/on-board-data',data)
        .then((res)=>{
            setUser(res.data.user)
            console.log('this is user=>>', res.data.result)
        }).catch((error)=>{
            toast.error('Internal Server Error')
        })
    }

    
    const onSubmit = () => {
        copyValues()
        instituteRegisterDetail()
        handleNextChild()
    }
 
    function copyValues() {
        const fieldMappings = {
            confirmPassword: 'password',
            
          };
        const updatedValues = { ...instituteFormik.values };
      
        for (const formikKey in fieldMappings) {
          const instituteFormikKey = fieldMappings[formikKey];
          updatedValues[instituteFormikKey] = formik.values[formikKey];
        }
      
        instituteFormik.setValues(updatedValues);
      }

    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })
    return (
        <>
           <form onSubmit={formik.handleSubmit}>
           <div className="mb-2">
                <span className=" fs-2 fw-600">Create Password</span>
            </div>
            <div className="mb-50">
                <span className="fs-5 fw-500 color-grey">
                    Create a strong password for your yuvamanthan account
                </span>
            </div>

            <div className="d-flex flex-column mb-4">
                <div className="d-flex flex-column col-6 mb-4">
                    <span className="fs-5 fw-500 mb-3 d-block">New Password</span>
                    <input onChange={(e)=>formik.setFieldValue('newPassword',e.target.value)} placeholder="********" type="password" className="form-control fs-26px letter-spacing-5px rounded-3 background-grey box-shadow-0 border-0" />
                    {
                        formik.errors.newPassword && formik.touched.newPassword &&
                        <span className="text-danger">{formik.errors.newPassword}</span>
                    }

                </div>
                <div className="d-flex flex-column col-6">
                    <span className="fs-5 fw-500 mb-3 d-block">Confirm Password</span>
                    <input onChange={(e)=>{
                        setInstituteData('password', e.target.value)
                        formik.setFieldValue('confirmPassword',e.target.value)}}  placeholder="********" type="password" className="form-control fs-26px letter-spacing-5px rounded-3 background-grey box-shadow-0 border-0" />
                    {
                        formik.errors.confirmPassword && formik.touched.confirmPassword &&
                        <span className="text-danger">{formik.errors.confirmPassword}</span>
                    }
                </div>
            </div>

            <div className=" d-flex background-purple p-3 rounded-3 border-purple">
               <span> <img className="me-2" src="./images/onBoarding/note.png" /></span>
                <span className="color-purple fs-17px fw-500">Your password should contain, atleast 1 capital, 1 small, 1 symbol and 1 number. </span>
            </div>

            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button type="submit" className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>

           </form>
        </>
    );
};

const Done = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
    } = useContext(OnBoardContext);
    const [select, setselect] = useState('1')
    return (
        <>
            <div className="mb-2">
                <span className=" fs-2 fw-semibold">All Done</span>
            </div>
            <div className="mb-50">
                <span className="fs-5 fw-500 color-grey">
                    Everything looks great
                </span>
            </div>

            <div className="mb-50">
                <span className="fw-500 fs-26px">Thankyou for completing a our onboarding process.</span>
            </div>

            <div className="mb-50">
                <span className="fs-20px fw-400">Your Yuvamanthan institutional account awaits verification by our dedicated team. An executive will be reaching out to you shortly via phone to facilitate this process. It’s hardly takes 24 hours.</span>
            </div>

            <div className="background-purple border-purple rounded-3 text-center p-4 mb-4">
                <span className="color-purple fw-500  fs-26px">Your account is under review</span>
            </div>

            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button onClick={handleNextChild} className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
        </>
    );
};

const UnderReview = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
        handleNextChild,
        handleBack,
    } = useContext(OnBoardContext);
    const [select, setselect] = useState('1')
    return (
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="d-flex flex-column align-items-center col-12 col-lg-10  text-center">
                    <div className="mb-2">
                        <span className=" fs-2 fw-semibold">Account Under Review</span>
                    </div>
                    <div className="mb-2">
                        <img src={'./images/social-icons/Hourglass.svg'} />
                    </div>
                    <div className="mb-50">
                        <span className="fw-400 fs-17px " style={{
                            color: '#663700'
                        }}>Your Yuvamanthan institutional account awaits verification by our dedicated team. An executive will be reaching out to you shortly via phone to facilitate this process.</span>
                    </div>
                    <div className=" d-flex rounded-3 p-4 " style={{ background: '#FFFBEB' }}>
                        <span className="me-2"><img className="me-2" src="./images/onBoarding/note.png" /></span>
                        <span style={{ color: '#905F00' }} className="fw-500 fs-17px d-block ">To accelerate this verification, don't hesitate to send us a <span className="cursor-pointer" style={{ color: "#510090" }}>message</span> or give us a <span className="cursor-pointer" style={{ color: "#510090" }}>call</span>. Thank you for your cooperation</span>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>


            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard-disabled" disabled>
                    Previous
                </button>
                <button onClick={handleNextChild} className="btn-onboard-fill-disabled " disabled >
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
        </>
    );
};

const typeOfSelectedInstitute = [
    { name: 'Pre-School', value: 1 },
    { name: 'Primary', value: 2 },
    { name: 'Middle School', value: 3 },
    { name: 'High School', value: 4 },
    { name: 'Senior Secondary', value: 5 }
]

const selectBoard =
    [
        { name: 'CBSE', value: 1 },
        { name: 'CISCE', value: 2 },
        { name: 'IGOT-Health', value: 3 },
        { name: 'NIOS', value: 4 },
        { name: 'OTHERS', value: 5 },
        { name: 'STATE (Andhra Pradesh)', value: 6 },
        { name: 'STATE (Arunachal Pradesh)', value: 7 },
        { name: 'STATE (Assam)', value: 8 },
        { name: 'STATE (Bihar)', value: 9 },
        { name: 'STATE (Chandigarh)', value: 10 },
        { name: 'STATE (Chattisgarh)', value: 11 },
        { name: 'STATE (Delhi)', value: 12 },
        { name: 'STATE (Goa)', value: 13 },
        { name: 'STATE (Gujarat)', value: 14 },
        { name: 'STATE (Haryana)', value: 15 },
        { name: 'STATE (Himachal Pradesh)', value: 16 },
        { name: 'STATE (Jammu & Kashmir)', value: 17 },
        { name: 'STATE (Jharkhand)', value: 18 },
        { name: 'STATE (Karnataka)', value: 19 },
        { name: 'STATE (Kerala)', value: 20 },
        { name: 'STATE (Madhya Pradesh)', value: 21 },
        { name: 'STATE (Maharashtra)', value: 22 },
        { name: 'STATE (Manipur)', value: 23 },
        { name: 'STATE (Meghalaya)', value: 24 },
        { name: 'STATE (Mizoram)', value: 25 },
        { name: 'STATE (Nagaland)', value: 26 },
        { name: 'STATE (Odisha)', value: 27 },
        { name: 'STATE (Punjab)', value: 28 },
        { name: 'STATE (Rajasthan)', value: 29 },
        { name: 'STATE (Sikkim)', value: 30 },
        { name: 'STATE (Tamil Nadu)', value: 31 },
        { name: 'STATE (Tripura)', value: 32 },
        { name: 'STATE (Uttar Pradesh)', value: 33 },
        { name: 'STATE (Uttarakhand)', value: 34 },
        { name: 'UT (Andaman & Nicobar Islands)', value: 35 },
        { name: 'UT ( DNH & DD)', value: 36 },
        { name: 'UT (Ladakh)', value: 37 },
        { name: 'UT (Puducherry)', value: 38 }
    ]

const languages = [
    { name: 'Bengali', value: 1 },
    { name: 'English', value: 2 },
    { name: 'Gujarati', value: 3 },
    { name: 'Hindi', value: 4 },
    { name: 'Kannada', value: 5 },
    { name: 'Malayalam', value: 6 },
    { name: 'Marathi', value: 7 },
    { name: 'Odiya', value: 8 },
    { name: 'Punjabi', value: 9 },
    { name: 'Sanskrit', value: 10 },
    { name: 'Tamil', value: 11 },
    { name: 'Telugu', value: 12 },
    { name: 'Urdu', value: 13 }
];


const typeOfSchool = [
    {
        value: 1,
        name: 'School',
    },
    {
        value: 2,
        name: 'College',
    },
    {
        value: 3,
        name: 'University',
    },
    {
        value: 4,
        name: 'Coaching Institute',
    },
]

const universityTypes = [
    { name: 'Central University', value: 1 },
    { name: 'State University', value: 2 },
    { name: 'Deemed University', value: 3 },
    { name: 'Private University', value: 4 },
    { name: 'Autonomous Higher Education Institution', value: 5 },
    { name: 'Other (Please specify)', value: 6 }
];

const collegeTypes = [
    { name: 'Engineering College', value: 1 },
    { name: 'Medical College', value: 2 },
    { name: 'Arts College', value: 3 },
    { name: 'Science College', value: 4 },
    { name: 'Commerce College', value: 5 },
    { name: 'Law College', value: 6 },
    { name: 'Management College', value: 7 },
    { name: 'Pharmacy College', value: 8 },
    { name: 'Agriculture College', value: 9 },
    { name: 'Dental College', value: 10 },
    { name: 'Architecture College', value: 11 },
    { name: 'Hotel Management College', value: 12 },
    { name: 'Fine Arts College', value: 13 },
    { name: 'Education College', value: 14 },
    { name: 'Nursing College', value: 15 },
    { name: 'Physical Education College', value: 16 },
    { name: 'Journalism and Mass Communication College', value: 17 },
    { name: 'Fashion Designing College', value: 18 },
    { name: 'Social Work College', value: 19 },
    { name: 'Veterinary College', value: 20 },
    { name: 'Ayurvedic College', value: 21 },
    { name: 'Homeopathic College', value: 22 },
    { name: 'Unani College', value: 23 },
    { name: 'Polytechnic College', value: 24 },
    { name: 'ITI College', value: 25 },
    { name: 'B.Ed. College', value: 26 },
    { name: 'BBA College', value: 27 },
    { name: 'Animation and Multimedia College', value: 28 },
    { name: 'Film and Television Institute', value: 29 },
    { name: 'Aviation College', value: 30 },
    { name: 'Event Management College', value: 31 },
    { name: 'Hotel Management Institute', value: 32 },
    { name: 'Multi-disciplinary College', value: 33 },
    { name: 'Other (Please specify)', value: 34 }
];

const college = [
    {
        value: '1',
        name: 'AMC Engineering College',
        address: 'AMC Campus , Banglore, karnataka 560606'
    },
    {
        value: '2',
        name: 'AMC Boys College',
        address: 'AMC Campus , Banglore, karnataka 560606'
    },
    {
        value: '3',
        name: 'Indian Institute Of Technology',
        address: 'AMC Campus , Banglore, karnataka 560606'
    },
    {
        value: '4',
        name: 'AMC Engineering College',
        address: 'AMC Campus , Banglore, karnataka 560606'
    },
]

const countryCode = [
    {
        value: 1,
        name: 'India',
        code: '+91',
    },
    {
        value: 2,
        name: 'USA',
        code: '+1',
    },

]

const socialHandles = [
    {   
        platform: 'Facebook',
        url: 'facebook.com/',
        socialurls: /facebook\.com\/[a-zA-Z0-9_.-]+\/?/,
        icon: './images/social-new-icons/facebook.png',
    },
    {   
        platform: 'Twitter',
        url: 'twitter.com/',
        socialurls: /twitter\.com\/[a-zA-Z0-9_.-]+\/?/,
        icon: './images/social-new-icons/twitter.png',
    },
    {   
        platform: 'Linkdin',
        url: 'linkedin.com/',
        socialurls: /linkedin\.com\/[a-zA-Z0-9_.-]+\/?/,
        icon: './images/social-new-icons/linkedin.png',
    },
    {   
        platform: 'Instagram',
        url: 'instagram.com/',
        socialurls: /instagram\.com\/[a-zA-Z0-9_.-]+\/?/,
        icon: './images/social-new-icons/instagram.png',
    },
    {   
        platform: 'YouTube',
        url: 'youtube.com/',
        socialurls: /youtube\.com\/[a-zA-Z0-9_.-]+\/?/,
        icon: './images/social-new-icons/youtube.png',
    },
]

const coordinators = [
    {
        name: 'Sahil Gagan',
        des: 'Admin',
    },

    {
        name: 'Shivam Mishra',
        des: 'Admin',
    },
    {
        name: 'Ayush Antiwal',
        des: 'Manager',
    },
]

const designations = [
    {
        value: 1,
        des: 'Admin',
    },
    {
        value: 2,
        des: 'Moderator',
    },
    {
        value: 3,
        des: 'Manager',
    },
]

const designationSchool = [
    { value: 1, name: 'Principal' },
    { value: 2, name: 'Vice Principal' },
    { value: 3, name: 'Headmaster/Headmistress' },
    { value: 4, name: 'School Administrator' },
    { value: 5, name: 'School Coordinator' },
    { value: 6, name: 'Teacher' },
    { value: 7, name: 'Subject Teacher (e.g., English Teacher, Math Teacher, Science Teacher)' },
    { value: 8, name: 'Special Educator' },
    { value: 9, name: 'School Counselor' },
    { value: 10, name: 'Librarian' },
    { value: 11, name: 'Physical Education Teacher (PET)' },
    { value: 12, name: 'Lab Assistant' },
    { value: 13, name: 'Administrative Staff (e.g., Accountant, Office Assistant)' },
    { value: 14, name: 'IT Coordinator/IT Teacher' },
    { value: 15, name: 'Art Teacher' },
    { value: 16, name: 'Music Teacher' },
    { value: 17, name: 'Dance Teacher' },
    { value: 18, name: 'Sports Coach' }
];

const designationUniversityCollege = [
    { value: 1, name: 'Vice Chancellor' },
    { value: 2, name: 'Pro Vice-Chancellor' },
    { value: 3, name: 'Dean' },
    { value: 4, name: 'Head of Department (HOD)' },
    { value: 5, name: 'Professor' },
    { value: 6, name: 'Associate Professor' },
    { value: 7, name: 'Assistant Professor' },
    { value: 8, name: 'Lecturer' },
    { value: 9, name: 'Research Scholar' },
    { value: 10, name: 'Registrar' },
    { value: 11, name: 'Director (of specific schools, institutes, or centers)' },
    { value: 12, name: 'Librarian' },
    { value: 13, name: 'Student Advisor' },
    { value: 14, name: 'Administrative Staff (e.g., Accountant, Office Assistant)' },
    { value: 15, name: 'Laboratory Technician' },
    { value: 16, name: 'IT Coordinator/IT Faculty' },
    { value: 17, name: 'Physical Education Instructor (PEI)' },
    { value: 18, name: 'Career Counselor' },
    { value: 19, name: 'Placement Officer' },
    { value: 20, name: 'Research Assistant' },
];


const designationCoachingInstitute = [
    { value: 1, name: 'Director' },
    { value: 2, name: 'Academic Head' },
    { value: 3, name: 'Subject Experts/Faculty' },
    { value: 4, name: 'Teaching/Subject Mentor' },
    { value: 5, name: 'Content Developer' },
    { value: 6, name: 'Counselor' },
    { value: 7, name: 'Academic Coordinator' },
    { value: 8, name: 'Center Manager' },
    { value: 9, name: 'Marketing Manager' },
    { value: 10, name: 'Admission Counselor' },
    { value: 11, name: 'Front Office Executive' },
    { value: 12, name: 'Online Platform Manager' },
    { value: 13, name: 'Digital Marketing Executive' },
    { value: 14, name: 'Course Coordinator' },
    { value: 15, name: 'Administrative Staff' },
    { value: 16, name: 'Test Coordinator' },
    { value: 17, name: 'Research Analyst' },
    { value: 18, name: 'IT Support Specialist' },
    { value: 19, name: 'Online Content Moderator' },
    { value: 20, name: 'Online Learning Facilitator' },
];

const DuplicateInsDetail = [
    {
        id:1,
        insLogo:"./assets/Rectangle 3247.svg",
        institute_name:"FIT COLLEGE",
        no_of_student: 2100,
        address:"Mawana road buxcer MEERUT 233222",
        name:"Sahil gagan",
        designation:"Coordinator",
       email:"sahilgagan@gmail.com",
       Affiliation:"",
       medium_of_education :"English",
       phone:9766126613,
       website_link:" https://amcgroup.edu.in/"
    },
    {
        id:2,
        insLogo:"./assets/Rectangle 3247.svg",
        institute_name:"Administrative Management College",
        no_of_student: 2100,
        address:"AMC Campus, Bannerghatta Main Rd, Bengaluru, Karnataka 560083",
        name:"Saurabh Sharma",
        designation:"Principal",
        email:"shaileshsainee3450@gmail.com",
        Affiliation:"",
        medium_of_education :"English",
        phone:8419810848,
        website_link:" https://amcgroup.edu.in/"
        
    },
    {
        id:3,
        insLogo:"./assets/Rectangle 3247.svg",
        institute_name:"Ram LAl Aanand college",
        no_of_student: 2100,
        address:"AMC Campus, Bannerghatta Main Rd, Bengaluru,Motibag 560083",
        name:"Nitesh ",
        designation:"HOD",
        email:"sk19810848@gmail.com",
        Affiliation:"",
        medium_of_education :"English",
        phone:7398063450,
        website_link:" https://amcgroup.edu.in/"
    }
]