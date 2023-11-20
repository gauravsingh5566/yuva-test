import React from "react";
import "../carbonStyle/carbonStyle.css";
import Select from "react-select";
import { useContext } from "react";
import { CFContext } from "../context/carbonContext";
import { useNavigate } from "react-router";

export const CarbonMainSteper = () => {
  const { countStep, setCountStep } = useContext(CFContext);
  const renderStep = () => {
    switch (true) {
      case countStep === 1:
        return (
          <div>
            <PersonalizeStep1 />
          </div>
        );
      case countStep === 2:
        return (
          <div>
            <TypeofvehicleStep2 />
          </div>
        );
      case countStep === 3:
        return (
          <div>
            <VehicleDetailStep3 />
          </div>
        );
      case countStep === 4:
        return (
          <div>
            <RoundTripStep4 />
          </div>
        );
      case countStep === 5:
        return (
          <div>
            <TravelbehaviourStep5 />
          </div>
        );
      case countStep === 6:
        return (
          <div>
            <DomesticFlightStep6 />
          </div>
        );
      case countStep === 7:
        return (
          <div>
            <InternationalFlightsStep7 />
          </div>
        );
    }
  };
  const handleClickInc = () => {
    setCountStep(countStep + 1);
  };
  const handleClickDec = () => {
    setCountStep(countStep - 1);
  };
  return (
    <>
        {/* For large screen */}
      
        <div className="row">
        <div className="col-1" style={{height: "100vh"}}>
          <div className="d-flex h-100 align-items-center">
        {
          countStep < 2 ? (
            <button
            className="ms-4 ms-2 d-none d-md-block"
            onClick={handleClickDec}
            disabled={countStep < 2}
          >
            <img src="/modelUn/arrowdisabled.png" alt=""/>
          </button>
          ) : (
            <button
              className="d-none d-md-block"
              onClick={handleClickDec}
              // disabled={countStep < 2}
            >
              <img src="/modelUn/arrowleft.png" alt=""/>
            </button>
          )
        }
          </div>
</div>
   
        
      <div className="col-10">{renderStep()}</div>
      <div className="col-1" style={{height: "100vh"}}>
      
      <div className="d-flex h-100 align-items-center">
      <button 
        className=" d-none d-md-block"
        onClick={handleClickInc}
        disabled={countStep > 6}
      >
        <img src="/modelUn/arrowRight.png" alt=""/>
      </button>

      </div>
    </div>
        </div>
      {/* for small screen */}
      <div className="d-flex justify-content-between mx-auto col-8 mt-4 mb-2 d-block d-md-none">
      {
          countStep < 2 ? (
            <button
            className="btn-onboard-fill-disabled d-block d-md-none"
            onClick={handleClickDec}
            disabled={countStep < 2}
          >Previous
          </button>
          ) : (
            <button
              className="btn-onboard-fill d-block d-md-none"
              onClick={handleClickDec}
              // disabled={countStep < 2}
            >Previous
            </button>
          )
        }
          <button
            className="btn-onboard-fill d-block d-md-none"
            onClick={handleClickInc}
            disabled={countStep > 6}
          >Next
          </button>
      </div>
     
    </>
  );
};

