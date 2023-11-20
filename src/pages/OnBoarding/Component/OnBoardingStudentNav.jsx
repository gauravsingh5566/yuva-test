import { useGlobalContext } from 'global/context'
import React from 'react'

export const OnBoardingStudentNav = () => {
  const {userData} = useGlobalContext()
  return (
    <>
      <div className='d-flex user-select-none justify-content-end me-4'>
                <span
                style={{
                    fontWeight:'500',
                }}
                 classname="me-2">
                 Having Trouble? 
                  </span> 
                &nbsp;
                <span
                    style={{
                        color:'#7341e6',
                        fontWeight:'600',
                        cursor:'pointer',
                    }}
                >Get Help</span>
            </div>
            <div>
            <a className='d-flex justify-content-end mt-2 me-4' style={{color: "#3700AC", fontWeight: "300", fontSize: "15px"}} href="">{userData.email}</a>
            </div>
    </>
  )
}
