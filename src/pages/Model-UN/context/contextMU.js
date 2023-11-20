
import { apiJson, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as yup from "yup"

export const MUContext = createContext();

export const useMyContext = () => {
    return useContext(MUContext);
  };

export const MyContextProvider = ({ children }) => {
  const { userData } = useGlobalContext()
  const [stepCount, setStepCount] = useState(1);
  const [getAllCommiteeList,setAllCommiteeList] = useState([])
  const [eventDetail, setEventDetail] = useState({})
  const geteventDetail = ()=>{
    apiJson('api/v2/modelUn-student/getEventDetails/institute/'+userData?.instituteId)
    .then((res)=>{
      setEventDetail(res.data.result)
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
  useEffect(()=>{
    geteventDetail()
  },[])
  const validationSchema = yup.object().shape({
    pref_committee: yup.string().required('Please select a committee')
  })
  //=== Fetch all commitee by Institute Id  for commitee select ======== \\\
  const studentFormik = useFormik({
    initialValues : {
      studentId:'',
      instituteId:'',
      model_un_register_id:'',
      committeeId:'',
      pref_country:'',
      pref_role:'',
      pref_committee:'',
      secretariatsId:'',
      pressCorpsId:'',
    },
    validationSchema,
   
  })
  const setStudentFormik = (name, value)=>{
    studentFormik.setFieldValue(name, value)
  }

  const getAllCommitee = async()=>{
    try {
      const getCommiteeList = await apiJsonAuth.get(`/api/v2/modelUn-student/getAllCommittee/${userData?.instituteId}`)
      setAllCommiteeList(getCommiteeList?.data?.allSelectedCommittee)
     
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
  if(userData?.instituteId){
    getAllCommitee();
  }
  }, [])
  const values= { 
    stepCount,
    setStepCount,getAllCommiteeList,setAllCommiteeList,studentFormik,setStudentFormik,eventDetail,setEventDetail
 }
  return (
    <MUContext.Provider value={values}>
      {children}
    </MUContext.Provider>
  );
};

// export { MUContext, MyContextProvider };