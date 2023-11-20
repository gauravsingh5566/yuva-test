import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import bagimg from "../assests/bag.svg";
import bottle from "../assests/bottle.svg";
import vegibuckets from "../assests/vegibucket.svg";
import toothpaste from "../assests/toothpast.svg";
import { useNavigate } from "react-router-dom";

const StoreMain = () => {

  const navigate = useNavigate();

  const data = [
    {
      id:1,
      img:bagimg,
      para:"Reusable Cotton Bag",
      credits:"800 credits",
    },
    {
      id:2,
      img:bottle,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"1000 credits",
    },
    {
      id:3,
      img:vegibuckets,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"1500 credits",
    },
    {
      id:4,
      img:toothpaste,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"400 credits",
    },
    {
      id:4,
      img:toothpaste,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"400 credits",
    },
    {
      id:4,
      img:toothpaste,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"400 credits",
    },
    {
      id:4,
      img:toothpaste,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"400 credits",
    },
    {
      id:4,
      img:toothpaste,
      para:"Milton Gripper 1000 Stainless Steel Water Bottle",
      credits:"400 credits",
    },
  ]

  const navigateCheckoutpage = ()=>{
    navigate("/redemption-store/checkout")
  }

  return (
    <>
      <div className="p-4">
        <div className="Redemption position-relative d-flex justify-content-between align-items-center">

          <div className="d-flex align-items-center gap-2"> 
          <span className="backArrow"> <ArrowBackIosIcon sx={{color:"#7700FF"}} /> </span>
          <h4 className="my-3">Redemption Store</h4>
          </div>

          <p className="creadit">
            Creadit Balance <span>1050</span>
          </p>
        </div>

        <div className="main">
            <div className="mainContent d-flex flex-wrap justify-content-between gap-5 ">
            {
              data.map((val)=>{
                return(
                  <div className="d-flex flex-column justify-content-between">
                   <img src={val.img} alt="bag" width="100%" />
                   <p>{val.para}</p>
                   <h4>{val.credits}</h4>
                   <button onClick={navigateCheckoutpage}>Redeem</button>
                </div>
                )
              })
            }
            </div>
        </div>
      </div>
    </>
  );
};

export default StoreMain;