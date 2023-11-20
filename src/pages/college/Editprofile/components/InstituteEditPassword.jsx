import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { apiAuth } from "api";
import { useGlobalContext } from "global/context";
import IconButton from "@mui/material/IconButton";
import {  CancelOutlined,  CheckCircleOutline, CheckCircleOutlineOutlined, Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import useError from "lib/errorResponse";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

const InstituteEditPassword = () => {
  const { userData, token } = useGlobalContext();
  const { ErrorResponder } = useError();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //Reset Password
  const passwordformik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      toast.dismiss();
      toast.loading("Updating Password please wait.");
      const formData = new FormData();
      formData.append("password", values.oldpassword);
      formData.append("newpassword", values.password);
      formData.append("type", userData.type);
      formData.append("email", userData.email);
      if (token) {
        try {
          const res = await apiAuth.post(`/auth/changepassword?id=${userData.id}`, formData, {
            headers: {
              Authorization: token,
            },
          });
          switch (res?.data?.status) {
            case "success":
              toast.dismiss();
              toast.success(res.data.message);
              resetForm();
              break;
            case "warning":
              toast.dismiss();
              toast.warning(res.data.message);
              break;
            case "error":
              toast.dismiss();
              toast.error(res.data.message);
              break;
            default:
              toast.dismiss();
              toast(res.data.message);
              break;
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
    },
  });
  return (
    <div>
      {/* Account Password  */}
      <div className="row row-cols-1 row-cols-lg-2 g-2">
        <div className="col">
          <h5>Change Account Password</h5>
        </div>
        <div className="col">
          <form onSubmit={passwordformik.handleSubmit}>
            <div className="row gy-2">
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                  <OutlinedInput
                    id="oldpassword"
                    name="oldpassword"
                    label="Old Password"
                    type={showOldPassword ? "text" : "password"}
                    value={passwordformik.values.oldpassword}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.oldpassword && Boolean(passwordformik.errors.oldpassword)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowOldPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.oldpassword && passwordformik.errors.oldpassword}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={passwordformik.values.password}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.password && Boolean(passwordformik.errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.password && passwordformik.errors.password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordformik.values.confirm_password}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.confirm_password && Boolean(passwordformik.errors.confirm_password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowConfirmPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.confirm_password && passwordformik.errors.confirm_password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <Button startIcon={<CheckCircleOutlineOutlined />} color="success" variant="outlined" className="ms-auto" size="large" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      {/* Social Login Methods  */}
      <div className="row row-cols-1 row-cols-lg-2 g-2 mt-3">
        <div className="col">
          <h5>Change Account Password</h5>
        </div>
        <div className="col">
          <div className="table-responsive border">
            <Table borderless>
              <tbody>
                <tr>
                  <td className="p-3">
                    <Google color="error" />
                    &nbsp;Google+
                  </td>
                  <td className="p-3">
                    <CheckCircleOutline color="success" />
                    &nbsp;Enabled
                  </td>
                  <td className="p-3">
                    <button className="text-capitalize btn btn-danger rounded-0  btn-sm">UnLink</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">
                    <Facebook color="primary" />
                    &nbsp;Facebook
                  </td>
                  <td className="p-3">
                    <CancelOutlined color="error" />
                    &nbsp;Not Linked
                  </td>
                  <td className="p-3">
                    {" "}
                    <button className="text-capitalize btn btn-success rounded-0 btn-sm">Link</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteEditPassword;
