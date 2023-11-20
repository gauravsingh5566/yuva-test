import React from 'react';

function Winners(props) {
  return (
    <>
      <div className="col">
        <div className="border shadow-sm rounded-3 h-100">
          <div className="p-3">
            <div className="row justify-content-between text-secondary ">
              <div className="col col-4">
                <h1 className="fw-bold row text-secondary m-0">
                  {props.positionNo}
                  <span className="fs-5 col text-lowercase"> {props.positionType}</span>
                  <br />
                  <span className="row fs-6">Place</span>
                </h1>
              </div>
              {/* <span className="ms-1 fs-5 text-dark">( June 2023 )</span> */}
              <p className="mt-4 col col-8 fs-5">{props.winnerName}</p>
            </div>
            {/* <div>
                            <h4 className="fs-3 fw-bold">
                                4th Tourism Working Group Meeting
                            </h4>
                        </div> */}
          </div>
          {props.location ? (
            <div className="border-top fs-5 p-3">
              <span>{props.location}</span>
            </div>
          ) : (
            ''
          )}
          {/* <div className="border-top fs-5 p-3">

                        <span>{props.location}</span>
                    </div> */}
        </div>
      </div>
    </>
  );
}

export default Winners;
