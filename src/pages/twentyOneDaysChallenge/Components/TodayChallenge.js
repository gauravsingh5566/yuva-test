import React from "react";
import "../Css/home.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TodayChallenCompoent from "./TodayChallenCompoent";

const GameDay = () => {
  return (
    <>
      <header>
          <div className="main">
            <TodayChallenCompoent />
          </div>
      </header>
    </>
  );
};

export default GameDay;
