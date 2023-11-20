import React, { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Check, Close, Edit, WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";
import { apiJsonAuth } from "api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useChat from "pages/discussion/useChat";

const MessageItem = ({ message, i }) => {
  const [edit, setEdit] = useState(false);
  const [point, setPoint] = useState();
  const { userData } = useGlobalContext();
  const params = useParams();
  const roomId = params?.meetingid;
  const { EditMessage } = useChat(roomId);
  const reportCheck = () => {
    if (message?.report) {
      let report = Array.from(JSON.parse(message.report));
      report = report.length;
      return report;
    }
    return 0;
  };
  const editHandler = async (edit) => {
    if (edit && point) {
      try {
        const response = await apiJsonAuth.put('/discussion/points/edit', {
          id: message?.id,
          roomId: message?.roomId,
          userId: message?.userId,
          point,
        });
        // console.log(response);
        if (response?.data?.status === 200) {
          EditMessage({
            userId: message?.userId,
            by: "ADMIN",
            action: "UPDATE",
          });
          setPoint();
          toast.success("Updated.");
        } else {
          toast.error("Something Went Wrong!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong.");
      }
    }
  };
  const deleteHandler = async () => {
    Swal.fire({
      title: 'Are You Sure ? ',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes Delete It.',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const response = await apiJsonAuth.put('/discussion/points/delete', {
            id: message?.id,
            roomId: message?.roomId,
            userId: message?.userId,
          });
          // console.log(response);
          if (response?.data?.status === 200) {
            message.text = point;
            EditMessage({
              userId: message?.userId,
              by: "ADMIN",
              action: "DELETE",
            });
            toast.success("Deleted.");
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

  return (
    <div className="message-item-container border-bottom rounded-0 p-3 mt-0">
      <div className="mb-2">
        <div hidden={reportCheck() <= 5}>
          <div className="alert d-flex p-1 lh-1 px-2 alert-warning" role="alert">
            <div className="fs-5 mx-2">&#x26A0;</div>{' '}
            <small>This message has been reported by {reportCheck()} students for containing inappropriate language.</small>
          </div>
        </div>
        <div className={`d-flex justify-content-between flex-wrap`}>
          <div className="d-flex align-items-start">
            <Avatar sx={{ width: 35, height: 35 }} src={message?.profile}></Avatar>
            <div className="ps-2 lh-sm">
              <div className="text-dark">{userData.id == message?.userId ? "You" : message?.first_name}</div>
              <div>
                <small className="text-secondary"> {moment(message?.createdAt).calendar()}</small>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <small className="text-dark d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
              <img src={message?.flag} alt="flag" style={{ width: 16 }} /> &nbsp;{message?.cntry}
            </small>
            &nbsp;&nbsp;
            <small className="text-dark d-inline-flex align-items-center  p-1 no-wrap px-2 border bg-white rounded-1">
              <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 16 }} />
              &nbsp;{message?.desig}
            </small>
            &nbsp;&nbsp;
            <button
              className="d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1"
              onClick={() => {
                setEdit(!edit);
                editHandler(edit);
              }}>
              {!edit ? (
                <>
                  <Edit
                    sx={{ color: "blue", fontSize: 16 }}
                    onClick={() => {
                      setPoint(message?.text);
                    }}
                  />{" "}
                  <small>&nbsp;Edit</small>
                </>
              ) : (
                <>
                  <Check sx={{ color: "blue", fontSize: 16 }} />
                  <small>&nbsp;Save</small>
                </>
              )}
            </button>
            &nbsp;&nbsp;
            <button className="d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1" onClick={deleteHandler}>
              <small>
                <Close sx={{ color: "red", fontSize: 16 }} />
                &nbsp;Delete
              </small>
            </button>
          </div>
        </div>
      </div>
      <div>
        <TextField
          fullWidth
          multiline
          hidden={!edit}
          value={point ?? message?.text}
          onChange={(e) => {
            setPoint(e.target.value);
          }}
        />
        <p className="fs-6" hidden={edit}>
          {message?.text}
        </p>
      </div>
      <div className="d-flex">
        <div className="d-flex align-items-center text-success  pe-2 border-end border-2 me-2">
          <ThumbUpOffAltIcon />
          <span className="fw-semibold ms-1">{message?.upvote}</span>
        </div>
        <div className="d-flex align-items-center text-danger">
          <ThumbDownOffAltIcon />
          <span className="fw-semibold ms-1">{message?.downvote}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
