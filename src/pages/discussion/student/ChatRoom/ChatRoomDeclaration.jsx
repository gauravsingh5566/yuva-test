import React, { useEffect, useRef, useState } from 'react';

import '../../ChatRoom.css';
import useChat from '../../useChat';
import { Avatar, Button, IconButton, InputAdornment, Modal, TextField, Typography, Box } from '@mui/material';
import { SendTwoTone } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';
import MessageItem from './MessageItem';
import { apiJsonAuth } from 'api';
import { useParams } from 'react-router-dom';
import StudentDeclarationItem from '../StudentDeclarationItem';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: 5,
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '1px solid lightgrey',
  boxShadow: 24,
  p: 4,
};

const ChatRoomDeclaration = ({ open, setOpen, showVote, studentData, meetingData }) => {
  const { userData, token } = useGlobalContext();
  const chatDiv = useRef();
  const params = useParams();
  const roomId = params?.meetingid;
  const { messages, sendMessage, reload, vote } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('');
  const [votesArr, setVotesArr] = useState([]);
  const handleClose = () => setOpen(false);
  const [DeclarationPointsData, setDeclarationPointsData] = useState([]);
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage, userData);
    setNewMessage('');
    handleClose();
  };
  const fetchVotes = async () => {
    const response = await apiJsonAuth.get('/discussion/points/vote', {
      headers: {
        Authorization: token,
      },
    });
    // console.log("VOTES--=->", response?.data?.result);
    if (response.status === 200) {
      setVotesArr(response?.data?.result);
    }
  };

  // console.log("StudentData", studentData?.instituteId,params?.meetingid)

  const fetchLeaderBoard = async () => {
    if (params?.meetingid && studentData?.instituteId) {
      try {
        const response = await apiJsonAuth.post(
          `/discussion/declaration/leaderboard`,
          {
            roomId: params?.meetingid,
            institutueId: studentData?.instituteId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          // console.log(response?.data?.result)
          setDeclarationPointsData(response?.data?.result);
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    fetchVotes();
    fetchLeaderBoard();
  }, [params, token, params?.meetingid, studentData, reload, vote]);

  return (
    <div className="chat-room-container">
      <div className="messages-container" ref={chatDiv}>
        <ol className="messages-list">
          {DeclarationPointsData?.map((point, i) => (
            <StudentDeclarationItem
              key={i}
              reloadVote={fetchVotes}
              meetingData={meetingData}
              userData={userData}
              votesArr={votesArr}
              studentData={studentData}
              message={point}
              i={i}
              showVote={showVote}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ChatRoomDeclaration;
