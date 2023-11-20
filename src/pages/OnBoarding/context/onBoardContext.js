import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import React, { createContext, useContext, useState } from 'react';
import * as Yup from 'yup';

const OnBoardContext = createContext();

export const useMyContext = () => {
  return useContext(OnBoardContext);
};

export const MyContextProvider = ({ children }) => {
  const {userData} = useGlobalContext()
  const [activeStep, setActiveStep] = useState(0);
  const [activeChildStep, setActiveChildStep] = useState(0);
  const [count, setCount] = useState(0);
  const [stepperArray, setStepperArray] = useState([])
  const [modalStep, setModalStep] = useState(0)
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)
  const [selectedDesignation, setSelectedDesignation] = useState('')
  const [instituteAddress, setInstituteAddress] = useState({})
  const [dropdownType, setdropdownType] = useState([])
  const [showDesList, setShowDesList] = useState([])
  
  const userDetail = useFormik({
    initialValues:{
      email:'',
      type:'',

    }
  })

  // student/teahcer formik data
  const studentFormik = useFormik({
    initialValues:{
      institution_name:'',
      email:userData?.email || "",
      password:'',
      institute_id:'',
      activities:'',
      experience:'',
      interests:'',
      curriculum:'',
      achievements:'',
      profile:'',
      website:'',
      facebook_acc:'',
      twitter_acc:'',
      linkedin_acc:'',
      insta_acc:'',
      youtube_acc:'',
      first_name:'',
      last_name:'',
      gender:'',
      phone:'',
      date_of_birth:'',
      student_verification:false,
    },
    // validationSchema:validation,
    
  })
// set student formik data
  const setStudenteData = (name, value)=>{
    studentFormik.setFieldValue(name,value)
  }


const onSubmit = () => {
  handleNextChild()
}

// institute formik data
  const instituteFormik = useFormik({
    initialValues:{
      institution_name:'',
      email:userData?.email || "",
      password:'',
      type_of_inst:'',
      type_of_college:'',
      education_board:'',
      udise_code:'',
      medium_of_education:'English',
      otherCollege:'',
      bio:'',
      country:'India',
      state:'',
      street:'',
      city:'',
      logo:'',
      pinCode:'',
      website:'',
      facebook_acc:'',
      twitter_acc:'',
      linkedin_acc:'',
      insta_acc:'',
      youtube_acc:'',
      proof_of_id:'',
      proof_of_address:'',
      proof_of_id_file:'',
      proof_of_address_file:'',
      account_manager : [],
      first_name:'',
      last_name:'',
      admin_country: '',
        admin_state: '',
        admin_street: '',
        admin_city: '',
        admin_pincode: '',
      designation:'',
      phone:'',
      student_verification:false,
    },
    // validationSchema:validation,
    onSubmit
  })

  // set institute formik data
  const setInstituteData = (name, value)=>{
    instituteFormik.setFieldValue(name,value)
  }

  const setFormikData = (name, value)=>{
    userDetail.setFieldValue(name,value)
  }

  const handleShowDuplicateWarning =()=>{
    setShowDuplicateWarning(true)
  }
  const handleHideDuplicateWarning = ()=>{
    setShowDuplicateWarning(false)
  }
  const handleNextModalStep = ()=>{
      setModalStep(modalStep+1)
  }

    const handleBack = () => {
    setActiveChildStep(activeChildStep - 1);
    if (activeChildStep <= 0) {
      setCount(count - 1);
      setActiveStep(activeStep - 1);
      setActiveChildStep(0);
      
    }
    
   if(count!==0){
    if (activeChildStep < 0 || (count-1)<0 ||(activeStep-1) < 0) {
      setActiveStep(0);
      setActiveChildStep(0);
      setCount(0)
    }
   }

    console.log("active", activeStep, " activechild", activeChildStep, " ");
  };
  const handleNextChild = () => {
    setActiveChildStep(activeChildStep + 1);
    console.log("inside the handle change")
    if (activeChildStep >= stepperArray[count]?.childStep?.length-1 ) {
      setActiveStep(activeStep+1)
      setCount(count+1)
      setActiveChildStep(0)
      console.log("active step", activeStep , 'stepperlength', stepperArray.length)
    }
    console.log("activeChildStep", activeChildStep);
    console.log("this is length", stepperArray?.length)
    console.log("active step ", activeStep,"stepperArray", stepperArray.length)
    
  };

  const contextValue = {
    setStudenteData,
    studentFormik,
    instituteFormik,
    // instituteFormik,
    setInstituteData,
    userDetail,
    dropdownType, setdropdownType,
    showDesList, setShowDesList,
    setFormikData,
    setInstituteAddress,
    instituteAddress,
    selectedDesignation,
    setSelectedDesignation,
    handleHideDuplicateWarning,
    handleShowDuplicateWarning,
    showDuplicateWarning, 
    setShowDuplicateWarning,
    handleNextModalStep,
    modalStep,
    setModalStep,
    handleBack,
   activeStep,
   setActiveStep,
   activeChildStep,
   setActiveChildStep,
   count,
   setCount,
   setStepperArray,
   stepperArray,
   handleNextChild,
  }



  return (
    <OnBoardContext.Provider value={contextValue} >
      {children}
    </OnBoardContext.Provider>
  );
};



export default OnBoardContext;