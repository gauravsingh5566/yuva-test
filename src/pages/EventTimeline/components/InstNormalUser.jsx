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
import { MyContext } from '../EventTimeline';

const InstNormalUser = () => {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const {
    userDetail,
    } = useContext(MyContext)
  const [fullDetails_Student, setFullDetails_student] = useState(0);
  const [fullDetails_teacher, setFullDetails_teacher] = useState(0);
  const [adminDetail, setadminDetail] = useState(0);
  const { role, type, id } = userData;
  const { first_name, last_name, email, institution_name, logo, institution_address, gender, instituteState, profile } = userDetail;

  const {
    first_name: fname_teacher,
    last_name: lname_teacher,
    email: email_teacher,
    institution_name: institute_name_teacher,
    profile: logo_teacher,
    institution_address: institution_addresss_teacher,
    gender: gender_teacher,
    instituteState: instituteState_teacher,
    profile: profile_teacher,
  } = userDetail;

  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = userDetail;

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ cursor: 'pointer' }}>
      {children}
    </span>
  ));

 

  const handleProfileCardClick = () => {
    if (role === 'institute') {
      navigate(`/timeline/posts/${id}`);
    } else {
      navigate(`/timeline/userProfile/${id}`);
    }
  };
 

  return (
    <div>
      {role === 'teacher' ? (
        <div onClick={handleProfileCardClick} style={{ cursor: 'pointer' }} className=" border rounded-4 ">
          <div>
            <img
              src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{
                borderTopLeftRadius: '13px',
                borderTopRightRadius: '13px',
                width: '100%',
              }}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <Avatar
              style={{
                marginTop: '-100px',
                marginLeft: '',
                border: '3px solid black',
              }}
              alt={fname_teacher}
              src={logo_teacher ? logo_teacher : null}
              sx={{ width: 130, height: 130, fontSize: '60px', textTransform: 'capitalize' }}
            />
          </div>
          <div className=" text-center d-flex align-items-center justify-content-center">
            <div className="text-Start mt-2  " style={{ width: '100%' }}>
              <h5 className="text-secondary ">{fname_teacher + ' ' + lname_teacher}</h5>
              <p
                className=""
                style={{
                  display: 'inline-block',
                  width: '90%',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  marginTop: '',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                <Email />
                {email_teacher}
              </p>
              <p
                className=" "
                style={{
                  display: 'inline-block',
                  width: '90%',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  marginTop: '',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                <School /> {institute_name_teacher}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // -------------------------for student -------------------------------------------
        <div onClick={handleProfileCardClick} style={{ cursor: 'pointer' }} className=" border rounded-4 ">
          <div>
            <img
              src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{
                borderTopLeftRadius: '13px',
                borderTopRightRadius: '13px',
                width: '100%',
              }}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <Avatar
              style={{
                marginTop: '-100px',
                marginLeft: '',
                border: '3px solid black',
              }}
              alt={first_name}
              src={profile ? profile : null}
              sx={{ width: 130, height: 130, fontSize: '60px', textTransform: 'capitalize' }}
            />
          </div>
          <div className=" text-center d-flex align-items-center justify-content-center">
            <div className="text-Start mt-2  " style={{ width: '100%' }}>
              <h5 className="text-secondary ">{first_name + ' ' + last_name}</h5>
              <p
                className=""
                style={{
                  display: 'inline-block',
                  width: '90%',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  marginTop: '',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                <Email />
                {email}
              </p>
              <p
                className=" "
                style={{
                  display: 'inline-block',
                  width: '90%',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  marginTop: '',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                <School /> {institution_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstNormalUser;
