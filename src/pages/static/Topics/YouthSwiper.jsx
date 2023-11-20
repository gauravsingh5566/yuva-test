import React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination } from 'swiper';
import { getYouthGallery } from 'api';
import { useEffect } from 'react';

const SlideComp = ({ contentItem }) => {
  return (
    <>
      <div className="p-0 p-relative ">
        <img src={`${contentItem.img}`} alt="" style={{ height: '450px', objectFit: 'cover' }} className="w-100 rounded-4" />
        <div
          className="p-3 w-100"
          style={{
            boxShadow: '0px 0px 30px rgb(0,0,0,0.5)',
            borderRadius: '0px 30px 30px 30px',
            transform: 'translate(32px, -38px)',
            backgroundColor: '#FAD961',
            backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
          }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7671/7671367.png"
            alt=""
            style={{
              height: '55px',
              marginBottom: '-30px',
              transform: 'translate(-32px, -38px)',
            }}
          />
          <p className="fst-normal shadow-none fs-5">{contentItem.content}</p>
          <h6 className="fs-5">{contentItem.name}</h6>
          <p className="text-secondary fnt-small">{contentItem.subinfo}</p>
        </div>
      </div>
    </>
  );
};

const YouthSwiper = () => {
  const [youthItem, setYouthItem] = useState([]);
  const fetchYouths = async () => {
    try {
      const res = await getYouthGallery();
      setYouthItem(res.data.resources);
    } catch (error) {}
  };
  useEffect(() => {
    fetchYouths();
  }, []);
  return (
    <div>
      {' '}
      <>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          spaceBetween={50}
          centeredSlides={false}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            740: {
              slidesPerView: 2,
            },
            1240: {
              slidesPerView: 3,
            },
          }}
          //   style={{height:'550px'}}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper w-100">
          {youthItem.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <SlideComp contentItem={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </div>
  );
};

export default YouthSwiper;
