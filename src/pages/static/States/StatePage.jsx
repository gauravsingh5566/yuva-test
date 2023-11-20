import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormatQuote } from '@mui/icons-material';
import StateGallery from './Components/StateGallery';
import SimpleAccordion from 'pages/events/states/SimpleAccordion';
import StateHeader from './Components/StateHeader';
import PMSpeaks from './Components/PMSpeaks';
import CMSpeaks from './Components/CMSpeaks';
import ModelG20 from './Components/ModelG20';
import Media from './Components/Media';
import EventsInGoa from './Components/EventsInGoa';
import PhotoGallery from './PhotoGallery';
import GoaOverview from './Components/GoaOverview';
import AboutYuva from './Components/AboutYuva';
import { goaContent } from 'pages/events/states/goaContent';

const SingleNews = ({ data }) => {
  return (
    <article className="card border-0 rounded-0 position-relative box-shadow zindex-1 h-100">
      <div className="card-type">News</div>
      <img
        className="card-img-top rounded-0"
        src={data.image}
        // alt={data.imageAlt}
      />
      <div className="card-body">
        <div className="card-meta text-uppercase mb-2">
          on <strong className="text-dark">{data.date}</strong>
        </div>
        <h4 className="card-title">
          <a href={'/news/' + data.slug} className="text-dark">
            {data.title}
          </a>
        </h4>
        <span className="section-title-border"></span>
        <p className="card-text">
          {data.subpara === '' ? data.section[0].paragraph[0].slice(0, 85) : data.subpara.slice(0, 80)}
          ...
          <a href={'/news/' + data.slug}> Read More</a>
        </p>
      </div>
    </article>
  );
};

const StatePage = () => {
  const data = goaContent;
  const navigate = useNavigate();
  return (
    <div>
      {/* Upper Section  */}
      <StateHeader />

      <PMSpeaks data={data.pmSpeak} />

      {/* Forth Section  */}
      {data?.cmSpeak ? <CMSpeaks data={data.cmSpeak} /> : null}

      {/* Third Section  */}
      {data?.summit ? <ModelG20 data={data.summit} /> : null}
      {/* 6th Section  */}
      {data?.media ? <Media data={data.media} /> : null}
      {/* Fifth Section  */}

      {data?.events ? <EventsInGoa data={data.events} /> : null}

      {/* 7th Section  */}

      {data?.gallery ? <PhotoGallery data={data.gallery} /> : null}
      {/* Second Section  */}
      {data?.overview ? <GoaOverview data={data.overview} /> : null}
      {/* 8th Section  */}

      {data?.about ? <AboutYuva data={data.about} /> : null}

      <div className="container py-5">
        <h3 className="fs-3 text-capitalize text-center">TENTATIVE CALENDER OF G20 MEETINGS</h3>
        <div className="container mt-3" style={{ maxWidth: '1000px' }}>
          <SimpleAccordion />
        </div>
      </div>
    </div>
  );
};

export default StatePage;
