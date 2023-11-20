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
const LatesPost = ({ post, img, isActive, onClick, index, commentCount, singleItem }) => {
  const navigate = useNavigate();
  const { userPosts, setUserPosts, setUserComment, userComment } = useContext(MyContext);
  const [isClickOnComment, setIsClickOnComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [postLike, setPostLike] = useState(0);
  const [commentCountSingle, setCommentCountSingle] = useState(10);

  const handlePostClick = () => {
    navigate(`/timeline/${post.id}`);
  };

  useEffect(() => {
    // fetchComment();
    setCommentCountSingle(userComment.length);
  }, []);

  return (
    <>
      <div className={`container change-background`} onClick={handlePostClick} style={singleItem ? { marginTop: '0' } : null}>
        <div className="header d-flex justify-content-around align-items-center margin-top10">
          <div className="post-img margin-top10" style={{ width: '28%' }}>
            <img src={img} alt="" />
          </div>

          <div className="right d-flex ">
            <div className="details">
              <div className="name">
                <span className="text-capitalize" style={{ color: 'black', fontWeight: '600' }}>
                  {post.postBy}
                </span>
              </div>
              <div className="date">
                <span className="" style={{ color: 'black' }}>
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="middle margin-top10" onClick={handlePostClick}>
          <div className="description" style={{ whiteSpace: 'nowrap' }}>
            <span style={{ color: 'black' }}> {post.content}</span>
          </div>
        </div>
        <div className="footer d-flex margin-top10" style={{ paddingBottom: '16px' }}></div>
      </div>
    </>
  );
};

export default LatesPost;
