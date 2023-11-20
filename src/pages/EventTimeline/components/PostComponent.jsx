import React, { useContext, useEffect, useState } from 'react';
import { Comment } from '@mui/icons-material';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comments from './Comment';
import './css/addpost.css';
import { border, marginRight } from '@xstyled/styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'global/context';

const PostComponent = ({ post, img, isActive, onClick, index, singleItem, render }) => {
  const navigate = useNavigate();
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role, institution_name } = userData;
  const { userPosts, setUserPosts, setUserComment, userComment, userDetail } = useContext(MyContext);

  const [adminDetail, setadminDetail] = useState(0);
  const [isClickOnComment, setIsClickOnComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [postLike, setPostLike] = useState(0);
  const [commentCountSingle, setCommentCountSingle] = useState(10);
  const [isLike, setIslike] = useState(false);
  // const [isActiveComment, setIsActiveComment] = useState(null);

  const fetchAdminDetails = () => {
    console.log('fetching admin');
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getInstituteDetail/', {
        instituteId: id,
      })
      .then((response) => setadminDetail(response.data));
  };

  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = adminDetail;
  const handleCommentClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      setIsClickOnComment(!isClickOnComment);
      onClick(index);
      fetchComment();
    }
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
    }
  };
  const fetchPost = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + 'timeline/get').then((response) => {
      setUserPosts(response.data);
    });
  };
  const updatePost = () => {
    if (role === 'admin' && post.instituteId === id) {
      axios
        .put(process.env.REACT_APP_API_BASE_URL + `timeline/${post.id}`, updatedPost)
        .then((response) => {
          setShowUpdateModal(false);
          fetchPost();

          // Perform any additional actions after updating the post
        })
        .catch((error) => {});
    } else {
    }
  };
  const deletePost = (postId) => {
    if (role === 'admin' && post.instituteId === id) {
      axios
        .delete(process.env.REACT_APP_API_BASE_URL + `timeline/${postId}`)
        .then((response) => {
          setShowDeleteModal(false);
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
            .catch((error) => {});
        })
        .catch((error) => {});
    } else {
    }
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
    if (!token) {
      navigate('/login');
    } else {
      const userId = id;
      axios.put(process.env.REACT_APP_API_BASE_URL + `timeline/postlike/${post.id}`, { userId }).then((response) => {
        fetchPost();
        setPostLike(response.data.post.likes.length);
        if (render) {
          render();
        }
      });
    }
  };

  const handlePostClick = () => {
    navigate(`/timeline/${post.id}`);
  };

  useEffect(() => {
    if (role == 'admin' && type == 1 && token) {
      // fetchAdminDetails();
    }
  }, []);

  useEffect(() => {
    // fetchPost();
    // fetchComment();
    // setCommentCountSingle(userComment.length)
  }, [post.id]);

  return (
    <>
      <div
        className={`container change-background`}
        style={singleItem ? { marginTop: '0', border: '1px solid rgb(0 0 0 / 30%)' } : { border: '1px solid rgb(0 0 0 / 30%)' }}>
        <div className="header d-flex justify-content-between margin-top10">
          <div className="right d-flex ">
            <div className="img mr-2" style={{ marginRight: '12px' }}>
              <img src={post.logo ? post.logo : img} alt="" />
            </div>
            <div className="details">
              <div className="name">
                <span className="text-capitalize" style={{ color: 'black', fontWeight: '600' }}>
                  {post.postBy}
                </span>
              </div>
              <div className="date">
                <span style={{ color: 'black' }}>{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          <div className="left">
            {type === 1 && role === 'admin' && post.instituteId === id ? (
              <Dropdown align="start">
                <Dropdown.Toggle as={CustomToggle}>
                  <MoreVertIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    transform: 'translate(-167px, 1px)',
                  }}
                  className="dropdown-menu-left dropdown-menu-custom-class">
                  <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete Post</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowUpdateModal(true)}>Update Post</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
        </div>
        <div className="middle margin-top10" onClick={handlePostClick}>
          <div className="description" style={singleItem ? null : { whiteSpace: 'nowrap' }}>
            <span style={{ color: 'black' }}>{post.content}</span>
          </div>
          <div className="post-img margin-top10">
            <img src={post.image ? post.image : null} alt="" />
          </div>
        </div>
        {singleItem ? (
          <div className="footer d-flex margin-top10" style={{ paddingBottom: '16px' }}>
            <span onClick={updatePostLike} className="like-icon" style={{ marginRight: '21px', cursor: 'pointer' }}>
              <ThumbUpAltIcon /> {post.likes?.length}
            </span>
            <span className="comment-icon" onClick={handleCommentClick}>
              {' '}
              <Comment />
              {post.commentsCount}
            </span>
          </div>
        ) : (
          <div className="footer d-flex margin-top10" style={{ paddingBottom: '16px' }}>
            <span onClick={updatePostLike} className="like-icon" style={{ marginRight: '21px', cursor: 'pointer' }}>
              <ThumbUpAltIcon /> {post.likes.length}
            </span>
            <span className="comment-icon" onClick={handleCommentClick}>
              {' '}
              <Comment />
              {post.commentsCount}
            </span>
          </div>
        )}
      </div>
      {singleItem ? (
        isClickOnComment ? (
          <Comments fetchPost={render} post={post} singleItem={true} postId={post.id} />
        ) : null
      ) : isActive ? (
        <Comments fetchPost={fetchPost} post={post} postId={post.id} />
      ) : null}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="middle d-flex flex-row align-items-center pl-2" style={{ paddingLeft: '12px' }}>
            <div className="left">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                style={{
                  height: '66px',
                  width: '66px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div className="right" style={{ marginLeft: '12px', width: '100%' }}>
              <input
                type="text"
                placeholder="Write Something about you"
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '94%',
                }}
                value={updatedPost.content}
                onChange={(event) =>
                  setUpdatedPost({
                    ...updatedPost,
                    content: event.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="lower d-flex " style={{ padding: '31px 0 12px 0' }}>
            <div className="media button" style={{ marginRight: '28px' }} onClick={showFileInput}>
              <span>Media</span>
            </div>
            <input type="file" id="fileInput" style={{ display: 'none' }} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={updatePost}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostComponent;
