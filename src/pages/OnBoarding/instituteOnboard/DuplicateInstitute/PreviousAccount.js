import { useGlobalContext } from "global/context";
import React from "react";
import { useNavigate } from "react-router-dom";

const PreviousAccount = ({setPopupclass,DuplicateInsDetail,instId}) => {
  const {removeToken,removeUser} = useGlobalContext();
  const navigate = useNavigate()
  const handleOutPop =() =>{
    setPopupclass(false)
    removeToken();
    removeUser();
    navigate('/login');
  }
  let res = DuplicateInsDetail.find((i) =>  i.id === instId)
  return (
    <div>
      <p className="dupliPara mb-5">Contact Admin</p>

      <div className="m-0 p-0 d-flex align-content-center border previousAccountThank mb-3">
        <img src="./assets/Clipboard.svg" alt="clipboard" className="px-2" />
        <p className="pt-3">
          Thank you for your interest in Yuvamanthan. You may connect with the
          admin of the previous account here and request them to transfer the
          account to you
        </p>
      </div>

      <div className="row p-0 py-3 px-3">
        <div className="col-lg-3">
          <img src={res?.insLogo} alt="insimg" />
        </div>
        <div className="col-lg-9 para collegeItems">
          <p className="d-flex justify-content-between pe-5">
            {res?.institute_name} <span>{res?.no_of_student} Students</span>
          </p>
          <p className="collegeparaFirst">
           {res?.address}
          </p>
          <div className="d-flex justify-content-between pe-5">
            <h6>
              Admin
      
              <span className="collegeItemsSpan">: {res?.name}</span>
            </h6>
            <h6>
              Designation
              <span className="collegeItemsSpan">: {res?.designation}</span>
            </h6>
          </div>
        </div>
      </div>
      <button className="processbtn border-0 text-center d-block m-auto text-white mt-5" onClick={handleOutPop}> Raise Request </button>
    </div>
  );
};

export default PreviousAccount;