const PersonalizeStep1 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    // -----------residential area------------
    <div>
      <div className="col-11 justify-content-center mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div className="" style={{ marginTop: "7rem" }}>
          <div className="text-center mt-5">
            <div>
              <div>
                <span className="fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                  Personalize{" "}
                </span>
              </div>
              <div className="mt-4">
                <span className="fw-600-fs-32px">
                  Please specify your residential area
                </span>
              </div>
            </div>

            <div>
              <div className="mt-4 row">
                {residental?.map((ele) => {
                  return (
                    <>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <div
                          className="d-flex py-3 flex-column text-center justify-content-between"
                          style={{ height: "250px" }}
                        >
                          <div>
                            <img className="" src={ele.img} alt="" />
                          </div>
                          <div>
                            <div className="d-flex justify-content-center">
                              <div className="me-4" style={{marginTop: "2px"}}>
                                <label className="inp-label">
                                  <input type="radio" name="radio"/>
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                              <div className="px-2">
                                <span>{ele.area}</span>
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
      </div>
    </div>
  );
};

const TypeofvehicleStep2 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/*----------Please specify type of vehicle---------- */}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}></div>
        <div className="col-9  mx-auto">
          <div className="mt-5">
            <div className="text-center">
              <span className="fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="mt-4 text-center">
              <span className="fw-600-fs-32px">
                Please specify type of vehicle
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <div className="mt-4">
              <div className="d-flex align-items-center">
                <div className="mb-3">
                  <label className="inp-label">
                    <input type="radio" name="radio"/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="px-4">
                  <span
                    className="fw-600 fs-24px br-12-5px"
                    style={{ color: "#303030" }}
                  >
                    Car
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="mb-3">
                  <label className="inp-label">
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="px-4">
                  <span
                    className="fw-600 fs-24px br-12-5px"
                    style={{ color: "#303030" }}
                  >
                    Motercycle
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="mb-3">
                  <label className="mb- inp-label">
                    <input type="radio" name="radio"/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="px-4">
                  <span
                    className="fw-600 fs-24px br-12-5px"
                    style={{ color: "#303030" }}
                  >
                    Public Transportation (bus, train, etc.)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VehicleDetailStep3 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/* Please specify a vehicle Details */}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}>
          <div className="mt-5">
            <div className="text-center">
              <span className=" fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="text-center mt-4">
              <span className="fw-600-fs-32px">
                Please specify a vehicle Details (If Applicable)
              </span>
            </div>
          </div>

          <div
            className="d-flex justify-content-center mx-auto col-md-12 col-lg-10"
            tyle={{ border: "1px solid" }}
          >
            <div className="mt-2 ">
              {/* <div className="row"> */}
              <div className="">
                <form>
                  <div className="row">
                    {/* fuelType */}
                    <div className="col-12 col-md-6 mt-1">
                        <div>
                          <span className="" style={{fontSize: "18px"}}>FuelType</span>
                        </div>
                        <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-12">
                          <Select
                            styles={customStyles}
                            options={fuelType}
                            defaultValue={fuelType[0]}
                            getOptionLabel={(option) => {
                              return (
                                <>
                                  <div className="p-2">
                                    <span
                                      className="fs-17px fw-semibold text-center"
                                      style={{ color: "#000000" }}
                                    >
                                      {option.name}
                                    </span>
                                  </div>
                                </>
                              );
                            }}
                          />
                        </div>
                    </div>

                    {/* Fuel Efficiency */}
                    
                   <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <div style={{ width: "20rem", marginTop: "5px"}}>
                        <span className="" style={{fontSize: "18px"}}>Fuel Efficiency (in km/l or km/kWh)</span>
                      </div>
                      <div className="mt-3 col-8">
                        <input
                          className="input-handle p-3"
                          type="number"
                          placeholder="km/l or km/kWh"
                        />
                      </div>
                    </div>
                  </div>
                      {/* </div> */}
                    {/* </div> */}

                    {/* fuel */}
                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-5">
                      <div>
                        <span className="fw-400 fs-21px">Fuel Type</span>
                      </div>
                      <div className="mt-3 col-12 col-sm-6 col-md-12 col-lg-6">
                      <Select
                          styles={customStyles}
                          options={fuelType}
                          defaultValue={fuelType[0]}
                          getOptionLabel={(option) => {
                            return (
                              <>
                                <div className="p-2">
                                  <span
                                    className="fs-17px fw-semibold text-center"
                                    style={{ color: "#000000" }}
                                  >
                                    {option.name}
                                  </span>
                                </div>
                              </>
                            );
                          }}
                        />
                      </div>
                    </div> */}

                    {/* km */}
                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-5">
                      <div>
                        <span className="fw-400 fs-21px">
                          Fuel Efficiency (in km/l or km/kWh)
                        </span>
                      </div>
                      <div className="mt-3 col-12 col-sm-6 col-md-12 col-lg-6">
                      <Select
                          styles={customStyles}
                          options={FuelEfficiency}
                          defaultValue={FuelEfficiency[0]}
                          getOptionLabel={(option) => {
                            return (
                              <>
                                <div className="p-2">
                                  <span
                                    className="fs-17px fw-semibold text-center"
                                    style={{ color: "#000000" }}
                                  >
                                    {option.name}
                                  </span>
                                </div>
                              </>
                            );
                          }}
                        />
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundTripStep4 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/* Please specify a vehicle Details */}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}>
          <div className="mt-5">
            <div className="text-center">
              <span className=" fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="text-center mt-4">
              <span className="fw-600-fs-32px">
                Average Daily Commute (Round Trip)
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-center mx-auto col-lg-11">
              <div className="col-11 d-flex justify-content-center">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <div>
                        <span className="" style={{fontSize: "18px"}}>Distance (in kilometers)</span>
                      </div>
                      <div className="mt-3">
                        <input
                          className="input-handle p-3"
                          type="number"
                          placeholder="kilometers"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <div>
                        <span className="" style={{fontSize: "18px"}}>Frequency (days per week)</span>
                      </div>
                      <div className="mt-3">
                        <input
                          className="input-handle p-3"
                          type="number"
                          placeholder="days per week"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelbehaviourStep5 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/*--- // Travel Behavior (per year, if applicable)---*/}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}>
          <div className="mt-5">
            <div className="text-center">
              <span className=" fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="text-center mt-4">
              <span className="fw-600-fs-32px">
                Travel Behavior (per year, if applicable)
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-center mx-auto col-12">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center">
                      <div className="mt-1">
                        <div className="mb-4">
                          <label className="inp-label">
                            <input
                              type="checkbox"
                              className="p-3"
                            />
                            <span
                              className="checkmark"
                              style={{ borderRadius: "5px" }}
                            ></span>
                          </label>
                        </div>
                      </div>
                      <div className="px-4">
                        <span className="fw-600-fs-24px">Domestic Flights</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center">
                      <div className="mt-1">
                        <div className="mb-4">
                          <label className="inp-label">
                            <input
                              type="checkbox"
                              className="p-3"
                            />
                            <span
                              className="checkmark"
                              style={{ borderRadius: "5px" }}
                            ></span>
                          </label>
                        </div>
                      </div>
                      <div className="px-4">
                        <span className="fw-600-fs-24px">
                          International Flights
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DomesticFlightStep6 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/* Please specify a vehicle Details */}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}>
          <div className="mt-5">
            <div className="text-center">
              <span className=" fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="text-center mt-4">
              <span className="fw-600-fs-32px">
                Travel Behavior (per year, if applicable)
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="fw-600-fs-24px">Domestic Flights</span>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-center mx-auto col-11">
              <div className="col-12 d-flex justify-content-center">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <div>
                        <span className="" style={{fontSize: "18px"}}>Number of flights</span>
                      </div>
                      <div className="mt-3">
                        <input
                          className="input-handle p-3"
                          type="number"
                          placeholder="Number of flights"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <div>
                        <span className="" style={{fontSize: "18px"}}>Average distance (one way)</span>
                      </div>
                      <div className="mt-3">
                        <input
                          className="input-handle p-3"
                          type="number"
                        placeholder="one way, in kilometers"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternationalFlightsStep7 = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/new-dashboard")
  }
  return (
    <div>
      {/* Please specify a vehicle Details */}
      <div className="col-11 mx-auto mt-4">
        <div className="d-flex align-items-center">
          <div onClick={handleClick}>
            <img src="/modelUn/VectorCarbon.png" alt="" />
          </div>
          <div className="px-2">
            <span className="fw-600-fs-32px" style={{ color: "#7209B7" }}>
              Carbon Footprint Calculator
            </span>
          </div>
        </div>

        <div style={{ marginTop: "7rem" }}>
          <div className="mt-5">
            <div className="text-center">
              <span className=" fw-400 fs-32px" style={{ color: "#B3B3B3" }}>
                Transportation{" "}
              </span>
            </div>
            <div className="text-center mt-4">
              <span className="fw-600-fs-32px">
                Travel Behavior (per year, if applicable)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="fw-600-fs-24px">International Flights</span>
        </div>

        <div className="mt-4">
          <div className="d-flex justify-content-center mx-auto col-11">
            <div className="col-12 d-flex justify-content-center">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <div>
                      <span className="" style={{fontSize: "18px"}}>Number of flights</span>
                    </div>
                    <div className="mt-3">
                      <input
                        className="input-handle p-3"
                        type="number"
                        placeholder="Number of flights"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <div>
                      <span className="" style={{fontSize: "18px"}}>Average distance (one way)</span>
                    </div>
                    <div className="mt-3">
                      <input
                        className="input-handle p-3"
                        type="number"
                        placeholder="one way, in kilometers"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "280px",
    // padding: "3px",
    border: "none",
    background: "#F9F9F9",
    height: "57px",
    // color: "black",
    // boxShadow:'none'
  }),
};

const fuelType = [
  {
    value: 1,
    name: "Petrol",
  },
  {
    value: 2,
    name: "Diesel",
  },
  {
    value: 3,
    name: "CNG"
  },
  {
    value: 4,
    name: "Electric"
  },
];

const residental = [
  {
    img: "/modelUn/YoungmanOrderingTaxi.png",
    area: "Urban",
  },
  {
    img: "/modelUn/Travelnaturalplaces.png",
    area: "Rural",
  },
];
