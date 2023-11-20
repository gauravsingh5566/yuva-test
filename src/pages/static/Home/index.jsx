import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BannerSwiper from './BannerSwiper';
import BlogsSwiper from './BlogsSwiper';
import FeatureItem from './components/FeatureItem';
import NewsSwiper from './NewsSwiper';
import Supporters from './components/Supporters';
import SocialMediaPosts from './components/SocialMediaPosts';
import GallerySlider from 'pages/Gallery/GallerySlider';
const FeatureData = [
  {
    title: 'India’s G20 Presidency',
    img: './images/icons/india2.png',
    description:
      'In 2023, India takes the centre stage on the G20 forum for economic discussions and financial outlook to help build a better world of peace and harmony.',
    link: '/g20-presidency',
    linktext: 'Find out more',
  },
  {
    title: 'India leads the way',
    img: './images/icons/india3.png',
    description:
      ' India’s innovations and initiatives will be on full display. From digital transformation, women led-development to the rise of Indian startups, we will show the world how it’s done.',
    link: '/achievements-of-india',
    linktext: 'Know more',
  },
  {
    title: 'LiFE Mission',
    img: './images/icons/Life.png',
    description:
      ' ‘Lifestyle for Environment’ initiative is a call to action for every citizen to choose sustainability and mindful utilisation of resources.',
    link: '/life',
    linktext: 'START YOUR LiFE',
  },
  {
    title: 'Youth in G20',
    img: './images/icons/youth2.png',
    description:
      ' Youth engagement is one of the crucial aspects to the success of G20. Unleash your creativity and be heard. Participate with suggestions and solutions for the Leaders.',
    link: '/life',
    linktext: 'Engage Now',
  },
];

