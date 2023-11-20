import React from 'react';
import "../Css/engage.css";
import blueArrow from "../assests/BLueVector.svg";
import YellowLine from "../assests/institute/yellow lines.svg"

const EngageItems = ({data}) => {

  return (
    <div className='container mt-5 position-relative'>
        <div className='sideimg position-absolute d-flex justify-content-end pe-5 pt-3'> 
            <img src={YellowLine} alt="yellow line" width="130px" height="89px" />
         </div>
        <div className='d-flex'>

            <div className="lefEngItems p-3 d-flex">
                <img src={data[0].imgUrl[1]} alt="institute" />
                <img src={data[0].imgUrl[0]} alt="frame" />
            </div>

            <div className="rightEngItems d-flex flex-column justify-content-center p-3">
                <h2>{data[0].heading}</h2>
                <p>{data[0].para}</p>
                <a href="#" className='text-decoration-none fw-bold text-black'>Explore more  
                <img src={blueArrow} alt="vector" /> 
                <img src={blueArrow} alt="vector" /> 
                
                </a>
            </div>
        </div>
    </div>
  )
}

export default EngageItems