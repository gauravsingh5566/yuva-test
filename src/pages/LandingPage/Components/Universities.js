import React from 'react';
import satyaIcon from "../assests/satmew-jayte-logo-FBBEBAEA31-seeklogo 2.svg";
import "../Css/univercity.css";
import arrow from "../assests/Vector.svg";
// import unione from "../assests/univercity/uniOne.svg";
// import uniTwo from "../assests/univercity/uniTwo.svg";
// import uniThree from "../assests/univercity/uniThree.svg";
// import uniFour from "../assests/univercity/uniFour.svg";
// import uniFive from "../assests/univercity/uniFive.svg";
// import uniSix from "../assests/univercity/uniSix.svg";
import satyaimg from "../assests/univercity/satmew-jayte-logo-FBBEBAEA31-seeklogo 1.svg";
import unaUnivlogo from "../assests/univercity/uvaUnivlogo.svg";


const Universities = () => {
  return (
    <>
        <div className="container satya position-relative">
        <img src={satyaimg} alt="logo" id='satyaimg' className='position-absolute' />
        <img src={unaUnivlogo} alt="logo" id='unaUni' className='position-absolute' />

            <h2 className='text-center fw-bolder mb-5'>We are supported by more than 20 ministries and universities</h2>

            <div className="univercityIcons">
                <div className="row text-center">
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF EDUCATION</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF AYUSH</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF CULTURE</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF DEFENCE</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF YOUTH AFFAIRS AND SPORTS</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={satyaIcon} alt="satyaicon" />
                        <p>MINISTRY OF ENVIRONMENT, FORESTS & CLIMATE CHANGE</p>
                    </div>
                </div>
            {/* ================================================== */}
                {/* <div className="row text-center">
                    <div className="col-lg-2">
                        <img src={unione} alt="satyaicon" />
                        <p>ARMY WELFARE EDUCATION SOCIETY</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={uniTwo} alt="satyaicon" />
                        <p>UNIVERSITY GRANTS COMMISSION</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={uniThree} alt="satyaicon" />
                        <p>UNIVERSITY OF DELHI</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={uniFour} alt="satyaicon" />
                        <p>UNIVERSITY OF DELHI</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={uniFive} alt="satyaicon" />
                        <p>YOUTH20</p>
                    </div>
                    <div className="col-lg-2">
                        <img src={uniSix} alt="satyaicon" />
                        <p>UNDP</p>
                    </div>
                </div> */}
            </div>

            <button className='d-flex align-items-center gap-2 seeMore border-0 text-white px-3 py-1'>See More 
            <span className='btnIcon'> 
                <img src={arrow} alt="arrow" height="100%" width="100%" />
                <img src={arrow} alt="arrow" height="100%" width="100%" />
            </span> 
            </button>

        </div>
    </>
  )
}

export default Universities