import React, { useContext, useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import VideocamIcon from '@mui/icons-material/Videocam';
import YouTube from 'react-youtube';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { AvatarGroup, IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Comment } from '@mui/icons-material';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comments from './Comment';
import './css/addpost.css';
import { border, marginRight } from '@xstyled/styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'global/context';
import PublishComment from './PublishComment';
import { toast } from 'react-toastify';
import { apiAuth } from 'api';

function PostCenter({ post, img, isActive, onClick, index, singleItem, render }) {

  const [showOptions, setShowOptions] = useState(false);
  
  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = () => {
    // Logic for delete operation
  };

  const handleEdit = () => {
    // Logic for edit operation
  };

  const navigate = useNavigate();
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role, institution_name } = userData;
  const { userPosts, allComment,
    setUserPosts,fetchAllComment, 
    setUserComment, userComment, 
    userDetail } = useContext(MyContext);

  // const [adminDetail, setadminDetail] = useState(0);
  const [isClickOnComment, setIsClickOnComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [postLike, setPostLike] = useState(0);
  const [commentCountSingle, setCommentCountSingle] = useState(10);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [images, setImages] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [link, setLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [comment, setComment] = useState([]);



  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = userDetail;
  const handleCommentClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      setIsClickOnComment(!isClickOnComment);
      onClick(index);
      fetchComment();
    }
  };
  const extractVideoId = (link) => {
    const regex =
      /(?:[?v=]|\/embed\/|\/\d\/|\/vi\/|youtu.be\/|\/v\/|\/e\/|\/embed\/|\/user\/|\/videos\/|\/channels\/[^\/]+\/|\/c\/[^\/]+\/|\/user\/[^\/]+\/|\/[a-zA-Z0-9_-]{11})[a-zA-Z0-9_-]{11}/;
    const match = link.match(regex);
    return match ? match[0].substr(-11) : null;
  };


  const handleSubmitYoutube = (event) => {
    event.preventDefault();
    const videoId = extractVideoId(link);
    setVideoId(videoId);
    setUpdatedPost({
      ...post,
      youTubeId: videoId,
      youTubeLink: link,
    });
  };

  const fetchComment = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${post.id}`);
      // console.log(response);
      setUserComment(response.data);
      // console.log('inside the fetchcomment',response.data.length)
      setComment(response.data);
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
    if (role === 'institute' && post.instituteId === id) {
      apiAuth
        .put(process.env.REACT_APP_API_BASE_URL + `timeline/${post.id}`, {
          ...updatedPost,
          imgs: images,
        })
        .then((response) => {
          setShowUpdateModal(false);
          fetchPost();
          setVideoId('');
          setLink('');
          setSelectedImage('');
          toast.dismiss();
          toast.success('Post Updated Successfully');
          // Perform any additional actions after updating the post
        })
        .catch((error) => {});
    } else {
    }
  };
  const deletePost = (postId) => {
    if (role === 'institute' && post.instituteId === id) {
      axios
        .delete(process.env.REACT_APP_API_BASE_URL + `timeline/${postId}`)
        .then((response) => {
          setShowDeleteModal(false);
          // console.log('successfully delete');
          toast.dismiss();
          toast.success('Post Delete Successfully');
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
    var img = document.getElementById('imgs');
    img.click();
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

  const handleProfileCardClick = () => {
    navigate(`/timeline/userProfile/institute/${post.instituteId}`);
  };

  const handleProfileCommentClick = () => {
    navigate(`/timeline/userProfile/user/${post.instituteId}`);
  };

  const handlePostClick = (event) => {
    if (!event.target.closest('.exclude-this-click')) {
      // Handle click logic here
      navigate(`/timeline/${post.id}`);
    }
  };
  useEffect(()=>{
    // console.log("usereffetct")
    fetchComment()
  },[allComment])

  return (
    <div className='border-0 rounded-3 mb-4' style={{
        //  maxWidth: '700px'
        // transform:'scale(0.9)'
          background:'var(--club-component-background)'
        }}>
      <div className=" rounded-3 mb-2" onClick={handlePostClick}>
        <div className="p-2 d-flex justify-content-between">
          <div onClick={handleProfileCardClick} style={{ cursor: 'pointer' }} className=" d-flex exclude-this-click">
            <div className=" ">
              <Avatar src={post.logo}>
                {!post.logo && post.postBy && <span style={{ fontSize: '20px' }}>{post.postBy.charAt(0).toUpperCase()}</span>}
              </Avatar>
            </div>
            <div className="ms-2">
              <span className="text-dark d-block">{post.postBy}</span>
              <small>{moment(post.createdAt).fromNow()}</small>
            </div>
          </div>
          <div>
            {role === 'institute' && post.instituteId === id ? (
              <Dropdown align="start" className="exclude-this-click">
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
        <div onDoubleClick={handlePostClick} style={{ cursor: 'pointer' }} className="p-2 py-0">
          <p
            style={
              readMore
                ? { fontSize: 'medium', overflow: 'hidden' }
                : {
                    textOverflow: 'ellipsis',
                    fontSize: 'medium',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'normal',
                  }
            }>
            {post?.content}
          </p>
          <small hidden={post.content.length < 100} className="text-info" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'ReadLess..' : 'ReadMore..'}
          </small>
          {post?.youTubeLink ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                height: '0',
              }}>
              <iframe
                title="YouTube video player"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${post.youTubeId}`}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          ) : null}
        </div>
        <div className=" ">
          <div className="middle" style={{ cursor: 'pointer' }} onClick={handlePostClick}>
            {post.image ? (
              <div className="post-img">
                <img src={post.image ? post.image : null} alt="" />
              </div>
            ) : null}
          </div>
        </div>
        <div className=" px-3">
          <div className="d-flex justify-content-between">
            <div className=" d-flex justify-content-between"></div>
            <div className="d-flex align-items-between exclude-this-click">
              <div>
                <IconButton onClick={updatePostLike}>
                  <FavoriteBorder />
                  {post.likes ? post.likes.length : null}
                </IconButton>
              </div>
              <div>
                <IconButton onClick={handleCommentClick}>
                  <ChatBubbleOutlineIcon />
                  {comment.length>0 ? comment.length: null}
                </IconButton>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="exclude-this-click'">
        {
            singleItem ? (
            isClickOnComment ? (
              <PublishComment fetchPost={render} post={post} singleItem={true} postId={post.id} check={handleCommentClick} />
            ) : null
          ) : isActive ? (
            <PublishComment fetchPost={fetchPost} post={post} postId={post.id} check={handleCommentClick} />
          ) : null
        }
      </div>

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
        <Modal.Body className="changeScrollBar" style={{ maxHeight: '700px', overflow: 'scroll' }}>
          <div>
            <div className="middle d-flex flex-row align-items-center pl-2" style={{ paddingLeft: '12px' }}>
              <div className="left">
                <Avatar src={post.logo}>
                  {!post.logo && post.postBy && <span style={{ fontSize: '20px' }}>{post.postBy.charAt(0).toUpperCase()}</span>}
                </Avatar>
              </div>
              <div className="right" style={{ marginLeft: '12px', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Write Something about you"
                  style={{
                    fontSize: '22px',
                    border: 'none',
                    background: 'transparent',
                    width: '94%',
                  }}
                  value={updatedPost.content}
                  onChange={(event) =>
                    setUpdatedPost({
                      ...post,
                      content: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div style={{ cursor: 'pointer', margin: '0 52px' }} className="px-3">
              {post.youTubeLink ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%',
                    height: '0',
                  }}>
                  <iframe
                    title="YouTube video player"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${post.youTubeId}`}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              ) : null}
            </div>
            <div className=" ">
              <div className="middle margin-top10" style={{ cursor: 'pointer' }}>
                <div className="description" style={singleItem ? null : { whiteSpace: 'nowrap' }}></div>
                <div
                  style={{
                    margin: '56px',
                  }}>
                  {selectedImage ? (
                    <div className="post-img margin-top10">
                      <img src={selectedImage} alt="" />
                    </div>
                  ) : post.image ? (
                    <div className="post-img margin-top10">
                      <img src={post.image ? post.image : null} alt="" />
                    </div>
                  ) : null}
                  {showVideoModal ? (
                    <div>
                      <form onSubmit={handleSubmitYoutube}>
                        <input
                          type="text"
                          value={link}
                          onChange={(event) => setLink(event.target.value)}
                          placeholder="Paste Youtube Link Here"
                          style={{
                            outline: 'none',
                            border: '1px solid red',
                            borderRadius: '12px',
                            padding: '12px',
                          }}
                        />
                        <button className="youtube-button" onClick={handleSubmitYoutube} type="submit">
                          Upload
                        </button>
                      </form>
                      <div class="youtube-video-class" style={{ width: '100%' }}>
                        {videoId && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              marginTop: '20px',
                              width: '100%',
                            }}>
                            <div
                              style={{
                                position: 'relative',
                                width: '100%',
                                paddingBottom: '56.25%',
                                height: '0',
                              }}>
                              <iframe
                                title="YouTube video player"
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allowFullScreen
                                style={{
                                  position: 'absolute',
                                  top: '0',
                                  left: '0',
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <hr />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            <input
              type="file"
              id="imgs"
              style={{ display: 'none' }}
              accept=".png, .jpg, .jpeg"
              name="files[]"
              onChange={(e) => {
                if (e.target.files.length) {
                  setImages(e.target.files[0]);
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            <CameraAltIcon
              style={{
                fontSize: '35px',
                cursor: 'pointer',
              }}
              onClick={showFileInput}
            />

            <VideocamIcon
              style={{
                fontSize: '45px',
                cursor: 'pointer',
                marginLeft: '15px',
              }}
              onClick={() => {
                setShowVideoModal(true);
              }}
            />
          </div>
          <div className=" ">
            <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={updatePost}>
              Update
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostCenter;
