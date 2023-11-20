import React, { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../EventTimeline";
import { UserContext } from "global/context";
import TopPosst from "./TopPosst";
import RecentPost from "./RecentPost";
import { ActiveInstitutesWidget } from "components/dashboard";

const TimelineRight = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userPosts, setUserPosts, userComment, setUserComment } = useContext(MyContext);
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const isSinglePost = location.pathname.startsWith(`/timeline/${id}`);
  // const isProfilePage = location.pathname.startsWith(`/timeline/userProfile`)
  const [latestPost, setLatestPost] = useState(null);
  const [topPost, settopPost] = useState(null);
  const [allInstitute, setallInstitute] = useState(null);

  const fetchAllInstitute = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "timeline/getAllInstitute").then((response) => setallInstitute(response.data));
  };

  const img1 = "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80 386w";
  const img2 = "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80 869w";
  const img3 = "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80 876w";

  const handleClickOnInstitute = (id) => {
    navigate(`/timeline/posts/${id}`);
  };

  useEffect(() => {
    const latestPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const sortedPosts = userPosts.sort((a, b) => b.commentsCount - a.commentsCount);
    settopPost(sortedPosts.slice(0, 3));
    setLatestPost(latestPosts.slice(0, 3));
  }, []);
  useEffect(() => {
    fetchAllInstitute();
  }, []);

  return (
    <>
      {isSinglePost ? (
        <>
          <RecentPost />
          <TopPosst />
        </>
      ) : (
        <>
          <ActiveInstitutesWidget />
        </>
      )}
    </>
  );
};

export default TimelineRight;
