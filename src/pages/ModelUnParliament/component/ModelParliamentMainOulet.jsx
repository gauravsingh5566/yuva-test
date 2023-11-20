import React from 'react'
import { Outlet } from 'react-router'
import { ParliamentProvider } from '../context/contextParliament'

export const ModelParliamentMainOulet = () => {
  return (
    <>
    <ParliamentProvider>

    <Outlet />
    </ParliamentProvider>
    </>
  )
}
