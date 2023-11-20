import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import VerifiedIcon from '@mui/icons-material/Verified';
import MessageIcon from '@mui/icons-material/Message';
import { apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import { useLocation, useNavigate } from 'react-router-dom';

const ClubProfileRightComponent = () => {
  const [allStudent, setAllstudent] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const {userData} = useGlobalContext()

  const getAllStudent = ()=>{
      const id = userData?.role === "institute"?userData?.id: userData?.instituteId
      apiJson(`api/v2/getAllProfile/getAllFriendTeacher/${id}`)
      .then((res)=>{
        console.log(res.data.allStudents)
        setAllstudent(res?.data?.allStudents)
      }).catch((error)=>{
        console.log("error", error.message);
      })
 
  }

   useEffect(()=>{
    getAllStudent();
   },[])

  return (
    <>
          <div>
        {
        allStudent?.length > 0 ? (
            <Card className='col-10' style={{borderRadius: "18px"}}>
                <Card.Body>
                      <div>
                      <div className='mb-4 d-flex justify-content-between'>
                        <div>
                        <h6 style={{fontWeight: "700", fontSize: "16.07px",fontFamily: "inter"}}>Students</h6>
                        </div>
                        <div>
                        <h6 style={{fontWeight: "500", fontSize: "14.07px",fontFamily: "inter", color: "#8A5300"}}>See all</h6>
                        </div>
                      </div>
                      {
                        allStudent?.slice(0, 5)?.map((ele)=> {
                          return (
                            <div onClick={()=> navigate(`/profile/user/${ele?.id}`)}>
                              <div style={{cursor:'pointer', marginTop: "10px"}} className='people-card d-flex align-items-center'>
                          <div className='people-left me-2' style={{height: "43px",width: "48px"}}>
                            <Avatar className='h-100 w-100' src={ ele?.profile === null && ele?.gender === 'male' ? "/ProfileImg/boyImg.jpg" : ele?.profile === null && ele?.gender === 'female' ? "/ProfileImg/girlImg.jpg" : ele?.profile  }>
                            </Avatar>
                          </div>

                          <div className='d-flex justify-content-between col-10'>
                          <div className='d-flex'>
                          <div className='people-right d-flex flex-column ms-2'>
                              <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "13.07px"}} className='fw-bold'>{ele?.first_name+" "+ele?.last_name}</span>
                              <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "9.07px", color: "#848484"}}>{ele.role}</span>
                          </div>
                          <div className='d-flex align-items-center ms-1' style={{height: "20px", width: "15px"}}>
                          <VerifiedIcon className='h-100 w-100' sx={{color: "#1da1f2"}}/>
                          </div>
                          </div>

                          <div>
                            <div className='d-flex justify-content-center align-items-center' style={{ background: "#FFE3C3", height: "35px", width: "35px",borderRadius: "3px"}}>
                            <div style={{height: "25px", width: "25px",background: "#FFE3C3"}}>
                              <MessageIcon sx={{color: "#F29D38"}} className='h-100 w-100'/>
                            </div>
                            </div>
                          </div>
                          </div>
                        </div>
                            </div>
                          )
                        })
                      }
                      <div className=''>
                      </div>
                    </div>
                </Card.Body>
            </Card>
                    ) : ( null )
                  }
            </div>

    </>
  )
}

export default ClubProfileRightComponent