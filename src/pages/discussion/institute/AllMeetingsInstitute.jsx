import { Button, ButtonBase, IconButton, Tooltip } from "@mui/material";
import { apiAuth, apiJson, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import CreatePDF from "lib/communique/CreatePDF";
import useError from "lib/errorResponse";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import fallback1 from "../fallback/fallbackscreen1.svg";
import StatusBadge from "../student/StatusBadge";
import Swal from "sweetalert2";
import { Analytics, Delete, DeleteOutlineOutlined, Group, GroupOutlined, GroupsOutlined, PictureAsPdfOutlined, Report } from "@mui/icons-material";
import { Alert, Modal } from "react-bootstrap";

export const TracksList = ["Leaders Track", "Finance Track", "Sherpa Track", "Foreign Ministers Track"];
export const ThemeList = ["Future of Work: Industry 4.0, Innovation, & 21st-Century Skills", "Peacebuilding and Reconciliation: Usheringin an Era of No War", "Climate Change and Disaster Risk Reduction:Making Sustainability a Way of Life", "Shared Future: Youth in Democracy and Governance Youth in Legislature And Politics", "Health, Wellbeing, and Sports: Agenda forYouth"];

export const InstituteMeetingCard = ({ meeting, deleteMeeting, setData, startDeclarationMeeting }) => {
  // Communique Document
  const downloadMeetingReport = async () => {
    try {
      const response = await apiJsonAuth.post("/discussion/communique-report", {
        instituteId: meeting?.instituteId,
        meetingId: meeting?.id,
      });
      const data = response?.data;
      if (data?.status === "SUCCESS") {
        console.log(data?.result);
        setData(data?.result);
        toast.success("Communique Document is available for download");
      } else if (data?.status === "WARNING") {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col">
      <div className="card border border-dark shadow-sm p-3 p-lg-4 rounded-4 h-100 text-dark bg-white">
        <div className="d-flex align-items-start">
          <h4 className="text-dark text-capitalize">
            {meeting?.track} {meeting?.meetingtype} Meeting &nbsp;
          </h4>
          <StatusBadge meeting={meeting} /> &nbsp;
        </div>
        <table className="table table-borderless table-sm">
          <tbody>
            <tr>
              <td>
                <span className="text-dark fw-semibold">Theme&nbsp;:</span>
              </td>
              <td>
                <span className="text-dark">{meeting?.theme}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-dark fw-semibold">Track&nbsp;:</span>
              </td>
              <td>
                <span className="text-dark">{meeting?.track}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-dark fw-semibold">Started&nbsp;:</span>
              </td>
              <td>
                <span className="text-dark"> {moment(meeting?.createdAt).calendar()}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
              <Button startIcon={<GroupOutlined />} size="sm" variant="outlined" color="success" className="fw-light text-capitalize rounded">
                Enter
              </Button>
            </Link>
            {meeting?.meeting_status === "end" ? (
              meeting?.meetingtype === "track" ? (
                <Button onClick={() => startDeclarationMeeting(meeting?.instituteId, meeting?.id, meeting?.track, meeting?.theme)} variant="outlined" color="warning" className="fw-light text-capitalize ms-1" size="sm">
                  Declaration&nbsp;Meeting
                </Button>
              ) : (
                <Button startIcon={<PictureAsPdfOutlined />} onClick={() => downloadMeetingReport()} variant="outlined" color="warning" className="fw-light text-capitalize ms-1" size="sm">
                  Report
                </Button>
              )
            ) : (
              ""
            )}
          </div>
          <Button
            size="sm"
            color="error"
            className="text-capitalize rounded"
            startIcon={<DeleteOutlineOutlined className="fs-6" />}
            onClick={() => {
              deleteMeeting(meeting);
            }}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const AllMeetingsInstitute = () => {
  const [startDeclarationMeeting] = useOutletContext();
  let EventDate = "";
  const [otherMeetings, setOtherMeetings] = useState([]);
  const [trackConfig, setTrackConfig] = useState({ tracks: [], themes: [] });
  const [meetingList, setMeetingList] = useState({
    live: [],
    pause: [],
    end: [],
  });
  const { token, userData } = useGlobalContext();
  const { ErrorResponder } = useError();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [track, setTrack] = useState("Leaders Track");
  const [theme, setTheme] = useState();
  const [themeIndex, setThemeIndex] = useState(0);
  const [subTheme, setSubTheme] = useState([""]);
  const [update, setUpdate] = useState(false);
  const [DeadlineExpired, setDeadlineExpired] = useState(false);
  const [show, setShow] = useState(true);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const handleClose = () => {
    setData(null);
  };
  const handleShow = () => setShow(true);

  const changeThemeIndex = (theme) => {
    setThemeIndex(trackConfig?.themes.findIndex((themeItem) => themeItem.name === theme));
  };
  useEffect(() => {
    changeThemeIndex(theme);
    // if (subTheme?.length > trackConfig?.themes[themeIndex]?.sub_topics?.length) {
    //   subTheme.length = trackConfig?.themes[themeIndex]?.sub_topics?.length;
    // }
  }, [theme]);
  // Meeting And Details
  const fetchDetails = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get("/institute", {
          headers: {
            Authorization: token,
          },
        });
        setTheme(res.data.result[0]?.theme);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchAllMeetings = async () => {
    try {
      const response = await apiJsonAuth.post(
        "/discussion/meetings",
        {
          instituteId: userData?.id,
          type: "all",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = response?.data;
      if (result?.status == "SUCCESS") {
        let LiveMeetings = result?.result.filter((meeting) => {
          if (meeting?.meeting_status === "started") return meeting;
        });
        let PausedMeetings = result?.result.filter((meeting) => {
          if (meeting?.meeting_status === "pause") return meeting;
        });
        let EndedMeetings = result?.result.filter((meeting) => {
          if (meeting?.meeting_status === "end") return meeting;
        });
        setMeetingList({ live: LiveMeetings, pause: PausedMeetings, end: EndedMeetings });
        setOtherMeetings(result?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  async function getEventDate() {
    try {
      const res = await apiAuth.get("institute/onboard/event-update?id=" + userData?.id);
      if (res.status === 200) {
        let TodayDate = moment().format("YYYY-MM-DD");
        EventDate = moment(res?.data?.result[0]?.appointment_date).format("YYYY-MM-DD");
        if (moment(EventDate).isSameOrBefore(TodayDate)) {
          setDeadlineExpired(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchThemeandTrack() {
    try {
      const res = await apiJsonAuth.get("public/theme-tracks");
      if (res.status === 200) {
        setTrackConfig({ tracks: res?.data?.tracks, themes: res?.data?.themes });
      }
    } catch (err) {
      console.log(err);
    }
  }
  //Meetings Creaters
  const meetingHandler = async () => {
    if (DeadlineExpired) {
      if (track && theme) {
        toast.loading("Creating a Meeting for your Discussion");
        const response = await apiJsonAuth.post("/discussion/start", {
          type: "track",
          instituteId: userData?.id,
          roomId: track,
          track,
          theme,
          subtheme: JSON.stringify(subTheme),
        });
        toast.dismiss();
        const MeetingId = response?.data?.result?.id;
        if (response?.data?.status === "SUCCESS") {
          toast.success("Meeting Created Successfully");
          navigate("/dashboard/discussion/meeting/" + MeetingId);
        } else if (response?.data?.status === "CONFLICT") {
          navigate("/dashboard/discussion/meeting/" + MeetingId);
          toast("Meeting For this Track Already Existed");
        } else {
          toast(response?.data?.message);
        }
      } else {
        toast.success("Please Select Theme for the Meeting first.");
      }
    } else {
      toast.error("Event Can Only Be Started on the Day of Event or Later ");
    }
  };
  async function deleteMeeting({ id, meetingtype, theme, instituteId }) {
    Swal.fire({
      title: "Are You Sure ?",
      text: "You Want to Delete Meeting.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes Delete It.",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        toast.loading("Deleteing Meeting");
        const response = await apiJsonAuth.post("/discussion/delete", {
          id,
          instituteId,
          meetingtype,
          theme,
        });
        if (response?.data?.status === 200) {
          setTimeout(() => {
            setUpdate(!update);
            toast.dismiss();
            toast.success("Meeting Deleted.");
          }, 1000);
        } else {
          toast.success("Something Went Wrong.");
        }
      }
    });
  }
  // Communique Document
  const CommuniqueAvailChecker = async () => {
    try {
      const response = await apiJsonAuth.post(
        "/discussion/communique",
        {
          instituteId: userData?.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response?.data;
      if (data?.status === "SUCCESS") {
        setData(data?.result);
        handleShow();
        toast.success("Communique Document is available for download");
      } else if (data?.status === "WARNING") {
        toast.warning(data?.message);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };

  // UseEffect
  useEffect(() => {
    fetchThemeandTrack();
    fetchAllMeetings();
    fetchDetails();
    getEventDate();
  }, [update]);
  return (
    <div className="py-4">
      {/* Communique Document  */}
      {data && (
        <>
          <Modal show={Boolean(data)} backdrop="static" scrollable={false} onHide={handleClose} size="lg" className="rounded-0">
            <Modal.Header closeButton>
              <Modal.Title className="text-dark">Your Communique Document</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <CreatePDF data={data} />
            </Modal.Body>
          </Modal>
        </>
      )}
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fs-3">Discussions Board</h3>
        <div className="d-flex align-items-center">
          <button
            className="p-2 me-2 text-capitalize btn btn-warning rounded-0 fw-light  text-white shadow-sm"
            onClick={() => {
              setShowAddMeeting(true);
            }}
            size="large">
            New Discussion
          </button>
        </div>
      </div>
      {/* Discussion Meetings  */}
      <div>
        <>
          {!otherMeetings?.length ? (
            // No Previous Meetings
            <div className="py-5 text-center bg-white">
              <img src={fallback1} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
              <h4 className="text-center">
                Welcome to the <span className="text-primary"> #YMG20 Discussion Board</span>
              </h4>
              <div style={{ maxWidth: "600px" }} className="container">
                <p className="text-center fs-6">
                  This is where all the action happens on the summit day. Students can note down their ideas, vote on other peoples idea's and include opinions and suggestions on their own. Their Top ideas automatically get created into a Communique document at the end of the day! <br />
                </p>
                <Alert variant="danger" className="text-capitalize">
                  NOTE: As an administrator, you are required to activate the Discussion Board on the day of the summit.
                </Alert>
              </div>
            </div>
          ) : (
            // Previous Meetings
            <div>
              {/* Live Meetings  */}
              <div className={`${!meetingList?.live?.length && "d-none"}`}>
                <div className="mb-3">
                  <h5>Live Discussions</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {meetingList?.live?.map((meeting, i) => {
                    return <InstituteMeetingCard setData={setData} key={i} startDeclarationMeeting={startDeclarationMeeting} deleteMeeting={deleteMeeting} meeting={meeting} />;
                  })}
                </div>
              </div>
              {/* Past Meetings  */}
              <div className={`${!meetingList?.pause?.length && "d-none"}`}>
                <div className="mb-3">
                  <hr className="mt-4" />
                  <h5>Paused Discussions</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {meetingList?.pause?.map((meeting, i) => {
                    return <InstituteMeetingCard setData={setData} key={i} startDeclarationMeeting={startDeclarationMeeting} deleteMeeting={deleteMeeting} meeting={meeting} />;
                  })}
                </div>
              </div>
              {/* Past Meetings  */}
              <div className={`${!meetingList?.end?.length && "d-none"}`}>
                <div className="mb-3">
                  <hr className="mt-4" />
                  <h5>Ended Discussions</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {meetingList?.end?.map((meeting, i) => {
                    return <InstituteMeetingCard setData={setData} key={i} startDeclarationMeeting={startDeclarationMeeting} deleteMeeting={deleteMeeting} meeting={meeting} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
      {/* Create Meeting Modal */}
      <Modal show={showAddMeeting} onHide={() => setShowAddMeeting(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>New YMG20 Discussion</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <span className="text-dark">Select The Track</span>
            <select type="text" className="form-select p-3 rounded-0 mt-2" value={track} onChange={(e) => setTrack(e.target.value)}>
              <option value="">--Select a Track--</option>
              {trackConfig?.tracks?.map((track, trackIndex) => (
                <option value={track?.name} key={trackIndex}>
                  {track?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <span className="text-dark">Select The Theme</span>
            <select type="text" className="form-select p-3 rounded-0 mt-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">--Select a Theme--</option>
              {trackConfig?.themes?.map((theme, themeIndex) => (
                <option key={themeIndex} value={theme?.name}>
                  {theme?.name}
                </option>
              ))}
            </select>
          </div>
          {/* {Boolean(track !== TracksList[0]) && (
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Select Suggested Sub Themes</span>
                <div className="input-group justify-content-end">
                  {Boolean(subTheme.length < trackConfig.themes[themeIndex]?.sub_topics?.length) && (
                    <button className="btn btn-outline-warning btn-sm rounded-0" onClick={() => setSubTheme([...subTheme, ""])}>
                      Add
                    </button>
                  )}
                  {Boolean(subTheme.length > 1) && (
                    <button
                      className="btn btn-outline-danger border-0 btn-sm rounded-0"
                      onClick={() => {
                        let tempSubthemeArr = [...subTheme];
                        tempSubthemeArr.pop();
                        setSubTheme(tempSubthemeArr);
                      }}>
                      remove
                    </button>
                  )}
                </div>
              </div>
              {subTheme?.map((subthemeItem, i) => (
                <select
                  key={i}
                  id={"subtheme" + 1}
                  name={"subtheme" + 1}
                  type="text"
                  className="form-select p-3 rounded-0 mt-2"
                  value={subthemeItem}
                  onChange={(e) => {
                    let tempSubTheme = [...subTheme];
                    tempSubTheme[i] = e.target.value;
                    setSubTheme(tempSubTheme);
                  }}>
                  <option value="">--Select a Sub Theme--</option>
                  {trackConfig?.themes[themeIndex]?.sub_topics?.map((subThemeSelectItem, subThemeItemIndex) => (
                    <option key={subThemeItemIndex} value={subThemeSelectItem?.title}>
                      {subThemeSelectItem?.title}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )} */}
          <button
            className="p-2 me-2 text-capitalize btn btn-warning rounded-0 fw-light text-white text-capitalize"
            onClick={() => {
              meetingHandler();
            }}
            size="large">
            Create Discussion <GroupsOutlined />
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllMeetingsInstitute;
