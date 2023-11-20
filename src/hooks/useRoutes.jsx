import React, { lazy, useEffect } from "react";
import {
  ArrowForwardIosSharp,
  AutoStoriesOutlined,
  BarChartOutlined,
  BookOnline,
  BookOutlined,
  CelebrationOutlined,
  CollectionsOutlined,
  ContactSupportOutlined,
  DashboardOutlined,
  EmailOutlined,
  EmojiEventsOutlined,
  FormatQuoteOutlined,
  ForumOutlined,
  GroupOutlined,
  Groups2Outlined,
  LocalActivityOutlined,
  // Groups3Icon,
  MapOutlined,
  MarkEmailReadOutlined,
  MilitaryTechOutlined,
  NotificationAddOutlined,
  PeopleOutlineSharp,
  QuestionAnswer,
  QuestionAnswerOutlined,
  RssFeedOutlined,
  SchoolOutlined,
  Settings,
  SettingsOutlined,
  SourceOutlined,
  SubscriptionsOutlined,
  SupervisorAccountOutlined,
  TimelineOutlined,
  TrendingUpSharp,
  VideoCameraBack,
} from "@mui/icons-material";
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import Person3Icon from "@mui/icons-material/Person3";
import Groups3Icon from "@mui/icons-material/Groups3";
import TimelineClub from "pages/TimelineClubs/TimelineClub";
// import Clubposts from 'pages/TimelineClubs/Clubposts';
import ClubPosts from "pages/TimelineClubs/ClubPosts";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "global/context";
// import Home from "pages/static/Home";
import Team from "pages/static/Team";
import Error from "pages/Error";
import FaqPage from "pages/static/FaqPage";
import Press from "pages/static/Press/Press";
import Modelg20Page from "pages/static/ModelG20Page";
import Life from "pages/static/LifeEnvironment";
import CampusAmbass from "pages/static/Topics/CampusAmbass";
import StartupIndia from "pages/static/Topics/StartupIndia";
import SharedFuture from "pages/static/themes/SharedFuture";
import HealthWell from "pages/static/themes/HealthWell";
import FutureOfWork from "pages/static/themes/FutureOfWork";
import CrossBorderInnovation from "pages/static/Topics/CrossBorderInnovation";
import GigEconomy from "pages/static/Topics/GigEconomy";
import Presidency from "pages/static/Presidency";
import MediaPage from "pages/events/MediaPage";
import Youth from "pages/static/Topics/Youth";
import StatePage from "pages/static/States/StatePage";
import EventsScroll from "pages/events/components/EventsScroll";
import Goa from "pages/events/states/Goa";
import CommunityGuidliness from "pages/static/Topics/CommunityGuidliness";
import PCCAS from "pages/events/states/PCCAS";
import Uttarakhand from "pages/events/states/Uttarakhand";
import Haryana from "pages/events/states/Haryana";
import TermsConditions from "layout/TermsConditions";
import IndiaAchivements from "pages/static/Topics/IndiaAchivements";
import DigitalTransform from "pages/static/Topics/DigitalTransform";
import DynamicBlog from "pages/static/Blog/DynamicBlog";
import SingleBlog from "pages/static/Blog/SingleBlog";
import Cdri from "pages/static/Topics/Cdri";
import DynamicNews from "pages/static/News/DynamicNews";
import SingleNews from "pages/static/News/SingleNews";
import WomenEmpower from "pages/static/Topics/WomenEmpower";
import PeaceBuilding from "pages/static/themes/PeaceBuilding";
import ClimateChange from "pages/static/themes/ClimateChange";
import UnlearnRelearnReskill from "pages/static/Topics/UnlearnRelearnReskill";
import CyberSafety from "pages/static/Topics/CyberSafety";
import SustainableLiving from "pages/static/Topics/SustainableLiving";
import Nip from "pages/static/Topics/Nip";
import InstituteBasicDetails from "pages/college/Editprofile/components/InstituteBasicDetails";
import StudentEditPassword from "pages/student/EditProfile/components/StudentEditPassword";
import InstituteEditPassword from "pages/college/Editprofile/components/InstituteEditPassword";
import InstituteAdditionalDetails from "pages/college/Editprofile/components/InstituteAdditionalDetails";
import InstituteEditInfrastructure from "pages/college/Editprofile/components/InstituteEditInfrastructure";
import YuvaLoader from "pages/Forum/components/Loader/YuvaLoader";
import StudentEditBasicDetails from "pages/student/EditProfile/components/StudentEditBasicDetails";
import AdditionalDetails from "pages/student/EditProfile/components/StudentEditAdditionalDetails";
import Gallery from "pages/Gallery/Gallery";
import GalleryView from "pages/Gallery/GalleryView";
import StudentEditPreference from "pages/student/EditProfile/components/StudentEditPreference";
import InstitutePublicPage from "pages/college/InstitutePublicPage";
import StudentDashboard from "pages/student/StudentDashboard";
import DashboardInstitute from "pages/college/DashboardInstitute";
import InstituteRegisteredUser from "pages/college/dashboard/InstituteRegisteredUser";
import InstituteEnrolledUser from "pages/college/dashboard/InstituteEnrolledUser";
import InstituteCertifiedUser from "pages/college/dashboard/InstituteCertifiedUser";
import InstituteAffiliatedinstitute from "pages/college/InstituteAffiliatedinstitute";
import PrintCertificate from "pages/course/PrintCertificate/PrintCertificate";
import SingleInstitutesData from "pages/Admin/components/SingleInstitutesData";
import Forum from "pages/Forum/Forum";
import AllQuestions from "pages/Forum/components/Questions/AllQuestions";
import SingleForumPage from "pages/Forum/SingleForumPage";
import InstituteGallery from "pages/college/dashboard/components/InstituteGallery";
import StudentOpenRegister from "pages/Registration/student/StudentOpenRegister";
import InstituteRegister2 from "pages/Registration/InstituteRegister2";
import MainLoginForm from "pages/Auth/logincomps/MainLoginForm";
import Login from "pages/Auth/Login";
import InstituteDelegates from "pages/college/dashboard/InstituteDelegates";
import StudentCoordinators from "pages/college/dashboard/StudentCoordinators";
import EventWinners from "pages/college/dashboard/EventWinners";
import AllCourses from "pages/course/AllCourses";
import CourseDetails from "pages/course/CourseDetails";
import ShowCertificate from "pages/course/PrintCertificate/ShowCertificate";
import ContactUs from "pages/static/contactUs/ContactUs";
import AccountVerify from "pages/Auth/verify/AccountVerify";
import StudentDiscussionRoom from "pages/discussion/student/StudentDiscussionRoom";
import MeetingRoom from "pages/discussion/institute/MeetingRoom";
import InstituteScreen1 from "pages/discussion/institute/InstituteScreen1";
import StudentScreen1 from "pages/discussion/student/StudentScreen1";
import StudentBoard from "pages/discussion/student/StudentBoard";
import InstituteBoard from "pages/discussion/institute/InstituteBoard";
import MainDashboardContent from "pages/student/dashboardtabs/MainDashboardContent";
import InstituteMainTab from "pages/college/dashboard/InstituteMainTab";
import SinglePost from "pages/EventTimeline/SinglePost";
import InstitutePosts from "pages/EventTimeline/InstitutePosts";
import Posts from "pages/EventTimeline/Posts";
import ClickProfile from "pages/EventTimeline/ClickProfile";
import AdminUserManagement from "pages/Admin/pages/AdminUserManagement";
import EditDetailPageInstitute from "pages/Admin/users/EditDetailPageInstitute";
import EditDetailPageStudent from "pages/Admin/users/EditDetailPageStudent";
import InstituteDataTable from "pages/Admin/users/InstituteDataTable";
import StudentDataTable from "pages/Admin/users/StudentDataTable";
import WebsiteContent from "pages/Admin/pages/websitecontent/WebsiteContent";
import AdminIssuesCertificates from "pages/Admin/pages/AdminIssuesCertificates";
import AdminAnalytics from "pages/Admin/pages/analytics/AdminAnalytics";
import QuotesDataTable from "pages/Admin/components/QuotesDataTable";
import Blogs from "pages/Admin/pages/websitecontent/Blogs";
import AddBlog from "pages/Admin/pages/websitecontent/AddBlog";
import EditBlog from "pages/Admin/pages/websitecontent/EditBlog";
import News from "pages/Admin/pages/websitecontent/News";
import AddNews from "pages/Admin/pages/websitecontent/AddNews";
import EditNews from "pages/Admin/pages/websitecontent/EditNews";
import States from "pages/Admin/pages/States";
import AdminCourses from "pages/Admin/course/AdminCourses";
import AdminCoursesSection from "pages/Admin/course/AdminCoursesSection";
import AdminCoursesSectionVideo from "pages/Admin/course/AdminCoursesSectionVideo";
import SingleState from "pages/Admin/pages/SingleState";
import StudentPoll from "pages/Admin/pages/websitecontent/StudentPoll";
import Contact from "pages/Admin/pages/Contact";
import QuizControl from "pages/Admin/course/QuizControl";
import QuizQuestions from "pages/Admin/course/QuizQuestions";
import GalleryControl from "pages/Admin/pages/websitecontent/GalleryControl";
import Notification from "pages/Admin/pages/Notification";
import Certificate from "pages/course/certificate/Certificate";
import SocialWall from "pages/college/dashboard/components/SocialWall";
import ForgetPassword from "pages/Auth/reset/ForgetPassword";
import EmailDeliverable from "pages/Admin/email/EmailDeliverable";
import EmailList from "pages/Admin/email/EmailList";
import InstituteEditEvent from "pages/college/Editprofile/components/InstituteEditEvent";
import ClubSinglePost from "pages/TimelineClubs/components/ClubSinglePost";
import ClubProfile from "pages/TimelineClubs/ClubProfile";
import {
  OnBoardingComponent,
  OnBoardingInstituteComponent,
  OnBoardingMainPage,
  OnBoardingStudentComponent,
  OnBoardingStudentMainPage,
  OnboardingComponentVerify,
  OnboardingGoogleVerify,
} from "pages/OnBoarding";
import { OnBoardingStudentApp } from "pages/OnBoarding/Component/OnBoardingStudentApp";
import { ModelUNMain, ModelUnComponent, ModelUnMainComponent } from "pages/modelUN";
import { InstituteRegisteredUserV2 } from "views/institute";
import { MUNmainStepper, ModelUnManuallyAssign, MunMain, MunParticipants } from "pages/Model-UN/components";
import { MUNParentApp } from "pages/Model-UN/components/MUNParentApp";
import { UI2MainDashboard } from "pages/UI-2.0-Dashboard";
import { ParliamentEventRegister, ParliamentMain } from "pages/ModelUnParliament/component"
import { HackathonEventRegister, HackathonMain } from "pages/ModelUnHackathon";

