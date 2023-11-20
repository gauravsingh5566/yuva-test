import React, { useEffect, useState } from "react";

import AccountVerify from "./AccountVerify";

const DuplicateAccount = ({popupclass,setPopupclass,instId,DuplicateInsDetail,handleNextChild}) => {

  const [displayTwo, setdisplaytwo] = useState(false);
  const [details,setDetails] = useState({})
  const duplicate=()=>{
    let res = DuplicateInsDetail.find((i) =>  i.id === instId)
    setDetails(res);
  }
useEffect(()=>{
  duplicate()
},[instId])

  const handleOutPop =() =>{
    setPopupclass(false)
    handleNextChild()
    
  }
  const getinputValue = () => {
    setdisplaytwo(true);
  };
  return (
    <>
      <div className={`${displayTwo ? "d-none" : null}`}>
        <p className="dupliPara">Duplicate Account</p>
        <div className="row p-0 py-3 px-3">
          <div className="col-lg-3">
            <img src={details?.insLogo} alt="insimg" />
          </div>
          <div className="col-lg-9 para collegeItems">
            <p className="d-flex justify-content-between pe-5">
             {details?. institute_name} <span>{details?.no_of_student} Students</span>
            </p>
            <p className="collegeparaFirst">
              {details?.address}
            </p>
            <div className="d-flex justify-content-between pe-5">
              <h6>
                Website{" "}
                <span className="collegeItemsSpan">
                  : {details?.website_link}
                </span>
              </h6>
            </div>
          </div>
        </div>

        <div className="px-3 collegeInfo d-flex justify-content-between">
          <div>
            <h6>
              Admin :<span className="collegeItemsSpan">{details?.name}</span>
            </h6>
            <h6>
              Type of Institute :
              <span className="collegeItemsSpan">Sourabh Sharma</span>
            </h6>
            <h6>
              Location :<span className="collegeItemsSpan">Sourabh Sharma</span>
            </h6>
            <h6>
              Phone :<span className="collegeItemsSpan">{details?.phone}</span>
            </h6>
          </div>
          <div>
            <h6>
              Designation :
              <span className="collegeItemsSpan">{details?.designation}</span>
            </h6>
            <h6>
              Medium of Education :
              <span className="collegeItemsSpan">{details?.medium_of_education}</span>
            </h6>
            <h6>
              Affiliation :
              <span className="collegeItemsSpan">{details?.Affiliation}</span>
            </h6>
            <h6>
              Email :<span className="collegeItemsSpan">{details?.email}</span>
            </h6>
          </div>
        </div>

        <div className="fields">
          <div className="firstFiled">
            <input type="radio" name="Account" id="Account" checked />
            <label htmlFor="Account" className="px-3">
              No, the above accounts are not from my institute.
            </label>
          </div>

          <div className="secondField">
            <input
              type="radio"
              name="Account"
              onClick={getinputValue}
              id="alreadyAccount"
            />
            <label htmlFor="alreadyAccount" className="px-3">
              Yes, it seems my institute already has a Yuvamanthan account
            </label>
          </div>
        </div>
        <button className="mt-4 processbtn border-0 d-block m-auto text-white" onClick={handleOutPop}>
          Proceed to create new account
        </button>
      </div>

      <div className={`${displayTwo ? "d-block" : "d-none"}`}>
        <AccountVerify  setPopupclass={setPopupclass} instId={instId}  DuplicateInsDetail={DuplicateInsDetail}   handleNextChild={handleNextChild}/>
          
      </div>
    </>
  );
};

export default DuplicateAccount;
