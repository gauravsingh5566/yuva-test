import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { OnBoardingStudentComponent } from '../studentOnBoard'
import { OnBoardingStudentNav, OnBoardingStudentSidebar } from '.'
import { ToastContainer } from 'react-toastify'
import { Toaster } from "react-hot-toast";

export const OnBoardingStudentMainPage = () => {

    const location = useLocation();
    const student = location.pathname.includes('student-on-boarding')
    const teacher = location.pathname.includes('teacher-on-boarding')
    const institute = location.pathname.includes('institute-on-boarding')
  return (
   <>
   <ToastContainer position="bottom-right" limit={3} autoClose={3000} />
          <Toaster position="bottom-right" />
    <div className='row '>
      <div style={{
        maxWidth:'376px',
      }} className='col-3 d-none d-lg-block'>
        <OnBoardingStudentSidebar/>
      </div>
      <div className='col-12 col-lg-9 mt-3'>
          <div className=''>
            <OnBoardingStudentNav/>
          </div>
          <div className='row justify-content-center'>
            <div className='col-12 col-lg-10'>
              <Outlet/>
            </div>
          </div>
      </div>
    </div>
  
   </>
  )
}
