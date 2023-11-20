import React from 'react'
import { HackathonProvider } from '../context/contextHackathon'
import { Outlet } from 'react-router-dom'

export const ModelHackathonMainOulet = () => {
  return (
    <>
    <HackathonProvider>

    <Outlet />
    </HackathonProvider>
    </>
  )
}
