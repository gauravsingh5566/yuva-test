import { api, getYouthGallery } from "api";
import BreadCrumb from "layout/BreadCrumb";
import { Popup } from "layout/Popup";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ChevronRightTwoTone, Details, Facebook, FormatQuote, Instagram, LinkedIn, LocationOn, Twitter, YouTube } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import StudentRegisterForm from "pages/Auth/StudentRegisterForm";
import useError from "lib/errorResponse";
import SimpleBreadCrumb from "layout/SimpleBreadCrumb";
import { useGlobalContext } from "global/context";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const InstitutePublicPage = () => {
  const location = useLocation();
  let ecoClub = location.pathname.split("/")[1];
  const [youthTestimonials, setYouthTestimonials] = useState([]);
  const { ErrorResponder } = useError();
  const [stateWiseData, setStateWiseData] = useState();
  const [pageDetails, setpageDetails] = useState();
  const fetchYouths = async () => {
    try {
      const res = await getYouthGallery();
      setYouthTestimonials(res.data.resources);
    } catch (error) {
      console.error(error);
    }
  };
  const { slug } = useParams();
  let query = useQuery();
  const { userData } = useGlobalContext();
  const navigate = useNavigate();
  let collegeId = query.get("collegeId");
  const [details, setDetails] = useState({});
  const [permissions, setPermissions] = useState({});
  const [type, setType] = useState("student");
  const definedType = new URLSearchParams(useLocation().search).get("type");
  const fetchCollegBySlug = async () => {
    Popup("loading");
    try {
      const res = await api.get(`/public/institute?slug='${slug}'`);
      if (res.status === 200) {
        setDetails(res.data.result[0]);
        setpageDetails(res.data.result[0]?.page);
        Popup();
      }
    } catch (error) {
      toast.dismiss();
      toast.warning(error.response.data.message);
      navigate("/error");
    }
    try {
      const result = await api.get(`/public/stateWiseContent?slug='${slug}'`);
      setStateWiseData(result.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userData) {
      fetchYouths();
      if (!collegeId && !slug) {
        Popup("error", "Invalid link");
      } else {
        fetchCollegBySlug();
      }
    } else {
      navigate("/");
    }
  }, []);


  useEffect(() => {
    if (details?.permissions?.length) {
      setPermissions(JSON.parse(details.permissions));
    }
  }, [details]);

  useEffect(() => {
    if (definedType === "teacher" || definedType === "student") {
      setType(definedType);
    } else if ((definedType !== "teacher" || definedType !== "student") && permissions?.defaultType) {
      setType(permissions?.defaultType);
    } else if (permissions?.defaultType) {
      setType(permissions?.defaultType);
    }
  }, [permissions, definedType]);

  return (
    <div>
      <BreadCrumb heading={details?.institution_name} />
      <div className="py-4 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-white">
                {permissions?.ekalMasterInstitute ? (
                  <div>
                    <div className="row g-0">
                      <div className="col-12 col-md-8 order-2">
                        <div className="p-2 p-lg-3">
                          <h4 className="fs-2">{details?.institution_name}</h4>
                          <span className="text-dark font-ubd fs-6">
                            {details?.institution_address ? (
                              <>
                                {" "}
                                {details?.institution_address}, {details?.state} {details?.pincode ? details?.pincode : ""}
                              </>
                            ) : (
                              ""
                            )}
                          </span>
                          <div className="mt-2">
                            {details?.bio ? (
                              <>
                                <span className="text-dark fw-semibold fs-5">About Us :</span>
                                <p className="fs-6">{details?.bio}</p>
                              </>
                            ) : (
                              ""
                            )}
                            {details?.fb?.length ? (
                              <a href={details?.fb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "navy" }}>
                                <Facebook /> Facebook
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.lkd?.length ? (
                              <a href={details?.lkd} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "blue" }}>
                                <LinkedIn /> Linkedin
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.twitter?.length ? (
                              <a href={details?.twitter} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "skyblue" }}>
                                <Twitter /> Twitter
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.ytb?.length ? (
                              <a href={details?.ytb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                                <YouTube /> Youtube
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.insta?.length ? (
                              <a href={details?.insta} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                                <Instagram /> Instagram
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-2  order-1">
                        <div className="p-2 p-lg-4">
                          <img
                            src={"https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/images/EKAL+ABHIYAN+PNG.PNG"}
                            alt="Logo"
                            className="bg-white"
                            style={{
                              width: "100%",
                              maxHeight: 300,
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-2  order-3">
                        <div className="p-2 p-lg-4">
                          <img
                            src={"https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/images/BLSP_LOGO_PNG.png"}
                            alt="Logo"
                            className="bg-white"
                            style={{
                              width: "100%",
                              maxHeight: 300,
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="row g-0">
                      <div className="col-12 col-md-9 order-2">
                        <div className="p-2 p-lg-3">
                          <h4 className="fs-2">{details?.institution_name}</h4>
                          <span className="text-dark font-ubd fs-6">
                            {details?.institution_address ? (
                              <>
                                {" "}
                                {details?.institution_address}, {details?.state} {details?.pincode ? details?.pincode : ""}
                              </>
                            ) : (
                              ""
                            )}
                          </span>
                          <div className="mt-2">
                            {details?.bio ? (
                              <>
                                <span className="text-dark fw-semibold fs-5">About Us :</span>
                                <p className="fs-6">{details?.bio}</p>
                              </>
                            ) : (
                              ""
                            )}
                            {details?.fb?.length ? (
                              <a href={details?.fb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "navy" }}>
                                <Facebook /> Facebook
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.lkd?.length ? (
                              <a href={details?.lkd} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "blue" }}>
                                <LinkedIn /> Linkedin
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.twitter?.length ? (
                              <a href={details?.twitter} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "skyblue" }}>
                                <Twitter /> Twitter
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.ytb?.length ? (
                              <a href={details?.ytb} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                                <YouTube /> Youtube
                              </a>
                            ) : (
                              ""
                            )}
                            {details?.insta?.length ? (
                              <a href={details?.insta} target={"_blank"} className="p-2 px-3 border rounded-pill me-1 d-inline-block mb-1" style={{ color: "red" }}>
                                <Instagram /> Instagram
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-3  order-1">
                        <div className="p-2 p-lg-4">
                          <img
                            src={details?.logo && details?.logo !== "" ? details.logo : "https://yuvamanthan.s3.ap-south-1.amazonaws.com/development/data/profile/replace.webp"}
                            alt="Logo"
                            className="bg-white"
                            style={{
                              width: "100%",
                              maxHeight: 300,
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-0">
        <div className=" rounded border">
          {/* <!-- ========== Start Login ========== --> */}
          <div className="row row-cols-1 row-cols-lg-2 g-0 mb-4">
            <div className="col">
              <div className="bg-light d-flex flex-column justify-content-center">
                <div className="container p-2 p-md-3 p-lg-4 p-xl-5 py-4">
                  <h3 className="fs-1">Hi {type}!</h3>
                  <h3 className="fs-4">Welcome to the world of leadership, ideas and diplomacy.</h3>
                  <span className="fs-6 lh-sm text-dark">In order to register for the Yuvamanthan Model G20 Summit in your institution, please fill in the details and follow the steps. You will be asked some questions and there is a small e-module we have created to tell you more about G20 which will come as the next steps. Make sure you complete the e-module and you will be ready to participate!</span>
                  <hr />
                  {/* Testimonial Swiper  */}
                  <div>
                    <iframe src={permissions?.publicPageContent?.video ? "https://www.youtube.com/embed/" + permissions?.publicPageContent?.video : stateWiseData?.link || "https://www.youtube.com/embed/DQJrCbR77N0"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" className="d-block" height="400" allowFullScreen style={{ width: "100%" }} frameborder="1"></iframe>
                    <div className="h-100 d-flex align-items-center mt-3">
                      <blockquote className="text-start">
                        <p className="fs-5 lh-sm">
                          <FormatQuote sx={{ rotate: "180deg", marginBottom: 1 }} />
                          {stateWiseData?.qoute || "India's G20 agenda will be inclusive, ambitious, action-oriented, decisive: Shri Narendra Modi, Prime Minister, India"}
                          <FormatQuote /> <br />
                          <span className="ps-3">
                            <small>{stateWiseData?.qouteBy || ""}</small>
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col rounded">
              <div className="container py-5">
                <h3 className="fs-3 text-center">{type} Registration</h3>
                <StudentRegisterForm collegeId={details?.id} permissions={permissions} />
              </div>
            </div>
          </div>
          {/* <!-- ========== End Login ========== --> */}
        </div>
      </div>
      <div>
        <div className="row g-0 row-cols-1 row-cols-lg-2">
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePublicPage;
