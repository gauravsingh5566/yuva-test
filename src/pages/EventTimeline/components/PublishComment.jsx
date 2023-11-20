import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import './css/comment.css';
import { MyContext } from '../EventTimeline';
import axios from 'axios';
import { UserContext } from 'global/context';
import { Avatar } from '@mui/material';
import { Textarea } from '@mui/joy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Button from '@mui/material/Button';
import UpdatedUserComment from './UpdatedUserComment';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

function PublishComment({ postId, post, fetchPost, check }) {
  const { userData, token, loginStatus, } = useContext(UserContext);
  const { userComment, setUserComment, userDetail,fetchAllComment,allComment } = useContext(MyContext);
  const { id, email, type, role, institution_name } = userData;
  const { first_name, last_name, logo, profile } = userDetail;
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);


  const[currentComment, setCurrentComment] = useState([])

  const fetchCurrentComment = ()=>{
     setCurrentComment(allComment.filter((i)=>{
      return i.postId === post.id
     }))
  }
  useEffect(()=>{
   if(allComment.length>0){
    fetchCurrentComment()
   }
  },[allComment])

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
        let logo_data;
        if (role == 'institute') {
          name = institution_name;
          logo_data = logo;
        } else {
          name = first_name + ' ' + last_name;
          logo_data = profile;
        }
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + 'timeline/comment', {
          content,
          postId,
          commentBy: name,
          commentType:'timeline',
          userId: id,
          userRole: role,
          logo: logo_data,
        });

        const comment = response.data;
        toast.dismiss();
        toast.success('Comment Succesfully');
        fetchAllComment();
        fetchPost();
      } catch (error) {console.log(error.message)}
      setContent('');
    }
  };
  
  const renderBothCommentPosts = () => {
    // fetchComment();
    fetchPost();
  };

  // const fetchComment = async () => {
  //   try {
  //     const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${postId}`);
  //     setUserComment(response.data);
  //   } catch (error) {}
  // };

  useEffect(() => {
    // fetchComment();
  }, []);

  const handleCheck = () => {
    check();
  };

  return (
    <div>
      <div className="border rounded-4 p-3">
        <div className="d-flex justify-content-between mb-3">
          <h6>Comments</h6>
          <div onClick={handleCheck}>
            <CloseIcon />
          </div>
        </div>
        <div
          className="thin-scroll"
          style={{
            maxHeight: '400px',
            overflow: 'scroll',
          }}>
          {currentComment?.map((comment, index) => {
            return <UpdatedUserComment render={renderBothCommentPosts} comment={comment} post={post} key={comment.id} />;
          })}
        </div>
        <div className=" border rounded-4 p-2">
          <div class="form-floating mb-2">
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
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Avatar src={role == 'institute' ? logo : profile}>
                {!logo && first_name && <span style={{ fontSize: '20px' }}>{first_name.charAt(0).toUpperCase()}</span>}
              </Avatar>
            </div>
            <div className="d-flex">
             
              <div>
                {' '}
                <Button onClick={handleSubmitComment} variant="contained">
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishComment;
