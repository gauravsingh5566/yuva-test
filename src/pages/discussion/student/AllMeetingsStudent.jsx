import { Group, PanoramaFishEye, RemoveRedEye, ViewComfyAltTwoTone, WorkspacePremiumTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import fallback1 from "../fallback/fallbackscreen1.svg";
import StatusBadge from "./StatusBadge";

export const DesignationBasedPermit = (desig, track, permit) => {
  switch (desig) {
    case "Finance Minister":
      return track == "Finance Track" ? true : false;
    case "Sherpa":
      return track == "Sherpa Track" ? true : false;
    case "Foreign Minister":
      return track == "Foreign Ministers Track" ? true : false;
    case "Head of State":
      return track == "Leaders Track" ? true : permit === "vote" ? true : false;
    default:
      return false;
  }
};

const AllMeetingsStudent = () => {
  const [otherMeetings, setOtherMeetings] = useState([]);
  const [studentData, fetchDetails] = useOutletContext();
  const { ErrorResponder } = useError();
  const { token, userData } = useGlobalContext();

  const fetchAllMeetings = async () => {
    try {
      let requestPayload;
      requestPayload = {
        instituteId: userData?.instituteId,
        type: "all",
        track: null,
      };
      // }
      const response = await apiJsonAuth.post("/discussion/meetings", requestPayload, {
        headers: {
          Authorization: token,
        },
      });
      const result = response?.data;
      if (result?.status == "SUCCESS") {
        setOtherMeetings(result?.result);
      }
    } catch (error) {
      ErrorResponder(error);
    }
  };
  useEffect(() => {
    if (studentData) {
      if (Object?.keys(studentData)?.length == 0) {
        fetchDetails();
      }
    }
    fetchAllMeetings();
  }, [studentData]);
  return (
    <>
      {!otherMeetings?.length || !studentData?.g20_designation ? (
        <div className="border border-2 py-5 rounded-4 text-center bg-white">
          <img src={fallback1} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
          <h4 className="text-center">Discuss as a G20 Delegate </h4>
          <h3 className="text-center">
            <span className="fs-6">with </span>
            <span className="text-primary"> Yuvamanthan</span>
          </h3>
        </div>
      ) : (
        // Previous Meetings
        <div>
          <h4 className="mb-4">
            Dicussions <span className="p-1 bg-light-green-grad text-white rounded px-3 fs-6">Live</span>
          </h4>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {otherMeetings?.map((meeting, i) => {
              return (
                <div className="col" key={i}>
                  <div className="card p-3 rounded-4 h-100 shadow-sm border-dark">
                    <div className="d-flex align-items-start">
                      <span className="fs-5 fw-semibold text-dark text-capitalize me-2">
                        {meeting?.track} {meeting?.meetingtype} Meeting &nbsp;
                      </span>
                      <StatusBadge meeting={meeting} />
                    </div>
                    <br />
                    <table className="table table-borderless table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <span className="text-dark">Theme</span>
                          </td>
                          <td>
                            <span className="text-dark">{meeting?.theme} </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="text-dark">Started</span>
                          </td>
                          <td>
                            <span className="text-dark">{moment(meeting?.createdAt).calendar()} </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {DesignationBasedPermit(studentData?.g20_designation, meeting?.track) ? (
                      <>
                        <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                          <Button variant="outlined" color="success" className="rounded-3 py-2">
                            <Group />
                            &nbsp; Join
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                          <Button variant="outlined" color="warning" className="rounded-3 py-2">
                            <RemoveRedEye />
                            &nbsp; View
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AllMeetingsStudent;
