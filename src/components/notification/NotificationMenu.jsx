import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Tab, Tabs } from "react-bootstrap";

export const NotificationItem = ({ singlenotify }) => {
  const navigate = useNavigate();
  return (
    <MenuItem
      onClick={() => {
        navigate("/notification/" + singlenotify?.id);
      }}
      key={singlenotify?.id}
      className="text-wrap notification-item">
      <div className="d-flex">
        <div className="lh-1">
          <h6 className="mb-0 headline">{singlenotify?.heading}</h6>
          <h6 className="fw-light my-0 text-secondary subline">
            <small>{singlenotify?.subheading}</small>
          </h6>
          <small className="text-dark date">{moment(singlenotify?.createdAt).calendar()}</small>
        </div>
      </div>
    </MenuItem>
  );
};

export function NotificationMenu() {
  const navigate = useNavigate();
  const { userData } = useGlobalContext();
  const [notify, setNotify] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function fetchNotification() {
    apiJsonAuth
      .get("/public/notification", {
        unique_id: userData?.id,
        reference_id: userData?.instituteId,
        role: userData?.role,
      })
      .then((result) => {
        setNotify(result.data.notify);
      })
      .catch((error) => console.error(error));
  }
  React.useEffect(() => {
    if (userData) {
      // fetchNotification();
    }
  }, []);
  return (
    <>
      <IconButton size="sm" className="bg-white ms-1 p-0" aria-label="show 17 new notifications" color="inherit" id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        <Badge badgeContent={notify.length} color="error" variant="outlined" sx={{ fontSize: 5 }}>
          <NotificationsIcon color="warning" className="fs-4" />
        </Badge>
      </IconButton>
      <Menu
        disableScrollLock={true}
        className=" "
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            overflow: "hidden",
            mt: 1.5,
            scrollbarWidth: "1px",
            paddingTop: "0px",
            borderRadius: "20px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
        <div className="px-3 pt-2 pb-0 mb-0 border-0">
          <h6>Notifications</h6>
        </div>
        <div
          className="scroll-minibar p-0"
          style={{
            overflow: "auto",
            minHeight: "400px",
            maxWidth: "400px",
            minWidth: 280,
            width: "100%",
            maxHeight: "50vh",
          }}>
          <Tabs defaultActiveKey="unread" id="uncontrolled-tab-example" className="mb-2 notificationTab">
            <Tab eventKey="unread" title="Unread">
              <div>
                {notify.length ? (
                  notify?.map((singlenotify) => <NotificationItem singlenotify={singlenotify} />)
                ) : (
                  <div className="p-2 d-flex align-items-center justify-content-center flex-column">
                    <img src="/images/icons/notification.png" alt="notification" className="w-100" />
                    <h4>No Notifications Yet</h4>
                  </div>
                )}
              </div>
            </Tab>
            <Tab
              eventKey="read"
              title={
                <span>
                  <i className="bi bi-check-circle"></i> Read
                </span>
              }>
              <div>
                {notify.length ? (
                  notify?.map((singlenotify) => <NotificationItem singlenotify={singlenotify} />)
                ) : (
                  <div className="p-2 d-flex align-items-center justify-content-center flex-column">
                    <img src="/images/icons/notification.png" alt="notification" className="w-100" />
                    <h4>No Notifications Yet</h4>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Menu>
    </>
  );
}
