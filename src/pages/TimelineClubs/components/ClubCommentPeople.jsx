import { Avatar } from "@mui/material";
import { marginRight } from "@xstyled/styled-components";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
const ClubCommentPeople = ({comment, post,isLoading}) => {

  const [user, setUser] = useState({})

  useEffect(()=>{
    setUser(comment?.userDetail)
  },[comment])




  return (
    <>
      <div className="d-flex justify-content-between mb-1">
        <div className="d-flex">
        <div style={{width:'40px', height:'40px', marginRight:'12px'}} className="mr-4">
     {isLoading?<Skeleton  height={40} width={40} circle={true} />:     <Avatar style={{width:'100%', height:'100%', borderRadius:'50%', objectFit:'contain'}}
            src={user?.logo ?? user?.profile}
            alt={"img"}
            onError={(e)=>{
              e.target.src = "https://w7.pngwing.com/pngs/313/964/png-transparent-cartoon-animated-series-randomness-girl-cartoon-hand-illustrator-fictional-character.png"
            }}
          />}
        </div>
        <div>
     {   user?.institution_name? <h6 style={{fontSize:'15px'}}>{user?.institution_name}</h6>
            :<h6 style={{fontSize:'15px'}}>{user?.first_name+" "+user?.last_name}</h6>}
            <label style={{fontSize:'10px'}}>{moment(comment.createdAt).fromNow()}</label>
        </div>
        </div>
        <div style={{marginRight:'12px'}}>
            ...
        </div>
      </div>
      <div style={{paddingLeft:'30px'}}>
   {isLoading?
    <Skeleton count={3} width={700} height={10}  style={{ marginBottom: '10px' }} />
   :     <div className="ms-4"><p1 style={{fontSize:'13px',color: "#050505"}}>{comment.content}</p1></div>}
      </div>
      <hr/>
    </>
  );
};

export default ClubCommentPeople;
