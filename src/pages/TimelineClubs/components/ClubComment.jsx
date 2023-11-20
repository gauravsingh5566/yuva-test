import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import ClubCommentPeople from './ClubCommentPeople'
import ClubCommentMid from './ClubCommentMid'
import { ClubContext } from '../TimelineClub'
import { ClubPostContext } from '../ClubPosts'
import { toast } from 'react-toastify'
import { apiJsonAuth } from 'api'
import ClubPostCommentSkeleton from './ClubPostCommentSkeleton'
import "../style/clubStyle.css"


const ClubComment = ({post, page,single,setUpdatedCommentCount ,commentLoading}) => {
  const {postDetail,fetchpostDetail,postComments,postDetailIsLoading} = useContext(ClubPostContext)
  const {fetchComment, allComment} = useContext(ClubContext);
  const [userComments, setUserComment] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  
  const addCommentClubPost = (body)=>{
    // commentLoading(true)
    setIsLoading(true)
    apiJsonAuth.post('club/updatePostComment/post/'+post.id,body)
    .then((res)=>{
    setIsLoading(false)

      setUserComment([...userComments,res.data.newComment])
      setUpdatedCommentCount(res.data.commentCount)
      toast.dismiss();
      toast.success("Comment Succesfully")
      // commentLoading(false)

    }).catch((error)=>{
    setIsLoading(false)

      console.error(error.message);
      toast.error(error.message)
      // commentLoading(false)

    })
  }
  const fetchPostComment = ()=>{
    // commentLoading(true)
    setIsLoading(true)

    apiJsonAuth.get('club/getAllComment/post/'+post.id)
    .then((res)=>{
    setIsLoading(false)

      // console.log("insidet the fetch;ostllllllllllllllllll", )
    // commentLoading(false)
      setUserComment(res.data.allComment)
    }).catch((error)=>{
    setIsLoading(false)

    // commentLoading(false)

      toast.error("Internal server error")
    })
  }

 useEffect(()=>{
  // if(post?.allComments.length>0){
  //   setUserComment(post.allComments)
  // }
  fetchPostComment()
 },[])




  return (
    <>
         <Card style={{
          // background:'var(--club-component-background',
          border:'none',
          // height: "495px"
         }}  className='p-3 hover-shadow-for-component border-1 '>
         <Card.Title style={{color: "#727477"}} className='fw-bold'>
            Comments
         </Card.Title>
            <Card.Body>
                <div>
                    <div className='scroll-postComment-container' style={{maxHeight:'260px'}}>
                    {
                     !isLoading && userComments?.map((comment, index)=>{
                        return (
                        <ClubCommentPeople key={comment.id} comment = {comment} post = {post} />
                        )
          
                      })
                    }
                    {
                      isLoading && <ClubPostCommentSkeleton/>
                    }
                    </div>
                    <div className='mid'>
                        <ClubCommentMid post={post} page={page} single={single} postFunction={addCommentClubPost}/>
                    </div>
                    <div className='bottom'>

                    </div>
                </div>
            </Card.Body>
          </Card>
    </>
  )
}

export default ClubComment
