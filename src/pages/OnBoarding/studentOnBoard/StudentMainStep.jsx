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
import { useLocation } from 'react-router-dom';


const academicsChildsteps = [
    {
      label: "Connect Institute",
    },
    {
      label: "Curricullum",
    },
    
  ];
  const academicsChildstepsTeacher = [
    {
      label: "Connect Institute",
    },
    {
      label: "Qualification",
    },
    {
      label: "Specialization",
    },
    
  ];
  
  const additionalDetailChildsteps = [
    {
      label: "Interest and Activities",
    },
    {
      label: "Experience",
    },
    {
      label: "Achievements",
    }
  ];
  const additionalDetailChildstepsTeacher = [
    {
      label: "Interest and Activities",
    },
    {
      label: "Experience",
    },
    {
      label: "Skills",
    }
  ];
  const doneChildsteps = [
    {
      label: "Under Review",
    },
    
  ];
  const doneChildstepsTeacher = [
    {
      label: "Under Review",
    },
    {
      label: "congratulation",
    },
    
  ];
  
  const childsteps = [
    {
      label: "About You",
    },
    {
      label: "Appearance",
    },
    {
      label: "Social Presence",
    }
  ];
  
  const steps = [
    {
      label: "Personal Details",
      no:1,
      childStep:childsteps,
    },
    {
      label: "Academics Details",
      no:2,
      childStep:academicsChildsteps,
    }, 
    {
      label: "Additional Details",
      no:3,
      childStep:additionalDetailChildsteps,
    },
    {
      label: "Done",
      no:4,
      childStep:doneChildsteps,
    }
  
  ];

  const stepsTeacher = [
    {
      label: "Personal Details",
      no:1,
      childStep:childsteps,
    },
    {
      label: "Academics Details",
      no:2,
      childStep:academicsChildstepsTeacher,
    }, 
    {
      label: "Additional Details",
      no:3,
      childStep:additionalDetailChildstepsTeacher,
    },
    {
      label: "Done",
      no:4,
      childStep:doneChildstepsTeacher,
    }
  
  ];
export const StudentMainStep = () => {

  const location = useLocation()
  const student = location.pathname.includes('student-on-boarding')
  const teacher = location.pathname.includes('teacher-on-boarding')
    
  const {
    activeStep,
   setActiveStep,
   activeChildStep,
   setActiveChildStep,
   count,
   setCount,
   setStepperArray,
  } = useContext(OnBoardContext)
  
  useEffect(()=>{
    if(student){
      setStepperArray(steps)
    }else if(teacher){
      setStepperArray(stepsTeacher)
    }
  },[])
   
  const handleNextChild = () => {
    setActiveChildStep(activeChildStep + 1);
    if (activeChildStep >= steps.length - 2) {
      setActiveStep(activeStep + 1);
      if (count >2) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
      setActiveChildStep(0);
    }
    console.log("this is count", count)
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setActiveChildStep(0);
    setCount(0);
  };
  const handleBack = () => {
    setActiveChildStep(activeChildStep - 1);
    if(activeChildStep<=0){
      setCount(count-1)
      setActiveStep(activeStep - 1);
      setActiveChildStep(0)
    }
    if(activeStep<0){
      setActiveStep(0)
    }
    if(activeChildStep<0){
      setActiveChildStep(0)
    }
    console.log('active', activeStep, ' activechild', activeChildStep, ' ')
  };
   
  


  useEffect(()=>{
    setActiveStep(0)
    setActiveChildStep(0)
    setCount(0)
  },[])
  
  return (
    <>
          <div className='container mt-4'>
            <Stepper activeStep={activeStep} orientation="vertical">
            {(student?steps:teacher?stepsTeacher:null)?.map((step, index) => (
              <Step className='mb-3' key={step?.label}>
              <div className='d-flex'>
              <span className='on-board-badge d-flex align-items-center justify-content-center me-2'>{(activeStep+1)>step?.no?<img src='./images/social-icons/greentick.png'/>: step?.no} </span>
              <span className='fs-6 fw-500' style={{color:(activeStep+1)>step?.no?'#B8B8B8':(activeStep+1===step?.no)?"#0F27FF":'#777777'}}>{step?.label}</span>
              </div>
                <div className='ms-50 mt-3'>
                  {student ?<Stepper activeStep={activeChildStep} orientation="vertical">
                  {step.label === steps[count]?.label
                    ? (count===0 ?childsteps
                      :count===1 ?academicsChildsteps
                      :count===2 ?additionalDetailChildsteps
                      :count===3 ?doneChildsteps
                      :null
                    )?.map((child, index) => (
                        <Step key={child?.label}>
                        <div className='d-flex justify-content-between'>
                            <span className='fs-17px fw-500 d-block mb-3'
                            style={{color:(activeChildStep)===index?"black":'#B7B7B7'}}>
                            {child?.label}
                            </span>
                          {(activeChildStep)===index &&
                            <span>
                              <img src='./images/onBoarding/right-icon2.png' />
                            </span>
                          }
                          </div>
                          
                        </Step>
                      ))
                    : null}
                </Stepper>
                
                :
                <Stepper activeStep={activeChildStep} orientation="vertical">
                  {step.label === stepsTeacher[count]?.label
                    ? (count===0 ?childsteps
                      :count===1 ?academicsChildstepsTeacher
                      :count===2 ?additionalDetailChildstepsTeacher
                      :count===3 ?doneChildsteps
                      :null
                    )?.map((child, index) => (
                        <Step key={child?.label}>
                        <div className='d-flex justify-content-between'>
                            <span className='fs-17px fw-500 d-block mb-3'
                            style={{color:(activeChildStep)===index?"black":'#B7B7B7'}}>
                            {child?.label}
                            </span>
                          {(activeChildStep)===index &&
                            <span>
                              <img src='./images/onBoarding/right-icon2.png' />
                            </span>
                          }
                          </div>
                          
                        </Step>
                      ))
                    : null}
                </Stepper>
                
                }
                  </div>
               
              </Step>
            ))}
          </Stepper>
        
            </div>
    </>
  )
}
