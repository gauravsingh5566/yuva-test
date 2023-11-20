import React, { useEffect } from 'react';
import BreadCrumb from '../../../layout/BreadCrumb';
import CourseEnroll from '../../Registration/CourseEnroll';

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BreadCrumb heading={'G20 Genius Certification'} />
      <section className="section">
        <div className="container">
          <span className="section-title-border"></span>
          <h3>G20 Genius Certification</h3>
          <div className="row">
            <div className="col-12 col-lg-8 order-2 order-lg-1">
              <div>
                <p className="text-dark fs-5 " style={{ textAlign: 'justify' }}>
                  The G20 Genius Certificate is a one-of-a-kind learning module that approaches the history, function, operations, objectives and
                  challenges of G20 as pedagogical knowledge. The 45 minute interactive learning orientation touches on all key aspects that one must
                  know about G20. It engages the user with quirky animations, audio-visuals, quizzes, QnA’s and DYI exercises; and is tailored
                  specifically for young people to understand and find the information they need without getting bored. It aims to create societal
                  influencers and torch bearers of the G20 campaign that is “Vasudhaiva Kutumbakam” and subtly impact the collective conscience by
                  emphasising on showcasing India’s initiatives and culture to the world.
                </p>
                <h4>Course Outline</h4>
                <ul className="list-group border-none bg-gray mt-3">
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>{' '}
                    <span className="ps-2 fs-5">What is Group of Twenty or G20?</span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>{' '}
                    <span className="ps-2 fs-5">The economic, political and cultural implications of the G20 Summit.</span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>{' '}
                    <span className="ps-2 fs-5">Aims, objectives and mandate of G20.</span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                    <span className="ps-2 fs-5">
                      International cooperation on economic challenges, stability and growth, preventing financial crisis and creating new financial
                      architecture.
                    </span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                    <span className="ps-2 fs-5">
                      Global dialogue on climate, sustainability, health, digital transformation, women lead development, inclusive shared future,
                      peace, harmony, security etc.
                    </span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                    <span className="ps-2 fs-5">India's Presidency and what it means.</span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                    <span className="ps-2 fs-5">India's role in G20 and our initiatives for the world.</span>
                  </li>
                  <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                    <span className="p-2 bg-primary clip-cicle text-white mt-2">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                    <span className="ps-2 fs-5">India's role in G20.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div>
                <img src="./images/course.webp" alt="" className="w-100" />
                <ul className="list-group">
                  <li className="list-group-item p-4 pb-2 border-bottom-0">
                    <h5 className="d-flex justify-content-between">
                      <span>
                        <i className="bi bi-clock text-warning"></i> Duration
                      </span>
                      <span>45min</span>
                    </h5>
                  </li>
                  <li className="list-group-item p-4 pt-2 border-top-0">
                    <h5 className="d-flex justify-content-between">
                      <span>
                        <i className="bi bi-globe text-warning"></i> Mode
                      </span>
                      <span className="text-success">Online</span>
                    </h5>
                  </li>
                  <li className="list-group-item p-3 text-center">
                    <button className="btn btn-primary w-100 rounded-3  hover-ripple" data-bs-toggle="modal" data-bs-target="#courseEnroll" disabled>
                      Coming Soon
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <CourseEnroll />
    </>
  );
};

export default Course;
