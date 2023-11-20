import React, { useEffect, useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { useNavigate } from 'react-router-dom'
import moment from 'moment';
const style3 = {
    background: "#CAC5FD",
    height: "23px",
    textAlign: "center",
    color: "#080067",
    fontWeight: 500

}
export const DiscussionBoardLiveCard = ({ item }) => {
    const navigate = useNavigate();
    const [timeAgo, setTimeAgo] = useState('');
    var date = moment();
    var currentTime = date.format('HH:mm')
    let eventStartTime = moment(item?.start_time, 'h:mm a').format('HH:mm');
    let eventEndTime = moment(item?.end_time, 'h:mm a').format('HH:mm')

    let Indicator = eventStartTime <= currentTime && currentTime <= eventEndTime ? "live" : currentTime ===eventEndTime ? "denied" : "break"


  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = moment(item.start_time, 'HH:mm:ss');
      const currentTime = moment();
      const difference = currentTime.diff(startTime, 'seconds');

      if (difference < 60) {
        setTimeAgo(`${difference} seconds ago`);
      } else if (difference < 3600) {
        const minutes = Math.floor(difference/ 60);
        setTimeAgo(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
      } else {
        const hours = Math.floor(difference / 3600);
        setTimeAgo(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item.start_time]);


  //Handle navigate to the discussion message board
    const handleNavigate = (id) => {
      if(id){
        navigate(`/new-dashboard/discussion-chat-room/${id}`)
      }else{
        navigate(`/new-dashboard/discussion-board`)
      }
  
    }
    return (
        <>
            <div className="card border border-0  " style={{ background: "#F8F4FC" }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="card-title fs-14">{item?.discussion_title}</div>
                        {Indicator ? (<FiberManualRecordIcon sx={{ color: Indicator === "live" ? "#009715" : Indicator === "denied" ? "#A40202" :  "#F3AF00" }} />) : null}

                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <p className="fs-12 text-danger pt-3">{timeAgo}</p>
                        <button className='rounded-2 px-3 py-2 fs-12' style={style3} onClick={() => handleNavigate(item?.id,)}>Join</button>
                    </div>
                </div>
            </div>
        </>
    )
}
