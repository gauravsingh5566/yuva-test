import { DeleteForever, EditTwoTone, Person } from '@mui/icons-material';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { Popup } from 'layout/Popup';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import { useGlobalContext } from 'global/context';

const YouthGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [resourcesLibrary, setResourceslibrary] = useState([]);
  const [resourceId, setresourceId] = useState();
  const { token } = useGlobalContext();
  let [updater, setUpdater] = useState(0);
  let [form, setForm] = useState('add');
  let [resourcesLibraryForm, setResourcesLibraryForm] = useState('add');
  let [namee, setNamee] = useState();
  let [profile, setProfile] = useState();
  let [subInfo, setSubInfo] = useState();
  let [contentt, setContent] = useState();
  const { adminRoles } = useGlobalContext();

  let [orderr, setOrder] = useState();

  let [idd, setId] = useState();
  let [groupId, setgroupId] = useState();
  let [groupName, setgroupName] = useState();
  let [Title, setTitle] = useState();
  let [Description, setDescription] = useState();
  let [Pdf, setPdf] = useState();

  const fetchYouthGallery = async () => {
    try {
      const response = await apiJsonAuth.get('/content/youthgallery');
      if (response.status === 200) {
        setGallery(response?.data?.resources);
      }
    } catch (error) {
      Popup('error', error?.response?.data?.message);
    }
  };
  const fetchResourcesLibrary = async () => {
    try {
      const response = await apiJsonAuth.get('/admin/content/resource-library');
      if (response.status === 200) {
        setResourceslibrary(response.data.result);
      }
    } catch (error) {
      Popup('error', error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchYouthGallery();
      fetchResourcesLibrary();
    }
  }, [updater]);
  async function Updation(attr, values, id) {
    try {
      if (attr == 'update' || attr == 'add') {
        const response = await apiAuth.post('/admin/youthgallery?attr=' + attr, values);
        if (response.status == 200) {
          fetchYouthGallery();
        }
      } else {
        const formData = new FormData();
        formData.append('id', id);
        const response = await apiAuth.post('/admin/youthgallery?attr=' + attr, formData);
        if (response.status == 200) {
          fetchYouthGallery();
        }
      }
    } catch (error) {
      Popup('error', error.response.data.message);
    }
  }

  // s
  const addFormik = useFormik({
    initialValues: {
      name: '',
      subinfo: '',
      order: '',
      content: '',
    },
    onSubmit: async (values, actions) => {
      Updation('add', values);
      actions.resetForm();
    },
  });

  const editFormik = useFormik({
    initialValues: {
      name: namee,
      subinfo: subInfo,
      order: orderr,
      content: contentt,
      id: idd,
    },
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      Updation('update', values);
    },
  });

  const addResourceFormik = useFormik({
    initialValues: {
      group_id: '',
      group_name: '',
      title: '',
      description: '',
      pdf: '',
    },
    onSubmit: async (values, actions) => {
      const res = await apiAuth.post('admin/content/resource-library', values);
      if (res.status == 200 || res?.success == 1) {
        actions.resetForm();
        setUpdater(updater + 1);
      }

      actions.resetForm();
    },
  });

  const editResourceFormik = useFormik({
    initialValues: {
      group_id: groupId,
      group_name: groupName,
      title: Title,
      description: Description,
      pdf: Pdf,
    },

    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      const res = await apiAuth.put(`/admin/content/resource-library/${idd}`, values);
      if (res.status == 200 || res?.success == 1) {
        setResourcesLibraryForm();
        setUpdater(updater + 1);
        actions.resetForm();
      }
    },
  });

  return (
    <>
      <div>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <div className="d-flex justify-content-between">
              <div className="">
                {' '}
                <h5>Added Youths</h5>
              </div>
              <div className="">
                {' '}
                <Button
                  hidden={!(adminRoles() === 1)}
                  variant="outlined"
                  color="success"
                  className=""
                  type="button"
                  onClick={() => {
                    setForm('add');
                    setUpdater(updater + 1);
                  }}>
                  {' '}
                  Add Youth{' '}
                </Button>
              </div>
            </div>

            <div className="table-responsive border pb-0">
              <table className="table designed-table mb-0 table-borderless">
                <thead>
                  <tr className="p-3 bg-light">
                    <th scope="col">Profile</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sub Info</th>
                    <th hidden={adminRoles() === 5} scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gallery?.map((ele, i) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Avatar src={ele?.img} sx={{ backgroundColor: 'orange' }}>
                            <Person />
                          </Avatar>
                        </th>
                        <td>{ele.name}</td>
                        <td>{ele.subinfo}</td>
                        <td hidden={adminRoles() === 5}>
                          {/* <IconButton sx={{ color: "indigo" }}>
                          <EditTwoTone />
                        </IconButton> */}
                          <IconButton
                            hidden={adminRoles() === 3}
                            sx={{ color: 'tomato' }}
                            onClick={async () => {
                              // Updation("delete", undefined,ele?.id);
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
                                    Updation('delete', undefined, ele?.id);
                                    Swal.fire({
                                      icon: 'success',
                                    });
                                    setUpdater(updater + 1);
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
                            <DeleteForever />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setForm('update');
                              setNamee(ele.name);
                              setProfile(ele?.img);
                              setSubInfo(ele.subinfo);
                              setContent(ele.content);
                              setId(ele.id);
                              setOrder(ele.orderInt);
                            }}>
                            <EditTwoTone />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {form === 'add' ? (
            <div hidden={!(adminRoles() === 1)} className="col">
              <div className="container">
                <h5 className="text-center">Add a youth to Youth Gallery</h5>
                <form onSubmit={addFormik.handleSubmit}>
                  <div className="row gy-3">
                    {/* <div className="col-lg-12">
                  <TextField
                  type="hidden"
                    name="id"
                    fullWidth
                    label="id"
                    value={addFormik.values.id}
                    onChange={addFormik.handleChange}
                  />
                </div> */}
                    <div className="col-lg-12">
                      <TextField name="name" fullWidth label="Youth Name" value={addFormik.values.name} onChange={addFormik.handleChange} />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="subinfo"
                        fullWidth
                        label="Youth Information"
                        value={addFormik.values.subinfo}
                        onChange={addFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <Button fullWidth className="p-2" variant="outlined">
                        <input
                          type="file"
                          name="img"
                          accept=".png, .jpg, .jpeg"
                          id="img"
                          onClick={(e) => {
                            e.target.value = null;
                          }}
                          onChange={(e) => {
                            if (e.target.files.length) {
                              addFormik.setFieldValue('img', e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    </div>
                    <div className="col-lg-12">
                      <TextField type="text" name="order" label="Order" fullWidth value={addFormik.values.order} onChange={addFormik.handleChange} />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="content"
                        label="Content for the Youth"
                        fullWidth
                        multiline
                        rows={4}
                        value={addFormik.values.content}
                        onChange={addFormik.handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <Button className="text-capitalize p-3" variant="outlined" color="success" fullWidth type="submit">
                        Add to Youth Gallery
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="col">
              <div className="container">
                <h5 className="text-center">Edit a Youth Gallery</h5>
                <form onSubmit={editFormik.handleSubmit}>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <TextField name="name" fullWidth label="Youth Name" value={editFormik.values.name} onChange={editFormik.handleChange} />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="subinfo"
                        fullWidth
                        label="Youth Information"
                        value={editFormik.values.subinfo}
                        onChange={editFormik.handleChange}
                      />
                    </div>
                    <div className=" d-flex col-lg-12">
                      <img className="me-3" src={profile} width={50} height={50} />
                      <TextField
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="files[]"
                        fullWidth
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                        onChange={(e) => {
                          if (e.target.files.length) {
                            editFormik.setFieldValue('img', e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        type="text"
                        name="order"
                        label="Order"
                        fullWidth
                        value={editFormik.values.order}
                        onChange={editFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="content"
                        label="Content for the Youth"
                        fullWidth
                        multiline
                        rows={4}
                        value={editFormik.values.content}
                        onChange={editFormik.handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <Button className="text-capitalize p-3" variant="outlined" color="success" fullWidth type="submit">
                        Edit Youth Gallery
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      {/* RESOURCES LIBRARY  */}
      <div>
        <div className="">
          <div className="">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Added Resources</h5>
              </div>
              <div className="mb-2">
                <Button
                  hidden={!(adminRoles() === 1)}
                  variant="outlined"
                  type="button"
                  onClick={() => {
                    setResourcesLibraryForm('add');
                    setUpdater(updater + 1);
                  }}
                  color="success">
                  Add Resources
                </Button>
              </div>
            </div>

            <div className="table-responsive border pb-0">
              <table className="table designed-table mb-0 table-bordered">
                <thead>
                  <tr className="p-3 bg-light">
                    <th scope="col">file</th>
                    <th scope="col">group_id</th>
                    <th scope="col">group_name</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">posted_at</th>
                    <th hidden={adminRoles() === 5} scope="col">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resourcesLibrary?.map((ele, i) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Link to={ele.pdf} target={'_blank'}>
                            <ArticleIcon />
                          </Link>

                          {/* <a href={ele.pdf} download target={"_blank"} >
                        <ArticleIcon />
                        </a> */}
                        </th>
                        <td>{ele?.group_id}</td>
                        <td>{ele?.group_name}</td>
                        <td>{ele?.title}</td>
                        <td>{ele?.description}</td>
                        <td>{ele?.posted_at}</td>
                        <td hidden={adminRoles() === 5}>
                          <IconButton
                            hidden={adminRoles() === 3}
                            sx={{ color: 'tomato' }}
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
                                    const res = await apiAuth.delete(`/admin/content/resource-library/${ele.id}`);
                                    if (res.status == 200) {
                                      Swal.fire({
                                        icon: 'success',
                                      });
                                      setUpdater(updater + 1);
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
                            <DeleteForever />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setResourcesLibraryForm('update');
                              setgroupId(ele?.group_id);
                              setgroupName(ele?.group_name);
                              setTitle(ele?.title);
                              setDescription(ele?.description);
                              setPdf(ele.pdf);
                              setId(ele.id);
                            }}>
                            <EditTwoTone />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {resourcesLibraryForm === 'add' ? (
            <div hidden={!(adminRoles() === 1)} className="">
              <div className="container">
                <h5 className="text-center">Add a Resource Library</h5>
                <form onSubmit={addResourceFormik.handleSubmit}>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <TextField
                        name="group_id"
                        fullWidth
                        label="Group Id"
                        value={addResourceFormik.values.group_id}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="group_name"
                        fullWidth
                        label="Group Name"
                        value={addResourceFormik.values.group_name}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="title"
                        fullWidth
                        label="title"
                        value={addResourceFormik.values.title}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="description"
                        fullWidth
                        label="Description"
                        value={addResourceFormik.values.description}
                        onChange={addResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        type="file"
                        name="pdf"
                        fullWidth
                        onChange={(e) => {
                          addResourceFormik.setFieldValue('pdf', e.target.files[0]);
                        }}
                      />
                    </div>

                    <div className="col-12">
                      <Button className="text-capitalize p-3" variant="outlined" color="success" fullWidth type="submit">
                        Add Resources Library
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="col">
              <div className="container">
                <h5 className="text-center">Edit a Resource Library</h5>
                <form onSubmit={editResourceFormik.handleSubmit}>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <TextField
                        name="group_id"
                        fullWidth
                        label="Group Id"
                        value={editResourceFormik.values.group_id}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="group_name"
                        fullWidth
                        label="Group Name"
                        value={editResourceFormik.values.group_name}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="title"
                        fullWidth
                        label="title"
                        value={editResourceFormik.values.title}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        name="description"
                        fullWidth
                        label="Description"
                        value={editResourceFormik.values.description}
                        onChange={editResourceFormik.handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <TextField
                        type="file"
                        name="pdf"
                        fullWidth
                        onChange={(e) => {
                          editResourceFormik.setFieldValue('pdf', e.target.files[0]);
                        }}
                      />
                    </div>

                    <div className="col-12">
                      <Button className="text-capitalize p-3" variant="outlined" color="success" fullWidth type="submit">
                        Edit Youth Gallery
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YouthGallery;
