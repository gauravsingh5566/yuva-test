import { useGlobalContext } from 'global/context';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CancelAccount = ({setPopupclass}) => {
  const {removeToken,removeUser} = useGlobalContext();
 const navigate = useNavigate();
 const handleHide = () =>{
 setPopupclass(false)
 removeToken();
 removeUser();
 navigate('/login');
 }
  return (
    <div>
        <p className='dupliPara mb-5'>Duplicate Account</p>

        <img src="./assets/done.svg" className='d-block m-auto' alt="done" />
        <p className='text-center dupliParaTwo'>You have successfully cancelled your registration steps. Thanks for your interest in Yuvamanthan. We will see you soon!</p>

        <button onClick={handleHide} className='processbtn border-0 m-auto d-block text-white mt-5'>
            Go to Home
        </button>

    </div>
  )
}

export default CancelAccount