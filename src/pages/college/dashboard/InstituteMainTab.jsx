import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useGlobalContext } from "global/context";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Edit, Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import ProfileCard from "./components/ProfileCard";
import Coordinators from "./Coordinators";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { apiAuth } from "api";
import useError from "lib/errorResponse";
import SocialUploadContent from "./components/SocialUploadContent";
import moment from "moment";
import { DashboardHead } from "components";
import { Flex, Text, Button } from "@radix-ui/themes";

const InstituteMainTab = () => {
  const [resourcesData, setResourcesData] = useState();
  const { countDelegate, MeetDeadline, MissingEventDate, showAlert, eventDate, details, certificates, shareableLink, DownloadQR, affiliated, countStudent } = useOutletContext();
  const { userData, token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const getResourcesById = async () => {
    try {
      const res = await apiAuth.get(`admin/institute-resources/${userData.id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status == 200) {
        setResourcesData(res?.data?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  useEffect(() => {
    // getResourcesById();
  }, []);

  return (
    <div>
      <div>
        {/* New Design  */}
        <div>
          {!eventDate?.appointment_date && showAlert && <MissingEventDate />}
          {moment(eventDate?.deadline).diff(moment(), "days") < 3 && moment(eventDate?.deadline).diff(moment(), "days") > -1 && showAlert && <MeetDeadline />}
        </div>
        <DashboardHead details={details} eventDate={eventDate} countDelegate={countDelegate} certificates={certificates} />
        {/* End New Design  */}
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-7 col-xl-8">
            <div>
              <div className=" lh-1">
                <div className="">
                  <p className="fs-5 fw-semibold lh-sm mb-0 text-capitalize">Download Event Collaterals</p>
                  <p className="fs-6">To organise a successful YMG20 you will need to get a few things printed, such as a standee, backdrop, flags and certificates. Download all the collaterals you will need, make sure you get them edited to incorporate your institutions logo, name, address, date of the summit etc as the case may require.</p>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1OqOYPFyl5ufDEy8QmQjHh9mMkgeVMedf?usp=share_link"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={"Flags"} />
                        </ListItem>
                      </a>
                    </div>
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1yIVFSM5A50v98m5ccoPv_cdFizo9Yc2q?usp=sharing"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={"Guest Countries Flags"} />
                        </ListItem>
                      </a>
                    </div>
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1XSWuIhqW_tR52-ml5lTpJLDZYPst-FD8?usp=share_link"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Posters (A1)" />
                        </ListItem>
                      </a>
                    </div>
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1VZ2GUfcB5F1mDaDOXupT9W01oTGgm7bN?usp=share_link"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Certificates" />
                        </ListItem>
                      </a>
                    </div>
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1tY3yyhRbqIWafMQL2sv1LpEs3S_voHjr?usp=sharing"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Score Sheets" />
                        </ListItem>
                      </a>
                    </div>
                    <div className="col">
                      <a target="_blank" href={"https://drive.google.com/drive/folders/1q-U-e2ZJieUXBKGhrRDfA8fcDMQA2epB?usp=share_link"} className="border d-block rounded shadow-sm h-100">
                        <ListItem className="h-100">
                          <ListItemAvatar>
                            <Avatar className="rounded" src="/images/icons/drive.png"></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Backdrop & Standee" />
                        </ListItem>
                      </a>
                    </div>
                    {resourcesData?.map((data) => {
                      return (
                        <div className="col">
                          <a download={data?.resource_file} href={data?.resource_file} className="border d-block rounded shadow-sm">
                            <ListItem className="col">
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    backgroundColor: "whitesmoke",
                                    color: "green",
                                  }}>
                                  <FileDownloadIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Download Resources" secondary={data?.title} />
                            </ListItem>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
                <SocialUploadContent />
                <hr />
                {userData?.role !== "coordinator" && <Coordinators />}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-xl-4">
            <ProfileCard details={details} shareableLink={shareableLink} DownloadQR={DownloadQR} affiliated={affiliated} />
          </div>
        </div>
        {/* <SocialTweets /> */}
      </div>
    </div>
  );
};

export default InstituteMainTab;