import { MainCarbonFootPrint } from "pages/CarbonFootprintCalculator/MainCarbonFootPrint";

import { CarbonParentApp } from "pages/CarbonFootprintCalculator/components/CarbonParentApp";
import { apiJson } from "api";
import Home from "pages/LandingPage/Components/Home";
import { DiscussionBoardChatRooms, DiscussionBoardCreateDiscussion, DiscussionBoardMain } from "pages/discussionBoard/parentComp";
import { ModelUnTeamRegist } from "pages/modelUN/component/ModelUnTeamRegist";
import { MunApplicants } from "pages/Model-UN/components/MunApplicants";
import { CourseOutlet, StudentAllCouses, StudentCourseOverView, StudentCoursePlayerContainer, StudentMyCourses, } from "pages/courses";
import { StudentCourseScreen } from "pages/courses/component";
import { UsersUnderReview } from "pages/UnderReview";
// import { OnBoardingComponent, OnBoardingMainPage } from "pages/OnBoarding/Component";
// import { OnBoardingStudentComponent, OnBoardingStudentMainPage } from "pages/OnBoarding/studentOnBoard";
// import { OnBoardingMainPage } from "pages/OnBoarding/Component/OnBoardingMainPage";

const PublicOnlyRoute = ({ component }) => {
  const { token,userData } = useGlobalContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      navigate("/new-dashboard"); // dashboard => check(onboard.status) => true(navigate(dashboard)) => false(navigate(institute-dashboard))
    }
    else if(userData.token && userData.role==='institute'){ // if(token && role==='institute' && on-board-status===false)
      navigate('/institute-on-boarding')
    }
  }, []);
  return <>{!token ? component : <YuvaLoader space={true} />}</>;
};
const PrivateRoute = ({ component, roles }) => {
  const navigate = useNavigate();
  const { userData,token } = useGlobalContext();
  if(!token){
    navigate('/login')
  }
  if(token && userData.role==='institute' && userData.onBoardStatus===false){
    navigate('/institute-on-boarding')
  }
  if (
    token &&
    userData.role === "student" &&
    userData.onBoardStatus === false
  ) {
    navigate("/student-on-boarding");
  }
  if (
    token &&
    userData.role === "teacher" &&
    userData.onBoardStatus === false
  ) {
    navigate("/teacher-on-boarding");
  }
  React.useEffect(() => {
    if (!roles?.includes(userData.role)) {
      navigate("/");
    }
  }, []);
  return <>{roles?.includes(userData.role) ? component : <YuvaLoader />}</>;
};
const VerifyRoute = ({ component }) => {
  const { token } = useGlobalContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      navigate("/on-boarding");
    }
  }, []);
  return <>{token ? component : <YuvaLoader space={true} />}</>;
};
const useRoutes = (props) => {
  const { userData } = useGlobalContext();
  const navigate = useNavigate()
  const userTypeChecker = (
    studentComponent,
    instituteComponent,
    AdminComponent
  ) => {
    if (userData?.onBoardStatus === false || userData?.reviewStatus===false) {
      if (userData.role === "institute") {
        // window.location.href = "/institute-on-boarding";
        navigate('/institute-on-boarding')
      } else if (userData.role === "student") {
        {
          // window.location.href = "/student-on-boarding";
          navigate('/student-on-boarding')
        }
      } else if (userData.role === "teacher") {
        {
          // window.location.href = "/teacher-on-boarding";
          navigate('/teacher-on-boarding')
        }
      }
      else if(userData.role==='teacher'){
        {
          window.location.href = '/teacher-on-boarding';
        }
      }
      return
    }
    switch (Number(userData.type)) {
      case 0:
      case 4:
      case 5:
        return studentComponent ? studentComponent : <Error />;
      case 1:
        return instituteComponent ? instituteComponent : <Error />;
      case 2:
        return AdminComponent ? AdminComponent : <Error />;
      default:
        return <Error />;
    }
  };

  const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/contactus", component: <ContactUs /> },
    { path: "/team", component: <Team /> },
    { path: "/faq", component: <FaqPage /> },
    { path: "/press-and-media", component: <Press /> },
    { path: "/model-g20", component: <Modelg20Page /> },
    { path: "/life", component: <Life /> },
    { path: "/googleVerify", component: <OnboardingGoogleVerify /> },
    { path: "/g20-campus-sherpa", component: <CampusAmbass /> },
    { path: "/startup-india", component: <StartupIndia /> },
    { path: "/shared-future", component: <SharedFuture /> },
    { path: "/health-well-being-and-sports", component: <HealthWell /> },
    { path: "/future-of-work", component: <FutureOfWork /> },
    { path: "/cross-border-innovation", component: <CrossBorderInnovation /> },
    { path: "/gig-economy", component: <GigEconomy /> },
    { path: "/g20-presidency", component: <Presidency /> },
    { path: "/media", component: <MediaPage /> },
    { path: "/youth-community", component: <Youth /> },
    { path: "/states/goa", component: <StatePage /> },
    { path: "/goa", component: <Goa /> },
    { path: "/goa/pccas", component: <PCCAS /> },
    { path: "/uttarakhand", component: <Uttarakhand /> },
    { path: "/haryana", component: <Haryana /> },
    { path: "/events", component: <EventsScroll /> },
    { path: "/social-media-guideliness", component: <CommunityGuidliness /> },
    { path: "/terms-conditions", component: <TermsConditions /> },
    { path: "/achievements-of-india", component: <IndiaAchivements /> },
    { path: "/digital-transform", component: <DigitalTransform /> },
    { path: "/blog", component: <DynamicBlog /> },
    { path: "/blog/:slug", component: <SingleBlog /> },
    { path: "/cdri", component: <Cdri /> },
    { path: "/news", component: <DynamicNews /> },
    { path: "/news/:slug", component: <SingleNews /> },
    { path: "/woman-empowerment", component: <WomenEmpower /> },
    { path: "/peacebuilding-and-reconciliation", component: <PeaceBuilding /> },
    {
      path: "/climate-change-and-disaster-risk-reduction",
      component: <ClimateChange />,
    },
    {
      path: "/unlearn-relearn-and-reskill",
      component: <UnlearnRelearnReskill />,
    },
    { path: "/cyber-safety-for-youth", component: <CyberSafety /> },
    {
      path: "/transitioning-to-sustainable-living",
      component: <SustainableLiving />,
    },
    { path: "/nep", component: <Nip /> },
    { path: "/gallery", component: <Gallery /> },
    { path: "/gallery/:id", component: <GalleryView /> },
    { path: "/courses", component: <AllCourses /> },
    { path: "/course/detail/:slug", component: <CourseDetails /> },
    { path: "/courses/:slug", component: <CourseDetails /> },
    { path: "/courses/:slug/certificates/:certkey", component: <ShowCertificate /> },
    // { path: "/modelUn", component: <MunMain /> },
    {
      path: "/institute/:slug/:user",
      component: <PublicOnlyRoute component={<InstitutePublicPage />} />,
    },
    {
      path: "/:club/:slug",
      component: <PublicOnlyRoute component={<InstitutePublicPage />} />,
    },
    // {
    //   path: "/registration",
    //   component: <PublicOnlyRoute component={<InstituteRegister2 />} />,
    // },
    {
      path: "/registration/:user",
      component: <PublicOnlyRoute component={<StudentOpenRegister />} />,
    },
    {
      path: "/:state/registration",
      component: <PublicOnlyRoute component={<InstituteRegister2 />} />,
    },
    // {
    //   path: "/login",
    //   component: <PublicOnlyRoute component={<Login />} />,
    //   children: [
    //     {
    //       index: true,
    //       element: <PublicOnlyRoute component={<MainLoginForm />} />,
    //     },
    //   ],
    // },
    
    { path: "/forget-password", component: <ForgetPassword /> },
    { path: "/auth/account-verify/:token", component: <AccountVerify /> },
    { path: "/auth/email-verify/:token", component: <OnboardingComponentVerify /> },

    { path: "*", component: <Error /> },
  ];

  //new v2 auth routes/ on-boarding
  const v2AuthPublicRoutes = [
    {
      path: "/login",
      component: <PublicOnlyRoute component={<OnBoardingMainPage />} />,
      children: [
        {
          index: true,
          element: <PublicOnlyRoute component={<OnBoardingComponent />} />,
        },
      ],
    },
    
    {
      path: "/registration",
      component: <PublicOnlyRoute component={<OnBoardingMainPage />} />,
      children: [
        {
          index: true,
          element: <PublicOnlyRoute component={<OnBoardingComponent />} />,
        },
      ],
    },

    
    
    // { path: "/auth/email-verify/:token", component: <OnBoardingComponent /> },

    {
      path: "/student-on-boarding",
      component: <PrivateRoute component={<OnBoardingStudentApp />}  roles={['student', 'institute', 'teacher']} />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute component={<OnBoardingStudentComponent />}  roles={['student', 'institute', 'teacher']} />
          ),
        },
      ],
    },
    {
      path: "/teacher-on-boarding",
      component: <PrivateRoute component={<OnBoardingStudentApp />}  roles={['teacher']}/>,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute component={<OnBoardingStudentComponent />}  roles={['teacher']} />
          ),
        },
      ],
    },
    {
      path: "/institute-on-boarding", // convert to <privateRoute/>
      component: <PrivateRoute component={<OnBoardingStudentApp />} roles={['institute']}/>,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute component={<OnBoardingInstituteComponent /> } roles={['institute']} />
          ),
        },
      ],
    },
  ]

  const adminRoutes = [
    {
      path: "/admin/",
      element: (
        <PrivateRoute component={<AdminUserManagement />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/analytics",
      element: (
        <PrivateRoute component={<AdminAnalytics />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/institutes",
      element: (
        <PrivateRoute component={<InstituteDataTable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/institutes/:id",
      element: (
        <PrivateRoute component={<SingleInstitutesData />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/editdetail/institute/:instituteId",
      element: (
        <PrivateRoute
          component={<EditDetailPageInstitute />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/students",
      element: (
        <PrivateRoute
          component={<StudentDataTable role={"student"} />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/teachers",
      element: (
        <PrivateRoute
          component={<StudentDataTable role={"teacher"} />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/editdetail/student/:studentId",
      element: (
        <PrivateRoute component={<EditDetailPageStudent />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/content",
      element: (
        <PrivateRoute component={<WebsiteContent />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/certificates",
      element: (
        <PrivateRoute
          component={<AdminIssuesCertificates />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/quotes",
      element: (
        <PrivateRoute component={<QuotesDataTable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/blogs",
      element: <PrivateRoute component={<Blogs />} roles={["admin"]} />,
    },
    {
      path: "/admin/blogs/add",
      element: <PrivateRoute component={<AddBlog />} roles={["admin"]} />,
    },
    {
      path: "/admin/blogs/edit/:id",
      element: <PrivateRoute component={<EditBlog />} roles={["admin"]} />,
    },
    {
      path: "/admin/news",
      element: <PrivateRoute component={<News />} roles={["admin"]} />,
    },
    {
      path: "/admin/news/add",
      element: <PrivateRoute component={<AddNews />} roles={["admin"]} />,
    },
    {
      path: "/admin/news/edit/:id",
      element: <PrivateRoute component={<EditNews />} roles={["admin"]} />,
    },
    {
      path: "/admin/states",
      element: <PrivateRoute component={<States />} roles={["admin"]} />,
    },
    {
      path: "/admin/courses",
      element: <PrivateRoute component={<AdminCourses />} roles={["admin"]} />,
    },
    {
      path: "/admin/courses/sections/:id",
      element: (
        <PrivateRoute component={<AdminCoursesSection />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/courses/sections/:id/videos/:id",
      element: (
        <PrivateRoute
          component={<AdminCoursesSectionVideo />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/states/:id",
      element: <PrivateRoute component={<SingleState />} roles={["admin"]} />,
    },
    {
      path: "/admin/createpoll",
      element: <PrivateRoute component={<StudentPoll />} roles={["admin"]} />,
    },
    {
      path: "/admin/contactus",
      element: <PrivateRoute component={<Contact />} roles={["admin"]} />,
    },
    {
      path: "/admin/quiz/:id",
      element: <PrivateRoute component={<QuizQuestions />} roles={["admin"]} />,
    },
    {
      path: "/admin/gallery",
      element: (
        <PrivateRoute component={<GalleryControl />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/notification",
      element: <PrivateRoute component={<Notification />} roles={["admin"]} />,
    },
    {
      path: "/admin/emaildeliverable",
      element: (
        <PrivateRoute component={<EmailDeliverable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/email-list",
      element: <PrivateRoute component={<EmailList />} roles={["admin"]} />,
    },
  ];
  const userRoutes = [
    {
      index: true,
      element: userTypeChecker(
        <MainDashboardContent />, //For Student
        <InstituteMainTab /> //For Institute
      ),
    },
    { 
      path: "/dashboard/forum",
      element: userTypeChecker(<Forum />, <Forum />, <Forum />),
      children: [
        {
          index: true,
          element: userTypeChecker(<AllQuestions />),
        },
        {
          path: "/dashboard/forum/:slug",
          element: userTypeChecker(<SingleForumPage />),
        },
      ],
    },
    // ROUTES INSTITUTE DASHBOARD
    {
      path: "/dashboard/registered/users",
      element: userTypeChecker(undefined, <InstituteRegisteredUserV2 />),
    },
    {
      path: "/dashboard/registeration/:role",
      element: userTypeChecker(undefined, <InstituteRegisteredUser />),
    },
    {
      path: "/dashboard/enrollments/:role",
      element: userTypeChecker(undefined, <InstituteEnrolledUser />),
    },
    {
      path: "/dashboard/certifications/:role",
      element: userTypeChecker(undefined, <InstituteCertifiedUser />),
    },
    {
      path: "/dashboard/affiliate-institutes",
      element: userTypeChecker(undefined, <InstituteAffiliatedinstitute />),
    },
    {
      path: "/dashboard/affiliate-institutes/:id",
      element: userTypeChecker(undefined, <SingleInstitutesData />),
    },
    {
      path: "/dashboard/reports",
      element: userTypeChecker(undefined, <InstituteGallery />),
    },
    // YMG20
    {
      path: "/dashboard/delegates",
      element: userTypeChecker(undefined, <InstituteDelegates />),
    },
    {
      path: "/dashboard/studentCoordinators",
      element: userTypeChecker(undefined, <StudentCoordinators />),
    },
    {
      path: "/dashboard/event-winners",
      element: userTypeChecker(undefined, <EventWinners />),
    },
    // student Dashboard
    {
      path: "/dashboard/mycertificates",
      element: userTypeChecker(<Certificate />),
    },
    {
      path: "/dashboard/certificate/:courseId",
      element: userTypeChecker(<PrintCertificate />),
    },
    {
      path: "/dashboard/socialshare",
      element: userTypeChecker(<SocialWall />, <SocialWall />),
    },
    // Discussion Board
    {
      path: "/dashboard/discussion",
      element: userTypeChecker(<StudentBoard />, <InstituteBoard />),
      children: [
        {
          index: true,
          element: userTypeChecker(<StudentScreen1 />, <InstituteScreen1 />),
        },
        {
          path: "/dashboard/discussion/:page/:meetingid",
          element: userTypeChecker(<StudentDiscussionRoom />, <MeetingRoom />),
        },
      ],
    },


  ];
  //================ YMUN routes for student =================== \\

  const ymunRoutes = [
    {
      index: true,
      element: userTypeChecker(<MunMain />),
    },
    {
      path: "/modelUn/participates",
      element: userTypeChecker(<MUNParentApp />),
    },


  ]

  //<=========== Ym Parliament All Rounte ============ >
  const ymParliamentRoute = [
    {
      index: true,
      element: userTypeChecker(<ParliamentMain />, <ParliamentMain />)
    },
    {
      path: "/Mu-parliament/registration",
      element: userTypeChecker(<ParliamentEventRegister />, <ParliamentEventRegister />)
    }
  ]
  //<=========== Ym Hackathon All Rounte ============ >
  const ymHackathonRoute = [
    {
      index: true,
      element: userTypeChecker(<HackathonMain />, <HackathonMain />)
    },
    {
      path: "/Mu-hackathon/registration",
      element: userTypeChecker(<HackathonEventRegister />, <HackathonEventRegister />)
    }
  ]
// <=========== YMUN Model-un routes for Institute ====================> \\
  const modelUnTeamRoutes = [
    {
      index : true,
      element: userTypeChecker(
        undefined,
        <ModelUNMain/>
      )
    },
    {
      path : "registration",
      element: userTypeChecker(
        undefined,
        <ModelUnMainComponent/>
      )
    },
    {
      path : "teamRegistration",
      element: userTypeChecker(
        undefined,
        <ModelUnTeamRegist/>
      )
    },
    {
      path : "applicants",
      element: userTypeChecker(
        undefined,
        <MunApplicants/>
      )
    },
    {
      path : "participants",
      element: userTypeChecker(
        undefined,
        <MunParticipants/>
      )
    },
    {
      path : "assign-manual-role/:id",
      element: userTypeChecker(
        undefined,
        <ModelUnManuallyAssign/>
      )
    },
  ]

  const newUserRoutes = [
    {
      index: true,
      element: userTypeChecker(
        <UI2MainDashboard />, //For Student
        <UI2MainDashboard /> //For Institute
      ),
    },
    {
      path: "discussion-board",
      element: userTypeChecker(
        <DiscussionBoardMain />,
        <DiscussionBoardMain />

      ),
    },
    {
      path: "under-review",
      element: userTypeChecker(
        undefined, //For Student
        <UsersUnderReview /> //For Institute

      ),
    },
    {
      path: "create-discussion",
      element: userTypeChecker(
        <DiscussionBoardCreateDiscussion />,
        <DiscussionBoardCreateDiscussion />

      ),
    },
    {
      path: "discussion-chat-room/:id",
      element: userTypeChecker(
        <DiscussionBoardChatRooms />,

        <DiscussionBoardChatRooms />

      ),
    },

    {
      path: "carbon-footprint/calculator",
      element: userTypeChecker(
        <CarbonParentApp />,
        <CarbonParentApp />
        // <MainCarbonFootPrint />, //For Student
        // <MainCarbonFootPrint />, //For Institute
        // <PrivateRoute 
        // component={<MainCarbonFootPrint/>}
        // roles={["institute", "student"]}
        // />
      ),
    },
    {
      path: "all-courses",
      element: userTypeChecker(<CourseOutlet />, <CourseOutlet />),
      children: [
        {
          index: true,
          element: userTypeChecker(<StudentAllCouses />, <StudentAllCouses />),
        },
        {
          path: "course-overview/:id",
          element: userTypeChecker(<StudentCourseOverView />, <StudentCourseOverView />),

        },


      ],
    },
    {

      path: "student-course",
      element: userTypeChecker(<StudentCoursePlayerContainer />, <StudentCoursePlayerContainer />),
      children: [
        {
          index: true,
          element: userTypeChecker(<StudentCourseScreen />, <StudentAllCouses />),
        },]

    },
    {
      path: "my-courses",
      element: userTypeChecker(<StudentMyCourses />, <StudentMyCourses />),
    }
  ];

  const clubRoutes = [
    {
      index: true,
      element: (
        <PrivateRoute
          component={<ClubPosts />}
          roles={["institute", "student"]}
        />
      ),
    },
    {
      path: "/clubs/:id/post/:postId",
      element: (
        <PrivateRoute
          component={<ClubSinglePost />}
          roles={["institute", "student"]}
        />
      ),
    },
  ];

  const clubProfileRoutes = [
    {
      path: "/profile/user/:userId",
      element: (
        <PrivateRoute
          component={<ClubProfile />}
          roles={["institute", "student", 'teacher']}
        />
      ),
    },
    {
      path: "/profile/institute/:userId",
      element: (
        <PrivateRoute
          component={<ClubProfile />}
          roles={["institute", "student", 'teacher']}
        />
      ),
    },
  ]

  const timelineRoutes = [
    {
      index: true,
      element: (
        <PrivateRoute component={<Posts />} roles={["institute", "student",'teacher']} />
      ),
    },

    {
      path: "/timeline/:id",
      element: (
        <PrivateRoute
          component={<SinglePost />}
          roles={["institute", "student",'teacher']}
        />
      ),
    },
    {
      path: "/timeline/posts/:instituteId",
      element: (
        <PrivateRoute
          component={<InstitutePosts />}
          roles={["institute", "student",'teacher']}
        />
      ),
    },
    {
      path: "/timeline/userprofile/:userId",
      element: (
        <PrivateRoute
          component={<ClickProfile />}
          roles={["institute", "student",'teacher']}
        />
      ),
    },
    {
      path: "/timeline/userprofile/institute/:instituteId",
      element: (
        <PrivateRoute
          component={<ClickProfile />}
          roles={["institute", "student",'teacher']}
        />
      ),
    },
  ];
  const settingRoutes = [
    {
      index: true,
      path: "/setting",
      element: userTypeChecker(
        <StudentEditBasicDetails />,
        <InstituteBasicDetails />
      ),
    },
    {
      path: "/setting/account",
      element: userTypeChecker(
        <StudentEditPassword />,
        <InstituteEditPassword />
      ),
    },
    {
      path: "/setting/additional",
      element: userTypeChecker(
        <AdditionalDetails />,
        <InstituteAdditionalDetails />
      ),
    },
    {
      path: "/setting/infrastructure",
      element: userTypeChecker(undefined, <InstituteEditInfrastructure />),
    },
    {
      path: "/setting/event",
      element: userTypeChecker(
        <StudentEditPreference />,
        <InstituteEditEvent />
      ),
    },
  ];
  // roles are
  /* student parent teacher teachercoordinator instititute staff admin*/
  const sideDrawer = [
    {
      icon: <DashboardOutlined />,
      path: "/new-dashboard",
      title: "Dashboard",
      roles: ["student", "teacher", "parent", "staff", "institute"],
      dock: true,
    },
    {
      icon: <TimelineOutlined />,
      path: "/timeline",
      title: "Timeline Feeds",
      roles: ["student", "teacher", "parent", "staff", "institute"],
      dock: true,
    },
    {
      icon: <Person3Icon />,
      path: "/profile/user/" + userData.id,
      title: "Profile",
      roles: ["student", "teacher", "parent", "staff"],
      dock: true,
    },
    {
      icon: <Person3Icon />,
      path: "/profile/institute/" + userData.id,
      title: "Profile",
      roles: ["institute"],
      dock: true,
    },

    
    {
      icon: <DashboardOutlined />,
      path: "/new-dashboard/under-review",
      title: "Under Review",
      roles: [ "institute"],
      dock: true,
    },
    {
      icon: <SchoolOutlined />,
      path: "/dashboard/registeration/teacher",
      title: "My Teachers",
      roles: ["institute", "teachercoordinator"],
      dock: true,
    },
    {
      icon: <AutoStoriesOutlined />,
      path: "/dashboard/registeration/student",
      title: "My Students",
      roles: ["institute", "teachercoordinator"],
      dock: true,
    },
    {
      icon: <SubscriptionsOutlined />,
      path: "#",
      title: "Enrollments",
      roles: ["institute", "teachercoordinator"],
      dock: false,
      subList: [
        {
          icon: <SchoolOutlined />,
          path: "/dashboard/enrollments/teacher",
          title: "Teacher Enrollments",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <AutoStoriesOutlined />,
          path: "/dashboard/enrollments/student",
          title: "Student Enrollments",
          roles: ["institute", "teachercoordinator"],
        },
      ],
    },
    {
      icon: <TimelineOutlined />,
      path: "/modelUn",
      title: "ModelUn",
      roles: ["student"],
      dock: true,
    },
    {
      icon: <TimelineOutlined />,
      path: "/model-un",
      title: "ModelUn",
      roles: ["institute"],
      dock: true,
    },
    {
      icon: <PeopleAltTwoToneIcon />,
      path: "/model-un/applicants",
      title: "ModelUn Applicants",
      roles: ["institute"],
      dock: true,
    },
    {
      icon: <GroupAddTwoToneIcon  />,
      path: "/model-un/participants",
      title: "ModelUn Participants",
      roles: ["institute"],
      dock: true,
    },
    
    {
      icon: <LocalActivityOutlined />,
      path: "#",
      title: "Certfications",
      roles: ["institute", "teachercoordinator"],
      dock: false,
      subList: [
        {
          icon: <SchoolOutlined />,
          path: "/dashboard/certifications/teacher",
          title: "Teacher Certifications",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <AutoStoriesOutlined />,
          path: "/dashboard/certifications/student",
          title: "Student Certifications",
          roles: ["institute", "teachercoordinator"],
        },
      ],
    },
    {
      icon: <LocalActivityOutlined />,
      path: "/dashboard/mycertificates",
      title: "My Certificates",
      roles: ["student", "teacher", "teachercoordinator", "parent", "staff"],
      dock: true,
    },
    {
      icon: <CelebrationOutlined />,
      path: "/ymg20",
      title: "YMG20",
      badge: { text: "Live", color: "success" },
      roles: ["institute", "teachercoordinator", "student", "teacher", "staff"],
      dock: false,
      subList: [
        {
          icon: <Groups2Outlined />,
          path: "/dashboard/delegates",
          title: "All Participants",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <EmojiEventsOutlined />,
          path: "/dashboard/event-winners",
          title: "Winners",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <MilitaryTechOutlined />,
          path: "/dashboard/studentcoordinators",
          title: "Coordinators",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <ForumOutlined />,
          path: "/dashboard/discussion",
          title: "Discussion Board",
          roles: [
            "institute",
            "student",
            "teacher",
            "teachercoordinator",
            "parent",
            "staff",
          ],
        },
        {
          icon: <QuestionAnswer />,
          path: "/dashboard/forum",
          title: "Q&A Portal",
          roles: [
            "student",
            "teacher",
            "teachercoordinator",
            "parent",
            "staff",
          ],
          dock: false,
        },
        {
          icon: <BarChartOutlined />,
          path: "/dashboard/reports",
          title: "Event Reports",
          roles: ["institute", "teachercoordinator"],
        },
        {
          icon: <GroupOutlined />,
          path: "/dashboard/socialshare",
          title: "YMG20 Social",
          roles: ["teachercoordinator", "student", "teacher", "staff"],
        },
      ],
    },
    {
      icon: <CelebrationOutlined />,
      path: "/mun",
      title: "Model United Nation",
      roles: ["institute", "teachercoordinator", "student", "teacher", "staff"],
      dock: false,
      subList: [
        {
          icon: <GroupOutlined />,
          path: "/dashboard/socialshare",
          title: "YMG20 Social",
          roles: [
            "institute",
            "teachercoordinator",
            "student",
            "teacher",
            "staff",
          ],
        },
      ],
    },
    {
      icon: <SettingsOutlined />,
      path: "/setting/",
      title: "Settings",
      roles: ["institute", "teachercoordinator", "student", "teacher", "staff"],
      dock: true,
    },
    {
      icon: <QuestionAnswerOutlined />,
      path: "/faq",
      title: "FAQ",
      roles: ["student", "teacher", "teachercoordinator", "parent", "staff"],
      dock: false,
    },
    {
      icon: <SupervisorAccountOutlined />,
      path: "/admin/",
      title: "Admin Users",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <TrendingUpSharp />,
      path: "/admin/analytics",
      title: "Analytics",
      roles: ["admin"],
      dock: false,
    },

    {
      icon: <PeopleOutlineSharp />,
      path: "/admin/institutes",
      title: "Users",
      roles: ["admin"],
      dock: false,
      subList: [
        {
          icon: <SchoolOutlined />,
          path: "/admin/institutes",
          title: "Institutes",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <AutoStoriesOutlined />,
          path: "/admin/students",
          title: "Students",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <BookOutlined />,
          path: "/admin/teachers",
          title: "Teachers",
          roles: ["admin"],
          dock: false,
        },
      ],
    },
    {
      icon: <SubscriptionsOutlined />,
      path: "/admin/courses",
      title: "Courses",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <LocalActivityOutlined />,
      path: "/admin/certificates",
      title: "Certificates",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <SourceOutlined />,
      path: "/admin/content",
      title: "Manage Content",
      roles: ["admin"],
      dock: false,
      subList: [
        {
          icon: <SourceOutlined />,
          path: "/admin/content",
          title: "Website Content",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <NotificationAddOutlined />,
          path: "/admin/notification",
          title: "Notifications",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <FormatQuoteOutlined />,
          path: "/admin/quotes",
          title: "Quotes",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <RssFeedOutlined />,
          path: "/admin/blogs",
          title: "Blogs",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <RssFeedOutlined />,
          path: "/admin/news",
          title: "News",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <BarChartOutlined />,
          path: "/admin/createpoll",
          title: "Public Polls",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <MapOutlined />,
          path: "/admin/states",
          title: "Manage States",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <CollectionsOutlined />,
          path: "/admin/gallery",
          title: "Manage Gallery",
          roles: ["admin"],
          dock: false,
        },
      ],
    },

    {
      icon: <ContactSupportOutlined />,
      path: "/admin/contactUs",
      title: "Contacts",
      roles: ["admin"],
      dock: false,
    },

    {
      icon: <EmailOutlined />,
      path: "/admin/email-list",
      title: "Email Management",
      roles: ["admin"],
      dock: false,
    },

    {
      icon: <MarkEmailReadOutlined />,
      path: "/admin/emaildeliverable",
      title: "Email Reports",
      roles: ["admin"],
      dock: false,
    },
  ];
  const MegaMenuArr = [
    {
      id: 1,
      title: "Solutions",
      icon: <BookOnline />,
      state: props?.solutionCollapse,
      setState: props?.setSolutionCollapse,
      links: [
        {
          icon: <ArrowForwardIosSharp />,
          name: "SIS Learning",
          path: "/learning",
          description:
            "Whether it is a student, teacher, staff or a parent, we have everything they ought to know about safety in your school. Packaged as training, courses and exercises, get access to the most comprehensive school safety modules ever created.",
        },
        {
          icon: <ArrowForwardIosSharp />,
          name: "SIS Compliances",
          path: "/compliance",
          description:
            "An easy to use interface built for the school administration to ensure that your school meets the mandatory safety standards prescribed by the Government",
        },
        {
          icon: <ArrowForwardIosSharp />,
          name: "SIS Certifications",
          path: "/certification",
          description:
            "It's time to get certified! We have special training sessions with certifications for school staff, students and parents alike. These certifications will help us create school safety experts for sustainable schools.",
        },
      ],
    },
    {
      id: 2,
      icon: <GroupOutlined />,
      title: "About",
      state: props?.aboutCollapse,
      setState: props?.setAboutCollapse,
      links: [
        {
          icon: <ArrowForwardIosSharp />,
          name: "About Us",
          path: "/about",
          description:
            "Read about our vision, mission and story and know more about values that guide us at SafeInSchool.",
        },
        {
          icon: <ArrowForwardIosSharp />,
          name: "Blogs",
          path: "/blog",
          description:
            "Get the latest news on our events, programmes and initiatives as and when they happen.",
        },
        {
          icon: <ArrowForwardIosSharp />,
          name: "Events",
          path: "/event",
          description:
            "Check the latest upcoming and past events and get dates for our webinars, trainings and podcasts",
        },
        {
          icon: <ArrowForwardIosSharp />,
          name: "Careers",
          path: "/career",
          description:
            "Join our mission to create safer schools as a member of our growing team. Browse career opportunities at SafeInSchool.",
        },
      ],
    },
  ];
  return {
    publicRoutes,
    v2AuthPublicRoutes,
    adminRoutes,
    sideDrawer,
    MegaMenuArr,
    userRoutes,
    newUserRoutes,
    settingRoutes,
    timelineRoutes,
    clubProfileRoutes,
    clubRoutes,
    ymunRoutes,
    ymParliamentRoute,
    ymHackathonRoute ,
    modelUnTeamRoutes
  };
};

export default useRoutes;
