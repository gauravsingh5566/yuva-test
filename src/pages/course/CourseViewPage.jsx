import React, { useEffect, useState } from 'react';
import VimeoPlayer from './viewer/VimeoPlayer';
import CourseDescriptions from './CourseDescriptions';
import CoursePanel from './coursepanel/CoursePanel';
import IframePdfViewer from './viewer/IframePdfViewer';
// import { common_axios } from "../../../../../api/axios";
import { useParams, useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2";
import QuizComp from './quiz/QuizComp';
import { api, apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import { toast } from 'react-hot-toast';
import LoadingComp from 'layout/loader/LoadingComp';
import Swal from 'sweetalert2';
import { Popup } from 'layout/Popup';
import PdfViewer from './viewer/PdfViewer';
import NewQuizComponent from './viewer/NewQuizComponent';
import CourseFallBack from './CourseFallBack';

const CourseViewPage = () => {
  const { token } = useGlobalContext();
  // Declarations
  const { courseId } = useParams();
  const { userData } = useGlobalContext();
  const navigate = useNavigate();
  // const courseData = democourse;
  const [loader, setLoader] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [course, setCourse] = useState({});
  const [series, setSeries] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [certificateDownloadable, setCertificateDownloadable] = useState(false);

  //Generating the certificate
  const generateCertificate = async () => {
    setIsGenerating(true);
    Popup('loading', 'Please wait', 'Applying for the Certificate ');
    try {
      let formdata = {
        courseId,
        studentId: userData.id,
      };
      const res = await apiAuth.post('/course/certificate', formdata, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status == 200) {
        // console.log("OK 200!!!!");
        // isGenerating(false);
        // navigate(`/dashboard/certificate/${courseId}`);
        Popup('success', 'Applied Successfully', res?.data?.message);
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        // console.log("NOT OK 409!!!!");
        // navigate("/dashboard/certificate/" + courseId);
        Popup('warning', 'Already Applied', err?.response?.data?.message);
      } else {
        // console.log("NOT OK!!!!");
        Popup('error', err?.response?.data?.message);
      }
    }
  };

  // Getting the course data
  const getCourse = async (id) => {
    Swal.fire({
      width: 300,
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await apiAuth.post(
        `course/enrolled/view`,
        {
          courseId,
          studentId: userData.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status == 200) {
        setCourse(res?.data?.course);
        setSeries(res?.data?.seriesArr);
        Swal.close();
      }
    } catch (error) {
      Swal.fire({
        width: 400,
        title: error.response.data.message ? error.response.data.message : 'Something Went Wrong Check  your Network Connection',
        icon: 'error',
      });
    }
  };
  //handle page toggle
  const handleDir = (attr) => {
    if (attr == 'prev') {
      if (viewIndex !== 0) {
        setViewIndex(viewIndex - 1);
      }
    } else if (attr == 'next') {
      setViewIndex(viewIndex + 1);
    }
  };
  // Course View Type Renderer
  const [viewIndex, setViewIndex] = useState(0);
  useEffect(() => {
    setSidebarActive(false);
  }, [viewIndex]);
  const view = (data) => {
    switch (data?.vd_type) {
      case 1:
        return (
          <VimeoPlayer
            videoId={data.path}
            viewIndex={viewIndex}
            setViewIndex={setViewIndex}
            handleDir={handleDir}
            series={series}
            postProgress={postProgress}
            setCertificateDownloadable={setCertificateDownloadable}
          />
        );
        // return "video";
        break;
      case 2:
        return (
          <PdfViewer
            file={data.path}
            viewIndex={viewIndex}
            setViewIndex={setViewIndex}
            series={series}
            postProgress={postProgress}
            setCertificateDownloadable={setCertificateDownloadable}
            handleDir={handleDir}
          />
        );
        // return "pdf";
        break;
      case 3:
        return (
          <NewQuizComponent
            file={data.path}
            viewIndex={viewIndex}
            setViewIndex={setViewIndex}
            series={series}
            progress={progress}
            postProgress={postProgress}
            setCertificateDownloadable={setCertificateDownloadable}
          />
        );
        break;
      default:
        return <CourseFallBack />;
    }
  };
  const setCurrentCourse = (id) => {
    if (series[viewIndex].id !== id) {
      series?.forEach((ele, i) => {
        if (ele.seriesId == id) setViewIndex(i);
      });
    }
  };
  const [sectionCompleted, setSectionCompleted] = useState(0);
  const [progress, setProgress] = useState([]);
  // Function for get Progress
  async function fetchPrevProgress(next) {
    try {
      if (course) {
        const res = await apiAuth.post(
          '/course/getprogress',
          {
            courseId,
            studentId: userData.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setProgress(res.data.sectionProgress);
          setSectionCompleted(res.data.sectionCompleted);
          if (res.data.sectionProgress.length !== 0) {
            let lastIndex = res.data.sectionProgress.length - 1;
            if (!next) {
              if (series.length > lastIndex) setViewIndex(lastIndex + 1);
            }
          }
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message ? error.response.data.message : 'Something Went Wrong Check Your Internet Connection');
    }
  }
  //Function for Post Progress
  async function postProgress(seriesId, next) {
    try {
      const res = await apiAuth.post(
        '/course/updateprogress',
        {
          studentId: userData.id,
          courseId,
          seriesId: seriesId,
          totalLength: series?.length,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status == 200) {
        toast.dismiss();
        toast.success('Section Marked as Completed');
        fetchPrevProgress(next);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message ? error.response.data.message : 'Something Went Wrong Check Your Internet Connnection');
    }
  }

  useEffect(() => {}, [viewIndex, series?.length]);

  useEffect(() => {
    if (token) {
      getCourse();
    }
  }, [token]);
  // console.log(series)
  useEffect(() => {
    if (token) {
      fetchPrevProgress();
    }
  }, [token]);
  return (
    <>
      {/* <Loading attr={loader} /> */}
      <div className="container-fluid p-relative p-0" style={{ overflow: 'hidden' }}>
        <div className="row g-0">
          <div className="col-12 col-lg-9 border-end">
            {/* Course View Area  */}
            <div className="container-fluid p-0">
              {/* end Top View  */}
              {/* Show Course Container  */}
              <div
                className="container-fluid p-0"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* Course Viewer */}
                {series?.length !== 0 ? view(series[viewIndex]) : 'No course Found'}
                {/*End Course Viewer */}
              </div>
              {/*End Show Course Container  */}
            </div>
            {/* Course Details Section  */}
            <CourseDescriptions course={course} activeCourse={series[viewIndex]} />
            {/*End Course Details Section  */}
          </div>
          <button
            className="btn d-lg-none coursePanelToggle btn-light border-dark rounded-2 bg-light py-2 px-1"
            onClick={() => setSidebarActive(!sidebarActive)}>
            <img src="https://cdn-icons-png.flaticon.com/512/5994/5994725.png" alt="" width={30} />
          </button>
          <div className={`col-12 col-lg-3 coursepanelColumn ${sidebarActive ? 'active' : ''}`} style={{ zIndex: 30 }}>
            <CoursePanel
              sidebarActive={sidebarActive}
              setSidebarActive={setSidebarActive}
              generateCertificate={generateCertificate}
              progress={progress}
              sectionCompleted={sectionCompleted}
              modules={course}
              series={series}
              isGenerating={isGenerating}
              activeCourse={series[viewIndex]}
              setCurrentCourse={setCurrentCourse}
              courseId={courseId}
            />{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseViewPage;
