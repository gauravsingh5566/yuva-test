import React from "react";
import { useNavigate } from "react-router-dom";
export const UI2Feature1 = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>

      <div
        className={`col-12 col-sm-6 col-md-4 col-lg-2 text-center`}
        key={data?.id}
      >
        <div className="d-flex flex-column justify-content-center align-items-center mb-4">
          <div
            className= "rounded-circle border border-1  download_card" 
            onClick={()=>{
              navigate(`/clubs/${data?.id}`)
            }}
          >
            <img
              src={data?.logo ? data?.logo : "/ui2.0dashboard/Ellipse 80.png"}
              alt={data?.name}
              className="h-100 w-100 rounded-circle"
            />
          </div>
          <span className="fw-400 text-center">{data?.name}</span>
        </div>
      </div>
    </>
  );
};
