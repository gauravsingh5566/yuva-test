import React from 'react';

const InstagramFeeds = () => {
  return (
    <section className="section pt-0">
      <div className="pb-4 bg-gray-white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <span className="section-title-border"></span>
              <p className="subtitle">Instagram Feeds</p>
              <h2>G20India Instagram feeds</h2>
            </div>
            <div className="col-md-4 text-right align-self-end d-md-block d-sm-none">
              <a href="project.html" className="btn btn-primary mb-3 hover-ripple">
                Get Social
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0">
        <div className="row no-gutters">
          {/* project-item */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <div className="project-item">
              <div className="position-relative mb-4 overflow-hidden">
                <img src="images/project/project-1.jpg" alt="project thumb" className="img-fluid w-100" />
                <div className="hover-overlay">
                  <a href="images/project/project-1.jpg" className="venobox">
                    <i className="uni-plus"></i>
                  </a>
                </div>
              </div>
              {/* project-info */}
              <div className="ms-4">
                <h6 className="text-primary">Business Solution</h6>
                <h4>
                  <a href="project-single.html" className="text-dark">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </a>
                </h4>
              </div>
            </div>
          </div>
          {/* project-item */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <div className="project-item">
              <div className="position-relative mb-4 overflow-hidden">
                <img src="images/project/project-2.jpg" alt="project thumb" className="img-fluid w-100" />
                <div className="hover-overlay">
                  <a href="images/project/project-2.jpg" className="venobox">
                    <i className="uni-plus"></i>
                  </a>
                </div>
              </div>
              {/* project-info */}
              <div className="ms-4">
                <h6 className="text-primary">Digital Marketing</h6>
                <h4>
                  <a href="project-single.html" className="text-dark">
                    Lorem, ipsum dolor.
                  </a>
                </h4>
              </div>
            </div>
          </div>
          {/* project-item */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <div className="project-item">
              <div className="position-relative mb-4 overflow-hidden">
                <img src="images/project/project-3.jpg" alt="project thumb" className="img-fluid w-100" />
                <div className="hover-overlay">
                  <a href="images/project/project-3.jpg" className="venobox">
                    <i className="uni-plus"></i>
                  </a>
                </div>
              </div>
              {/* project-info */}
              <div className="ms-4">
                <h6 className="text-primary">Finacial Analytsis</h6>
                <h4>
                  <a href="project-single.html" className="text-dark">
                    Lorem ipsum dolor sit.
                  </a>
                </h4>
              </div>
            </div>
          </div>
          {/* project-item */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <div className="project-item">
              <div className="position-relative mb-4 overflow-hidden">
                <img src="images/project/project-4.jpg" alt="project thumb" className="img-fluid w-100" />
                <div className="hover-overlay">
                  <a href="images/project/project-4.jpg" className="venobox">
                    <i className="uni-plus"></i>
                  </a>
                </div>
              </div>
              {/* project-info */}
              <div className="ms-4">
                <h6 className="text-primary">Marketing Strategy</h6>
                <h4>
                  <a href="project-single.html" className="text-dark">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center d-block d-md-none">
          <a href="project.html" className="btn btn-primary mb-3 hover-ripple">
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeeds;
