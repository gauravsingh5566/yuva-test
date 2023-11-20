import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import './css/addpost.css'
import { UserContext } from "global/context";
import axios from "axios";
import { Male, Female, Email, School } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { apiAuth } from "api";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

import { Edit } from "@mui/icons-material";

import { Button, IconButton } from "@mui/joy";
import { FiberManualRecordTwoTone, Menu } from "@mui/icons-material";
import Activity from "./components/Activity";
import UserReport from "./UserReport";
import { fontSize } from "@xstyled/styled-components";
function ProfilePage() {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const [fullDetails_Student, setFullDetails_student] = useState(0);
  const [fullDetails_teacher, setFullDetails_teacher] = useState(0);
  const [adminDetail, setadminDetail] = useState(0);
  const { role, type, id } = userData;
  const { first_name, last_name, email, institution_name, logo, institution_address, gender, instituteState, profile } = fullDetails_Student;

  const { first_name: fname_teacher, last_name: lname_teacher, email: email_teacher, institution_name: institute_name_teacher, profile: logo_teacher, institution_address: institution_addresss_teacher, gender: gender_teacher, instituteState: instituteState_teacher, profile: profile_teacher } = fullDetails_teacher;

  const { first_name: admin_first_name, last_name: admin_last_name, email: admin_email, institution_name: admin_institution_name, logo: admin_logo, gender: admin_gender } = adminDetail;

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ cursor: "pointer" }}>
      {children}
    </span>
  ));

  const fetchAdminDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "timeline/getInstituteDetail/", {
        instituteId: id,
      })
      .then((response) => setadminDetail(response.data));
  };
  const fetchTeacherDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "timeline/getTeacherDetail/", {
        teacherId: id,
      })
      .then((response) => setFullDetails_teacher(response.data));
  };

  const fetchStudentDetails = async () => {
    try {
      const res = await apiAuth.get(process.env.REACT_APP_API_BASE_URL + "student/detail", {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        setFullDetails_student(res.data.result[0]);
      }
    } catch (error) {}
  };

  const handleProfileCardClick = () => {
    if (role === "admin") {
      navigate(`/timeline/posts/${id}`);
    } else {
      navigate(`/timeline/userProfile/${id}`);
    }
  };
  useEffect(() => {
    if (role == "admin" && token) {
      fetchAdminDetails();
    } else if (role == "student" && token) {
      fetchStudentDetails();
    } else if (role == "teacher" && token) {
      fetchTeacherDetails();
    }
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className=" ">
          <div className="rounded-4 border shadow mb-4 pb-4" style={{ width: "100%" }}>
            <div className="col ">
              <div
                className="row"
                style={{
                  height: "25vh",
                  backgroundImage: 'url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  width: "100%",
                  marginLeft: "1px",
                }}></div>
              {
                // for admin
                role === "admin" && token ? (
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: "-100px",
                        marginLeft: "18px",
                        border: "5px solid white",
                        fontSize: "60px",
                        textTransform: "capitalize",
                      }}
                      alt={admin_first_name}
                      src={admin_logo}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                ) : // for student
                role === "student" && token ? (
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: "-100px",
                        marginLeft: "18px",
                        border: "5px solid white",
                        fontSize: "60px",
                        textTransform: "capitalize",
                      }}
                      alt={first_name}
                      src={profile}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                ) : (
                  // for Teacher
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: "-100px",
                        marginLeft: "18px",
                        border: "5px solid white",
                        fontSize: "60px",
                        textTransform: "capitalize",
                      }}
                      alt={fname_teacher}
                      src={profile_teacher}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                )
              }
              {/* end here */}

              <div className="p-4">
                <div className="media-body mb-3">
                  {/* change here */}
                  {role === "admin" && token ? (
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{admin_first_name + " " + admin_last_name}</h3>
                      <Button
                        style={{
                          height: "0",
                          marginLeft: "12px",
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Admin
                      </Button>
                    </div>
                  ) : // for Student
                  role === "student" && token ? (
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{first_name + " " + last_name}</h3>
                      <Button
                        style={{
                          height: "0",
                          marginLeft: "12px",
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Student
                      </Button>
                    </div>
                  ) : (
                    // for Teacher
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{fname_teacher + " " + lname_teacher}</h3>
                      <Button
                        style={{
                          height: "0",
                          marginLeft: "12px",
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Teacher
                      </Button>
                    </div>
                  )}

                  {/* change here */}

                  {role === "admin" && token ? (
                    <>
                      {" "}
                      <p>
                        <i class="bi bi-map-fill mr-2 text-info"></i>
                        {userData.institution_address ? userData.institution_address : "India"}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: "15px", height: "15px", marginTop: "" }} />
                          &nbsp;{admin_email}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: "10px", marginRight: "10px" }} />
                          <WorkIcon sx={{ width: "15px", height: "15px", marginTop: "-2px" }} /> {admin_institution_name}
                        </li>
                      </ul>
                    </>
                  ) : role === "student" && token ? (
                    <>
                      {" "}
                      <p>
                        <i class="bi bi-map-fill mr-2 text-info"></i>
                        {institution_address ? institution_address : "India"}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: "15px", height: "15px", marginTop: "" }} />
                          &nbsp;{email}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: "10px", marginRight: "10px" }} />
                          <WorkIcon sx={{ width: "15px", height: "15px", marginTop: "-2px" }} /> {institution_name}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>
                        <i class="bi bi-map-fill mr-2 text-info"></i>
                        {institution_addresss_teacher ? institution_addresss_teacher : "India"}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: "15px", height: "15px", marginTop: "" }} />
                          &nbsp;{email_teacher}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: "10px", marginRight: "10px" }} />
                          <WorkIcon sx={{ width: "15px", height: "15px", marginTop: "-2px" }} /> {institute_name_teacher}
                        </li>
                      </ul>
                    </>
                  )}
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
