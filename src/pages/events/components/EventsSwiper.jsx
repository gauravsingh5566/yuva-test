import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const EventData = [
  {
    state: 'Goa',
    image: '/images/events/goa/goaculture2.jpg',
    text: 'As the excitement for G20 gains momentum, every state and union territory across India is leaving no stone unturned to set the stage for the biggest confluence of global leaders this year at the G20 summit.',
    link: '/goa',
  },
  {
    state: 'Haryana',
    image: '/images/events/haryana/img3.jpg',
    text: 'It is a matter of pride for Haryana as some meetings of the G20 are proposed to be held in Gurugram.',
    link: '/haryana',
  },
  {
    state: 'Uttarakhand',
    image: '/images/events/uttarakhand/img2.jpg',
    text: 'G20 meetings scheduled to take place in the last week of May and June in Uttarakhand will give the state a new identity on the global stage. ',
    link: '/uttarakhand',
  },
];

const SlideComponent = ({ event }) => {
  return (
    <div className="card w-100 border-0 p-3 rounded-3 h-100">
      <img src={event?.image} className="card-img-top rounded-3" alt="..." />
      <div className="card-body p-0">
        <span className="event-span d-inline-block text-white bg-danger p-2 rounded-3 px-4" style={{ transform: 'translate(20px,-21px)' }}>
          {event?.state}
        </span>
        <h4 className="fs-4 mt-0">
          YMG20 <span className="text-primary">{event?.state}</span>
        </h4>
        <p className="card-text fs-6">{event?.text}</p>
        <a href={event?.link}>
          <Button variant="outlined" color="warning" size="large" className="rounded text-capitalize">
            View More
          </Button>
        </a>
      </div>
    </div>
  );
};

const EventsSwiper = () => {
  return (
    <div className="py-5 bg-success eventsbg">
      <div className="container text-white">
        <div>
          <span className="fs-5">Participating States</span>
          <h3 className="text-white">
            Featured <span className="text-warning">States</span>
          </h3>
          <img src="/images/header-line.png" className="attachment-large size-large" alt="" loading="lazy" width="92" height="12"></img>
        </div>
        <div className="py-4">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper">
            {EventData.map((event, i) => {
              return (
                <SwiperSlide key={i}>
                  <SlideComponent event={event} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default EventsSwiper;
