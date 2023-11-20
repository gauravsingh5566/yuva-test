import React from 'react';
import { Helmet } from 'react-helmet';
import CourseReview from './CourseReview';

const CourseDescriptions = ({ course, activeCourse }) => {
  return (
    <div className="container">
      {/* top view  */}
      <div className="row pt-2 pt-lg-4 align-items-center">
        <div className="col-11">
          <h1 className="DMserif fs-1">{course?.course_name}</h1>
        </div>
      </div>
      <div className="border-top pb-3 pb-lg-4">
        <ul className="nav nav-tabs nav-pill-design-3 profile-tabs justify-content-start border-0" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active py-2 text-secondary fw-semibold border border-3 rounded-0"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab">
              Description
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link py-2 text-secondary border border-3 rounded-0"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab">
              Reviews
            </button>
          </li>
        </ul>
        <div className="tab-content p-0">
          <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
            <div className="py-4">
              <small className="text-secondary">{course?.desc}</small>
            </div>
          </div>
          <div className="tab-pane p-0" id="profile" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
            <div className="py-4">
              <CourseReview courseId={course?.courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptions;
