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


const DetailsChildsteps = [
  {
    label: "Institution",
    validation:"validationInst1"
  },
  {
    label: "About Institute",
    validation:"validationInst1"

  },
  {
    label: "Registered Address",
    validation:"validationInst1"

  },
  {
    label: "Appearance",
    validation:"validationInst1"

  },
  {
    label: "Social Presence",
    validation:"validationInst1"

  },
  {
    label: "Documents",
    validation:"validationInst1"

  },
  
];


const ContactDetail = [
  {
    label: "About You",
  },
  {
    label: "Mailing Address",
  },
  
];

const coordinators = [
  {
    label: "Add Coordinators",
  },
  
];

const Settings = [
  {
    label: "Preferences",
  },
  {
    label: "Create Password",
  },
  
];
const done = [
  {
    label: "Done",
  },
  
  
];


const steps = [
  {
    label: "Institute Details",
    no:1,
    childStep:DetailsChildsteps,
  },
  {
    label: "Contact Details",
    no:2,
    childStep:ContactDetail,
  }, 
  {
    label: "Coordinators",
    no:3,
    childStep:coordinators,
  },
  {
    label: "Settings",
    no:4,
    childStep:Settings,
  },
  {
    label: "Done",
    no:5,
    childStep:done,
  }

];
export const InstituteMainStep = () => {

  

    
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
    setStepperArray(steps)
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
            {steps?.map((step, index) => (
              <Step className='mb-3' key={step?.label}>
               <div className='d-flex '>
                  <span className='on-board-badge d-flex align-items-center justify-content-center me-2'>{(activeStep+1)>step?.no?<img src='./images/social-icons/greentick.png'/>: step?.no} </span>
                  <span className='fs-6 fw-500' style={{color:(activeStep+1)>step?.no?'#B8B8B8':(activeStep+1===step?.no)?"#0F27FF":'#777777'}}>{step?.label}</span>
               </div>
                <div className='ms-50 mt-3'>
                  <Stepper activeStep={activeChildStep} orientation="vertical">
                  {step.label === steps[count]?.label
                    ? (count===0 ?DetailsChildsteps
                      :count===1 ?ContactDetail
                      :count===2 ?coordinators
                      :count===3 ?Settings
                      :count===4 ?done
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
                  </div>
               
              </Step>
            ))}
          </Stepper>
        
            </div>
    </>
  )
}
