import React from 'react'
import { useNavigate } from 'react-router-dom';

export const HackathonMain = () => {
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
              REGISTRATION FOR <br /> YUVAMANTHAN  <br />HACKATHON
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
              <img src="/ui2.0dashboard/line idea bulb.png"  className=""/>
            </div>
          </div>
        </div>
        {/* <======== Hero section row End ==========>  */}

        <div className="d-flex flex-column p-3">
            <div className="mb-3">
              <span>
              Yuvamanthan Hackathon for India@2047 is a hybrid workshop for students of all ages where they participate in a series of exciting tasks where they learn, practice and build innovation. Guided by the visionary 5 prans of Prime Minister Narendra Modi, Yuvamanthan Hackathon 2024 is a call to action for young changemakers, disruptors, and problem solvers. From smart cities to sustainable technologies, from digital empowerment to inclusive growth, the hackathon will encompass a wide range of themes that resonate with the aspirations of a new India. Participants will have the opportunity to showcase their ingenuity, collaborate with like-minded peers, and get oriented by experts and mentors from the government and industry. With the spirit of Yuvamanthan at its core, this hybrid hackathon will unleash the boundless potential of our youth to tackle the most pressing challenges of our time.
              </span>
            </div>
           
          </div>
        </div>
      
    </>
  )
}
