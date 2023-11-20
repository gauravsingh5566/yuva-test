import React, { useContext, useEffect } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from 'react-bootstrap/Dropdown';
import './css/addpost.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from 'global/context';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { Textarea } from '@mui/joy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import { toast } from 'react-toastify';

const UpdatedUserComment = ({ comment, post, render }) => {
  const navigate = useNavigate();
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role, institution_name, logo } = userData;
  const { userPosts, setUserPosts, setUserComment, userComment, userDetail } = useContext(MyContext);
  const [updateComment, setCommentUpdate] = useState(comment);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleDeleteComment = () => {
    // comment delete by institute admin
    let postId = post.id;
    let payload = { postId: postId };
    if (role === 'institute' && post.instituteId === id) {
      axios
        .delete(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${comment.id}`, { data: payload })
        .then((response) => {
          render();
          setShowDeleteModal(false);
          toast.dismiss();
          toast.success('Comment Deleted');
        })
        .catch((error) => {
          console.error('Error fetching posts', error);
        });
    }
    // comment delete by user's comment
    else if (token && comment.userId === id) {
      axios
        .delete(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${comment.id}`, { data: payload })
        .then((response) => {
          render();
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error('Error fetching posts', error);
        });
    }
  };
  const handleUpdateComment = () => {
    axios
      .put(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${comment.id}`, updateComment)
      .then((response) => {
        render();
        setShowUpdateModal(false);
        toast.dismiss();
        toast.success('Comment Updated SuccessFully');
      })
      .catch((error) => {
        console.error('Error fetching posts', error);
      });
  };

  const handleCommentClick = (role) => {
    if (role == 'admin') {
      navigate(`/timeline/userProfile/institute/${comment.userId}`);
    } else {
      navigate(`/timeline/userProfile/user/${comment.userId}`);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className=" p-2 border-bottom">
        <div className="d-flex">
          <div style={{ cursor: 'pointer', userSelect: 'none' }} className="d-flex " onClick={() => handleCommentClick(comment.userRole)}>
            <div className=" ">
              <Avatar src={comment.logo}>
                {!comment.logo && comment.commentBy && <span style={{ fontSize: '20px' }}>{comment.commentBy.charAt(0).toUpperCase()}</span>}
              </Avatar>
            </div>
            <div className=" ms-2">
              <h6>{comment.commentBy}</h6>
              <p style={{ fontSize: 'smaller', marginTop: '-5px' }}>{moment(comment.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="3dot " style={{ paddingRight: '6px' }}>
            {(token && role === 'admin' && post.instituteId === id) || (token && comment.userId === id) ? (
              <Dropdown align="start">
                <Dropdown.Toggle as={CustomToggle}>
                  <MoreVertIcon style={{ fontSize: '22px' }} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-left">
                  <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete comment</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowUpdateModal(true)}>Update comment</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
        </div>

        <div className="ms-4">
          <p style={{ fontSize: '15px', marginLeft: '20px', overflow: 'hidden' }}>{comment.content}</p>
        </div>
      </div>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="middle d-flex flex-row align-items-center pl-2" style={{ paddingLeft: '12px' }}>
            <div className="left">
              <img
                src={comment.logo}
                alt={comment.commentBy}
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
                value={updateComment.content}
                onChange={(event) =>
                  setCommentUpdate({
                    ...updateComment,
                    content: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleUpdateComment}>
            Update
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Comment?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDeleteComment}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatedUserComment;
