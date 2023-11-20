import React from 'react';
import "../Css/timetolearn.css";
import timeToLearnIcon from "../assests/timetolearn.svg";
import cloud from "../assests/clouds.svg";

const TimeToLearn = () => {
  return (
    <>
        <div className='container'>
        <div className="yuva d-flex py-5">
            <div className="leftSide pe-3 d-flex justify-content-center  flex-column position-relative">

                <h2 className='text-start'>What is Yuvamanthan?</h2>
                <p>An advanced program designed for individuals seeking to expand their knowledge and skills in the fields of economics, finance, and international relations.</p>
                <img src={cloud} alt="cloud icon" />
            </div>
            <div className="rightSide">
                <img src={timeToLearnIcon} alt="timeToLearn" width="100%"/>
            </div>
        </div>
        </div>
    </>
  )
}

export default TimeToLearn