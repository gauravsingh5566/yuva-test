import { Person } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { apiJson } from 'api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import blogs from '../Blog/content';

const SingleBlog = ({ blog }) => {
  return (
    <div className="card border-0 rounded-3 p-3 shadow h-100">
      <img className="card-img-top rounded-3 border" src={blog.img} alt="Card image cap" />
      <div className="card-body px-0">
        <div className="title-border-left">
          <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
            <span className="text-secondary d-flex align-items-center">
              by{' '}
              <Avatar
                className="ms-2 me-1"
                sx={{
                  height: 30,
                  width: 30,
                }}
                src="/favicon/favicon.ico">
                <Person />
              </Avatar>{' '}
              {blog?.author}
            </span>{' '}
            <span className="text-secondary">{moment(blog?.createdAt).calendar()}</span>
          </div>
          <h6 className="card-title">
            <a href={'/blog/' + blog?.slug} className="text-dark fs-6">
              {blog?.title}
            </a>
          </h6>
        </div>
        {/* <p className="card-text">
                            {blog.content}...
                          </p> */}
        <div className="line-clamp-blog text-secondary">{blog?.heading}</div>
        {/* {blog.content} */}
        <a href={'/blog/' + blog?.slug} className="btn btn-secondary btn-arrow">
          read more
        </a>
      </div>
    </div>
  );
};

const BlogsSwiper = () => {
  let [blogData, setBlogData] = useState([]);
  const getAllBlogs = async () => {
    try {
      const res = await apiJson.get("public/blogs");
      if (res.status == 200) {
        setBlogData(res?.data?.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllBlogs();
  }, []);
  return (
    <div className="bg-success eventsbg py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <h2 className="text-white fs-1">
              Featured <span className="text-warning">Blogs</span>
            </h2>
            <img src="https://demo.xpeedstudio.com/evenex/multi-event/wp-content/uploads/sites/13/2021/02/header-line.png" className="attachment-large size-large" alt="" loading="lazy" width="92" height="12"></img>
            <p className="text-white">Stay updated on the latest G20 buzz. Read our collection of stories, guest articles, features on trending topics such as youth culture, climate change, sustainability, macroeconomics and more.</p>
          </div>
          <div className="col text-start text-lg-end">
            <Link to="/blog">
              <button className="btn btn-light">View All Blogs</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            modules={[Navigation]}
            navigation={true}
            breakpoints={{
              740: {
                slidesPerView: 2,
              },
              1240: {
                slidesPerView: 3,
              },
            }}>
            {blogData?.map((blog, index) => {
              if (index < 4)
                return (
                  <SwiperSlide key={index} className="py-4">
                    <SingleBlog blog={blog} />
                  </SwiperSlide>
                );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BlogsSwiper;
