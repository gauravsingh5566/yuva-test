import { apiJson } from 'api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../../layout/BreadCrumb';
import blogs from './content';
import moment from 'moment';

const SingleBlog = () => {
  let slug = useParams();
  let Send = slug.slug;
  let [blogData, setBlogData] = useState();

  let [blogContent, setBlogContent] = useState();
  let [blogDatas, setBlogDatas] = useState([]);

  const getBlogsById = async () => {
    // console.log("Fetching Quites Data ");
    try {
      // console.log(`public/dynamic-blog/${slug.slug}`);
      // /dynamic-blog/:slug blogs/edit/
      const res = await apiJson.get(`public/dynamic-blog/${slug.slug}`);
      // console.log("result" + res, slug.slug);

      if (res.status == 200) {
        // console.log("All blogs Data: ", res.data.result);
        setBlogData(res?.data?.result);
        setBlogContent(res?.data?.result?.content);
      }
    } catch (error) {}
  };

  const getAllBlogs = async () => {
    // console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get("public/blogs");
      if (res.status == 200) {
        // console.log("All blogs Data: ", res.data.result);
        setBlogDatas(res?.data?.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogsById();
    getAllBlogs();
  }, []);
  // console.log(blogDatas);
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      <div>
        <BreadCrumb heading={blogData?.title} />
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* post thumb */}
                <div className="position-relative mb-5">
                  <img src={blogData?.img} alt="post thumb" className="img-fluid w-100" />
                  <div className="card-type hover-ripple">Article</div>
                </div>
                <div className="card-meta text-uppercase mb-2">
                  by <strong className="text-dark">{blogData?.author}</strong>/ on <strong className="text-dark">{moment(blogData?.createdAt).calendar()}</strong>
                </div>
                <div dangerouslySetInnerHTML={createMarkup(blogData?.content)}></div>
                {/* <p className="fs-5">{blogData.heading}</p>
                      {blogData.section.map((section, index) => {

                        return (
                          <div key={index}>
                            <h3 className="fs-3">{section.title}</h3>
                            {section.paragraph.map((para) => {
                              return <p className="text-dark mb-4">{para}</p>;
                            })}
                            {section.list.map((list) => {
                              return (
                                <>
                                  <h5>{list.title}</h5>
                                  {list.paragraph.map((para) => {
                                    return (
                                      <p className="text-dark mb-4">{para}</p>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </div>
                        );
                      })} */}

                {/* share */}
                <div className="mb-5">
                  <h5 className="d-inline-block me-3">Share:</h5>
                  {/* <!-- AddToAny BEGIN --> */}
                  <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a className="a2a_button_facebook"></a>
                    <a className="a2a_button_twitter"></a>
                    <a className="a2a_button_email"></a>
                  </div>
                  <Helmet>
                    <script async src="https://static.addtoany.com/menu/page.js"></script>
                  </Helmet>
                  {/* <!-- AddToAny END --> */}
                </div>
              </div>
              {/* sidebar */}
              <aside className="col-lg-4">
                {/* latest post */}
                <div className="bg-white px-4 py-5 box-shadow mb-5">
                  <h4 className="mb-4">Latest Article</h4>
                  {/* post-item */}
                  {blogDatas?.map((blog, index) => {
                    return (
                      <div key={index} className="media d-flex border-bottom border-color pb-3 mb-3">
                        <img className="me-3 mini-blog-image" src={blog?.img} alt="post-thumb" />
                        <div className="media-body">
                          <h5 className="mt-0">
                            <a href={'/blog/' + blog?.slug} className="text-dark">
                              {blog.title}
                            </a>
                          </h5>
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
    </>
  );
};

export default SingleBlog;
