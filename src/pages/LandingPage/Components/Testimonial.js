import React from 'react';
import "../Css/testimonial.css";
import educationSvg from "../assests/Education.svg";
import star from "../assests/testimonial/Star 2.svg";
import arrow from "../assests/testimonial/leftArrow.svg"

const Testimonial = () => {
  return (
    <>
        <div className="container">
        <div className="d-flex">

            <div className="leftTesti p-3">
                <h2>Our most satisfied Students says about us!</h2>
                <p>Most of our users give us feedback regarding our services. You can see their comments below.</p>

                <div className="monial">
                <div className="images p-3 flex align-items-center">
                    <img src={star} alt="star" className='mb-2' />
                    <img src={star} alt="star" className='mb-2' />
                    <img src={star} alt="star" className='mb-2' />
                    <img src={star} alt="star" className='mb-2' />
                    <img src={star} alt="star" className='mb-2' />

                    <span className='mx-2 text-bolder'>5.0</span>
                </div>
                <div className="contents p-3">
                    <p>"I can have training with the supervisors on how to utilize goals or assessments Yuvamanthan, or how to do one-on-ones. And across the board, it's the same, no matter the location. That brings that consistency you must have with multiple branches in multiple locations."</p>

                    <h3>Santosh Kushwaha - AMC College</h3>
                </div>
                <div className="arrows d-flex justify-content-end gap-3">
                    <div className="left">
                        <img src={arrow} alt="arrow" />
                    </div>
                    <div className="right">
                        <img src={arrow} alt="arrow" />
                    </div>
                </div>
                </div>
            </div>
            <div className="rightTesti p-5">
                <img src={educationSvg} alt="education" width="100%" />
            </div>
        </div>
        </div>
    </>
  )
}

export default Testimonial