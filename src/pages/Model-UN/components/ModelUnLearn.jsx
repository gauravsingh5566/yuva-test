import React from 'react'

export const ModelUnLearn = ({learn}) => {
  return (
    <div>
         <div>
              <div className="d-flex" style={{marginTop: "85px"}}>
                <div className="">
                  <img className="mt-1" src="/modelUn/rectangle.png" alt="" />
                </div>
                <div className="text ms-2 fw-bolde">
                  <p className="font-family-inter">What You Will Learn?</p>
                </div>
              </div>

              <div className="mt-2">
                <div className="row">
                  {learn.map((ele) => {
                    return (
                      <>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                          <div className="card border-0">
                            <div className="card-body ">
                              <div className="d-flex  model-un-learn">
                                <div className="img-height-58px me-2">
                                  <img
                                    className="h-100 w-100"
                                    src={ele.img}
                                    alt=""
                                  />
                                </div>
                                <div className="content-div">
                                  <div>
                                    <span className="font-size-18px font-weight-600 font-family-Lexend line-height-22-5px">
                                      {ele.title}
                                    </span>
                                  </div>
                                  <div className="content-height mt-2">
                                    <p className="font-family-Lexend font-weight-500 font-size-13px line-height-16-25px color-A3A3A3">
                                      {ele.content}
                                    </p>
                                  </div>
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
    </div>
  )
}