const Home = () => {
  return (
    <>
      {/* <GotoTop /> */}
      <Helmet>
        <title>{'Yuvamanthan Model G20 India'}</title>
        <link rel="canonical" href={'https://www.yuvamanthan.org/'} />
      </Helmet>
      <BannerSwiper />
      <GallerySlider />
      {/* banner feature */}
      <section className="py-5" style={{ zIndex: 2, position: 'relative' }}>
        <div className="container">
          <div className="row features g-2">
            {FeatureData?.map((feature, index) => {
              {
                /* console.log(feature.link) */
              }
              return (
                <div div className="col-lg-3 col-sm-6 mb-4 mb-lg-0" key={feature}>
                  <FeatureItem feature={feature} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* /banner feature */}

      {/* PM speaks */}
      <div className="container-fluid p-0">
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col">
            {/* PM speaks image*/}
            <img
              className="d-block w-100"
              src="https://glcloud.in/images/static/img1.webp"
              alt="About"
              style={{
                minHeight: '350px',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="col">
            <div className="container h-100 bg-white-gray position-relative py-4">
              <div className="d-flex align-items-center h-100">
                <div className="p-2 p-lg-4">
                  <span className="section-title-border"></span>
                  <p className="subtitle"></p>
                  <h2 className="section-title">PM Speaks</h2>
                  <p className="mb-5 fs-5">
                    <i className="bx bxs-quote-left text-warning bx-tada"></i> Let us join together to make India’s G20 Presidency a presidency of
                    Healing, Harmony and Hope. Let us work together to shape the new paradigm of human-centric globalisation.{' '}
                    <i className="bx bxs-quote-right text-warning bx-tada"></i>
                  </p>
                </div>
              </div>
              <img className="img-fluid blog-shape-left" src="images/backgrounds/blog-bg-left.png" alt="" />
              <img className="img-fluid blog-shape-right" src="images/backgrounds/blog-bg-right.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* /PM speaks */}
      {/*Sherpa Speaks */}
      <div className="container-fluid p-0 ">
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col order-1 order-lg-2">
            {/* Sherpa image*/}
            <img
              className="d-block w-100"
              style={{ height: '500px', objectFit: 'cover' }}
              src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202012/Anniv-Amitabh-Kant-1_1200x768.jpeg?size=690:388"
              alt="About"
            />
          </div>
          <div className="col order-2 order-lg-1">
            <div className="container h-100 bg-gray-white position-relative py-4">
              <div className="d-flex h-100 align-items-center">
                <div className="p-2 p-lg-4">
                  <span className="section-title-border"></span>
                  <p className="subtitle"></p>
                  <h2 className="section-title ">Sherpa Speaks</h2>
                  <p className=" fs-5 ">
                    <i className="bx bxs-quote-left text-warning bx-tada"></i> As G-20 president, India’s Prime Minister Narendra Modi will be setting
                    the agenda of the world. This is a huge responsibility because we are taking over this at a very challenging time in the world.
                    <i className="bx bxs-quote-right text-warning bx-tada"></i>
                  </p>
                  <h6>India's G20 Sherpa - Mr. Amitabh Kant</h6>
                </div>
              </div>
              <img className="img-fluid blog-shape-left" src="images/backgrounds/blog-bg-left.png" alt="" />
              <img className="img-fluid blog-shape-right" src="images/backgrounds/blog-bg-right.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* /PM speaks */}
      {/* <EventsSwiper /> */}
      {/* Featured Topics  */}
      <section className="section pb-4">
        <div className="container">
          <div className="row align-items-center justify-content-around">
            <div className="col-lg-5 order-2">
              <span className="section-title-border"></span>
              <p className="mb-0">Themes</p>
              <h2 className="section-title mb-2 fs-1 ">Featured Topics</h2>
              <p className="mb-5 fs-5">Take a deep dive into topics everyone is talking about.</p>
              {/* feature item */}
              <ul className="list-unstyled">
                {/* feature item */}
                <li className="d-flex align-items-center mb-3">
                  <div className="text-center me-4">
                    <div className="icon-bg water-wave">
                      {/* <i className="bi bi-cloud icon text-primary"></i> */}
                      <img src="./images/icons/book.png" className="w-100 p-2" alt="nep2020" />
                    </div>
                  </div>
                  <a href="/nep" className="text-dark">
                    <h4>New Education Policy (NEP) 2020</h4>
                  </a>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <div className="text-center me-4">
                    <div className="icon-bg water-wave">
                      {/* <i className="bi bi-cloud icon text-primary"></i> */}
                      <img src="https://cdn-icons-png.flaticon.com/512/683/683527.png" className="w-100 p-3" alt="cdri" />
                    </div>
                  </div>
                  <a href="/startup-india" className="text-dark">
                    <h4>Start-up India</h4>
                  </a>
                </li>
                <li className="d-flex align-items-center mb-5">
                  <div className="text-center me-4">
                    <div className="icon-bg water-wave">
                      {/* <i className="bi bi-cloud icon text-primary"></i> */}
                      <img src="https://cdn-icons-png.flaticon.com/512/1814/1814562.png" className="w-100 p-3" alt="cdri" />
                    </div>
                  </div>
                  <a href="/digital-transform" className="text-dark">
                    <h4>Digital Transformation</h4>
                  </a>
                </li>
                {/* <li className=" mb-5">
                  <button className="btn btn-primary-outline">
                    View More Topics
                  </button>
                </li> */}
              </ul>
            </div>
            <div className="col-lg-7 pr-lg-0 order-lg-2 order-1 mb-5 mb-lg-0">
              <div className="feature-img-bg box-shadow">
                {/* <video src="https://youtu.be/7eWPI1tEz3I" controls className="w-100"></video>        */}
                <iframe
                  className="d-block w-100"
                  height="400"
                  src="https://www.youtube.com/embed/RdqNad4-i1g"
                  title="G20 University Connect - Engaging Young Minds (December 1, 2022)"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Topics  */}
      {/* <EventsSwiper2 /> */}
      <NewsSwiper />
      <BlogsSwiper />
      {/* <div className="bg-light">
        <SocialHandleComp />
      </div> */}
      <div className="container">
        <Supporters />
      </div>
      <SocialMediaPosts />
      <section className="section py-5">
        <div className="container py-4">
          <h3 className="section-title text-center mb-2 fs-2">Our Knowledge Partner</h3>
          <div className="row row-cols-1 row-cols-lg-2 align-items-center">
            <div className="col order-2 order-lg-1">
              <h3 className="fs-4 text-center">Institute for Competitiveness</h3>
              <span className="section-title-border mx-auto mt-0 mb-1"></span>
              <p className="mb-5 fs-6 text-center">
                Institute for Competitiveness, India is the Indian knot in the global network of the Institute for Strategy and Competitiveness at
                Harvard Business School. It is also an international initiative centered in India, dedicated to enlarging and purposeful disseminating
                of the body of research and knowledge on competition and strategy, as pioneered over the last 25 years by Professor Michael Porter of
                the Institute for Strategy and Competitiveness at Harvard Business School.
              </p>
            </div>
            <div className="col order-1 order-lg-2">
              <img src="./images/partners/IFCLogo.jpg" alt="Instititute of competitivenes" className="w-100" />
            </div>
          </div>
        </div>
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <img
                src="./images/knowledge-partner/kp1.png"
                alt="Bluekraft Digital Foundation"
                className="w-100"
                style={{ height: 180, objectFit: 'contain' }}
              />
            </div>
            <div className="col">
              <h4 className="text-center">BlueKraft Digital Foundation</h4>
              <span className="section-title-border mx-auto mt-0 mb-1"></span>
              <p className="mb-5 fs-6 text-center">
                The custodians for Mann Ki Baat, Modi@20, Exam Warriors, and Yoga with Modi are our digital media partners and would be covering the
                events through their digital platform, New India Junction.
              </p>
            </div>
          </div>
        </div>
        <div className="container py-4">
          <h3 className="section-title text-center mb-2 fs-2">Our Tech Partner</h3>
          <div className="row row-cols-1 row-cols-lg-2 align-items-center py-3">
            <div className="col order-2 order-lg-1">
              <h3 className="fs-4 text-center">Eksathi - QnA Forum Provider</h3>
              <span className="section-title-border mx-auto mt-0 mb-1"></span>
              <p className="mb-5 fs-6 text-center">
                Eksathi is a leading Q&A forum provider that offers a robust and user-friendly platform for individuals and organizations to engage in
                meaningful knowledge exchange. With its intuitive interface and advanced features, Eksathi enables users to ask questions, provide
                answers, and share insights on a wide range of topics. Whether seeking expert advice, troubleshooting technical issues, or simply
                exploring diverse perspectives, Eksathi fosters a vibrant community where users can connect, learn, and collaborate.
              </p>
            </div>
            <div className="col order-1 order-lg-2">
              <img
                src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/supporters/eksathi-forum.svg"
                alt="Instititute of competitivenes"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
