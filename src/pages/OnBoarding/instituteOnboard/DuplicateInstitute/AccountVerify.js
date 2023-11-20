import React, { useState } from 'react'
import InitiateAccount from './InitiateAccount'
import PreviousAccount from './PreviousAccount'
import CancelAccount from './CancelAccount'

const AccountVerify = ({setPopupclass,instId,handleNextChild,DuplicateInsDetail}) => {

    const [displayThree, setdisplayThree] = useState(false);
    const [displayFour, setdisplayFour] = useState(false);
    const [displayFive, setdisplayFive] = useState(false);
    const CancelRegistration = ()=>{
        setdisplayThree(true)
    }
    const displayFor = ()=>{
        setdisplayFour(true)
    }
    const displayfv = ()=>{
        setdisplayFive(true)
    }

  return (
    <>
        <div className={`${displayThree? "d-none":'d-block'} ${displayFour? "d-none":'d-block'} ${displayFive? "d-none":'d-block'}`}>
            <p className='dupliPara mb-5'>Duplicate Account</p>
            <div className="firstFiled mb-3 mx-3">

            <input type="radio" onClick={CancelRegistration} name="cancel" id="cancel"/>
            <label htmlFor="cancel" className='px-3 cursor-pointer'>Cancel my registration steps</label>
            </div>
            <div className="firstFiled mb-3 mx-3">

            <input type="radio" onClick={displayFor} name="cancel" id="Initiate" />
            <label htmlFor="Initiate" className='px-3 cursor-pointer'>Initiate an account transfer</label>
            </div>

            <div className="firstFiled mb-3 mx-3">

            <input type="radio" onClick={displayfv} name="cancel" id="previous" />
            <label htmlFor="previous" className='px-3 cursor-pointer'>Contact the admin of the previous account</label>
            </div>
            <button className='processbtn border-0 text-white d-block m-auto mt-5'>Process</button>
        </div>

        {/* ================another components=================== */}

        <div className={`${displayThree? "d-block":'d-none'}`}>
            <CancelAccount setPopupclass={setPopupclass} instId={instId}  />
        </div>

        <div className={`${displayFour? "d-block":'d-none'}`}>
            <InitiateAccount  setPopupclass={setPopupclass} instId={instId}  DuplicateInsDetail={DuplicateInsDetail}  />
        </div>

        <div className={`${displayFive? "d-block":'d-none'}`}>
            <PreviousAccount setPopupclass={setPopupclass} instId={instId}  DuplicateInsDetail={DuplicateInsDetail} />
        </div>

    </>
  )
}

export default AccountVerify