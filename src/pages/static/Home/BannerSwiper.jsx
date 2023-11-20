import React from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
const bannerContent = [
  {
    id: 1,
    smallHeading: 'वसुधैव कुटुम्बकम',
    mainHeading: 'Vasudhaiva Kutumbakam',
    subheading: '',
    image: 'https://glcloud.in/images/static/bnr1.webp',
    Description:
      "India's G20 Presidency will work to promote this universal sense of one-ness. Hence our theme - 'One Earth, One Family, One Future' – PM Narendra Modi",
    buttonData: {
      link: '/model-g20',
      text: 'More Details',
    },
  },
  {
    id: 2,
    smallHeading: 'Model G20',
    image: './images/banner/modal-g20.jpg',
    mainHeading: 'Youth takes the centre stage!',
    subheading: 'Discussions that spark thoughts.',
    Description:
      'Model G20 is a simulation created to mirror the actual G20 event and designed for young leaders who wish to expose themselves to international relations, diplomacy, critical thinking and public speaking.',
    buttonData: {
      link: '/youth-community',
      text: 'More Details',
    },
  },
  {
    id: 3,
    smallHeading: 'Become a G20 Genius!',
    image: './images/banner/bnr3.jpg',
    mainHeading: 'Get certified now and become G20 influencers in your campus.',
    subheading: '',
    Description:
      'The G20 Orientation Certificate is a one-of-a-kind learning module that approaches the history, function, operations, objectives and challenges of G20.',
    buttonData: {
      link: '/course/detail/g20-orientation-course',
      text: 'Register now!',
    },
  },
];

const SingleSlide = ({ data }) => {
  return (
    <div
      className={data.id == 4 ? 'hero-slider-item bg-cover hero-section h-100 bg-center' : 'hero-slider-item bg-cover hero-section h-100'}
      style={{ backgroundImage: `url(${data.image})` }}>
      <div className="d-flex align-items-center h-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h4 className="mb-0 letter-spacing text-white">{data.smallHeading}</h4>
              <h1 className="mb-4 text-white">{data.mainHeading}</h1>
              <h4 className="text-white fs-3">{data.subheading}</h4>
              <p className="mb-5 text-white fs-4">{data.Description}</p>
              <Link to={data.buttonData.link} className="btn btn-light-outline">
                {data.buttonData.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerSwiper = () => {
  return (
    <div className="p-relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: true,
        }}
        loop={true}>
        {bannerContent.map((banner, index) => {
          return (
            <SwiperSlide key={index}>
              <SingleSlide data={banner} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
