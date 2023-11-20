import React, { Suspense, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useLocation } from "react-router-dom";

import {Route, Routes, useNavigate, useRouteLoaderData,useHistory} from 'react-router-dom';
import {useGlobalContext} from 'global/context';
import {useEffect} from 'react';
import Layout from 'Layout';
import useRoutes from 'hooks/useRoutes';
import DashboardAdminOutlet from 'pages/Admin/DashboardAdminOutlet';
// import { ModelUnApp } from 'pages/Model-UN/components/ModelUnApp';  
import { ModelParliamentMainOulet } from "pages/ModelUnParliament";
import { ModelHackathonMainOulet } from "pages/ModelUnHackathon";
// import { UI2MainDashboardOutlet } from "pages/UI-2.0-Dashboard/UI2MainDashboardOutlet";
// import { CarbonApp } from "pages/CarbonFootprintCalculator/components/CarbonApp";
// import { ModelUnMainOutlet } from "pages/modelUN/ModelUnMainOutlet";
// import TimelineClub from 'pages/TimelineClubs/TimelineClub';
// import ClubProfile from 'pages/TimelineClubs/ClubProfile';
// import Home from "./pages/static/Home";
const Login = React.lazy(() => import("pages/Auth/Login"));
const LoadingComp = React.lazy(() => import("layout/loader/LoadingComp"));
const YuvaLoader = React.lazy(() =>
  import("pages/Forum/components/Loader/YuvaLoader")
);
const EventTimeline = React.lazy(() =>
  import("pages/EventTimeline/EventTimeline")
);
const ModelUnMainOutlet  = React.lazy(() =>
  import("pages/modelUN/ModelUnMainOutlet")
);
const ModelUnApp  = React.lazy(() =>
  import('pages/Model-UN/components/ModelUnApp')
);
const UI2MainDashboardOutlet  = React.lazy(async () =>
 await import("pages/UI-2.0-Dashboard/UI2MainDashboardOutlet")
);
const ClubProfile = React.lazy(() => import("pages/TimelineClubs/ClubProfile"));

const TimelineClub = React.lazy(() =>
  import("pages/TimelineClubs/TimelineClub")
);
const StudentDashboard = React.lazy(() =>
  import("pages/student/StudentDashboard")
);
const DashboardInstitute = React.lazy(() =>
  import("pages/college/DashboardInstitute")
);
const StudentEditProfileOutlet = React.lazy(() =>
  import("pages/student/EditProfile/StudentEditProfileOutlet")
);
const InstituteEditProfileOutlet = React.lazy(() =>
  import("pages/college/Editprofile/InstituteEditProfileOutlet")
);

const Error = React.lazy(() => import("./pages/Error"));
const LoggedRedirector = ({ place }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(place);
  }, []);
  return (
    <>
      <LoadingComp />
    </>
  );
};

