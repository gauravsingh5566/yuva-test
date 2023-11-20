import { useGlobalContext } from 'global/context';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InitiateAccount = ({setPopupclass,DuplicateInsDetail,instId}) => {
  const {removeToken,removeUser} = useGlobalContext();
  const navigate = useNavigate();
  const handleOutPop =() =>{
    setPopupclass(false)
    removeToken();
    removeUser();
    navigate('/login');
  }
  let res = DuplicateInsDetail.find((i) =>  i.id === instId)

  return (
    <div>
        <p className='dupliPara mb-5'>Transfer Ownership</p>

        <p className='text-center dupliParaTwo'>To initiate an account transfer please message or call our support team.</p>

        <p className='text-center dupliParaTwo'>Email us at <a href="#" className='text-decoration-none'>{res?.email}</a>  or <br /> call us on <a href="#" className='text-decoration-none'>+91 {res?.phone}</a> </p>

        <button className='processbtn border-0 m-auto d-block text-white mt-5' onClick={handleOutPop}>
            Go to Home
        </button>

    </div>
  )
}

export default InitiateAccount