import { AddBoxTwoTone, AddToQueue, ArrowBackIosNewSharp, ExitToAppTwoTone, MoreVertTwoTone, WorkspacePremiumTwoTone } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import useError from "lib/errorResponse";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useChat from "../useChat";
import ChatRoom from "./ChatRoom/ChatRoom";
import ChatRoomDeclaration from "./ChatRoom/ChatRoomDeclaration";
import StatusBadge from "./StatusBadge";
import { DesignationBasedPermit } from "./AllMeetingsStudent";
import InstituteMeetings from "./InstituteMeetings";

const StudentDiscussionRoom = () => {
    const [meetingData, setMeetingData] = useState({});
    const [studentData] = useOutletContext();
    const { userData, token } = useGlobalContext();
    const [pointCount, setPointCount] = useState(0);
    const { ErrorResponder } = useError();
    const navigate = useNavigate();
    const params = useParams();
    const { messages, reloader } = useChat(params?.meetingid)
    const fetchMeetings = async () => {
        try {
            const response = await apiJsonAuth.post("/discussion/meetings", {
                instituteId: studentData?.instituteId,
                meetingId: params?.meetingid,
                type: "single"
            }, {
                headers: {
                    Authorization: token
                }
            })
            const result = response?.data;
            if (result?.status == "SUCCESS") {
                setMeetingData(result?.result)
            }
        } catch (error) {
            ErrorResponder(error);
        }
    }
    useEffect(() => {
        fetchMeetings();
    }, [params, studentData, reloader]);
    useEffect(() => {
        setPointCount(messages.filter((msg) => msg?.userId === userData?.id).length)
    }, [messages])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const MeetingTypeWiseShow = (type) => {
        switch (type) {
            case "track":
                return <ChatRoom open={open} meetingData={meetingData} setOpen={setOpen} fetchMeetings={fetchMeetings} studentData={studentData} showVote={(studentData?.g20_designation) && meetingData?.meeting_status === "started"} />
                break;
            case "declaration":
                return <ChatRoomDeclaration meetingData={meetingData} open={open} setOpen={setOpen} studentData={studentData} showVote={(studentData?.g20_designation) && meetingData?.meeting_status === "started"} />
                break;
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    {/* Header  */}
                    <div className='border border shadow-sm rounded-0 bg-light-white2-grad p-3'>
                        <div className="row g-2">
                            <div className="col-12 col-lg-8">
                                <h3 className='fs-3 border-start border-4 border-warning ps-2'>{meetingData?.track} {meetingData?.meetingtype} Meeting <StatusBadge meeting={meetingData} />
                                    {studentData?.g20_designation ?
                                        // studentData?.g20_track === meetingData?.track || studentData?.g20_track === "Leaders Track" ?
                                        <span className='rounded fs-6 ms-1 border-dark border-1 text-dark py-1 px-2 border d-inline-block'>
                                            <WorkspacePremiumTwoTone color='error' /> Member
                                        </span>
                                        :
                                        <span className='rounded fs-6 ms-1 border-dark border-1 text-dark py-1 px-2 border d-inline-block'>
                                            <WorkspacePremiumTwoTone color='success' /> Viewer
                                        </span>
                                    }
                                </h3>
                                <p className='fs-6'><span className="text-primary fw-bold">Theme:</span>{meetingData?.theme}</p>
                            </div>
                            {/* Side DropDown  */}
                            <div className="col-12 col-lg-4 text-end">
                                <div className="dropstart">
                                    <IconButton sx={{ background: "whitesmoke" }} type="button" data-bs-toggle="dropdown">
                                        <MoreVertTwoTone />
                                    </IconButton>
                                    <ul className="dropdown-menu border-0 shadow p-3 rounded-3 " style={{ right: "0px !important" }}>
                                        <div className="row row-cols-1 g-2">
                                            <div className='col'>
                                                <Button onClick={() => navigate("/dashboard/discussion")} fullWidth variant='outlined' color='error' size='small' className='rounded text-capitalize  h-100 '>
                                                    <div>
                                                        <ExitToAppTwoTone /> <br /> Exit Meeting
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='points-container'>
                        {MeetingTypeWiseShow(meetingData?.meetingtype)}
                    </div>
                </div>
                {/* Related Meetings  */}
                <div className="col-12 col-lg-4">
                    {meetingData?.meetingtype === "track" && meetingData?.meeting_status === "started" && studentData?.g20_designation &&
                        <Tooltip title={pointCount === 4 ? "You have added all your 4 points." : "Click to add your views on the Topic."} >
                            <Button onClick={handleOpen} disabled={pointCount === 4} variant={"contained"} color={"success"} size="large" className="rounded-3 mb-3 py-3" fullWidth><AddBoxTwoTone />&nbsp; Add Point</Button>
                        </Tooltip>
                    }
                    <InstituteMeetings studentData={studentData} />
                </div>
            </div>
        </div>
    )
}

export default StudentDiscussionRoom;