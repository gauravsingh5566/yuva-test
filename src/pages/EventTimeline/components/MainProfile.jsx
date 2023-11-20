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

const MainProfile = () => {
  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const [fullDetails_Student, setFullDetails_student] = useState(0);
  const [fullDetails_teacher, setFullDetails_teacher] = useState(0);
  const [adminDetail, setadminDetail] = useState(0);
  const { role, type, id } = userData;
  const { first_name, last_name, email, institution_name, logo, institution_address, gender, instituteState, profile } = fullDetails_Student;

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
  } = fullDetails_teacher;

  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = adminDetail;

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

  const fetchAdminDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getInstituteDetail/', {
        instituteId: id,
      })
      .then((response) => setadminDetail(response.data));
  };
  const fetchTeacherDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getTeacherDetail/', {
        teacherId: id,
      })
      .then((response) => setFullDetails_teacher(response.data));
  };

  const fetchStudentDetails = async () => {
    try {
      const res = await apiAuth.get(process.env.REACT_APP_API_BASE_URL + 'student/detail', {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        setFullDetails_student(res.data.result[0]);
      }
    } catch (error) {}
  };

  const handleProfileCardClick = () => {
    if (role === 'admin') {
      navigate(`/timeline/posts/${id}`);
    } else {
      navigate(`/timeline/userProfile/${id}`);
    }
  };
  useEffect(() => {
    if (role == 'admin' && type == 1 && token) {
      fetchAdminDetails();
    } else if (role == 'student' && token) {
      fetchStudentDetails();
    } else if (role == 'teacher' && token) {
      fetchTeacherDetails();
    }
  }, []);

  return (
    <>
      {role === 'admin' && type === 1 ? (
        <div onClick={handleProfileCardClick} className="profile-card-left">
          <div className="profile-card-cover-photo ">
            <img src={admin_logo ? admin_logo : 'https://i.imgur.com/KykRUCV.jpeg'} className="userprofile-card-profile " />
            <span className="with-badge-admin with-badge-admin-userProfile">Admin</span>
          </div>
          <div className="userProfileContainer d-flex flex-column justify-content-start " style={{ textAlign: 'left' }}>
            <h3 className="profile-card-name profile-card-name-userProfile text-capitalize">{admin_first_name + ' ' + admin_last_name}</h3>

            <span
              className="d-block mb-1  profile-card-span-userProfile d-flex justify-content-center align-items-center text-capitalize"
              style={{ color: 'black' }}>
              <Email />
              {admin_email}
            </span>
            <span
              className="d-block mb-1  profile-card-span-userProfile text-capitalize d-flex justify-content-center align-items-center"
              style={{ color: 'black' }}>
              <School /> {admin_institution_name}
            </span>
          </div>
        </div>
      ) : role === 'student' ? (
        <div onClick={handleProfileCardClick} className="profile-card-left">
          <div className="profile-card-cover-photo ">
            <img src="https://i.imgur.com/KykRUCV.jpeg" className="profile-card-profile userprofile-card-profile " />
            <span className="with-badge-student with-badge-student-userProfile">Student</span>
          </div>
          <div className="userProfileContainer d-flex flex-column justify-content-start " style={{ textAlign: 'left' }}>
            <h3 className="profile-card-name profile-card-name-userProfile text-capitalize">{first_name + ' ' + last_name}</h3>

            <span
              className="d-block mb-1  profile-card-span-userProfile d-flex justify-content-center align-items-center text-capitalize"
              style={{ color: 'black' }}>
              <Person /> {gender}
            </span>
            <span
              className="d-block mb-1  profile-card-span-userProfile d-flex justify-content-center align-items-center text-capitalize"
              style={{ color: 'black' }}>
              <Email />
              {email}
            </span>
            <span
              className="d-block mb-1  profile-card-span-userProfile text-capitalize d-flex justify-content-center align-items-center"
              style={{ color: 'black' }}>
              <School /> {institution_name}
            </span>
          </div>
        </div>
      ) : role === 'teacher' ? (
        <div onClick={handleProfileCardClick} className="profile-card-left">
          <div className="profile-card-cover-photo ">
            <img src={'https://i.imgur.com/KykRUCV.jpeg'} className="profile-card-profile userprofile-card-profile " />
            <span className="with-badge-student with-badge-student-userProfile ">Teacher</span>
          </div>
          <div className="userProfileContainer d-flex flex-column justify-content-start " style={{ textAlign: 'left' }}>
            <h3 className="profile-card-name profile-card-name-userProfile text-capitalize">{fname_teacher + ' ' + lname_teacher}</h3>

            <span className="d-block mb-1  profile-card-span-userProfile   text-capitalize" style={{ color: 'black' }}>
              <Person /> {gender_teacher}
            </span>
            <span
              className="d-block mb-1 profile-card-span-userProfile  justify-content-center align-items-center text-capitalize"
              style={{ color: 'black' }}>
              <Email />
              {email_teacher}
            </span>
            <span
              className="d-block mb-1  profile-card-span-userProfile text-capitalize  justify-content-center align-items-center"
              style={{ color: 'black' }}>
              <School /> {institute_name_teacher}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MainProfile;
