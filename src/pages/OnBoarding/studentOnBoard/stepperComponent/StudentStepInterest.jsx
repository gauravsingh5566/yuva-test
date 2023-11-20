import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import Select from 'react-select';
import { apiJson } from "api";
import { useGlobalContext } from "global/context";

  const interestTopic = [
    { name: "Health and Wellness", pick: false },
    { name: "Business and Entrepreneurship", pick: false },
    { name: "Sports and Athletics", pick: false },
    { name: "Science and Technology", pick: false },
    { name: "History and Historical Events", pick: false },
    { name: "Art and Creativity", pick: false },
    { name: "Travel and Adventure", pick: false },
    { name: "Environment and Sustainability", pick: false },
    { name: "Music and Entertainment", pick: false },
    { name: "Literature and Reading", pick: false },
    { name: "Cooking and Culinary Arts", pick: false },
    { name: "Fashion and Style", pick: false },
    { name: "Mathematics and Problem Solving", pick: false },
    { name: "Psychology and Mental Health", pick: false },
    { name: "Education and Learning", pick: false },
    { name: "Hobbies and Leisure Activities", pick: false },
    { name: "Current Events and News", pick: false },
  ]

  const activities = [
    { name: "Psychology and Mental Health", pick: false },
    { name: "Education and Learning", pick: false },
    { name: "Hobbies and Leisure Activities", pick: false },
    { name: "Current Events and News", pick: false },
    { name: "Social Issues and Activism", pick: false },
    { name: "Film and Cinema", pick: false },
    { name: "Nature and Wildlife", pick: false },
    { name: "Languages and Linguistics", pick: false },
    { name: "Home and Interior Design", pick: false },
    { name: "Automotive and Engineering", pick: false },
    { name: "Astronomy and Space Exploration", pick: false },
    { name: "Parenting and Family", pick: false },
    { name: "Fitness and Exercise", pick: false },
    { name: "Food and Nutrition", pick: false },
    { name: "Gaming and Game Development", pick: false },
    { name: "Photography and Visual Arts", pick: false },
    { name: "Pets and Animals", pick: false },
    { name: "Relationships and Dating", pick: false }
  ]


export const StudentStepInterest = () => {
  const {setUser, setToken} = useGlobalContext()
  const [tempStep, setTempStep] = useState(1)
   
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
    studentFormik,
    setStudenteData,
  } = useContext(OnBoardContext);

  const [interest, setInterest] = useState(interestTopic)
  const [activitiesArray, setactivitiesArray] = useState(activities)
  const [selectedInterest, setSelectedinterest] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])

  const handleInterest = (i) => {
    let array = [...interest];
    const object = { ...interest[i], pick: !interest[i].pick };
    array[i] = object;
    console.log(array);
  
    const numberOfTruePicks = array.filter((item) => item.pick === true).length;
  
    if (object.pick && numberOfTruePicks > 5) {
      return;
    }
  
    setInterest(array);
  };
  const getAllSelected = ()=>{
    const arr = interest?.filter((i)=>i.pick===true)
    setSelectedinterest(arr)

    const arr2 = activitiesArray?.filter((i)=>i.pick===true)
    setSelectedActivities(arr2)
    setStudenteData('interests',arr)
    setStudenteData('activities',arr2)
    
  }
  useEffect(()=>{
    getAllSelected()
  },[interest, activitiesArray])
 

  const handleActivities=  (i)=>{
    let array = [...activitiesArray]
    const object = {...activitiesArray[i], pick:!activitiesArray[i].pick}
    array[i] = object
    console.log(array)
    const numberOfTruePicks = array.filter((item) => item.pick === true).length;
  
    if (object.pick && numberOfTruePicks > 5) {
      return;
    }
    setactivitiesArray(array)
  }


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
  }




   if(tempStep===1){return (
    <>
      <div>
        <div className="mb-2">
            <span className=" fs-2 fw-semibold">Interests </span>
        </div>
        <div className="mb-4">
            <span
              className=""
              style={{
                color: "grey",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
            Help us to bring you best curated services for you
            </span>
          </div>

        <div>
                <div  className="mb-2">
                  <span  className="fs-6 fw-semibold">
                    Select any 5 top topics of interest for yourself
                  </span>
                </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            interest?.map((i,index)=>{
              return (
                <span onClick={()=>handleInterest(index)} className={`mx-2 my-2 px-2 py-1  cursor-pointer color-purple-dark rounded-4 ${i?.pick?'background-purple-dark':'background-purple'}`}>{i.name}</span>
              )
            })
          }
        </div>
        <div className="text-center">
          <span className="fw-500 color-blue-dark fs-14px" style={{color:'#0115c8',textDecoration:'underline'}}> {interest.filter(i=>i.pick===true).length} interests are selected</span>
        </div>

        <div className="d-flex justify-content-between mt-4 z-index-1">
          <button onClick={handleBack} className="btn-onboard">
            Previous
          </button>

          <button onClick={()=>setTempStep(2)} className="btn-onboard-fill">
            Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
          </button>
        </div>
      </div>
    </>
  )}else{
    return (
      <>
        <div>
          <div className="mb-2">
              <span className=" fs-2 fw-semibold">Activities</span>
          </div>
          <div className="mb-4">
              <span
                className=""
                style={{
                  color: "grey",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
              Help us to bring you best curated services for you
              </span>
            </div>
  
          <div>
                  <div className="mb-2">
                    <span className="fs-6 fw-semibold">
                    Select any 5 extra curriculum activities you like
                    </span>
                  </div>
          </div>
  
          <div className="d-flex flex-wrap">
            {
              activitiesArray?.map((i,index)=>{
                return (
                  <span onClick={()=>handleActivities(index)} className={`mx-2 my-2 px-2 py-1 cursor-pointer color-blue-dark rounded-4 ${i?.pick?'background-blue-dark':'background-blue'}`}>{i.name}</span>
                )
              })
            }
          </div>
          <div className="text-center">
          <span className="fw-500 color-blue-dark fs-14px" style={{color:'#0115c8',textDecoration:'underline'}}> {activitiesArray.filter(i=>i.pick===true).length} activities are selected</span>
        </div>
  
          <div className="d-flex justify-content-between mt-4 z-index-1">
            <button onClick={()=>setTempStep(1)} className="btn-onboard">
              Previous
            </button>
  
            <button onClick={handleNextChild} className="btn-onboard-fill">
              Next Step<span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
            </button>
          </div>
        </div>
      </>
    )
  }
}



