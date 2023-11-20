import OnBoardContext from 'pages/OnBoarding/context/onBoardContext';
import React, { useContext, useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

const admins  =[
    {
      name:'Danish Kamal', 
      designation:'Principal',
    },
   
    {
      name:'Saurabh Sharma', 
      designation:'Principal',
    },
  ]
  
  const moderators = [
    {
      name:'Saurabh Sharma',
      designation:'Teacher',
    },
    {
      name:'Sahil Gagan',
      designation:'Teacher',
    },
    {
      name:'Santosh ',
      designation:'Teacher',
    },
    {
      name:'Shivam Tiwari',
      designation:'Teacher',
    },
  ]

export const StudentStepCongratulations = () => {
    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
      } = useContext(OnBoardContext);
    
      const [selectedOption, setSelectedOption] = useState({});
    
    const handleSelectChange = (option) => {
      setSelectedOption(option);
    };
    
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
      return (
        <>
           <div className="">
    
    <div className='d-flex' style={{ height: "65px"}}>
    <div className="">
      <span className=" fs-35px fw-600">Congratulations</span>
    </div>
    <div style={{position: "relative", top: "-30px"}}><img style={{top: "-100"}} src="./modelUn/Confetti.png" alt="" /></div>
    </div>
    
        <div>
          <span
            className=""
            style={{
            //   color: "#989898",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
              Thankyou for completing a our onboarding <br /> process.
          </span>
        </div>

            <div className='mt-4'>
                <span  style={{
              fontSize: "20px",
              fontWeight: "500",
            }}>If you need any guidance, you can find <br /> your coordinators details below</span>
            </div>
    
            <div>
              <div className="mt-3 mb-4">
                <span className="fw-500s md-4 fs-19px " style={{
                }}>Admin</span>
                <div className="mt-4">
                  {
                    admins?.map((a)=>{
                      return <>
                        <div className="row justify-content-between mb-4 ms-4">
                            <div className="col-4">
                              <span style={{fontWeight:'500',color:'#300095'}} className="me-4 ">{a.name}</span>
                            </div>
                            <div className="col-4">
                            <span style={{color:'#7B5EA1'}}>{a.designation}</span>
                            </div>
                          <div className="col-4">
                              <div className="d-flex">
                                <div className="me-4 cursor-pointer"><MailIcon style={{color:'#FAB400'}}/></div>
                                <div className="cursor-pointer"><PhoneIcon style={{color:'#1300F3'}} /></div>
                              </div>
                          </div>
                        </div>
                      </>
                    })
                  }
                </div>
              </div>
              <div className="mb-50">
                <div className="mb-4">
                  <span className="fw-500 fs-19px">Moderators</span>
                </div>
                <div>
                  {
                    moderators?.map((m)=>{
                      return (
                        <div className="row justify-content-between mb-4 ms-4">
                            <div className="col-4">
                              <span className="me-4" style={{fontWeight:'500',color:'#300095'}}>{m.name}</span>
                            </div>
                           <div className="col-4">
                            <span style={{color:'#7B5EA1'}}>{m.designation}</span>
                           </div>
                          <div className="col-4">
                          <div className="d-flex ">
                              <div className="me-4">
                                <span className="cursor-pointer"><MailIcon style={{color:'#FAB400'}}/></span>
                              </div>
                              <div>
                                <span className="cursor-pointer" ><PhoneIcon style={{color:'#1300F3'}}/></span>
                              </div>
                          </div>
                          </div>
    
                        </div>
                      )
                    })
    
                  }
                </div>
              </div>
            </div>
        
      <div className="d-flex justify-content-between mt-4 z-index-1 ">
        <button onClick={handleBack} className="btn-onboard-disabled" disabled style={{color: "#AAAAAA", fontSize: "19px" ,fontWeight: "500"}}>
        Previous Step
        </button>
    
        <button onClick={handleNextChild} className="btn-onboard-fill-disabled" disabled>
        Go to dashboard <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
        </button>
      </div>
    </div>
        </>
      )
}
