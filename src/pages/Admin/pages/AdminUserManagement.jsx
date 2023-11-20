import { DeleteForever, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { apiAuth, apiJsonAuth } from "api";
import { useFormik } from "formik";
import { useGlobalContext } from "global/context";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const adminFormValidation = new Yup.object().shape({
  first_name: Yup.string().max(100).required("First Name is Required"),
  last_name: Yup.string().max(100).required("Last Name is Required"),
  email: Yup.string().email().required("Email is required"),
  contact: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
  role: Yup.string().required("Role is Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
    .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const AdminUserManagement = () => {
  let { userData, adminRoles } = useGlobalContext();
  const [showPassword, setShowPassword] = React.useState(false);
  let [adminData, setAdminData] = useState([]);
  let [id, setId] = useState("");
  let [update, setUpdate] = useState(0);
  let [editRole, setEditRole] = useState("");
  let [changeRole, setChangeRole] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    // enableReinitialize:true,
    validationSchema: adminFormValidation,

    onSubmit: async (values, action) => {
      try {
        const res = await apiJsonAuth.post("admin/register", values);
        if (res.status === 200) {
          setUpdate(update + 1);
          toast.success("Registered Successfully");
          action.resetForm();
        }
      } catch (err) {
        toast.error("Something Went Wrong");
      }
    },
  });

  async function getAdminsData() {
    try {
      const result = await apiJsonAuth.get("admin/data");
      if (result.status === 200) {
        setAdminData(result?.data?.result);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteAdmin(id) {
    try {
      const res = await apiJsonAuth.delete("admin/delete?id=" + id);
      if (res.status === 200) {
        setUpdate(update + 1);
        toast.success("Deleted Successfully");
      }
    } catch (err) {
      console.lor(err);
      toast.error("Something went wrong");
    }
  }

  const editAdminRole = async (e) => {
    try {
      const res = await apiJsonAuth.put("admin/update?id=" + id, {
        role: e.target.value,
      });
      if (res.status === 200) {
        setId("");
        setEditRole("");
        setChangeRole(false);
        setUpdate(update + 1);
        toast.success("Role Updated Successfully");
      }
    } catch (err) {
      toast.warning("something went wrong");
    }
  };

  useEffect(() => {
    getAdminsData();
  }, [update]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <SimpleBreadCrumb2
        page={`Admin Users`}
        navdata={[{ link: "/admin", text: "Home", active: true }]}
      />
      <div className="container py-3">
        <>
          <div className="mb-3" hidden={!(adminRoles() === 1)}>
            <Button
              style={{ background: "#f5841d", color: "white" }}
              variant="contained"
              sx={{ p: 2 }}
              color="warning"
              class="text-warning"
              onClick={handleShow}
            >
              Register Admin
            </Button>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <Modal.Body>
              <div
                hidden={!(adminRoles() === 1)}
                class=" modal-dialog-scrollable modal-dialog-centered modal-lg "
              >
                <Form onSubmit={formik.handleSubmit}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Admin Registration
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div>
                        <div className="row row-cols-1 row-cols-lg-2 g-2">
                          <div className="col">
                            <Form.Group>
                              <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="First Name"
                                type="text"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                name="first_name"
                                error={
                                  formik.touched.first_name &&
                                  formik.errors.first_name
                                }
                                helperText={
                                  formik.touched.first_name &&
                                  formik.errors.first_name
                                }
                                // defaultValue="Hello World"
                              />
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <TextField
                                fullWidth
                                id="outlined"
                                value={formik.values.last_name}
                                label="Last Name"
                                type="text"
                                onChange={formik.handleChange}
                                name="last_name"
                                error={
                                  formik.touched.last_name &&
                                  formik.errors.last_name
                                }
                                helperText={
                                  formik.touched.last_name &&
                                  formik.errors.last_name
                                }
                                // autoComplete="current-password"
                              />
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <TextField
                                fullWidth
                                required
                                value={formik.values.email}
                                id="outlined-required"
                                label="Email"
                                onChange={formik.handleChange}
                                type="email"
                                name="email"
                                error={
                                  formik.errors.email && formik.touched.email
                                }
                                helperText={
                                  formik.touched.email && formik.errors?.email
                                } // defaultValue="Hello World"
                              />
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <TextField
                                fullWidth
                                required
                                id="outlined"
                                onChange={formik.handleChange}
                                label="Contact"
                                value={formik.values.contact}
                                type="number"
                                name="contact"
                                error={
                                  formik.errors.contact &&
                                  formik.touched.contact
                                }
                                helperText={
                                  formik.touched.contact &&
                                  formik.errors.contact
                                }
                                // autoComplete="current-password"
                              />
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">
                                  Password
                                </InputLabel>
                                <OutlinedInput
                                  fullWidth
                                  required
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  label="Password"
                                  name="password"
                                  id="outlined-adornment-password"
                                  error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                  }
                                  type={showPassword ? "text" : "password"}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                <FormHelperText className="text-danger">
                                  {formik.touched.password &&
                                    formik.errors.password}
                                </FormHelperText>
                              </FormControl>
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">
                                  Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                  fullWidth
                                  required
                                  onChange={formik.handleChange}
                                  label="Confirm Password"
                                  name="confirm_password"
                                  error={
                                    formik.touched.confirm_password &&
                                    Boolean(formik.errors.confirm_password)
                                  }
                                  id="outlined-adornment-confirm-password"
                                  type={showPassword ? "text" : "password"}
                                  value={formik.values.confirm_password}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                <FormHelperText className="text-danger">
                                  {formik.touched.confirm_password &&
                                    formik.errors.confirm_password}
                                </FormHelperText>
                              </FormControl>
                            </Form.Group>
                          </div>
                          <div className="col">
                            <Form.Group>
                              <select
                                defaultValue=""
                                onChange={formik.handleChange}
                                required
                                className="form-select "
                                name="role"
                                aria-label="Default select example"
                                error={
                                  formik.touched.role && formik.errors.role
                                }
                                helperText={
                                  formik.touched.first_name &&
                                  formik.errors.first_name
                                }
                              >
                                <option value="" disabled>
                                  Select Admin Role
                                </option>
                                <option value="subAdmin">Sub Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                              </select>
                            </Form.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal.Footer class="text-center mt-3 mb-2">
                    <Button
                      color="success"
                      variant="contained"
                      className="py-3 text-white bg-success w-50 rounded-2 "
                      size="large"
                      fullWidth
                      type="submit"
                      onClick={handleClose}
                    >
                      Submit{" "}
                    </Button>
                  </Modal.Footer>
                </Form>
              </div>
            </Modal.Body>
          </Modal>
        </>
        <table
          hidden={!(adminRoles() === 1)}
          class="designed-table table table-bordered align-middle mb-0"
        >
          <thead>
            <tr className="bg-light">
              <th scope="col" className="p-2">
                id
              </th>
              <th scope="col" className="p-2 px-1">
                Name
              </th>
              <th scope="col" className="p-2 px-1">
                Email
              </th>
              <th scope="col" className="p-2 px-1">
                Contact
              </th>
              <th scope="col" className="p-2 px-1">
                Role
              </th>
              <th scope="col" className="p-2 px-1">
                Status
              </th>
              <th scope="col" className="p-2 px-1">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {adminData?.map((data) => {
              return (
                <>
                  <tr className="border-bottom">
                    <th className="p-2" scope="row">
                      {data?.id}
                    </th>
                    <td className="p-2 px-1">
                      {" "}
                      {data?.first_name + " " + data?.last_name}
                    </td>
                    <td className="p-2 px-1">{data?.email}</td>
                    <td className="p-2 px-1">{data?.contact}</td>
                    {changeRole && id == data?.id ? (
                      <div className="d-flex">
                        <select
                          defaultValue=""
                          value={editRole}
                          onChange={editAdminRole}
                          required
                          className="form-select form-select-sm w-75 mt-2 "
                          name="role"
                          aria-label="Default select example"
                          // error={Editformik.touched.role && formik.errors.role}
                          // helperText={formik.touched.first_name && formik.errors.first_name}
                        >
                          {/* <option value="" disabled>Select Admin Role</option> */}
                          <option value="subAdmin">Sub Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                        {/* <button type="Submit" className=" border-0" ><i class="bi bi-check-lg"></i></button> */}
                      </div>
                    ) : (
                      <td className={`pt-3  pb-3`}>
                        {data?.role} &nbsp;{" "}
                        <IconButton
                          className="p-1"
                          onClick={(e) => {
                            setEditRole(data?.role);
                            setId(data?.id);
                            setChangeRole(changeRole === false ? true : false);
                          }}
                        >
                          <EditIcon className="fs-5" />
                        </IconButton>
                      </td>
                    )}
                    {/* <td className={`pt-3 data-role-${data?.id} pb-3`}>{data?.role} &nbsp; <IconButton ><EditIcon/></IconButton></td> */}
                    <td className="p-3">{data?.status}</td>
                    <td>
                      <IconButton
                        color="error"
                        className="p-1"
                        onClick={() => {
                          deleteAdmin(data?.id);
                        }}
                      >
                        <DeleteForever className="fs-4" />
                      </IconButton>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUserManagement;
// export  {AdminRoles};


