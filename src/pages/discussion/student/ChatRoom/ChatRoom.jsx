import React, { useEffect, useRef, useState } from 'react';

import "../../ChatRoom.css";
import useChat from "../../useChat";
import { Avatar, Button, IconButton, InputAdornment, Modal, TextField, Typography, Box } from "@mui/material";
import { SendTwoTone } from "@mui/icons-material";
import { useGlobalContext } from "global/context";
import MessageItem from "./MessageItem";
import { apiJsonAuth } from "api";
import { useParams } from "react-router-dom";
import NotFoundGif from "layout/NotFoundGif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1,
  transform: "translate(-50%, -50%)",
  minWidth: "75vw",
  bgcolor: "background.paper",
  border: "1px solid lightgrey",
  boxShadow: 24,
  p: 3,
};

const ChatRoom = ({ open, setOpen, showVote, meetingData, fetchMeetings }) => {
  const { userData, token } = useGlobalContext();
  const [pointCount, setPointCount] = useState(0);
  const chatDiv = useRef();
  const params = useParams();
  const roomId = params?.meetingid;
  const { messages, sendMessage, vote } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('');
  const [votesArr, setVotesArr] = useState([]);
  const handleClose = () => setOpen(false);
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage, userData);
    setNewMessage("");
    handleClose();
  };
  useEffect(() => {
    let temp = messages.filter((msg) => msg?.userId === userData?.id);
    // console.log(temp.length);
    setPointCount(temp.length);
  }, [messages]);
  const scrollDown = () => {
    chatDiv.current.scrollTo(0, chatDiv.current.scrollHeight);
  };
  const fetchVotes = async () => {
    const response = await apiJsonAuth.get('/discussion/points/vote', {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      setVotesArr(response.data.result);
    }
  };
  useEffect(() => {
    fetchVotes();
  }, [vote]);
  useEffect(() => {
    scrollDown();
  }, [messages]);
  return (
    <div className="chat-room-container">
      <div className="messages-container" ref={chatDiv}>
        {Boolean(messages?.length) ? (
          <ol className="messages-list">
            {messages?.map((point, i) => (
              <MessageItem meetingData={meetingData} fetchMeetings={fetchMeetings} reloadVote={fetchVotes} voted={votesArr.includes(point?.id)} message={point} key={i} i={i} showVote={showVote} />
            ))}
          </ol>
        ) : (
          <NotFoundGif image={"http://glcloud.in/uploads/Yuvamanthan/64df7ec2f0eb2.png"} text={"No Points Given"} />
        )}
      </div>
      {/* Answer Modal  */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} maxWidth="lg">
          <div className="mb-2">
            <h6>Note:</h6>
            <ol className="ps-0">
              <li>1. You Can Add Total 4 points to the Discussion.</li>
              <li>2. Each Point will be voted by other members of track and leaders track.</li>
            </ol>
          </div>
          <hr />
          <h6 className="fs-6">Write your suggested point {String(pointCount + 1) + "/4"}</h6>
          <TextField value={newMessage} fullWidth multiline rows={8} size="small" onChange={handleNewMessageChange} placeholder="Click to write..." className="new-message-input-field pe-0 bg-light" />
          <button className="border btn btn-primary mt-3 text-capitalize rounded-0 fw-semibold" onClick={handleSendMessage}>
            Add point to Discussion
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ChatRoom;
