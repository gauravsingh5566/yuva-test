import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toothpaste from "../assests/toothpast.svg";

const OrderDetail = () => {
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
                {/* ======================detail Contents================= */}
                <div className="orderdetails p-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="fw-bold">Shipping Address</p>
                      <p>
                        Santosh Kushwaha Plot No 730, Shaktikhand 3, Indipuram
                        Ghaziabad, UP 201014
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="fw-bold">Payment Method</p>
                      <p>Carbon Credits</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="fw-bold">Order Summary</p>

                      <div className="d-flex justify-content-between m-0">
                        <div className="m-0">
                          <p className="m-0">Item(s) Subtotal:</p>
                          <p className="m-0">Shipping:</p>
                        </div>
                        <div>
                          <p className="m-0">297.00</p>
                          <p className="m-0">0.00</p>
                        </div>
                      </div>
                      <br />
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="m-0">Total :</p>
                          <p className="m-0">Credit Value (800)</p>
                        </div>
                        <div>
                          <p className="m-0">-297.00</p>
                          <p className="m-0">-297.00</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                          <p className="fw-bold">Total</p>
                          <p className="fw-bold">0.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="yourorderContents mt-5">
                  <div className="mainyourorder py-3">
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
                        <button className="feedbackbtn">Leave feedback</button>
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

export default OrderDetail;
