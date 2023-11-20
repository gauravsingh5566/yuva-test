import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFormik, Form } from 'formik';
import * as yup from "yup"
import { apiJson, apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';

const ModelUnContext = createContext();

export const useMyContext = () => {
  return useContext(ModelUnContext);
};

export const MyContextProvider = ({ children }) => {

  const validationSchema = yup.object().shape({
    eventType : yup.string().required("ChooseEvent is required"), 
    chooseFormat : yup.string().required("ChooseFormat is required"), 
    // eventTheme: yup.string().required("EventTheme is required"),
    // subTheme: yup.string().required("SubTheme is required"),
    // committee: yup.string().required("Committee is required"),
    // positions: yup.string().required("Positions is required"),
    lastDateRegis: yup.string().required("LastDate of Registration is required"),
    lastDateEvent: yup.string().required("LastDate of Event is required"),
    venue:yup.string().required("Please Provide the vanue name."),
    event_time:yup.string().required(),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [eventTheme, setEventTheme] = useState([]);
  const [subTheme, setSubTheme] = useState([]);
  const [format, setFormat] = useState([]);

  const {userData} = useGlobalContext()


  const formik = useFormik({
    initialValues : {
      eventType : "Intra Institutional",
      chooseFormat : "IMission Life",
      eventTheme : "",
      subTheme : "",
      slectedCommittee : [],
      lastDateRegis : "",
      lastDateEvent : "",
      venue:"",
      event_time:"1:00",
    },
    validationSchema,
  onSubmit : async(values, action) =>{
    console.log(values);
      try {
        const data={
          event_type:values.eventType,
    format:values.chooseFormat,
    event_theme:values.eventTheme,
    sub_theme:values.subTheme,
    last_date:values.lastDateRegis,
    venue:values?.venue,
    event_time:values?.event_time,
    date_proposed:values.lastDateEvent,
    slectedCommittee:values.slectedCommittee
        }
        const res = await apiJsonAuth.post(`api/v2/modelUn-institute/register/${userData?.id}`,data)
        console.log("res", res.data)
        // action.resetForm();
      } catch (error) {
        console.log("error", error);
      }
    } 
  })
  const setUnData = (name, value)=>{
    formik.setFieldValue(name, value)
  }

  const studentFormik = useFormik({
    initialValues : {
      committeeId:'',
      pref_country:'',
      pref_role:'',
      pref_committee:'',
      secretariatsId:'',
      pressCorpsId:'',
    },
   
  })
  const setStudentFormik = (name, value)=>{
    studentFormik.setFieldValue(name, value)
  }
  

  // GetAllTheme
  const getAllTheme = async() =>{
    try {
      const res = await apiJsonAuth.get('api/v2/modelUn-institute/gettheme')
        // console.log("alldata",res.data.result)
        setEventTheme(res?.data?.result)
    } catch (error) {
      console.log(error);
    }
  }

  // GetSubTheme
  const getSubTheme = async() =>{
    try {
      const res = await apiJsonAuth.get('api/v2/modelUn-institute/getsubtheme')
        // console.log("alldata",res.data.result[0].dataValues)
        setSubTheme(res?.data?.result)
    } catch (error) {
      console.log(error);
    }
  }

  // GetFormat
  const getFormat = async() =>{
    try {
      const res = await apiJsonAuth.get('api/v2/modelUn-institute/getformat')
        // console.log("alldata",res.data.result)
        setFormat(res?.data?.result)
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(eventTheme);

  useEffect(()=>{
    getFormat()
    getAllTheme();
    getSubTheme();
  },[])

  const contextValue = {
   currentStep,
   setCurrentStep,
   formik,
   eventTheme,
   subTheme,
   format,
   setUnData,
   studentFormik,setStudentFormik
  }

  return (
    <ModelUnContext.Provider value={contextValue} >
      {children}
    </ModelUnContext.Provider>
  );
};



export default ModelUnContext;

// { 
//   "eventcoordinators" : [{
//     "name" :"nitesh",
//     "designation" : "Teacher",
//     "email" : "nitesh@gmail",
//     "phone" : 1234567895,
//     "typeOfCoordinator" : "Modearator",
//     "role" : "teacher"
//   },
//   {
//     "name" :"nitesh",
//     "designation" : "Teacher",
//     "email" : "nitesh@gmail",
//     "phone" : 1234567895,
//     "typeOfCoordinator" : "Modearator",
//     "role" : "teacher"
//   },
//   {
//     "name" :"nitesh",
//     "designation" : "Teacher",
//     "email" : "nitesh@gmail",
//     "phone" : 1234567895,
//     "typeOfCoordinator" : "Modearator",
//     "role" : "teacher"
//   }
//   ]
// }