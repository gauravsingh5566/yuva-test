import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper';
import './events.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper';

const EventsScroll = () => {
  return (
    <React.Fragment>
      <div className="conatiner-fluid text-center p-5" style={{ backgroundColor: '#DCDBFE' }}>
        <h4>Always wanted your health insurance needs to be taken care of?</h4>
        <p>Explore The New Age IMT Care Platform</p>
        <Swiper
          direction={'vertical'}
          slidesPerView={'auto'}
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
          modules={[FreeMode, Scrollbar, Mousewheel, Pagination]}
          pagination={{
            clickable: true,
          }}
          // modules={[Pagination]}
          className="mySwiperEvents">
          <SwiperSlide>
            <div
              className="container-sm pb-4 "
              style={{
                backgroundColor: '#6051CC',
                height: '500px ',
                borderRadius: '20px',
                // width: "1000px"
              }}>
              <div className="row align-items-center h-100">
                <div
                  className="col text-danger"
                  //  style={{ color:"white" }}
                >
                  <h4>Add or delete members in a jiffy</h4>
                  <p>Easy to use. Quick to operate. Get everything done in a click</p>
                </div>
                <div className="col">
                  <img src="./assets/Events.svg" alt="" className="h-100 d-block w-100" style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="container-sm"
              style={{
                backgroundColor: '#6051CC',
                //  height: "500px",
                borderRadius: '20px',
                // width: "1000px"
              }}>
              <div className="row align-items-center ">
                <div
                  className="col text-white"
                  //  style={{ color:"white" }}
                >
                  <h4>24 x 7 assistance on claims with speed and accuracy</h4>
                  <p>Get individual attention from specialised agents</p>
                </div>
                <div className="col ">
                  <img
                    src="./assets/Event2.svg"
                    alt=""
                    srcset=""
                    // style={{height:"90% !important"}}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="container-sm"
              style={{
                backgroundColor: '#6051CC',
                //  height: "500px",
                borderRadius: '20px',
                // width: "1000px"
              }}>
              <div className="row align-items-center ">
                <div
                  className="col text-white"
                  //  style={{ color:"white" }}
                >
                  <h4>Doctor consultations and discounted medical tests</h4>
                  <p>Give your employees all encompassing healthcare benefits</p>
                </div>
                <div className="col">
                  <img src="./assets/events3.svg" alt="" srcset="" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="container-sm"
              style={{
                backgroundColor: '#6051CC',
                //  height: "500px",
                borderRadius: '20px',
                // width: "1000px"
              }}>
              <div className="row align-items-center ">
                <div
                  className="col text-white"
                  //  style={{ color:"white" }}
                >
                  <h4>Doctor consultations and discounted medical tests</h4>
                  <p>Give your employees all encompassing healthcare benefits</p>
                </div>
                <div className="col">
                  <img src="./assets/event4.svg" alt="" srcset="" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default EventsScroll;
