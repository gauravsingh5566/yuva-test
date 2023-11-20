import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseEnroll from './components/Enroll';
import { api } from 'api';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from 'global/context';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';

const CourseDetails = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const param = useParams();
  const { userData, token } = useGlobalContext();
  // console.log(userData.type)
  const fetchCourseDetails = async () => {
    try {
      const res = await api.get(`/course/detail/${param.slug}`);
      if (res.status == 200) {
        setDetails(res.data.course);
      }
    } catch (error) {
      if (error) {
        toast.dismiss();
        toast.error(error.response.data.message ? error.response.data.message : 'Something went wrong check your network connection');
      }
    }
  };
  useEffect(() => {
    fetchCourseDetails();
  }, []);

  return (
    <>
      <SimpleBreadCrumb page={details?.course_name} />
      <section className="section">
        <div className="container">
          <span className="section-title-border"></span>
          <div className="row">
            <div className="col-12 col-lg-8 order-2 order-lg-1">
              <h3>{details?.course_name}</h3>
              <div>
                <p className="text-dark fs-6" style={{ textAlign: 'justify' }}>
                  {details?.desc}
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div>
                <img src={details?.thumbnail} alt="" className="w-100" />
                <ul className="list-group">
                  <li className="list-group-item p-4 pb-2 border-bottom-0">
                    <h5 className="d-flex justify-content-between">
                      <span>
                        <i className="bi bi-clock text-warning"></i> Duration
                      </span>
                      <span>{details?.duration} min</span>
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
                  {userData.type === 0 ? (
                    <li className="list-group-item p-3 text-center">
                      {!token ? (
                        <button
                          className="btn btn-primary w-100 rounded-3  hover-ripple"
                          onClick={() => {
                            navigate('/login', {
                              state: {
                                nextRoute: `/course/detail/${details.slug}`,
                              },
                            });
                          }}>
                          Login to Enroll
                        </button>
                      ) : (
                        <button className="btn btn-primary w-100 rounded-3  hover-ripple" data-bs-toggle="modal" data-bs-target="#courseEnroll">
                          Enroll Now
                        </button>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <CourseEnroll id={details?.id} />
    </>
  );
};

export default CourseDetails;
