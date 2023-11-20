import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toothpaste from "../assests/toothpast.svg";
import { useNavigate } from "react-router-dom";

const YourOrder = () => {
    const navigate = useNavigate()

    const navigateOrderDetail = ()=>{
        navigate("/redemption-store/order-detail");
    }

  return (
    <>
      <header>
        <main>
          <div className="my_container">
            <div className="d-flex">

              <div className="main p-4">
                <div className="Redemption position-relative d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <span className="backArrow">
                      <ArrowBackIosIcon sx={{ color: "#7700FF" }} />
                    </span>
                    <h4 className="my-3">Your Order</h4>
                  </div>

                  <p className="creadit fw-bolder">
                    Creadit Balance <span>1050</span>
                  </p>
                </div>
                {/* ======================checkout Contents================= */}
                <div className="yourorderContents">
                  <div className="mainyourorder">
                    <div className="orderitems row m-0 p-3">
                      <div className="col-lg-2">
                        ORDER PLACED 17 October 2023
                      </div>
                      <div className="col-lg-2">TOTAL 800 Credits</div>
                      <div className="col-lg-8 text-end m-0 p-0 seconitemsorders">
                        <p className="m-0">ORDER # D01-9359830-4511004</p>
                        <a href="#">View order details</a>
                        <a href="#" className="ps-3 m-0">
                          Invoice
                        </a>
                      </div>
                    </div>

                    <div className="youritems mt-4 px-4 m-0">
                      <p className="fw-bolder m-0">Delivered 18-Aug-2023</p>
                      <p className="m-0">
                        Package was handed directly to a security guard.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center w-75">
                          <img src={toothpaste} alt="toothpaste" />
                          <div className="texts ps-3">
                            <p className="fw-bold">
                              ENVIE® AAA Rechargeable Batteries, High-Capacity
                              Ni-MH 1100 mAh, Low Self Discharge, Pre-Charged
                              (Pack of 2) (AAA11002PL)
                            </p>

                            <p className="redeembtn fw-bold">Redeem it again</p>
                          </div>
                        </div>
                        <button className="feedbackbtn" onClick={navigateOrderDetail}>Leave feedback</button>
                      </div>
                    </div>
                  </div>

                  <div className="mainyourorder mt-4">
                    <div className="orderitems row m-0 p-3">
                      <div className="col-lg-2">
                        ORDER PLACED 17 October 2023
                      </div>
                      <div className="col-lg-2">TOTAL 800 Credits</div>
                      <div className="col-lg-8 text-end m-0 p-0 seconitemsorders">
                        <p className="m-0">ORDER # D01-9359830-4511004</p>
                        <a href="#">View order details</a>
                        <a href="#" className="ps-3 m-0">
                          Invoice
                        </a>
                      </div>
                    </div>

                    <div className="youritems mt-4 px-4 m-0">
                      <p className="fw-bolder m-0">Delivered 18-Aug-2023</p>
                      <p className="m-0">
                        Package was handed directly to a security guard.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center w-75">
                          <img src={toothpaste} alt="toothpaste" />
                          <div className="texts ps-3">
                            <p className="fw-bold">
                              ENVIE® AAA Rechargeable Batteries, High-Capacity
                              Ni-MH 1100 mAh, Low Self Discharge, Pre-Charged
                              (Pack of 2) (AAA11002PL)
                            </p>

                            <p className="redeembtn fw-bold">Redeem it again</p>
                          </div>
                        </div>
                        <button className="feedbackbtn" onClick={navigateOrderDetail}>Leave feedback</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </header>
    </>
  );
};

export default YourOrder;
