import React from "react";
import "../Css/home.css";
import "../Css/challengeday.css";
import "../Css/congress.css";
import groupimg from "../assests/Group 381.svg";
import confitiBall from "../assests/Confetti Ball.svg";
import environGroup from "../assests/Group 386.svg";
import { useNavigate } from "react-router-dom";

const Congress = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      day: "Day 1",
      work: "Completed",
      para: "GameDay this is the high game play",
      credits: 23 + " credits",
    },
    {
      id: 2,
      day: "Day 2",
      work: "Completed",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 3,
      day: "Day 3",
      work: "not Completed",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 4,
      day: "Day 4",
      work: "incompleted",
      para: "GameDay",
      credits: 23 + " credits",
    },
    {
      id: 5,
      day: "Day 5",
      work: "Completed",
      para: "GameDay this is the high game play",
      credits: 23 + " credits",
    },
  ];

  return (
    <>
      <header>

        <main>
          <div className="my_container">
            <div className="challengehead position-relative d-flex justify-content-between align-items-center w-75 m-auto">
              <img
                src={environGroup}
                alt="environment"
                width="146px"
                height="59px"
              />

              <p>
                <img src={groupimg} alt="logo" className="pe-2" />
                <span>500 </span>
                creadits
              </p>
            </div>

            <div className="mainCongressSec m-auto w-75 d-flex align-items-center flex-column position-relative">
              <img
                src={environGroup}
                alt="environment"
                className="position-absolute "
              />
              <img src={confitiBall} alt="confitiBall" className="mt-5 pt-4" height="81px" width="81px" />
            <h3 className="text-center cong">Congratulations!</h3>
            </div>
            <p className="text-center congpara m-auto w-75 pb-3">
              By adopting a eco friendly habits and completing 21 days
              challenge, you have earned 525 Carbon Credits.
            </p>

            <button
              className="retakebtn border-0 "
              onClick={() => navigate("/twenty-one-day")}
            >
              Retake
            </button>

            <div className="pastChallenges w-75 m-auto mt-3">
              <h3>Past Challenges</h3>

              {data.map((val) => {
                return (
                  <div
                    className="challnDays d-flex justify-content-between align-items-center my-4 "
                  >
                    <>
                      <div className="dayVal text-white"> {val.day}</div>
                      <div className="daypara align-align-self-lg-stretch">
                        <p>{val.work}</p>
                        <p>{val.para}</p>
                      </div>
                      <div className="daycredits">
                        <p>{val.credits}</p>
                      </div>
                    </>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </header>
    </>
  );
};

export default Congress;
