import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import PostComponent from './components/PostComponent';
import AddPost from './components/AddPost.jsx';
import axios from 'axios';
import { MyContext } from './EventTimeline.jsx';
import PostCenter from './components/PostCenter';
const SinglePost = () => {
  const { id } = useParams();

  const { userPosts, setUserPosts, userComment, setUserComment } = useContext(MyContext);
  const [singlePost, setSinglePost] = useState(null);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [commentCount, setCommentCount] = useState(userComment.length);
  const [allComment, setAllComment] = useState([]);
  const [render, setRender] = useState(false);

  // let relevantPost = userPosts.filter((post)=>post.id === id);
  const handleChildClick = (index) => {
    if (activeChildIndex === index) {
      setActiveChildIndex(null);
    } else {
      setActiveChildIndex(index);
    }
  };
  const fetchCommentAll = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comments/all`);
      setAllComment(response.data);
    } catch (error) {}
  };
  const fetchSinglePost = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/${id}`);
      setSinglePost(response.data);
    } catch (error) {}
  };

  const fetchComment = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `timeline/comment/${id}`);
      setUserComment(response.data);
    } catch (error) {}
  };
  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'timeline/get')
      .then((response) => {
        const reversedPosts = response.data.reverse();
        setUserPosts(response.data);
      })
      .catch((error) => {});
  };
  const renderAgain = () => {
    setRender(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSinglePost();
  }, []);

  useEffect(() => {
    fetchPost();
    return () => {
      setRender(false);
    };
  }, [render]);
  useEffect(() => {
    fetchPost();

    // fetchCommentAll();
    // fetchComment()
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSinglePost();
  }, [id]);

  const img1 =
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80 386w';
  const img2 =
    'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80 869w';
  const img3 =
    'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80 876w';

  return (
    <div>
      {/* {singlePost ? (
        <PostCenter
          post={singlePost}
          img={img2}
          render={fetchSinglePost}
          singleItem={true}
        />
      ) : null} */}

      {userPosts?.map((post, index) => {
        if (post.id == id) {
          return <PostCenter key={index} post={post} img={img2} index={index} isActive={activeChildIndex === index} onClick={handleChildClick} />;
        }
      })}

      <hr
        style={{
          borderTop: '2px solid #606076',
          marginTop: '33px',
        }}
      />
      <span style={{ fontSize: '26px' }}>Relevant Post</span>
      <br />
      <br />
      <br />
      {userPosts?.map((post, index) => {
        if (post.id == id) {
          return null;
        }
        const commentCount = allComment.filter((comment) => comment.postId === post.id).length;
        return <PostCenter key={index} post={post} img={img2} index={index} isActive={activeChildIndex === index} onClick={handleChildClick} />;
      })}
    </div>
  );
};

export default SinglePost;
