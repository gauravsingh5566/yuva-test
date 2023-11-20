import { MyContext } from "pages/EventTimeline/EventTimeline";
import React, { useContext, useRef, useState } from "react";
import { Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { UserContext } from "global/context";
import { toast } from "react-toastify";
import { apiAuth } from "api";
import { useNavigate } from "react-router";
import { ClubContext } from "../TimelineClub";
import ShowAllClubComponent from "./ShowAllClubComponent";

const ShowAllClubsTimeLIne = () => {
  const navigate = useNavigate();
  const { allClub, getAllClubs, allClubStudent, getAllStudentClub, privateClub, publicClub, allClubInstitute, getAllInstituteClub } = useContext(MyContext);

  return (
    <>
      <ShowAllClubComponent allClub={allClub} getAllClubs={getAllClubs} privateClub={privateClub} publicClub={publicClub} allClubInstitute={allClubInstitute} getAllInstituteClub={getAllInstituteClub} allClubStudent={allClubStudent} getAllStudentClub={getAllStudentClub} />
    </>
  );
};

export default ShowAllClubsTimeLIne;
