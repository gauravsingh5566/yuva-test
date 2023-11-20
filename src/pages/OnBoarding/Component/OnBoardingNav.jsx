import React from 'react'

export const OnBoardingNav = () => {
  return (
    <>
        <div className='d-flex justify-content-between align-items-center'>
            <div style={{width:'20rem'}} className='d-flex align-items-center'>
                    <img
                    className='h-100 w-100'
                     src={'./images/onBoarding/new-logo-yuva.png'}/>
            </div>
            <div className='d-flex justify-content-center me-4'>
                <span
                style={{
                    fontWeight:'500',
                    fontSize:'18px'
                }}
                 classname="me-2">
                 Having Trouble? 
                  </span> 
                &nbsp;
                <span
                    style={{
                        color:'#3800D8',
                        fontWeight:'600',
                        cursor:'pointer',
                        fontSize:'18px'
                    }}
                >Get Help</span>
            </div>
        </div>
    </>
  )
}
