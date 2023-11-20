import { YmBreadCrumbs } from 'pages/ModelUnParliament'
import React, { useState } from 'react'
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import ClosedCaptionOffTwoToneIcon from '@mui/icons-material/ClosedCaptionOffTwoTone';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
import AccessAlarmsTwoToneIcon from '@mui/icons-material/AccessAlarmsTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const StudentCourseOverView = () => {
    const [data, setData] = useState(
        {
            id: 1,
            course_title: "Model United Nations Orientation ",
            course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
            course_by: " Yuvamanthan",
            language: "English,Hindi",
            duration: "30 minutes",
            price: "100$",
            theme: "United Nations",
            bg_image: "/ui2.0dashboard/Rectangle 3397.svg",
            thumbnail: "/ui2.0dashboard/Rectangle 3404.svg",
            students: "2100",
            subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
            additional_resourses: "12 files",
            certificate: "Upon completion of the course",
            author: "Educational Initiatives (EI)",
            license_terms: "CC BY 4.0",
            Copyright: "CBSE and EI, 2021"

        },
    )
    const navigate = useNavigate()
    return (
        <>
            <div className="col-12 col-md-12" >

                <YmBreadCrumbs start="Courses" middle={data?.theme} end={data?.course_title} />
                <div className='px-0 px-md-2  px-lg-5 my-2'>
                    {/* =============Top  row  section =================== */}
                    <div className="row">
                        <div className="col-12 col-md-8 p-0 ">
                            <div className="courceBanner position-absolute ">
                                <img src={data?.bg_image} alt="banner" style={{ width: "566px" }} />
                            </div>
                            <div className="position-relative" style={{ top: "325px", left: "50px" }}>
                                <img src={data?.thumbnail} alt="" />
                            </div>
                            <p className='CourseText mt-1 position-relative' style={{ top: "285px", left: "135px" }}>A course by <span className='courseBy'>{data?.course_by}</span></p>

                        </div>
                        <div className="col-12 col-md-4 p-0">
                            <h1 style={{ fontSize: "49px", fontWeight: "400" }}>1.00 <span style={{
                                fontSize: "26px",
                                fontWeight: "400"
                            }}>INR</span></h1>
                            {/* ============Lession and Difficult  section start ==============  */}
                            <div className='d-flex flex-row justify-content-between rounded-2 p-2' style={{ background: "#E6E6E6" }}>
                                <div className='d-flex align-items-center'>
                                    <span>
                                        <LibraryBooksTwoToneIcon sx={{ color: "#666666", marginRight: "10px" }} />

                                    </span>
                                    <div className=''>
                                        <span className='fs-9 mt-1'>LESSONS</span>
                                        <p className='fs-11'>3</p>
                                    </div>
                                </div>
                                <Divider orientation="vertical" flexItem sx={{ borderWidth: "1px" }}>
                                </Divider>
                                <div className="d-flex align-items-center">
                                    <span><BarChartTwoToneIcon sx={{ color: "#666666", marginRight: "10px" }} /></span>
                                    <div className=''>
                                        <span className='fs-9 mt-1'>DIFFICULTY</span>
                                        <p className='fs-11'>Easy</p>
                                    </div>

                                </div>
                            </div>
                            {/* ================= Course Details Section start ======================== */}
                            <section>
                                <div className="d-flex flex-column my-2">
                                    <div className="d-flex">
                                        <span> <SchoolTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Students: <span className='fs-11 courseIconDetail'>4230</span></span>
                                    </div>
                                    <div className="d-flex">
                                        <span> <VolumeUpTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Language: <span className='fs-11 courseIconDetail'>English, Hindi</span></span>
                                    </div>
                                    <div className="d-flex">
                                        <span> <ClosedCaptionOffTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Subtitles: <span className='fs-11 courseIconDetail'>English, Hindi, Punjabi, Tamil, Telugu, Malayalam, Oriya</span></span>
                                    </div>
                                    <div className="d-flex">
                                        <span> <InsertDriveFileTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Additional resources: <span className='fs-11 courseIconDetail'>12 files</span></span>
                                    </div>
                                    <div className="d-flex">
                                        <span> <AccessAlarmsTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Duration: <span className='fs-11 courseIconDetail'>20m</span></span>
                                    </div>
                                    <div className="d-flex">
                                        <span> <WorkspacePremiumTwoToneIcon className='courceIcon' /></span>
                                        <span className='fs-11 courseIconTitle'>Certificate: <span className='fs-11 courseIconDetail'>Upon completion of the course</span></span>
                                    </div>
                                </div>
                                <div className=" d-block d-md-flex justify-content-md-evenly">
                                    <button className='cartbutton rounded-3 cursor-pointer' onClick={()=>{
                                        navigate("/new-dashboard/student-course")
                                    }}>
                                        <LocalMallTwoToneIcon sx={{ fontSize: "17px", paddingBottom: "2px", }} />Enroll a course
                                    </button>
                                    <button className='cartbutton rounded-3 cursor-pointer' style={{ background: "#CCCCCC", border: "1px solid #CCCCCC", color: "#7000FF" }}>
                                        <img src="/ui2.0dashboard/Share.svg" alt="Share" /> Share
                                    </button>
                                </div>

                                <Divider className='borderBottom' />
                            </section>
                        </div>
                    </div>
                    {/* =============Bottom row  section =================== */}
                    <div className="row my-4">
                        <div className="col-12 col-md-8">
                            <h1 style={{ fontSize: "31px", fontWeight: 600 }}>Model United Nations Orientation </h1>
                            <p style={{ fontSize: "13px", fontWeight: 300 }}>The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <p className='fs-11 p-0 mb-0' style={{ color: "#BCBCBC", fontWeight: 500 }}>Author</p>
                            <span className='fs-11' style={{ color: "#000000", fontWeight: 600 }}>Educational Initiatives (EI)</span>
                            <p className='fs-11 p-0 mb-0' style={{ color: "#BCBCBC", fontWeight: 500 }}> License terms</p>
                            <span className='fs-11' style={{ color: "#000000", fontWeight: 600 }}>CC BY 4.0</span>
                            <p className='fs-11 p-0 mb-0' style={{ color: "#BCBCBC", fontWeight: 500 }}>  Copyright</p>
                            <span className='fs-11' style={{ color: "#000000", fontWeight: 600 }}>CBSE and EI, 2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
