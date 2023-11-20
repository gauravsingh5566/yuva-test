import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import {
  AddTask,
  CalendarMonth,
  Call,
  CardMembershipTwoTone,
  Celebration,
  Class,
  DeleteForever,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Person,
  Twitter,
  VerifiedOutlined,
  VerifiedTwoTone,
  YouTube,
} from "@mui/icons-material";
import { apiAuth, apiJsonAuth } from "api";
import Swal from "sweetalert2";
import {
  Button,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useGlobalContext } from "global/context";
import StudentProfileModal from "./StudentProfileModal";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal } from "react-bootstrap";

export default function StudentProfileCard({
  role,
  stdCoordinator,
  student,
  reload,
  reloadDelegate,
  reloadStdCoordinators,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const { userData, token } = useGlobalContext();
  const { ErrorResponder } = useError();
  //   Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
            const res = await apiAuth.delete(
              "/institute/student?studentId=" + id,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (res.status == 200) {
              toast.dismiss();
              toast.success(res.data.message);
              reload();
            }
          } catch (error) {
            ErrorResponder(error);
          }
        }
      }
    });
  };
  const addToDelegate = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to add student to delegates",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
            const res = await apiJsonAuth.post(
              "/institute/addtodelegate",
              {
                studentId: id,
                instituteId: userData.id,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (res.status == 200) {
              toast.dismiss();
              toast.success(res.data.message);
              reloadDelegate();
            }
          } catch (error) {
            ErrorResponder(error);
          }
        }
      }
    });
  };
  const addStudentCoordinater = async (student) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to add student to Coordinator.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
            const res = await apiJsonAuth.post(
              "institute/studentCoordinate",
              student,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (res.status == 201 || res.status === 208) {
              toast.dismiss();
              if (res.status === 201) {
                toast.success(res.data.message);
              } else {
                toast.warning(res.data.message);
              }
              reload();
              reloadStdCoordinators();
            }
          } catch (error) {
            ErrorResponder(error);
            // Popup("error", error?.response?.data?.message);
          }
        }
      }
    });
  };
  const coordinatorCheck = (id) => {
    const index = stdCoordinator.findIndex((std) => std.id === id);
    if (index > 0) {
      return true;
    } else {
      return false;
    }
  };
  const ApplyForParticipation = async (id) => {
    try {
      toast.loading("Loading...");
      const result = await apiJsonAuth.post("/student/apply/delegate", {
        studentId: id,
        user: "INSTITUTE",
      });
      // console.log(result);
      switch (result?.data?.status) {
        case "success":
          toast.dismiss();
          toast.success("Student is Added to Delegates.");
          break;
        case "warning":
          toast.dismiss();
          toast.warning(result?.data?.message);
          break;
        case "conflict":
          toast.dismiss();
          toast.warning(result?.data?.message);
          break;
        case "error":
          toast.dismiss();
          toast.error(result?.data?.message);
          break;
        default:
          toast.dismiss();
          toast.info("OOps Something Went Wrong Please try again later.");
          break;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="col">
      <Card className="rounded-4 certified-wrapper position-relative w-100 h-100 p-0 bg-white border text-dark">
        <div className="h-100 d-flex flex-column w-100 justify-content-between">
          <div>
            <Tooltip title="Delete the Student">
              <span
                color="red"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => handleDelete(student?.id)}
              >
                <DeleteForever
                  sx={{
                    fontSize: 20,
                    color: "grey",
                    cursor: "pointer",
                    "&:hover": {
                      margin: 0,
                      color: "red",
                    },
                  }}
                />
              </span>
            </Tooltip>
            {/* {Boolean(student?.certified) && (
              <div class="badge-promo">
                <span class="badge-promo-content fw-semibold">
                  <i className="bi bi-patch-check-fill"></i> Certified
                </span>
              </div>
            )} */}
            <CardHeader
              avatar={
                <Avatar
                  alt={student.first_name}
                  src={student?.profile}
                  sx={{ width: 46, height: 46, bgcolor: red[500] }}
                />
              }
              title={
                <div>
                  <span className="font-ubd fw-bold fs-6">
                    {student?.first_name} {student?.last_name}
                  </span>{" "}
                  <br />
                  {student?.assigned_flag && (
                    <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2 text-dark">
                      <img
                        width={20}
                        src={student?.assigned_flag}
                        alt={student?.assigned_flag}
                      />{" "}
                      {student?.assigned_country}
                    </small>
                  )}
                </div>
              }
            />
            <CardContent className="py-0">
              <div className="row">
                <div className="col-12">
                  {coordinatorCheck(student?.id) && (
                    <small className="d-inline-block text-center text-dark border me-1 mb-1 p-1 px-2 rounded-2 ">
                      <CardMembershipTwoTone
                        sx={{ color: "tomato", fontSize: 20 }}
                      />{" "}
                      coordinator
                    </small>
                  )}
                  {student?.assigned_designation && (
                    <small className="d-inline-block mb-1 me-1 text-center border me-1 mb-1 p-1 px-2 rounded-2  text-dark">
                      <VerifiedTwoTone sx={{ color: "blue", fontSize: 20 }} />{" "}
                      {student?.assigned_designation}
                    </small>
                  )}
                </div>
                {Boolean(student?.email) && (
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
                )}
                {Boolean(student?.contact) && (
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
                )}
                {Boolean(student?.dob) && (
                  <div className="col-12">
                    <CalendarMonth
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        borderRadius: 1,
                        mr: 1,
                      }}
                    />
                    <small>
                      DOB : {moment(student?.dob).format("DD-MM-YYYY")}
                    </small>
                  </div>
                )}
                {Boolean(student?.father_name) && (
                  <div className="col-12">
                    <Person
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        mr: 1,
                      }}
                    />{" "}
                    <small>Guardian : {student?.father_name}</small>
                  </div>
                )}
                {Boolean(student?.class) && (
                  <div className="col-12">
                    <Class
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        mr: 1,
                      }}
                    />{" "}
                    <small>{student?.class}</small>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
          <CardActions className="mb-0 px-0">
            <div className="container-fluid mb-2 mt-2">
              <div className="row g-1">
                {/* {student?.certified ? (
                  <div className="col">
                    <Button variant="outlined" size="small" color="success" fullWidth disabled={student?.assigned_flag} onClick={() => ApplyForParticipation(student?.id)} className="rounded-2 text-capitalize py-2 h-100" aria-label="add to favorites">
                      <i className="bi bi-person"></i>&nbsp;Add&nbsp;Participant&nbsp;(delegate)
                    </Button>
                  </div>
                ) : (
                  ""
                )} */}
                {/* <div className="col">
                  <Button hidden={role !== "student"} variant="outlined" size="small" color="success" fullWidth disabled={coordinatorCheck(student?.id)} className="rounded-2 text-capitalize py-2 h-100" aria-label="add to favorites" onClick={() => addStudentCoordinater(student)}>
                    <i className="bi bi-person"></i>&nbsp;Appoint&nbsp;Coordinator
                  </Button>
                </div> */}
              </div>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleShowModal}
                className="rounded-3 text-capitalize mt-1"
                size="large"
                aria-label="add to favorites"
              >
                <i className="bi bi-arrows-angle-expand me-2"></i>
                View Details
              </Button>
            </div>
          </CardActions>
        </div>
      </Card>

      {/* Modal For More Detail */}
      <Modal
        size="lg"
        id={"ProfileModal" + student?.id}
        show={showModal}
        onHide={handleShowModal}
      >
        <Modal.Header className="p-0 align-items-start p-2" closeButton>
          <div className="d-flex align-items-center justify-content-start p-2 p-lg-3">
            <div className="">
              <div className=" p-2">
                <Avatar
                  alt={student?.first_name}
                  className={"border border-2 shadow"}
                  src={student?.profile}
                  sx={{
                    width: 106,
                    height: 106,
                    backgroundColor: "tomato",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target={"#ProfileModal" + student?.id}
                />
              </div>
            </div>
            <div className="">
              <div className="p-2">
                <h4 className="text-dark">
                  {student?.first_name} {student?.last_name}{" "}
                  {student?.middle_name}
                </h4>
                {student?.assigned_flag && (
                  <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2 text-dark">
                    <img
                      width={20}
                      src={student?.assigned_flag}
                      alt={student?.assigned_flag}
                    />{" "}
                    {student?.assigned_country}
                  </small>
                )}
                {student?.assigned_designation && (
                  <small className="d-inline-block mb-1 me-1 text-center border me-1 mb-1 p-1 px-2 rounded-2  text-dark">
                    <VerifiedOutlined sx={{ color: "blue", fontSize: 20 }} />{" "}
                    {student?.assigned_designation}
                  </small>
                )}
                <div className="mt-2">
                  {student?.fb && (
                    <IconButton
                      target={"_blank"}
                      href={student?.fb}
                      className="text-secondary me-1 bg-white shadow-sm"
                    >
                      <Facebook className="fs-6 color-blue" />
                    </IconButton>
                  )}
                  {student?.insta && (
                    <IconButton
                      target={"_blank"}
                      href={student?.insta}
                      className="text-secondary mx-1 bg-white shadow-sm"
                    >
                      <Instagram className="fs-6 text-danger" />
                    </IconButton>
                  )}
                  {student?.twitter && (
                    <IconButton
                      target={"_blank"}
                      href={student?.twitter}
                      className="text-secondary mx-1 bg-white shadow-sm"
                    >
                      <Twitter className="fs-6 text-info" />
                    </IconButton>
                  )}
                  {student?.lkd && (
                    <IconButton
                      target={"_blank"}
                      href={student?.lkd}
                      className="text-secondary mx-1 bg-white shadow-sm"
                    >
                      <LinkedIn className="fs-6 color-blue" />
                    </IconButton>
                  )}
                  {student?.ytb && (
                    <IconButton
                      target={"_blank"}
                      href={student?.ytb}
                      className="text-secondary mx-1 bg-white shadow-sm"
                    >
                      <YouTube className="fs-6 text-danger" />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div>
            <div className="container p-3">
              <List
                className="row"
                sx={{
                  width: "100%",
                  color: "white",
                }}
              >
                <div className="col-12">
                  <div>
                    <span className="text-dark fs-6">Bio</span>
                    <div>
                      <small className="text-dark">{student?.bio}</small>
                    </div>
                  </div>
                  {student?.address && (
                    <div className="mt-3">
                      <span className="text-dark fs-6 ">Address</span>
                      <div>
                        <small className="text-dark">
                          {student?.address +
                            " " +
                            student?.state +
                            " " +
                            student?.pincode}
                        </small>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Email Address"}
                      secondary={
                        <span className="text-dark">{student?.email}</span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Call />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Contact"}
                      secondary={
                        <span className="text-dark">{student?.contact}</span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Guardian"}
                      secondary={
                        <span className="text-dark">
                          {student?.father_name}
                        </span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <CalendarMonth />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Date Of Birth"}
                      secondary={
                        <span className="text-dark">
                          {moment(student?.dob).format("DD-MM-YYYY")}
                        </span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-12">
                  {student?.topic && (
                    <ListItem className="p-0 py-2">
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "orange" }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Preferred Theme"}
                        secondary={
                          <span className="text-dark">{student?.topic}</span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
                <div className="col-12">
                  {student?.sub_topic && (
                    <ListItem className="p-0 py-2">
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "orange" }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Preferred Topic"}
                        secondary={
                          <span className="text-dark">
                            {student?.sub_topic}
                          </span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
                {/* <div className="container p-1 ">
                  <div className="d-flex justify-content-center">
                    <Button variant="outlined" onClick={() => { ApplyForParticipation(student?.id) }} >Add to Delegates</Button>
                  </div>
                </div> */}
                {/* <div className="col-12">
                    {student?.reporting_council && (
                      <ListItem className="p-0 py-2">
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: "orange" }}>
                            <Email />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          
                          primary={"Wanted to be Reporting Council?"}
                          secondary={<span className="text-dark">{student?.reporting_council}</span>}
                        />
                      </ListItem>
                    )}
                  </div> */}
              </List>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
