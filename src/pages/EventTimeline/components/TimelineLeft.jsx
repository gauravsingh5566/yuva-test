import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './css/addpost.css';
import { UserContext } from 'global/context';
import axios from 'axios';
import { Male, Female, Email, School } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import { apiAuth } from 'api';
import { useNavigate } from 'react-router-dom';
import LeftProfile from './LeftProfile';
import DirectionPage from './DirectionPage';
import NotLoggedIn from './NotLoggedIn';

const TimelineLeft = () => {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  

  return (
    <>
      <LeftProfile />
      <br />
      <br />
      {token ? <DirectionPage /> : null}
      {!token ? <NotLoggedIn /> : null}
    </>
  );
};

export default TimelineLeft;
