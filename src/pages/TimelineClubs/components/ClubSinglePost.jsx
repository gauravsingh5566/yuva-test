import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MyProvider } from '../ClubPosts'
import axios from 'axios'
import ClubPostCenter from './ClubPostCenter'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import ClubPostSkeleton from './ClubPostSkeleton'

const ClubSinglePost = () => {

    const {id, postId} = useParams()
    const [post, setpost] = useState('')
  
    const [isLoading, setIsLoading] = useState(false)

    const getPostById = ()=>{
        console.log('inside the funtion')
        setIsLoading(true)
        axios.get(process.env.REACT_APP_API_BASE_URL+"club/postDetail/post/"+postId)
        .then((res)=>{
            setIsLoading(false)
            setpost(res.data.post)
        }).catch((error)=>{
          setIsLoading(false)

            console.log(error)
            toast.error('internal server error')
        })
    }
    useEffect(()=>{
        console.log('insdie the useeffect')
        getPostById()
        window.scrollTo(0, 0);
    },[])
  return (
    <>
  
   {!post?.isLoading? <ClubPostSkeleton/>:post ? <MyProvider clubId={id} post={post}>
              <ClubPostCenter
              isLoading={isLoading}
                post={post}
                singlePostRender={getPostById}
                singlePost={true}
              />
              </MyProvider>:"Nothing here"}


              {/* { !post?.isLoading? <ClubPostSkeleton/>
        
                  :post &&
                    
                       
                    <MyProvider key={post.id} clubId={id} post={post}>
                        <ClubPostCenter
                          key={post.id}
                          post={post}
                        />
                        </MyProvider>
                      
                     
                  
                  } */}
    </>
  )
}

export default ClubSinglePost
