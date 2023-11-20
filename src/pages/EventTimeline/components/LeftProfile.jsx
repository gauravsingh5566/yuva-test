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
// import LeftProfile from './LeftProfile';
import Avatar from '@mui/joy/Avatar';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import InstAdminProfileCard from './InstAdminProfileCard';
import InstNormalUser from './InstNormalUser';

function LeftProfile() {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const { role, type, id } = userData;

  return <>{role === 'institute' && token ? <InstAdminProfileCard /> : token ? <InstNormalUser /> : null}</>;
}

export default LeftProfile;
