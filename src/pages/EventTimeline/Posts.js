import React, { useContext, useEffect, useState } from "react";
import PostComponent from "./components/PostComponent";
import AddPost from "./components/AddPost.jsx";
import axios from "axios";
import { MyContext } from "./EventTimeline.jsx";
import { UserContext } from "global/context";
import Pagination from "./components/Pagination";
import PostPublish from "./components/PostPublish";
import PostCenter from "./components/PostCenter";
import { Card } from "react-bootstrap";
// import ShowAllClubs from "pages/TimelineClubs/components/ShowAllClubsTimeLIne";
import ShowAllClubsTimeLIne from "pages/TimelineClubs/components/ShowAllClubsTimeLIne";
const Posts = () => {
  const {
    institutePosts,
    userPosts,
    setUserPosts,
    userComment,
    setUserComment,
    allComment,
    setAllComment,
    fetchCommentAll,
    fetchAllPost,
  } = useContext(MyContext);
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role } = userData;
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handleChildClick = (index) => {
    if (activeChildIndex === index) {
      setActiveChildIndex(null);
    } else {
      setActiveChildIndex(index);
    }
  };


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = institutePosts.slice(firstPostIndex, lastPostIndex);
 



  const img1 =
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80 386w";
  const img2 =
    "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80 869w";
  const img3 =
    "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80 876w";

  return (
    <div>
     
      {role === "institute" ? <PostPublish /> : null}

      <div className="mb-4">
      <ShowAllClubsTimeLIne/>
      </div>
      
      {currentPosts?.map((post, index) => {
        return (
          <PostCenter
            key={post.id}
            post={post}
            img={img2}
            index={index}
            isActive={activeChildIndex === index}
            onClick={handleChildClick}
            render={fetchAllPost}
          />
        );
      })}
      {institutePosts.length >= 10 ? (
        <Pagination
          totalPosts={institutePosts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};

export default Posts;
