import React from "react";
import { UI2Feature } from ".";
import { useGlobalContext } from "global/context";
import MosqueTwoToneIcon from '@mui/icons-material/MosqueTwoTone';
import CastForEducationTwoToneIcon from '@mui/icons-material/CastForEducationTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import CopyrightTwoToneIcon from '@mui/icons-material/CopyrightTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
export const UI2DashboardFeatures = () => {
  const { userData } = useGlobalContext();
 const role = userData?.role
 
  const features = [
    {
      id: 1,
      featureIcon: <AccountCircleTwoToneIcon className="dashboardIcon"/>,
      name: "Profile",
      url:role==="institute" ?`/profile/institute/${userData.id}` :`/profile/user/${userData.id}`,
      isDiseble:false
    },
    {
      id: 2,
      featureIcon: <RssFeedTwoToneIcon className="dashboardIcon"/>,
      name: "Feeds",
      url:role==="institute" ?`/profile/institute/${userData.id}` :`/profile/user/${userData.id}`,
      isDiseble:true,

    },
    {
      id: 3,
      featureIcon: <CopyrightTwoToneIcon className="dashboardIcon"/>,
      name: "Carbon Credits",
      url:"/new-dashboard",
      isDiseble:true,

    },
    {
      id: 4,
      featureIcon: <EmojiEventsTwoToneIcon className="dashboardIcon" />,
      name: "Events",
      url:"/new-dashboard",
      isDiseble:true,
    },
    {
      id: 5,
      featureIcon: <CardMembershipTwoToneIcon className="dashboardIcon" />,
      name: "Clubs",
      url:"/new-dashboard",
      isDiseble:true,

    },
    {
      id: 6,
      featureIcon: <MessageTwoToneIcon className="dashboardIcon" />,
      name: "Discussion Boards",
      url:"/new-dashboard/discussion-board",
      isDiseble:false
    },
    {
      id: 7,
      featureIcon: <SchoolTwoToneIcon className="dashboardIcon" />,
      name: "Student SSO",
      url:"/new-dashboard",
      isDiseble:true,
  
    },
    {
      id: 8,
      featureIcon: <InfoTwoToneIcon className="dashboardIcon" />,
      name: "Notice Board",
      url:"/new-dashboard",
      isDiseble:true,
  
    },
    {
      id: 9,
      featureImg: "/ui2.0dashboard/Laurel Wreath.svg",
      name: "Secretariats",
      url:"/new-dashboard",
      isDiseble:true,
    },
    {
      id:10,
      featureIcon: <AutoStoriesTwoToneIcon className="dashboardIcon" />,
      name:"My Courses",
      isDiseble:false,
      url:"/new-dashboard/my-courses",

    }
  ];
  return (
    <>
      <div className="w-100 rounded-4 shadow">
        <div className="row">
          <div className="row px-5">
            <h3 className="fs-3 fw-bolder py-3">Dashboard</h3>
            {features.map((feature, index) => {
              return (
                <>
                  <div className="col-6 col-sm-6 col-md-3 col-lg-2 " key={feature.id}>
                    <UI2Feature data={feature} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
