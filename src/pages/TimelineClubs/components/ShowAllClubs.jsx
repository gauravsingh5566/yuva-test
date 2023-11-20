import { MyContext } from "pages/EventTimeline/EventTimeline";
import React, { useContext, useRef, useState } from "react";

import { useNavigate } from "react-router";
import { ClubContext } from "../TimelineClub";
import ShowAllClubComponent from "./ShowAllClubComponent";

const ShowAllClubs = () => {
  const navigate = useNavigate()
  const { 
    allClub, getAllClubs,
    getAllStudentClub,allClubStudent, 
    privateClub, publicClub , 
    allClubInstitute,
    getAllInstituteClub
  } = useContext(
    ClubContext
  ) 
  


  return (
    <>
      {/* <ShowAllClubComponent allClub={allClub} getAllClubs={getAllClubs}
       privateClub={privateClub} publicClub={publicClub}
       allClubInstitute={allClubInstitute} 
       getAllInstituteClub={getAllInstituteClub}
       allClubStudent={allClubStudent}
       getAllStudentClub={getAllStudentClub}
       /> */}
    </>
  );
};

export default ShowAllClubs;
