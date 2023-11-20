import { Avatar } from '@mui/material'
import axios from 'axios'
import { UserContext } from 'global/context'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ClubContext } from '../TimelineClub'
import { useNavigate } from 'react-router-dom'

const AllCommentPosts = ({showAllComment}) => {
    const navigate = useNavigate();
    const {userData} = useContext(UserContext)
    const {allUserComment,fetchAllUserComment} = useContext(ClubContext)

   
    

    useEffect(()=>{
        fetchAllUserComment();
    },[])
    
    const boolComment = true

     const addElipsis = (str, limit) =>{
        return str.length > limit ? str.substring(0, limit) + "..." : str;
    }

  return (
    <>
    
        {
            (showAllComment ? allUserComment:allUserComment?.slice(0, 4))?.map((comment)=>{
                return (
                    <div key={comment.id} className='m-2'  >
                    <Card style={{cursor:'pointer', border:'none'}} onClick={()=>{
                        navigate('/clubs/1/post/'+comment.postId)
                    }} className='mb-2' >
                        <Card.Body className='h-100' style={{ overflow:'hidden'}}>
                            <div className='row h-100'>
                                <div className=' d-flex flex-column col-8 h-100 '>
                                <div className=' top  d-flex h-100 '>
                                        <div className='left me-3 h-100'>
                                                <Avatar style={{
                                                    height:'31px',width:'31px'
                                                }} src={comment.logo}>
                                                    {
                                                        !comment.logo && comment.commentBy &&
                                                        <span style={{ fontSize: '20px' }}>
                                                            {comment.commentBy.charAt(0).toUpperCase()}
                                                        </span>
                                                    }
                                                </Avatar>
                                        </div>
                                        <div className='right'>
                                            <div>
                                                <p className="text-capitalize" style={{color: "#050505"}} >You Commented</p>
                                                <label style={{fontSize:'12px'}} className=''>{moment(comment.createdAt).fromNow()} </label>
                                            </div>
                                        </div>
                                </div>
                                <div className='h-100 bottom ms-5'>
                                        <label className='fw-normal  ' style={{fontSize: "15px"}}>{addElipsis(comment.content, 45)}</label>
                                </div>
                                </div>
                                <div className='col-4 text-end ' >
                                    {/* <img src={"https://picsum.photos/id/237/200/300"} class="h-100 w-100" alt="..." /> */}
                                </div>
                            </div>
                    <hr className='m-0 p-0'/>

                        </Card.Body>
                    </Card>
                    </div>
                )
            })
        }
    </>
  )
}

export default AllCommentPosts
