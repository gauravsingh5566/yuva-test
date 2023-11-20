import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toothpaste from "../assests/toothpast.svg";
import { useNavigate } from "react-router-dom";

const StoreReceipts = () => {

  const navigate = useNavigate()

  const navigateYourOrder = ()=>{
    navigate("/redemption-store/your-order")
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
                    <h4 className="my-3 fw-bold">
                      Receipt <span className="text-black-50">#2345</span>
                    </h4>
                  </div>

                  <p className="creadit fw-bold">
                    Creadit Balance <span>1050</span>
                  </p>
                </div>

                {/* ======================checkout Contents================= */}
                <div className="contents">
                  <div className="d-flex justify-content-between receiptContent">
                    <div>
                      <p>To</p>
                      <p>Santosh Kumar Kushwaha</p>
                      <p>Shipping Address</p>
                      <p>
                        Plot No 730, Shaktikhand 3, Indipuram Ghaziabad, UP
                        201014
                      </p>
                    </div>
                    <div>
                      <p>Transaction ID: JHUY643779</p>
                      <p>Shipment ID: JHUY643779</p>
                      <p className="tracingOrderbtn">Track Order</p>
                    </div>
                  </div>

                  <div className="items">
                    <div className="firstitem d-flex justify-content-between align-items-center">
                      <p className="fw-bolder">Items</p>
                      <p className="fw-bolder">Qty</p>
                      <p className="fw-bolder">Total</p>
                    </div>

                    <div className="seconditem d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="secitemimg">
                          <img
                            src={toothpaste}
                            alt="toothpaste"
                            width="100%"
                            height="83px"
                          />
                        </div>
                        <div className="secitemcontent">
                          <p>
                            ENVIE® AAA Rechargeable Batteries, High-Capacity
                            Ni-MH 1100 mAh, Low Self Discharge, Pre-Charged
                            (Pack of 2) (AAA11002PL)
                          </p>
                          <p>400 Credits</p>
                        </div>
                      </div>
                      <div className="seconditeminput fw-bolder">1</div>
                      <div className="fw-bolder">800</div>
                    </div>
                    <div className="thirditem d-flex justify-content-between align-items-center">
                      <p></p>
                      <p className="fw-bolder">Gross Total</p>
                      <p className="fw-bolder">800</p>
                    </div>
                  </div>
                  <div className="middleItems mt-4">
                    <p>Thanks for Saving Earth</p>
                    <p>
                      Happy shopping with yuvamanthan using your carbon credits
                    </p>
                  </div>
                  <div className="lastfieldCheckout d-flex justify-content-between mt-4">
                    <div className="para">
                      <p className="fw-bolder ms-3">Note</p>
                      <ol>
                        <li>Item once sold is not returnable.</li>
                        <li>For any dispute contact to support.</li>
                      </ol>
                    </div>
                    <div className="button">
                      <button onClick={navigateYourOrder}>Print</button>
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

export default StoreReceipts;
