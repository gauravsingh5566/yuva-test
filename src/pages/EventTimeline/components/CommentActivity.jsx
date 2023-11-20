import React, { useContext, useEffect, useState } from 'react';
import { Comment } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comments from './Comment';
import './css/addpost.css';
import { marginRight } from '@xstyled/styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CommentActivity = ({ comment, img, singleItem }) => {
  const navigate = useNavigate();
  const { userPosts, setUserPosts, setUserComment, userComment } = useContext(MyContext);
  const handlePostClick = () => {
    navigate(`/timeline/${comment.postId}`);
  };
  let Post = userPosts.find((post) => post.id === comment.postId);
  useEffect(() => {
    // fetchComment();
  }, []);
  return (
    <>
      <div className={`user-report-likes-container`} onClick={handlePostClick} style={singleItem ? { marginTop: '0' } : null}>
        <div className="header user-report-likes-header d-flex justify-content-between align-items-center margin-top10">
          <div className="post-img margin-top10" style={{ width: '28%' }}>
            <img src={img} alt="" />
          </div>

          <div className="right d-flex ">
            <div className="details">
              <div className="name">
                <span className="text-capitalize" style={{ color: 'black', fontWeight: '600' }}>
                  {Post.postBy}
                </span>
              </div>
              <div className="date">
                <span className="" style={{ color: 'black' }}>
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="middle d-flex justify-content-between margin-top10"
          style={{ paddingBottom: '30px', paddingRight: '17px' }}
          onClick={handlePostClick}>
          <div></div>
          <div className="description" style={{ whiteSpace: 'nowrap', maxWidth: '70%' }}>
            <span style={{ color: 'black' }}> {comment.content}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentActivity;
