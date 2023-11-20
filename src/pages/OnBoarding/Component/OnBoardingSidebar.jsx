import React from 'react'

// import sideImage from './images/onBoarding/sideImage.jpg'
export const OnBoardingSidebar = () => {
  return (
    <>
        <div
            className="p-0  text-center "
            style={{
                borderRadius: '0 49px 49px 0',
                height:'100vh',
                background:'url(./images/onBoarding/side2.png)',
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundColor: '#e0e0e0',
            }}
        >
            {/* <img 
            style={{
                objectFit:'cover',
                borderRadius: '0 20px 20px 0',
            }}
            className='h-100 w-100 ' 
            src={'./images/onBoarding/sideImage.jpg'} /> */}
        </div>
    </>
  )
}
