import React from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const style3 = {
    background: "#CAC5FD",
     height: "23px",
    textAlign: "center" ,
    color:"#080067",
    fontWeight:500
}
export const DiscussionBoardPastCard = ({item}) => {
    const navigate = useNavigate();
    const handleNavigate = (item) => {
        switch(item) {
            case "Join":
                
             navigate("/new-dashboard/discussion-chat-room")
              break;
            case "View":
                navigate("/new-dashboard")
              break;
              
            default:
             
            
        
          }
    }
    return (
        <>
            <div className="card border border-0 w-100 " style={{ background: "#F8F4FC" }}>
                <div className="card-body ">
                        <div className="card-title fs-14 ">{item?.discussion_title}</div> 
                    <div className="d-flex justify-content-between mt-3">
                        <p className="fs-12 text-danger pt-3">{moment(item?.start_date, 'YYYY/MM/DD').format('DD MMM, YY')}</p>
                        <button className='rounded-2 fs-12 px-3 py-2'  style={style3} onClick={()=>handleNavigate(item?.btnText)}>View</button>
                    </div>
                </div>
            </div>
        </>
    )
}
