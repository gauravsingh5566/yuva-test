import React, { useContext, useEffect, useRef, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import PublishIcon from '@mui/icons-material/Publish';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import YouTube from 'react-youtube';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/joy/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import { UserContext } from 'global/context';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiAuth } from 'api';
import './css/addpost.css';
import { height, style } from '@xstyled/styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function PostPublish() {
  // const {userDetail}  = useContext(MyContext);
  const { userData, token, loginStatus } = useContext(UserContext);
  const { setUserPosts,userDetail } = useContext(MyContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [value, setValue] = React.useState('1');
  const [textareaValue, setTextareaValue] = useState('');
  const [link, setLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { id, email, type, role, logo } = userData;
  const [showError, setshowError] = useState(false);
  // const [adminDetail, setadminDetail] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('');
  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = userDetail;
  const [postPayload, setPostPayload] = useState({
    postBy: '',
    content: '',
    img: '',
    logo: admin_logo,
    createdAt: '',
    updatedAt: '',
    instituteId: id,
    youTubeLink: link,
    youTubeId: videoId,
  });

  const initialValues = {
    content: '',
    // img:'',
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required('This is Required')
      .when('$submitting', {
        is: true,
        then: Yup.string().required('Content is required'),
      }),
  });
 
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
  };

  const videoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };
  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'timeline/get')
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const handlePublish = (e) => {
    if (!token) {
      toast.info('You Need to Login ');
      navigate('/login');
    }
    e.preventDefault();
    // formik.setSubmitting(true);
    const postby = userData.institution_name;
    const newPost = {
      postBy: postby,
      logo: admin_logo,
      content: textareaValue,
      createdAt: postPayload.createdAt,
      updatedAt: postPayload.updatedAt,
      instituteId: id,
      youTubeLink: link,
      youTubeId: videoId,
    };

    if (role == 'institute') {
      if (!newPost.content && !newPost.youTubeId) {
        toast.dismiss();
        toast.error('You Have To Write Something Before Publish');
      }
      apiAuth
        .post(process.env.REACT_APP_API_BASE_URL + 'timeline/post', { ...newPost, img: image })
        .then((response) => {
          setPostPayload((prev) => ({
            ...prev,
            postBy: '',
            content: '',
          }));
          formik.resetForm();
          setTextareaValue('');
          setImage(null);
          setValue('1');
          setLink('');
          setVideoId('');
          setSelectedImage(null);
          fetchPost();
          toast.dismiss();
          toast.success('Published Successfully');
        })
        .catch((error) => {});
    } else {
      setshowError(true);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  
  const handleButtonClick = () => {
    setValue('1');
    fileInputRef.current.click();
  };

 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handlePublish,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };
  return (
    <div>
      <div className="border shadow shadow-md rounded-4 mb-3">
        <div>
          <form onSubmit={handlePublish}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Publish" value="1" />
                    <Tab label="Video" value="2" />
                    {/* <Tab label="Video" value="3" /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="d-flex justify-content-between">
                    <div className="col-1 " style={{ width: '13%' }}>
                      <Avatar src={admin_logo}>
                        {!logo && admin_first_name && <span style={{ fontSize: '20px' }}>
                        {admin_first_name.charAt(0).toUpperCase()}</span>}
                      </Avatar>
                    </div>
                    <div className="col-12 col-lg-11">
                      <div className="form-floating d-flex mb-2">
                        <textarea
                          className=""
                          placeholder="Write a Comment..."
                          id=""
                          style={{
                            height: ' 100px',
                            border: 'none',
                            resize: 'none',
                            borderRadius: '12px',
                            width: '88%',
                            outline: 'none',
                            background: 'rgb(240, 242, 245)'
                          }}
                          value={textareaValue}
                          onChange={handleTextareaChange}></textarea>

                        {/* <label for="floatingTextarea2" >Type in Here...</label> */}
                        {/* <label
                        htmlFor="floatingTextarea2"
                        style={{ display: textareaValue ? "none" : "block" }}
                      >
                        Type in Here...
                      </label> */}
                      </div>
                      <div>
                        {selectedImage && (
                          <div>
                            <img src={selectedImage} alt="Selected" style={{ width: '80%', objectFit: 'contain' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  {' '}
                  <div>
                    <form onSubmit={handleSubmitYoutube}>
                      <input
                        type="text"
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                        placeholder="Paste Youtube Link Here"
                        style={{ outline: 'none', border: 'none' }}
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
                          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: '0' }}>
                            <iframe
                              title="YouTube video player"
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              frameBorder="0"
                              allowFullScreen
                              style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div>
                    <input type="file" accept="video/*" onChange={handleFileChange} />
                    {selectedVideo && <video src={URL.createObjectURL(selectedVideo)} controls />}
                  </div>
                </TabPanel>
              </TabContext>

              <div className=" border-top d-flex ">
                <div className="d-flex align-items-center justify-content-end m-2 ms-2">
                  <input
                    type="file"
                    id="img"
                    style={{ display: 'none' }}
                    accept=".png, .jpg, .jpeg"
                    name="files[]"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setImage(e.target.files[0]);
                        setSelectedImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                  <label htmlFor="img">
                    <Button
                      variant="text"
                      size="small"
                      // sx={{ color: "#4b4d4d" }}
                      className="text-capitalize font-weight-bold"
                      onClick={handleButtonClick}>
                      <CameraAltIcon /> &nbsp;Media
                    </Button>
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-end m-2 ms-2">
                  <Button
                    onClick={() => setValue('2')}
                    variant="text"
                    size="small"
                    // sx={{ color: "#4b4d4d" }}
                    className="text-capitalize font-weight-bold">
                    <VideocamIcon /> &nbsp;Video
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-end m-2 ms-2">
                  <Button
                    type="submit"
                    variant="text"
                    size="small"
                    // sx={{ color: "#4b4d4d" }}
                    className="text-capitalize font-weight-bold">
                    {' '}
                    <PublishIcon /> &nbsp;Publish
                  </Button>
                </div>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostPublish;
