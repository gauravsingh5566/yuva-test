import React, { useContext, useEffect, useState } from "react";
import "../style/ModelUnstyle.css";
import { MUContext } from "../context/contextMU";
import { ModelUnCommittees } from "./ModelUnCommittees";
import { ModelUnPoliticalParties } from "./ModelUnPoliticalParties";
import { ModelUnParticipate } from "./ModelUnParticipate";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import { AIPPM_Role, COP28_countries, G20_Countries, G20_roles, UNDP_Countries, UNEP_Countries } from "global/AllCountryData";
import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import { toast } from "react-toastify";
import moment from "moment";

export const MUNmainStepper = () => {
  const { stepCount, setStepCount } = useContext(MUContext);
  const renderStepper = () => {
    switch (true) {
      case stepCount === 1:
        return (
          <div>
            <Step4 />
          </div>
        );
      case stepCount === 2:
        return (
          <div>
            <Step5 />
          </div>
        );
      case stepCount === 3:
        return (
          <div>
            <Step7 />
          </div>
        );
      // case stepCount === 4:
      //   return (
      //     <div>
      //       <Step4 />
      //     </div>
      //   );
      // case stepCount === 5:
      //   return (
      //     <div>
      //       <Step5 />
      //     </div>
      //   );
      // case stepCount === 6:
      //   return (
      //     <div>
      //       <Step6 />
      //     </div>
      //   );
      // case stepCount === 7:
      // return (
      //   <div>
      //     <Step7 />
      //   </div>
      // );
    }
  };
  return (
    <>
      {" "}
      <div>{renderStepper()}</div>
    </>
  );
};

