import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import ClubLeftSection from './components/ClubLeftSection';

import { UserContext } from "global/context";
import { apiJson } from "api";
import { toast } from "react-toastify";
import { RecentClubQuestion, TopClubPosts } from "components/dashboard";

export const ClubContext = createContext();

export const MyProvider = ({ children }) => {
  const { userData, token } = useContext(UserContext);
  const { id, role, type } = userData;
  const [clubDetail, setClubDetail] = useState({});
  const [allClub, setAllClub] = useState([]);
  const [privateClub, setPrivateClub] = useState([]);
  const [publicClub, setPublicClub] = useState([]);
  const [allClubInstitute, setAllClubInstitute] = useState([]);
  const [allClubStudent, setAllClubStudent] = useState([]);
  const [clubPost, setClubPost] = useState([]);
  const [allFollowedClub, setAllFollowedClub] = useState([]);
  const [userAllPost, setuserAllPost] = useState([]);
  const [clickUserAllPost, setclickuserAllPost] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [clubUserDetail, setClubUserDetail] = useState({});
  const [clickclubUserDetail, setclickClubUserDetail] = useState({});
  const [clickuserDetail, setclickUserDetail] = useState({});
  const [allLikedPost, setallLikedPost] = useState([]);
  const [allLikedPostClickUser, setallLikedPostClickUser] = useState([]);
  const [allUserComment, setAllUserCommment] = useState([]);
  const [allClickedUserComment, setAllClickedUserCommment] = useState([]);
  const [isLoadingClubProfile, setIsLoadingClubProfile] = useState(false);
  const [isLoadingClubPosts, setisLoadingClubPosts] = useState(false);
  // const [isLoading, setisLoadingClubPosts] = useState(false);

  const fetchAllUserComment = () => {
    apiJson
      .get("club/allCommentByUser/" + userData.id)
      .then((res) => {
        setAllUserCommment(res.data.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchAllClickedUserComment = () => {
    apiJson
      .get("club/allCommentByUser/" + userData.id)
      .then((res) => {
        setAllClickedUserCommment(res.data.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchAllLikedPostUser = () => {
    apiJson
      .get("club/allLikedPostByUser/" + userData.id)
      .then((res) => {
        setallLikedPost(res.data.result);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const fetchAllLikedPostClickUser = (userId) => {
    apiJson
      .get("club/allLikedPostByUser/" + userId)
      .then((res) => {
        setallLikedPostClickUser(res.data.result);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const fetchClubUserDetail = () => {
    apiJson.get("club/getClubUserDetail/" + id + "/" + role).then((res) => {
      setClubUserDetail(res.data.user);
    });
  };

  const fetchClickClubUserDetail = (userId, role) => {
    apiJson
      .get("club/getClubUserDetail/" + userId + "/" + role)
      .then((res) => {
        setclickClubUserDetail(res.data.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const fetchUserDetail = () => {
    apiJson.get("club/getUserDetail/" + role + "/" + id).then((res) => {
      setUserDetail(res.data.user);
    });
  };
  const fetchClickUserDetail = (userId, role) => {
    apiJson.get("club/getUserDetail/" + role + "/" + userId).then((res) => {
      setclickUserDetail(res.data.user);
    });
  };

  const fetchAllFollowedClubByUser = () => {
    apiJson
      .post("club/allFollowedClub/", {
        userId: id,
        userType: role,
      })
      .then((res) => {
        setAllFollowedClub(res.data.clubs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    fetchAllFollowedClubByUser();
  }, []);
  const fetchClubPosts = (clubId) => {
    setisLoadingClubPosts(true);
    apiJson
      .get("club/getClubPost/" + clubId)
      .then((res) => {
        setClubPost(res.data.posts);
        setisLoadingClubPosts(false);
      })
      .catch((error) => {
        console.log(error.message);
        setisLoadingClubPosts(false);
        toast.dismiss();
        toast.error("Internal Server Error");
      });
  };

  const getAllInstituteClub = () => {
    apiJson
      .get("club/club-institute")
      .then((res) => {
        // console.log("ajsdflksajflkf", res.data);
        setAllClubInstitute(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAllStudentClub = () => {
    apiJson
      .get("club/club-student")
      .then((res) => {
        // console.log("res.data of timeinline", res.data);
        setAllClubStudent(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAllClubs = () => {
    apiJson
      .get("club")
      .then((res) => {
        setAllClub(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getPublicClubs = () => {
    apiJson
      .get("club/public/")
      .then((res) => {
        setPublicClub(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getPublicClubs();
  }, []);

  const getPrivateClub = () => {
    if (userData.role === "institute") {
      apiJson
        .get("club/private/institute/" + userData.id)
        .then((res) => {
          setPrivateClub(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (userData.role === "student") {
      apiJson
        .get("club/private/institute/" + userData.instituteId)
        .then((res) => {
          setPrivateClub(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    if (userData) {
      getPrivateClub();
    }
  }, [userData]);

  const getClubDetail = (id) => {
    apiJson
      .get("club/clubId/" + id)
      .then((res) => {
        setClubDetail(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchAllUserPost = () => {
    apiJson
      .get("club/getAllPostFromUser/" + role + "/" + id)
      .then((res) => {
        // console.log("inside the user all post")
        setuserAllPost(res.data.allPosts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchAllClickedUserPost = (id, role) => {
    setIsLoadingClubProfile(true);
    apiJson
      .get("club/getAllPostFromUser/" + role + "/" + id)
      .then((res) => {
        // console.log("inside the user all post");
        const newPosts = res.data.allPosts;
        setclickuserAllPost(res.data.allPosts);
        setIsLoadingClubProfile(false);
      })
      .catch((error) => {
        setIsLoadingClubProfile(false);
        toast.dismiss();
        toast.error("Internal server Error");
        console.log(error.message);
      });
  };

  useEffect(() => {
    // fetchAllUserPost();
    getAllInstituteClub();
    getAllStudentClub();
    getAllClubs();
    fetchUserDetail();
    fetchClubUserDetail();
    // console.log("but ")
  }, []);
  const contextValue = {
    setClubPost,
    setclickuserAllPost,
    isLoadingClubPosts,
    setisLoadingClubPosts,
    isLoadingClubProfile,
    setIsLoadingClubProfile,
    allClickedUserComment,
    allUserComment,
    fetchAllUserComment,
    fetchAllClickedUserComment,
    allLikedPostClickUser,
    allLikedPost,
    fetchAllLikedPostClickUser,
    fetchAllLikedPostUser,
    fetchAllUserPost,
    fetchAllClickedUserPost,
    fetchClickClubUserDetail,
    clickclubUserDetail,
    fetchClubUserDetail,
    clubUserDetail,
    clickuserDetail,
    userDetail,
    fetchUserDetail,
    fetchClickUserDetail,
    userAllPost,
    clickUserAllPost,
    fetchAllFollowedClubByUser,
    allFollowedClub,
    fetchClubPosts,
    clubPost,
    getClubDetail,
    clubDetail,
    getAllClubs,
    allClub,
    privateClub,
    publicClub,
    getPublicClubs,
    getPrivateClub,
    getAllStudentClub,
    getAllInstituteClub,
    allClubInstitute,
    allClubStudent,
    // setUserDetail,
  };

  return <ClubContext.Provider value={contextValue}>{children}</ClubContext.Provider>;
};

const TimelineClub = () => {
  return (
    <MyProvider>
      <div style={{ padding: "20px" }} className="container py-4">
        <div className="row g-3 p-relative">
          <div className="col-12 col-lg-8">
            <Outlet />
          </div>
          <div className="col-12 col-lg-4  ">
            <div className="sticky-top">
              <div className="row g-2">
                <div className="col-12">
                  <RecentClubQuestion />
                </div>
                <div className="col-12">
                  <TopClubPosts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyProvider>
  );
};

export default TimelineClub;