function App() {
  const currentPath = window.location.pathname;
  const location = useLocation();
  // const history = useHistory();
  const {userData, token, loginStatus} = useGlobalContext();
  const {publicRoutes,v2AuthPublicRoutes, settingRoutes, modelUnTeamRoutes, userRoutes,newUserRoutes, adminRoutes, timelineRoutes, clubRoutes,ymunRoutes, clubProfileRoutes,ymParliamentRoute,ymHackathonRoute } = useRoutes();
  const [shouldShowLayout, setShouldShowLayout] = useState(true);

  // Check if the currentPath matches any path in v2AuthPublicRoutes
  // useEffect(() => {
  //   console.log("new routes",location, 'currentpath', currentPath)
  //   const isPathInV2AuthPublicRoutes = v2AuthPublicRoutes.some(
  //     (route) => currentPath.includes(route.path)
  //   );
  //   setShouldShowLayout(!isPathInV2AuthPublicRoutes);
  // }, [location]);
  // }, [currentPath]);
  // console.log("CHECKTOKEN", token);
  {
    //!Important
    /*
    ------------TYPE DECLARED ------------
     0=>studentComponent
     1=>INSTITUTE
     2=>ADMIN 
     */
  }
  const LoginChecker = (logoutComponent, loginComponent) => {
    switch (token !== null) {
      case true:
        return loginComponent;
      case false:
        return logoutComponent;
      default:
        return <LoggedRedirector place={"/"} />;
    }
  };
  const userTypeChecker = (
    studentComponent,
    instituteComponent,
    AdminComponent
  ) => {
    switch (userData.type) {
      case 0:
        return studentComponent ? studentComponent : <Error />;
      case 1:
        return instituteComponent ? instituteComponent : <Error />;
      case 2:
        return AdminComponent ? AdminComponent : <Error />;
      default:
        return LoginChecker(<LoggedRedirector place={"/login"} />, <Error />);
    }
  };
  return (
<>
    <Routes>
    {v2AuthPublicRoutes?.map((routeItem, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={routeItem?.path}
                  element={routeItem?.component}
                >
                  {routeItem.children &&
                    routeItem.children.map((childRouteItem, childIndex) => (
                      <Route
                        key={childIndex}
                        index={childRouteItem?.index}
                        path={childRouteItem.path}
                        element={childRouteItem.element}
                      />
                    ))}
                </Route>
              );
            })}
    </Routes>
  {shouldShowLayout &&  (  <Layout>
        <Suspense fallback={<YuvaLoader />}>
          <Routes>
            {/* Admin Routes  */}
            <Route path="/admin" element={<DashboardAdminOutlet />}>
              {adminRoutes?.map((routeItem, index) => (
                <Route
                  key={index}
                  index={routeItem?.index}
                  path={routeItem?.path}
                  element={routeItem?.element}
                />
              ))}
            </Route>
            {/* User Internal Routes */}
            <Route
              path="/dashboard"
              element={userTypeChecker(
                <StudentDashboard />,
                <DashboardInstitute />
              )}
            >
              {userRoutes.map((routeItem, index) => (
                <Route
                  key={index}
                  index={routeItem?.index}
                  path={routeItem.path}
                  element={routeItem.element}
                >
                  {routeItem.children &&
                    routeItem.children.map((childRouteItem, childIndex) => (
                      <Route
                        key={childIndex}
                        index={childRouteItem?.index}
                        path={childRouteItem.path}
                        element={childRouteItem.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>
            {/* new 2.0 dashboard routes */}
            <Route
              path="/new-dashboard/"
              element={userTypeChecker(
                <UI2MainDashboardOutlet />,
                <UI2MainDashboardOutlet/>
              )}
            >
              {newUserRoutes.map((routeItem, index) => (
                <Route
                  key={index}
                  index={routeItem?.index}
                  path={routeItem.path}
                  element={routeItem.element}
                >
                  {routeItem.children &&
                    routeItem.children.map((childRouteItem, childIndex) => (
                      <Route
                        key={childIndex}
                        index={childRouteItem?.index}
                        path={childRouteItem.path}
                        element={childRouteItem.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>
            {/* Settings Routes */}
            <Route
              path="/setting"
              element={userTypeChecker(
                <StudentEditProfileOutlet />,
                <InstituteEditProfileOutlet />
              )}
            >
              {settingRoutes.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
            <Route path="/profile" element={<ClubProfile />}>
              {clubProfileRoutes.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>

            {/* <Route path="/model-un" element={<ModelUNMain />} />
            <Route path="/model-un/registration" element={<ModelUnMainComponent />} />
             */}
            {/* <========== modelUnRegistration  ================> */}
            <Route path="/model-un/" element ={<ModelUnMainOutlet />} >
              {modelUnTeamRoutes.map((childRoute, childIndex) => (
                <Route key={childIndex} index={childRoute.index} path={childRoute.path} element={childRoute.element} />
              ))}
                </Route>
            
            
            {/* <Route path="/profile/user/:userId" element={<ClubProfile />}/>
            <Route path="/profile/institute/:userId" element={<ClubProfile />}/> */}

            <Route path="/clubs/:id" element={<TimelineClub />}>
              {clubRoutes.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>

              {/*======== yuvamanthan model united nations  map for Student =====*/}
              <Route path="/modelUn/" element={<ModelUnApp />}>
              {ymunRoutes.map((childRoute, childIndex) => (
                <Route key={childIndex} index={childRoute.index} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>

            {/* <========== Register Parliament Routes ================> */}
              <Route path="/Mu-parliament/" element ={<ModelParliamentMainOulet />} >
              {ymParliamentRoute.map((childRoute, childIndex) => (
                <Route key={childIndex} index={childRoute.index} path={childRoute.path} element={childRoute.element} />
              ))}
                </Route> 
                
            {/* <========== Register Hackathon Routes ================> */}
              <Route path="/Mu-hackathon/" element ={<ModelHackathonMainOulet />} >
              {ymHackathonRoute.map((childRoute, childIndex) => (
                <Route key={childIndex} index={childRoute.index} path={childRoute.path} element={childRoute.element} />
              ))}
                </Route> 
            <Route path="/timeline" element={<EventTimeline />}>
              {timelineRoutes.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
            {/* static Designs  */}
            {publicRoutes?.map((routeItem, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={routeItem?.path}
                  element={routeItem?.component}
                >
                  {routeItem.children &&
                    routeItem.children.map((childRouteItem, childIndex) => (
                      <Route
                        key={childIndex}
                        index={childRouteItem?.index}
                        path={childRouteItem.path}
                        element={childRouteItem.element}
                      />
                    ))}
                </Route>
              );
            })}
          </Routes>
        </Suspense>
      </Layout>)}
</> 
 );
}

export default App;