const Step1 = () => {
  const { stepCount, setStepCount } = useContext(MUContext);

  const handleNext = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            <div className="col-9">
              <div class="custom-div">
                <span class="respon-font">
                  Events {">"} United Nations {">"} Participation
                </span>
              </div>

              <div className="" style={{ marginTop: "40px" }}>
                <p className="fw-600 f-family-Inter fs-31px">Selected Theme</p>
              </div>

              <div className=" color-purple mt-4">
                <span className="fw-600 text-center text-sm-start fs-23px d-block lh-34-5px f-family-Poppins">
                  PEACE-BUILDING AND RECONCILIATION
                </span>
                <span className="fw-600 text-center text-sm-start fs-23px d-block lh-34-5px f-family-Poppins">
                  USHERING AN ERA OF NO WAR
                </span>
              </div>

              <div className="mt-4 ">
                <p className="font-weight-400 f-family-Poppins font-size-21px lh-31-5px text-center text-sm-start">
                  Every person has a personal obligation and duty to contribute
                  to world peace or to "be" the peace they want to see. People
                  can choose to effect revolutionary change in society. We may
                  conceive and believe in the potential of peace by
                  reprogramming the mind to a new way of thinking and building a
                  paradigm of "power with" rather than "power over" Is it
                  possible to repair our world by thinking globally and acting
                  locally? Peace education and structural transformation can be
                  used to build positive peace or social justice.
                </p>
              </div>

              <div>
                <span className="text-center text-sm-start f-family-Poppins color-light-blue fw-500 fs-20px lh-30px">
                  Download Background Guide{" "}
                  <span
                    className="text-center text-sm-start"
                    style={{ color: "#000000" }}
                  >
                    |
                  </span>{" "}
                  Get Oriented
                </span>
              </div>

              <div className="mt-5">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <div
                    className="d-flex justify-content-between align-items-center"
                  // style={{ width: "501px" }}
                  >
                    <div onClick={handlePrev}>
                      <span
                        style={{ color: "#808080" }}
                        className="pt-4f-family-Poppins fw-500 fs-20px lh-28-5px"
                      >
                        Discard
                      </span>
                    </div>
                    <div className="">
                      <button
                        onClick={handleNext}
                        className="bg-blue d-flex align-items-center justify-content-around"
                        style={{
                          width: "233px",
                          height: "55px",
                          color: "white",
                          borderRadius: "9px",
                        }}
                      >
                        Continue <img src="/modelUn/Right.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step2 = () => {
  const { stepCount, setStepCount } = useContext(MUContext);

  const handleNext = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            <div className="col-9">
              <div class="custom-div">
                <span class="respon-font">
                  Events {">"} United Nations {">"} Participation
                </span>
              </div>

              <div className="modelUN_comittees">
                <div className="" style={{ marginTop: "40px" }}>
                  <p className="fw-600 f-family-Inter fs-32px">
                    Selected Committees
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <div className="">
                      <span className="fs-23px fw-500 f-family-Poppins lh-34-5px">
                        UNITED NATIONS SECURITY COUNCIL (UNSC)
                      </span>
                    </div>
                    <div className="position">
                      <span>
                        <a
                          className="font-weight-500 font-size-18px f-family-Poppins text-decoration-underline"
                          href="#"
                        >
                          94 Positions available
                        </a>{" "}
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className="fs-16-07px fw-600 bg-purple color-white f-family-Inter"
                      style={{
                        borderRadius: "7px",
                        height: "32px",
                        width: "201.33px",
                        textAlign: "center",
                      }}
                    >
                      Request Nomination
                    </button>
                  </div>
                </div>

                <ModelUnCommittees comittees={comittees} />
              </div>


              <div className="d-flex justify-content-between mt-5">
                <div>
                  <div className="">
                    <span className="fs-23px fw-500 f-family-Poppins lh-34-5px">
                      ALL INDIA POLITICAL PARTIES MEET
                    </span>
                  </div>
                  <div className="position">
                    <span>
                      <a
                        className="font-weight-500 font-size-18px f-family-Poppins text-decoration-underline"
                        href="#"
                      >
                        94 Positions available
                      </a>{" "}
                    </span>
                  </div>
                </div>

                <div className="">
                  <button
                    className="fs-16-07px fw-600 bg-purple color-white f-family-Inter"
                    style={{
                      borderRadius: "7px",
                      height: "32px",
                      width: "201.33px",
                      textAlign: "center",
                    }}
                  >
                    Request Nomination
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ width: "501px" }}
                >
                  <div onClick={handlePrev}>
                    <span
                      style={{ color: "#808080" }}
                      className="pt-4f-family-Poppins fw-500 fs-20px lh-28-5px"
                    >
                      Previous
                    </span>
                  </div>
                  <div className="">
                    <button
                      onClick={handleNext}
                      className="bg-blue d-flex align-items-center justify-content-around"
                      style={{
                        width: "233px",
                        height: "55px",
                        color: "white",
                        borderRadius: "9px",
                      }}
                    >
                      Continue <img src="/modelUn/Right.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step3 = () => {
  const { stepCount, setStepCount } = useContext(MUContext);

  const handleNext = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            <div className="col-9">
              <div class="custom-div">
                <span class="respon-font">
                  Events {">"} United Nations {">"} Participation

                </span>
              </div>

              <div className="modelUN_comittees" style={{ marginTop: "40px" }}>
                <div className="">
                  <p className="fw-600 f-family-Inter fs-32px">
                    Selected Committees
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <div className="">
                      <span className="fs-23px fw-500 f-family-Poppins lh-34-5px">
                        UNITED NATIONS SECURITY COUNCIL (UNSC)
                      </span>
                    </div>
                    <div className="position">
                      <span>
                        <a
                          className="font-weight-500 font-size-18px f-family-Poppins text-decoration-underline"
                          href="#"
                        >
                          94 Positions available
                        </a>{" "}
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className="fs-16-07px fw-600 bg-purple color-white f-family-Inter"
                      style={{
                        borderRadius: "7px",
                        height: "32px",
                        width: "201.33px",
                        textAlign: "center",
                      }}
                    >
                      Request Nomination
                    </button>
                  </div>
                </div>

                <ModelUnPoliticalParties comittees={comittees} />
              </div>

              <div className="mt-5">
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ width: "501px" }}
                >
                  <div onClick={handlePrev}>
                    <span
                      style={{ color: "#808080" }}
                      className="pt-4f-family-Poppins fw-500 fs-20px lh-28-5px"
                    >
                      Previous
                    </span>
                  </div>
                  <div className="">
                    <button
                      onClick={handleNext}
                      className="bg-blue d-flex align-items-center justify-content-around"
                      style={{
                        width: "233px",
                        height: "55px",
                        color: "white",
                        borderRadius: "9px",
                      }}
                    >
                      Save & Continue <img src="/modelUn/Right.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step4 = () => {
  const navigate = useNavigate()
 
  const { stepCount, setStepCount } = useContext(MUContext);
  const [isChecked, setIsChecked] = useState(false);
 
  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
 
  const handleNext = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

  const naviageModelUn = () => {
    navigate("/modelUn")
  }

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            <div className="col-9">
              <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
                <div class="d-flex justify-content-between">
                  <div>
                    <span class="fw-500 font-size-16px color-primary-light-purple">
                      Model United Nations
                    </span>
                  </div>
                  <div class="">
                    <span class="color-grey" style={{ fontSize: "15px" }}>
                      /
                    </span>
                  </div>
                  <div>
                    <span class="color-grey fw-500 font-size-16px font-family-inter ml-2">
                      Participation
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="fw-600 f-family-Inter fs-31px">Selected Theme</p>
              </div>

              <div className="fw-600 color-purple mt-4">
                <span className="text-center text-sm-start font-weight-600 fs-23px d-block lh-34-5px f-family-Poppins">
                  PEACE-BUILDING AND RECONCILIATION
                </span>
                <span className="text-center text-sm-start font-weight-600 fs-23px d-block lh-34-5px f-family-Poppins">
                  USHERING AN ERA OF NO WAR
                </span>
              </div>

              <div className="mt-4 ">
                <p className="font-weight-400 text-center text-sm-start  f-family-Poppins fs-23px fs-sm-6 lh-31-5px">
                  Every person has a personal obligation and duty to contribute
                  to world peace or to "be" the peace they want to see. People
                  can choose to effect revolutionary change in society. We may
                  conceive and believe in the potential of peace by
                  reprogramming the mind to a new way of thinking and building a
                  paradigm of "power with" rather than "power over" Is it
                  possible to repair our world by thinking globally and acting
                  locally? Peace education and structural transformation can be
                  used to build positive peace or social justice.
                </p>
              </div>

              <div>
                <span className="text-center text-sm-start f-family-Poppins color-light-blue fw-500 fs-20px lh-30px">
                  Download Background Guide{" "}
                  <span
                    style={{ color: "#000000" }}
                    className="text-center text-sm-start"
                  >
                    |
                  </span>{" "}
                  Get Oriented
                </span>
              </div>

              <div class="mt-4">
                <div class="d-flex align-items-center">
                  <div style={{ marginTop: "5px" }}>
                    <input className="acceptInp"
                      style={{
                        height: "16px",
                        width: "16px",
                        borderRadius: "2px",
                      }}
                      type="checkbox"
                      name=""
                      id=""
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div class="ms-2">
                    <span
                      class="f-family-Inter font-weight-400 font-size-16px lh-28-5px"
                      style={{ color: "#343A40" }}
                    >
                      I accept the selected theme by institution and designed by
                      yuvamanthan.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="col-7">
                  <div
                    className="d-flex justify-content-between align-items-center mt-5 mb-2"
                  // style={{ width: "501px" }}
                  >
                    <div onClick={naviageModelUn}>
                      <span
                        style={{ color: "#808080" }}
                        className="pt-4f-family-Poppins fw-500 fs-20px lh-28-5px cursor-pointer"
                      >
                        Discard
                      </span>
                    </div>

                    <div className="">
                      <button
                        onClick={handleNext}
                        className={`${isChecked ? "btn-onboard-fill"  : "btn-onboard-fill-disabled"}  `}
                       
                        disabled={!isChecked}
                      >
                        Continue <img src="/modelUn/Right.png" alt="" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step5 = () => {
    const {userData} = useGlobalContext()
  const { stepCount, setStepCount,getAllCommiteeList, studentFormik, setStudentFormik,eventDetail } = useContext(MUContext);
  const [participateData, setParticipateData] = useState(participate)
  const [activeFilter, setActiveFilter] = useState('Delegate');
  const [selectedCommitteeType, setSelectedCommitteeType] = useState("UNDP");
  const[isSubmit,setIsSubmit] = useState(false)
  const [allSec, setAllSec] = useState([])
  const [allPc, setAllPc] = useState([])
 
  const getAllSec = ()=>{
    apiJson('api/v2/modelUn-student/getSecretariotDetails/register/'+userData?.instituteId)
    .then((res)=>{
      setAllSec(res.data.result)
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
  const getAllPc = ()=>{
    apiJson('api/v2/modelUn-student/getPressCorpsDetails/register/'+userData?.instituteId)
    .then((res)=>{
      setAllPc(res.data.result)
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const handlePost = ()=>{ 
    setStudentFormik('studentId',userData?.id)
    setStudentFormik('instituteId',userData?.instituteId)
    setStudentFormik('model_un_register_id',eventDetail?.id)
    const data = {...studentFormik.values, studentId:userData?.id,instituteId:userData?.instituteId, model_un_register_id:eventDetail?.id }
    apiJson.post('api/v2/modelUn-student/participate',data )
    .then((res)=>{
    setStepCount(stepCount + 1);

  toast.success("Success")
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
  useEffect(()=>{
    getAllSec();
    getAllPc();
  },[])
  const handleNext = () => {
    setIsSubmit(true);
    if(activeFilter==="Delegate" && studentFormik.isValid){
      handlePost()
      return
    }else if(activeFilter==="Secretariat"){
      handlePost();
    }else if(activeFilter==="Press Corps"){
      handlePost();
   }
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

//  ======== Select Position  handler ==========\\
  const designationPostion = (value) => {
    setActiveFilter(value)
    studentFormik.setValues(studentFormik.initialValues)
    // const data = participateData?.filter((ele) => ele?.title === value)
    setSelectedCommitteeType("UNDP")
    setParticipateData(participateData)

  }
  // Define the onChange event handler to update the selected committee type
  const handleCommitteeTypeChange = (selectedOption) => {
    setSelectedCommitteeType(selectedOption.type);
  if(activeFilter ==="Delegate"){

    setStudentFormik("committeeId",selectedOption.committeeId);
    setStudentFormik("pref_committee",selectedOption.title)
  }
  };
  const handleSecretariatChange=(selectedOption)=>{ 
    setStudentFormik('secretariatsId',selectedOption?.value)
    setStudentFormik('pref_role',selectedOption?.role)
  }
  const handlePcChange=(selectedOption)=>{
    setStudentFormik('pressCorpsId',selectedOption?.value)
    setStudentFormik('pref_role',selectedOption?.role)

  }

  // =======Set the selectedCommitteeType to the type of the initially selected committee========\\
  useEffect(() => {
    setSelectedCommitteeType("UNDP");
   
  }, []);
  

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // Add custom styles for options here
    
      // backgroundColor: state.isSelected ? 'lightblue' : 'white',
      color: state.isSelected ? 'black' : 'inherit',
    
    }),
  };
//======== custom style for select Input Feild  =============\\
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F9F9F9", 
      border:"none",
      outline:"none"
    }),
  }
// ==========  Default Role select value  =========\\
  useEffect(()=>{
    if(selectedCommitteeType==='AIPPM'){
      setStudentFormik('pref_role',AIPPM_Role[0].value)
    }else if(selectedCommitteeType==='G20'){
      setStudentFormik('pref_role',G20_roles[0].value)
    }else{
      setStudentFormik('pref_role',"")
    }
  },[selectedCommitteeType])
  //============= Default country select ======
  useEffect(()=>{
   if(selectedCommitteeType=="UNDP"){
    setStudentFormik('pref_country',UNDP_Countries[0].value )
   } else if(selectedCommitteeType==="COP28"){
    setStudentFormik('pref_country',COP28_countries[0].value )
   }else if(selectedCommitteeType==="G20"){
    setStudentFormik('pref_country',G20_Countries[0].value )
   }else if(selectedCommitteeType==="UNEP"){
    setStudentFormik('pref_country',UNEP_Countries[0].value )
   }else{
    setStudentFormik('pref_country',"")
   }

   
  },[selectedCommitteeType])

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            <div className="col-9">
              <div className="col-4">
                <div
                  className="d-flex justify-content-between"
                // style={{ height: "47px", width: "320px" }}
                >
                  <span className="fw-500 font-size-16px color-primary-light-purple">
                    Model United Nations
                  </span>
                  <div>
                    <span className="color-grey">/</span>
                  </div>
                  <div>
                    <span className="color-grey fw-500 font-size-16px font-family-inter ">
                      Participation
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="fw-600 f-family-Inter fs-31px">
                  Choose Your Preferred Designation
                </p>
              </div>

              <div>
                <span className="color-ligth-grey font-family-inter font-weight-400 fs-25px">
                  Excited to be a part of the YMUN party? As students, you have
                  the following choices to become a part of the exercise:
                </span>
              </div>

              {/* <ModelUnParticipate participate={participate} /> */}
              <div>
                <div className="col-11" style={{ marginTop: "50px" }}>
                  <div className="row">
                    {participateData.map((ele, i) => {
                      return (
                        <>
                          <div className="col-12 col-sm-6 col-lg-3 ">
                            {/* <div className="card  d-flex border-0"> */}
                            <div>
                              <div className="">
                                <div onClick={() => designationPostion(ele.title)} className={`card-body bg-ligth-blue mx-auto text-center d-flex flex-column justify-content-center ${activeFilter === ele?.title && "active-filter-border"}`} style={{ width: "181px", height: "181px", borderRadius: "21px" }}>
                                  <div className="height-100px">
                                    <img className="h-100" src={ele.img} alt="" />
                                  </div>
                                  <div>
                                    <span>{ele.title}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center" style={{ width: "", height: "23px" }}>
                                <span className="fs-15px text-center" style={{ fontWeight: "500" }}>{ele.position}</span>
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                {/* <div className="row"> */}
                <div
                  className="d-flex align-items-center border-purple b-radius-13px bg-mix-purple-white"
                  style={{ width: "820px", height: "72px" }}
                >
                  <div style={{ width: "45px", height: "26px" }}>
                    <img
                      className="h-100 w-100"
                      src="/modelUn/Clipboard.png"
                      alt=""
                    />
                  </div>

                  {activeFilter === "Delegate" ? (<div className="mt-2" style={{ width: "720.74px", height: "46px", lineHeight: "1.1px" }}>
                    <span
                      className="f-family-Poppins fw-500 fs-15px line-height-22-5px"
                      style={{ color: "#633CFF" }}
                    >
                      Participate as a <span className="fw-700 ">Delegate</span> to represent a country. Picture this: a student representing the United Kingdom adeptly tackling global challenges like nuclear non-proliferation or climate change.
                    </span>
                  </div>)
                    :
                    activeFilter === "Secretariat" ? (<div className="mt-2" style={{ width: "720.74px", height: "46px", lineHeight: "1.1px" }}>
                      <span
                        className="f-family-Poppins fw-500 fs-15px line-height-22-5px"
                        style={{ color: "#633CFF" }}
                      >
                        Participate as a member of the  <span className="fw-700 ">Secretariat</span>. You will help in organizing the event and ensuring a smooth flow of work. There are multiple designations up for grabs!
                      </span>
                    </div>)
                      : (
                        <div className="mt-2" style={{ width: "720.74px", height: "46px", lineHeight: "1.1px" }}>
                          <span
                            className="f-family-Poppins fw-500 fs-15px line-height-22-5px"
                            style={{ color: "#633CFF" }}
                          >
                            Participate as a member of the  <span className="fw-700 ">Press Corps</span> and showcase your creativity by capturing the event like never before.
                          </span>
                        </div>)
                  }
                </div>
              </div>

          {/*========= When we click Delegate then open its select dropdowns =========  */}
              {activeFilter === "Delegate" ?(  
              <div  className="col-10">
                <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a committee</span></div>
                
                <div>
                {/* ============== Commitee Select Dropdown start =====================*/}
                <Select
                  options={getAllCommiteeList}
                  isSearchable={false}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  // defaultValue={getAllCommiteeList[0]}
                  onChange={handleCommitteeTypeChange}
                  getOptionLabel={
                    (option) => {
                      return (
                        <>
                          <div className="d-flex justify-content-between
                          align-items-center">
                            <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.title}</div>
                            <div className="d-flex justify-content-between">
                            <div className='fw-500 fs-19px me-4'style={{ color: "#BD00FF", fontFamily: "Poppins" }}>{option.slots}  Available</div>
                            <div style={{ fontWeight: "500", fontSize: "15px", color: "#ACACAC" }}>{option?.applicants} Applicants</div>
                            </div>
                           
                          </div>
                        </>
                      )
                    }
                  }
                />
                    {studentFormik.errors.pref_committee&& isSubmit? (
                      <div className="text-danger">{studentFormik.errors.pref_committee}</div>
                    ) : null}
                </div>
            {/*==== Select country if selectedCommitteeType is UNEP, COP28,UNDP and G20 ======== */}
            {selectedCommitteeType === "UNEP" || selectedCommitteeType === "COP28" || selectedCommitteeType === "UNDP" ? (
              <>
              <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a country</span></div>
                <Select 
                 options={selectedCommitteeType === "UNEP" ? UNEP_Countries : selectedCommitteeType === "COP28"? COP28_countries : UNDP_Countries}
                 isSearchable={true}
                 onChange={(i)=>setStudentFormik("pref_country",i.value)}
                 styles={{ ...customStyles, ...customSelectStyles }}
                 defaultValue={selectedCommitteeType === "UNEP" ? UNEP_Countries[0] : selectedCommitteeType === "COP28"? COP28_countries[0] : UNDP_Countries[0]}
                 getOptionLabel={
                  (option) => {
                    return (
                      <>
                          <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.name}</div>
                      </>)}}
                      />
              </>
              
            ):null}

            {/*======== Role Select Dropdown if SelectedCommiteeType is AIIPM =============== */}
              {selectedCommitteeType === "AIPPM" && (  
                <>
                 <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
                <Select 
                options={AIPPM_Role}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={AIPPM_Role[0]}
                onChange={(i)=>setStudentFormik("pref_role",i.value)}
                getOptionLabel={
                 (option) => {
                   return (
                     <>
                         <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.value}</div>
                     </>)}}
                     />
             </>
             )}
            {/*======== Role and Country Select Dropdown if SelectedCommiteeType is G20 =============== */}

                {selectedCommitteeType === "G20" && (
                  <>
                  <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a country</span></div>
                  <Select 
                   options={G20_Countries}
                   isSearchable={true}
                   styles={{ ...customStyles, ...customSelectStyles }}
                   defaultValue={G20_Countries[0]}
                   onChange={(i)=>setStudentFormik('pref_country',i.value)}
                   getOptionLabel={
                    (option) => {
                      return (
                        <>
                            <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.name}</div>
                        </>)}}
                        />
                        <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
                  <Select 
                   options={G20_roles}
                   isSearchable={true}
                   styles={{ ...customStyles, ...customSelectStyles }}
                   defaultValue={G20_roles[0]}
                   onChange={(i)=>setStudentFormik('pref_role',i.value)}
                   getOptionLabel={
                    (option) => {
                      return (
                        <>
                            <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.role}</div>
                        </>)}}
                        />
                </>
                )}
                
              </div>) : activeFilter === "Secretariat" ? (
                // ========When Select  Secretariat then It is show the its Select DropDown=====\\
              <div  className="col-10">
                <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
                
                <div>
                <Select
                  options={allSec}
                  isSearchable={false}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  onChange={handleSecretariatChange}
                  getOptionLabel={
                    (option) => {
                      return (
                        <>
                          <div className="d-flex justify-content-between
                          align-items-center">
                            <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.role}</div>
                            <div className="d-flex justify-content-between">
                            <div className='fw-500 fs-19px me-4'style={{ color: "#BD00FF", fontFamily: "Poppins" }}>{option.isAssigned?"Not Available":"Available"}</div>
                            <div style={{ fontWeight: "500", fontSize: "15px", color: "#ACACAC" }}>{option.applicants}</div>
                            </div>
                           
                          </div>
                        </>
                      )
                    }
                  }
                />
                </div>
                
              </div>):(<>  <div  className="col-10">
                <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
                
                <div>
                <Select
                  options={allPc}
                  isSearchable={false}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  onChange={handlePcChange}
                  getOptionLabel={
                    (option) => {
                      return (
                        <>
                          <div className="d-flex justify-content-between
                          align-items-center">
                            <div className='fw-500 fs-19px'style={{ color: "#3A3A3A" }}>{option.role}</div>
                            <div className="d-flex justify-content-between">
                            <div className='fw-500 fs-19px me-4'style={{ color: "#BD00FF", fontFamily: "Poppins" }}>{option.isAssigned?"Not Available":"Available"}</div>
                            <div style={{ fontWeight: "500", fontSize: "15px", color: "#ACACAC" }}>{option.applicants}</div>
                            </div>
                           
                          </div>
                        </>
                      )
                    }
                  }
                />
                </div>
                
              </div></>)}
              <div className="mt-3">
                <div
                  className="d-flex justify-content-between align-items-center mt-5"
                  style={{ width: "501px" }}
                >
                  <div onClick={handlePrev}>
                    <span
                      style={{ color: "#808080" }}
                      className=" pt-4f-family-Poppins fw-500 fs-20px lh-28-5px cursor-pointer"
                    >
                      Back
                    </span>
                  </div>
                  <div className="">
                    <button
                      onClick={handleNext}
                      className="bg-blue d-flex align-items-center justify-content-around"
                      style={{
                        width: "233px",
                        height: "55px",
                        color: "white",
                        borderRadius: "9px",
                      }}
                    >
                      Continue <img src="/modelUn/Right.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step6 = () => {
  const { stepCount, setStepCount } = useContext(MUContext);
  const handleNext = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrev = () => {
    setStepCount(stepCount - 1);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mt-2">
        <div className="col-9">
          <div className="col-4">
            <div
              className="d-flex justify-content-between"
            // style={{ height: "47px", width: "320px" }}
            >
              <span className="fw-500 font-size-16px color-primary-light-purple">
                Model United Nations
              </span>
              <div>
                <span className="color-grey">/</span>
              </div>
              <div>
                <span className="color-grey fw-500 font-size-16px font-family-inter ">
                  Participation
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="fw-600 font-family-inter fs-31px">
              Choose Your Preferred Committee
            </p>
          </div>

          <div className="mt-1">
            <span className="font-weight-500 f-family-Poppins font-size-19px lh-28-5px">
              Select a committee
            </span>
          </div>

          <div className="mt-4">
            <div
              className="d-flex justify-content-between align-items-center bg-grey b-radius-8px"
              style={{ width: "820px", height: "46px" }}
            >
              <div style={{ width: "414px", height: "29px" }}>
                <span className="f-family-Poppins font-weight-500 font-size-19px lh-28-5px">
                  UNITED NATIONS SECURITY COUNCIL (UNSC)
                </span>
              </div>
              <div>
                <select
                  style={{
                    color: "#8F00FF",
                    width: "210px",
                    border: "1px solid red",
                  }}
                  className="f-family-Poppins font-weight-500 font-size-19px lh-28-5px border-0 bg-grey"
                  name=""
                  id=""
                >
                  <option value="">30 Available</option>
                </select>
              </div>
            </div>
          </div>

          <ModelUnCommittees comittees={comittees} />

          <div className="mt-5">
            {/* <div className="row"> */}
            <div
              className="d-flex align-items-center border-purple b-radius-13px bg-mix-purple-white"
              style={{ width: "820px", height: "72px" }}
            >
              <div style={{ width: "45px", height: "26px" }}>
                <img
                  className="h-100 w-100"
                  src="/modelUn/Clipboard.png"
                  alt=""
                />
              </div>
              {/* <div> */}
              <div className="mt-1" style={{ width: "720.74px", height: "46px", lineHeight: "1.1px" }} >
                <span
                  className="f-family-Poppins fw-500 fs-15px line-height-22-5px"
                  style={{ color: "#633CFF" }}
                >
                  You have selected your preferred designation as a{" "}
                  <span className="fw-700 ">Delegate</span>, you will be
                  assigned as your preferred designation if available during
                  nomination process done by your institution.{" "}
                </span>
                {/* </div> */}
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="mt-2">
            <div
              className="d-flex justify-content-between align-items-center mt-5"
              style={{ width: "501px" }}
            >
              <div onClick={handlePrev}>
                <span
                  style={{ color: "#808080" }}
                  className=" pt-4f-family-Poppins fw-500 fs-20px lh-28-5px"
                >
                  Back
                </span>
              </div>
              <div className="">
                <button
                  //   onClick={() => setStepCount(1)}
                  onClick={handleNext}
                  className="bg-blue d-flex align-items-center justify-content-around"
                  style={{
                    width: "233px",
                    height: "55px",
                    color: "white",
                    borderRadius: "9px",
                  }}
                >
                  Submit <img src="/modelUn/Right.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step7 = () => {
  const {eventDetail } = useContext(MUContext);
  const navigate = useNavigate();
  const navigateDashboaerd = () => {
    navigate('/new-dashboard')
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mt-2">
        <div className="col-9">
          <div className="col-4">
            <div
              className="d-flex justify-content-between"
            // style={{ height: "47px", width: "320px" }}
            >
              <span className="fw-500 font-size-16px color-primary-light-purple">
                Model United Nations
              </span>
              <div>
                <span className="color-grey">/</span>
              </div>
              <div>
                <span className="color-grey fw-500 font-size-16px font-family-inter ">
                  Participation
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="fw-600 font-family-inter fs-31px lh-37-52px">
              Under Nomination
            </p>
          </div>

          <div>
            <span
              className=" color-ligth-grey font-family-inter font-weight-500 fs-23px lh-27-84px"
              style={{ color: "#A79BB1" }}
            >
              Your application for participation in Yuvamanthan Model United
              Nations is submitted. You will notified once you are nominated.
            </span>
          </div>

          <div className="mt-2">
            <span className="color-pink lh-31-5px font-weight-600 font-family-inter fs-26px">
              Selected students will be declared on { moment(eventDetail?.date_proposed).format("MMMM D, YYYY")} at 11:00
              AM IST
            </span>
          </div>

          <div>
            <div className="mt-2">
              <p className="fw-700 f-family-Inter fs-24px">Resources</p>
            </div>
            <div className="col-11">
              <div className="row">
                {features.map((data) => {
                  return (
                    <>
                      <div className="col-4 col-md-3 col-lg-2">
                        <div className="mt-3 d-flex flex-column align-items-center justify-content-center">
                          <div
                            className="d-flex align-items-center justify-content-center border-0 rounded-circle p-3"
                            style={{
                              height: "68px",
                              width: "68px",
                              background: "#F7F2FF",
                            }}
                          >
                            <img
                              src={data.featureImg}
                              className="w-100 h-100"
                              alt="name"
                            />
                          </div>
                          <div className="align-items-center text-center mt-2">
                            <span
                              className="font-family-inter font-weight-400"
                              style={{ fontSize: "17px" }}
                            >
                              {data.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-10">
            <div
              className="d-flex justify-content-between align-items-center mt-5"
            // style={{ width: "501px" }}
            >
              <div>
                <button
                  onClick={navigateDashboaerd}
                  className="bg-blue d-flex align-items-center justify-content-around"
                  style={{
                    width: "233px",
                    height: "55px",
                    color: "white",
                    borderRadius: "9px",
                  }}
                >
                  Back to YMUN <img src="/modelUn/Right.png" alt="" />
                </button>
              </div>
              <div className=""
              //  onClick={handleNaviageApplicant}
              >
                <span
                  // style={{ color: "#808080" }}
                  className="color-blue pt-4f-family-Poppins fw-500 font-size-19px lh-28-5px"
                >
                  Invite a friend
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const comittees = [
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download1.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download1.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
];

const participate = [
  {
    img: "/modelUn/Lecturer.png",
    title: "Delegate",
    position: "26 Positions Available"
  },
  {
    img: "/modelUn/Certificate.png",
    title: "Secretariat",
    position: "26 Positions Available"
  },
  {
    img: "/modelUn/Magazine.png",
    title: "Press Corps",
    position: "3 Positions Available"
  }
];

const features = [
  {
    id: 1,
    featureImg: "/modelUn/Clouddone.png",
    name: "Lifestyle for Environment",
  },
  {
    id: 2,
    featureImg: "/modelUn/Vector.png",
    name: "Climate Change",
  },
  {
    id: 3,
    featureImg: "/modelUn/TajMahal.png",
    name: "Bharat at 2047",
  },
  {
    id: 4,
    featureImg: "/modelUn/Innovation.png",
    name: "IP Innovation",
  },
  {
    id: 5,
    featureImg: "/modelUn/Business.png",
    name: "Future of Work",
  },
  {
    id: 6,
    featureImg: "/modelUn/PeacePigeon.png",
    name: "Peace building and Reconciliation",
  },
  {
    id: 7,
    featureImg: "/modelUn/Handshake.png",
    name: "Shared Future",
  },
  {
    id: 8,
    featureImg: "/modelUn/HeartwithPulse.png",
    name: "Health, Well-being & Sports",
  },
  {
    id: 9,
    featureImg: "/modelUn/ViewMore.png",
    name: "See All",
  },
];

