import { apiAuth, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { pop2, Popup } from 'layout/Popup';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import ArticleIcon from '@mui/icons-material/Article';
import moment from 'moment';
import { useGlobalContext } from 'global/context';
import { Modal } from "react-bootstrap";

function UploadResources() {
  let [edit, setEdit] = useState(false);
  let [openeditForm, setOpenEditForm] = useState(false);
  let [resourcesData, setResourcesData] = useState([]);
  let [update, setupdate] = useState(0);
  let [Title, setTitle] = useState();
  let [resourceLink, setResourceLink] = useState();
  let [Id, setId] = useState();
  let [openAddForm, setOpenAddForm] = useState(false);
  const { adminRoles } = useGlobalContext();

  let id = useParams();
  const getResourcesById = async () => {
    try {
      const res = await apiAuth.get(`admin/institute-resources/${id.id}`);
      if (res.status == 200) {
        setResourcesData(res?.data?.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getResourcesById();
  }, [update]);

  const Formik = useFormik({
    initialValues: {
      title: "",
      resource_link: "",
      resource_file: "",
    },
    onSubmit: async function (values, actions) {
      Popup("loading...");
      if (values.title && values.resource_link && values.resource_file) {
        try {
          const res = await apiAuth.post(`admin/institute-resources/${id.id}`, values);
          if (res.status == 200) {
            actions.resetForm();
            setupdate(update + 1);
          }
        } catch (err) {
          Popup("error", err?.response?.data?.message);
        }
      } else {
        pop2.warning({ title: "please fill all the fields" });
      }
    },
  });

  const Editformik = useFormik({
    initialValues: {
      id: Id ? Id : "",
      title: Title ? Title : "",
      resource_link: resourceLink ? resourceLink : "",
      resource_file: "",
    },
    enableReinitialize: true,
    onSubmit: async function (values, actions) {
      Popup("loading...");

      try {
        const res = await apiAuth.put("admin/institute-resources", values);
        if (res.status == 200) {
          actions.resetForm();
          setupdate(update + 1);
          pop2.success({ title: "Data Updated Succesfully" });
        }
      } catch (err) {
        Popup("error", err?.response?.data?.message);
      }
    },
  });

  return (
    <>
      <div className="">
        <button
          className="btn btn-warning"
          hidden={!(adminRoles() === 1)}
          onClick={() => {
            // openAddForm ? setOpenAddForm(false) : setOpenAddForm(true);
            setOpenAddForm(openeditForm ? false : true);
            setEdit(edit ? false : false);
          }}>
          Add Resources
        </button>
        <div className="resources-data table-responsive mt-3">
          <table className="table table-borderless text-capitalize">
            <thead className="table-light">
              <tr>
                <th scope="col" className="p-3 px-2">
                  title
                </th>
                <th scope="col" className="p-3 px-2">
                  Resource&nbsp;Link
                </th>
                <th scope="col" className="p-3 px-2">
                  Resource&nbsp;File
                </th>
                <th scope="col" className="p-3 px-2">
                  Created&nbsp;At
                </th>
                <th scope="col" className="p-3 px-2">
                  Updated&nbsp;At
                </th>
                <th hidden={adminRoles() === 5} scope="col" className="p-3 px-2">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {resourcesData?.map((data, index) => {
                return (
                  <tr>
                    <td>{data?.title}</td>
                    <td>{data?.resource_link}</td>
                    <td>
                      <a href={data?.resource_file}>
                        <ArticleIcon />
                      </a>{" "}
                    </td>
                    <td>{moment(data?.createdAt).fromNow()}</td>
                    <td>{moment(data?.updatedAt).fromNow()}</td>
                    <td hidden={adminRoles() === 5}>
                      <IconButton
                        onClick={() => {
                          setTitle(data?.title);
                          setResourceLink(data?.resource_link);
                          setId(data?.id);
                          setEdit(edit ? false : true);
                          setOpenAddForm(openAddForm ? false : false);
                        }}>
                        <EditTwoTone />
                      </IconButton>

                      <IconButton
                        hidden={adminRoles() === 3}
                        sx={{ color: "tomato" }}
                        onClick={async () => {
                          // Updation("delete", undefined,ele?.id);
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You wanted to delete this Resouorce!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                const res = await apiJsonAuth.delete(`admin/institute-resources?id=${data?.id}`);
                                if (res?.status == 200) {
                                  Swal.fire({
                                    title: res.data.message,
                                    icon: "success",
                                  });
                                  setupdate(update + 1);
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
                        <DeleteForever />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {/* Upload Resource Modal  */}
        <Modal show={openAddForm} onHide={() => setOpenAddForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Resources</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={Formik.handleSubmit}>
              <div class="mb-3">
                <label for="title" class="form-label">
                  Title
                </label>
                <input type="text" name="title" className="form-control " id="title" value={Formik.values.title} onChange={Formik.handleChange} />
              </div>
              <div class="mb-3">
                <label for="upload-resources-link" class="form-label">
                  Resource Link
                </label>
                <input type="text" name="resource_link" className="form-control " id="upload-resources-link" value={Formik.values.resource_link} onChange={Formik.handleChange} />
              </div>

              <div class="mb-3">
                <label for="upload-resources-file" class="form-label">
                  Resource File
                </label>
                <input
                  type="file"
                  name="resource_file"
                  className="form-control pt-3"
                  id="upload-resources-file"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Formik.setFieldValue("resource_file", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/* Edit Resource Modal  */}
        <Modal show={edit} onHide={() => setEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Resource</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={Editformik.handleSubmit}>
              <div class="mb-3">
                <label for="id" class="form-label">
                  id
                </label>
                <input type="text" name="id" className="form-control " id="id" value={Editformik.values.id} onChange={Formik.handleChange} />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">
                  Title
                </label>
                <input type="text" name="title" className="form-control" value={Editformik?.values?.title} id="title" onChange={Editformik.handleChange} />
              </div>

              <div class="mb-3">
                <label for="upload-resources-link" class="form-label">
                  Resource Link
                </label>
                <input type="text" name="resource_link" className="form-control" id="upload-resources-link" value={Editformik?.values?.resource_link} onChange={Editformik.handleChange} />
              </div>
              <div class="mb-3">
                <label for="upload-resources-file" class="form-label">
                  Resource File
                </label>
                <input
                  type="file"
                  name="resource_file"
                  className="form-control pt-3"
                  id="upload-resources-file"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      Editformik.setFieldValue("resource_file", e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default UploadResources;
