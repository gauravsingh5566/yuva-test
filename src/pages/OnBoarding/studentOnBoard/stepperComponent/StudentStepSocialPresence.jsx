import React, { useContext } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import { useState } from "react";

const socialHandles = [
  {   
      id : 1,
      url: 'facebook.com/',
      socialurls: /facebook\.com\/[a-zA-Z0-9_.-]+\/?/,
      icon: './images/social-new-icons/facebook.png',
  },
  {   
      id : 2,
      url: 'twitter.com/',
      socialurls: /twitter\.com\/[a-zA-Z0-9_.-]+\/?/,
      icon: './images/social-new-icons/twitter.png',
  },
  {   
      id : 3,
      url: 'linkedin.com/',
      socialurls: /linkedin\.com\/[a-zA-Z0-9_.-]+\/?/,
      icon: './images/social-new-icons/linkedin.png',
  },
  {   
      id : 4,
      url: 'instagram.com/',
      socialurls: /instagram\.com\/[a-zA-Z0-9_.-]+\/?/,
      icon: './images/social-new-icons/instagram.png',
  },
  {   
      id : 5,
      url: 'youtube.com/',
      socialurls: /youtube\.com\/[a-zA-Z0-9_.-]+\/?/,
      icon: './images/social-new-icons/youtube.png',
  },
]


export const StudentStepSocialPresence = () => {

    const {
        activeStep,
        setActiveStep,
        activeChildStep,
        setActiveChildStep,
        count,
        setCount,
        stepperArray,
      } = useContext(OnBoardContext);
    
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

    // const [url, setUrl] = useState('');
    // const [isValid, setIsValid] = useState(true);

    const [urls, setUrls] = useState(Array(socialHandles.length).fill(''));
  const [isValid, setIsValid] = useState(Array(socialHandles.length).fill(true));


  const validateURL = (inputURL) => {
    // Regular expression for a simple URL validation
    const urlPattern = /^(?!(https?:\/\/|www\.))[a-zA-Z]+\.[^\s/$.?#][^\s]*$/;
    return urlPattern.test(inputURL);
  };

// ************To check URL validation************
const handleURLChange = (e,index) => {
  // const inputURL = e.target.value;
  // setUrl(inputURL);

  // if (inputURL === '' || validateURL(inputURL)) {
  //   setIsValid(true);
  // } else {
  //   setIsValid(false);
  // }

  const inputURL = e.target.value;
  const newUrls = [...urls];
  newUrls[index] = inputURL;
  setUrls(newUrls);

  const newIsValid = [...isValid];
  if (inputURL === '' || socialHandles[index].socialurls.test(inputURL)) {
    newIsValid[index] = true;
  } else {
    newIsValid[index] = false;
  }
  setIsValid(newIsValid);
};


  return (
    <>
       <div>
                <div className="mb-2">
                    <span className=" fs-35px fw-600">Social Media</span>
                </div>
                <div >
                    <div className="mb-4">
                        <span
                            className="fs-19px fw-500 color-grey"
                        >
Expand your network and showcase achievements through integrated social media connections.                        </span>
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <span className="fs-19px fw-500">
                        Add your Social Media Accounts (Optional)                        </span>
                    </div>

                    <div className="col-8 col-sm-6 col-md-6 col-lg-5">
                        {
                            socialHandles?.map((s, index) => {
                                return (
                                    <div className="cursor-pointer mb-4 ">
                                        <div className="d-flex align-items-center ">
                                            <div className=" me-3 rounded-3 p-2 background-purple" style={{ height: '50px' }}>
                                                <img className=" rounded-3 h-100 " src={s.icon} alt='img' />
                                            </div>
                                            <div className="">
                                                <input className="fs-19px fw-400 form-control background-grey border-0 box-shadow-0 rounded-3 " placeholder={s.url} type='text' value={urls[index]}  onChange={(e)=>handleURLChange(e,index)}/>
                                                <div>
                                            {isValid[index] ? null : <span className="error text-danger">Invalid URL</span>}
                                            </div>
                                            </div>

                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={handleBack} className="btn-onboard">
                        Previous
                    </button>

                    <button  onClick={() => {
                    if (urls.every((url,i) => url === '' || isValid[i])) {
                      handleNextChild();
                    }
                  }}
                  className="btn-onboard-fill">
                        <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                    </button>
                </div>
            </div>
    </>
  );
};
