import React from 'react';
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <React.Fragment>
      <section className="mb-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 mb-5 justify-content-around">
            <div className="col col-lg-5 card p-lg-5 p-3 mb-5 rounded-4" style={{ backgroundImage: 'linear-gradient(90deg,#198cd3,#37c2fd)' }}>
              <div className="card-backicons">
                <img
                  src="images/icons/reward.png"
                  className="w-25 position-absolute z-0"
                  alt=""
                  style={{
                    top: '5px',
                    right: '5px',
                    opacity: '90%',
                  }}
                />
              </div>
              <div className="content" style={{ zIndex: 1 }}>
                <div>
                  <h2 className="card-title" style={{ color: '#fff' }}>
                    Get Certified!
                  </h2>
                  <p className="fs-5 fw-lighter text-white">As a G20 Genius. Your first step towards knowing everything about G20 India. </p>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="/course/detail/g20-orientation-course" className="btn btn-light-outline hover-ripple me-5">
                    Get Certified
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="col col-5 card p-5 mb-5">
                            <div>
                                <h2 className='card-title'>
                                    Newsletter! 
                                </h2>
                                <p className="fs-4">Sign up with your emails to
                                receive our news and real-time updates.{" "}</p>
                            </div>
                            <div className="d-flex align-items-center">

                            <form action="#">
                                <div className="position-relative w-100">
                                    <input
                                        type="email"
                                        className="form-control border-1 newsletter-form bg-gray"
                                        id="newsletter"
                                        name="newsletter"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-subscribe"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div> */}

            <div className="col col-lg-5 card p-lg-5 p-3 mb-5 rounded-4" style={{ backgroundImage: 'linear-gradient(90deg,#ffbd59,#ffde59)' }}>
              <div className="card-backicons">
                <img
                  src="images/icons/newsletter.png"
                  className="w-25 position-absolute z-0"
                  alt=""
                  style={{
                    top: '5px',
                    right: '5px',
                    opacity: '80%',
                  }}
                />
              </div>
              <div className="content" style={{ zIndex: '1' }}>
                <h2>Newsletter</h2>
                <p className="fs-5 fw-lighter">Sign up with your emails to receive our news and real-time updates.</p>

                <form action="#">
                  <div className="position-relative w-100">
                    <input type="email" className="form-control  newsletter-form" id="newsletter" name="newsletter" placeholder="Enter your email" />
                    <button type="submit" className="btn btn-primary btn-subscribe">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="row row-cols-1 row-cols-lg-2 mb-5">
            <div className="row justify-content-evenly align-items-stretch px-3 py-5 p-sm-5 m-0">
              <div className="section7Card1 col-md-5 text-light p-5 rounded-4  mb-4">
                <h1 className="text-start" style="font-family: &quot;DM Serif Display&quot;;">Ready to go?</h1>
                <div className="mx-auto">
                  <p className="text-justify">Register through easy steps on this website and choose from a host of solutions.&nbsp;&nbsp;</p>
                  <button className="btn btn-outline-warning border-light text-light fw-bold rounded-pill px-4 mt-4 py-2">Get started</button>
                </div>
              </div>
              <div className="section7Card2 col-md-5 p-5 rounded-4 mb-4">
                <h1 className="text-start DMserif">Need advice?</h1>
                <div className="mx-auto">
                  <p className="text-justify">Have any questions on how SafeInSchool works? Not sure which solution is right for you? Call our helpline number and we will be happy to answer all your questions.</p>
                  <button className="btn btn-outline-primary border-dark text-dark fw-bold rounded-pill px-4 mt-4 py-2">
                    Call now: +91 XXXXXXXXX
                  </button>
                  <p className="fst-italic">(Working hours - 10am - 5pm, Mon-Fri)</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Card;
