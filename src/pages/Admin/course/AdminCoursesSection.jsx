import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiAuth, apiJsonAuth } from 'api';
import DeleteIcon from '@mui/icons-material/Delete';
import { pop2 } from 'layout/Popup';
import { toast } from 'react-toastify';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { Avatar, Box, Button, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import { AddCircleOutline, EditAttributesOutlined, LocationCity, ModeEditOutline } from '@mui/icons-material';
import Swal from 'sweetalert2';

function AdminCoursesSection() {
  let [status, setStatus] = useState('active');
  let [sections, setSections] = useState([]);
  let location = useLocation();
  let navigate = useNavigate();

  let pathArr = location.pathname.split('/');
  let id = pathArr[pathArr.length - 1];
  let [update, setUpdate] = useState(0);
  let [editId, setEditId] = useState();

  let [editValues, setEditValues] = useState({
    title: '',
    description: '',
    status: '',
    courseId: '',
  });
  let [editStatus, setEditStatus] = useState(editValues.status ? editValues.status : 'active');

  const getAdminCoursesSections = async () => {
    try {
      const res = await apiAuth.get('admin/course/section?id=' + id);
      if (res.status === 200) {
        setSections(res?.data?.result);
      }
    } catch (err) {}
  };

  const Formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: '',
      courseId: '',
      // type: "",
      // order: '',
    },
    onSubmit: async (values, action) => {
      toast.loading('loading...');
      const data = { ...values, status: status, courseId: id };
      try {
        const res = await apiJsonAuth.post('admin/course/section', data);
        if (res.status === 200) {
          // action.resetForm();
          // dashboard/courses/sections/videos
          toast.dismiss();
          toast('Section Added Successfully');
        }
      } catch (err) {
        pop2('Error' + ' ' + err);
      }
    },
  });
  useEffect(() => {
    EditFormik.values.title = editValues?.title;
    EditFormik.values.description = editValues?.description;
  }, [editValues, update]);
  const EditFormik = useFormik({
    initialValues: {
      title: editValues?.title,
      description: editValues?.description,
    },

    onSubmit: async (values, action) => {
      toast.loading('loading...');
      const data = { ...values, status: editStatus, courseId: id, id: editId };
      try {
        const res = await apiJsonAuth.put('admin/course/section', data);
        if (res.status === 200) {
          action.resetForm();
          toast.dismiss();
          toast('Section Edited Successfully');
          setUpdate(update + 1);
        }
      } catch (err) {
        pop2('Error' + ' ' + err);
      }
    },
  });

  useEffect(() => {
    getAdminCoursesSections();
  }, [update]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          color="success">
          Go Back
        </Button>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Add&nbsp;New&nbsp;Section
        </button>
      </div>
      <div className="table-responsive border rounded mt-3">
        <table className="designed-table table table-borderless align-middle mb-0">
          <thead>
            <tr className="bg-light ">
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Section&nbsp;Title
              </th>
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Description
              </th>
              {/* <th scope="col" className='fw-semibold text-capitalize p-3'>Type</th> */}
              {/* <th scope="col" className='fw-semibold text-capitalize p-3' >Order</th> */}
              <th scope="col" className="fw-semibold text-capitalize p-3">
                Status
              </th>

              <th scope="col" className="fw-semibold text-capitalize p-3" style={{ width: 100 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sections?.map((section) => {
              return (
                <>
                  <tr className="border-bottom">
                    <td className="p-2" width={50}>
                      {section?.title}
                    </td>
                    <td className="p-3 line-clamp">{section?.description}</td>
                    {/* <td className='p-3 ' >
                      {section?.type}
                    </td> */}
                    {/* <td className='p-3' >
                      {section?.order}
                    </td> */}
                    <td className="p-3" style={{ width: 150 }}>
                      <span className={`${section.status == 'active' ? 'bg-success' : 'bg-danger'} p-1 px-3 rounded-pill text-white`}>
                        {section?.status ? section.status : 'incative'}
                      </span>
                    </td>
                    <td className="">
                      <Tooltip title="Edit Course">
                        <IconButton
                          onClick={() => {
                            setEditValues({
                              title: section?.title,
                              description: section?.description,
                              status: section?.status,
                              courseId: section?.courseId,
                            });
                            setEditId(section?.id);
                            setUpdate(update + 1);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop1">
                          <ModeEditOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete The Course">
                        <IconButton
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure?',
                              text: 'You wanted to delete this student!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                try {
                                  const res = await apiJsonAuth.delete('admin/course/section?id=' + section?.id);
                                  if (res.status == 200) {
                                    Swal.fire({
                                      icon: 'success',
                                    });
                                    setUpdate(update + 1);
                                  }
                                } catch (error) {
                                  Swal.fire({
                                    width: 400,
                                    title: error?.response?.data?.message
                                      ? error?.response?.data?.message
                                      : 'Something Went Wrong Check  your Network Connection',
                                    icon: 'error',
                                  });
                                }
                              }
                            });
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>{' '}
                      <Tooltip title="Go To Videos Of This Section">
                        <IconButton
                          onClick={() => {
                            navigate(`videos/${section?.id}`);
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
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container shadow p-3 mb-5 bg-body-tertiary rounded">
                <p className="text-center fs-1 my-4"> ADD Section </p>
                <form onSubmit={Formik.handleSubmit} autoComplete="off">
                  <div className="d-flex flex-wrap justify-content-around">
                    <TextField
                      required
                      className="col-5"
                      id="title"
                      name="title"
                      label="Title"
                      type="text"
                      value={Formik.values.title}
                      onChange={Formik.handleChange}
                      // defaultValue="Hello World"
                    />

                    <TextField
                      disabled
                      id="courseId"
                      className="col-5"
                      name="courseId"
                      label="CourseId"
                      type="number"
                      value={id}
                      helperText="CourseId is auto generated and not editable"
                      onChange={Formik.handleChange}
                    />
                    <TextField
                      className="col-5 my-3"
                      id="description"
                      label="Description"
                      type="text"
                      name="description"
                      value={Formik.values.description}
                      onChange={Formik.handleChange}
                    />

                    {/* <TextField
                                className='col-5 my-3'
                                id="type"
                                label="Type"
                                type='number'
                                name='type'

                                onChange={Formik.handleChange}
                            /> */}

                    <div class="form-check form-switch p-0 ms-2 col-4">
                      <label class="form-check-label fs-6 col-12 " htmlfor="status">
                        Status
                      </label>

                      <div className="d-flex justify-content-around  mt-2 border rounded-3">
                        <Switch
                          id="status"
                          className="text-start"
                          onClick={() => {
                            setStatus(status === 'active' ? 'inactive' : 'active');
                          }}
                          defaultChecked
                        />
                        <span className="fs-6 pt-2 text-center" style={{ maxWidth: '50px' }}>
                          {' '}
                          {status.toLocaleUpperCase()}{' '}
                        </span>
                      </div>
                    </div>

                    {/* <TextField id="order" className='col-5 ms-1 my-3' name='order' label="Order" value={Formik.values.order} type="number" onChange={Formik.handleChange} /> */}
                  </div>
                  <div className="d-grid gap-2 col-8 " style={{ margin: '30px 0px 30px 120px' }}>
                    <Button type="submit" color="success" variant="outlined" data-bs-dismiss="modal">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {/* <button type="button" class="btn btn-primary">Understood</button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                EDIT SECTION
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container shadow p-3 mb-5 bg-body-tertiary rounded">
                <p className="text-center fs-1 my-4"> EDIT SECTION </p>
                <form onSubmit={EditFormik.handleSubmit} autoComplete="off">
                  <div className="d-flex flex-wrap justify-content-around">
                    <TextField
                      required
                      className="col-5"
                      id="title"
                      name="title"
                      label="Title"
                      type="text"
                      value={EditFormik.values.title}
                      onChange={EditFormik.handleChange}
                      // defaultValue="Hello World"
                    />

                    <TextField
                      disabled
                      id="courseId"
                      className="col-5"
                      name="courseId"
                      label="CourseId"
                      type="number"
                      value={id}
                      helperText="CourseId is auto generated and not editable"
                      onChange={EditFormik.handleChange}
                    />
                    <TextField
                      className="col-5 my-3"
                      id="description"
                      label="Description"
                      type="text"
                      name="description"
                      value={EditFormik.values.description}
                      onChange={EditFormik.handleChange}
                    />

                    {/* <TextField
                                className='col-5 my-3'
                                id="type"
                                label="Type"
                                type='number'
                                name='type'

                                onChange={Formik.handleChange}
                            /> */}

                    <div class="form-check form-switch p-0 ms-2 col-4">
                      <label class="form-check-label fs-6 col-12 " htmlfor="status">
                        Status
                      </label>

                      <div className="d-flex justify-content-around  mt-2 border rounded-3">
                        <Switch
                          id="status"
                          value={editStatus}
                          className="text-start"
                          onClick={() => {
                            setEditStatus(editStatus === 'active' ? 'inactive' : 'active');
                          }}
                          defaultChecked
                        />

                        <span className="fs-6 pt-2 text-center" style={{ maxWidth: '50px' }}>
                          {' '}
                          {editStatus.toLocaleUpperCase()}{' '}
                        </span>
                      </div>
                    </div>
                    {}

                    {/* <TextField id="order" className='col-5 ms-1 my-3' name='order' label="Order" value={Formik.values.order} type="number" onChange={Formik.handleChange} /> */}
                  </div>
                  <div className="d-grid gap-2 col-8 " style={{ margin: '30px 0px 30px 120px' }}>
                    <Button type="submit" color="success" variant="outlined" data-bs-dismiss="modal">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {/* <button type="button" class="btn btn-primary">Understood</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCoursesSection;
