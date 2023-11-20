import React, { useContext, useEffect, useState } from 'react'
import AllLikedPost from './AllLikedPost'
import AllCommentPosts from './AllCommentPosts'
import axios from 'axios'
import { UserContext } from 'global/context'
import { ClubContext } from '../TimelineClub'
import ShowAllClubs from './ShowAllClubs'
import Tabs from '@mui/material/Tabs';
  import Tab from '@mui/material/Tab';
  import Box from '@mui/material/Box';
  import "../style/clubStyle.css"

const ClubActivity = () => {
  const{userData} = useContext(UserContext)
  const { allLikedPost, fetchAllLikedPostUser, userAllPost, allUserComment,fetchAllUserComment } = useContext(ClubContext);
  console.log("allLikedPost", allLikedPost);

  const [switchButton, setSwitchButton] = useState('likes');
  const [showAllComment, setShowAllComment] = useState(false)
  const [showAllLikes, setShowAllLikes] = useState(false)
  const [value, setValue] = React.useState('likes');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchAllLikedPostUser();
    fetchAllUserComment()
  }, []);

  // useEffect(() => {
  //   fetchAllLikedPostUser();
  // }, [userAllPost]);

  console.log("allUserComment", allUserComment);
  return (
    <>
        
        <div className='row mb-4 justify-content-center align-items-center'>
          <div className=' col-12'>
              <ShowAllClubs/>
          </div>
        </div>

        <div className='d-flex align-items-center shadow rounded-2 hover-shadow-for-componen mt-4' style={{ background: "var(--club-component-backgroun", borderRadius: "16px", height: "58px" }}>
          <div className="mb-1  col-11" style={{ background: "var(--club-component-backgroun", borderRadius: "15px", width: "" }}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        // indicatorColor="secondary"
        // aria-label="secondary tabs example"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#914EFF",
            height: 4,
            width : 90,
            marginLeft: "7px"
          }
        }}
      >
        <Tab value="likes" label="Likes" sx={{ fontSize: "14px", fontWeight: "600" }}/>
        <Tab value="comments" label="Comments" sx={{ fontSize: "14px", fontWeight: "600" }}/>
      </Tabs>
    </Box>
    </div>
    </div>
       
        <div className='p-4 shadow rounded-2 hover-shadow-for-componen mt-2'>
          {
           value==='likes' && allLikedPost?.length === 0 ? (
              <>
               <div className='d-flex justify-content-center mt-1'>
        <div style={{height: "50%", width: "70%"}}>
        <img className='h-100 w-100' src={"/ProfileImg/NoPost.svg"} alt='Not Post Yet'/>
        </div>
        </div>
              </>
            ) : (
              <>
             { value==='likes' && <div className='rounded-4   p-1 mb-4 '  >
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h4 style={{userSelect:'none', cursor:'pointer',}}>All Liked Posts</h4>
                {
                  allLikedPost?.length > 4 &&
                <span style={{userSelect:'none', cursor:'pointer', color: "grey",}} className='fw-bold' onClick={()=>setShowAllLikes(!showAllLikes)}> {showAllLikes?'Show Less...':'Show All...'}</span>
                }
                </div>
                <div className='scroll-comment-like-container' style={{maxHeight:'517px'}}>
                  <AllLikedPost showAllLikes={showAllLikes} />
                </div>
            </div>}
        </>
            )
          }
      
          
          {
           value==='comments' && allUserComment?.length === 0 ? (
              <>
              <div className='d-flex justify-content-center mt-1'>
        <div style={{height: "50%", width: "70%"}}>
        <img className='h-100 w-100' src={"/ProfileImg/NoPost.svg"} alt='Not Post Yet'/>
        </div>
        </div>
        </>
            ) : (
              <>
              { value==='comments' && <div className='rounded-4  p-1'   >
                          <div className=' d-flex justify-content-between align-items-center mb-4'>
                            <h4 style={{userSelect:'none', cursor:'pointer'}}>All Comments</h4>
                            {
                              allUserComment?.length > 4 &&
                              <span style={{userSelect:'none', cursor:'pointer',color: "grey"}} className='fw-bold' onClick={()=>setShowAllComment(!showAllComment)}> {showAllComment?'Show Less...':'Show All...'}</span>
                            }
                          </div>
                          <div class='scroll-comment-like-container' style={{maxHeight:'517px'}}>
                            <AllCommentPosts showAllComment={showAllComment}/>
                          </div>
                </div> }
                  </>
            )
          }
            </div>
    </>
  )
}

export default ClubActivity
