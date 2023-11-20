import { Button, Switch, TextField, useForkRef } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { pop2 } from 'layout/Popup';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminCoursesSectionVideo() {
  let [status, setStatus] = useState('active');
  let [videos, setVideos] = useState([]);
  let [update, setUpdate] = useState(0);
  let location = useLocation();
  let navigate = useNavigate();
  let pathArr = location.pathname.split('/');
  let id = pathArr[pathArr.length - 1];

  const Formik = useFormik({
    initialValues: {
      title: '',
      sectionId: '',
      path: '',
      type: '',
      status: '',
      // order: "",
    },
    onSubmit: async (values, action) => {
      toast.loading('loading');
      const data = { ...values, status: status, sectionId: id };
      try {
        const res = await apiJsonAuth.post('admin/course/section/video', data);
        if (res.status === 200) {
          toast.dismiss();
          toast('Video Added Succesfully');
          setUpdate(update + 1);
          action.resetForm();
        }
      } catch (err) {
        pop2.warning('Error' + ' ' + err);
      }
    },
  });

  const getCoursesVideos = async () => {
    try {
      const res = await apiAuth.get('admin/course/section/video?id=' + id);
      if (res.status === 200) {
        setVideos(res?.data?.result);
      }
    } catch (err) {
      pop2.warning('Error' + ' ' + err);
    }
  };

  useEffect(() => {
    getCoursesVideos();
  }, [update]);
  return (
    <>
      <div className="m-2">
        <Button
          style={{ width: '10%' }}
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          color="success">
          Go Back
        </Button>
      </div>

      <div className="row">
        <div className=" col-7 shadow p-3 mx-4 mb-5 bg-body-tertiary rounded">
          <p className="text-center fs-1 my-4"> ADD CONTENT </p>
          <form onSubmit={Formik.handleSubmit} autoComplete="off">
            <div className="d-flex flex-wrap justify-content-around">
              <TextField
                className="col-5 my-3"
                id="title"
                label="Title"
                type="text"
                name="title"
                value={Formik.values.title}
                onChange={Formik.handleChange}
              />

              <TextField
                disabled
                id="sectionId"
                className="col-5 my-2"
                name="sectionId"
                label="SectionId"
                type="number"
                value={id}
                helperText="SectionId is auto generated and not editable"
                onChange={Formik.handleChange}
              />

              <TextField
                required
                className="col-5 my-3"
                id="path"
                name="path"
                label="Path"
                type="text"
                value={Formik.values.path}
                onChange={Formik.handleChange}
                // defaultValue="Hello World"
              />

              {/* <TextField
              disabled
              id="slug"
              className='col-5'
              name='slug'
              label="Slug"
              // defaultValue="Hello World"
              type='text'
              value={slugify(Formik.values.course_name).toLowerCase()}
              // InputProps={{
              //   readOnly: true,
              // }}
              helperText="Slug is auto generated and not editable"
              onChange={Formik.handleChange}
            /> */}
              {/* <TextField
                                className='col-5 my-3'
                                id="type"
                                label="Type"
                                type='number'
                                name='type'
                                value={Formik.values.type}
                                onChange={Formik.handleChange}
                            /> */}

              <div className="col-5 my-3 ">
                <select
                  required
                  defaultValue=""
                  class="form-select "
                  id="type"
                  value={Formik.values.type}
                  onChange={Formik.handleChange}
                  name="type"
                  aria-label="Default select example">
                  <option value="" disabled>
                    Select Content Type
                  </option>
                  <option value="1">Video</option>
                  <option value="2">Document</option>
                  {/* <option value="3">Quiz</option> */}
                </select>
              </div>

              <div className="form-check form-switch p-0 ms-2 col-5">
                <label className="form-check-label fs-6 col-12 " htmlfor="status">
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
                  <span className="fs-6 pt-2 me-3 text-center" style={{ maxWidth: '50px' }}>
                    {' '}
                    {status.toLocaleUpperCase()}{' '}
                  </span>
                </div>
              </div>

              {/* <TextField id="order" className='col-5 ms-1 my-3' name='order' label="Order" value={Formik.values.order} type="number" onChange={Formik.handleChange} /> */}
            </div>
            <div className="d-grid gap-2 col-8 " style={{ margin: '30px 0px 30px 120px' }}>
              <Button type="submit" color="success" variant="outlined">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="col-4 mx-3 shadow bg-body-tertiary rounded">
          <p className="text-center mt-2 fs-1">CONTENT</p>
          <div className="accordion " id="accordionExample">
            {videos?.map((video) => {
              return (
                <>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        {video?.title}
                      </button>
                    </h2>

                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <h4 className="fs-5">{video?.path} </h4>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCoursesSectionVideo;
