import React from 'react'
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ModeCommentIcon from "@mui/icons-material/ModeComment";


const ClubPostSkeleton = () => {
  return (
    <>
       <div className='row justify-content-center align-items-center mb-2'>
          <div className='col-12 ' style={{
     
    }}>
          <Card
        style={{
          border: "none",
      }}
        className="mb-2 "
      >
        <Card.Body>
          <div className="containr">
            <div
              className="top d-flex  mb-3"
              style={{ width: "100%" }}
            >
              <div
                style={{ width: "44px", height: "44px", marginRight: "20px" ,cursor:'pointer', userSelect:'none'}}
                
              >
             {<Skeleton  height={40} width={40} circle={true} />
             }
                 
              </div>
        {  <Skeleton count={2} width={300} height={10}  style={{ marginBottom: '10px' }} />
          }
            </div>
      {   <Skeleton  width={'100%'} height={400}  style={{ marginBottom: '10px' }} />  }
            
          </div>
        </Card.Body>
      </Card>
          </div>
       </div> 

    </>
  )
}





export default ClubPostSkeleton