import { apiJson } from 'api'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist'
import { Avatar } from '@mui/material'
import { Card } from 'react-bootstrap'
import VerifiedIcon from '@mui/icons-material/Verified';
import MessageIcon from '@mui/icons-material/Message';
import { useGlobalContext } from 'global/context'

const ClubProfileRightTrendingBlogs = () => {
    const navigate = useNavigate()
    const [allBlogs , setAllBlogs] = useState([])
  const [allTeacher, setAllTeacher] = useState([])
  const location = useLocation()
  const {userData} = useGlobalContext()

    const fetchBlogs = ()=>{
        apiJson('club/getAllBlogs/')
        .then((res)=>{
            setAllBlogs(res.data.results)
        })
    }

    const getAllTeacher =()=>{
      try {
         apiJson(`api/v2/getAllProfile/getAllFriendTeacher/${userData.role === "institute"?userData?.id: userData?.instituteId}`)
         .then((res)=>{
           setAllTeacher(res?.data?.allTeachers)
         })
       } catch (error) {
         console.log(error.message)
       }
      }
   
      useEffect(()=>{
       getAllTeacher()
      },[location.pathname])

    // useEffect(()=>{
    //     fetchBlogs()
    // },[])

  return (
    <>
<div>     
        {
          allTeacher?.length > 0 ? (
            <Card className='col-10' style={{borderRadius: "18px"}}>
                <Card.Body>
                    <div>
                      <div className='mb-4 d-flex justify-content-between'>
                        <div>
                        <h6 style={{fontWeight: "700", fontSize: "16.07px",fontFamily: "inter"}}>Teachers</h6>
                        </div>
                        <div>
                        <h6 style={{fontWeight: "500", fontSize: "14.07px",fontFamily: "inter", color: "#8A5300"}}>See all</h6>
                        </div>
                      </div>

                      {
                        allTeacher?.map((ele)=>{
                          return (
                          <div className=''  onClick={()=> navigate(`/profile/user/${ele?.id}`)}>
                            <div style={{cursor:'pointer', marginTop: "10px"}} className='people-card d-flex align-items-center'>
                              <div className='people-left me-2' style={{height: "43px",width: "48px"}}>
                                <Avatar className='h-100 w-100' src={ ele?.profile === null && ele?.gender === 'male' ? "/ProfileImg/boyTeacher.png" : ele?.profile === null && ele?.gender === 'female' ? "/ProfileImg/girlTeacher.png" : ele?.profile}>
                                </Avatar>
                              </div>

                              <div className='d-flex justify-content-between col-10'>
                              <div className='d-flex'>
                              <div className='people-right d-flex flex-column ms-2'>
                                  <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "13.07px"}} className='fw-bold'>{ele?.first_name+" "+ele?.last_name}</span>
                                  <span  style={{fontFamily: "Inter",fontWeight: "500", fontSize: "9.07px", color: "#848484"}}>{ele?.role}</span>
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
                    </div>
                </Card.Body>
            </Card>
          ) : (null)
        }
            
        </div>


        {/* <Card className='' style={{borderRadius: "18px"}}>
            <Card.Body>
                <div >
                <div className='top d-flex justify-content-between '>
                                                <h5 className='' style={{fontSize:'14.04px',fontWeight: "700",fontFamily: "Inter"}}>Trending Blogs</h5>
                                                <span style={{cursor:'pointer'}}>See all</span>
                                            </div>
                    {
                        (allBlogs?.slice(0,3).map((blog)=>{
                            return (
                                <Card onClick={()=>navigate('/blog/'+blog.slug)} className='border-0' key={blog.id} 
                                    style={{height:'114px', cursor:'pointer'}}
                                >
                                    <Card.Body>
                                        <div>
                                            
                                            <div className='d-flex'>
                                                <div style={{width:'113px', height:'75px'}} className='img-left me-4'>
                                                    <img style={{objectFit:'cover'}} className='w-100 h-100 rounded-2' src={"https://dev-yuvamanthan.s3.ap-south-1.amazonaws.com/clubs/post1071maxresdefault-%281%29.jpg"} alt='img' />
                                                </div>
                                                <div className=''>
                                                    <div className='mid-top'>
                                                        <h6>{blog?.title}</h6>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        <hr/>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }))
                    }
            </div>
            </Card.Body>
        </Card> */}
    </>
  )
}

export default ClubProfileRightTrendingBlogs
