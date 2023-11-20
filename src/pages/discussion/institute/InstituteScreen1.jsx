import { Button, ButtonBase, IconButton, Tooltip } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import { pop2 } from 'layout/Popup';
import CreatePDF from 'lib/communique/CreatePDF';
import useError from 'lib/errorResponse';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import fallback1 from '../fallback/fallbackscreen1.svg';
import StatusBadge from '../student/StatusBadge';
import Swal from 'sweetalert2';
import { Delete } from '@mui/icons-material';
import { Modal } from 'react-bootstrap';
const InstituteScreen1 = () => {
  let EventDate = '';
  const [showTracks, setShowTracks] = useState(false);
  const [otherMeetings, setOtherMeetings] = useState([]);
  const [startDeclarationMeeting] = useOutletContext();
  const { token, userData } = useGlobalContext();
  const { ErrorResponder } = useError();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState();
  const [track, setTrack] = useState('YMG20 Lite');
  const [plannedData, setPlannedData] = useState({});
  const [update, setUpdate] = useState(false);
  const [DeadlineExpired, setDeadlineExpired] = useState(false);
  async function fetchData() {
    if (token) {
      try {
        const responce = await apiJsonAuth.get('institute/event', {
          headers: {
            Authorization: token,
          },
        });
        if (responce?.data?.result[0]) {
          const finResult = responce?.data?.result[0];
          setPlannedData(finResult);
        }
      } catch (err) {
        ErrorResponder(err);
      }
    }
  }
  const fetchDetails = async () => {
    if (token) {
      try {
        const res = await apiJsonAuth.get('/institute', {
          headers: {
            Authorization: token,
          },
        });
        setTheme(res.data.result[0]?.theme);
        // console.log(res.data.result)
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchAllMeetings = async () => {
    try {
      const response = await apiJsonAuth.post(
        '/discussion/meetings',
        {
          instituteId: userData?.id,
          type: 'all',
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = response?.data;
      if (result?.status == 'SUCCESS') {
        setOtherMeetings(result?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  async function getEventDate() {
    try {
      const res = await apiAuth.get('institute/onboard/event-update?id=' + userData?.id);
      if (res.status === 200) {
        let TodayDate = moment().format('YYYY-MM-DD');
        EventDate = moment(res?.data?.result[0]?.appointment_date).format('YYYY-MM-DD');
        if (moment(EventDate).isSameOrBefore(TodayDate)) {
          setDeadlineExpired(true);
        }
      }
    } catch (err) {}
  }
  useEffect(() => {
    fetchAllMeetings();
    // fetchDetails();
    getEventDate();
  }, [update]);
  const isAssignedChecker = async () => {
    try {
      const response = await apiJsonAuth.post(
        '/discussion/assigncheck',
        {
          instituteId: userData?.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response?.data?.status === 'SUCCESS') {
        if (response?.data?.result == true) {
          fetchData();
          setShowTracks(response?.data?.result);
        } else {
          Swal.fire({
            title: 'Warning',
            html: "Discussion Board should be activated on the day of the summit only. 'Plan Your YMG20' and 'Auto Assign' roles to students before activating.",
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
            imageHeight: 100,
            width: 400,
            confirmButtonText: 'Go to Plan Your YMG20',
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/dashboard/planevent');
            } else if (result.isDenied) {
              Swal.dismiss();
            }
          });
        }
      }
    } catch (error) {
      pop2.error({ description: 'Error while checking assign' });
    }
  };
  //Meetings Creaters
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const meetingHandler = async () => {
    // console.log(userData)
    if (DeadlineExpired) {
      if (track && theme) {
        toast.loading('Creating a Meeting for your Discussion');
        const response = await apiJsonAuth.post('/discussion/start', {
          type: 'track',
          instituteId: userData?.id,
          roomId: selectedTrack || track,
          track: selectedTrack || track,
          theme: selectedTheme || theme,
        });
        toast.dismiss();
        const MeetingId = response?.data?.result?.id;
        if (response?.data?.status === 'SUCCESS') {
          toast.success('Meeting Created Successfully');
          navigate('/dashboard/discussion/meeting/' + MeetingId);
        } else if (response?.data?.status === 'CONFLICT') {
          navigate('/dashboard/discussion/meeting/' + MeetingId);
          toast('Meeting For this Track Already Existed');
        } else {
          toast(response?.data?.message);
        }
      } else {
        toast.success('Please Select Theme for the Meeting first.');
      }
    } else {
      toast.error('Event Can Only Be Started on the Day of Event or Later ');
    }
  };
  async function deleteMeeting({ id, meetingtype, theme, instituteId }) {
    Swal.fire({
      title: 'Are You Sure ?',
      text: 'You Want to Delete Meeting.',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes Delete It.',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        toast.loading('Deleteing Meeting');
        const response = await apiJsonAuth.post('/discussion/delete', {
          id,
          instituteId,
          meetingtype,
          theme,
        });
        if (response?.data?.status === 200) {
          setTimeout(() => {
            setUpdate(!update);
            toast.dismiss();
            toast.success('Meeting Deleted.');
          }, 1000);
        } else {
          toast.success('Something Went Wrong.');
        }
      }
    });
  }

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const CommuniqueAvailChecker = async () => {
    try {
      const response = await apiJsonAuth.post(
        '/discussion/communique',
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
      if (data?.status === 'SUCCESS') {
        setData(data?.result);
        handleShow();
        toast.success('Communique Document is available for download');
      } else if (data?.status === 'WARNING') {
        toast.warning(data?.message);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  return (
    <div className="py-4">
      {/* Communique Document  */}
      {data && (
        <>
          <Modal show={show} onHide={handleClose} className="rounded-0 h-100" scrollable>
            <Modal.Header closeButton>
              <Modal.Title className="text-dark">Your Communique Document</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <CreatePDF data={data} />
            </Modal.Body>
          </Modal>
        </>
      )}
      {/* Meetings  */}
      {!showTracks ? (
        <div>
          <>
            {!otherMeetings?.length ? (
              // No Previous Meetings
              <div className="py-5 text-center bg-white">
                <img
                  src={fallback1}
                  alt="FallBack Screen"
                  style={{
                    maxHeight: '400px',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
                <h4 className="text-center">
                  Welcome to the <span className="text-primary"> #YMG20 Lite</span>
                </h4>
                <div style={{ maxWidth: '600px' }} className="container">
                  <p className="text-center fs-6">
                    This is where all the action happens on the summit day. Students can note down their ideas, vote on other peoples idea's and
                    include opinions and suggestions on their own. Their Top ideas automatically get created into a Communique document at the end of
                    the day! <br />
                    NOTE: As an administrator, you are required to activate the Discussion Board on the day of the summit.
                  </p>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    meetingHandler();
                  }}
                  size="large"
                  color="warning">
                  START DISCUSSION
                </Button>
              </div>
            ) : (
              // Previous Meetings
              <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                  <h3 className="fs-3">Previous Meetings</h3>
                  <div className="d-flex align-items-center justify-content-end">
                    {
                      <Button
                        onClick={CommuniqueAvailChecker}
                        variant="outlined"
                        color="warning"
                        className="p-2 me-2 text-capitalize rounded"
                        size="small">
                        Download Communique
                      </Button>
                    }
                    {/* <Button onClick={isAssignedChecker} variant='contained' color='success' className='p-2 text-capitalize rounded' size='small'>New Meeting</Button> */}
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {otherMeetings?.map((meeting, i) => {
                    return (
                      <div className="col">
                        {console.log(meeting)}
                        <div key={i} className="card shadow-sm p-3 rounded-2 h-100 text-dark">
                          <div>
                            <span className="fs-5 text-dark ps-2 border-start border-warning border-4 text-capitalize">
                              {meeting?.track} {meeting?.meetingtype} Meeting
                            </span>
                            &nbsp;
                            <StatusBadge meeting={meeting} /> &nbsp;
                            <Tooltip title="Delete Meeting">
                              <IconButton
                                variant="outlined"
                                onClick={() => {
                                  deleteMeeting(meeting);
                                }}
                                color="error"
                                className="fs-6 py-2">
                                <Delete className="fs-6" />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <table className="table table-borderless table-sm">
                            <tbody>
                              <tr>
                                <td>
                                  <span className="text-dark">Theme</span>
                                </td>
                                <td>
                                  <span className="text-dark">{meeting?.theme} </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="text-dark">Started</span>
                                </td>
                                <td>
                                  <span className="text-dark">{moment(meeting?.createdAt).calendar()} </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <Link to={'/dashboard/discussion/meeting/' + meeting?.id}>
                            <Button size="small" variant="outlined" color="success" className="rounded-3 py-2">
                              Enter
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        </div>
      ) : (
        <div className="container">
          <div>
            <h4>Select a track to start Discussion Meeting</h4>
            <div className="row row-cols-1 row-cols-lg-3 mt-5">
              <div className="card col">
                <ButtonBase
                  onClick={() => {
                    setSelectedTrack(track);
                    setSelectedTheme(theme);
                  }}
                  className={`border border-light ${
                    selectedTrack === track ? 'shadow-lg bg-light-green-grad text-white' : 'bg-white shadow-sm'
                  } text-center p-2 p-lg-3 h-100 rounded-4`}>
                  <div className="py-3">
                    <h4>{track}</h4>
                    <p>
                      <b>Theme :</b> <br /> {theme}
                    </p>
                  </div>
                </ButtonBase>
              </div>
            </div>
            <div>
              {selectedTrack !== null && (
                <div className="text-center mt-5">
                  <Button variant="outlined" size="large" color="warning" className="text-capitalize rounded py-3 px-4" onClick={meetingHandler}>
                    Start Track Meeting
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteScreen1;

