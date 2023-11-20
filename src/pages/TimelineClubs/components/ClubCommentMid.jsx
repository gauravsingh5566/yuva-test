import { Avatar } from '@mui/material'
import { UserContext } from 'global/context'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { ClubContext } from '../TimelineClub'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ClubPostContext } from '../ClubPosts'
import EmojiPicker ,{EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji} from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import "../style/clubStyle.css"
import { MentionsInput, Mention } from 'react-mentions'
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const ClubCommentMid = ({post,page,single , postFunction}) => {
  const {fetchpostDetail,postDetail, postComments} = useContext(ClubPostContext)
  const {userData,token} = useContext(UserContext)
  const {userDetail,fetchComment,fetchAllComment, fetchPost,fetchAllClickedUserPost,fetchClubPosts} = useContext(ClubContext);
  
  const { id, email, type, role, institution_name } = userData;
  const { first_name, last_name, logo, profile } = userDetail;
  
  const [content, setContent] = useState('');
  


  const handleSubmitComment = async () => {
    if (!token) {
    } else {
      try {
        // console.log(userDetail);
        let name;
        let logo_data;
        // let userType;
        // let userId;
        if (role == 'institute') {
            name = institution_name;
            logo_data = logo;
          
          } else {
              name = first_name + ' ' + last_name;
              logo_data = profile;
            }
            const data = {
                content,
                postId:post.id,
                commentBy: name,
                userId: id,
                userRole: role,
                userType:role,
                logo: logo_data,
              }
            postFunction(data)
        // const response = await axios.post(process.env.REACT_APP_API_BASE_URL + 'timeline/comment', {
        //   content,
        //   postId:post.id,
        //   commentBy: name,
        //   userId: id,
        //   userRole: role,
        //   userType:role,
        //   logo: logo_data,
        // });

        // const comment = response.data;
        // // Perform any necessary actions with the newly created comment
        // toast.dismiss();
        // toast.success('Comment Succesfully');
        // if(page==='isProfilePage'){
        //   fetchAllClickedUserPost(userData.id, userData.role)
        // }if(page==='singlePost'){
        //   single()
        // }if(page===null){
        //   fetchClubPosts(post.clubId)
        // }


        // fetchComment(post.id);
        // fetchAllComment()
        // fetchPost();
        // fetchpostDetail();
      } catch (error) {}
      setContent('');
      // fetchPost();
    }
  };

  const [emojiTogggle, setEmojiTogggle]=useState("")
  const containerRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    // Insert the selected emoji into the textarea content
    setContent((prevContent) => prevContent + emoji.emoji);
  };

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) 
    ) {
      setEmojiTogggle(false);
    }
  };

  const handleMentionInputClick = () => {
    setEmojiTogggle(false); // Close emoji picker when clicking on the mention input.
  };

  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const mentionsInputStyle = {
    control: {

        fontSize: 16,
        height: "80px",
        background: "rgb(240, 242, 245)",
        borderRadius: "8px",
        // style={{ background:'rgb(240, 242, 245)' ,fontSize: "16px",height: "80px",borderRadius: "8px"}}

        // fontWeight: 'normal',
    },

    "&multiLine": {
        control: {
            minHeight: 30
        },
        highlighter: {
            padding: 9,
            // backgroundColor: '#F0F6Fe',
            // color: 'blue'
        },
        input: {
            outline: "none",
            border: "none",
            padding: 9,
              // backgroundColor: '#F0F6Fe',
              // color: 'blue'
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

            '&focused': {
              border: '1px solid black',
           },
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
        '&mention': {
          color: 'red', // Change the color of mentions here
          background: "blue"
        },
      },
    },
};

const defaultMentionStyle = {
  backgroundColor: "blue",
  fontSize: 26
};

  const [mentions, setMentions] = useState([
    {
      id: '1',
      display: 'John Doe',
      url  : 'data:image/jpeg;base64,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'
    },
    {
      id: '2',
      display: 'Jane Smith',
      url : "data:image/jpeg;base64,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"
    },
  ]);

  const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
    setContent(newPlainTextValue); 
  };

  return (
    <>
        <div ref={containerRef}>
            <Card style={{border:'none'}}>
                <Card.Body>
                  <div className='comment-emoji-div d-flex align-items-center'>

                  <div 
                  // ref={mentionInputRef}
                  onClick={handleMentionInputClick}
                  className="input-editor" style={{width: "100%"}}>
                <div className='' style={{width: "100%", borderRadius: "8px",outline: "none"}} >
                    
                       <MentionsInput 
                                  value={content}
                                 onChange={handleInputChange}
                                  placeholder="Write a comment..."
                               style={mentionsInputStyle}
                                 >
                                <Mention
                                 style={defaultMentionStyle}
                                 trigger="@"
                                 data={mentions}
                                 displayTransform={(id, display) => `@${display}`}
                               />
                           </MentionsInput>
                </div>
                </div>
                <div className=''>
                <div >
                <InsertEmoticonIcon onClick={() => setEmojiTogggle((prev) => !prev)} style={{ cursor: "pointer", color: "#fdd231" }}  />
                </div>
                <div className='emoji-Picker_div'>
                      {
                        emojiTogggle && 
                        <EmojiPicker
                        height={400}
                        // width="50%"
                        emojiVersion="5.0"
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
                         emojiStyle={EmojiStyle.APPLE}
                        />
                      }
                </div>
                </div>
                <div><AlternateEmailIcon style={{ cursor: "pointer", color: "black" }}/></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">   
                
            <div>
            <Avatar src={userData?.logo || userData?.profile}>                 

              </Avatar>
            </div>
            <div className="d-flex ">
            
              <div>
                {' '}
                <button  style={{background: "#0014C8", border:'none',borderRadius:'6px',height: "28px",fontSize: "15px"}} className='btn btn-sm btn-primary'  onClick={()=>{
                  handleSubmitComment()
                  handleMentionInputClick()
                  }} >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
                </Card.Body>
            </Card>
        </div>
    </>
  )
}

export default ClubCommentMid
