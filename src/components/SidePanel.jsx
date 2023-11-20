import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { Collapse, Divider, Drawer, Paper, Toolbar, useMediaQuery } from "@mui/material";
import { Chat, ExitToAppOutlined, ExpandLess, ExpandLessTwoTone, ExpandMore, Group, Logout, YouTube } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useRoutes from "hooks/useRoutes";
import { useGlobalContext } from "global/context";
import { Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    marginLeft:20,
    marginRight: 15,
    paddingBottom: 7,
    color: "#000000",
    borderRadius: "8px",
    fontSize: "5px !important",
  },
  "&.Mui-selected, &.Mui-focusVisible": {
    backgroundColor: "#2e8b57 !important",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 10,
    color: "#000000",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px !important",
  },
});
const ColoredListComp = ({ children }) => {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: false,
            },
          },
        },
        palette: {
          mode: "dark",
          primary: { main: "#ffffff" },
          background: { paper: "#fff" },
        },
      })}>
      <Paper elevation={0} sx={{ maxWidth: 280 }}>
        <FireNav component="nav">{children}</FireNav>
      </Paper>
    </ThemeProvider>
  );
};
const DrawerItem = ({ drawerDetail, navigate, pathname, userData }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleNavigation = () => {
    navigate(drawerDetail?.path);
  };
  return (
    <>
      <NavLink to={!drawerDetail?.subList && drawerDetail?.path}>
        <ListItemButton
          className="sideMenuItem"
          selected={pathname === drawerDetail?.path}
          onClick={drawerDetail?.subList && handleClick}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#FFFAEE",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFFAEE",
            },
          }}>
       <div className="py-1">
       <span className="me-3" style={{fontSize:'17px', color:pathname === drawerDetail?.path?'#7000FF':'#6f6f6f'}}>{drawerDetail?.icon} </span>
        <span style={{fontSize:'13px', color:pathname === drawerDetail?.path?'#7000FF':'#6f6f6f'}}>{drawerDetail?.title} </span>
       </div>

         
          {drawerDetail?.subList ? open ? <ExpandLessTwoTone sx={{ fontSize: 45 }} /> : <ExpandMore sx={{ fontSize: 45 }} /> : ""}
        </ListItemButton>
      </NavLink>
      {drawerDetail?.subList && (
        <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: "#ffffff" }}>
          <List component="div">
            {drawerDetail?.subList.map((subDrawerDetail, index) => {
              if (subDrawerDetail.roles.includes(userData?.role))
                return (
                  <NavLink to={subDrawerDetail?.path}>
                    <ListItemButton
                      disablePadding
                      disableRipple
                      disableTouchRipple
                      selected={pathname === subDrawerDetail?.path}
                      sx={{
                        pl: 4,
                        "&.Mui-selected": {
                          backgroundColor: "#FFFAEE",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#FFFAEE",
                        },
                      }}>
                      <span className="" style={{color:pathname === subDrawerDetail?.path?'#7000FF':'#6f6f6f'}}>{subDrawerDetail?.icon}</span>
                      <ListItemText primary={<span className="font-sm " style={{color:pathname === subDrawerDetail?.path?'#7000FF':'#6f6f6f',marginLeft:"10px"}} >{subDrawerDetail?.title}</span>} />
                    </ListItemButton>
                  </NavLink>
                );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};
const MegaDrawerItem = ({ drawerDetail, navigate, pathname }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleNavigation = () => {
    navigate(drawerDetail?.path);
  };
  const handleSubNavigation = (path) => {
    navigate(path);
  };
  return (
    <>
      <ListItemButton   className="sideMenuItem" disablePadding selected={pathname === drawerDetail?.path} onClick={drawerDetail?.links ? handleClick : handleNavigation}>
        <ListItemIcon>{drawerDetail?.icon}</ListItemIcon>
        <ListItemText primary={drawerDetail?.title} />
        {drawerDetail?.links ? open ? <ExpandLess /> : <ExpandMore /> : ""}
      </ListItemButton>
      {drawerDetail?.links && (
        <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: "#0c2433" }}>
          <List component="div" disablePadding>
            {drawerDetail?.links.map((subDrawerDetail, index) => {
              return (
                <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => handleSubNavigation(subDrawerDetail?.path)} selected={pathname === subDrawerDetail?.path}>
                  <ListItemIcon>{subDrawerDetail?.icon}</ListItemIcon>
                  <ListItemText primary={<span className="font-sm">{subDrawerDetail?.name}</span>} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

const SidePanel = (props) => {
  const { window, drawerWidth, setDrawerWidth, handleDrawerToggle, mobileOpen } = props;
  const { userData, logoutHandler, token ,removeToken,removeUser} = useGlobalContext();
  const location = useLocation()
  const navigate = useNavigate();
  const { MegaMenuArr } = useRoutes();
  const { pathname } = useLocation();
  const SizeMobile = useMediaQuery("(max-width:700px)");
  const handlelogout = () => {
    removeToken();
    removeUser();
    toast.dismiss();
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(()=>{
    if(location.pathname.includes('/institute-on-boarding')){
      setDrawerWidth(0);
    }
    
  },[location.pathname])
  React.useEffect(() => {
    if (mobileOpen) {
      setDrawerWidth(280);
    } else {
      setDrawerWidth(0);
    }
  }, [mobileOpen]);
  const { sideDrawer } = useRoutes();
  const drawer = (
    <div className="h-100 sidepannelScroll"style={{boxShadow:"0px 0px 10px 10px rgba(33, 35, 38, 0.1)"}} >
      <ListItemButton component="div" disableRipple className=" rounded-0 mb-1 py-2 me-0 mt-1">
        {/* <ListItemText
          sx={{ my: 0 }}
          primary={<b className="text-capitalize">{userData?.role}</b>}
          secondary={<span className="text-secondary">{userData?.email}</span>}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        /> */}
        <NavLink className="navbar-brand" to={"/"} >
              <img style={{ maxHeight: 60, position: "relative", maxWidth: "60vw", zIndex: 200,left:40, objectFit: "contain" }} className="img-responsive py-2" src={"/logo.png"} alt="G20india" />
            </NavLink>
        <div className="mt-5"></div>
      </ListItemButton>
      {/* <Divider sx={{ borderColor: "grey" }} /> */}
      {sideDrawer.map((drawerDetail, drawerIndex) => {
        if (drawerDetail.roles.includes(userData?.role)) {
          return <DrawerItem key={drawerIndex} userData={userData} drawerDetail={drawerDetail} navigate={navigate} pathname={pathname} />;
        }
      })}
      {SizeMobile && (
        <>
          <ListItemButton   className="sideMenuItem" disablePadding onClick={() => navigate("/courses")}>
            <ListItemIcon>
              <YouTube />
            </ListItemIcon>
            <ListItemText  sx={{color: "rgb(111, 111, 111)",fontSize:13}} primary={"Our Courses"} />
          </ListItemButton>
          {MegaMenuArr?.map((megaItem, index) => {
            return <MegaDrawerItem key={index} drawerDetail={megaItem} navigate={navigate} pathname={pathname} />;
          })}
          <ListItemButton  className="sideMenuItem" disablePadding onClick={() => navigate("/community")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText  sx={{color: "rgb(111, 111, 111)",fontSize:13}} primary={"Community"} />
          </ListItemButton>
          <ListItemButton  className="sideMenuItem" disablePadding onClick={() => navigate("/contact")}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText sx={{color: "rgb(111, 111, 111)",fontSize:13}}primary={"Contact Us"} />
          </ListItemButton>
        </>
      )}
      <Divider className="border-white" />
      {token && (
        <ListItemButton disablePadding onClick={handlelogout}>
          <ListItemIcon>
            <ExitToAppOutlined color="error" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      )}
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <ColoredListComp>
        {SizeMobile && (
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            className="p-2"
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
              "& .MuiListItemButton-root": {
                paddingTop: 0.7,
                paddingBottom: 0.7,
                
                color: "#6f6f6f",
                borderRadius: "0px 35px 35px 0px",
                fontSize: "5px !important",
              },
              
              "& .MuiListItemIcon-root": {
                minWidth: 0,
                marginRight: 2,
              },
              "& .MuiSvgIcon-root": {
                fontSize: "17px !important",
                color: "#6f6f6f",
              },
            }}>
            {drawer}
          </Drawer>
        )}
      </ColoredListComp>
      <ColoredListComp>
        <Drawer
          variant="persistent"
          open={mobileOpen}
          anchor="left"
          onClose={handleDrawerToggle}
          className="p-2"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </ColoredListComp>
    </>
  );
};

export default SidePanel;
