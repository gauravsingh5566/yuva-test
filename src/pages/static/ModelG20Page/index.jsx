import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from 'layout/BreadCrumb';
import Card from './Card';
import FaqComponent from './FaqComponent';
import G20India from './G20India';
import G20Simulation from './G20Simulation';
import HowDoesItWork from './HowDoesItWork';
import ResourceLibrary from './ResourceLibrary';

const Modelg20Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BreadCrumb heading={'Model G20'} />
      {/* <!-- about us --> */}
      <section className="section pb-0">
        <div className="container">
          <div className="row justify-content-between mb-80 align-items-center">
            {/* <div className=" col-md-6 mb-5 mb-md-0"> */}
            <div className="d-flex align-items-start justify-content-start">
              <div>
                <img src={'/images/logo-modal.png'} alt="" className="icon-modal-logo" />
              </div>
              <div>
                <span className="section-title-border"></span>
                <h2 className="section-title">What is Model G20?</h2>
              </div>
            </div>
            {/* </div> */}
            <div className="row justify-content-between mb-80 align-items-center">
              <div className=" col-md-6 ">
                <p>
                  <span className="fw-bold">Yuvamanthan Model G20 (YMG20)</span> is a youth engagement mock simulator created to mirror the actual G20
                  or Group of Twenty summit of leaders. It is conceived and designed for young learners and professionals who wish to ace the art of
                  public speaking, strategy and diplomacy. It aims to unlock the true potential of Indian youth as it convenes young leaders, thinkers
                  and innovators on a platform that promotes consensus building, negotiation, and shared ideas.
                </p>
                <p>
                  YMG20 in 2023 will run parallel to the actual G20 events happening under India’s presidency and will take place in schools, colleges
                  and universities, leading to state-level events and finally a
                  <span className="fw-bold"> Yuvamanthan National Model G20 in August 2023</span>. It offers youth a chance to participate in an
                  all-encompassing discussion on trade, economics and socio-political affairs as well as cultural programmes centred around real
                  global issues and craft critical actions while at it.
                </p>
              </div>
              <div className="col-md-6">
                <div className="row g-4">
                  <div className="col-md-6">
                    <img
                      src="https://glcloud.in/images/static/events/hansraj/img24.webp"
                      className="h-100 w-100 rounded"
                      alt=""
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                  <div className="col-md-6 align-self-end">
                    <img
                      src="https://glcloud.in/images/static/events/hansraj/img10.webp"
                      className="w-100 rounded h-100"
                      alt=""
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                  <div className="col-12">
                    <img
                      src="https://glcloud.in/images/static/events/hansraj/img30.webp"
                      height="300px"
                      className="w-100 rounded"
                      alt=""
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- background shape --> */}
        {/* <img
          className="img-fluid"
          src="images/backgrounds/about-us-3-bg.png"
          alt="shape"
        /> */}
      </section>
      {/* <!-- /about us --> */}
      <section className="py-5 pt-0">
        <div className="container">
          <h3 className="fs-3">WHAT WILL YOU LEARN? </h3>
          <p>As a model G20 delegate, you will learn the art of</p>
          <div className="row gy-4 gx-3 gx-lg-4 gx-xl-5 justify-content-around">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/team-building.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Team building</h4>
                <p>Work in groups to build a friendly rapport with other teams to represent your team’s message.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/consensus.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Discussions with consensus</h4>
                <p>When opinions are shared as insights you learn to influence others and draw meaningful conclusions.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/int-diplomacy.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">International diplomacy</h4>
                <p>Influence actions through negotiations for a common cause without rhetoric or upsetting others.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/negotiation.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Multilateral Negotiations</h4>
                <p>Negotiating with countries on economics and socio-politico issues with varied perspectives.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/brainstorm.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Strategy Building</h4>
                <p>Working together with teams to create strategies that impact the future of the world.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/macroeconomics.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Macroeconomics</h4>
                <p>Researching and deliberating thoughts on economic matters to create resilient economies.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/analysis.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Research and Analysis</h4>
                <p>Deep diving into topics and themes on global issues and preparing content at short notice.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div>
                <img src="./images/icons/public-speaking.png" alt="" className="icon-120" />
                <h4 className="mb-3 mt-4">Public Speaking</h4>
                <p>Perfect the art of speaking to a large audience, debating, and influencing juries with impactful content.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h3 className="fs-3">WHO CAN PARTICIPATE?</h3>
          <p>
            Model G20 summit is for school students, university undergraduates, and young working professionals within the age group of 16-27 (as on
            31st December 2023). You can take part in pre-summit sessions by registering within your institution.
          </p>
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h3 className="fs-3">APPLICATIONS INVITED FROM EDUCATIONAL INSTITUTIONS!</h3>
          <p> YMG20 brings a host of benefits to participating schools, colleges and universities:</p>
          <p>
            {' '}
            - Educational institutions can appoint their faculty to manage student groups, exposing them to student and career development space.
          </p>
          <p>
            {' '}
            - YMG20 is a career-advancement platform for students seeking a career in civil services, international finance, international business
            and diplomacy. It gives real-time exposure to students through engagement groups, summits, webinars and podcasts.
          </p>
          <p>
            {' '}
            - Yuvamanthan will engage with the who’s who from diverse fields and will share knowledge and ideas with the students at a regular
            cadence.
          </p>
          <p> - As an item of extra curricula, it connects with schools looking to do something different for the students.</p>
          <p> - Your events get promoted on our website and social media giving publicity and eyeballs across India.</p>
          <p> - Schools will benefit from Yuvamanthan's tie-ups with foreign universities through exchange programmes in the future.</p>
          <p>
            If you are an educational institution interested in organising Model G20 summits in your campus, you can simply register with us and we
            will help you with the processes.
          </p>
          <Link to={'/registration'} className="btn btn-primary py-3" style={{ whiteSpace: 'pre-wrap !important' }}>
            <span className=" w-100">REGISTER AS AN EDUCATIONAL INSTITUTION</span>
          </Link>
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h3 className="fs-3">BECOME A G20 CAMPUS SHERPA</h3>
          <p>
            In line with the Model G20 programme,, we want to engage enthusiastic youth from schools, colleges and universities to become “Campus
            Sherpas”. Each institution will have one campus sherpa who will volunteer to undertake a set of activities to promote, manage and execute
            Model G20 programs within their campus
          </p>
          <p>
            Interested in knowing more?
            <Link to="/g20-campus-sherpa"> Click here</Link> for details
          </p>
        </div>
      </section>
      <Card />
      <div
        style={{ zIndex: 1200 }}
        className="d-none d-lg-flex d-flex border bg-primary flex-wrap align-items-center sticky-top justify-content-center">
        <a href="#scrollSpyG20India" className="btn btn-light-outline m-2">
          Model G20 India
        </a>
        <a href="#scrollSpyG20Simulation" className="btn btn-light-outline m-2">
          G20&nbsp;Simulation
        </a>
        <a href="#scrollspyHowDoesItWork" className="btn btn-light-outline m-2">
          How Does It Work
        </a>
        <a href="#scrollspyLibrary" className="btn btn-light-outline m-2">
          Resource Library
        </a>
        <a href="#scrollspyFaq" className="btn btn-light-outline m-2">
          FAQs
        </a>

        {/* <a href="#scrollspyRegister" className="btn btn-light-outline m-2">
          Registration
        </a> */}
      </div>
      <G20India />
      <G20Simulation />
      <HowDoesItWork />
      <ResourceLibrary />
      <FaqComponent />
    </div>
  );
};

export default Modelg20Page;
