import React from "react";

export const ModelUnCommittees = ({comittees}) => {
  return (
    <div>
      <div className="modelUN_comittees">
       

        <div className="d-flex scroll-container">
          {comittees.map((ele) => {
            return (
              <>
                <div className="px-3 py-4">
                  <div className="card margin-right-25px px-6 py-2 border-0 shadow rounded-5" style={{width: "173px", height: "243px"}}>
                    <div className="card-body mx-auto d-flex px-0 py-0">
                      <div className="h-100 w-100">
                        <div className="d-flex justify-content-center">
                          <div className="margin-top-5px country-flag">
                            <img
                              className="w-100 h-100"
                              src={ele.countryFLag}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="margin-top-11px d-flex justify-content-center">
                          <div
                            style={{
                              objectFit: "cover",
                              height: "98px",
                              width: "98px",
                            }}
                          >
                            <img
                              className="h-100 w-100"
                              style={{
                                borderRadius: "64.5px",
                              }}
                              src={ele.img}
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          className="degination d-flex justify-content-center align-items-center"
                          style={{ background: "#FFE7AA", position: "relative", bottom: "8px"}}
                        >
                          <span
                            className="font-family-Lexend font-size-11px d-block"
                            style={{ color: "#7B4300" }}
                          >
                            {ele.degination}
                          </span>
                        </div>
                        <div className="height-48px-width-99px text-center">
                          <p className="font-size-19px font-family-Lexend font-weight-600">
                            {ele.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};


