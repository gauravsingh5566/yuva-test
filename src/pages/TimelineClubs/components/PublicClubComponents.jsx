import { MyContext } from "pages/EventTimeline/EventTimeline";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { UserContext } from "global/context";
import { toast } from "react-toastify";
import { apiAuth } from "api";
import { useNavigate } from "react-router";
import { ClubContext } from "../TimelineClub";
import "../style/clubStyle.css"
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar } from '@mui/material'
import "../style/clubStyle.css"

export const PublicClubComponents = ({
    allClub,getAllStudentClub,
    getAllClubs, privateClub, 
    publicClub , allClubInstitute,
    allClubStudent,getAllInstituteClub}) => {
    
       useEffect(()=>{
        getAllClubs();
        getAllInstituteClub();
        getAllStudentClub()
        },[])

    const navigate = useNavigate()
  
    const {userData} = useContext(UserContext)
    const fileInputRef = useRef(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState("");
    const [value, setValue] = React.useState("1");
    const [showClubModal, setShowClubModal] = useState(false);
    const [clubID,setClubID] = useState(null);
    const [join , setJoin] = useState(false);
    const [showAllPublic, setShowAllPublic] = useState(false)
    const [showAllPrivate, setShowAllPrivate] = useState(false)
  
    const handleClickEnterClub = ()=>{
      navigate('/clubs/'+clubID)
      handleHideclubModal()
    }
  
    const joinClubFunction = (clubId)=>{
      console.log("this is inside the join club function")
      if(userData.id && userData.role ==='institute'){
        const checkInt = allClubInstitute.find((club)=>club.id===userData.id)
        if(checkInt){
          removeOrJoinClub(clubId);
        }else{
          createClubUser(clubId);
        }
      }
      else if(userData.id && userData.role==='student'){
          const checkInt = allClubStudent.find((club)=>club.id===userData.id)
        if(checkInt){
          removeOrJoinClub(clubId);
        }else{
          createClubUser(clubId);
        } 
      }
      
    }
  
    const createClubUser = (clubId)=>{
      // console.log("here we call create")
      if(userData.role==='institute'){
          axios.post(process.env.REACT_APP_API_BASE_URL+"club/club-institute",{
              id:userData.id,
              clubId
            }).then((res)=>{
              handleClickEnterClub()
              getAllInstituteClub();
            }).catch((error)=>{
              console.log(error.message);
            })
      }
      else if(userData.role==='student'){
          axios.post(process.env.REACT_APP_API_BASE_URL+"club/club-student",{
              id:userData.id,
              clubId
            }).then((res)=>{
              handleClickEnterClub()
              getAllStudentClub();
            }).catch((error)=>{
              console.log(error.message);
            })
      }
    }
    const removeOrJoinClub = (clubId)=>{
      if(userData.role==='institute'){
          axios.put(process.env.REACT_APP_API_BASE_URL+"club/club-institute/institute/"+userData.id,{
              id:userData.id,
              clubId
            }).then((res)=>{
              getAllInstituteClub()
              handleHideclubModal()
            }).catch((error)=>{
              console.log(error.message)
            })
      }
      else if(userData.role==='student'){
          axios.put(process.env.REACT_APP_API_BASE_URL+"club/club-student/student/"+userData.id,{
              id:userData.id,
              clubId
            }).then((res)=>{
              getAllStudentClub()
              handleHideclubModal()
            }).catch((error)=>{
              console.log(error.message)
            })
      }
    }
  
    const checkInstituteIdForClub = (clubId)=>{
        
        if(userData.role==='institute'){
          const allClubIn = allClubInstitute;
          console.log("allClubIn ", allClubIn)
        const clubInstitute = allClubIn.find((club)=>club.id===userData.id);
        console.log('clubinstitute', clubInstitute);
        if(clubInstitute && clubInstitute.all_clubs.includes(clubId)){
          setJoin(true);
        }else{
          setJoin(false);
        }
      }else if(userData.role==='student'){
          const allClubIn = allClubStudent;
          console.log("allClubIn ", allClubStudent[2])
  
          const clubStudent = allClubIn.find((club)=>club.id===userData.id);
          if(clubStudent && clubStudent.all_clubs.includes(clubId)){
            setJoin(true);
          }else{
            setJoin(false);
    
          }
      }
    }
  
    const handleHide = () => {
      setShowModal(false);
    };
    const handleHideclubModal = () => {
      setShowClubModal(false);
    };
    const handleShowClubModal = (id) => {
      checkInstituteIdForClub(id)
      setClubID(id)
      setShowClubModal(true);
    };
    const handleShow = () => {
      setShowModal(true);
    };
    const handleButtonClick = () => {
      setValue("1");
      fileInputRef.current.click();
    };
  
    const handleSubmit = () => {
      if(!name){
          toast.dismiss()
          toast.error("Write Name")
      }
      let type ;
      let instituteId;
      if(userData.role==='institute'){
          instituteId = userData.id
          type = 'private'
      }else if(userData.role==='admin'){
          type="public"
      }
      let data = {
          name, description, type, instituteId
      }
      if(userData.role==='institute' || userData.role==='admin'){
          
      apiAuth.post(process.env.REACT_APP_API_BASE_URL+"club",{...data, img:image})
      .then((res)=>{
          toast.success("succesfully created")
          getAllClubs();
          handleHide();
      }).catch((err)=>{
          console.log(err.message)
      })
      }
  
    };
    const colors = ["#9095ff", "#ffcece",
    "#ff5e5e", "#b4ffcd", "#ffefa1",
    "#ff9090","#b4b4ff","#ffbb33",
    "#20ff31","#20b0ff","#bb20ffb0"];

    return (
      <div>
      {
        publicClub?.length !== 0 && 
        <Card className='col-10' style={{borderRadius: "18px"}}>
        <Card.Body>
        <div className='d-flex justify-content-between'>
                <div>
                <h6 style={{fontWeight: "700", fontSize: "16.07px",fontFamily: "inter"}}>Public Club</h6>
                </div>
                {/* <div>
                <h6 style={{fontWeight: "500", fontSize: "14.07px",fontFamily: "inter", color: "#8A5300"}}>See all</h6>
                </div> */}
              </div>

              <div className='scroll-comment-like-container' style={{maxHeight: "280px"}}>
              {
               publicClub?.slice(0,4).map((club)=>{
                  return (
                    <div onClick={()=> navigate(`/clubs/${club?.id}`)} key={club.id}>
                      <div>
                      <div style={{cursor:'pointer', marginTop: "10px"}} className='people-card d-flex align-items-center'>
                  <div className='people-left me-2' style={{height: "43px",width: "48px"}}>
                    <Avatar className='h-100 w-100' src="/ProfileImg/clubProfile.jpg">

                    </Avatar>
                  </div>

                  <div className='d-flex justify-content-between col-10'>
                  <div className='d-flex'>
                  <div className='people-right d-flex flex-column ms-2'>
                      <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "13.07px"}} className='fw-bold'>{club.name}</span>
                      <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "9.07px", color: "#848484"}}>1.2k Members</span>
                  </div>
                  <div className='d-flex align-items-center ms-1' style={{height: "20px", width: "15px"}}>
                  <VerifiedIcon className='h-100 w-100' sx={{color: "#1da1f2"}}/>
                  </div>
                  </div>
                  </div>
                </div>

                    </div>
                    </div>

                  )
                })
              }
              </div>
              

</Card.Body>
</Card>
        
      }
      </div>
      
    )
}
