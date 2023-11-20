import moment from 'moment'
import React, { useState } from 'react'
const style1 = {
    background: "#C5FDCB",
     height: "23px",
    textAlign: "center" ,
    color:"#1B6700",
    fontSize:12,
    fontWeight:500
 
}
const style2 = {
    background: "#FFEBEB",
     height: "23px",
    textAlign: "center" ,
    color:"#67000075",
    fontSize:12,
    fontWeight:500

}
const style3 = {
    background: "#CAC5FD",
     height: "23px",
    textAlign: "center" ,
    color:"#080067",
    fontSize:12,
    fontWeight:500
}
export const DiscussionBoardUpcomingCard = ({item}) => {
    const [btnText,setBtnText] = useState('Request')
  return (
    <>
    <div className="card border border-0 w-100 " style={{ background: "#F8F4FC" }}>
                <div className="card-body ">
                    <div className="d-flex justify-content-between">
                        <div className="card-title fs-14 fw-semibold w-75">{item?. discussion_title}</div>
                       
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <p className="fs-12 text-danger pt-3">{moment(item?.start_date, 'YYYY/MM/DD').format('DD MMM, YY')}</p>
                        <button className='rounded-2 px-3 py-2' onClick={()=>setBtnText("Accept")} style={btnText ==="Accept" ? style1 : btnText ==="Request" ? style3 : style2} >{btnText}</button>
                    </div>
                </div>
            </div>
    </>
  )
}
