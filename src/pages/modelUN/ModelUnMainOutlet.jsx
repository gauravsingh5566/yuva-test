import React from 'react'
import { Outlet } from 'react-router-dom'
import { MyContextProvider } from './context/contextModelUn'

 const ModelUnMainOutlet = () => {
  return (
    <>
     <MyContextProvider>
        <Outlet/>
     </MyContextProvider>
    </>
  )
}
export default ModelUnMainOutlet
