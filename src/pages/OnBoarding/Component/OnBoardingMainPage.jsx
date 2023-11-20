import React from 'react'
import { OnBoardingComponent,OnBoardingNav,OnBoardingSidebar } from '.'
import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "../style/OnBoardingStyle.css"


export const OnBoardingMainPage = () => {
  return (
    <>
     <ToastContainer position="bottom-right" limit={3} autoClose={3000} />
          <Toaster position="bottom-right" />
     <div className='row justify-content-between'>
        <div className='col-3 pr-4'>
          <OnBoardingSidebar/>
        </div>

        <div className='col-8 mt-4 px-4'>
          <div className='d-flex flex-column'>
            <div className='mb-50'>
              <OnBoardingNav/>
            </div>

            <div className='row'>
                <div className='col-12 col-lg-10'>
                  <Outlet/>
                </div>
                
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

 
