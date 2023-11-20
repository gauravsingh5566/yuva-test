import React from 'react'
import OnBoardContext, { MyContextProvider } from '../context/onBoardContext'
import { OnBoardingStudentMainPage } from '.'
// import { OnBoardingStudentMainPage } from '../studentOnBoard'

export const OnBoardingStudentApp = () => {
  return (
   <MyContextProvider>
        <OnBoardingStudentMainPage/>
   </MyContextProvider>
  )
}
