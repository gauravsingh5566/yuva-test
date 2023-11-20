import React from "react";
import { useState, react, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Popup } from "layout/Popup";
import { useGlobalContext } from "global/context";
import { useEffect } from "react";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import AllLikedPost from "./AllLikedPost";
import AllCommentPosts from "./AllCommentPosts";
import ClubActivity from "./ClubActivity";
import ClubProfileAbout from "./ClubProfileAbout";
import ClubAddPost from "./ClubAddPost";
import ClubPostCenter from "./ClubPostCenter";
import { MyProvider } from "../ClubPosts";
import ShowAllClubs from "./ShowAllClubs";
import { ClubContext } from "../TimelineClub";
import ClubProfileTopDetail from "./ClubProfileTopDetail";
import ShowUserClubPosts from "./ShowUserClubPosts";
import ClubProfileGallery from "./ClubProfileGallery";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { UI2DashboardClub } from "pages/UI-2.0-Dashboard/component";

const ClubProfileLeft = ({ isInstitute, userId, existUser }) => {
  const { userData, token, api, apiAuth } = useGlobalContext();
  const role = isInstitute ? "institute" : "student";
  // const {id, role} = userData
  const navigate = useNavigate();

  const { clubDetail, fetchClickUserDetail, clickuserDetail, fetchAllUserComment, fetchAllClickedUserComment, fetchAllLikedPostUser, fetchAllLikedPostClickUser, fetchClickClubUserDetail, clickclubUserDetail } = useContext(ClubContext);

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (existUser) {
      fetchClickUserDetail(userId, role);
      fetchClickClubUserDetail(userId, isInstitute ? "institute" : "student");
    }
  }, [userId]);

  useEffect(() => {
    setValue(isInstitute ? 0 : 1);
  }, []);

  return (
    <>
      <div className="container ">
        <div className=" ">
          <ClubProfileTopDetail clickuserDetail={clickuserDetail} clickclubUserDetail={clickclubUserDetail} />

          <div>
          <div className='d-flex align-items-center shadow rounded-2 hover-shadow-for-componen mt-4' style={{ background: "var(--club-component-backgroun", borderRadius: "16px", height: "58px" }}>
          <div className="mb-1  col-11" style={{ background: "var(--club-component-backgroun", borderRadius: "15px", width: "" }}>
            <Tabs value={value} onChange={handleChange}
            textColor="secondary"
            TabIndicatorProps={{
                style: {
                  backgroundColor: "#914EFF",
                  height: 4,
                  width : 95,
                  marginLeft: "2px"
                }
              }}
            >
              {clickuserDetail?.role === "student" && <Tab label="PROFILE" sx={{ fontSize: "14px", fontWeight: "600" }} />}
              <Tab label="Feeds" sx={{ fontSize: "14px", fontWeight: "600" }} />
              <Tab label="PHOTOS" sx={{ fontSize: "14px", fontWeight: "600" }} />
              <Tab label="ACTIVITY" sx={{ fontSize: "14px", fontWeight: "600" }} />
            </Tabs>
          </div>
          <div className=''>
             <div className='d-flex justify-content-center align-items-center' style={{ height: "40px", width: "40px", background: "#f4f1f6", borderRadius: "8px" }}>
                      <MoreHorizOutlinedIcon sx={{ color: "#999999", background: "#f4f1f6" }} />
                  </div>
              </div>
              </div>
              </div>

          {clickuserDetail?.role === "student" && value === 0 && <ClubProfileAbout userDetail={clickuserDetail} />}
          {((clickuserDetail?.role === "student" && value === 1) || (clickuserDetail?.role === "institute" && value === 0)) && (
            <div>
              <div className="mb-4">{userId == userData?.id && <ClubAddPost userDetail={clickuserDetail} clubDetail={clubDetail} />}</div>

              <div className="mb-4">
                <ShowUserClubPosts userDetail={clickuserDetail} />
              </div>
            </div>
          )}

          {((clickuserDetail?.role === "student" && value === 2) || (clickuserDetail?.role === "institute" && value === 1)) && (
            <div>
              <ClubProfileGallery clickuserDetail={clickuserDetail} />
            </div>
          )}
          {((clickuserDetail?.role === "student" && value === 3) || (clickuserDetail?.role === "institute" && value === 2)) && <ClubActivity />}
        </div>
      </div>
    </>
  );
};

export default ClubProfileLeft;
