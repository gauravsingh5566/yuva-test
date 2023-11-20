import React from "react";
import "../Css/experience.css";
// import singboy from "../assests/exp/singinBoy.svg";
import PublicIcon from "@mui/icons-material/Public";
import MicNoneIcon from "@mui/icons-material/MicNone";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AnalyticsIcon from '@mui/icons-material/Analytics';

const ExpSection = () => {
  return (
    <>
      <div className="container py-5">
        <div className="d-flex">
          <div className="leftexp p-3">
            {/* <img src={singboy} alt="singingboy" width="100%" /> */}
          </div>
          <div className="rightexp d-flex flex-column justify-content-center p-3">
            <h2 className="fw-bolder">Why Experience Based Learning Method?</h2>
            <p>
              An advanced program designed for individuals seeking to expand
              their knowledge and skills in the fields of economics
            </p>

            <div className="row">
              <div className="col-lg-6">
                <p className="d-flex align-items-center">
                  <span className="icon iconOne d-flex justify-content-center align-items-center">

                    <PublicIcon
                      sx={{ color: "#C2DFFF", width: "37px", height: "37px" }}
                    />
                  </span>
                  International Diplomacy
                </p>
                <p className="d-flex align-items-center">
                  <span className="icon iconTwo d-flex justify-content-center align-items-center">
                  <AnalyticsIcon
                    sx={{ color: "#C2DFFF", width: "37px", height: "37px" }}
                  />
                  </span>
                  Research and Analysis
                </p>
              </div>
              <div className="col-lg-6">
                <p className="d-flex align-items-center">
                  <span className="icon iconThree d-flex justify-content-center align-items-center">
                    <MicNoneIcon
                      sx={{ color: "#C2DFFF", width: "37px", height: "37px" }}
                    />
                  </span>
                  Public Speaking
                </p>
                <p className="d-flex align-items-center">
                  <span className="icon iconFour d-flex justify-content-center align-items-center">

                    <LightbulbIcon
                      sx={{ color: "#C2DFFF", width: "37px", height: "37px" }}
                    />
                  </span>
                  Strategy Building
                </p>
              </div>
            </div>
            <button
              id="learnMore"
              className="text-white border-0 px-4 py-2 rounded-3 mt-3"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpSection;
