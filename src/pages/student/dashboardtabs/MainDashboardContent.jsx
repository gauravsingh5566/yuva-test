import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import StudentpollPage from "../studentPoll/StudentpollPage";
import { Avatar, Button, IconButton, Rating, Typography } from "@mui/material";
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, ArrowRight, CardMembershipTwoTone, Edit, Facebook, FormatQuoteTwoTone, Instagram, LinkedIn, Star, Twitter, VerifiedTwoTone, YouTube } from "@mui/icons-material";
import moment from "moment";
import { api, apiAuth, apiJson, apiJsonAuth } from "api";
import { pop2 } from "layout/Popup";
import { useGlobalContext } from "global/context";
import { toast } from "react-hot-toast";
import useError from "lib/errorResponse";
import AccountVerifyModal from "pages/Auth/verify/AccountVerifyModal";

const SingleBlog = ({ data }) => {
  let blogContent = { __html: data?.content };
  return (
    <div className="border border-light rounded-3 h-100 p-3 pb-0 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
      <Link target={"_blank"} to={"/blog/" + data.slug}>
        <img className="card-img-top rounded-3" src={data.img} alt="Card image cap" />
      </Link>

      <div className="mt-3">
        <div className="title-border-left">
          <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
            <span className="text-secondary d-flex align-items-center">by {data?.author}</span> <span className="text-secondary">{moment(data?.created_at).fromNow()}</span>
          </div>
          <h6 className="card-title">
            <a href={"/blog/" + data?.slug} className="text-dark fs-6">
              {data?.title}
            </a>
          </h6>
        </div>
        <div className="card-text line-clamp">{data?.heading}</div>
      </div>
      {/* {blog.content} */}
      <a href={"/blog/" + data?.slug} className="btn btn-secondary btn-arrow">
        read more
      </a>
    </div>
  );
};
const CourseCardItem = ({ courses, enrolled }) => {
  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  const navigate = useNavigate();
  const proceedEnroll = async () => {
    let formdata = {
      courseId: courses.id,
      studentId: userData.id,
    };
    if (token) {
      try {
        const res = await apiAuth.post(`/course/enroll`, formdata, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status == 200) {
          toast.dismiss();
          toast.success(`Enrolled Successfully`);
          navigate(`/dashboard/courseview/${formdata.courseId}`);
        }
      } catch (error) {
        if (error) {
          toast.dismiss();
          if (error.response.status === 409) {
            toast(error.response.data.message ? "Started Course" : "Something went wrong check your network connection", {
              icon: "😃",
              style: {
                borderRadius: "10px",
                background: "green",
                color: "white",
              },
            });
            navigate(`/dashboard/courseview/${formdata.courseId}`, {
              state: {
                tabId: "enrolled",
              },
            });
          } else {
            ErrorResponder(error);
          }
        }
      }
    }
  };
  return (
    <div>
      <div className="course-container py-2 p-lg-3 h-100 rounded-4 shadow-sm bg-white border">
        <div className=" row g-3">
          <div className="col-12 col-lg-6">
            <img
              src={courses.thumbnail}
              className="rounded"
              alt=""
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <div className="course-details p-0 font-third">
              <div className="d-flex justify-content-between align-items-start ">
                <h4 className="DMserif fw-bold text-dark text-initial">{courses.course_name}</h4>
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
              <div className="d-flex justify-content-start align-items-center">
                <Rating name="text-feedback" value={4.5} readOnly precision={0.5} emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />} />
                <span className="ms-3 font-third text-secondary fs-6">( 12265 reviews )</span>
              </div>
              <p className=" fw-regular text-justify">
                <small> {courses?.desc.slice(0, 300)}...</small>
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
                        "Progress"
                      )}
                    </span>
                    <span className="DMserif">{courses?.section_completed ? Math.round((courses?.section_completed * 100) / courses?.course_length) : 0} %</span>
                  </div>
                  <div className="progress mt-2" role="progressbar" aria-label="Example with label" style={{ height: "7px" }}>
                    <div
                      className="progress-bar p-0"
                      style={{
                        width: `${(courses?.section_completed * 100) / courses?.course_length}%`,
                      }}></div>
                  </div>
                </>
              )}
              <Button className="rounded-3 py-2 px-4" color="warning" onClick={proceedEnroll} variant="outlined">
                View Course&nbsp;<i className="bi bi-arrow-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MainDashboardContent = () => {
  // const [details, enrolledCourses] = useOutletContext();
  const { userData } = useGlobalContext();
  const [details, enrolledCourses, fetchDetails, permission] = useOutletContext();
  const navigate = useNavigate();
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  let [blogData, setBlogData] = useState([]);
  const [allcourses, setAllcourses] = useState([]);
  const [quoteData, setQuoteData] = useState();
  const getAllBlogs = async () => {
    try {
      const res = await apiJson.get("public/blogs");
      if (res.status == 200) {
        setBlogData(res?.data?.result);
      }
    } catch (error) {
      // console.log("All Blogs Error: ", error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const res = await api.get(`/course`);
      if (res.status == 200) {
        setAllcourses(res.data.courses);
      }
    } catch (error) {
      if (error) {
        pop2.error(error.response.data.message);
      }
    }
  };
  const deadlineChecker = (check) => {
    // console.log(details?.event_deadline, details?.event_date)
    if (details?.event_deadline && details?.event_date) {
      const todayDate = moment(new Date()).format("YYYY-MM-DD");
      const deadlineDate = moment(details?.event_deadline).format("YYYY-MM-DD");
      const eventDate = moment(details?.event_date).format("YYYY-MM-DD");
      // console.log({ deadlineDate, todayDate, eventDate, check: moment(deadlineDate).isBefore(todayDate) });
      if (check === "event") {
        return moment(eventDate).isBefore(todayDate);
      } else {
        if (moment(deadlineDate).isBefore(todayDate)) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      // showAlert(false);
      return false;
    }
  };
  const proceedEnroll = async () => {
    let formdata = {
      courseId: 1,
      studentId: userData.id,
    };
    if (token) {
      try {
        const res = await apiAuth.post(`/course/enroll`, formdata, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status == 200) {
          toast.dismiss();
          toast.success(`Enrolled Successfully`);
          navigate(`/dashboard/courseview/${formdata.courseId}`);
        }
      } catch (error) {
        if (error) {
          toast.dismiss();
          if (error.response.status === 409) {
            toast(error.response.data.message ? "Started Course" : "Something went wrong check your network connection", {
              icon: "😃",
              style: {
                borderRadius: "10px",
                background: "green",
                color: "white",
              },
            });
            navigate(`/dashboard/courseview/${formdata.courseId}`, {
              state: {
                tabId: "enrolled",
              },
            });
          } else {
            ErrorResponder(error);
          }
        }
      }
    }
  };
  const getAllQuotes = async () => {
    try {
      const res = await apiJsonAuth.get("admin/quotes");
      if (res.status === 200) {
        setQuoteData(res?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  useEffect(() => {
    if (token) {
      window.scrollTo(0, 0);
      // getAllBlogs();
      // getAllQuotes();
      // fetchAllCourses();
    }
  }, [token]);
  return (
    <div>
      {/* Header  */}
      {/* Modal TO Verify Account  */}
      {details?.status !== "active" && details?.status && <AccountVerifyModal checkReload={fetchDetails} name={details?.first_name + " " + details?.last_name} />}
      <div className="yellow-bg-grad">
        <div className={`container py-2 py-md-3 py-lg-4`}>
          <div>
            {!deadlineChecker() && (enrolledCourses[0]?.section_completed * 100) / enrolledCourses[0]?.sections?.length !== 100 && alert ? (
              <div className="alert alert-warning border-warning alert-dismissible fade show rounded-0 p-1 px-2" role="alert">
                <div>
                  <small>
                    <i className="bi bi-exclamation-triangle-fill"></i> Warning: You have not taken or completed the ‘G20 Orientation Course’ yet. In order to be eligible to participate in Yuvamanthan Model G20 please complete the aforementioned course.
                  </small>
                  <Button onClick={proceedEnroll} size="small" color="success" className="text-capitalize ms-2">
                    Take the G20 Orientation Course
                  </Button>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            ) : (
              ""
            )}
            {permission?.ekalMasterTeacher && (
              <div className="my-3 card">
                <div className="container overflow-hidden rounded-3">
                  <div className="row m-3">
                    <div className="col-md-2">
                      <Avatar alt={details ? details?.first_name : "Avatar"} src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/images/EKAL+ABHIYAN+PNG.PNG" sx={{ width: 146, height: 146, mr: 3 }} className="shadow-sm border m-auto bg-white rounded" />
                    </div>
                    <div className="col-md-8">
                      <div className="text-center">
                        <h4>{details?.institution_name}</h4>
                        <Typography fontFamily="revert-layer">
                          {/* {details?.instituteBio} */}
                          Bharat Lok Shiksha Parishad was founded in Delhi in the year 2000, with the AIM to Realize the untapped potential of Rural and Tribal India which has waited for long to emerge and flourish. Come forth empowered socially and economically as the New Face of India. BLSP is committed for bringing them into the mainstream of
                          national progress and bridging
                        </Typography>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <Avatar alt={details ? details?.first_name : "Avatar"} src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/images/BLSP_LOGO_PNG.png" sx={{ width: 146, height: 146, mr: 3 }} className="shadow-sm border m-auto bg-white rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row row-cols-1 row-cols-lg-2 justify-content-start">
              {/* Profile  */}
              <div className="col">
                <div className="rounded-3 bg-white p-3 h-100">
                  <div className="d-flex w-100 flex-column flex-lg-row ">
                    <div className="mb-2">
                      <Avatar alt={details ? details?.first_name : "Avatar"} src={details?.profile} sx={{ width: 146, height: 146, mr: 3 }} className="shadow-sm border bg-white rounded" />
                    </div>

                    <div className="">
                      <div>
                        {details?.coordinator_check ? (
                          <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2  text-dark">
                            <CardMembershipTwoTone sx={{ color: "tomato", fontSize: 20 }} /> coordinator
                          </small>
                        ) : (
                          ""
                        )}
                        {deadlineChecker() && (
                          <>
                            {details?.g20_designation ? (
                              <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2  text-dark">
                                <VerifiedTwoTone sx={{ color: "blue", fontSize: 20 }} /> {details?.g20_designation}
                              </small>
                            ) : (
                              ""
                            )}
                            &nbsp;
                            {details?.g20_country ? (
                              <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2  text-dark">
                                <img width={20} src={details?.flag} alt={details?.g20_country} /> {details?.g20_country}
                              </small>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                      <h3 className="fs-4 text-initial font-ubd mb-0">
                        {details?.first_name} {details?.middle_name}
                        {details?.last_name}{" "}
                      </h3>
                      <div className="lh-sm fs-6">{details?.institution_name ? <span className="text-dark mt-3">{details?.institution_name}</span> : ""}</div>
                      <div hidden={permission?.ekalMasterTeacher} className="mt-0">
                        {/* {console.log(details)} */}
                        <span className="text-dark text-bolder">Education:</span>
                        <span className="text-center text-capitalize mx-2">{details?.class}</span>
                        <button className="border-0 bg-white">
                          {" "}
                          <Link to="/edit">
                            {" "}
                            <Edit color="error" className="fs-6 " />
                          </Link>
                        </button>
                      </div>
                      <div className="lh-sm mt-1">
                        <small className="text-secondary">{details?.bio && details?.bio}</small>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mt-2">
                        {details?.fb && (
                          <IconButton href={details?.fb} target={"_blank"} sx={{ bgcolor: "whitesmoke", color: "blue" }} className="me-1 px-2 py-2">
                            <Facebook sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                        {details?.twitter && (
                          <IconButton href={details?.twitter} target={"_blank"} sx={{ bgcolor: "whitesmoke", color: "skyblue" }} className="me-1 px-2 py-2">
                            <Twitter sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                        {details?.insta && (
                          <IconButton href={details?.insta} target={"_blank"} sx={{ bgcolor: "whitesmoke", color: "tomato" }} className="me-1 px-2 py-2">
                            <Instagram sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                        {details?.lkd && (
                          <IconButton href={details?.lkd} target={"_blank"} sx={{ bgcolor: "whitesmoke", color: "navy" }} className="me-1 px-2 py-2">
                            <LinkedIn sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                        {details?.ytb && (
                          <IconButton href={details?.ytb} target={"_blank"} sx={{ bgcolor: "whitesmoke", color: "red" }} className="me-1 px-2 py-2">
                            <YouTube sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quotes  */}
              <div className="col d-none d-lg-block">
                <div id="carouselExampleControls" className="carousel slide h-100" data-bs-ride="carousel">
                  <div className="carousel-inner h-100">
                    {quoteData?.map((values, index) => {
                      return (
                        <div key={index} className={`carousel-item h-100 ${index == 0 && "active"}`}>
                          <div className=" d-flex align-items-center h-100 bg-white rounded-3">
                            <div className="card p-4 border-0 py-5 rounded-3">
                              <div className="d-flex align-items-start justify-content-center">
                                <div className="text-center">
                                  <FormatQuoteTwoTone
                                    sx={{
                                      color: "green",
                                      transform: "rotate(180deg)",
                                      translate: "0px -10px",
                                      fontSize: 25,
                                    }}
                                  />
                                  <span className="text-dark fs-5 lh-1 d-inline">{values?.quote}</span>
                                  <FormatQuoteTwoTone
                                    sx={{
                                      color: "green",
                                      fontSize: 25,
                                    }}
                                  />
                                  <div className="d-flex align-items-center justify-content-center">
                                    <Avatar alt={values?.quoteBy} src={values?.img} style={{ objectPosition: "top" }} /> <span>&nbsp;&nbsp;- {values?.quoteBy}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="carousel-control-prev show-hover" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <ArrowCircleLeftOutlined sx={{ color: "green", fontSize: 40 }} />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next show-hover" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <ArrowCircleRightOutlined sx={{ color: "green", fontSize: 40 }} />
                    <span className="visually-hidden ">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Details  */}
      <div className="container py-4">
        <div className="row g-3 gy-4 justify-content-start">
          {allcourses?.map((course, i) => {
            if ((permission?.ekalMasterTeacher && course?.category == "Ekal") || (!permission?.ekalMasterTeacher && course?.category != "Ekal"))
              return (
                <div className="col-12" key={i}>
                  <CourseCardItem courses={course} enrolled={false} />
                </div>
              );
          })}
          {!permission?.ekalMasterTeacher && (
            <>
              <div className="col-12 col-lg-6">
                <div className="StudentPollPage">
                  <StudentpollPage details={details} />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="">
                  <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row">
                    <h4>Explore our Blogs</h4>
                    <Button target={"_blank"} href="/blog" variant="outlined" color="warning" className="text-capitalize rounded-3">
                      View All Blogs
                    </Button>
                  </div>
                  <Swiper spaceBetween={30} slidesPerView={1} loop={false} className="px-lg-4 py-2 py-md-5" modules={[Navigation]} navigation={true}>
                    {blogData.map((blog, index) => {
                      if (index < 4)
                        return (
                          <SwiperSlide key={index} className="py-2">
                            <SingleBlog data={blog} />
                          </SwiperSlide>
                        );
                    })}
                  </Swiper>
                </div>
              </div>
            </>
          )}
        </div>
        {!permission?.ekalMasterTeacher && (
          <div className="themes mt-4">
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="col">
                <div className="bg-white rounded mb-3">
                  <h4>Explore Themes</h4>
                  <li className="list-group-item">
                    <Link target={"_blank"} to="/future-of-work">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Future of Work: Industry 4.0, Innovation, and 21st Century Skills</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/peacebuilding-and-reconciliation">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Peacebuilding and Reconciliation: Ushering in an Era of No War</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/climate-change-and-disaster-risk-reduction">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Climate Change and Disaster Risk Reduction</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/health-well-being-and-sports">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Health, Well-Being, and Sports</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/shared-future">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Shared Future</span>
                      </div>
                    </Link>
                  </li>
                </div>
              </div>
              <div className="col">
                <div className="bg-white rounded mb-3">
                  <h4>Explore Topics</h4>
                  <li className="list-group-item">
                    <Link target={"_blank"} to="/life">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Lifestyle For Environment Initiative: LiFE</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/nep">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">New Education Policy (NEP)</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/education-for-all">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Education For All: A Worldwide Initiative</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/startup-india">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Startup India</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/digital-transform">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Digital Transformation</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/cdri">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Coalition of Disaster Resilient Infrastructure (CDRI)</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/woman-empowerment">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Woman Empowerment</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/unlearn-relearn-and-reskill">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Unlearn, Relearn and Re-Skill</span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item mt-2">
                    <Link target={"_blank"} to="/cyber-safety-for-youth">
                      <div className="border p-2 d-flex align-items-center rounded-3 hover-bg-primary">
                        <span className="bg-primary design rounded py-1 px-2 text-white">
                          <ArrowRight />{" "}
                        </span>
                        <span className="ms-2 color-initial">Cyber Safety for Youth and Post-Pandemic Culture</span>
                      </div>
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboardContent;
