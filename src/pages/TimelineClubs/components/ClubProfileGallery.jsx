import { apiJson } from 'api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

const ClubProfileGallery = ({clickuserDetail}) => {

    const [allImages, setAllImages] = useState([])

   const getAllImages = ()=>{
    apiJson.get(process.env.REACT_APP_API_BASE_URL+'club/getAlluserImages/'+clickuserDetail?.id+'/'+clickuserDetail?.role)
    .then((res)=>{
        setAllImages(res.data.result)
    }).catch((error)=>{
        console.log(error.message)
    })
   }
   useEffect(()=>{
    getAllImages()
   },[clickuserDetail])

  return (
    <>
        {
        allImages?.length === 0 ? (
            <div className='d-flex justify-content-center mt-1'>
        <div style={{height: "50%", width: "70%"}}>
        <img className='h-100 w-100' src={"/ProfileImg/NoPost.svg"} alt='Not Post Yet'/>
        </div>
        </div>
        ) : (
        <div className=''>
            <div className='row'>
            {allImages?.map((img)=>{
                return (
                    <Card key={img} className='m-3' style={{height:'150px', width:'150px', padding:'0'}}>
                        <Card.Body className='h-100' style={{padding:'4px'}} >
                            <img className='rounded-1' style={{height:'100%', width:'100%',
                             objectFit:'cover'}}  
                             src={img} alg='img'/>
                        </Card.Body>
                    </Card>
                )
            })}
            </div>
        </div>
        )
        }
            


            
    </>
  )
}

export default ClubProfileGallery
