import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button, TextField } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { ArrowDownwardTwoTone, ArrowUpwardRounded, ArrowUpwardTwoTone, Check, CheckCircleOutlineTwoTone, Close, Edit, WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";
import { apiJsonAuth } from "api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useChat from "pages/discussion/useChat";

const LeaderboradItem = ({ message, i }) => {
  const [edit, setEdit] = useState(false);
  const [point, setPoint] = useState(message?.text);
  const { userData } = useGlobalContext();
  const params = useParams();
  const roomId = params?.meetingid;
  const { EditMessage } = useChat(roomId);
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
            setEdit('DELETE');
            message.text = point;
            EditMessage();
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
    <div className="border">
      <div className="row g-0">
        <div className="col-1">
          <div className={"h-100 text-center " + gradWiseColor(i + 1)}>
            <h1 className="text-white m-0">{i + 1}</h1>
          </div>
        </div>
        <div className="col-11">
          <div className="message-item-container bg-white rounded-3 p-3 h-100 m-0">
            <div className="mb-2">
              <div className={`d-flex justify-content-between flex-wrap`}>
                <div className="d-flex">
                  <Avatar sx={{ width: 45, height: 45 }} src={message?.profile}></Avatar>
                  <h6 className="text-dark d-inline-block ps-2">
                    {userData.id == message?.userId ? "You" : message?.first_name}
                    <br />
                    <small className="fw-lighter"> {moment(message?.createdAt).calendar()}</small>
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <small className="text-dark d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                    <img src={message?.flag} alt="" style={{ width: 16 }} />
                    &nbsp;{message?.cntry}
                  </small>
                  &nbsp;&nbsp;
                  <small className="text-dark  d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1">
                    <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 16 }} />
                    &nbsp;{message?.desig}
                  </small>
                  &nbsp;&nbsp;
                  <button
                    className=" d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1"
                    onClick={() => {
                      setEdit(!edit);
                      editHandler(edit);
                    }}>
                    {!edit ? (
                      <>
                        <Edit
                          sx={{ color: "blue", fontSize: 16 }}
                          onClick={() => {
                            setPoint(false);
                          }}
                        />{" "}
                        <small>&nbsp;Edit</small>
                      </>
                    ) : (
                      <>
                        <Check sx={{ color: "blue", fontSize: 16 }} />
                        &nbsp;Save
                      </>
                    )}
                  </button>
                  &nbsp;&nbsp;
                  <button className=" d-inline-flex align-items-center p-1 px-2 border bg-white rounded-1" onClick={deleteHandler}>
                    <Close sx={{ color: "red", fontSize: 16 }} />
                    <small>&nbsp;Delete</small>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <TextField
                fullWidth
                multiline
                hidden={!edit}
                defaultValue={message?.text}
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
        </div>
      </div>
    </div>
  );
};

export default LeaderboradItem;
