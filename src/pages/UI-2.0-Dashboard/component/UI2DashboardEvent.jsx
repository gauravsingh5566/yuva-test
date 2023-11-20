import { useGlobalContext } from "global/context";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const UI2DashboardEvent = () => {
  const {userData} = useGlobalContext();
  const navigate = useNavigate();
  const role = userData?.role
  const events = [
    {
      id: 1,
      eventImg: "/ui2.0dashboard/Rectangle 3331.png",
      name: "YMUN",
      url: role==="institute" ?`/model-un` :`/modelUn`,
      isDiseble: false
    },
    {
      id: 2,
      eventImg: "/ui2.0dashboard/Rectangle 3332.png",
      name: "YMH",
      url: "/new-dashboard",
      isDiseble: true
    },
    {
      id: 3,
      eventImg: "/ui2.0dashboard/Rectangle 3333.png",
      name: "YMYP",
      url: "/new-dashboard",
      isDiseble: true
    },
    {
      id: 4,
      eventImg: "/ui2.0dashboard/Rectangle 3334.png",
      name: "YMG20",
      url: "/new-dashboard",
      isDiseble: true
    },
  ];
  // ========  Handle Navigate function ==========  \\
  const handleNavigate = (id, url) => {

    navigate(url)
  }

  return (
    <>
      <div className="w-100 rounded-4 shadow p-4">
        {/* <========== Main Row  Start =========>*/}
        <div className="row">
          <h3 className="fs-3 fw-bolder px-3">Featured Events</h3>
          {/* <========== Inner Row Start=========>*/}

          <div className="row g-sm-2 px-3 ">
          {events?.map((event, index) => {
              return (
                <>
                  <div
                    className={`col-12 col-sm-6 col-md-4 col-lg-3 mb-4 mb-sm-2 p-2 p-sm-3 p-lg-3 `}
                    key={index}
                  >
                    <div>
                      <div
                        className={`card rounded-3 ${event?.isDiseble ===true ? "opacity-50 cursor-na" : "EventCard"}`}
                        // style={{
                        //   border: event?.isDiseble ? "2px solid #F1E5FF" : "2px solid #F1E5FF",
                        // }}
                    onClick={() => handleNavigate(event.id, event?.url)}
                      >
                        <img
                          src={event?.eventImg}
                          className="card-img-top h-100 w-100"
                          alt={event?.name}
                        />
                        <div className="card-body">
                          <div className="card-text text-center" style={{color:"#8F00FF"}}>
                            {event?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {/* <========== Main Row End=========>*/}
      </div>
    </>
  );
};
