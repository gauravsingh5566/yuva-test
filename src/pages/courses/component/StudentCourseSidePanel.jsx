import { Divider } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
export const StudentCourseSidePanel = () => {
  const [seeMore, setSeeMore] = useState(false)
  return (
    <>
      <h1 style={{ fontSize: "13px", fontWeight: 600 }}>About the Course</h1>
      <div className='d-flex mt-2'>
        <div>
          <img src="/ui2.0dashboard/Rectangle 3405.svg" alt="Yuvamanthan" />
        </div>
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>
          <p className='mb-0 fs-11' style={{ color: "#000000" }}>Yuvamanthan</p>
          <p className='fs-9 m-0'>Organization</p>
        </div>

      </div>
      {/* ===============See more and see less Section start========== */}
      {seeMore ? (<>
        <p className='fs-11 mt-2' style={{ color: "#565656", fontWeight: 300 }}>This course is designed for participants of Yuvamanthan United Nations Event to aware students about the process of the event.This course is designed for participants of Yuvamanthan United Nations Event to aware students about the process of the event.<span className='fs-11 cursor-pointer' style={{ color: "#4200FF" }} onClick={() => {
          setSeeMore(!seeMore)
        }}>See Less</span></p>
      </>) : (<> <p className='fs-11 mt-2' style={{ color: "#565656", fontWeight: 300 }}>This course is designed for participants of Yuvamanthan United Nations Event to aware students about the process of the event...<span className='fs-11 cursor-pointer' style={{ color: "#4200FF" }} onClick={() => {
        setSeeMore(!seeMore)
      }}>See More</span></p></>)}
      <Divider className='borderBottom' sx={{ marginBottom: "20px" }} />
      {/* ===============See more and see less Section End========== */}
      <div className="d-flex align-items-center justify-content-between ">
        <span className="" style={{ fontSize: "13px", fontWeight: 600, color: "#000000" }}>
          Course Completion
        </span>
        <span className="">
          0/100
        </span>
      </div>
      <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: "7px" }}>
        <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%",color:"#7000FF" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
     {/*============= Course Module section start =============== */}
      <div className="coursemodules mt-4">
         <div className='fs-11 mt-2' style={{color:"#797979",fontWeight:"700"}}>Introduction</div>
          <div className="d-flex justify-content-between">
            <div className='d-flex mb-0'>
            <p className='mb-0 fs-11  me-2'>1</p>
            <p className='fs-11 mb-0' style={{color:"#757575"}}>Introduction to Yuvamanthan</p>
            </div>
           
            <span><CheckIcon  color='success' sx={{height:15, width:18,color:"#42B000"}}/></span>
          </div>
          <div className='fs-11 mt-2' style={{color:"#797979",fontWeight:"700"}}>The Orientation</div>
          <div className="d-flex justify-content-between">
            <div className='d-flex mt-2'>
            <p className='fs-11 mb-0 me-2'>2</p>
            <p className='fs-11 mb-0' style={{color:"#757575"}}>United Nations</p>
            </div>
         
            <span><CheckIcon  color='success'sx={{height:15, width:18,color:"#42B000"}}/></span>
          </div>
          <div className="d-flex justify-content-between">
            <div className='d-flex mt-2'>
            <p className='mb-0 fs-11 me-2'>3</p>
            <p className='fs-11  mb-0' style={{color:"#757575"}}>United Nation Development Programme</p>
            </div>
          </div>
          <div  className='fs-11 mt-2 ' style={{color:"#797979",fontWeight:"700"}}>Assessment</div>
          <div className="d-flex justify-content-between">
            <div className='d-flex mt-2'>
            <p className='mb-0 fs-11 me-2 '>4</p>
            <p className='fs-11 mb-0' style={{color:"#757575"}}>Certification Test</p>
            </div>
            
            <span><LockTwoToneIcon  sx={{color:"#B7B7B7" ,height:14,width:12}}/></span>
          </div>
        </div>

      <Divider className='borderBottom' sx={{ marginBottom: "20px" }} />

        <button className='cartbutton cursor-pointer rounded-3' style={{width:"283px"}}>  <WorkspacePremiumTwoToneIcon />Apply for Certificate</button>
    </>
  )
}
