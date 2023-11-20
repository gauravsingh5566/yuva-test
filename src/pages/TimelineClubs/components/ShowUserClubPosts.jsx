import React, { useContext, useEffect, useState } from 'react'
import { ClubContext } from '../TimelineClub'
import ClubPostCenter from './ClubPostCenter'
import { MyProvider } from '../ClubPosts'
import ClubPostSkeleton from './ClubPostSkeleton'

const ShowUserClubPosts = ({ userDetail }) => {
  const { fetchAllUserPost, userAllPost, fetchAllClickedUserPost, clickUserAllPost,isLoadingClubProfile ,setIsLoadingClubProfile} = useContext(ClubContext)
  const [showNoPostMessage, setShowNoPostMessage] = useState(false);


  useEffect(() => {
    fetchAllClickedUserPost(userDetail.id, userDetail.role);
  }, [userDetail]);

  useEffect(()=>{
    setIsLoadingClubProfile(true)
  },[])

  useEffect(() => {
    if (!isLoadingClubProfile) {
      const timeout = setTimeout(() => {
        setShowNoPostMessage(true);
      }, 400); 

      return () => clearTimeout(timeout); 
    }
  }, [isLoadingClubProfile]);

  return (
    <>
      {isLoadingClubProfile ? (
        <ClubPostSkeleton />
      ) : clickUserAllPost?.length > 0 ? (
        clickUserAllPost?.map((post, index) => (
          <MyProvider key={post.id} post={post}>
            <ClubPostCenter key={post.id} post={post} index={index} />
          </MyProvider>
        ))
      ) : showNoPostMessage && clickUserAllPost?.length===0 &&(
        <div className='d-flex justify-content-center'>
        <div style={{height: "50%", width: "70%"}}>
        <img className='h-100 w-100' src={"/ProfileImg/NoPost.svg"} alt='Not Post Yet'/>
        </div>
        </div>
      )}
    </>
  );
};

export default ShowUserClubPosts;
