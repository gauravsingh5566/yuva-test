import React from 'react'
import { MUNmainStepper } from '.'
import { MUContext, MyContextProvider } from '../context/contextMU'

export const MUNParentApp = () => {
  return (
    <>
        <MyContextProvider>
            <MUNmainStepper/>
        </MyContextProvider>
    </>
  )
}
