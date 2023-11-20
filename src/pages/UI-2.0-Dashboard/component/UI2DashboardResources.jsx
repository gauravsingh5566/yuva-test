import React from "react";
import { UI2Feature } from ".";
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone';
import CloudCircleSharpIcon from '@mui/icons-material/CloudCircleSharp';
const features = [
  {
    id: 1,
    featureIcon: <CloudDoneTwoToneIcon className="dashboardIcon"/>,
    name: "Lifestyle for Environment",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 2,
    featureIcon: <CloudCircleSharpIcon className="dashboardIcon"/>,
    name: "Climate Change",
    url:"/new-dashboard",
    isDiseble:true
  },

  {
    id: 3,
    featureImg: "/ui2.0dashboard/Taj Mahal.svg",
    name: "Bharat at 2047",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 4,
    featureImg: "/ui2.0dashboard/Innovation.svg",
    name: "IP Innovation",
    url:"/new-dashboard",
    isDiseble:true
  },
  {
    id: 5,
    featureImg: "/ui2.0dashboard/Business.svg",
    name: "Future of Work",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 6,
    featureImg: "/ui2.0dashboard/Peace Pigeon.svg",
    name: "Peace building and Reconciliation Boards",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 7,
    featureImg: "/ui2.0dashboard/Handshake.svg",
    name: "Shared Future",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 8,
    featureImg: "/ui2.0dashboard/Heart with Pulse.svg",
    name: "Health, Well-being & Sports",
    url:"/new-dashboard",
    isDiseble:false
  },
  {
    id: 9,
    featureImg: "/ui2.0dashboard/View more.svg",
    name: "See All",
    url:"/new-dashboard",
    isDiseble:false
  },
];
export const UI2DashboardResources = () => {
  return (
    <>
      <div className="w-100 rounded-4 shadow">
        <div className="row">
          <div className="row px-5">
            <h3 className="fs-3 fw-bolder py-3">Resourses</h3>
            {features.map((feature, index) => {
              return (
                <>
                  <div className="col-6 col-sm-6 col-md-3 col-lg-2" key={index}>
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
