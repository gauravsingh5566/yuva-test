import { Edit, Facebook, LinkedIn, Twitter, Instagram, YouTube } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const DashboardHead = ({ details, eventDate, countDelegate, certificates, countStudent }) => {
  return (
    <div className="bg-light-orange">
      <div className="container py-2">
        <div className="row g-2">
          <div className="col-12 col-lg-8">
            <div className="bg-white border h-100 rounded-2 p-3 shadow-sm" style={{ position: "relative", overflow: "hidden" }}>
              <div>
                <div className="row gx-2 gy-3">
                  <div className="col-lg-9 order-2">
                    {details.club ? (
                      <div className="border px-2 py-1 lh-sm me-2 rounded-2 mb-1 d-inline bg-success bg-opacity-25">
                        <small className="text-dark">
                          <i className="bi bi-trophy-fill text-success"></i> {details?.club}
                        </small>
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <h4 className="fs-4">{details?.institution_name}</h4>
                      <span className="text-dark font-ubd fs-6 lh-sm">
                        {details?.institution_address ? (
                          <>
                            {" "}
                            {details?.institution_address}, {details?.state} {details?.pincode ? details?.pincode : ""}
                          </>
                        ) : (
                          ""
                        )}
                      </span>

                      <div className="d-flex flex-wrap mt-2">
                        <div className="px-2 py-1 lh-sm me-2 rounded-2 mb-2 bg-warning bg-opacity-25">
                          <small className="text-dark">
                            <i className="bi bi-star-fill text-warning"></i> Event Date
                          </small>
                          <br />
                          <span className="fs-6 text-dark">{eventDate?.appointment_date}</span>
                        </div>
                        {/* Event Deadline Date  */}
                        <div className="px-2 py-1 lh-sm me-2 rounded-2 d-flex mb-2 bg-warning bg-opacity-25">
                          <div className="">
                            <small className="text-dark">
                              <i className="bi bi-star-fill text-warning"></i> Student Registration Deadline
                            </small>
                            <br />
                            <span className="fs-6 text-dark">{eventDate?.deadline}</span>
                          </div>
                          <Link to={"/edit/event/"}>
                            <IconButton size="small">
                              <Edit className="fs-6" />
                            </IconButton>
                          </Link>
                        </div>
                        {/* Event Theme  */}
                        <div className="px-2 py-1 lh-sm me-2 rounded-2 d-flex mb-2 bg-warning bg-opacity-25">
                          <div className="">
                            <small className="text-dark">
                              <i className="bi bi-star-fill text-warning"></i> Event Theme
                            </small>
                            <br />
                            <small className="text-dark">{details?.theme ? details?.theme : <span className="text-danger">No Theme Selected</span>}</small>
                          </div>
                          <Link to={"/edit/event/"}>
                            <IconButton size="small">
                              <Edit className="fs-6" />
                            </IconButton>
                          </Link>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="col-lg-3 order-1">
                    <div className="d-flex">
                      <div className="d-flex flex-column flex-wrap">
                        {details?.fb?.length ? (
                          <a href={details?.fb} target={"_blank"} className="p-1 border rounded-2 mx-1 d-inline-block mb-1" style={{ color: "navy" }}>
                            <Facebook />
                          </a>
                        ) : (
                          ""
                        )}
                        {details?.lkd?.length ? (
                          <a href={details?.lkd} target={"_blank"} className="p-1 border rounded-2 mx-1 d-inline-block mb-1" style={{ color: "blue" }}>
                            <LinkedIn />
                          </a>
                        ) : (
                          ""
                        )}
                        {details?.twitter?.length ? (
                          <a href={details?.twitter} target={"_blank"} className="p-1 border rounded-2 mx-1 d-inline-block mb-1" style={{ color: "skyblue" }}>
                            <Twitter />
                          </a>
                        ) : (
                          ""
                        )}
                        {details?.ytb?.length ? (
                          <a href={details?.ytb} target={"_blank"} className="p-1 border rounded-2 mx-1 d-inline-block mb-1" style={{ color: "red" }}>
                            <YouTube />
                          </a>
                        ) : (
                          ""
                        )}
                        {details?.insta?.length ? (
                          <a href={details?.insta} target={"_blank"} className="p-1 border rounded-2 mx-1 d-inline-block mb-1" style={{ color: "red" }}>
                            <Instagram />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <img
                          src={details?.logo && details?.logo !== "" ? details.logo : "https://yuvamanthan.s3.ap-south-1.amazonaws.com/development/data/profile/replace.webp"}
                          alt="Logo"
                          className="bg-white rounded shadow-sm border"
                          style={{
                            width: "100%",
                            maxWidth: 170,
                            height: 170,
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row row-cols-2 g-2">
              <div className="col">
                <div className="card rounded-2 p-2 text-center bg-white-gray border  h-100 shadow-sm">
                  <h1 className="fw-semibold">{countStudent && countStudent.length ? countStudent.filter((std) => std.role === "teacher").length : 0}</h1>
                  <div>
                    <span className="fw-regular text-dark fs-6">Total Teachers</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card rounded-2 p-2 text-center bg-white-gray border  h-100 shadow-sm">
                  <h1 className="fw-semibold">{countStudent && countStudent.length ? countStudent.filter((std) => std.role === "student").length : 0}</h1>
                  <div>
                    <span className="fw-regular text-dark fs-6">Total Student</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card rounded-2 p-2 bg-white-gray text-center border  h-100 shadow-sm">
                  <h1 className=" fw-semibold">{countDelegate && countDelegate.length ? countDelegate.length : 0}</h1>
                  <div>
                    <span className="fw-regular text-dark fs-6">Student Delegates</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card rounded-2 p-2 bg-white-gray text-center border  h-100 shadow-sm">
                  <h1 className=" fw-semibold">{certificates && certificates?.length ? certificates?.length : 0}</h1>
                  <div>
                    <span className="fw-regular text-dark fs-6">Certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
