import React, { useContext, useEffect, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";
import { Card, Modal } from "react-bootstrap";
import { Avatar, AvatarGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import { UserContext } from "global/context";
import StudentProfileModal from "pages/college/dashboard/components/StudentProfileModal";
import { ClubContext } from "../TimelineClub";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { apiJsonAuth } from "api";
import { UI2DashboardClub } from "pages/UI-2.0-Dashboard/component";
import {Link } from "react-router-dom"
import ClubAddPost from "./ClubAddPost";
import ClubPostCenter from "./ClubPostCenter";
import ShowUserClubPosts from "./ShowUserClubPosts";

const ClubProfileAbout = () => {
  const {userData} = useContext(UserContext)
  const {userDetail,
    clubUserDetail,clickclubUserDetail,clickuserDetail
    ,fetchClickClubUserDetail} = useContext(ClubContext)


  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // useState for all field
  const [profileAbout, setProfileAbout] = useState('');

  const [profileExperience, setProfileExperience] = useState([])


  

  const handlUpdateProfile = ()=>{
    let data = { ...clickclubUserDetail,
      about:profileAbout,
    }
    apiJsonAuth.put("club/updateProfileClub/"+userData.id+'/'+userData.role,data)
    .then((res)=>{
      setProfileAbout(res.data.profile.about);
      toast.dismiss();
      // setProfileAbout('')
      setShowAboutModal(false)
      toast.success("Successfully Update Bio")
    }).catch((error)=>{
      toast.dismiss()
      // setProfileAbout('')
      toast.error("Internal Server Error")
      setShowAboutModal(false)
    })
  }

  const handleChangeExperience = (event)=>{
    event.preventDefault();

    const companyName = event.target.companyName.value;
    const designation = event.target.designation.value;
    const shortDescription = event.target.shortDescription.value;
    const fromDate = event.target.fromDate.value;
    const toDate = event.target.toDate.value;
    // console.log("clubUserDetail.experience", clubUserDetail.experience)
    let array = []
    const newExperience = {
      companyName,
      designation,
      shortDescription,
      fromDate,
      toDate,
    };
    let blankArray = []
   if(profileExperience){
    array = [...profileExperience, newExperience]
    setProfileExperience([...profileExperience, newExperience]);
   }else{
    array = [...blankArray, newExperience]

    setProfileExperience([...blankArray, newExperience]);
   }
   let data = { ...clickclubUserDetail,experience:array}
   apiJsonAuth.put("club/updateProfileClub/"+userData.id+'/'+userData.role,data )
   .then((res)=>{
      toast.dismiss();
      toast.success("Successfully Add Experience")
     event.target.reset();
     setShowExperienceModal(false)
   }).catch((error)=>{
     setShowExperienceModal(false)
    toast.error("Internal Server Error")
   })
  }

  const handleDeleteExperience = ( index)=>{
    let array = []
    let newExperience = [...profileExperience]
    
    if (index >= 0 && index < newExperience.length) {
      newExperience.splice(index, 1);
  } else {
      console.log("Index out of range");
  }
    array = newExperience
    setProfileExperience(newExperience)
   
    let data = { ...clickclubUserDetail,experience:array}
    apiJsonAuth.put("club/updateProfileClub/"+userData.id+'/'+userData.role,data)
   .then((res)=>{
      toast.dismiss();
      toast.success("Deleted Successfully")
    //  event.target.reset();
    //  setShowExperienceModal(false)
   }).catch((error)=>{
    //  setShowExperienceModal(false)
    toast.error("Internal Server Error")
   })
  }

  const calculateRange = (s,e)=>{
    console.log('s,eeeee', s,e)
    let startDate = new Date(s);
    let endDate = new Date(e);
    if(!e){
      endDate = new Date()
    }
    if(!s){
      startDate = new Date()
    }

    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    const dayDiff = endDate.getDate() - startDate.getDate();

    console.log('year', yearDiff, monthDiff, dayDiff)
    if(!yearDiff){
      return (`${monthDiff} mos`)
    }
    if(!monthDiff && !yearDiff){
      return (`${dayDiff} days`)
    }
    return (`${yearDiff} yrs ${monthDiff} mos `)
  }

  useEffect(()=>{

    setProfileAbout(clickclubUserDetail.about)
    setProfileExperience(clickclubUserDetail.experience)
  },[clickclubUserDetail])

  // useEffect(()=>{
  //   setProfileAbout(userDetail.about)
  // },[userDetail])

  return (
    <>
      <div>
        <div style={{
          background:'var(--club-component-backgroun', borderRadius: "16px", fontFamily: "inter"
        }} className="about  p-4 mb-4 rounded mt-3 p-4 shadow">
          <div className="ms- " >
            <div className="d-flex justify-content-between  " >
              <h4 className="mb-4 mb-3 fw-bold" >About</h4>
          { clickclubUserDetail?.id ===userData.id &&  <EditIcon
                style={{ cursor: "pointer", color: "#d874e9" }}
                onClick={() => {
                  setShowAboutModal(true);
                }}
              />}
            </div>
            <p className="fw-normal  fs-6" style={{color: "#262626"}}>
              {profileAbout}
            </p>
          </div>
        </div>
        
        {/* Club */}
        <UI2DashboardClub/>

        {/* Interest */}
        <div>
      <div
        className="mt-3 p-4 shadow"
        style={{ borderRadius: "16px", fontFamily: "inter" }}
      >
        <div className="d-flex justify-content-between">
          <h5 className="mb-3 fw-bold">Interests</h5>
          <Link
            className="fw-bold text-secondary"
            style={{ textDecoration: "none" }}
          >
            See all
          </Link>
        </div>

        <div
          className="mt-3 p-2"
          style={{ borderRadius: "16px", fontFamily: "inter" }}
        >
          <div className="d-flex flex-wrap">
            {interest.map((ele) => {
              return (
                <>
                  <span
                    className="p-2 mx-2 my-2 my-lg-1"
                    style={{
                      color: "#630092",
                      borderRadius: "13.5px",
                      background: "#F2DEFF",
                    }}
                  >
                    {ele.inte}
                  </span>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>


        {/* Recomendation */}
        <div>
          <div
            className="mt-3 p-4 shadow"
            style={{ borderRadius: "16px", fontFamily: "inter" }}
          >
            <div className="d-flex justify-content-between">
              <h5 className="mb-3 fw-bold">Recommendations</h5>
              <button
                className="fw-bold text-center"
                style={{
                  width: "80px",
                  height: "32px",
                  color: "white",
                  background: "#9E00FF",
                  border: "none",
                  borderRadius: "7px",
                }}
              >
                Next
              </button>
            </div>

            <div className="d-flex">
              <div className="text-center" style={{ fontFamily: "Inter" }}>
                <Avatar
                  src="/Profileimg/recomendationprofile.png"
                  className="rounded mt-4"
                  sx={{ width: "19vh", height: "19vh" }}
                />
                <div>
                  <p className="m-0 fw-bold fs-18-07px">Jassica</p>
                  <p
                    className="fw-bold fs-11-07px"
                    style={{ color: "#BD00FF" }}
                  >
                    Class XI
                  </p>
                </div>
              </div>

              <div className="testimonial" style={{ fontFamily: "Inter" }}>
                <div className="testimonialLeft">
                  <img src="/Profileimg/QuoteRight.png" alt="" />
                </div>
                <div className=" p-4">
                  <p
                    className="fw-400 fs-16-07px"
                    style={{ color: "#747474", fontStyle: "italic" }}
                  >
                    Santosh demonstrated tremendous effort and growth throughout the
                    year and brought a great energy to class. He has that
                    combination of a positive attitude and the belief that he can
                    always improve that's rare in a high school student, but so
                    essential to the learning process.{" "}
                  </p>
                </div>
                <div className="testimonialRight">
                  <img src="/Profileimg/QuoteRight.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Expereince */}
        {/* <div
          style={{
          background:'var(--club-component-background)'
        }}
         className="about  p-4 mb-4 rounded ">
          <div className="ms-4">
            <div className="d-flex justify-content-between ">
              <h4 className="mb-4">Experience</h4>
              <div>
          {  clickclubUserDetail?.id ===userData.id &&     <AddIcon
                  onClick={() => setShowExperienceModal(true)}
                  style={{ cursor: "pointer" }}
                />}
              </div>
            </div>
            <div>
              { profileExperience?.length>0 && 
                profileExperience?.map((exp,index)=>{
                  return (
                      <Card  key={exp.companyName} className="mb-4 ">
                        <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex ">
                            <div className="logo me-3">
                              <BusinessIcon />
                            </div>
                            <div className="d-flex flex-column">
                              <div className="mb-2">
                                <h5>{exp.companyName}</h5>
                              </div>
                              <div style={{ color: "black" }} className="mb-2">
                                <span className="">{exp.designation}</span>{" "}
                              
                              </div>
                              <div className="mb-3 ">
                                <span className="me-4">{exp.fromDate || 'This Month'} - {exp.toDate || "Present"} </span> <span className="ms-4">{calculateRange(exp.fromDate, exp.toDate)}</span>
                              </div>
                              <div className="mb-2">
                                <span style={{ color: "black" }}>
                                  {exp.shortDescription}
                                </span>
                              </div>
                            </div>
                          </div>
                    { clickclubUserDetail.id ===userData.id &&  <DeleteIcon onClick={()=>{
                            handleDeleteExperience( index)
                          }} style={{cursor:'pointer'}}/>}
                        </div>
                        </Card.Body>
                      </Card>
                    )
                })

                
              }
            </div>
          </div>
        </div> */}
          
          {/* Show skills */}
        {/* <div style={{
          background:'var(--club-component-background)'
        }} className="about  p-4 mb-4 rounded ">
          <div className="ms-4">
            <div className="d-flex justify-content-between">
              <h4 className="mb-4">Skills & Endorsement</h4>
           {clickclubUserDetail.id ===userData.id &&    <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowSkillsModal(true);
                }}
              />}
            </div>
            <div className="row">
              <div className="col-3">
                <Card className="">
                  <Card.Body className="">
                    <div className="d-flex justify-content-between">
                      <span 
                        style={{ fontSize: "12px", color: "black" }}
                        className="fw-bold"
                      >
                        Brand Identity
                      </span>
                      <span
                        style={{ fontSize: "12px", color: "#415dff" }}
                        className="fw-bold "
                      >
                        5
                      </span>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        width: "100%",
                        transform: "scale(0.5)",
                      }}
                    >
                      <AvatarGroup max={3}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                      </AvatarGroup>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div> */}

        {/* Project */}
        {/* <div style={{
          background:'var(--club-component-background)'
        }} className="about  p-4 mb-4 rounded ">
          <div className="ms-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex mb-4 align-items-center">
                <h4 className=" me-3">Projects</h4>
                <h6>3 of 12</h6>
              </div>
         {clickclubUserDetail.id ===userData.id &&      <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowProjectModal(true);
                }}
              />}
            </div>
            <Card className="col-3">
              <Card.Body>
                <div className="w-100 h-100 mb-2">
                  <img
                    className="w-100 h-100 rounded"
                    src={"https://loremflickr.com/320/240"}
                    alt="img"
                  />
                </div>
                <div className="d-flex flex-column">
                  <span>Zara redesign concept</span>
                  <span>UX/UI design , 15.07.2019</span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div> */}

        
      </div>
      <div>
        <ClubAddPost userDetail={clickuserDetail}/>
      </div>

      <div>
        <ShowUserClubPosts userDetail={clickuserDetail}/>
      </div>

      <div>
        {/* <ShowAll */}
        {/* <ClubPostCenter/> */}
      </div>

      <Modal
        show={showAboutModal}
        onHide={() => {
          setShowAboutModal(false);
        }}
      >
        <Modal.Header className="fw-bold fs-4" style={{color: "black"}}>Edit About</Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control rounded "
                value={profileAbout}
                id="floatingInput"
                style={{ height: "250px", resize: "none", background: "rgb(239, 239, 239)" }}
                rows="5"
                onChange={(e)=>{setProfileAbout(e.target.value)}}
              ></textarea>
              <label htmlFor="floatingTextarea" className="fw-bold">About</label>
            </div>
            <div className="row">
              <button onClick={()=>{
                handlUpdateProfile()
              }} className="btn rounded btn-sm px-3 btn btn-md btn-primary col-6 mx-auto border-0 fs-6" style={{height: "40px", color: "white", background: "#6100FF"}}>
                Edit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showExperienceModal}
        onHide={() => {
          setShowExperienceModal(false);
        }}
      >
        <Modal.Header>Add Experience</Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleChangeExperience}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control rounded-1" name="companyName" />
          <label htmlFor="companyName">Company Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control rounded-1" name="designation" />
          <label htmlFor="designation">Designation</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control rounded-1" name="shortDescription" />
          <label htmlFor="shortDescription">Short Description</label>
        </div>
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input type="date" className="form-control rounded-1" id="fromDate" name="fromDate" />
              <label htmlFor="fromDate">From Date</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input type="date" className="form-control rounded-1" id="toDate" name="toDate" />
              <label htmlFor="toDate">To Date</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showSkillsModal}
        onHide={() => {
          setShowSkillsModal(false);
        }}
      >
        <Modal.Header>Add Skills</Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showProjectModal}
        onHide={() => {
          setShowProjectModal(false);
        }}
      >
        <Modal.Header>Add Project</Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClubProfileAbout;


const interest = [
  {
    value: 1,
    inte: "Photography",
  },
  {
    value: 2,
    inte: "Debating",
  },
  {
    value: 3,
    inte: "Football",
  },
  {
    value: 4,
    inte: "Creativity",
  },
  {
    value: 5,
    inte: "Photography",
  },
  {
    value: 6,
    inte: "Art",
  },
  {
    value: 7,
    inte: "Science",
  },
  {
    value: 8,
    inte: "History",
  },
];