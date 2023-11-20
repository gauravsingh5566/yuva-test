import React, { useEffect, useState } from 'react'
import { StudentResumeCard } from './component'
import { YmBreadCrumbs } from 'pages/ModelUnParliament';
import { useNavigate } from 'react-router-dom';
const AllCourses = [
    {
        id: 1,
        course_title: "Model United Nations Orientation ",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: " Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme:"United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3399.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3402.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021",
        status:"Complete"
    },
    {
        id: 2,
        course_title: "Certified Mission Life Yuva",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: " Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme:"United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3398.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3403.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021",
        status:"In-Progress"

    },
    {
        id: 3,
        course_title: "Certified Mission Life Yuva",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: " Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme:"United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3398.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3403.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021",
        status:"In-Progress"

    },
    {
        id: 4,
        course_title: "Model United Nations Orientation ",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: "Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme:"Model G20",
        bg_image: "/ui2.0dashboard/Rectangle 3399.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3402.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021",
        status:"In-Progress"

    }
]
export const StudentMyCourses = () => {
    const [allCourses, setAllCourses] = useState(AllCourses);
    const [getCompleteCourses,setCompleteCourses] = useState ([]);
    const [getInProgressCourse,setInProgressCourse] = useState([]);
    const navigate = useNavigate()
    console.log(getInProgressCourse,"course")

    useEffect(()=>{
        setAllCourses(AllCourses);
    },[])
    const filterUnCource = () =>{
        const UnCourses= allCourses.filter((unItem) =>{
        return unItem.status ==="Complete"
        });
        setCompleteCourses(UnCourses);
    }
    const filterG20Courses = () =>{
        const G20Courses = allCourses.filter((item) => {
            return item?.status==="In-Progress"
        })
        setInProgressCourse(G20Courses)

    }
    useEffect(()=>{
     if(allCourses.length>0){
        filterG20Courses();
        filterUnCource();
     }
    },[])
    return (
        <>
            <div className="col-12 col-md-12" >
              <div className='d-flex justify-content-between'>

                <YmBreadCrumbs start="My Courses" />
                <span className='cursor-pointer' style={{fontSize:"17px",fontWeight:"700", color:"#7000FF"}} onClick={()=>{
                    navigate("/new-dashboard/all-courses")
                }}>View all courses</span>
              </div>
                <div className='px-0 px-md-2 px-lg-5 '>
                    <p className='courses-title text-break fw-semibold'>Resume Courses</p>
                    <div className="d-flex flex-wrap">
                        {/* =============Resume  Course details cards start ===============*/}
                        {getInProgressCourse.map((item) => {
                            return (<>
                                <StudentResumeCard key={item?.id} data={item} />
                            </>)
                        })}
                        {/* ============= Resume Course details cards end ===============*/}
                    </div>

                </div>
                <div className='px-0 px-md-2  px-lg-5 my-4'>
                    <p className='courses-title text-break fw-semibold'>Completed</p>
                    <div className="d-flex">
                        {/* =============Complete Course details cards start ===============*/}
                        {getCompleteCourses.map((item) => {
                            console.log(item, "item==")
                            return (<>

                                <StudentResumeCard key={item?.id} data={item} />
                            </>)
                        })}
                        {/* ============= Course details cards end ===============*/}
                    </div>

                </div>
            </div>
        </>
    )
}
