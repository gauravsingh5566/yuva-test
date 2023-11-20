import React, { useContext, useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form, Modal, ModalBody } from "react-bootstrap";
import LanguageIcon from "@mui/icons-material/Language";
import ImageIcon from "@mui/icons-material/Image";
import GroupIcon from '@mui/icons-material/Group';
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { UserContext } from "global/context";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { ClubContext } from "../TimelineClub";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { apiAuth } from "api";
import "../style/clubStyle.css"
import EmojiPicker ,{EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji} from "emoji-picker-react";
import { MentionsInput, Mention } from 'react-mentions'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const ClubAddPost = ({ clubDetail }) => {
  const location = useLocation();
  const [isProfilePage, setIsProfilePage] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("profile")) {
      setIsProfilePage(true);
    }
  }, []);
  const navigate = useNavigate();
  const { fetchClubPosts, fetchAllFollowedClubByUser, setClubPost, setclickuserAllPost, allFollowedClub, fetchAllClickedUserPost } = useContext(ClubContext);
  const { userData, token } = useContext(UserContext);
  const { userDetail, fetchAllPost, fetchAllUserPost, clickuserDetail } = useContext(ClubContext);
  const { first_name, last_name, email, institution_name, logo, gender } = userDetail;

  const [modalShow, setModalShow] = useState(false);
  const [modalDiscussuionShow, setModalDiscussuionShow] = useState(false);

  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [postObject, setPostObject] = useState({
    content: "",
    image: "",
  });

  const [showClubModal, setShowClubModal] = useState(false);
  const [clubIdProfile, setClubIdProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showYt, setshowYt] = useState(false);
  const extractVideoId = (link) => {
    const regex = /(?:[?v=]|\/embed\/|\/\d\/|\/vi\/|youtu.be\/|\/v\/|\/e\/|\/embed\/|\/user\/|\/videos\/|\/channels\/[^\/]+\/|\/c\/[^\/]+\/|\/user\/[^\/]+\/|\/[a-zA-Z0-9_-]{11})[a-zA-Z0-9_-]{11}/;
    const match = link.match(regex);
    return match ? match[0].substr(-11) : null;
  };

  const handleSubmitYoutube = (event) => {
    event.preventDefault();
    const videoId = extractVideoId(link);
    setVideoId(videoId);
  };

  const handleSubmit = (e, clubId) => {
    e.preventDefault();

    if (!token) {
      toast.info("you need to login");
      navigate("/login");
    }

    const postby = first_name + " " + last_name;

    const newPost = {
      postBy: postby,
      // logo: logo,
      content: postObject.content,
      userId: userData.id,
      type: "club",
      image: postObject.image,
      clubId: isProfilePage ? clubId : clubDetail.id,
      userType: userData.role,
      youTubeLink: link,
      instituteId: userData.role === "institute" ? userData.id : null,
      youTubeId: videoId,
    };

    if (!newPost.content && !newPost.youTubeId) {
      toast.dismiss();
      toast.error("You Have To Write Something Before Publish");
      return;
    }
    setIsLoading(true);
    apiAuth
      .post(`club/createClubPost/user/${userData.id}/club/${clubDetail.id}/?pageType=${isProfilePage ? "profile" : "club"}`, { ...newPost, img: image })
      .then((res) => {
        clearFields();
        if (isProfilePage) {
          // console.log(res.data.posts)
          // console.log("insidet the profile page ")
          setclickuserAllPost(res.data.posts);

          setShowClubModal(false);
        } else {
          setClubPost(res.data.posts);
          setShowClubModal(false);
        }
        setIsLoading(false);

        setImage(null);
        hide();
        setSelectedImage(null);
        toast.dismiss();
        toast.success("Published Successfully");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Internal Server Error");
        // console.log(error.message);
        setIsLoading(false);
      });
  };
  const handleSubmitDirect = (e) => {
    e.preventDefault();

    if (!token) {
      toast.info("you need to login");
      navigate("/login");
    }

    const postby = first_name + " " + last_name;

    const newPost = {
      postBy: postby,
      // logo: logo,
      content: postObject.content,
      userId: userData.id,
      type: "profile",
      image: postObject.image,
      userType: userData.role,
      youTubeLink: link,
      instituteId: userData.role === "institute" ? userData.id : userData.instituteId,
      youTubeId: videoId,
    };

    if (!newPost.content && !newPost.youTubeId) {
      toast.dismiss();
      toast.error("You Have To Write Something Before Publish");
      return;
    }
    setIsLoading(true);
    apiAuth
      .post(`api/v2/profile/createPost`, { ...newPost, img: image })
      .then((res) => {
        clearFields();
        if (isProfilePage) {
          // console.log(res.data.posts)
          // console.log("insidet the profile page ")
          setclickuserAllPost(res.data.posts);

          setShowClubModal(false);
        } else {
          setClubPost(res.data.posts);
          setShowClubModal(false);
        }
        setIsLoading(false);

        setImage(null);
        hide();
        setSelectedImage(null);
        toast.dismiss();
        toast.success("Published Successfully");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Internal Server Error");
        // console.log(error.message);
        setIsLoading(false);
      });
  };
  const clearFields = () => {
    setPostObject({
      text: "",
      image: "",
    });
  };

  const setPostObjectFunction = (newValues) => {
    setPostObject((prevState) => ({
      ...prevState,
      ...newValues,
    }));
  };

  const showModal = () => {
    setModalShow(true);
  };

  const hide = () => {
    setModalShow(false);
  };

  const showDiscussionModal = () => {
    setModalDiscussuionShow(true);
  };

  const hideDiscussionModal = () => {
    setModalDiscussuionShow(false);
  };

  function showFileInput() {
    // if (role === 'institute' && type === 1 && token) {
    //   fetchAdminDetails();
    // }
    var img = document.getElementById("img");
    img.click();
  }


  const [emojiTogggle, setEmojiTogggle]=useState("")
  const [inputView, setInputView] = useState(true);
  const [mentions, setMentions] = useState([
    {
      id: '1',
      display: 'John Doe',
    },
    {
      id: '2',
      display: 'Jane Smith',
    },
  ]);

    const mentionsInputStyle = {
    control: {

        fontSize: 16,
        height: "250px",
        background: "#efefef",
        borderRadius: "8px",
        resize : "none",
        border : "none"
    },
    "&multiLine": {
        control: {
            minHeight: 30
        },
        highlighter: {
            padding: 9,
        },
        input: {
            outline: "none",
            border: "none",
            padding: 9,
        }
    },
    "&singleLine": {
        display: "inline-block",

        highlighter: {
            padding: 1,
        },
        input: {
            outline: "none",
            border: "none",
            padding: 1,
        }
    },
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: 5,
        fontSize: 10,
        width: "100%"
      },
      item: {
        fontSize: 12,
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#da9eff',
        borderRadius: 5,
        },
      },
    },
};

  const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
    console.log('Added newPlainTextValue:', newPlainTextValue);
    setPostObject((prevState) => ({
      ...prevState,
      content : newPlainTextValue,
    }));
  };

  const handleEmojiClick = (emoji) => {
    setPostObject((prevContent) =>{
      return {
        ...prevContent,
        content: prevContent.content + emoji.emoji,
      };
    });
  };

  const handleMentionInputClick = () => {
    setEmojiTogggle(false); // Close emoji picker when clicking on the mention input.
  };
  

  return (
    <>
      <div className="mb-3 mt-4">
        <Card className="border rounded-4 p-0">
          <Card.Body className="p-2 py-3">
            <div style={{ cursor: "pointer" }} className="container" >
              <div className=" d-flex " style={{ color: "black", cursor: "pointer" }}>
                <Avatar src={userDetail?.logo || userDetail?.profile} className="me-2 mb-2"></Avatar>

                <div className="col-9 ms-4">
                <div className="" style={{border: "none"}}>
                <input
                  style={{
                    width: "100%",
                    border: "none",
                    color: "#999999",
                    background: "#F2F2F2",
                    height: "40px",
                    outline: "none"
                    // borderRadius: "15px"
                  }}
                  placeholder="whats Going On?"
                  type="text"
                  className=" rounded-2 bg-light bg-opacity-50 ms-2"
                />
              </div>
                
                <hr/>
              
              <div className="d-flex justify-content-between mt-3">
              <div style={{ color: "red" }} className="me-2 mb-2" onClick={showModal}>
                  <small style={{color: "#333333",fontWeight: "700", fontSize: "15.07px"}}>
                    <AddToPhotosIcon sx={{color: "#0808ff"}} />Photos
                  </small>
                </div>
                <div style={{ color: "#39B54A" }} className="me-2 mb-2"  onClick={showModal}>
                  <small style={{color: "#333333",fontWeight: "700", fontSize: "15.07px"}}>
                    <YouTubeIcon sx={{color: "#ff0000"}}/> Videos
                  </small>
                </div>
                <div style={{ color: "#FBB03B" }} className="me-2 mb-2"  onClick={showDiscussionModal}>
                  <small style={{color: "#333333",fontWeight: "700", fontSize: "15.07px"}}>
                    {" "}
                    <GroupIcon  sx={{color: "#FBB03B"}} /> Discussion
                  </small>
                </div>
              </div>
              </div>

              </div>


            </div>
          </Card.Body>
        </Card>
        <Modal className="modal-lg" show={modalShow} onHide={()=> {
          hide()
          handleMentionInputClick()
        }
          }>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold" style={{color: "black"}}>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="d-flex mb-2">
                <div style={{ width: "44px", height: "44px", marginRight: "20px" }}>
                  <Avatar src={userDetail?.logo || userDetail?.profile}></Avatar>
                </div>
                <div>
                  <h5>{first_name + " " + last_name}</h5>
                  <label>public</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              {/* <Form>
                <Form.Group controlId="formTextarea">
                  <FloatingLabel controlId="floatingTextarea2" label={`Hey Whats Going on ! `}>
                    <Form.Control
                    className="rounded"
                      as="textarea"
                      placeholder="Whats going on !"
                      value={postObject.content}
                      onChange={(e) => {
                        setPostObjectFunction({ content: e.target.value });
                      }}
                      style={{
                        height: "250px",
                        resize: "none",
                        background: "#efefef",
                        border: "none",
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Form> */}
              { 
                    inputView && 
                       <div onClick={handleMentionInputClick}>
                       <MentionsInput 
                                  value={postObject.content}
                                 onChange={handleInputChange}
                                  placeholder={`Whats going on...\n@Mention`}
                               style={mentionsInputStyle}
                                 >
                                <Mention
                                 trigger="@"
                                 data={mentions}
                                 displayTransform={(id, display) => `@${display}`}
                                 // onAdd={handleAddMention}
                               />
                           </MentionsInput>
                           </div>

              }
              {selectedImage && (
                <Card className="mt-2">
                  <Card.Body>
                    <div>
                      {
                        <div>
                          <img src={selectedImage} alt="Selected" style={{ width: "100%", objectFit: "contain" }} />
                        </div>
                      }
                    </div>
                  </Card.Body>
                </Card>
              )}
              {videoId && (
                <Card>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        width: "100%",
                      }}>
                      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: "0" }}>
                        <iframe title="YouTube video player" width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
            {showYt && (
              <>
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <input type="text" value={link} onChange={(event) => setLink(event.target.value)} placeholder="Paste Youtube Link Here" style={{ outline: "none", border: "none",width: "100%" }} />
                      <button className="youtube-button" onClick={handleSubmitYoutube} type="submit">
                        Upload
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )}
            <div className=" mb-4">
              <Card>
                <Card.Body style={{background: "rgb(238 245 255)"}}>
                  <div className="d-flex justify-content-between align-items-center add-post-emoji-div">
                    <div style={{width: "100%"}}>
                    <div style={{width: "100%"}}>
                      <h6>Add To Post</h6>
                    </div>
                    </div>

                    <div className="d-flex justify-content-around align-items-center">
                      <div className="me-1">
                        <ImageIcon onClick={showFileInput} style={{ cursor: "pointer", color: "#0808ff" }} />
                        <input
                          type="file"
                          id="img"
                          style={{ display: "none" }}
                          accept=".png, .jpg, .jpeg"
                          name="files[]"
                          onChange={(e) => {
                            if (e.target.files.length) {
                              setImage(e.target.files[0]);
                              setSelectedImage(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                      </div>
                      <div className="me-1">
                        <YouTubeIcon
                          onClick={() => {
                            setshowYt(true);
                          }}
                          style={{ cursor: "pointer", fontSie: "17px", color: "#FF0000" }}
                          color="primary"
                        />
                      </div>

                      <div className="ms-1">
                        <InsertEmoticonIcon className="" onClick={() => setEmojiTogggle((prev) => !prev)} style={{ cursor: "pointer", color: "#fdd231" }} />
                      </div>
                      {/* <div> */}
                      <div className='post-emoji-div'>
                      {
                        emojiTogggle && 
                        <EmojiPicker
                        height={350}
                        // width="50%"
                        emojiVersion="5.0"
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
                         emojiStyle={EmojiStyle.APPLE}
                        />
                      }
                </div>
                      {/* </div> */}
                      <div className="ms-1">
                        <AlternateEmailIcon style={{ cursor: "pointer", color: "black" }}/>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="row">
              <button 
                style={{height: "40px" ,padding: "4px", color: "white", background: "#6100FF" }}
                className="btn btn-md btn-primary col-8 mx-auto rounded border-0"
                onClick={(e) => {
                  if (isProfilePage) {
                    handleSubmitDirect(e);
                  } else {
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}>
                Submit
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={modalDiscussuionShow} onHide={hideDiscussionModal} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header  closeButton><Modal.Title id="contained-modal-title-vcenter"  className=" fw-bold color-black" style={{fontSize: "25px",fontFamily: "Poppins"}}>Discussion</Modal.Title></Modal.Header>
          
          <Modal.Body>
            <div>
            <div className="mt-1" style={{fontFamily: "Poppins"}}>
              <div><span style={{color: "black"}} className="fw-500">Title</span></div>
                <textarea type="text" className="form-control ps-3 pt-2 rounded fw-500 box-shadow-0 resize-none border-0" name="" id="" placeholder="Title"  style={{ color: "black",background: "rgb(239, 239, 239)", fontSize: "16px",height: "30px"}}>
                </textarea>
              </div>
            <div className="mt-2" style={{fontFamily: "Poppins"}}>
              <div><span style={{color: "black"}} className="fw-500">Discription</span></div>
                <textarea type="text" className="form-control p-3 rounded fw-500 box-shadow-0 resize-none border-0" name="" id="" placeholder="Write Discription"  style={{ color: "black",background: "rgb(239, 239, 239)", fontSize: "16px",}}>
                </textarea>
              </div>

              <div className="mt-3 mb-3 d-flex justify-content-between align-items-center text-center">
                <div>
                  <button onClick={hideDiscussionModal} className="rounded" style={{ height: "36px", width: "122px" , color: "#747474"}}>Discard</button>
                </div>
                <div>
                  <button type="submit" className="rounded" style={{ height: "36px", width: "140px", background: "rgb(97, 0, 255)", color: "white"}}>Add Discussion</button>
                </div>
              </div>
            </div>
          </Modal.Body>

        </Modal>

      </div>
      <Modal dialogClassName="club-modal"
        show={showClubModal}
        onHide={() => {
          setShowClubModal(false);
        }}>
        <Modal.Header className="fw-bold"  style={{ color: "black", fontSize: "20px" }}>Choose Club</Modal.Header>

        <Modal.Body>
          <div>
            <div className="">
              {allFollowedClub?.map((club) => {
                return (
                  <button
                  style={{ color: "white", background: "#da9eff", width: "70px"}}
                    key={club.id}
                    className="btn btn-outline-primary rounded-2 mb-2 px-5 mx-4 border-0"
                    // value={club.name}
                    onClick={(e) => {
                      setClubIdProfile(club.id);
                      handleSubmit(e, club.id);
                    }}
                    disabled={isLoading}>
                    {club.name}
                  </button>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClubAddPost;
