import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useGlobalContext } from "global/context";
import { useNavigate } from "react-router-dom";
import { SettingsOutlined } from "@mui/icons-material";
import {NotificationMenu} from "components/notification";

export const AvatarMenu = ({ handlelogout }) => {
  const { userData } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-center">
        <NotificationMenu />
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 40, height: 40 }} alt={userData?.first_name} src={userData?.logo || userData?.profile || ""}></Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
              ml: -0.5,
              mr: 2,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => {
          userData?.role==='institute'
          ?
          navigate(`/profile/institute/${userData?.id}`)
          :
          navigate(`/profile/user/${userData?.id}`)
          }}>
          <Avatar className="border" alt={userData?.first_name} src={userData?.logo || userData?.profile || ""} /> Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/setting/")}>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem className="text-danger" onClick={handlelogout}>
          <ListItemIcon>
            <Logout fontSize="small" className="text-danger" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
