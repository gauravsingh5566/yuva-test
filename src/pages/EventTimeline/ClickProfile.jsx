import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import './css/addpost.css'
import axios from 'axios';
import { Male, Female, Email, School } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import { apiAuth } from 'api';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import InstitutePosts from './InstitutePosts';

import UserReport from './UserReport';
import { fontSize } from '@xstyled/styled-components';
import { useLocation, useParams } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import './components/css/addpost.css';
import { Edit } from '@mui/icons-material';

import { Button, IconButton } from '@mui/joy';
import { FiberManualRecordTwoTone, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './EventTimeline.jsx';
import { UserContext } from 'global/context';
import Activity from './components/Activity.jsx';
import CommentActivity from './components/CommentActivity.jsx';
import moment from 'moment';
import PostCenter from './components/PostCenter';

const ClickProfile = () => {
  const location = useLocation();
  const isInstitute = location.pathname.startsWith(`/timeline/userProfile/institute`);
  console.log("this is true or false ", isInstitute)
  const { userId } = useParams();
  const { instituteId } = useParams();
  const idToUse = isInstitute ? instituteId : userId;

  const navigate = useNavigate();
  const { userData, token } = useContext(UserContext);
  const [fullDetails_Student, setFullDetails_student] = useState(0);
  const [fullDetails_teacher, setFullDetails_teacher] = useState(0);
  const [adminDetail, setadminDetail] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);

  const { type, id } = userData;

  const { userPosts, setUserPosts, userComment, setUserComment, allComment, setAllComment, fetchAllComment, fetchAllPost, userDetail } =
    useContext(MyContext);

  const handleChildClick = (index) => {
    if (activeChildIndex === index) {
      setActiveChildIndex(null);
    } else {
      setActiveChildIndex(index);
    }
  };
  const {
    first_name,
    last_name,
    email,
    institution_name,
    logo,
    // institution_address,
    gender,
    instituteState,
    profile,
  } = userDetail;

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
    role: role,
  } = fullDetails_teacher;

  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
    institution_address: institution_address,
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
        instituteId: idToUse,
      })
      .then((response) => setadminDetail(response.data));
  };
  const fetchTeacherDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getTeacherDetail/', {
        teacherId: idToUse,
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
  const handlePostClick = (id) => {
    navigate(`/timeline/${id}`);
  };
  const handleProfileCardClick = () => {
    if (role === 'admin') {
      navigate(`/timeline/posts/${id}`);
    } else {
      navigate(`/timeline/userProfile/${id}`);
    }
  };
  useEffect(() => {
    fetchAdminDetails();
    fetchTeacherDetails();
    fetchAllComment();
    fetchAllPost();
  }, []);

  useEffect(() => {
    fetchAdminDetails();
    fetchTeacherDetails();
    fetchAllComment();
    fetchAllPost();
  }, [idToUse]);

  let myLikedPost = userPosts.filter((post) => post.likes.includes(Number(idToUse)));
  let myComments = allComment.filter((comment) => comment.userId == idToUse);

  return (
    <>
      <div className="container mt-4">
        <div className=" ">
          <div className="rounded-4 shadow mb-4 pb-4" style={{ width: '100%' }}>
            <div className="col ">
              <div
                className="row"
                style={{
                  height: '25vh',
                  backgroundImage:
                    'url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                  width: '100%',
                  marginLeft: '1px',
                }}></div>
              {/* changes from haere */}
              {
                // for admin
                isInstitute ? (
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: '-100px',
                        marginLeft: '18px',
                        border: '5px solid white',
                        fontSize: '60px',
                        textTransform: 'capitalize',
                      }}
                      alt={admin_first_name}
                      src={admin_logo}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                ) : // for student
                role === 'student' && token ? (
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: '-100px',
                        marginLeft: '18px',
                        border: '5px solid white',
                        fontSize: '60px',
                        textTransform: 'capitalize',
                      }}
                      alt={first_name}
                      src={profile_teacher}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                ) : (
                  // for Teacher
                  <div className="container d-flex flex-wrap justify-content-between align-items-end">
                    <Avatar
                      style={{
                        marginTop: '-100px',
                        marginLeft: '18px',
                        border: '5px solid white',
                        fontSize: '60px',
                        textTransform: 'capitalize',
                      }}
                      alt={fname_teacher}
                      src={profile_teacher}
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                )
              }
              {/* end here */}

              <div className="p-4">
                <div className="media-body mb-3">
                  {/* change here */}
                  {isInstitute ? (
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{admin_first_name + ' ' + admin_last_name}</h3>
                      <Button
                        style={{
                          height: '0',
                          marginLeft: '12px',
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Admin
                      </Button>
                    </div>
                  ) : // for Student
                  role === 'student' ? (
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{fname_teacher + ' ' + lname_teacher}</h3>
                      <Button
                        style={{
                          height: '0',
                          marginLeft: '12px',
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Student
                      </Button>
                    </div>
                  ) : (
                    // for Teacher
                    <div className="d-flex flex-wrap">
                      <h3 className="fw-bold mr-3">{fname_teacher + ' ' + lname_teacher}</h3>
                      <Button
                        style={{
                          height: '0',
                          marginLeft: '12px',
                        }}
                        color="danger"
                        onClick={function () {}}
                        size="sm"
                        variant="solid">
                        Teacher
                      </Button>
                    </div>
                  )}

                  {/* change here */}

                  {isInstitute ? (
                    <>
                      {' '}
                      <p className="text-capitalize">
                        <i class="bi bi-map-fill mr-2 text-info "></i>
                        {institution_address ? institution_address : 'India'}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: '15px', height: '15px', marginTop: '' }} />
                          &nbsp;{admin_email}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: '10px', marginRight: '10px' }} />
                          <WorkIcon sx={{ width: '15px', height: '15px', marginTop: '-2px' }} /> {admin_institution_name}
                        </li>
                      </ul>
                    </>
                  ) : role === 'student' ? (
                    <>
                      {' '}
                      <p>
                        <i class="bi bi-map-fill mr-2 text-info"></i>
                        {institution_addresss_teacher ? institution_addresss_teacher : 'India'}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: '15px', height: '15px', marginTop: '' }} />
                          &nbsp;{email_teacher}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: '10px', marginRight: '10px' }} />
                          <WorkIcon sx={{ width: '15px', height: '15px', marginTop: '-2px' }} /> {institute_name_teacher}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      {' '}
                      <p>
                        <i class="bi bi-map-fill mr-2 text-info"></i>
                        {institution_addresss_teacher ? institution_addresss_teacher : 'India'}
                      </p>
                      <ul>
                        <li className="meta-privacy d-inline-block  mr-2">
                          <EmailIcon sx={{ width: '15px', height: '15px', marginTop: '' }} />
                          &nbsp;{email_teacher}
                        </li>
                        <li className="meta-privacy d-inline-block fw-bold mr-2">
                          <FiberManualRecordTwoTone color="secondary" sx={{ fontSize: '10px', marginRight: '10px' }} />
                          <WorkIcon sx={{ width: '15px', height: '15px', marginTop: '-2px' }} /> {institute_name_teacher}
                        </li>
                      </ul>
                    </>
                  )}
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
          <br />
          <h4 style={{ display: 'inline' }}>Get back to Timeline</h4> &nbsp;&nbsp;{' '}
          <Button
            color="success"
            onClick={function () {
              navigate('/timeline/');
            }}
            size="sm"
            variant="solid">
            Timeline
          </Button>
          <br />
          <br />
          {/* activity start  */}
          <div className="rounded-4  shadow p-5 mb-4">
            <h4>Activities</h4>
            <div className="row p-3">
              {myLikedPost.length > 0 ? (
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div>
                    <div
                      className="rounded-4 shadow p-2"
                      style={{
                        minHeight: '373px',
                      }}>
                      <h5 className="p-2" style={{ textAlign: 'center' }}>
                        Liked Posts
                      </h5>
                      <div className="d-flex">
                        <div
                          className=" d-flex flex-column justify-content-center rounded-4 p-3 mb-3 changeScrollBar"
                          style={{
                            maxHeight: '296px',
                            overflow: 'scroll',
                            width: '100%',
                          }}>
                          {myLikedPost.length > 0 ? (
                            myLikedPost.map((post, index) => {
                              return (
                                <div
                                  onClick={() => handlePostClick(post.id)}
                                  key={index}
                                  className=" d-flex justify-content-between p-2"
                                  style={{
                                    border: '1px solid #00000012',
                                    borderRadius: '12px',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.2s',
                                    boxShadow: 'none',
                                  }}
                                  onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 36px rgba(0, 0, 0, 0.5)';
                                  }}
                                  onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}>
                                  <div className="d-flex align-items-center overflow-hidden text-nowrap">
                                    <Avatar alt={post.postBy} src={post.image} className="mr-2" />
                                    <div
                                      style={{
                                        marginLeft: '12px',
                                      }}>
                                      <h6 style={{ userSelect: 'none' }}>{post.postBy}</h6>
                                      <p style={{ userSelect: 'none' }} className=" overflow-hidden text-nowrap">
                                        {post.content}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h6 style={{ userSelect: 'none' }} className="fs-12 text-secondary text-nowrap mb-2">
                                      {moment(post.createdAt).fromNow()}
                                    </h6>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}></div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <span style={{ fontSize: '30px', textAlign: 'center' }}>0</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {myComments.length > 0 ? (
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div>
                    {' '}
                    <div
                      className="rounded-4 shadow p-2"
                      style={{
                        minHeight: '373px',
                      }}>
                      <h5 className="p-2" style={{ textAlign: 'center' }}>
                        Your Comments
                      </h5>
                      <div>
                        <div
                          className=" rounded-4 p-3 mb-3 changeScrollBar"
                          style={{
                            maxHeight: '296px',
                            overflow: 'scroll',
                            width: '100%',
                          }}>
                          {myComments.length > 0 ? (
                            myComments.map((comment, index) => {
                              return (
                                <div
                                  key={index}
                                  onClick={() => handlePostClick(comment.postId)}
                                  className=" d-flex justify-content-between p-2"
                                  style={{
                                    border: '1px solid #00000012',
                                    borderRadius: '12px',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.2s',
                                    boxShadow: 'none',
                                  }}
                                  onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 36px rgba(0, 0, 0, 0.5)';
                                  }}
                                  onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}>
                                  <div className="d-flex align-items-center overflow-hidden text-nowrap">
                                    <Avatar alt={comment.commentBy} src="image.png" className="mr-2" />
                                    <div
                                      style={{
                                        marginLeft: '12px',
                                      }}>
                                      <h6 style={{ userSelect: 'none' }}>{comment.commentBy}</h6>
                                      <p style={{ userSelect: 'none' }} className=" overflow-hidden text-nowrap">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h6 style={{ userSelect: 'none' }} className="fs-12 text-secondary text-nowrap mb-2">
                                      {moment(comment.createdAt).fromNow()}
                                    </h6>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}></div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <span
                              style={{
                                fontSize: '30px',
                                textAlign: 'center',
                                display: 'block',
                              }}>
                              0
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {myLikedPost.length == 0 && myComments.length == 0 ? (
                <span
                  style={{
                    fontSize: '21px',
                  }}>
                  No activity to show
                </span>
              ) : null}
            </div>
          </div>
          {/* activity end here  */}
          {/*post start here  */}
          {isInstitute ? (
            <div>
              {userPosts.filter((post) => post.instituteId == idToUse).length > 0 ? (
                <span className="institute-posts-header">
                  All Posts from{' '}
                  <span className="institute-posts-header-name font-bold text-capitalize">
                    {userPosts.find((post) => post.instituteId == idToUse).postBy}
                  </span>
                </span>
              ) : (
                <h1>No Post To show</h1>
              )}

              {userPosts.map((post, index) => {
                if (post.instituteId != idToUse) {
                  return null;
                } else {
                  return <PostCenter key={index} post={post} index={index} isActive={activeChildIndex === index} onClick={handleChildClick} />;
                }
              })}
            </div>
          ) : null}
          {/*post end here  */}
        </div>
      </div>
    </>
  );
};

export default ClickProfile;
