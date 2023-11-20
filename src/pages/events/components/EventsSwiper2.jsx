import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const EventData = [
  {
    state: 'Goa',
  },
  {
    state: 'Haryana',
  },
  {
    state: 'Uttarakhand',
  },
];

const SlideComponent = () => {
  return (
    <div className="card w-100 border-0 p-3 rounded-3">
      <img src="/images/events/haryana/img3.jpg" className="card-img-top rounded-3" alt="..." />
      <div className="card-body p-0">
        <span className="event-span d-inline-block text-white bg-danger p-2 rounded-3 px-4" style={{ transform: 'translate(20px,-21px)' }}>
          Haryana
        </span>
        <h4 className="fs-4 mt-0">
          YMG20 <span className="text-primary">Haryana</span>
        </h4>
        <p className="card-text fs-6">It is a matter of pride for Haryana as some meetings of the G20 are proposed to be held in Gurugram.</p>
        <Link to="/haryana">
          <Button variant="outlined" color="warning" size="large" className="rounded text-capitalize">
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
};

const EventsSwiper2 = () => {
  return (
    <div className="py-5 bg-success eventsbg mt-5">
      <div className="container text-white">
        <div>
          <span className="fs-5">Colleges Participated</span>
          <h3 className="text-white">
            Our Featured <span className="text-warning">Colleges</span>
          </h3>
          <img
            src="https://demo.xpeedstudio.com/evenex/multi-event/wp-content/uploads/sites/13/2021/02/header-line.png"
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            width="92"
            height="12"></img>
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

export default EventsSwiper2;
