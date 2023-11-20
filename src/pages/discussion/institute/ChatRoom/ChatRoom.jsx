import React, { useEffect, useRef, useState } from 'react';

import '../../ChatRoom.css';
import useChat from '../../useChat';
import { Avatar, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { SendTwoTone } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';
import MessageItem from './MessageItem';
import { apiJsonAuth } from 'api';

const ChatRoom = ({ roomId }) => {
  const { userData, token } = useGlobalContext();
  const chatDiv = useRef();
  const { messages, SocketConnector } = useChat(roomId);
  // console.log("Points ========", token)
  const scrollDown = () => {
    chatDiv.current.scrollTo(0, chatDiv.current.scrollHeight);
  };
  useEffect(() => {
    scrollDown();
  }, [messages]);
  useEffect(() => {
    if (roomId !== '') {
      SocketConnector(roomId);
    }
  }, [roomId]);
  return (
    <div className="chat-room-container rounded-4 border">
      <div className="messages-container rounded-0 p-2 p-lg-3 bg-white" ref={chatDiv}>
        <ol className="messages-list p-0">
          {messages?.map((point, i) => (
            <MessageItem const={userData} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ChatRoom;
