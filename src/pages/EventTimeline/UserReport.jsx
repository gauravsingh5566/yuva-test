import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import './components/css/addpost.css';
import { Edit } from '@mui/icons-material';

import { Button, IconButton } from '@mui/joy';
import { FiberManualRecordTwoTone, Menu } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from './EventTimeline.jsx';
import { UserContext } from 'global/context';
import Activity from './components/Activity.jsx';
import CommentActivity from './components/CommentActivity.jsx';
import moment from 'moment';
import { display, textAlign } from '@xstyled/styled-components';

const UserReport = () => {
  const navigate = useNavigate();

  const { userId } = useParams();
  const { userPosts, setUserPosts, userComment, setUserComment, allComment, setAllComment, fetchAllComment, fetchAllPost, userDetail } =
    useContext(MyContext);
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role } = userData;

  const handlePostClick = (id) => {
    navigate(`/timeline/${id}`);
  };

  const img1 =
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80 386w';

  useEffect(() => {
    fetchAllComment();
    fetchAllPost();
  }, []);

  let myLikedPost = userPosts.filter((post) => post.likes.includes(id));
  let myComments = allComment.filter((comment) => comment.userId === id);
  return (
    <>
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
    </>
  );
};

export default UserReport;
