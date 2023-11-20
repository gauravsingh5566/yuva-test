import React from 'react'
import { MyContextProvider } from '../context/contextModelUn'
import { ModelUnComponent } from '.'
import '../style/modelUn.css'
export const ModelUnMainComponent = () => {
  return (
    <MyContextProvider>
        <ModelUnComponent/>
    </MyContextProvider>
  )
}
