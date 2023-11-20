import React from "react";
import { UI2Feature } from ".";
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone';
import MarkChatUnreadTwoToneIcon from '@mui/icons-material/MarkChatUnreadTwoTone';


const Activities = [
  {
    id: 1,
    featureIcon: <CloudDoneTwoToneIcon className="dashboardIcon"/>,
    name: "Carbon Footprint Calculator",
    url:"/new-dashboard/carbon-footprint/calculator",
    isDiseble:false
  },
  {
    id: 2,
    featureImg: "/ui2.0dashboard/Calendar today.svg",
    name: "21 Day Challenge",
    url:"/new-dashboard",
    isDiseble:true
  },
  {
    id: 3,
    featureImg: "/ui2.0dashboard/Eco.svg",
    name: "75 Steps to LiFE",
    url:"/new-dashboard",
    isDiseble:true
  },
  {
    id: 4,
    featureIcon: <MarkChatUnreadTwoToneIcon className="dashboardIcon"/>,
    name: "Career Assessment",
    url:"/new-dashboard",
    isDiseble:true
  },
  {
    id: 5,
    featureImg: "/ui2.0dashboard/Vector.svg",
    name: "QnA",
    url:"/new-dashboard",
    isDiseble:true
  },
];
export const UI2DashboardActivites = () => {
  return (
    <>
      <div className="w-100 rounded-4 shadow">
        {/* <========== Main Row  Start =========>*/}
        <div className="row">
          {/* <============== Main Left column start  ==========> */}
          <div className="col-md-9 col-sm-12 p-4">
            <h3 className="fs-3 fw-bolder px-4 py-4">Activities</h3>
            {/* <========== Activities card row start ===========> */}
            <div className="row px-2">
              {Activities?.map((activitie, index) => {
                return (
                  <>
                    <div
                      className="col-6 col-sm-6 col-md-4 col-lg-2  px-4"
                      key={index}
                    >
                      <UI2Feature data={activitie} />
                    </div>
                  </>
                );
              })}
            </div>
            {/* <========== Activities card row end ===========> */}
          </div>
          {/* <============== Main Left column End  ==========> */}

          {/* <============== Main Right column start  ==========> */}

          <div className=" col-md-3 col-sm-12">
            <div
              className="d-flex justify-content-center align-items-center  h-100 w-100 rounded-3 border-0"
              style={{
                background:
                  "linear-gradient(to bottom,#8E3FCC 0%, #8F0560 73%)",
                minHeight: "283px",
              }}
            >
              <h2 className="fs-2 fw-semibold text-white">Ads</h2>
            </div>
          </div>
          {/* <============== Main Right column end  ==========> */}
        </div>
        {/* <========== Main Row End=========>*/}
      </div>
    </>
  );
};
