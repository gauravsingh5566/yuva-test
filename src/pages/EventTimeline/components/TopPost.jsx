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
const TopPost = ({ post, img, isActive, onClick, index, commentCount, singleItem }) => {
  const navigate = useNavigate();
  const { userPosts, setUserPosts, setUserComment, userComment } = useContext(MyContext);
  const [isClickOnComment, setIsClickOnComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [postLike, setPostLike] = useState(0);
  const [commentCountSingle, setCommentCountSingle] = useState(10);
  // const [isActiveComment, setIsActiveComment] = useState(null);

  const handleCommentClick = () => {
    setIsClickOnComment(!isClickOnComment);
    onClick(index);
    fetchComment();
  };

  // const onClickOnButton = ()=>{
  //     setIsClickOnComment(!isClickOnComment)
  // }

  const fetchComment = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${post.id}`);
      // console.log(response);
      setUserComment(response.data);
      // console.log(response.data, "this is my response data");
    } catch (error) {
      // setUserComment([])
      console.log(error);
    }
  };
  const fetchPost = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + 'timeline/get').then((response) => {
      if (userPosts.length <= 1) {
        setUserPosts(response.data);
      } else {
        const reversedPosts = response.data.reverse();
        setUserPosts(reversedPosts);
      }
    });
  };
  const updatePost = () => {
    axios
      .put(process.env.REACT_APP_API_BASE_URL + `timeline/${post.id}`, updatedPost)
      .then((response) => {
        setShowUpdateModal(false);
        fetchPost();

        console.log('successfully updated');
        // Perform any additional actions after updating the post
      })
      .catch((error) => {
        console.log('error on update');
      });
  };
  const deletePost = (postId) => {
    axios
      .delete(process.env.REACT_APP_API_BASE_URL + `timeline/${postId}`)
      .then((response) => {
        setShowDeleteModal(false);
        console.log('successfully delete');
        axios
          .get(process.env.REACT_APP_API_BASE_URL + 'timeline/get')
          .then((response) => {
            // console.log(response.data, "response");
            if (userPosts.length <= 1) {
              setUserPosts([]);
            } else {
              const reversedPosts = response.data.reverse();
              setUserPosts(reversedPosts);
            }
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
      })
      .catch((error) => {
        console.log('error on delete');
      });
  };
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
  function showFileInput() {
    var fileInput = document.getElementById('fileInput');
    fileInput.click();
  }
  const updatePostLike = () => {
    setPostLike(postLike + 1);
  };

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
                <span>Dan Walker</span>
              </div>
              <div className="date">
                <span>July 26 2018, 01:03pm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="middle margin-top10" onClick={handlePostClick}>
          <div className="description" style={{ whiteSpace: 'nowrap' }}>
            <span>{post.content}</span>
          </div>
        </div>
        {singleItem ? (
          <div className="footer d-flex margin-top10" style={{ paddingBottom: '16px' }}></div>
        ) : (
          <div className="footer d-flex margin-top10" style={{ paddingBottom: '16px' }}>
            <span onClick={updatePostLike} className="like-icon" style={{ marginRight: '21px', cursor: 'pointer' }}>
              <ThumbUpAltIcon /> {postLike}
            </span>
            <span className="comment-icon" onClick={handleCommentClick}>
              {' '}
              <Comment />
              {commentCount}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default TopPost;
