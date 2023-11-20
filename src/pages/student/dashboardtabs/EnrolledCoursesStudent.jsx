import React, { useEffect } from 'react';
import CourseCardItem from 'pages/course/components/CourseCardItem';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@mui/material';

const EnrolledCoursesStudent = () => {
  const [details, enrolledCourses, fetchEnrolled] = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEnrolled();
  }, []);
  return (
    <div>
      {!enrolledCourses || enrolledCourses?.length === 0 ? (
        <div className="p-relative">
          <div className="p-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-light" style={{ textShadow: '4px 4px grey' }}>
              No Course Enrolled
            </h1>
            <Button onClick={() => navigate('/courses')} variant="contained" className="bg-dark text-capitalize p-3 px-4 rounded">
              View Courses
            </Button>
          </div>
          <img src="/images/fallback/nocourse.gif" alt="" className="w-100" />
        </div>
      ) : (
        enrolledCourses.map((courses, i) => {
          return <CourseCardItem courses={courses} key={i} enrolled={true} />;
        })
      )}
    </div>
  );
};

export default EnrolledCoursesStudent;
