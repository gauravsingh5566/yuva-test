import React, { createContext, useContext, useEffect, useState } from 'react';

import { Card } from 'react-bootstrap'
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OnBoardContext, { useMyContext } from "../context/onBoardContext";
import { OnBoardingStudentSidebarNav } from '.';
import { StudentMainStep } from '../studentOnBoard';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstituteMainStep } from '../instituteOnboard';
import { useGlobalContext } from 'global/context';
// import { OnBoardingStudentSidebarNav } from '.';
// import { OnBoardingStudentSidebarNav } from '.';


export const OnBoardingStudentSidebar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const {removeToken, removeUser} = useGlobalContext()
  const student = location.pathname.includes('student-on-boarding')
  const teacher = location.pathname.includes('teacher-on-boarding')
  const institute = location.pathname.includes('institute-on-boarding')

  return (
    <>
      
      <div >
        <Card className=' shadow-lg border-0' style={{borderRadius:'0 49px 49px 0', minHeight:'100vh'}}>
          <Card.Body className='h-100'>
              <div className='mb-4  mt-3'>
                <OnBoardingStudentSidebarNav/>
              </div>
              <div className='d-flex flex-column justify-content-between ms-3 ' style={{minHeight:'83vh'}} >
                  <div className='user-select-none'>
                    {(student || teacher)? <StudentMainStep/> :institute?<InstituteMainStep/>:null}
                  </div>
                <div className='d-flex ms-3 ' >
                    <span className='me-2 d-block'><img src='./images/onBoarding/logout-icon.png'/></span>
                    <span onClick={()=>{
                      navigate('/login')
                      removeUser()
                      removeToken()
                      }} style={{color:'#000D80'}} className='fs-17px fw-600 cursor-pointer'>Logout</span>
                </div>
              </div>
            
          </Card.Body>
        </Card>
      </div>    
    
    </>
  )
}


