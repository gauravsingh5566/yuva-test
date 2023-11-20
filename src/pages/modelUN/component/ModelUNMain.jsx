import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ModelUNMain = () => {
const [eventDetail,setEventDetail] = useState({})
const [isRegis,setIsRegis] = useState(false);
const {userData} = useGlobalContext()
 const geteventDetail = ()=>{
  console.log('userData?.role',userData?.role==='institute'?userData?.id:userData?.instituteId)
  const id=userData?.role==='institute'?userData?.id:userData?.instituteId
    apiJson('api/v2/modelUn-student/getEventDetails/institute/'+id)
    .then((res)=>{
      setEventDetail(res?.data?.result)
      if(res?.data?.result?.id){
        setIsRegis(true)
      }else{
        setIsRegis(false)
      }
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }
  useEffect(() => {
   geteventDetail();
   },[] )
   console.log(eventDetail,"=====")
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-4">
        <div className='d-flex py-3 justify-content-between align-items-center'>
                <span className='fs-35px fw-400 col-4'>
                REGISTRATION FOR YUVAMANTHAN MODEL UNITED NATIONS
                </span>
                <div className='col-6 justify-content-center'>
                    <img src='/images/model-UN/globe.png'/>
                </div>
            </div>
        {!isRegis && <div onClick={() => navigate('/model-un/registration')} className='mb-4'>
          <button style={{
            textAlign: 'center',
            height: '41px',
            width: '164px',
            background: '#9700DE',
            color: 'white',
            borderRadius: '8px',
          }}>Register</button>
        </div>}
         
      
        <div className="d-flex flex-column">
          <div className="col-10">
            <div className="mb-3">
              <span>
                Yuvamanthan Model Youth Parliament serves as an exceptional
                platform designed to impart a transformative learning experience
                to the future citizens of India. With a vision extending to the
                year 2047, when India celebrates its centenary of independence,
                this initiative aims to acquaint students with the functioning
                of a real parliament. It provides a systematic forum,
                facilitated by seasoned moderators, where national issues are
                simulated and discussed on a grand scale.
              </span>
            </div>
            <div className="mb-3">
              <span>
                This immersive platform empowers students and young participants
                to delve into current economic, socio-political, and cultural
                matters. Through a mock simulation of parliamentary proceedings,
                students assume the roles of Lok Sabha and Rajya Sabha members,
                collaboratively devising potential solutions.
              </span>
            </div>
            <div className="mb-3">
              <span>
                By actively participating in the model youth parliament
                sessions, YMYP focuses on grooming a youth-centric approach to
                governance training. Students undergo rigorous preparation,
                testing, and engagement in real-life political agenda meetings,
                where they express opinions and propose resolutions. Through
                this process, they develop confidence, resilience, and
                exceptional communication skills for the betterment of the
                nation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
