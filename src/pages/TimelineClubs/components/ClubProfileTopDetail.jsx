import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Modal, Tab, Tabs } from "react-bootstrap";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import ShareIcon from "@mui/icons-material/Share";
import PlaceIcon from "@mui/icons-material/Place";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClubContext } from '../TimelineClub';
import { UserContext, useGlobalContext } from 'global/context';
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiJson } from 'api';
import "../style/clubStyle.css"
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import { CircularProgressbarWithChildren, buildStyles ,  AnimatedProgressProvider  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ClubProfileTopDetail = ({clickuserDetail,clickclubUserDetail}) => {
  const location = useLocation()
  const {userId} = useParams();
  const isInstitute = location.pathname.includes("institute")
  const navigate = useNavigate();
  const {userData} = useContext(UserContext)
  const {
    clubUserDetail
    ,fetchClickClubUserDetail,fetchClubUserDetail} = useContext(ClubContext)



  const [showEdit, setShowEdit] = useState(false)
  const [showDetailModal, setshowDetailModal] = useState(false);
  const [extra_curriculum, setextra_curriculum] = useState('nothing extra')
  const [education, seteducation] = useState('nothing extra')
  const [achievements, setachievements] = useState('No acchivements')
  const [small_bio, setsmall_bio] = useState('Nothing about me')
  const [profileUser, setProfileUser] = useState([]);
  
  const getProfileData = () =>{
      apiJson(`api/v2/profile/userDetail/role/${isInstitute? "institute" : "student"}/user/${userId}`)
      .then((res)=>{
        setProfileUser(res?.data?.userDetail)
      })
      .catch((error)=>{
        console.log(error.message);
      })
    } 

  useEffect(()=>{
    setachievements(clickclubUserDetail.achievements)
    setsmall_bio(clickclubUserDetail.small_bio)
    setextra_curriculum(clickclubUserDetail.extra_curriculum)
    getProfileData()

  },[])
  useEffect(()=>{
    setachievements(clickclubUserDetail.achievements)
    setsmall_bio(clickclubUserDetail.small_bio)
    setextra_curriculum(clickclubUserDetail.extra_curriculum)
    getProfileData()
  },[location.pathname])


  const handleChangeDetail = (event)=>{
    event.preventDefault();
    let data = clickclubUserDetail
    data = {...data, achievements, small_bio, extra_curriculum}

    console.log("this is dataaaaaaaaaaaaaaaaaaa", data)
   apiJson.put(process.env.REACT_APP_API_BASE_URL+"club/updateProfileClub/"+userData.id+'/'+userData.role,data )
   .then((res)=>{
    console.log("res.data", res.data)
      toast.dismiss();
      toast.success("Successfully Updata Details")
     event.target.reset();
     fetchClubUserDetail();
     fetchClickClubUserDetail(userData.id, userData.role);
     setshowDetailModal(false)
   }).catch((error)=>{
    setshowDetailModal(false)
    toast.error("Internal Server Error")
   })
  }

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  
  return (
    <>
         <div className="rounded-4  hover-shadow-for-component mb-4- pb-" style={{background:'var(--club-component-backgroun'}}>
            <div className="col p-5" >

              <div className='col-12'>
                <div className='row'>
                  <div className='col-12 col-lg-3'>
                  <div className='col-11' style={{ height: "150px", width: "150px"}}>
                  {/* <div className='d-flex justify-content-betwee'> */}
                    <CircularProgressbarWithChildren
                  value={profileUser?.profilePercentage}
                  maxValue={100}
                  text={profileUser?.profilePercentage}
                  styles={buildStyles({
                    pathColor:
                    profileUser?.profilePercentage < 40 ? "red" : profileUser?.profilePercentage < 80 ? "orange" : "#9555fd",
                })}
                  >
                    <div style={{height: "125px", width: "125px"}}>
                  <Avatar className='h-100 w-100'
                  src={profileUser?.logo || profileUser?.profile }
                />
                </div>
                  </CircularProgressbarWithChildren >
                  </div>
                  </div>

                  <div className='col-12 col-md-11 col-lg-9'>
                    <div className='col-12 col-md-12 col-lg-12'>
                      {/* new */}
                            <div className='d-flex justify-content-end' style={{position: "relative"}}>
                                <div className='pro text-center d-flex justify-content-center align-items-center' style={{ width: "51px", height: "21px", borderRadius: "5px",position: "absolute" }}><span className='pr  fw-700 fs-13px'>PRO</span></div>
                            </div>
                            <div className='mt-2'>
                      { clickuserDetail?.role==='student'? 
                      <span className='fw-700 fs-33px'>{profileUser?.first_name+" "+profileUser?.last_name}</span>
                      : <span className='fw-700 fs-33px'>{profileUser?.institution_name}</span>
                          }
                            </div>

                            <div className='mt-2 d-flex'>
                                <div><span><img style={{ height: "26px", width: "26px" }} src="/ProfileImg/StudentCenter.png" alt="" /></span></div>
                                <div className='ms-2'><span className='fw-700 fs-15px' style={{ fontFamily: "Poppins" }}>{profileUser?.institution_name}</span></div>
                            </div>

                            <div className='d-flex justify-content-between mt-2'>
                                <div className='d-flex'>
                                    <div style={{ width: "42px", height: "42px", border: "3px solid #D58FFF", borderRadius: "50%", }}>
                                        <div className='d-flex justify-content-center align-items-center' style={{ width: "37px", height: "37px", color: "#1F0051", fontFamily: "Lexend", background: "#F7F3FF", borderRadius: "50%" }}>
                                            <span className=' fw-600 fs-9px' >MUN</span>
                                        </div>
                                    </div>
                                    <div className='ms-1' style={{ width: "42px", height: "42px", border: "3px solid #D58FFF", borderRadius: "50%" }}>
                                        <div className='d-flex justify-content-center align-items-center' style={{ width: "36px", height: "37px", color: "#1F0051", fontFamily: "Lexend", background: "#F7F3FF", borderRadius: "50%" }}>
                                            <span className='fw-600 fs-9px' >YMP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className='mt-3'><span className='fw-700 fs-14px'>Carbon Credits</span></div>
                                    <div className='ms-3 mt-3 d-flex justify-content-center align-items-center' style={{ background: "#FAF2AB", borderRadius: "6px", width: "31px", height: "25px" }}><span className='fw-600 fs-13px'>1</span></div>
                                </div>
                            </div>
                      
                      
                    </div>

                  </div>
                </div>
              </div>


              <div className='mt-5'>
                        <div className='d-flex'>
                            <div>

                                <div className='d-flex'>
                                    <div className='d-flex'>
                                        <div><img src="/ProfileImg/Timeline.png" alt="" /></div>
                                        <div className=''><span className='ms-2 fw-700 fs-16-07px' style={{ fontFamily: "Inter" }}>Events</span></div>
                                    </div>
                                    <div className='profileEvents' style={{ marginLeft: "100px" }}>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                              {/* <img src="/ProfileImg/Flag.png" alt="" /> */}
                                              <FlagTwoToneIcon sx={{color: "#bbdefb"}}
                                              />
                                              </div>
                                            <div className='ms-2'><span className='  fw-700 fs-15px' style={{ fontFamily: "Inter", color: "#444444" }}>Current UN Representative for USA</span></div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <EmojiObjectsOutlinedIcon sx={{ color: "yellow", background: "#fbc02d", borderRadius: "50%" }} />
                                            </div>
                                            <div className='ms-2'><span className='fw-700 fs-15px' style={{ fontFamily: "Inter", color: "#444444" }}>Current Youth Innovator @ YMH</span></div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <div><img src="/ProfileImg/indianFlag.svg" alt="" /></div>
                                            <div className='ms-2'><span className='fw-700 fs-15px' style={{ fontFamily: "Inter", color: "#444444" }}>Former Prime Minister of India</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex mt-3'>
                                    <div className='d-flex' style={{ marginTop: "" }}>
                                        <div><img src="/ProfileImg/militaryMedal.svg" alt="" /></div>
                                        <div className=''><span className='ms-2 fw-700 fs-16-07px' style={{ fontFamily: "Inter" }}>Achievements</span></div>
                                    </div>
                                    <div className='ms-5' style={{ marginLeft: "" }}>
                                        <div><span className='fw-600 fs-14-07px' style={{ fontFamily: "inter" }}>{clickclubUserDetail?.achievements}</span></div>
                                        {/* <div><span className='fw-600 fs-14-07px' style={{ fontFamily: "inter" }}>2nd Prize <span className='fw-400'>in</span> Singing Competition</span></div> */}
                                    </div>
                                </div>

                                <div className='d-flex mt-2' >
                                    <div className='d-flex' style={{ marginTop: "" }}>
                                        <div><img  src="/ProfileImg/handball.svg" alt="" /></div>
                                        <div className=''><span className='ms-2 fw-700 fs-16-07px' style={{ fontFamily: "Inter" }}>Extra Curriculum </span></div>
                                    </div>
                                    <div className='ms-4'>
                                        <div><span className='fw-600 fs-14-07px' style={{ fontFamily: "inter" }}>{clickclubUserDetail?.extra_curriculum}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
          </div>
          <Modal
        show={showDetailModal}
        onHide={() => {
          setshowDetailModal(false);
        }}
      >
        <Modal.Header>Add Details</Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleChangeDetail}>
          <div className="form-floating mb-3">
          <input type="text" value={small_bio} onChange={(e)=>setsmall_bio(e.target.value)}  className="form-control rounded-1" name="Education" />
          <label htmlFor="companyName">Bio</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" value={education} onChange={(e)=>seteducation(e.target.value)}  className="form-control rounded-1" name="Education" />
          <label htmlFor="companyName">Education</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text"value={achievements} onChange={(e)=>setachievements(e.target.value)} className="form-control rounded-1" name="Achievements" />
          <label htmlFor="designation">Achievements</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" value={extra_curriculum} onChange={(e)=>setextra_curriculum(e.target.value)} className="form-control rounded-1" name="ExtraCurriculum" />
          <label htmlFor="shortDescription" >Extra Curriculum</label>
        </div>
       
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClubProfileTopDetail
