import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toothpaste from "../assests/toothpast.svg";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();

  const navigateReceipt = ()=>{
    navigate("/redemption-store/receipt");
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
                    <h4 className="my-3">Chechout</h4>
                  </div>

                  <p className="creadit fw-bolder">
                    Creadit Balance <span>1050</span>
                  </p>
                </div>

                {/* ======================checkout Contents================= */}
                <div className="contents">
                    <p>To</p>
                    <p>Santosh Kumar Kushwaha</p>
                    <p>Shipping Address  <span>change Address</span>  </p>
                    <p>Plot No 730, Shaktikhand 3, Indipuram Ghaziabad, UP 201014</p>

                    <div className="items">
                        <div className="firstitem d-flex justify-content-between align-items-center">
                            <p className="fw-bolder">Items</p>
                            <p className="fw-bolder">Qty</p>
                            <p className="fw-bolder">Total</p>
                        </div>

                        <div className="seconditem d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="secitemimg">
                                    <img src={toothpaste} alt="toothpaste" width="100%" height="83px" />
                                </div>
                                <div className="secitemcontent">
                                  <p>ENVIE® AAA Rechargeable Batteries, High-Capacity Ni-MH 1100 mAh, Low Self Discharge, Pre-Charged (Pack of 2) (AAA11002PL)</p>
                                  <p>400 Credits</p>
                                </div>
                            </div>
                            <div className="seconditeminput">
                                <input type="number" name="numer" id="number" />
                            </div>
                            <div className="fw-bolder">
                                800
                            </div>
                        </div>
                        <div className="thirditem d-flex justify-content-between align-items-center">
                            <p></p>
                            <p className="fw-bolder">Gross Total</p>
                            <p className="fw-bolder">800</p>
                        </div>
                    </div>

                    <div className="lastfieldCheckout d-flex justify-content-between mt-4">
                      <p className="fw-bolder">Total Payable Credits 800 </p>
                      <button onClick={navigateReceipt}>Redem</button>
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

export default Checkout;
