import React, { useState } from "react";
import { red } from "@mui/material/colors";

import {
  CalendarMonth,
  Call,
  Class,
  DeleteForever,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Person,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useError from "lib/errorResponse";
import { useGlobalContext } from "global/context";
import { apiAuth } from "api";

export const StudentDataCard = ({ studentDetail, studentId, reload }) => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  //   Handle Delete
  const handleDelete = async (id) => {
    console.log(id, "id==>");
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
              `api/v2/institute/deleteStudent?studentId=${id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (res.status === 200) {
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
  return (
    <>
      <div className="col" key={studentId}>
        <Card className="rounded-4 certified-wrapper position-relative w-100 h-100 p-0 bg-white border text-dark">
          <div className="h-100 d-flex flex-column w-100 justify-content-between">
            <div>
              <Tooltip title="Delete the Student">
                <span
                  color="red"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleDelete(studentDetail?.id)}
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

              <CardHeader
                avatar={
                  <Avatar
                    alt={studentDetail.first_name}
                    src={studentDetail.profile}
                    sx={{ width: 46, height: 46, bgcolor: red[500] }}
                  />
                }
                title={
                  <div>
                    <span className="font-ubd fw-bold fs-6">
                      {studentDetail?.first_name} {studentDetail?.last_name}
                    </span>
                  </div>
                }
              />
              <CardContent className="py-0">
                <div className="row">
                  {Boolean(studentDetail?.email) && (
                    <div className="col-12">
                      <a
                        href={`mailto:${studentDetail?.email}`}
                        className="text-dark"
                      >
                        <Email
                          sx={{
                            fontSize: 16,
                            color: "grey",
                            mr: 1,
                          }}
                        />
                        <small>{studentDetail?.email}</small>
                      </a>
                    </div>
                  )}
                  {Boolean(studentDetail?.contact) && (
                    <div className="col-12">
                      <a
                        href={`tel:${studentDetail.contact}`}
                        className="text-dark"
                      >
                        <Call
                          sx={{
                            fontSize: 16,
                            color: "grey",
                            mr: 1,
                          }}
                        />{" "}
                        <small>{studentDetail.contact}</small>
                      </a>
                    </div>
                  )}
                  {Boolean(studentDetail?.dob) && (
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
                        DOB : {moment(studentDetail?.dob).format("DD-MM-YYYY")}
                      </small>
                    </div>
                  )}
                  {Boolean(studentDetail?.father_name) && (
                    <div className="col-12">
                      <Person
                        sx={{
                          fontSize: 16,
                          color: "grey",
                          mr: 1,
                        }}
                      />{" "}
                      <small>Guardian : {studentDetail.father_name}</small>
                    </div>
                  )}

                  {Boolean(studentDetail?.class) && (
                    <div className="col-12">
                      <Class
                        sx={{
                          fontSize: 16,
                          color: "grey",
                          mr: 1,
                        }}
                      />{" "}
                      <small>{studentDetail.class}</small>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
            <CardActions className="mb-0 px-0">
              <div className="container-fluid mb-2 mt-2">
                <Button
                  variant="outlined"
                  fullWidth
                  className="rounded-3 text-capitalize mt-1"
                  size="large"
                  aria-label="add to favorites"
                  onClick={handleShowModal}
                >
                  <i className="bi bi-arrows-angle-expand me-2"></i>
                  View Details
                </Button>
              </div>
            </CardActions>
          </div>
        </Card>
      </div>

      {/* Modal For More Detail */}
      <Modal
        size="lg"
        show={showModal}
        id={"#ProfileModal" + studentDetail?.id}
        onHide={handleShowModal}
      >
        <Modal.Header className="p-0 align-items-start p-2" closeButton>
          <div className="d-flex align-items-center justify-content-start p-2 p-lg-3">
            <div>
              <div className="p-2">
                <Avatar
                  alt={studentDetail.first_name}
                  className="border border-2 shadow"
                  src={studentDetail?.profile}
                  sx={{ width: 106, height: 106, backgroundColor: "tomato" }}
                  data-bs-toggle="modal"
                  data-bs-target={"#ProfileModal" + studentDetail?.id}
                />
              </div>
            </div>
            <div>
              <div className="p-2">
                <h4 className="text-dark">
                  {studentDetail?.first_name} {studentDetail?.last_name}
                </h4>
              </div>
            </div>
            <div className="mt-2">
              {studentDetail?.fb && (
                <IconButton
                  target={"_blank"}
                  href={studentDetail?.fb}
                  className="text-secondary me-1 bg-white shadow-sm"
                >
                  <Facebook className="fs-6 color-blue" />
                </IconButton>
              )}
              {studentDetail?.insta && (
                <IconButton
                  target={"_blank"}
                  href={studentDetail?.insta}
                  className="text-secondary mx-1 bg-white shadow-sm"
                >
                  <Instagram className="fs-6 text-danger" />
                </IconButton>
              )}
              {studentDetail?.twitter && (
                <IconButton
                  target={"_blank"}
                  href={studentDetail?.twitter}
                  className="text-secondary mx-1 bg-white shadow-sm"
                >
                  <Twitter className="fs-6 text-info" />
                </IconButton>
              )}
              {studentDetail?.lkd && (
                <IconButton
                  target={"_blank"}
                  href={studentDetail?.lkd}
                  className="text-secondary mx-1 bg-white shadow-sm"
                >
                  <LinkedIn className="fs-6 color-blue" />
                </IconButton>
              )}
              {studentDetail?.ytb && (
                <IconButton
                  target={"_blank"}
                  href={studentDetail?.ytb}
                  className="text-secondary mx-1 bg-white shadow-sm"
                >
                  <YouTube className="fs-6 text-danger" />
                </IconButton>
              )}
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
                      <small className="text-dark">{studentDetail?.bio}</small>
                    </div>
                  </div>
                  {studentDetail?.address && (
                    <div className="mt-3">
                      <span className="text-dark fs-6 ">Address</span>
                      <div>
                        <small className="text-dark">
                          {studentDetail?.address +
                            " " +
                            studentDetail?.state +
                            " " +
                            studentDetail?.pincode}
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
                        <span className="text-dark">
                          {studentDetail?.email}
                        </span>
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
                        <span className="text-dark">
                          {studentDetail?.contact}
                        </span>
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
                          {studentDetail?.father_name}
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
                          {moment(studentDetail?.dob).format("DD-MM-YYYY")}
                        </span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-12">
                  {studentDetail?.topic && (
                    <ListItem className="p-0 py-2">
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "orange" }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Preferred Theme"}
                        secondary={
                          <span className="text-dark">
                            {studentDetail?.topic}
                          </span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
                <div className="col-12">
                  {studentDetail?.sub_topic && (
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
                            {studentDetail?.sub_topic}
                          </span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
              </List>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
