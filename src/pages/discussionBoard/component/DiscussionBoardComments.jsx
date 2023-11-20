import moment from 'moment'
import React from 'react'

export const DiscussionBoardComments = ({data}) => {
  return (
    <>
      <div className='mx-2' style={{ width: "37px", height: "37px", borderRadius: "50%", }}>
            <img src={data?.profile} alt={data?.name} />
          </div>
          <div className="d-flex flex-column">
               <div className='d-flex'>
                <p style={{fontSize:"13px", fontWeight:"600"}}>{data?.name}</p>
                <span style={{color:"#ACACAC",fontSize:"13px", fontWeight:"500" ,marginLeft:8}}>{moment(data?.time).format('LT')}</span>
               </div>
               <p  style={{color:"#292929", fontSize:"13px", fontWeight:"300",textAlign: "justify"}}>{data?.message}</p>
          </div>
    </>
  )
}
