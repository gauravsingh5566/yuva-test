import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconButton, TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { pop2, Popup } from "layout/Popup";
import { apiAuth, apiJsonAuth } from "api";
import { CheckBoxOutlineBlank, CheckBoxRounded, Close, Delete, Edit, Remove } from "@mui/icons-material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "global/context";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

function StudentPoll() {
  const { adminRoles } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [options, setOptions] = React.useState({});
  const [question, setQuestion] = React.useState();
  const [count, setCount] = React.useState(2);
  const [pollList, setPollList] = React.useState();
  const [edit, setEdit] = useState();
  const rows = [];

  async function fetchData() {
    try {
      const response = await apiAuth.get("student/editPoll");
      if (response) {
        setPollList(response?.data?.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handelpollEdit = async (id, todo, values) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiJsonAuth.post(`student/editPoll?todo=${todo}`, {
            id,
            values,
          });
          if (response) {
            toast.success(response?.data?.message);
            fetchData();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const uploadData = async (e) => {
    try {
      if (question && options) {
        const response = await apiJsonAuth.put("/admin/createPoll", {
          question,
          options: JSON.stringify(options),
        });
        if (response) {
          Popup("success", "Poll Created..");
          e.target.reset();
          fetchData();
        }
      } else {
        pop2.warning({ title: "All Input Fields Required!!" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  function handelChange(e) {
    if (e.target.name === "ques") {
      setQuestion(e.target.value);
    } else {
      setOptions({ ...options, [e?.target?.name]: e?.target?.value });
    }
  }

  for (let i = 1; i <= count; i++) {
    rows.push(
      <div style={{ width: "400px" }}>
        <TextField fullWidth className="form-control my-2 input-group rounded" label={"Option " + i} required variant="outlined" key={i} type="text" name={"option" + i} onChange={handelChange} />
      </div>
      // <input key={i} type="text" name={'option' + i} className="form-control m-3 input-group rounded mx-2" style={{ width: '250px' }} placeholder={"Option " + i} onChange={handelChange} />
    );
  }

  const hideEditBar = (id) => {
    document.getElementById(`edit${id}`).classList.add("d-none");
  };
  const showEditBar = (id) => {
    document.getElementById(`edit${id}`).classList.remove("d-none");
  };

  const EditPollContent = ({ poll }) => {
    const option = Object(JSON.parse(poll.options));
    const formik = useFormik({
      initialValues: {
        ques: poll.poll_ques,
        option: option,
      },
      onSubmit: (values) => {
        handelpollEdit(poll.id, "UPDATE", values).then(() => {
          setEdit();
        });
      },
    });
    return (
      <div className="card postion-relative mt-2 p-2 p-lg-3">
        <Form onSubmit={formik.handleSubmit}>
          <div className="input-group mb-2">
            <TextField required className="text-center" fullWidth multiline maxRows={4} label="Question" name="ques" value={formik.values.ques} onChange={formik.handleChange} variant="outlined" type="text" />
          </div>
          <hr />
          <div>
            {Object.values(option).map((opt, i) => {
              return (
                <TextField
                  className="lh-1 fs-6 text-wrap mb-2"
                  label={"Option " + (i + 1)}
                  required
                  key={i}
                  type="text"
                  name={"option" + i}
                  onChange={(e) => {
                    option["option" + (i + 1)] = e.target.value;
                  }}
                  multiline
                  maxRows={4}
                  fullWidth
                  variant="outlined"
                  defaultValue={opt}
                />
              );
            })}
          </div>
          <div className="mt-2">
            <Button color="success" variant="contained" type="submit">
              Save
            </Button>
            <Button color="error" variant="contained" className="ms-2" type="submit" onClick={() => setEdit()}>
              Close
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div>
      <SimpleBreadCrumb2
        page={`Public Polls`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/news", text: "news" },
          { link: "/admin/news/add", text: "add news", active: true },
        ]}
      />
      <div className="container py-3">
        <button className="btn rounded-0 btn-sm" onClick={() => setShow(true)}>
          Create Poll
        </button>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="container px-5 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                uploadData(e);
              }}>
              <div className="input-group m-2">
                <TextField required className="text-center" fullWidth multiline rows={4} id="outlined-basic" label="Enter Question Here!" variant="outlined" type="text" name="ques" onChange={handelChange} />
              </div>
              <div>
                <div className="w-20 d-flex justify-content-center text-center item-center px-5">
                  <Button
                    className="py-1 px-5 m-1 rounded rounded-pill"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                    size="small"
                    variant="outlined"
                    disabled={count === 8}
                    startIcon={<AddIcon />}>
                    OPTION
                  </Button>
                  <Button
                    className="py-1 px-5 m-1 rounded rounded-pill"
                    onClick={() => {
                      setCount(count - 1);
                      delete options[`option${count}`];
                    }}
                    size="small"
                    variant="outlined"
                    disabled={count === 2}
                    startIcon={<Remove />}>
                    OPTION
                  </Button>
                </div>
              </div>
              <div>
                <div className="border rounded m-1 mb-3 d-flex justify-content-around flex-wrap px-2 mx-auto">{rows}</div>
              </div>
              <div className="mx-auto d-flex justify-content-center">
                <Button className="btn btn-success px-5" variant="contained" type="submit">
                  Create POll
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        <div>
          {pollList ? (
            <div>
              {pollList?.map((poll) => {
                return (
                  <div>
                    {edit !== poll.id && (
                      <div key={poll.id} className="card h-100 p-3 mt-2 position-relative shadow-sm" onMouseOver={() => showEditBar(poll.id)} onMouseLeave={() => hideEditBar(poll.id)}>
                        <div id={"edit" + poll.id} className="position-absolute border  rounded-start d-none bg-light bg-gradient shadow-sm h-100 " style={{ top: 0, right: 0 }}>
                          <div className="d-flex flex-column align-items-center justify-content-center py-2">
                            <div className="mt-2 mx-1 cursor-pointer">{poll?.status === "ACTIVE" ? <CheckBoxRounded sx={{ color: "green" }} onClick={() => handelpollEdit(poll.id, "STATUS_INACTIVE")} /> : <CheckBoxOutlineBlank sx={{ color: "grey" }} onClick={() => handelpollEdit(poll.id, "STATUS_ACTIVE")} />}</div>
                            <div>
                              <IconButton className="mt-2 mx-1 cursor-pointer" sx={{ color: "black" }} onClick={() => setEdit(poll.id)}>
                                <Edit />
                              </IconButton>
                            </div>
                            <div className="mt-2 mx-1 cursor-pointer">
                              <IconButton sx={{ color: "red" }} onClick={() => handelpollEdit(poll.id, "DELETE")}>
                                <Delete />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6>{poll.poll_ques}</h6>
                        </div>
                        <ul>
                          {Object.values(JSON.parse(poll.options)).map((option, i) => {
                            return (
                              <li className="" key={option}>
                                {" "}
                                <span>{i + 1 + ". "}</span>
                                {option}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    <div>{edit === poll.id && <EditPollContent poll={poll} />}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="container w-100 ">
              <center>
                <img width={150} src="/loading.gif" />
                <h3>Please Reload</h3>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPoll;
