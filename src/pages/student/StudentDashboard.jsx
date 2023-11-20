import { Avatar, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EditIcon from "@mui/icons-material/Edit";

import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, BuildCircle, CardMembershipTwoTone, ChatBubbleTwoTone, Dashboard, Facebook, FormatQuoteTwoTone, Instagram, LinkedIn, Twitter, YouTube, DynamicFormTwoTone, ForumTwoTone, QuestionAnswerTwoTone, VerifiedTwoTone, VerifiedOutlined, Remove, CancelOutlined } from "@mui/icons-material";
import { apiAuth, apiJson, apiJsonAuth } from "api";
import { toast } from "react-toastify";
import { useGlobalContext } from "global/context";
import { Popup } from "layout/Popup";
import useError from "lib/errorResponse";
import moment from "moment";
import AccountVerifyModal from "pages/Auth/verify/AccountVerifyModal";
// import

const StudentDashboard = () => {
  const { userData, setUser, token } = useGlobalContext();
  const [details, setDetails] = useState({});
  const [permission, setPermission] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();
  const { ErrorResponder } = useError();
  let currentRoute = useLocation().pathname;
  // console.log("data", userData);
  const fetchDetails = async () => {
    Popup("loading");
    try {
      const res = await apiJsonAuth.get("/student/detail", {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setDetails(res.data.result[0]);
        if (res.data.result[0]?.permission) {
          setPermission(JSON.parse(res.data.result[0]?.permission));
        }
        // console.log("DETAILS", JSON.parse(res.data.result[0]?.permission));
        // eslint-disable-next-line no-lone-blocks
        {
          setUser({ ...userData, profile: res?.data?.result[0]?.profile });
        }
        Popup();
        if (res?.data?.onboard) {
          setUser({ ...userData, profile: res.data.result[0].profile });
        } else {
          navigate("/dashboard/onboard");
        }
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  const fetchEnrolled = async () => {
    try {
      const res = await apiAuth.post(
        "/course/enrolled",
        {
          studentId: userData?.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setEnrolledCourses(res.data.courses);
      }
    } catch (error) {
      if (error?.response?.status !== 404) {
        ErrorResponder(error);
      }
    }
  };
  useEffect(() => {
    if (token) {
      // fetchDetails();
      // fetchEnrolled();
    }
  }, [token]);
  const [alert, showAlert] = useState(false);
  // console.log("DEADLINE", deadlineChecker());

  useEffect(() => {
    setTimeout(() => {
      showAlert(true);
    }, 1000);
  }, []);
  return (
    <div>
      <Outlet context={[details, enrolledCourses, fetchEnrolled, fetchDetails, permission]} />
    </div>
  );
};

export default StudentDashboard;
