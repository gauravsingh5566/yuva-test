import React from 'react'
import SmartDisplayTwoToneIcon from '@mui/icons-material/SmartDisplayTwoTone';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { useNavigate } from 'react-router-dom';
export const StudentResumeCard = ({data}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='course-card cursor-pointer my-2'>
                <div className="image-Container position-absolute">
                    <img src={data?.bg_image} alt="Shailesh" />
                </div>
                <div class="overlay-container">
                    <img src={data?.thumbnail} alt="Overlay Image" />
                </div>
                <div className='courseStatus'>
                 {data?.status === "Complete"  ? (<><span className='fs-11 px-2 py-1 rounded-3' style={{background:"#DDFFE7", border:"1px solid #92FFB7", color:"#92FFB7" ,fontWeight:700}}>Completed</span></>) :(<><span className='fs-11 px-2 py-1 rounded-3' style={{background:"#FFF8B5", color:"#A6A900", border:"1px solid #A6A900",fontWeight:700}}>In Progress</span></>)}
                </div>
                <p className='CardTitle mt-2 mb-0'>{data?.course_title}</p>
                <p className='CourseText mt-1'>A course by <span className='courseBy'>{data?.course_by}</span></p>

                <div className="d-block d-md-flex justify-content-md-between mt-2">
                    <div className="d-flex flex-column">
                        <span className='CourseText'>Language:  <span className='courseBy'>{data?.language}</span></span>
                        <span className='CourseText'>Duration:  <span className='courseBy' style={{ color: "#555555" }}>{data?.duration}</span></span>
                    </div>
                    <button className='cartbutton rounded-3 cursor-pointer' onClick={() => {
                        navigate("/new-dashboard/student-course")
                    }}>
                        {data?.status === "Complete" ? <ForwardOutlinedIcon sx={{ fontSize: "17px", paddingBottom: "2px" }} /> :<SmartDisplayTwoToneIcon sx={{ fontSize: "17px", paddingBottom: "2px" }} />} {data?.status === "Complete" ? "Completed" : "Resume Course" }
                    </button>
                </div>
            </div>
        </>
    )
}
