import { AddCircleOutline, EditAttributesOutlined, LocationCity, ModeEditOutline } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Switch, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { pop2 } from "layout/Popup";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import QuizControl from "./QuizControl";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

function AdminCourses() {
  let [status, setStatus] = useState("active");
  let [courses, setCourses] = useState([]);
  let [update, setUpdate] = useState(0);
  let [sectionsRoute, setSectionRoute] = useState("");
  const navigate = useNavigate();
  let [editCourseName, setEditCourseName] = useState("");
  let [editSlug, setEditSlug] = useState("");
  let [editDesc, setEditDesc] = useState("");
  let [editStatus, setEditStatus] = useState("");
  let [editThumbnail, setEditThumbnail] = useState("");
  let [editAuthor, setEditAuthor] = useState("");
  const [editValues, setEditValues] = useState({
    course_name: "",
    slug: "",
    desc: "",
    status: "",
    thumbnail: "",
    author: "",
  });
  let [editId, setEditId] = useState();

  const getCourses = async () => {
    try {
      const res = await apiAuth.get("admin/course");
      if (res.status === 200) {
        setCourses(res?.data?.result);
      }
    } catch (err) {}
  };

  const Formik = useFormik({
    initialValues: {
      course_name: "",
      slug: "",
      desc: "",
      status: "",
      thumbnail: "",
      author: "",
    },
    onSubmit: async (values, action) => {
      toast.loading("loading...");
      const data = { ...values, status: status, slug: slugify(Formik.values.course_name).toLowerCase() };
      try {
        const res = await apiAuth.post("admin/course", data);
        if (res.status === 200) {
          toast.dismiss();
          toast.success("Course Added Successfully");
          setSectionRoute(res?.data?.result?.id);
        }
      } catch (err) {
        pop2.warning("Error" + " " + err);
      }
    },
  });
  useEffect(() => {
    Editformik.values.course_name = editValues.course_name;
    Editformik.values.slug = editValues.course_name;
    Editformik.values.desc = editValues.desc;
    Editformik.values.status = editValues.status;
    Editformik.values.thumbnail = editValues.thumbnail;
    Editformik.values.author = editValues.author;
  }, [editValues, update]);

  const Editformik = useFormik({
    initialValues: {
      course_name: editValues.course_name,
      slug: slugify(editValues.course_name).toLowerCase(),
      desc: editValues.desc,
      status: editValues.status,
      thumbnail: editValues.thumbnail,
      author: editValues.author,
    },
    onSubmit: async (values, actions) => {
      toast.loading("loading...");
      const data = { ...values, status: editStatus, slug: slugify(Editformik.values.course_name).toLowerCase(), id: editId };
      try {
        const res = await apiAuth.put("admin/course", data);
        if (res.status === 200) {
          toast.dismiss();
          toast.success("Course Updated Successfully");
          setUpdate(update + 1);
        }
      } catch (err) {
        pop2.warning("Error" + " " + err);
      }
    },
  });
  useEffect(() => {
    getCourses();
  }, [update]);

  return (
    <>
      <SimpleBreadCrumb2
        page={`Manage Courses`}
        navdata={[
          { link: "/admin", text: "Home" },
          { link: "/admin/courses", text: "Courses" },
          // { link: "/admin/institutes", text: datas?.institution_name, active: true },
        ]}
      />
      <div className="container py-3">
        <div className="row row-cols-1 row-cols-lg-2 align-items-center g-2">
          <div className="col">
            <h4>Manage Courses</h4>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn rounded-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add&nbsp;New&nbsp;Course
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive border rounded mt-3">
          <table className="designed-table table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light ">
                <th scope="col" className="fw-semibold text-capitalize p-3">
                  Thumbnail
                </th>
                <th scope="col" className="fw-semibold text-capitalize p-3">
                  Course&nbsp;Name
                </th>
                <th scope="col" className="fw-semibold text-capitalize p-3">
                  Description
                </th>
                <th scope="col" className="fw-semibold text-capitalize p-3">
                  Author
                </th>
                <th scope="col" className="fw-semibold text-capitalize p-3">
                  Status
                </th>

                <th scope="col" className="fw-semibold text-capitalize p-3" style={{ width: 100 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((data) => {
                return (
                  <>
                    <tr className="border-bottom">
                      <td className="p-2" width={50}>
                        <Avatar alt={data.course_name} src={data?.thumbnail} sx={{ width: 46, height: 46, backgroundColor: "orange" }}></Avatar>
                      </td>
                      <td className="p-3">{data?.course_name}</td>
                      <td className="p-3 line-clamp">{data?.desc}</td>
                      <td className="p-3">{data?.author}</td>
                      <td className="p-3" style={{ width: 150 }}>
                        <span className={`${data.status == "active" ? "bg-success" : "bg-danger"} p-1 px-3 rounded-pill text-white`}>{data?.status ? data.status : "incative"}</span>
                      </td>
                      <td className="">
                        <IconButton
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop1"
                          onClick={() => {
                            setEditId(data?.id);
                            setEditStatus(data?.status);
                            setEditValues({
                              course_name: data?.course_name,
                              desc: data?.desc,
                              author: data?.author,
                              slug: data?.slug,
                              status: data?.status,
                              thumbnail: data?.thumbnail,
                            });
                            setUpdate(update + 1);
                          }}>
                          <ModeEditOutline />
                        </IconButton>

                        <Tooltip title="Delete The Course">
                          <IconButton
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You wanted to delete this course!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  try {
                                    const res = await apiAuth.delete("admin/course?id=" + data?.id);
                                    if (res.status == 200) {
                                      Swal.fire({
                                        icon: "success",
                                      });
                                      setUpdate(update + 1);
                                    }
                                  } catch (error) {
                                    Swal.fire({
                                      width: 400,
                                      title: error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check  your Network Connection",
                                      icon: "error",
                                    });
                                  }
                                }
                              });
                            }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Go To Sections Of This Course">
                          <IconButton
                            onClick={() => {
                              navigate(`sections/${data?.id}`);
                            }}>
                            <AssistantDirectionIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <QuizControl />
        {/* Modal For Course Add  */}
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Add Course
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={Formik.handleSubmit} autoComplete="off">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        required
                        className="col-6"
                        id="course_name"
                        name="course_name"
                        label="Course Name"
                        type="text"
                        value={Formik.values.course_name}
                        onChange={Formik.handleChange}
                        // defaultValue="Hello World"
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        disabled
                        id="slug"
                        name="slug"
                        label="Slug"
                        // defaultValue="Hello World"
                        type="text"
                        value={slugify(Formik.values.course_name).toLowerCase()}
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                        helperText="Slug is auto generated and not editable"
                        onChange={Formik.handleChange}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField fullWidth id="desc" label="Description" type="text" name="desc" value={Formik.values.desc} onChange={Formik.handleChange} />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        fullWidth
                        id="thumbnail"
                        label="Thumbnail"
                        type="file"
                        name="thumbnail"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          if (e.target.files.length) {
                            Formik.setFieldValue("thumbnail", e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <div class="form-check form-switch">
                        <label class="form-check-label fs-6 col-12 " htmlfor="status">
                          Status
                        </label>
                        <div className="d-flex justify-content-around  mt-2 border rounded-3">
                          <Switch
                            id="status"
                            className="text-start"
                            onClick={() => {
                              setStatus(status === "active" ? "inactive" : "active");
                            }}
                            defaultChecked
                          />
                          <span className="fs-6 pt-2 text-center" style={{ maxWidth: "50px" }}>
                            {" "}
                            {status.toLocaleUpperCase()}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField fullWidth id="author" name="author" label="Author" value={Formik.values.author} type="text" onChange={Formik.handleChange} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-3">
                    <Button fullWidth className="rounded-0" type="submit" color="success" size="lg" data-bs-dismiss="modal" variant="outlined">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal For Course Edit  */}
        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  EDIT COURSE
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form
                  onSubmit={Editformik.handleSubmit}
                  // autoComplete="off"
                >
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <TextField fullWidth required id="course_name" name="course_name" label="Course Name" type="text" value={Editformik.values.course_name} onChange={Editformik.handleChange} />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField
                        disabled
                        fullWidth
                        id="slug"
                        name="slug"
                        label="Slug"
                        // defaultValue="Hello World"
                        type="text"
                        value={slugify(Editformik.values.course_name).toLowerCase()}
                        onChange={Editformik.handleChange}
                        InputProps={{
                          readOnly: true,
                        }}
                        helperText="Slug is auto generated and not editable"
                      />
                    </div>
                    <div className="col-12">
                      <TextField fullWidth id="desc" label="Description" type="text" name="desc" value={Editformik.values.desc} onChange={Editformik.handleChange} />
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="d-flex">
                        <Avatar className="me-2" variant="rounded" sx={{ width: 96, height: 56 }} alt="thumbnail" src={Editformik.values.thumbnail} />
                        <TextField
                          fullWidth
                          id="thumbnail"
                          label="Thumbnail"
                          type="file"
                          name="thumbnail"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => {
                            if (e.target.files.length) {
                              Editformik.setFieldValue("thumbnail", e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div class="form-check form-switch">
                        <label class="form-check-label fs-6 col-12 " htmlfor="status">
                          Status
                        </label>

                        <div className="d-flex justify-content-around  mt-2 border rounded-3">
                          <Switch
                            id="status"
                            className="text-start"
                            values={editStatus}
                            onClick={() => {
                              setEditStatus(editStatus === "active" ? "inactive" : "active");
                            }}
                            defaultChecked
                          />
                          <span className="fs-6 pt-2 text-center" style={{ maxWidth: "50px" }}>
                            {" "}
                            {editStatus.toLocaleUpperCase()}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <TextField fullWidth id="author" name="author" label="Author" value={Editformik.values.author} type="text" onChange={Editformik.handleChange} />
                    </div>
                    <div className="col-12 col-lg-6">
                      <Button fullWidth type="submit" color="success" className="py-3 rounded-0" data-bs-dismiss="modal" variant="contained">
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCourses;
