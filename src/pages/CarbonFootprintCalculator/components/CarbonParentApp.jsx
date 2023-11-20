import React from 'react'
import { MyCarbonContextProvider } from '../context/carbonContext'
import { CarbonMainSteper } from './CarbonMainSteper'

export const CarbonParentApp = () => {
  return (
    <div>
        <MyCarbonContextProvider>
            <CarbonMainSteper/>
        </MyCarbonContextProvider>
    </div>
  )
}
