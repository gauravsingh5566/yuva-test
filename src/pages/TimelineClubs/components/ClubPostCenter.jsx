import React, { createContext, useContext, useEffect, useState } from "react";
import { Card, Dropdown, Modal } from "react-bootstrap";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ClubComment from "./ClubComment";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { ClubContext } from "../TimelineClub";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import VideocamIcon from '@mui/icons-material/Videocam';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { apiAuth, apiJson, apiJsonAuth } from 'api';

import { UserContext } from "global/context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ClubPostContext } from "../ClubPosts";
import { toast } from "react-toastify";



const ClubPostCenter = ({ post,singlePostRender,singlePost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [commentCount, setCommentCount]=useState(0)
  // setup post object 
  const [currentPost, setCurrentPost] = useState({})

  const [isCommentLoading, setisCommentLoading] = useState(false)

  const commentLoading = (load)=>{
    // console.log("thisi sloadinnnnnnnnnnnnnnnggggggggggg", load)
    setisCommentLoading((prevLoad)=>load)
    // console.log("lllllllllllllllllll",isCommentLoading)
  }

  useEffect(()=>{
    if(post){
      setCurrentPost(post)
    }
  },[post])
  useEffect(()=>{
      setCommentCount(currentPost?.CommentsCount)
  },[currentPost])

  const setUpdatedCommentCount = (count)=>{
    setCommentCount(count);
  }

// check for profile page

  const [isProfilePage, setIsProfilePage] = useState(false)
  useEffect(()=>{
    if(location.pathname.includes('profile')){
      setIsProfilePage(true);
      
    }
    if(location.pathname.includes('post')){
      setShowComment(true)
      setReadMore(true)
    }
   },[])

   



  const {fetchClubPosts,fetchAllClickedUserPost} = useContext(ClubContext);

  const {userData,token} = useContext(UserContext)
  const { id, email, type, role, institution_name } = userData;

  const [showComment, setShowComment] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [updatedPost, setUpdatedPost] = useState(currentPost);
  const [link, setLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [images, setImages] = useState('');
  


   const fetchUpdatedPostData = ()=>{
    setIsLoading(true)
    apiJsonAuth.get("club/postDetail/post/"+post.id)
    .then((res)=>{
      setCurrentPost(res.data.post);
      setIsLoading(false)
    }).catch((error)=>{
      setIsLoading(false)
      toast.dismiss();
      toast.error("Internal server error");
    })
   }

   const updateLikes = ()=>{
    if (!token) {
      navigate('/login');
    }
    else{
      setIsLoading(true)
      apiJsonAuth.put('club/updatePostLikes/post/'+post.id+'/user/'+userData.id)
      .then((res)=>{
        setIsLoading(false);
        setCurrentPost({...currentPost,allLikes:res.data.likes, likesCount:res.data.likes.length,CommentsCount:commentCount })
      }).catch((error)=>{
        console.log(error.message)
        toast.dismiss()
        toast.error('Internal server Error');
      })
    }
   }




  const updatePost = () => {
    if (post.userType === role && post.userId === id) {

      apiAuth.put('club/updateClubPost/post/'+post.id,{
        ...updatedPost,
          imgs: images,
      })
      .then((res)=>{
        toast.success('Updated Successfully')
        setCurrentPost({...currentPost,
          content:res.data.postDetail.content,
          youTubeLink:res.data.postDetail.youTubeLink,
          image:res.data.postDetail.image,
          youTubeId:res.data.postDetail.youTubeId,
        } )
        setVideoId('');
        setLink('');
        setSelectedImage('');
        toast.dismiss();
        toast.success('Post Updated Successfully');

      }).catch((error)=>{
        toast.dismiss()
        toast.error('Internal Server Error')


      })


      // apiAuth
      //   .put(process.env.REACT_APP_API_BASE_URL + `timeline/${post.id}`, {
      //     ...updatedPost,
      //     imgs: images,
      //   })
      //   .then((res) => {
      //     if(isProfilePage){
      //       fetchAllClickedUserPost(userData.id, userData.role)
      //     }
      //     setShowUpdateModal(false);
      //     if(singlePost){
      //       singlePostRender()
      //     }
      //     fetchClubPosts(post.clubId)
      //     setCurrentPost({...currentPost,content:res.data.content,} )
      //     // fetchpostDetail()
      //     setVideoId('');
      //     setLink('');
      //     setSelectedImage('');
      //     toast.dismiss();
      //     toast.success('Post Updated Successfully');
          // Perform any additional actions after updating the post
        // })
        // .catch((error) => {console.log(error.message)
        //   toast.dismiss();
        //   toast.error('Something went Wrong');
        // });
    } else {
      toast.dismiss();
      toast.info('You Are Not Authorized to do That');
    }
  };
  const extractVideoId = (link) => {
    const regex =
      /(?:[?v=]|\/embed\/|\/\d\/|\/vi\/|youtu.be\/|\/v\/|\/e\/|\/embed\/|\/user\/|\/videos\/|\/channels\/[^\/]+\/|\/c\/[^\/]+\/|\/user\/[^\/]+\/|\/[a-zA-Z0-9_-]{11})[a-zA-Z0-9_-]{11}/;
    const match = link.match(regex);
    return match ? match[0].substr(-11) : null;
  };

 
  function showFileInput() {
    var img = document.getElementById('imgs');
    img.click();
  }

  const handleSubmitYoutube = (event) => {
    event.preventDefault();
    const videoId = extractVideoId(link);
    setVideoId(videoId);
    setUpdatedPost({
      ...currentPost,
      youTubeId: videoId,
      youTubeLink: link,
    });
  };


  const handleCommentClick = () => {
    setShowComment(!showComment);
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


  const deletePost = (post) => {
    if (post.userType === userData.role && post.userId === userData.id) {
      apiJson
        .delete(`timeline/${post.id}`)
        .then((response) => {
          if(singlePost){
            singlePostRender()
          }
          if(isProfilePage){
            fetchAllClickedUserPost(userData.id, userData.role)
          }
          setShowDeleteModal(false);
          // console.log('successfully delete');
          toast.dismiss();
          toast.success('Post Delete Successfully');
          // fetchAllPost();
          fetchClubPosts(post.clubId)
        })
        .catch((error) => {
          toast.dismiss()
          toast.error("Internal Server Error")
        });
    } else {
    }
  };

  // useEffect(()=>{
  //   fetchAllPost()
  // },[allComment])

  const updatePostLike = () => {
    if (!token) {
      navigate('/login');
    } else {
      const userId = id;
      apiJson.put(process.env.REACT_APP_API_BASE_URL + `timeline/postlike/${post.id}`, { userId }).
      then((response) => {
        // if(isProfilePage){
        //   fetchAllClickedUserPost(userData.id, userData.role)
        // }
        // if(singlePost){
        //   singlePostRender()
        // }
        updateLikes()
        // fetchUpdatedPostData()
        // fetchClubPosts(post.clubId)
        // fetchpostDetail()
       
      }).catch((error)=>{
        toast.dismiss();
        toast.error("internal server error")
      })
    }
  };


  


  return (
    
    // <div className="row justify-content-center align-items-center mb-4 mt-3 shadow">
        <div className="col-12 justify-content-center align-items-center mb-4 rounded" style={{
      
    }}>
      <Card
        style={{
          background:'var(--club-component-backgrou',
          // border: "none",
      }}
        className="mb-2 hover-shadow-for-component rounded"
      >

        <Card.Body>
          <div className="containr">
            <div
              className="top d-flex justify-content-between mb-2"
              style={{ width: "100%" }}
            >
              <div
                style={{ width: "44px", height: "44px", marginRight: "20px" ,cursor:'pointer', userSelect:'none'}}
                 onClick={()=>{
                  if(post.userType==='student'){
                    navigate('/profile/user/'+post.userId)
                  }
                  else if(post.userType==='institute'){
                    navigate('/profile/institute/'+post.userId)
                  }
                }}
              >
             { <Avatar src={(post?.postUserDetail?.logo || post?.postUserDetail?.profile)  }/>}
                 
              </div>
        {  
          <div
                className="name d-flex justify-content-between align-items-center "
                style={{ width: "100%" }}
              >
                <div style={{cursor:'pointer', userSelect:'none'}} onClick={()=>{
                  if(post.userType==='student'){
                    navigate('/profile/user/'+post.userId)
                  }
                  else if(post.userType==='institute'){
                    navigate('/profile/institute/'+post.userId)
                  }
                }}>
              {    post?.postUserDetail?.institution_name?<h6 className="text-capitalize">{post?.postUserDetail?.institution_name}</h6>:
                  <h6 className="text-capitalize" style={{color: "#050505", fontSize: "18.07px", fontWeight: "500",fontFamily: "inter"}}>{post?.postUserDetail?.first_name+" "+post?.postUserDetail?.last_name}</h6>}
                  <label style={{
                    fontSize:'14px',
                    color:'grey'
                  }}> {moment(post.createdAt).fromNow()}</label>
                </div>
                <div>
                 {post.userType===userData.role && post.userId===userData.id && 
                  <Dropdown align="start" className="exclude-this-click">
                <Dropdown.Toggle as={CustomToggle}>
                  <MoreVertIcon sx={{color: "#3a659b"}}/>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    transform: 'translate(-167px, 1px)',
                    // background: "rgb(130 73 222)"
                  }}
                  className="dropdown-menu-left dropdown-menu-custom-class">
                  <Dropdown.Item className="update-delete-btn" onClick={() => setShowDeleteModal(true)}>Delete Post</Dropdown.Item>
                  <Dropdown.Item className="update-delete-btn" onClick={() => setShowUpdateModal(true)}>Update Post</Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
                 }
                </div>
              </div>}
            </div>
      {<div className="mid mb-2" style={{
              cursor:'pointer'
            }} onClick={
              ()=>{
                navigate('/clubs/'+post.clubId+'/post/'+post.id)
              }
            }>
              <div className="text-para">
                <p
                  style={
                    readMore
                      ? {
                          fontSize: "15px",
                          overflow: "hidden",
                          padding: "0  0 0 20px",
                        }
                      : {
                          textOverflow: "ellipsis",
                          fontSize: "15px",
                          // overflow: "hidden",
                          // display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          whiteSpace: "normal",
                          padding: "0 0 0 0px",
                        }
                  } 
                >
                  {/* {post?.content} */}
                  {currentPost?.content?.split('\n').map((paragraph, index) => (
            <p style={{
              fontSize: "15.07px",
              fontWeight: "400",
              fontFamily: "inter"
            }} key={index}>{paragraph}</p>
          ))}
                </p>
                <span
                  hidden={currentPost?.content?.length < 100}
                  className=""
                  onClick={() => setReadMore(!readMore)}
                  style={{fontSize:'15px',  color: "black"}}
                >
                  {readMore ? "Read Less..." : "Read More..."}
                </span>
                {currentPost?.youTubeLink ? (
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
                src={`https://www.youtube.com/embed/${currentPost.youTubeId}`}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '90%',
                borderRadius: "17px"
                }}
              />
            </div>
          ) : null}
              </div>
              {currentPost.image && (
                <div className="d-flex justify-content-center align-items-center"
                 style={{ height: "90%", width:'100%' }}>
                  <img
                    style={{ height: "100%", width: "100%", objectFit:'cover', borderRadius: "17px" }}
                    src={currentPost.image}
                    alt="img"
                  />
                </div>
              )}
            </div>}
      {  
          <div
              style={{ padding: "0 12px" }}
              className="bottom d-flex justify-content-between align-items-center"
            >
           {isLoading?<div  >
        <ThumbUpAltIcon 
                  style={{ cursor: "pointer", fontSize: "20px",
                  filter:' blur(5px)',transition: 'filter 0.3s ease' }}
                  color={currentPost?.allLikes?.includes(userData.id)?"primary":"primary"}
                />
      </div>
      : 
              <div onClick={updateLikes}
              style={{cursor: "pointer"}}
               className="d-flex align-items-center">
                <ThumbUpAltIcon 
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  color={currentPost?.allLikes?.includes(userData.id)?"primary":""}
                  sx={{color:currentPost?.allLikes?.includes(userData.id)?"":"grey"}}
                />
                  <span className=" fw-medium ms-1" style={{fonSize:'16px', color:'grey'}}>
                  {
                    currentPost?.likesCount> 0 && currentPost?.likesCount
                  }
                 <span style={{
                    color:'grey', fontSize:'14px'
                 }}>
                 {
                    currentPost?.likesCount>1 
                    ? " Likes":
                    currentPost?.likesCount==1?" Like"
                    :null
                  }
                 </span>
                  </span>
              </div>}
              <div onClick={handleCommentClick} style={{cursor:'pointer'}}>
                <span className="fs-6 fw-medium me-1" style={{  color:'grey' }}>{commentCount}</span>{" "}
               {   <span style={{color:'grey', fontSize:'14px'}} className=" fw-medium ">{commentCount>1?'Comments':'Comment'}</span>}
              </div>
          </div>
      }

            {!showComment &&
              <>
              <div style={{background:'var(--club-background-component', 
                cursor:'pointer'
              }} className="mt-4">
                <div className="w-100 d-flex">
                    <div className="me-3" >
                      <Avatar style={{
                      height:'27px',
                      width:'27px'
                    }}
                    src={userData?.logo || userData?.profile}>
                      </Avatar>
                    </div>
                    <div onClick={handleCommentClick} className="w-100  rounded-1" 
                      style={{
                        background:'rgb(240, 242, 245)',
                        height: "36px",
                        fontFamily: "Inter",
                        fontSize: "12.7px",
                        fontWeight: "400"
                      }}
                    >
                      <span className="d-flex ms-2 mt-2 align-items-center" style={{color:'#B3B3B3', background: "rgb(240, 242, 245)"}}>Write a comment...</span>   
                    </div>
                    
                 </div>
              </div>
                
              </>
            }
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold" style={{color: "black"}}>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <button style={{color: "rgb(128, 128, 128)"}} className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button style={{background: "#0014C8"}} className="border-0 btn btn-danger rounded" onClick={() => deletePost(currentPost)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "black"}} className="fw-bold">Update Post</Modal.Title>
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
                  placeholder="Write Something about you..."
                  style={{
                    fontSize: '16px',
                    border: 'none',
                    background: 'transparent',
                    width: '94%',
                    color: "#3A3A3A"
                  }}
                  value={updatedPost.content}
                  onChange={(event) =>
                    setUpdatedPost({
                      ...currentPost,
                      content: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div style={{ cursor: 'pointer', margin: '0 52px' }} className=" mt-2">
              {currentPost.youTubeLink ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%',
                    height: '0',
                  }}>
                  <iframe
                  className="rounded"
                    title="YouTube video player"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentPost.youTubeId}`}
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
                <div className="description" 
                style={ { whiteSpace: 'nowrap' }}></div>
                <div
                  style={{
                    margin: '56px',
                  }}>
                  {selectedImage ? (
                    <div className="post-img margin-top10">
                      <img src={selectedImage} alt="" />
                    </div>
                  ) : currentPost.image ? (
                    <div className="post-img margin-top10">
                      <img src={currentPost.image ? currentPost.image : null} alt="" />
                    </div>
                  ) : null}
                  {showVideoModal ? (
                    <div>
                      <form onSubmit={handleSubmitYoutube}>
                        <div className="d-flex justify-content-between">
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
                            width: "100%"
                          }}
                        />
                        <button className="youtube-button" onClick={handleSubmitYoutube} type="submit">
                          Upload
                        </button>
                        </div>
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
                              className="rounded"
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

            <AddToPhotosIcon
              style={{
                fontSize: '28',
                cursor: 'pointer',
                
              }}
              sx={{color: "#0808ff"}}
              onClick={showFileInput}
            />

            <YouTubeIcon
              style={{
                fontSize: '39px',
                cursor: 'pointer',
                marginLeft: '15px',
              }}
              sx={{color: "#ff0000"}}
              onClick={() => {
                setShowVideoModal(true);
              }}
            />
          </div>
          <div className=" ">
            <button style={{color: "rgb(128, 128, 128)", fontFamily: "Poppins"}} className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </button>
            <button style={{background: "#0014C8"}} className="border-0 btn btn-danger rounded" onClick={updatePost}>
              Update
            </button>
          </div>
        </Modal.Footer>
      </Modal>

     
      
      {showComment && (
        <div className="mb-1">
          <ClubComment 
            post={currentPost}
            // fetchPostComment={fetchPostComment}
            commentLoading={commentLoading}
            setUpdatedCommentCount={setUpdatedCommentCount}
            page={isProfilePage?'isProfilePage':singlePost?'singlePost':null}
            single={singlePostRender}/>
        </div>
      )}
    </div>
    // </div>
    
  );
};

export default ClubPostCenter;
