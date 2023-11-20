import React from 'react'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
export const DiscussionBoardStudentProfileList = ({ data, handleRemoveUser }) => {
    
    return (
        <>
            <div className='d-flex flex-row '>
                <div style={{ width: "37px", height: "37px", borderRadius: "50%", }}>
                    <img src={data?.profile ? data?.profile : "/ui2.0dashboard/Rectangle 3148.png"} alt={data?.first_name} className="h-100 w-100" />
                </div>
                <span className='mx-2 fs-6 fw-normal'>{`${data?.first_name} ${data?.last_name}`}</span>
            </div>
            <div className="d-flex">
                <span className='rounded-3 py-1 px-2 mx-3' style={{background: "#EDDEFF",color: "#7700FF"}}>{data?.role} </span>
                <span className='cursor-pointer  mt-1' onClick={() =>handleRemoveUser(data?.id)} ><CancelTwoToneIcon color="error"/></span>
            </div>
        </>
    )
}
