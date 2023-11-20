import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext } from 'global/context';
import { apiAuth } from 'api';
import axios from 'axios';
import TimelineLeft from './components/TimelineLeft';
import TimelineRight from './components/TimelineRight';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userDetail, setUserDetail] = useState('not available');
  const [userComment, setUserComment] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const { userData, token } = useContext(UserContext);
  const { id, role, type } = userData;
  const [institutePosts, setInstitutePosts] = useState([]);
  const [allClub, setAllClub] = useState([]);
  const [privateClub, setPrivateClub] = useState([]);
  const [publicClub, setPublicClub] = useState([])
  const [allClubInstitute, setAllClubInstitute] = useState([]);
  const [allClubStudent, setAllClubStudent] = useState([]);

  const getPrivateClub = ()=>{

    if(userData.role==='institute'){
        axios.get(process.env.REACT_APP_API_BASE_URL+"club/private/institute/"+userData.id)
      .then((res)=>{
        setPrivateClub(res.data);
      }).catch((error)=>{
        console.log(error.message);
      })
    }else if(userData.role==='student'){
        axios.get(process.env.REACT_APP_API_BASE_URL+"club/private/institute/"+userData.instituteId)
      .then((res)=>{
        setPrivateClub(res.data);
      }).catch((error)=>{
        console.log(error.message);
      })
    }
  }

  useEffect(()=>{
    if(userData){
      getPrivateClub()
    }
  },[userData])





  const getAllInstituteClub = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club/club-institute")
    .then((res)=>{
      // console.log("res.data of timeinline",res.data)
      setAllClubInstitute(res.data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const getAllStudentClub = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club/club-student")
    .then((res)=>{
      // console.log("res.data of timeinline",res.data)
      setAllClubStudent(res.data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const getAllClubs = ()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL+"club")
    .then((res)=>{
      setAllClub(res.data);
      // getPrivateClub(res.data)
      getPublicClubs(res.data);
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const getPublicClubs = (all)=>{
    let club = []
    
    club = all.filter((club)=>{
      return club.type == 'public';
    })
    
    setPublicClub(club)
  }

  // const getPrivateClub = (all)=>{
  //   let club = []
  //   if(role ==='institute'){
  //      club = all.filter((club)=>{
  //       return club.instituteId == userData.id && club.type=='private';
  //     })
  //   }
  //   setPrivateClub(club)
  // }

  const onlyInstitutePost = ()=>{
    let posts = []
    // console.log("inside the onlypost")
    if(userPosts.length>0){
      if(role==='institute'){
        posts = userPosts.filter((post)=>post.instituteId==userData.id)
        // console.log("id", userPosts[0]?.instituteId, userData.id)
      }else{
        posts = userPosts.filter((post)=>post.instituteId==userData.instituteId)

      }
    }
    // console.log("thi si post", posts)
    setInstitutePosts(posts);
  }
  useEffect(()=>{
    // console.log("inside", userData)
    if(userData){
      onlyInstitutePost()
    }
  },[userPosts])

  const fetchAdminDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getInstituteDetail/', {
        instituteId: id,
      })
      .then((response) => setUserDetail(response.data));
  };
  const fetchTeacherDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getTeacherDetail/', {
        teacherId: id,
      })
      .then((response) => setUserDetail(response.data));
  };

  const fetchStudentDetails = async () => {
    try {
      const res = await apiAuth.get(process.env.REACT_APP_API_BASE_URL + 'student/detail', {
        headers: { authorization: token },
      });
      if (res.status === 200) {
        setUserDetail(res.data.result[0]);
      }
    } catch (error) {}
  };
  const fetchAllPost = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'timeline/get')
      .then((response) => {
        // const reversedPosts = response.data.reverse();
        setUserPosts(response.data);
      })
      .catch((error) => {});
  };
  const fetchAllComment = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comments/all`);
      setAllComment(response.data);
    } catch (error) {}
  };
  const contextValue = {
    getAllInstituteClub,
    getAllStudentClub,
    institutePosts,
    allClubInstitute,
    allClubStudent,
    userPosts,
    setUserPosts,
    userComment,
    setUserComment,
    commentCount,
    setCommentCount,
    userDetail,
    setUserDetail,
    setAllComment,
    allComment,
    fetchAllComment,
    fetchAllPost,
    getAllClubs,
    allClub,
    privateClub,
    publicClub,
  };

  useEffect(() => {
    getAllInstituteClub();
    getAllStudentClub();
    getAllClubs();
    fetchAllComment();
    fetchAllPost();
    if (role == 'institute'  && token) {
      fetchAdminDetails();
    } else if (role == 'student' && token) {
      fetchStudentDetails();
    } else if (role == 'teacher' && token) {
      fetchTeacherDetails();
    }
  }, []);

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

const EventTimeline = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith(`/timeline/userProfile`);
  return (
    <MyProvider>
      <div className="container py-4">
        <div>
          <div className="row g-2 p-relative">
            
            {isProfilePage ? (
              <div className="col-12 col-lg-12" style={{ zIndex: '2' }}>
                <div>
                  {isProfilePage}
                  <Outlet />
                </div>
              </div>
            ) : (
              <div className="col-12 col-lg-9" style={{ zIndex: '2' }}>
                <div>
                  {isProfilePage}
                  <Outlet />
                </div>
              </div>
            )}
            {isProfilePage ? null : (
              <div className="col-12 col-lg-3 h-100">
                <div className="sticky-top">
                  <TimelineRight />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MyProvider>
  );
};

export default EventTimeline;
