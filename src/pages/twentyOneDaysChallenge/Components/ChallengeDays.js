import React from "react";
import { useNavigate } from "react-router-dom";
import environment from "../assests/Group 386.svg";
import "../Css/challengeday.css";
import groupimg from "../assests/Group 381.svg";

const ChallengeDays = () => {
  const navigate = useNavigate();
  const currentDay = 3;
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
  const navigateUploadPage = (e) => {
    navigate(`/twenty-one-day/gameday/Today-Challenge/${currentDay}`);
  };
  return (
    <>
      <div className="challengeDays p-3">
        <div className="challengehead position-relative d-flex justify-content-between">
          <img
            src={environment}
            alt="environment"
            width="146px"
            height="59px"
          />

          <p>
            <img src={groupimg} alt="logo" className="pe-2" /> <span>50</span>
            creadits
          </p>
        </div>

        <div className="todayChallenge">
          <h4 className="my-3">Today's challenge</h4>

          <div
            className="challnDays d-flex justify-content-between align-items-center"
            onClick={() => navigateUploadPage()}
          >
            {data.map((value) => {
              if (value.id == currentDay) {
                return (
                  <>
                    <div className="dayVal text-white"> {value.day}</div>
                    <div className="daypara align-align-self-lg-stretch">
                      <p>{value.work}</p>
                      <p>{value.para}</p>
                    </div>
                    <div className="daycredits">
                      <p>{value.credits}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
        <div className="pastChallenge">
          <h4 className="my-5">Past challenge</h4>
          {data.map((value) => {
            if (value.id !== currentDay) {
              return (
                <div
                  className="challnDays d-flex justify-content-between align-items-center my-4 "
                  onClick={()=> navigate(`/twenty-one-day/gameday/Today-Challenge/${value.id}`)}
                >
                  <>
                    <div className="dayVal text-white"> {value.day}</div>
                    <div className="daypara align-align-self-lg-stretch">
                      <p>{value.work}</p>
                      <p>{value.para}</p>
                    </div>
                    <div className="daycredits">
                      <p>{value.credits}</p>
                    </div>
                  </>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ChallengeDays;
