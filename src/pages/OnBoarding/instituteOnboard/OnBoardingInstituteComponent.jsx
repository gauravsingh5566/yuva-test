import React, { useContext } from 'react'
import { AllStepInstitute } from './stepperComponent';
import OnBoardContext from '../context/onBoardContext';

export const OnBoardingInstituteComponent = () => {

  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
  } = useContext(OnBoardContext);

  const renderStep = ()=>{
    return (
      <AllStepInstitute/>
    )
  }

  return (
   <>
     <div className="card border-0">
        <div className="card-body">{renderStep()}</div>
      </div>
   </>
  )
}
