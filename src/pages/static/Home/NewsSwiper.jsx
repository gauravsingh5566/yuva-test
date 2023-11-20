import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { apiJson, apiJsonAuth } from "api";
import moment from "moment";
const SingleNews = ({ data }) => {
  return (
    <article className="card border-0 rounded-3 position-relative p-3 box-shadow zindex-1 h-100">
      <div className="card-type">News</div>
      <img
        className="card-img-top rounded-3"
        src={data.img}
        // alt={data.imageAlt}
      />
      <div className="card-body px-0">
        <div className="title-border-left">
          <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
            <span className="text-secondary d-flex align-items-center">by {data?.author}</span> <span className="text-secondary">{moment(data?.createdAt).calendar()}</span>
          </div>
          <h6 className="card-title">
            <a href={"/news/" + data?.slug} className="text-dark fs-6">
              {data?.title}
            </a>
          </h6>
        </div>
        {/* <p className="card-text">
                            {blog.content}...
                          </p> */}
        <div className="line-clamp-blog text-secondary">{data?.heading}</div>
        {/* {blog.content} */}
        <a href={"/news/" + data?.slug} className="btn btn-secondary btn-arrow">
          read more
        </a>
      </div>
    </article>
  );
};

const NewsSwiper = () => {
  let [newsData, setNewsData] = useState([]);
  const getAllNews = async () => {
    try {
      const res = await apiJsonAuth.get("public/news");
      if (res.status == 200) {
        setNewsData(res?.data?.result);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNews();
  }, []);

  return (
    <section className="section py-5 bg-gray-white position-relative">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-12 col-lg-8">
            <span className="section-title-border"></span>
            <p className="mb-0">What’s New</p>
            <h2 className="fs-1">Latest G20 News and Stories for You.</h2>
          </div>
          <div className="col-12 col-lg-4">
            <div className="text-start text-lg-end">
              <Link to="/news">
                <button className="btn btn-primary">View All News</button>
              </Link>
            </div>
          </div>
        </div>
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
          {newsData.map((news, index) => {
            return (
              <SwiperSlide key={index} className="py-4">
                <SingleNews data={news} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* background shapes */}
      <img className="img-fluid blog-shape-left" src="images/backgrounds/blog-bg-left.png" alt="" />
      <img className="img-fluid blog-shape-right" src="images/backgrounds/blog-bg-right.png" alt="" />
    </section>
  );
};

export default NewsSwiper;
