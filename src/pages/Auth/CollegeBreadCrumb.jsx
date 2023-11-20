import React from 'react';

const CollegeBreadCrumb = () => {
  return (
    <div>
      <div className="bg-white p-5"></div>
      <img
        src="https://images.shiksha.com/mediadata/images/1633937867phpOIZABO_1280x960.jpg"
        alt=""
        className="w-100 d-block"
        style={{ height: '350px', objectFit: 'cover' }}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-column flex-lg-row">
          <div className=" p-3">
            <img
              src="https://images.shiksha.com/mediadata/images/1633937861phpHc5RFA.jpeg"
              alt=""
              className="p-3 shadow border border-3 rounded-4"
              style={{ width: '180px', height: '180px', objectFit: 'contain' }}
            />
          </div>
          <div className=" p-3">
            <div>
              <h3>Indian Institute of Management Ahmedabad</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit magni eos cum doloremque porro est quis dolores delectus accusamus
                impedit.
              </p>
              <div>
                <span className="d-flex align-items-center">
                  <i className="bi bi-person-fill fs-3 me-2"></i>
                  Mr. Saurabh Sharma
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeBreadCrumb;
