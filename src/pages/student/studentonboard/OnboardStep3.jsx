import * as React from 'react';
import { PlayCircleFilled } from '@mui/icons-material';
import { api, apiAuth } from 'api';
import { Popup } from 'layout/Popup';
import { useNavigate } from 'react-router-dom';
import Enroll from 'pages/course/components/Enroll';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from 'global/context';
import VideoSkeleton from 'layout/loader/VideoSkeleton';
import useError from 'lib/errorResponse';

const OnboardStep3 = ({ formik, setRedirectionPage }) => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details, setDetails] = React.useState({});
  const fetchCourseDetails = async () => {
    try {
      const res = await api.get(`/course/detail/g20-orientation-course`);
      if (res.status === 200) {
        setDetails(res.data.course);
      }
    } catch (error) {
      if (error) {
        Popup('error', error.response.data.message);
      }
    }
  };
  React.useEffect(() => {
    fetchCourseDetails();
  }, []);

  const { userData } = useGlobalContext();
  const navigate = useNavigate();
  const proceedEnroll = async () => {
    let formdata = {
      courseId: details?.id,
      studentId: userData.id,
    };
    setRedirectionPage(`/dashboard/courseview/${formdata.courseId}`);
    if (token) {
      try {
        formik.handleSubmit();
        const res = await apiAuth.post(`/course/enroll`, formdata, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          toast.dismiss();
          toast.success(`Enrolled Successfully`);
        }
      } catch (error) {
        if (error) {
          toast.dismiss();
          if (error.response.status === 409) {
            toast(error.response.data.message ? error.response.data.message : 'Something went wrong check your network connection', {
              icon: '😃',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
            navigate(`/dashboard/courseview/${formdata.courseId}`, {
              state: {
                tabId: 'enrolled',
              },
            });
          } else {
            ErrorResponder(error);
          }
        }
      }
    }
  };
  const enrollHandler = () => {
    proceedEnroll();
  };
  const [imgLoad, setImgLoad] = React.useState(false);
  const imgLoader = () => {
    setImgLoad(true);
  };
  return (
    <div>
      {/* ==================
        E Module for Course 
        ================== */}
      <div className="row row-cols-1 row-cols-lg-2 border rounded-5 g-0 p-0" style={{ overflow: 'hidden' }}>
        <div className="col bg-light-violet-grad  d-none d-lg-block">
          <img src="/assets/images/covers/onboardstudent3.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
        <div className="col">
          <div className="p-2 p-md-4 p-lg-5">
            <div className="p-relative text-center" style={{ position: 'relative' }}>
              <img
                src={details?.thumbnail}
                alt=""
                onLoad={imgLoader}
                className={`rounded-4 shadow p-0 w-100 fade ${imgLoad ? 'show' : 'hide'}`}
                style={{
                  objectFit: 'cover',
                  overflow: 'hidden',
                }}
              />
              {!imgLoad && <VideoSkeleton />}
              <div className="d-flex p-absolute w-100 align-items-end justify-content-center h-100" style={{ bottom: '-45px', left: '0' }}>
                <PlayCircleFilled
                  className="hover-ripple text-dark btn text-white p-1 shadow-lg rounded-circle"
                  sx={{
                    fontSize: 85,
                    cursor: 'pointer',
                    backgroundImage:
                      'radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% );',
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#courseEnrollModal"
                />
              </div>
            </div>
            <div className="mt-5">
              <h2>
                An Orientation to <span className="text-primary fw-bold">G20</span>{' '}
              </h2>
              <p className="line-clamp">{details?.desc}</p>
              <p>
                Language - <span className="bg-danger bg-opacity-25 text-danger p-2 rounded">English / Hindi</span>
              </p>
              <p>
                Duration - <span className="bg-danger bg-opacity-25 text-danger p-2 rounded">25 mins</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Enroll id={details?.id} />

      <div class="modal fade" id="courseEnrollModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title  fs-5" id="exampleModalLabel">
                Confirm Box
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
              <h4 className="text-initial">
                Do you wish to take the “An Orientation to G20” course now? It will take just 25 mins. You may skip this and take it later.
              </h4>
              <div className="row row-cols-2 g-1 mt-4 justify-content-center">
                <div className="col">
                  <button type="button" className="btn btn-outline-danger w-100 rounded-3" data-bs-dismiss="modal">
                    Discard
                  </button>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-primary hover-ripple w-100 rounded-3" onClick={enrollHandler} data-bs-dismiss="modal">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardStep3;
