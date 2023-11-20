import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="section bg-fixed bg-inset-75" style={{ backgroundImage: 'url(./images/backgrounds/chairs-bg.jpg)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-10 col-11 text-center mx-auto">
            <h2 className="title text-white">G20 CAMPUS SHERPA Programme</h2>
            <p className="fs-4 fw-normal text-white">
              We are looking for young, savvy, informed, collaborative volunteers from schools, colleges and universities to become
              <b className="text-uppercase"> “Campus Sherpas”</b> for G20 events in their institution.
              <br /> Public speakers, student leaders, young diplomats and creative individuals, holler at us! We are interested in knowing you
              better!
            </p>
            <a href="/g20-campus-sherpa" className="btn btn-primary hover-ripple">
              Know more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
