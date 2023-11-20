import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { Add, AddTask, CalendarMonth, Call, DataSaverOff, Delete, DeleteForever, Details, Email, Expand, ExpandSharp, Explore, Facebook, Instagram, LinkedIn, LocationOn, More, Person, RemoveCircleOutline, Twitter, VerifiedTwoTone, YouTube } from "@mui/icons-material";
import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip } from "@mui/material";
import { Popup } from "layout/Popup";
import { useGlobalContext } from "global/context";
import StudentProfileModal from "./StudentProfileModal";
import moment from "moment";
import { toast } from "react-toastify";
import { apiJsonAuth } from "api";

export default function StudentDelegateCard({ details, student, removeFromDelegate }) {
  const [winner, setWinner] = React.useState({
    studentId: student?.studentId,
    event: "",
    position: "",
  });

  function handleWinnerUpdate(e) {
    e.preventDefault();
    if (winner.studentId && winner.position && winner?.event) {
      apiJsonAuth
        .post("/institute/event-winners", winner)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Student Added!");
          } else {
            toast.warning("Something went Worng!");
          }
        })
        .catch((err) => {
          toast.warning("Something went Worng!");
        });
    } else {
      toast.warning("All fields Required!");
    }
  }
  return (
    <div className="col">
      <Card className="rounded-4 h-100  bg-white border text-dark position-relative ">
        <Tooltip title="Remove From Delegates" className="fw-light">
          <IconButton type="button" color="red" className="position-absolute top-0 end-0 m-2" hidden={details?.isAssigned === "true"} onClick={() => removeFromDelegate(student?.studentId)}>
            <RemoveCircleOutline
              sx={{
                fontSize: 20,
                color: "#999966",
                cursor: "pointer",
                "&:hover": {
                  margin: 0,
                  color: "red",
                },
              }}
            />
          </IconButton>
        </Tooltip>
        <CardHeader
          avatar={<Avatar alt={student?.first_name} src={student?.profile} sx={{ width: 46, height: 46, bgcolor: red[500] }} />}
          title={
            <div>
              <span className="font-ubd fw-bold fs-6">
                {student?.first_name} {student?.last_name} &nbsp;&nbsp;
                <br />
                {student?.assigned_flag && (
                  <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2 text-dark">
                    <img width={20} src={student?.assigned_flag} alt={student?.assigned_flag} /> {student?.assigned_country}
                  </small>
                )}
              </span>
              <br />
              <span>
                {details?.isAssigned === "true" && (
                  <small>
                    {student?.assigned_track} | {student?.assigned_designation} | {student?.assigned_country}
                  </small>
                )}
              </span>
            </div>
          }
        />
        <CardContent className="py-0">
          <div className="row">
            <div className="col-12">
              {student?.assigned_designation && (
                <small className="d-inline-block mb-1 me-1 text-center border me-1 mb-1 p-1 px-2 rounded-2  text-dark">
                  <VerifiedTwoTone sx={{ color: "blue", fontSize: 20 }} /> {student?.assigned_designation}
                </small>
              )}
            </div>
            <div className="col-12">
              {student?.dob && (
                <>
                  <CalendarMonth
                    sx={{
                      fontSize: 16,
                      color: "grey",
                      borderRadius: 1,
                      mr: 1,
                    }}
                  />
                  <small>DOB : {student?.dob && moment(student?.dob).format("DD-MM-YYYY")}</small>
                </>
              )}{" "}
            </div>
            <div className="col-12">
              {student?.father_name && (
                <>
                  <Person
                    sx={{
                      fontSize: 16,
                      color: "grey",
                      mr: 1,
                    }}
                  />{" "}
                  <small>Guardian : {student?.father_name}</small>
                </>
              )}
            </div>
            <div className="col-12">
              <a href={`mailto:${student?.email}`} className="text-dark">
                <Email
                  sx={{
                    fontSize: 16,
                    color: "grey",
                    mr: 1,
                  }}
                />{" "}
                <small>{student?.email}</small>
              </a>
            </div>
            <div className="col-12">
              <a href={`tel:${student?.contact}`} className="text-dark">
                <Call
                  sx={{
                    fontSize: 16,
                    color: "grey",
                    mr: 1,
                  }}
                />{" "}
                <small>{student?.contact}</small>
              </a>
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing className="d-block">
          <div className="container w-100">
            <div className="container">
              <div className="modal fade" id={"AddWinner" + student?.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={handleWinnerUpdate}>
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Modal title
                        </h5>
                        <button type="button" className="close border-0 fs-4 bg-light" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true fs-4">&#10006;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <TextField className="m-2" label="Event Name" variant="outlined" fullWidth size="small" value={winner.event} onChange={(e) => setWinner((pre) => ({ ...pre, event: e.target.value }))} />
                        <TextField className="m-2" label="Position" variant="outlined" fullWidth size="small" value={winner.position} onChange={(e) => setWinner((pre) => ({ ...pre, position: e.target.value }))} />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                        <button type="submit" className="btn bg-blue-grad text-light p-1 m-1 px-2" data-bs-dismiss="modal">
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100">
            <Button className="rounded text-capitalize py-2" variant="contained" fullWidth color="success" data-bs-toggle="modal" data-bs-target={"#AddWinner" + student?.id}>
              Add To Winner
            </Button>
            <Button variant="outlined" color="primary" data-bs-toggle="modal" data-bs-target={"#ProfileModal" + student?.id} fullWidth className="text-capitalize rounded-3 mt-2" size="large">
              <i className="bi bi-arrows-angle-expand me-2"></i>
              View Details
            </Button>
          </div>
        </CardActions>
      </Card>
      <StudentProfileModal student={student} />
    </div>
  );
}
