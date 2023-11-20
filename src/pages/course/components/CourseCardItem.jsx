import React from 'react';
import { Link } from 'react-router-dom';
import { Backdrop, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const CourseCardItem = ({ courses, addTOWishlist, enrolled }) => {
  // console.log("Courses", courses);
  return (
    <div className="col-12 col-md-6 col-lg-4" style={{ overFlow: ' hidden !important' }}>
      <div className="course-container course-card h-100 rounded-4 shadow p-4 bg-white" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={courses.thumbnail}
          className="rounded"
          alt=""
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div className="course-details mt-4 font-third">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="text-feedback"
                value={4.5}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              <span className="ms-3 font-third text-secondary fs-6">( 12265 reviews )</span>
            </div>
            {addTOWishlist ? (
              <button
                onClick={() => {
                  addTOWishlist({
                    courseName: courses.courseName,
                    authorName: courses.authorName,
                    description: courses.Desc,
                    courseId: courses.id,
                    thumbnailImage: courses.thumbnailImage,
                  });
                }}
                className="btn border-0">
                <i className="bi bi-bookmark text-secondary"></i>
              </button>
            ) : (
              ''
            )}
          </div>

          <div className="d-flex justify-content-between align-items-start mt-2">
            <Link to={`/coursedetail/${courses.id}`}>
              <h4 className="DMserif fw-bold text-dark text-initial">{courses.course_name}</h4>
            </Link>
          </div>
          <div>
            <span className="font-third font-sm text-secondary">
              <i className="bi bi-journal-bookmark-fill"></i> {courses?.sections?.length} lessons
            </span>
            <span className="font-third font-sm text-secondary ms-2">
              <i className="bi bi-stopwatch"></i> {courses?.duration}min
            </span>
            <span className="font-third font-sm text-secondary ms-2">
              <i className="bi bi-person"></i> {courses?.author}
            </span>
          </div>
          <p className=" fw-regular text-justify">
            <small> {courses?.desc.slice(0, 60)}...</small>
          </p>
          {enrolled && (
            <>
              <div className="d-flex align-items-center justify-content-between ">
                <span className="fs-6 font-third text-secondary">
                  {(courses?.section_completed * 100) / courses?.sections?.length === 100 ? (
                    <b className="text-success fw-semibold">
                      <i className="bi bi-check-circle-fill"></i>
                      Course Completed
                    </b>
                  ) : (
                    'Progress'
                  )}
                </span>
                <span className="DMserif">
                  {courses?.section_completed ? Math.round((courses?.section_completed * 100) / courses?.course_length) : 0} %
                </span>
              </div>
              <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: '7px' }}>
                <div
                  className="progress-bar p-0"
                  style={{
                    width: `${(courses?.section_completed * 100) / courses?.course_length}%`,
                  }}></div>
              </div>
            </>
          )}
          <div className="d-flex align-items-center justify-content-between mt-3">
            <h5 className="text-uppercase fw-bold text-success">{/* Free */}</h5>
            {enrolled ? (
              <Link className="font-third text-danger" to={`/dashboard/courseview/${courses.courseId}`}>
                View Course <i className="bi bi-arrow-right"></i>
              </Link>
            ) : (
              <Link className="font-third text-warning" to={`/course/detail/${courses.slug}`}>
                View Details <i className="bi bi-arrow-right"></i>
              </Link>
              // <a>Details</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardItem;
