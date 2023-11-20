import Box from "@mui/material/Box";
// import Footer from "components/Footer";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import SidePanel from "components/SidePanel";
import { useGlobalContext } from "global/context";
import MobileNavigation from "components/MobileNavigation";
import Navbar from "components/Navbar";
import { Theme } from "@radix-ui/themes";
import SubscribeSec from "pages/LandingPage/Components/SubscribeSec";
import Footer from "pages/LandingPage/Components/Footer";
import { useLocation } from "react-router-dom";
import useRoutes from "hooks/useRoutes";

function Layout(props) {
  const [drawerWidth, setDrawerWidth] = React.useState(0);
  const { token } = useGlobalContext();
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const currentPath = useLocation().pathname;
  const {v2AuthPublicRoutes} = useRoutes();
  const [shouldShowLayout, setShouldShowLayout] = useState(true);
 
  // Check if the currentPath matches any path in v2AuthPublicRoutes
  useEffect(() => {
    // console.log("new routes currentpath", currentPath)
    const isPathInV2AuthPublicRoutes = v2AuthPublicRoutes.some(
      (route) =>  route.path === currentPath
      );
     
    setShouldShowLayout(!isPathInV2AuthPublicRoutes);
    // setShouldShowLayout(routesArray.includes(currentPath));
    // setShouldShowLayout(!routesArray.includes(currentPath))
    // console.log("new error", !routesArray.includes(currentPath))
  }, [ currentPath]);

  //========Side Pannel show and hide functinality depend on screen width =============
  return (
    <Theme appearance="light" radius="large" scaling="105%">
      {shouldShowLayout && (<div className="d-flex">
        {token && (
          <Box component="nav" sx={{ zIndex: 100, width: { sm: drawerWidth }, flexShrink: { sm: 0 } , border:0,boxShadow:"rgba(33, 35, 38, 0.1) 10px 0px 10px -10px"}} >
            <SidePanel drawerWidth={drawerWidth} setDrawerWidth={setDrawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
          </Box>
        )}
        <Box
          component="main"
          className={`${drawerWidth ? "" : ""}`}
          sx={{
            flexGrow: 1,
            width: {border:0, sm: `calc(100% - ${drawerWidth}px)` },
          }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} sidePanelOpen={mobileOpen} />
          <ToastContainer position="bottom-right" limit={3} autoClose={3000} />
          <Toaster position="bottom-right" />
          <div className="min-vh-100">{props.children}</div>
          <MobileNavigation />
          {!token  ?  (<>   <section className='testimonialSectin py-5'>
          <SubscribeSec />
          </section>
          <footer className="footer p-5">

          <Footer />
          </footer></>) : null}
       
          {/* <Footer /> */}
        </Box>
      </div>) }
      
    </Theme>
  );
}

export default Layout;
