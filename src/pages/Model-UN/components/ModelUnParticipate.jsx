import React from "react";

export const ModelUnParticipate = ({participate}) => {
  return (
    <div>
      {/* <div> */}
        {/* <div className="d-flex mt-5">
          <div className="">
            <img className="mt-1" src="/modelUn/rectangle.png" alt="" />
          </div>
          <div className="text ms-2 fw-bolde">
            <p className="font-family-inter">How Can You Participate?</p>
          </div>
        </div> */}
        
        {/* <div className="part-ymun-desc">
          <p>
            Excited to be a part of the YMUN party? As students, you have the
            following choices to become a part of the exercise:
          </p>
        </div>
      </div> */}

      <div className="d-flex" style={{marginTop: "50px"}}>
        <div className="row">
          {participate.map((ele) => {
            return (
              <>
                <div className="col-12 col-sm-6 col-lg-3 ">
                  {/* <div className="card  d-flex border-0"> */}
                    <div className="card-body bg-ligth-blue mx-auto text-center d-flex flex-column justify-content-center" style={{width : "181px", height: "181px", borderRadius: "21px"}}>
                      <div className="height-100px">
                        <img className="h-100" src={ele.img} alt="" />
                      </div>
                      <div>
                        <span>{ele.title}</span>
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};