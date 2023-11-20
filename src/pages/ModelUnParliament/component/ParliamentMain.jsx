import React from "react";
import { useNavigate } from "react-router";

export const ParliamentMain = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {/* <======== Hero section row start  ==========>  */}
        <div className="row">
            {/* <======= Left column Start =========> */}
          <div className="col-12 col-md-8 col-lg-7 p-3 ">
            <div className="d-flex flex-column align-items-start justify-content-center mt-5">
              <span className="fs-2 fw-400 p-3">
              REGISTRATION FOR YUVAMANTHAN YOUTH PARLIAMENT
              </span>
              <div
                onClick={() => navigate("registration")}
                className="mb-4 p-4"
              >
                <button
                  style={{
                    textAlign: "center",
                    height: "41px",
                    width: "164px",
                    background: "#9700DE",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
            {/* <======= Right column Start =========> */}
          <div className="col-12 col-md-4 col-lg-5 p-3">
            <div className="d-flex justify-content-center align-items-center">
              <img src="/ui2.0dashboard/parliament.png"  className=""/>
            </div>
          </div>
        </div>
        {/* <======== Hero section row End ==========>  */}

        <div className="d-flex flex-column p-3">
            <div className="mb-3">
              <span>
              Yuvamanthan Model Youth Parliament serves as an exceptional platform designed to impart a transformative learning experience to the future citizens of India. With a vision extending to the year 2047, when India celebrates its centenary of independence, this initiative aims to acquaint students with the functioning of a real parliament. It provides a systematic forum, facilitated by seasoned moderators, where national issues are simulated and discussed on a grand scale.
              </span>
            </div>
            <div className="mb-3">
              <span>
              This immersive platform empowers students and young participants to delve into current economic, socio-political, and cultural matters. Through a mock simulation of parliamentary proceedings, students assume the roles of Lok Sabha and Rajya Sabha members, collaboratively devising potential solutions. 
              </span>
            </div>
            <div className="mb-3">
              <span>
              By actively participating in the model youth parliament sessions, YMYP focuses on grooming a youth-centric approach to governance training. Students undergo rigorous preparation, testing, and engagement in real-life political agenda meetings, where they express opinions and propose resolutions. Through this process, they develop confidence, resilience, and exceptional communication skills for the betterment of the nation.
              </span>
            </div>
          </div>
        </div>
      
    </>
  );
};
