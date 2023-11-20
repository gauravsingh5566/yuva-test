import React from 'react'
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import { useNavigate } from 'react-router-dom';

export const StudentCourseCard = ({data}) => {
    const navigate= useNavigate();
    const handleNavigate= (id) =>{
        navigate(`/new-dashboard/all-courses/course-overview/${id}`)
    }
    return (
        <>
            <div className='course-card cursor-pointer my-2'>
                <div className="image-Container position-absolute">
                    <img src={data?.bg_image} alt="Shailesh" />
                </div>
                <div class="overlay-container">
                    <img src={data?.thumbnail}  alt="Overlay Image" />
                </div>
                <p className='CardTitle mt-2 mb-0'>{data?.course_title}</p>
                <p className='CourseText mt-1'>A course by <span className='courseBy'>{data?. course_by}</span></p>

                <div className="d-block d-md-flex justify-content-md-between mt-2">
                    <div className="d-flex flex-column">
                        <span className='CourseText'>Language:  <span className='courseBy'>{data?.language}</span></span>
                        <span className='CourseText'>Duration:  <span className='courseBy' style={{ color: "#555555" }}>{data?.duration}</span></span>
                    </div>
                    <button className='cartbutton rounded-3 cursor-pointer' onClick={()=>{
                        handleNavigate(data.id)
                    }}>
                        <LocalMallTwoToneIcon sx={{ fontSize: "17px", paddingBottom: "2px" }} />Enroll a course
                    </button>
                </div>
            </div>
        </>
    )
}
