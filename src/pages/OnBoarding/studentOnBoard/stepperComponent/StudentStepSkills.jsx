import React, { useContext, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import Select from 'react-select';
import { apiJson } from "api";
import { useGlobalContext } from "global/context";

const subjects=[
    {
        name:'Patience',
    },
    {
        name:'Technology Integration',
    },
    {
        name:'Communication Skills Classroom Management Subject Knowledge Adaptability',
    },
]

const classes = [
  {
    value:'1',
    name:'Engineering and Technology',
  },
  {
    value:'2',
    name:'Architecture and Planning',
  },
  {
    value:'3',
    name:'Mass Communication and Media Computer Applications',
  },
  {
    value:'4',
    name:'Architecture and Planning',
  },
]
export const StudentStepSkills = () => {

  const {setUser, setToken, userData} = useGlobalContext()
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
    studentFormik,
  } = useContext(OnBoardContext);

  const [selectedOption, setSelectedOption] = useState({});

  const handleSubmitOnboardData = ()=>{
    apiJson.put('v2/register/student/on-board-data',{...studentFormik.values,role:userData.role})
    .then((res)=>{
      setUser(res.data.user)
      setToken(res.data.token)
    }).then(()=>{
      handleNextChild()
    }).catch((error)=>{
      console.log(error.message)
    })
  } 


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

  const [skillsForm, setSkillsForm] = useState({
    skills: ""
  });
const [skillsData, setSkillsData] = useState([]);

  const handleChange = (selectSkill)=>{
    setSkillsForm({
      ...skillsForm, skills : selectSkill?.name
    })
  }

  const handleSubmitSkills = () =>{
    if(skillsForm?.skills){
      const skillExit = skillsData?.some((ele)=> ele.skills === skillsForm?.skills)
      
      if(!skillExit){
        const temp = [...skillsData, skillsForm];
        if(skillsData.length < 3){
          setSkillsData(temp);
        }
        setSkillsForm({
          skills: ""
        })
      }
    }
  }
  
  const handleDelete = (id) =>{
    let temp = [...skillsData];
    temp.splice(id, 1);
    setSkillsData(temp)
  }



  return (
   <>
       <div>
        <div className="mb-2">
          <span className=" fs-35px fw-600">Skills</span>
        </div>
        <div >
          <div className="mb-4">
            <span
              className=""
              style={{
                color: "#989898",
                fontSize: "19px",
                fontWeight: "500",
              }}
            >
           Details of your skills
            </span>
          </div>
        </div>

       <div className="outer-div-for-select">
        <div className="mb-4 col-8">
            <div>
                <div className="mb-2">
                  <span className="fs-19 fw-500">
                  Select up to 3 subjects taught by you
                  </span>
                </div>
            </div>
            <div className="" onClick={handleSubmitSkills()}>
                  <Select
                  onChange={(selectSkill)=> {
                    handleChange(selectSkill)
                  }}
                    styles={customStyles}
                      options={classes}
                      defaultValue={classes[0]}
                      getOptionLabel={(option)=>{
                          return (
                            <>
                              <div className="mb-2 d-flex z-index-1">
                                <span>
                                  {option.name}
                                </span>
                              </div>
                            </>
                          )
                        }
                      }
                  />
                    
            </div>
        </div>
        <div className="mb-4 col-8">
            <div>
                <div className="mb-4">
                <span className="fs-19px fw-500">
                Selected Skills
                  </span>
                </div>
                <div>
                    {
                        skillsData?.map((s, id)=>{
                            return (
                                <div key={id} style={{
                                    background:'#F9F9F9',
                                }} className="ms-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span style={{color:'#3a3a3ab3'}} className="fs-19px fw-500">{s.skills}</span>
                                        <span onClick={()=>handleDelete(id)}><img src="./images/onBoarding/remove-2.png"/></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        
        </div>
        
       
       </div>

        <div className="d-flex justify-content-between mt-4 z-index-1">
          <button onClick={handleBack} className="btn-onboard">
            Previous
          </button>

          <button onClick={handleSubmitOnboardData} className="btn-onboard-fill">
            Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
          </button>
        </div>
      </div>
   </>
  )
}

const customStyles = {
  control: (provided) => ({
      ...provided,
      padding: '3px',
      border: 'none',
      background: '#eeeeee4d',
      // boxShadow:'none'
  }),

};