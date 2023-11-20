import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button, TextField, Tooltip } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { CheckCircleOutlineTwoTone, Edit, Report, WorkspacePremiumTwoTone } from "@mui/icons-material";
import ConfettiExplosion from "react-confetti-explosion";
import moment from "moment";
import { apiJsonAuth } from "api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useChat from "../useChat";

const StudentDeclarationItem = ({ message, i, votesArr, reloadVote, showVote, meetingData }) => {
  const { userData } = useGlobalContext();
  console.log({ message, votesArr });
  const [edit, setEdit] = useState();
  const [canVote, setCanVote] = useState(true);
  const [point, setPoint] = useState(message?.text);
  const [questionWiseVote, setQuestionWiseVote] = useState([]);
  const params = useParams();
  const roomId = params?.meetingid;
  const { EditMessage, handelVote } = useChat(roomId);

  const gradWiseColor = (grad) => {
    switch (grad <= 3) {
      case true:
        if (grad == 1) {
          return "bg-light-maroon-grad";
        } else if (grad == 2) {
          return "bg-light-green-grad";
        } else {
          return "bg-primary";
        }
      default:
        return "bg-dark";
    }
  };
  const CheckVoteEligibility = async () => {
    const votedToThis = votesArr.filter((vote) => vote === message.id);
    if (votedToThis.length < 2) {
      setCanVote(true);
    } else {
      setCanVote(false);
    }
  };
  const voteHandler = async (pointId, type) => {
    try {
      const voteResponse = await apiJsonAuth.post('/discussion/points/vote', {
        pointId,
        type,
        point,
        meetingType: "declaration",
      });
      if (voteResponse.status === 200) {
        // console.log("Response Vote", voteResponse);
        reloadVote();
        handelVote();
      } else {
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const reportHandler = async () => {
    Swal.fire({
      title: 'Are You Sure ? ',
      text: 'You Want to Report this User',
      icon: 'error',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'YES',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const response = await apiJsonAuth.put('/discussion/points/report', {
            id: message?.id,
            roomId: message?.roomId,
            reportUserId: message?.userId,
          });
          // console.log(response);
          if (response?.data?.status === 200) {
            Swal.fire({ text: "Your report has been received and will be reviewed by our team. Thank you for helping us maintain a safe and respectful community." });
          } else if (response?.data?.status === 208) {
            toast.success("Report Already Submited.");
          } else {
            toast.error("Something Went Wrong!");
          }
        } catch (err) {
          console.log(err);
          toast.error("Something Went Wrong.");
        }
      }
    });
  };

  useEffect(() => {
    CheckVoteEligibility();
  },[votesArr]);

  return (
    <div className="row g-0 m-0 rounded-0 border" style={{ overflow: "hidden" }}>
      <div className="col-1">
        <div className={"h-100 text-center p-2 " + gradWiseColor(i + 1)}>
          <h1 className="text-white">{i + 1}</h1>
        </div>
      </div>
      <div className="col-11">
        <div className="message-item-container bg-white rounded-3 p-3 h-100 m-0 w-100">
          <div className="mb-2">
            <div className={`d-flex justify-content-between flex-wrap`}>
              <div className="d-flex">
                <Avatar sx={{ width: 35, height: 35 }} src={message?.profile}></Avatar>
                <div className="ps-2 lh-1">
                  <span className="text-dark d-block ">{userData.id == message?.userId ? "You" : message?.first_name}</span>
                  <small className="text-secondary"> {moment(message?.createdAt).calendar()}</small>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <small className="text-dark d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                  <img src={message?.flag} width={16} alt="flag" />
                  &nbsp;{message?.cntry}
                </small>
                &nbsp;&nbsp;
                <small className="text-dark d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                  <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 20 }} />
                  &nbsp;{message?.desig}
                </small>
                &nbsp;&nbsp;
                {/* Temporarily Deactivated Edit and Save For Students  */}
                {/* {userData.id == message?.userId && meetingData?.meeting_status === "started" ? (
                  <>
                    <Button
                      hidden={edit}
                      size="small"
                      onClick={() => {
                        setEdit(true);
                      }}
                      className="d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                      <Edit sx={{ fontSize: 16 }} />
                      <small>&nbsp;Edit</small>
                    </Button>
                    <Button
                      size="small"
                      hidden={!edit}
                      onClick={() => {
                        setEdit(false);
                        editHandler();
                      }}
                      className="d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                      <Check sx={{ fontSize: 16 }} />
                      <small>&nbsp;Save</small>
                    </Button>
                  </>
                ) : (
                  ""
                )}{" "} */}
                &nbsp;
                {userData.id != message?.userId && meetingData?.meeting_status === "started" ? (
                  <Tooltip title="Report">
                    <button className="d-inline-block p-1 px-1 border border-light bg-white shadow-sm rounded-3" onClick={reportHandler}>
                      <Report sx={{ fontSize: 17, color: '#800000' }} />
                    </button>
                  </Tooltip>
                ) : (
                  ""
                )}{" "}
                &nbsp;
              </div>
            </div>
          </div>
          <div>{edit ? <TextField className="p-0 fs-6 fst-italic" defaultValue={message?.text} onChange={(e) => setPoint(e.target.value)} multiline fullWidth /> : <p className="fs-6 lh-sm">{message?.text}</p>}</div>
          {showVote && message?.userId !== userData.id && (
            <div>
              {!canVote ? (
                <div>
                  <small className="text-success">
                    <CheckCircleOutlineTwoTone sx={{ fontSize: 18 }} /> Voted
                  </small>{' '}
                </div>
              ) : (
                <div className={`d-flex justify-content-start input-group mt-4`}>
                  {" "}
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    className="rounded-0 rounded-start py-2"
                    onClick={() => {
                      voteHandler(message?.id, "up");
                    }}>
                    <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />
                    &nbsp;&nbsp;Upvote
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    className="rounded-0 border-start-0 rounded-end px-2 py-2"
                    onClick={() => {
                      voteHandler(message?.id, "down");
                    }}>
                    <ThumbDownOffAltIcon sx={{ fontSize: 18 }} />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDeclarationItem;
