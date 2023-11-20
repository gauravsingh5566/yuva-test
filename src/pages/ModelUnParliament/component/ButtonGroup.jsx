import React from 'react'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';

export const ButtonGroup = ({handleNext,btnName,stepCount,handlePrev,btnPrev}) => {
  return (
    <>
    <div className="d-flex justify-content-between my-4">
            <button className='fs-5 fw-500' style={{color:"#808080"}} onClick={handlePrev}>
              {btnPrev}
            </button>

            <button
              onClick={handleNext}
              className="btn-onboard-fill"
            >
             {btnName}
               <ArrowRightAltTwoToneIcon />
            </button>
          </div>
    </>
  )
}
