import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const testimonialContent = [
  {
    id: 1,
    image: './images/testimonial/client-1.jpg',
    name: 'Anjali Chauhan',
    info: 'an undergraduate at John Hopkins University, USA',
    content: 'Meeting and discussing the issue of demonetization with fellow leaders was insightful',
  },
  {
    id: 2,
    image: './images/testimonial/client-2.jpg',
    name: 'Angel Gurría',
    info: 'Secretary General of the OECD',
    content: 'We cannot always build the future for our youth, but we can build our youth for the future, and this is why we have the G20 model',
  },
  {
    id: 3,
    image: './images/testimonial/client-3.jpg',
    name: 'Timothy Jones',
    info: 'Staff Speaker, Embassy of Germany',
    content: 'Model G20 values opinions on pressing matters and promises considerable reforms for the future.',
  },
  {
    id: 4,
    image: './images/testimonial/client-1.jpg',
    name: 'Sara Walker',
    info: 'Grad student at New York University, USA',
    content:
      'The summit allowed me to raise female empowerment at one point, and offered a cultural exchange from a senior diplomat at another. This was exceptional',
  },
  {
    id: 5,
    image: './images/testimonial/client-2.jpg',
    name: 'C.S Rajamouli',
    info: 'Youth Rep at CalTech, USA',
    content: 'I saw an English leader for a South African Delegation, this was excellent.',
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="text-center bg-dark shadow-lg bg-opacity-25 p-3 p-lg-4 py-5 rounded-4" style={{ maxWidth: '600px' }}>
      <p className="fst-italic mb-5 fs-4 text-white fw-semibold">
        <i className="bx bxs-quote-left me-2 fs-1"></i>
        {testimonial.content}
      </p>
      <div className="d-flex align-items-start justify-content-center text-start">
        <img src={testimonial.image} alt="" className="rounded-3" style={{ width: '80px' }} />
        <div className="px-3">
          <h4 className="text-white">{testimonial.name}</h4>
          <span className="text-white fs-6">{testimonial.info}</span>
        </div>
      </div>
    </div>
  );
};
const Testimonial = () => {
  return (
    <section id="scrollspyTestimonial" className="section bg-secondary" data-background="images/backgrounds/testimonial-bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <span className="section-title-border border-center"></span>
            <h2 className="section-title text-white" style={{ color: 'white' }}>
              What Clients Are Say?
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="testimonial-slider-2">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                  740: {
                    slidesPerView: 2,
                  },
                  1240: {
                    slidesPerView: 3,
                  },
                }}>
                {testimonialContent.map((testimonial, index) => {
                  return (
                    <SwiperSlide key={index} className="py-4">
                      <TestimonialCard testimonial={testimonial} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
