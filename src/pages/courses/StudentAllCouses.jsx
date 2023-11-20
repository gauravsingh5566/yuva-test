import { YmBreadCrumbs } from 'pages/ModelUnParliament'
import React, { useEffect, useState } from 'react'
import { StudentCourseCard } from './component';
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
        theme: "United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3399.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3402.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021"

    },
    {
        id: 2,
        course_title: "Certified Mission Life Yuva",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: " Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme: "United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3398.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3403.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021"


    },
    {
        id: 3,
        course_title: "Certified Mission Life Yuva",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: " Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme: "United Nations",
        bg_image: "/ui2.0dashboard/Rectangle 3398.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3403.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021"


    },
    {
        id: 4,
        course_title: "Model United Nations Orientation ",
        course_disc: "The G20 Genius Certification Course is an advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations. This course covers the policies, initiatives, and strategies of the G20, the world's leading forum for international economic cooperation. Students will learn about the history and evolution of the G20, its role in global economic governance, and the major economic and political issues facing the group.",
        course_by: "Yuvamanthan",
        language: "English,Hindi",
        duration: "30 minutes",
        price: "100$",
        theme: "Model G20",
        bg_image: "/ui2.0dashboard/Rectangle 3399.svg",
        thumbnail: "/ui2.0dashboard/Rectangle 3402.svg",
        students: "2100",
        subtitles: ["English", "Hindi", "Punjabi", "Tamil", "Telugu", "Malayalam", "Oriya"],
        additional_resourses: "12 files",
        certificate: "Upon completion of the course",
        author: "Educational Initiatives (EI)",
        license_terms: "CC BY 4.0",
        Copyright: "CBSE and EI, 2021"


    }
]

export const StudentAllCouses = () => {
    const [allCourses, setAllCourses] = useState(AllCourses);
    const [getUnCourses, setUnCourses] = useState([]);
    const [getG20Courses, setG20Courses] = useState([]);
    const navigate = useNavigate();
    console.log(getG20Courses, "course")

    useEffect(() => {
        setAllCourses(AllCourses);
    }, [])
    const filterUnCource = () => {
        const UnCourses = allCourses.filter((unItem) => {
            return unItem.theme === "United Nations"
        });
        setUnCourses(UnCourses);
    }
    const filterG20Courses = () => {
        const G20Courses = allCourses.filter((item) => {
            return item?.theme === "Model G20"
        })
        setG20Courses(G20Courses)

    }
    useEffect(() => {
        if (allCourses.length > 0) {
            filterG20Courses();
            filterUnCource();
        }
    }, [])

    return (
        <>
            <div className="col-12 col-md-12" >
                <div className='d-flex justify-content-between'>

                    <YmBreadCrumbs start="Courses" />
                    <span className='cursor-pointer' style={{ fontSize: "17px", fontWeight: "700", color: "#7000FF" }} onClick={() => {
                        navigate("/new-dashboard/my-courses")
                    }}>My courses</span>
                </div>

                <div className='px-0 px-md-2 px-lg-5 '>
                    <p className='courses-title text-break fw-semibold'>United Nations</p>
                    <div className="d-flex flex-wrap">
                        {/* ============= Course details cards start ===============*/}
                        {getUnCourses.map((item) => {
                            return (<>
                                <StudentCourseCard key={item?.id} data={item} />
                            </>)
                        })}
                        {/* ============= Course details cards end ===============*/}
                    </div>

                </div>
                <div className='px-0 px-md-2  px-lg-5 my-4'>
                    <p className='courses-title text-break fw-semibold'>Model G20</p>
                    <div className="d-flex">
                        {/* ============= Course details cards start ===============*/}
                        {getG20Courses.map((item) => {
                            console.log(item, "item==")
                            return (<>

                                <StudentCourseCard key={item?.id} data={item} />
                            </>)
                        })}
                        {/* ============= Course details cards end ===============*/}
                    </div>

                </div>
            </div>
        </>
    )
}
