import React from "react";
import {
  UI2DashboardActivites,
  UI2DashboardBanner,
  UI2DashboardClub,
  UI2DashboardDownload,
  UI2DashboardEvent,
  UI2DashboardFeatures,
  UI2DashboardGallery,
  UI2DashboardGroups,
  UI2DashboardResources,
} from "./component";
import './Dashboard.css'

export const UI2MainDashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-center mainDashboard">
        <div className="col-11">
          {/*<=========== Dashboard banner start ============> */}
          <div className="mt-4 mb-4">
            <UI2DashboardBanner />
          </div>
          {/*<======== Dashboard banner End=========> */}

          {/* Dashboard Features start */}
          <div className="mb-4">
            <UI2DashboardFeatures />
          </div>
          {/* <=========== Dashboard Activities start ================> */}
          <div className="mb-4">
            <UI2DashboardActivites />
          </div>
          {/* <=========== Dashboard Events start ================> */}
          <div className="mb-4">
            <UI2DashboardEvent />
          </div>

          {/* <=========== Dashboard Gallery start ================> */}
          <div className="mb-4">
            <UI2DashboardGallery />
          </div>
          {/* <=========== Dashboard Clubs start ================> */}
          <div className="mb-4">
            <UI2DashboardClub />
          </div>
          {/* <=========== Dashboard Groups start ================> */}
          <div className="mb-4">
            <UI2DashboardGroups />
          </div>
          {/* <=========== Dashboard Resources start ================> */}
          <div className="mb-4">
            <UI2DashboardResources />
          </div>
          {/* <=========== Dashboard Downloads start ================> */}
          <div className="mb-3">
            <UI2DashboardDownload />
          </div>
        </div>
      </div>
    </>
  );
};
