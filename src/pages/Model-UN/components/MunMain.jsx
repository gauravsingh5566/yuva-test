import React, { useEffect, useState } from "react";
import "../style/ModelUnstyle.css";
import { ModelUnCommittees } from "./ModelUnCommittees";
import { ModelUnParticipate } from "./ModelUnParticipate";
import { ModelUnPoliticalParties } from "./ModelUnPoliticalParties";
import { ModelUnLearn } from "./ModelUnLearn";
import { apiAuth, apiJson } from "api";
import { useGlobalContext } from "global/context";
import { useNavigate } from "react-router-dom";

export const MunMain = () => {  
  const {userData} = useGlobalContext()
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({})
  const [isRegis, setIsRegis] = useState(false)
  const [studentDetail, setStudentDetail] = useState({})
  const geteventDetail = ()=>{
    apiJson('api/v2/modelUn-student/getEventDetails/institute/'+userData?.instituteId)
    .then((res)=>{
      setEventDetail(res?.data?.result)
      if(res?.data?.result?.id){
        setIsRegis(true)
      }else{
        setIsRegis(false)
      }
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
  const getStudentDetail = ()=>{
    apiJson('api/v2/modelUn-student/getStudentParticipates/student/'+userData?.id)
    .then((res)=>{
      setStudentDetail(res?.data?.result)
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }

  useEffect(()=>{
    geteventDetail()
    getStudentDetail()
  },[])
  console.log(eventDetail,"==")
  const naviageParticipents = () =>{
    navigate("/modelUn/participates")
  }
  function formatDate(inputDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = months[parseInt(parts[1]) - 1];
    const day = parseInt(parts[2]);
  
    return `${month} ${day}, ${year}`;
  }

  return (
    <>
      <div className="container">
        {/* Model United Nations */}
        <div className="row justify-content-center mt-3">
          <div className="col-11">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                {/* <div className="modelUn_header d-flex justify-content-between"> */}
                <div className="first_div">
                  <div className="">
                    <img src="/modelUn/ymlogo21.png" alt="" />
                  </div>
                  <div className="mt-4">
                    <div className="mb-">
                      <h2 className="main_Heading font-family-inter">
                        Model United Nations
                      </h2>
                    </div>
                    <div className="mt-3">
                      <span className="world_problem font-family-inter d-block">
                        Fostering Solutions to
                      </span>
                      <span className="world_problem d-block">
                        {" "}
                        Real-world Problems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <div className="outer">
                  <div className="second_div">
                    <img
                      className="h-100 w-100"
                      src="/modelUn/world_logo.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12  "> */}
              <div className="ymun_description">
                <p className="font-family-inter">
                  YMUN allows the youth to step into the shoes of global
                  diplomats and representatives of different nations and
                  organizations. Through poly-cultural research and the
                  orchestration of real-life situations, YMUN provides an
                  invaluable opportunity to understand international relations
                  and diplomacy.
                </p>
              </div>
            </div>
            {/* </div>
            </div> */}

            <div className="">
              <p
                className="fst-italic"
                style={{ color: "#7e27ec", fontSize: "21px" }}
              >
                Know more
              </p>
            </div>
{isRegis && !studentDetail &&
           <>
           <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 rounded-start rounded-end">
                <div
                  className="modelUn_participate_box"
                  style={{ display: "flex" }}
                >
                  <button className="text-center text-white" onClick={naviageParticipents}>
                    Participate Now
                  </button>
                  <button
                    className="ms-4 bg-white text-center"
                    style={{ color: "#9700de" }}
                  >
                    Invite a friend
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-light-pink rounded col-md-12 col-lg-8 mt-4">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div
                    className="modelUn_Time rounded-start d-flex align-items-center"
                    // style={{ border: "1px solid" }}
                  >
                    <div
                      className="coverStartTime ms-4"
                      // style={{ border: "1px solid red" }}
                    >
                      <span
                        className="fw-bolder fs-6 d-block"
                        style={{ color: "#3A0CA3" }}
                      >
                        Starts On
                      </span>
                      <span>{formatDate(eventDetail.last_date)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-end col-12 col-sm-12 col-md-6 col-lg-6">
                  <div
                    className="modelUn_Time rounded-end d-flex align-items-center"
                    // style={{ width: "25rem" }}
                  >
                    <div className="coverEndTime ms-4">
                      <span
                        className="fw-bolder fs-6 d-block"
                        style={{ color: "#3A0CA3" }}
                      >
                        Ends On
                      </span>
                      <span className="d-block">{formatDate(eventDetail.date_proposed)}</span>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
           </>
            }
           
          


            {/* How Can You Participate? */}
            <div className="d-flex" style={{marginTop: "52px"}}>
              <div className="">
                <img className="mt-1" src="/modelUn/rectangle.png" alt="" />
              </div>
              <div className="text ms-2 fw-bolde">
                <p className="font-family-inter">How Can You Participate?</p>
              </div>
            </div>
            <div className="part-ymun-desc">
              <p>
                Excited to be a part of the YMUN party? As students, you have
                the following choices to become a part of the exercise:
              </p>
            </div>
            {/* </div> */}
            <ModelUnParticipate participate={participate} />

            {/* What You Will Learn? */}
            <ModelUnLearn learn={learn} />
          </div>
        </div>
      </div>
    </>
  );
};

const comittees = [
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download1.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download1.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
  {
    countryFLag: "/modelUn/flag.png",
    img: "/modelUn/download2.jpeg",
    degination: "Prime Minister",
    name: "Nitesh Rawat",
  },
];

const learning = [
  {
    img: "/modelUn/teamBuilding.png",
    title: "Team Building",
    content:
      "Work in groups to build a friendly rapport with other teams to represent your team’s message.",
  },
  {
    img: "/modelUn/onlineMeetings.png",
    title: "Discussions With Consensus",
    content:
      "When opinions are shared as insights you learn to influence others and draw meaningful conclusions.",
  },
  {
    img: "/modelUn/globe.png",
    title: "International Diplomacy",
    content:
      "Influence actions through negotiations for a common cause without rhetoric or upsetting others.",
  },
  {
    img: "/modelUn/handshake.png",
    title: "Multilateral Negotiations",
    content:
      "Negotiating with countries on economics and socio-politico issues with varied perspectives.",
  },

  {
    img: "/modelUn/businessStrategy.png",
    title: "Strategy Building",
    content:
      "Working together with teams to create strategies that impact the future of the world.",
  },
  {
    img: "/modelUn/macroeconomics.png",
    title: "Macroeconomics",
    content:
      "Researching and deliberating thoughts on economic matters to create resilient economies.",
  },
  {
    img: "/modelUn/notesComposition.png",
    title: "Research And Analysis",
    content:
      "Deep diving into topics and themes on global issues and preparing content at short notice.",
  },
  {
    img: "/modelUn/megaphone.png",
    title: "Public Speaking",
    content:
      "Perfect the art of speaking to a large audience, debating, and influencing juries with impactful content.",
  },
];

const participate = [
  {
    img: "/modelUn/Lecturer.png",
    title: "Delegate",
  },
  {
    img: "/modelUn/Certificate.png",
    title: "Secretariat",
  },
  {
    img: "/modelUn/Magazine.png",
    title: "Press Corps",
  },
  {
    img: "/modelUn/TouristGuide.png",
    title: "Photographers",
  },
];

const learn = [
  {
    img: "/modelUn/teamBuilding.png",
    title: "Team Building",
    content:
      "Work in groups to build a friendly rapport with other teams to represent your team’s message.",
  },
  {
    img: "/modelUn/onlineMeetings.png",
    title: "Discussions With Consensus",
    content:
      "When opinions are shared as insights you learn to influence others and draw meaningful conclusions.",
  },
  {
    img: "/modelUn/globe.png",
    title: "International Diplomacy",
    content:
      "Influence actions through negotiations for a common cause without rhetoric or upsetting others.",
  },
  {
    img: "/modelUn/handshake.png",
    title: "Multilateral Negotiations",
    content:
      "Negotiating with countries on economics and socio-politico issues with varied perspectives.",
  },

  {
    img: "/modelUn/businessStrategy.png",
    title: "Strategy Building",
    content:
      "Working together with teams to create strategies that impact the future of the world.",
  },
  {
    img: "/modelUn/macroeconomics.png",
    title: "Macroeconomics",
    content:
      "Researching and deliberating thoughts on economic matters to create resilient economies.",
  },
  {
    img: "/modelUn/notesComposition.png",
    title: "Research And Analysis",
    content:
      "Deep diving into topics and themes on global issues and preparing content at short notice.",
  },
  {
    img: "/modelUn/megaphone.png",
    title: "Public Speaking",
    content:
      "Perfect the art of speaking to a large audience, debating, and influencing juries with impactful content.",
  },
];
