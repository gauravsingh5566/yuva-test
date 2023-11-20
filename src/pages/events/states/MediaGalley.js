import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
const galleryArray = [
  '/images/events/goa/goa3.jpeg',
  '/images/events/goa/goa4.jpeg',
  '/images/events/goa/goa5.jpeg',
  '/images/events/goa/gallery/gallery.jpg',
  '/images/events/goa/gallery/gallery4.jpg',
  '/images/events/goa/gallery/gallery5.jpg',
  '/images/events/goa/gallery/gallery2.jpg',
  '/images/events/goa/gallery/gallery3.jpg',
];

const SingleNews = ({ data }) => {
  return (
    <article className="card border-0 rounded-0 position-relative box-shadow zindex-1 h-100">
      <div className="card-type">Media</div>
      <img
        className="card-img-top rounded-0"
        src={data}
        // alt={data.imageAlt}
      />
      <div className="card-body">
        <div className="title-border-left">
          <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
            <span className="text-secondary d-flex align-items-center">by Yuvamanthan</span> <span className="text-secondary"></span>
          </div>
          <h6 className="card-title">
            <a href={'/news/' + data?.slug} className="text-dark fs-6">
              India's G20 Presidency
            </a>
          </h6>
        </div>
        {/* <p className="card-text">
                              {blog.content}...
                            </p> */}
        <div className="line-clamp-blog text-secondary">
          Prime Minister Narendra Modi, in his address to G20 foreign ministers, said multilateralism is in crisis and stated that the theme of ‘One
          Earth, One Family, One Future’ signals the need for unity of purpose and unity of action.
        </div>
        {/* {blog.content} */}
        <a href={'/news/' + data?.slug} className="btn btn-secondary btn-arrow">
          read more
        </a>
      </div>
    </article>
  );
};

const MediaGallery = () => {
  return (
    <section className="section bg-gray-white position-relative">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <span className="section-title-border"></span>
            {/* <p className="subtitle">What’s New</p>
              <h2 className="section-title">Latest G20 News and Stories for You.</h2> */}
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
          {galleryArray.map((news, index) => {
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
export default MediaGallery;
