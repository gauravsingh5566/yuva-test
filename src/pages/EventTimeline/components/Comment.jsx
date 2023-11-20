import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import './css/comment.css';
import UserComment from './UserComment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from 'react-bootstrap';
import { MyContext } from '../EventTimeline';
import axios from 'axios';
import { UserContext } from 'global/context';

const Comments = ({ postId, post, fetchPost }) => {
  const { userData, token, loginStatus } = useContext(UserContext);
  const { userComment, setUserComment, userDetail } = useContext(MyContext);
  const { id, email, type, role, institution_name, logo } = userData;
  const { first_name, last_name } = userDetail;
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file here
  };
  const handleSubmitComment = async () => {
    if (!token) {
    } else {
      try {
        // console.log(userDetail);
        let name;

        if (role == 'admin') {
          name = institution_name;
        } else {
          name = first_name + ' ' + last_name;
        }
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + 'timeline/comment', {
          content,
          postId,
          commentBy: name,
          userId: id,
          userRole: role,
        });

        const comment = response.data;
        // Perform any necessary actions with the newly created comment
        fetchComment();
        fetchPost();
      } catch (error) {}
      setContent('');
      // fetchPost();
    }
  };

  const renderBothCommentPosts = () => {
    fetchComment();
    fetchPost();
  };

  const fetchComment = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${postId}`);
      setUserComment(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <>
      <div className="comment-card card">
        <div className="header d-flex justify-content-between pt-3">
          <span className="comment-right">Comments({post.commentsCount})</span>
          {/* <span onClick={clickOnButton} className='comment-left'>X</span> */}
        </div>
        <div className="middle pt-4 overflow-auto">
          {/* <UserComment/> */}
          {userComment?.map((comment, index) => {
            return <UserComment render={renderBothCommentPosts} comment={comment} post={post} key={index} />;
          })}
        </div>
        <div className="footer border m-4">
          <div className="input-editor">
            <textarea
              className="bigger-textbox"
              rows={4}
              cols={50}
              placeholder="Enter text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="below-editor d-flex justify-content-between ">
            <div className="right pb-2 pl-2 " style={{ paddingLeft: '12px' }}>
              <img src={logo} alt="" />
            </div>
            <div className="left">
              <span className="ButtonAt" style={{ marginRight: '12px' }}>
                @
              </span>
              <label htmlFor="fileInputs" className="camera-icon-label">
                <CameraAltIcon onClick={handleIconClick} />
                <input id="fileInput" ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
              <Button onClick={handleSubmitComment} style={{ transform: 'scale(0.7)' }}>
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
