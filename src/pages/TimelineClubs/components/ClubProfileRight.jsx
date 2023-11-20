import React from 'react'
import ClubProfileRightComponent from './ClubProfileRightComponent'
import ClubProfileRightTrendingBlogs from './ClubProfileRightTrendingBlogs'
import { PublicClubComponents } from './PublicClubComponents'
import { MyContext } from "pages/EventTimeline/EventTimeline";
import { useContext, useRef, useState,useEffect } from "react";
import { UserContext } from 'global/context';
import axios from 'axios';
import { PrivateClubComponents } from './PrivateClubComponents';



const ClubProfileRight = () => {
  const { userData, token } = useContext(UserContext);
  const { id, role, type } = userData;
  const [allClub, setAllClub] = useState([]);
  const [privateClub, setPrivateClub] = useState([]);
  const [publicClub, setPublicClub] = useState([])
  const [allClubInstitute, setAllClubInstitute] = useState([]);
  const [allClubStudent, setAllClubStudent] = useState([]);

  const getPrivateClub = ()=>{

    if(userData.role==='institute'){
        axios.get(process.env.REACT_APP_API_BASE_URL+"club/private/institute/"+userData.id)
      .then((res)=>{
        setPrivateClub(res.data);
      }).catch((error)=>{
        console.log(error.message);
      })
    }else if(userData.role==='student'){
        axios.get(process.env.REACT_APP_API_BASE_URL+"club/private/institute/"+userData.instituteId)
      .then((res)=>{
        setPrivateClub(res.data);
      }).catch((error)=>{
        console.log(error.message);
      })
    }
  }

  useEffect(()=>{
    if(userData){
      getPrivateClub()
    }
  },[userData])

  const getAllInstituteClub = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club/club-institute")
    .then((res)=>{
      // console.log("res.data of timeinline",res.data)
      setAllClubInstitute(res.data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
  const getAllStudentClub = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club/club-student")
    .then((res)=>{
      // console.log("res.data of timeinline",res.data)
      setAllClubStudent(res.data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
  const getAllClubs = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club")
    .then((res)=>{
      setAllClub(res.data);
      // getPrivateClub(res.data)
      getPublicClubs(res.data);
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
  const getPublicClubs = (all)=>{
    let club = []
    
    club = all.filter((club)=>{
      return club.type == 'public';
    })
    
    setPublicClub(club)
  }
  return (
    <>
      <div className='mb-4'>
        <ClubProfileRightComponent/>
      </div>
     <div className='mb-4'>
       <ClubProfileRightTrendingBlogs/>
     </div>
     <div className='mb-4'>
      <PublicClubComponents allClub={allClub} getAllClubs={getAllClubs} privateClub={privateClub} publicClub={publicClub} allClubInstitute={allClubInstitute} getAllInstituteClub={getAllInstituteClub} allClubStudent={allClubStudent} getAllStudentClub={getAllStudentClub}/>
     </div>
     <div className='mb-4'>
      <PrivateClubComponents allClub={allClub} getAllClubs={getAllClubs} privateClub={privateClub} publicClub={publicClub} allClubInstitute={allClubInstitute} getAllInstituteClub={getAllInstituteClub} allClubStudent={allClubStudent} getAllStudentClub={getAllStudentClub}/>
     </div>
    </>
  )
}

export default ClubProfileRight
