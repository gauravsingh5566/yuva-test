import React from 'react'

const StatusBadge = ({meeting}) => {
    return (<>{meeting?.meeting_status === "started" ? <small className='bg-light-green-grad rounded-1 fw-light p-1 px-2 text-white'>Live</small> : <small className='bg-light-maroon-grad rounded-1 fw-light p-1 px-2 text-white'>{meeting?.meeting_status}</small>}</>
    )
}

export default StatusBadge