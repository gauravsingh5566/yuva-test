import { YmBreadCrumbs } from 'pages/ModelUnParliament'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { StudentCourseDescriptions, StudentCourseSidePanel } from './component'

export const StudentCoursePlayerContainer = () => {
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
                <div className="row g-0">
                    <div className="col-12 col-md-8 col-xxl-9">
                        <YmBreadCrumbs start="Courses" middle={data?.theme} end={data?.course_title} />
                        <div className='px-0 px-md-2  px-lg-5 my-2'>

                            <Outlet />
                            <StudentCourseDescriptions />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xxl-3 my-4 px-2 ">
                        <StudentCourseSidePanel />
                    </div>
                </div>
            </div>

        </>
    )
}
