import React, { useContext, useEffect, useState } from "react";
import OnBoardContext from "../context/onBoardContext";
import { Step0, StudentStepAchievement, StudentStepAppearance, StudentStepConnect, StudentStepCuriculum, StudentStepExperience, StudentStepInterest, StudentStepQualification, StudentStepSkills, StudentStepSocialPresence, StudentStepSpecialization, StudentStepUnderReview, StudentStepCongratulations } from "./stepperComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "global/context";
// import { StudentStepSocialPresence } from "./stepperComponent/StudentStepSocialPresence";

export const OnBoardingStudentComponent = () => {
  const {userData} = useGlobalContext()
  const navigate = useNavigate()
  const isTeacher = useLocation().pathname.includes('teacher-on-boarding')
  const isStudent = useLocation().pathname.includes('student-on-boarding')
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
  } = useContext(OnBoardContext);
    
 useEffect(()=>{
  if(userData.onBoardStatus===true && userData.reviewStatus===false){
    setActiveStep(3)
    setActiveChildStep(0)
  }
  if(userData.onBoardStatus===true && userData.reviewStatus===true){
    navigate('/new-dashboard')
  }
 },[userData])

  const [step, setStep] = useState(0);

  const handleBack = () => {
    setActiveChildStep(activeChildStep - 1);
    if (activeChildStep <= 0) {
      setCount(count - 1);
      setActiveStep(activeStep - 1);
      setActiveChildStep(0);
    }
    if (activeStep < 0) {
      setActiveStep(0);
    }
    if (activeChildStep < 0) {
      setActiveChildStep(0);
    }
    console.log("active", activeStep, " activechild", activeChildStep, " ");
  };

  const handleNextChild = () => {
    setActiveChildStep(activeChildStep + 1);

    if (activeChildStep >= stepperArray[count]?.childStep?.length - 1) {
      setActiveStep(activeStep + 1);
      setCount(count + 1);
      setActiveChildStep(0);
      console.log(
        "active step",
        activeStep,
        "stepperlength",
        stepperArray.length
      );
      if (activeStep > stepperArray.length - 2) {
        console.log("inside the if condition");
        setCount(0);
        setActiveStep(0);
        setActiveChildStep(0);
      }
    }
    // if(activeStep>=stepperArray?.length-1){
    //   console.log("active step ", activeStep,"stepperArraydddddddddddddd", stepperArray.length)
    //   setActiveStep(0)
    //   setCount(0)
    // }
    console.log("this is length", stepperArray?.length);
    console.log(
      "active step ",
      activeStep,
      "stepperArray",
      stepperArray.length
    );
  };

  const handleReset = () => {
    setActiveStep(0);
    setActiveChildStep(0);
    setCount(0);
  };

  const renderStep = () => {
    switch (true) {
      case activeStep === 0 && activeChildStep === 0:
        return (
          <div>
            <Step0 />
          </div>
        );
      case activeStep === 0 && activeChildStep === 1:
        return (
          <div>
            <StudentStepAppearance />
          </div>
        );
      case activeStep === 0 && activeChildStep === 2:
      return (
        <div>
          <StudentStepSocialPresence />
        </div>
      );
      case activeStep === 1 && activeChildStep === 0:
      return (
        <div>
          <StudentStepConnect />
        </div>
      );
      case activeStep === 1 && activeChildStep === 1 && isStudent:
      return (
        <div>
          <StudentStepCuriculum />
        </div>
      );
      case activeStep === 1 && activeChildStep === 1 && isTeacher:
      return (
        <div>
          <StudentStepQualification />
        </div>
      );
      case activeStep === 1 && activeChildStep === 2 && isTeacher:
        return (
          <div>
            <StudentStepSpecialization />
          </div>
        );

      case activeStep === 2 && activeChildStep === 0:
      return (
        <div>
          <StudentStepInterest />
        </div>
      );

      case activeStep === 2 && activeChildStep === 1:
      return (
        <div>
          <StudentStepExperience />
        </div>
      );

      case activeStep === 2 && activeChildStep === 2 && isStudent:
      return (
        <div>
          <StudentStepAchievement />
        </div>
      );
      case activeStep === 2 && activeChildStep === 2 && isTeacher:
      return (
        <div>
          <StudentStepSkills />
        </div>
      );

      case activeStep === 3 && activeChildStep === 0:
        return (
          <div>
            <StudentStepUnderReview />
          </div>
        );

      case activeStep === 3 && activeChildStep === 1 && isTeacher:
        return (
          <div>
            <StudentStepCongratulations/>
          </div>
        );


      default:
        // Handle other cases or provide a default component
        return null;
    }
  };
  return (
    <>
      <div className="card border-0">
        <div className="card-body">{renderStep()}</div>
      </div>
    </>
  );
};
