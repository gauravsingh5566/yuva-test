import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import socketIOClient from 'socket.io-client';
const SOCKET_SERVER_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:2100';

const CONSTANTS = {
  CONNECT: 'connection',
  DISCONNECT: 'diconnect',
  NEW_CHAT_MESSAGE_EVENT: 'newChatMessage',
  STATUS_UPDATE: 'startEvent',
  MESSAGE_UPDATE: 'messageUpdate',
  VOTE: 'vote',
};
const ROOMS = {
  LEADERS_TRACK: 'LEADERS_TRACK',
  SHERPA_TRACK: 'SHERPA_TRACK',
  FINANCE_TRACK: 'FINANCE_TRACK',
  FM_TRACK: 'FM_TRACK',
};
export const MEETOBJ = Object.freeze({
  RESOLUTION_MEETING: {
    STATUS: 'NOT_STARTED',
  },
  DECLARATION_MEETING: {
    STATUS: 'NOT_STARTED',
  },
  JOIN_DECLARATION: {
    STATUS: 'NOT_STARTED',
  },
});

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [vote, setvote] = useState(false);
  const [reload, setReload] = useState(false);
  const { token, userData } = useGlobalContext();
  const [reloader, setReloader] = useState(0);
  const socketRef = useRef();
  // Function to Fetch Messages
  const fetchMessages = async () => {
    try {
      const response = await apiJsonAuth.get(`/discussion/points?roomId=${roomId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setMessages(response?.data?.result);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token, roomId]);
  //Socket Connector
  // function SocketConnector(roomId) {
  //   socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
  //     query: { roomId },
  //   });
  //   socketRef.current.on(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, (data) => {
  //     if (data.status)
  //       fetchMessages();
  //   });
  //   socketRef.current.on(CONSTANTS.STATUS_UPDATE, (data) => {
  //     setTimeout(() => {
  //       toast?.dismiss();
  //       setReloader(Math.floor(Math.random() * 10));
  //       if (userData?.type == 0) {
  //         console.log("Running");
  //         toast.success(data?.message?.public);
  //       }
  //     }, 2000);
  //   });
  // }
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    socketRef.current.on(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, (data) => {
      if (data.status) fetchMessages();
    });
    socketRef.current.on(CONSTANTS.STATUS_UPDATE, (data) => {
      setTimeout(() => {
        toast?.dismiss();
        setReloader(Math.floor(Math.random() * 10));
        if (userData?.type == 0) {
          console.log('Running');
          toast.success(data?.message?.public);
        }
      }, 2000);
    });
    socketRef.current.on(CONSTANTS.MESSAGE_UPDATE, (message) => {
      if (message?.userId === userData?.id && message?.by === 'ADMIN') {
        toast.dismiss();
        toast?.success(`Admin ${message?.action} your Answer.`);
      }
      fetchMessages();
      setReload(Math.random(8));
    });
    socketRef.current.on(CONSTANTS.VOTE, () => {
      setvote(Math.random(8));
      fetchMessages();
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  // Event Emitter Functions
  // SendMessage
  const sendMessage = (messageBody, user) => {
    socketRef?.current?.emit(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, {
      userId: user.id,
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };
  //! Instiute Only
  //Event Status Update
  const updateEventStatus = (status) => {
    socketRef.current.emit(CONSTANTS.STATUS_UPDATE, { status });
  };

  const EditMessage = (message) => {
    socketRef.current.emit(CONSTANTS.MESSAGE_UPDATE, message);
  };

  const handelVote = () => {
    socketRef.current.emit(CONSTANTS.VOTE);
  };

  return {
    messages,
    sendMessage,
    updateEventStatus,
    reloader,
    EditMessage,
    handelVote,
    vote,
    reload,
  };
};

export default useChat;
