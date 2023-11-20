import { Person } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { apiJson } from 'api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../../layout/BreadCrumb';
import blogs from './content';

const DynamicBlog = () => {
  const route = useLocation().pathname;
  const routeArr = route.split('/');
  const blogName = routeArr[2];
  let [blogData, setBlogData] = useState([]);

  const getAllBlogs = async () => {
    // console.log("Fetching Quites Data ")
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
  function createMarkup(data) {
    return { __html: data };
  }

  // console.log("blogData", blogData);
  return (
    <div>
      <BreadCrumb heading={'Blogs'} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {/* <!-- blog post --> */}
                {blogData?.map((blog, index) => {
                  {
                    /* console.log(blog); */
                  }
                  return (
                    <>
                      <div className="col-sm-6 mb-4">
                        <article className="card border-0 rounded-0 position-relative box-shadow zindex-1">
                          <div className="card-type">Blog</div>
                          <img className="card-img-top rounded-top-0 " src={blog?.img} alt="blog-thumb" />
                          <div className="card-body">
                            <div className="title-border-left">
                              <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
                                <span className="text-secondary d-flex align-items-center">
                                  by{" "}
                                  <Avatar
                                    className="ms-2 me-1"
                                    sx={{
                                      height: 30,
                                      width: 30,
                                    }}
                                    src="/favicon.ico">
                                    <Person />
                                  </Avatar>{" "}
                                  {blog?.author}
                                </span>{" "}
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
                            <a href={"/blog/" + blog?.slug} className="btn btn-secondary btn-arrow">
                              read more
                            </a>
                          </div>
                        </article>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* sidebar */}
            <aside className="col-lg-4">
              {/* latest post */}
              <div className="bg-white px-4 py-5 box-shadow mb-5">
                <h4 className="mb-4">Latest Article</h4>
                {/* post-item */}
                {blogData.map((blog, index) => {
                  return (
                    <div className="media d-flex border-bottom border-color pb-3 mb-3">
                      <img className="me-3 mini-blog-image" src={blog.img} alt="post-thumb" />
                      <div className="media-body">
                        <h5 className="mt-0">
                          <a href={"/blog/" + blog?.slug} className="text-dark">
                            {blog.title}
                          </a>
                        </h5>
                        {/* Aug 02, 2018 */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicBlog;
