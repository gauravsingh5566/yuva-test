import React, { useState, useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from 'global/context';
import PostComponent from './PostComponent';
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
import moment from 'moment';

function RecentPost(post, img, isActive, onClick, index, commentCount, singleItem) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userPosts, setUserPosts, userComment, setUserComment } = useContext(MyContext);
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const isSinglePost = location.pathname.startsWith(`/timeline/${id}`);
  // const isProfilePage = location.pathname.startsWith(`/timeline/userProfile`)
  const [latestPost, setLatestPost] = useState(null);
  const [topPost, settopPost] = useState(null);
  const [allInstitute, setallInstitute] = useState(null);

  const settingPost = () => {
    const latestPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setLatestPost(latestPosts.slice(0, 3));
  };

  useEffect(() => {
    settingPost();
  }, [userPosts]);

  useEffect(() => {}, [latestPost]);
  return (
    <div>
      <div className="border rounded-4 p-3 mb-3">
        <h4 className="border-bottom mb-3">Recent Post</h4>
        {latestPost
          ? latestPost.map((post, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/timeline/${post.id}`);
                  }}
                  className="d-flex border-bottom justify-content-between"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                  {post.image ? (
                    <img src={post.image ? post.image : null} alt="" style={{ width: '60px', height: '60px', borderRadius: '3px' }} />
                  ) : null}
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="p-1">
                    <h6 style={{ fontSize: '15px', marginTop: '' }}>{post.postBy}</h6>
                    <span style={{ fontSize: '15px', marginTop: '-3px', overflow: 'hidden' }}>{post.content}</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default RecentPost;
