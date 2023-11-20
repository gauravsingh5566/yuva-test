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

const InstAdminProfileCard = () => {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const {
    userDetail,
    } = useContext(MyContext)
  
  const [isLoading, setIsLoading] = useState(true);
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
    // if (role === "admin") {
    //     console.log('admin')
    //     navigate(`/timeline/posts/${id}`)
    // } else {
    navigate(`/timeline/userProfile/institute/${id}`);
    // }
  };
 

  useEffect(() => {
    setIsLoading();
  }, [userDetail]);

  return (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={handleProfileCardClick} className=" border rounded-4 ">
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
            src={admin_logo}
            sx={{
              width: 130,
              height: 130,
              fontSize: '60px',
              textTransform: 'capitalize',
            }}>
            {!admin_logo && admin_first_name && <span style={{ fontSize: '50px' }}>{admin_first_name.charAt(0).toUpperCase()}</span>}
          </Avatar>
        </div>
        {isLoading ? (
          <div style={{ height: '140px' }}>
            <span>Brow itz Loading</span>
          </div>
        ) : (
          <div className=" text-center d-flex align-items-center justify-content-center">
            <div className="text-Start mt-2  " style={{ width: '100%' }}>
              <h5 className="text-secondary ">{admin_first_name + ' ' + admin_last_name}</h5>

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
                {/* <Email /> */}
                {admin_email}
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
                <School />
                {admin_institution_name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstAdminProfileCard;
