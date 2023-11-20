import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostComponent from './components/PostComponent';
import AddPost from './components/AddPost.jsx';
import axios from 'axios';
import { MyContext } from './EventTimeline.jsx';
import { UserContext } from 'global/context';
import PostCenter from './components/PostCenter';

const InstitutePosts = () => {
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith(`/timeline/userProfile`);

  const { instituteId } = useParams();
  const { userId } = useParams();
  const idToUse = isProfilePage ? userId : instituteId;
  const { userPosts, setUserPosts, userComment, setUserComment } = useContext(MyContext);
  const { userData, token, loginStatus } = useContext(UserContext);
  const { id, email, type, role } = userData;
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [allComment, setAllComment] = useState([]);
  const [institutePost, setinstitutePost] = useState([]);

  const handleChildClick = (index) => {
    if (activeChildIndex === index) {
      setActiveChildIndex(null);
    } else {
      setActiveChildIndex(index);
    }
  };
  const fetchCommentAll = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `comments/all`);
      setAllComment(response.data);
    } catch (error) {}
  };
  const allPostFromInstitute = () => {
    const post = userPosts.filter((post) => post.instituteId == idToUse);
    setinstitutePost(post);
  };

  const fetchAllPost = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'get')
      .then((response) => {
        // const reversedPosts = response.data.reverse();
        setUserPosts(response.data);
        // allPostFromInstitute();
      })
      .catch((error) => {});
  };
  useEffect(() => {
    const fetchData = async () => {
      // await fetchAllPost();
      // await fetchCommentAll();
      // allPostFromInstitute();
    };
    // fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [instituteId]);

  const img1 =
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80 386w';
  const img2 =
    'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80 869w';
  const img3 =
    'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80 876w';

  return (
    <div>
      {userPosts.filter((post) => post.instituteId == idToUse).length > 0 ? (
        <span className="institute-posts-header">
          All Posts from{' '}
          <span className="institute-posts-header-name font-bold text-capitalize">
            {userPosts.find((post) => post.instituteId == idToUse).postBy}
          </span>
        </span>
      ) : (
        <h1>No Post To show</h1>
      )}
      {userPosts.map((post, index) => {
        if (post.instituteId != idToUse) {
          return null;
        } else {
          return <PostCenter key={index} post={post} img={img2} index={index} isActive={activeChildIndex === index} onClick={handleChildClick} />;
        }
      })}
    </div>
  );
};

export default InstitutePosts;
