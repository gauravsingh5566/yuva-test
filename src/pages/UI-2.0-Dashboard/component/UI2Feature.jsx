import React from "react";
import { useNavigate } from "react-router-dom";

export const UI2Feature = ({ data }) => {
  const navigate = useNavigate()

  const handleNavigate = ()=>{
    if (data?.url && data?.isDiseble ===false){
      navigate(data?.url);
    }else{
      navigate("/new-dashboard")
    }
  }
  return (
    <>
      <div onClick={handleNavigate} className="d-flex flex-column justify-content-center align-items-center justify-content-sm-center align-items-sm-center mt-3 pb-4  ">
        <div
          className={`d-flex align-items-center justify-content-center border-0 rounded-circle p-3 ${data?.isDiseble ? "cursor-na iconDisableColor ": "iconEffect cursor-pointer "}`} >
            {
              data?.featureIcon ? data?.featureIcon  : <img  src={data.featureImg} className="dashboardIcon" alt="name" />
            }
         
        </div>
        <span className="text-center text-sm-center">{data.name}</span>
      </div>
    </>
  );
};
