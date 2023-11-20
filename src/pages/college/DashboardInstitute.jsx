import { apiAuth, apiJson, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { pop2, Popup } from "layout/Popup";
import useError from "lib/errorResponse";
import moment from "moment";
import AccountVerifyModal from "pages/Auth/verify/AccountVerifyModal";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "3px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const DashboardInstitute = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [delegates, setDelegates] = useState([]);
  const [StdCoordinate, setStdCoordinate] = useState([]);
  const [details, setDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  let [affiliated, setAffiliated] = useState([]);
  let [isAffiliated, setIsAffiliated] = useState(false);
  let [countDelegate, setCountDelegate] = useState([]);
  let [countStudent, setCountStudents] = useState([]);
  let [eventDate, setEventDate] = useState("");
  const [permissions, setPermissions] = useState({});
  const { ErrorResponder } = useError();
  const { userData, token, setUser } = useGlobalContext();
  const [shareableLink, setShareableLink] = useState(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}institute/${details?.slug}`);
  let [showAlert, setShowAler] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (details?.affiliate_slug) {
      setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${details?.affiliate_slug + "/" + details?.slug}`);
    } else {
      if (isAffiliated && details) {
        setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${details?.slug}`);
      }
    }
  }, [isAffiliated, details]);
  // --------------
  // FetchDetails
  // --------------
  useEffect(() => {
    if (details?.permissions) {
      setPermissions(JSON.parse(details.permissions));
    }
  }, [details]);
  useEffect(() => {
    if (permissions?.teacherMain) {
      setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}${details?.slug}`);
    }
  }, [permissions]);


  // check onboard status

  // const checkOnboardStatus = ()=>{
  //  if(userData?.role==='institute'){
  //   apiJson.get('v2/institute/checkOnBoardStatus/'+userData?.email)
  //   .then((res)=>{
  //     if(res.data.result===false){
  //       window.location.href = '/institute-on-boarding';
  //     }
  //   }).catch((error)=>{
  //     console.log(error.message)
  //   })
  //  }
  // }
  // useEffect(()=>{
  //   checkOnboardStatus()
  // },[])


  const getAffiliateInstitute = async () => {
    try {
      const res = await apiAuth.get(`admin/institute-affiliate/${userData?.id}`);
      if (res.status == 200) {
        if (res?.data?.result.length) {
          setIsAffiliated(true);
        }
        setAffiliated(res?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  async function getCountDelegate() {
    if (token) {
      try {
        const res = await apiJsonAuth.post(
          `/institute/delegatee`,
          {
            instituteId: userData?.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setCountDelegate(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  }
  async function getCountStudent() {
    if (token) {
      try {
        const res = await apiJsonAuth.post(
          `/institute/studente`,
          {
            instituteId: userData?.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setCountStudents(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  }
  const fetchDelegates = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.post(
          `/institute/delegates?search=${searchTerm}`,
          {
            instituteId: userData?.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setDelegates(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  // --------------
  // FetchDetails
  // --------------
  const fetchDetails = async () => {
    if (token) {
      Popup("loading");
      setLoading(true);
      try {
        const res = await apiJsonAuth.get("/institute", {
          headers: {
            Authorization: token,
          },
        });
        if (res?.data?.onboard) {
          Popup();
          setDetails(res.data.result[0]);
          setUser({ ...userData, logo: res.data.result[0].logo });
          setShareableLink(`${process.env.REACT_APP_MAIN_URL || "https://www.yuvamanthan.org/"}institute/${res.data.result[0]?.slug}`);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/dashboard/onboard");
          pop2.success({
            title: "Welcome",
            description: "Welcome to Yuvamanthan, Please proceed with our onboarding process.",
          });
        }
      } catch (error) {
        setLoading(false);
        ErrorResponder(error);
      }
    }
  };
  // --------------
  // FetchStudents
  // --------------
  const fetchStudents = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get(`/institute/data?type=students&search=${searchTerm}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setStudents(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
        // if (error) {
        //   toast.dismiss();
        //   toast.error(error.response?.data.message);
        // }
      }
    }
  };
  // --------------
  // FetchCertificates
  // --------------
  const fetchCertificates = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(`/institute/certificates`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setCertificates(res.data.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  // --------------
  // Fetch Student Coordinators
  // --------------
  const fetchStdCoordinate = async () => {
    if (token) {
      try {
        const res = await apiAuth.get(`/institute/studentCoordinate`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setStdCoordinate(res.data);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  // --------------
  // Fetch Event Date
  // --------------
  async function getEventDate() {
    try {
      const res = await apiAuth.get("institute/onboard/event-update?id=" + userData?.id);
      if (res.status === 200) {
        setEventDate(res?.data?.result[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }
  // ---------------
  // Share Modal
  // ---------------
  useEffect(() => {
    if (token) {
      // fetchStudents();
      // fetchDetails();
      // fetchCertificates();
      // fetchDelegates();
      // fetchStdCoordinate();
      // getAffiliateInstitute();
      // getCountStudent();
      // getCountDelegate();
      // getEventDate();
    }
  }, [token]);
  const DownloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "registerqrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (eventDate) {
      setShowAler(true);
    }
  }, [eventDate]);

  function MeetDeadline() {
    return (
      <div className="alert alert-success border-success alert-dismissible show rounded-3" role="alert">
        <div className="fw-semibold">
          <i className="bi bi-exclamation-triangle-fill"></i> {moment(eventDate.deadline).diff(moment(), "days") ? "Student Participation Deadline only " + moment(eventDate.deadline).diff(moment(), "days") + " Days left." : "Today is students Participation Deadline"}
        </div>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );
  }
  function MissingEventDate() {
    if (moment(eventDate?.deadline).diff(moment(), "days") < 3)
      return (
        <div className="alert alert-success border-success alert-dismissible show rounded-3" role="alert">
          <div className="fw-semibold">
            <i className="bi bi-exclamation-triangle-fill"></i> Please Update the Event Date for Yuvamanthan Model G20.
            <span
              onClick={() => {
                navigate("../edit/event/");
              }}
              style={{ color: "blue", cursor: "pointer" }}>
              {" "}
              Check it now.{" "}
            </span>
            <small className="fw-light">(please ignore if already did)</small>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      );
  }
  return (
    <div className="bg-white pb-5">
      {/* Modal TO Verify Account  */}
      {details?.status !== "active" && details?.status && <AccountVerifyModal checkReload={fetchDetails} name={details?.first_name + " " + details?.last_name} />}
      <div className="bg-white min-vh-100">
        <Outlet
          context={{
            countDelegate,
            MeetDeadline,
            MissingEventDate,
            showAlert,
            eventDate,
            details,
            students,
            fetchStudents,
            fetchDelegates,
            certificates,
            delegates,
            shareableLink,
            DownloadQR,
            fetchStdCoordinate,
            StdCoordinate,
            searchTerm,
            setSearchTerm,
            fetchDetails,
            affiliated,
            setAffiliated,
            isAffiliated,
            setIsAffiliated,
            getAffiliateInstitute,
            eventDate,
            loading,
            countStudent,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardInstitute;
