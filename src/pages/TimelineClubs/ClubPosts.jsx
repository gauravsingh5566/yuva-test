import React, { createContext, useContext, useEffect, useState } from "react";
import ClubTopBanner from "./components/ClubTopBanner";
import ClubAddPost from "./components/ClubAddPost";
import ClubPostCenter from "./components/ClubPostCenter";
import AddIcon from "@mui/icons-material/Add";

import { Card } from "react-bootstrap";
import { ClubContext } from "./TimelineClub";
import { UserContext, useGlobalContext } from "global/context";
import { useParams } from "react-router";
import ShowAllClubs from "./components/ShowAllClubs";
import axios from "axios";
import { toast } from "react-toastify";
import ClubPostSkeleton from "./components/ClubPostSkeleton";
import { apiJson } from "api";

export const ClubPostContext = createContext();

export const MyProvider = ({ children, post, clubId }) => {
  const [postDetail, setPostDetail] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [user, setUser] = useState({});
  const [postUserDetail, setpostUserDetail] = useState({});
  const [postDetailIsLoading, setpostDetailIsLoading] = useState(false);

  const fetchpostDetail = () => {
    // console.log(postDetail, "/", postComments, "/",postDetailIsLoading)
    setpostDetailIsLoading(true);
    apiJson
      .get("club/postDetail/post/" + post.id)
      .then((res) => {
        setPostDetail(res.data);
        setPostComments(res.data.allComments);
        setpostUserDetail(res.data.postUserDetail);
        setpostDetailIsLoading(false);
        setUser(res.data.userDetail);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Internal Server Error");
        setpostDetailIsLoading(false);
        console.log(error.message);
      });
  };

  const contextValue = {
    postDetailIsLoading,
    postUserDetail,
    user,
    postDetail,
    postComments,
    fetchpostDetail,
  };

  return <ClubPostContext.Provider value={contextValue}>{children}</ClubPostContext.Provider>;
};

const ClubPosts = () => {
  const { id } = useParams();

  const { userData } = useContext(UserContext);
  const { clubPost, getClubDetail, fetchClubPosts, clubDetail, isLoadingClubPosts, setisLoadingClubPosts } = useContext(ClubContext);

  const [showNoPostMessage, setShowNoPostMessage] = useState(false);

  useEffect(() => {
    if (!isLoadingClubPosts) {
      const timeout = setTimeout(() => {
        setShowNoPostMessage(true);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [isLoadingClubPosts]);

  useEffect(() => {
    getClubDetail(id);
  }, [id]);

  // const [clubPost, setClubPost]= useState([])

  useEffect(() => {
    setisLoadingClubPosts(true);
    fetchClubPosts(id);
  }, []);

  useEffect(() => {
    fetchClubPosts(id);
  }, [id]);

  return (
    <>
      <div className="mb-4">
        <ClubTopBanner clubDetail={clubDetail} />
      </div>
      <div className="mb-4">
        <ClubAddPost clubDetail={clubDetail} />
      </div>
      <div className="mb-4">
        <ShowAllClubs />
      </div>

      <div className="mb-4">
        {isLoadingClubPosts ? (
          <ClubPostSkeleton />
        ) : clubPost?.length > 0 ? (
          <>
            <h4 className="text-capitalize mb-3 ">
              All Recent Post of{" "}
              <span className="text-capitalize" style={{ color: "#ff8800" }}>
                {clubDetail?.name}
              </span>{" "}
            </h4>
            {clubPost?.map((post, index) => {
              return (
                <MyProvider key={post.id} clubId={id} post={post}>
                  <ClubPostCenter clubDetail={clubDetail} key={post.id} post={post} index={index} />
                </MyProvider>
              );
            })}
          </>
        ) : (
          showNoPostMessage && clubPost.length === 0 && 
          <div className='d-flex justify-content-center'>
        <div style={{height: "50%", width: "70%"}}>
        <img className='h-100 w-100' src={"/ProfileImg/NoPost.svg"} alt='Not Post Yet'/>
        </div>
        </div>
        )}
      </div>
    </>
  );
};

export default ClubPosts;
