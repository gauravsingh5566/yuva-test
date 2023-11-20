import React from 'react';
import 'swiper/css/navigation';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormatQuote } from '@mui/icons-material';
import GotoTop from 'layout/GotoTop';

const Uttarakhand = () => {
  const navigate = useNavigate();
  return (
    <>
      <GotoTop />
      <div>
        {/* Upper Section  */}
        <div className="row row-cols-1 row-cols-lg-2 g-0 bg-light">
          <div className="col">
            <img src="/images/events/uttarakhand/imgtop.jpg" alt="" className="d-block w-100" style={{ maxHeight: 350, objectFit: 'cover' }} />
          </div>
          <div className="col">
            <div className="container h-100 py-4">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <h1 className="text-dark text-lg-start">
                    <span>About YMG20</span> <span className="text-primary"> Uttarakhand</span>
                  </h1>{' '}
                  <Button
                    variant="outlined"
                    sx={{ p: 2 }}
                    color="warning"
                    className="text-initial fs-6 rounded-4"
                    onClick={() => navigate('/uttaranchal/registration')}>
                    Register as an Institute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Forth Section  */}
        <div className="py-0 bg-dark p-0">
          <div className="row row-cols-1 row-cols-lg-2 g-0">
            <div className="col">
              <div className="container h-100 p-3 p-lg-4 py-5">
                <div className="d-flex h-100 align-items-center">
                  <div>
                    <span className="section-title-border "></span>
                    <h3 className="fs-1 text-white">
                      <span className="text-primary">Uttarakhand</span> CM’s Message
                    </h3>
                    <p className="fs-5 text-white">
                      <FormatQuote
                        sx={{
                          rotate: '180deg',
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />{' '}
                      G20 meetings scheduled to take place in the last week of May and June in Uttarakhand will give the state a new identity on the
                      global stage. These meetings are an excellent opportunity to get recognition for local products of Uttarakhand at the national
                      and international level.
                      <FormatQuote
                        sx={{
                          fontSize: 18,
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                    </p>
                    <p className="fs-5 text-white">
                      <FormatQuote
                        sx={{
                          rotate: '180deg',
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                      Representatives of G-20 countries will participate in the Ganga Aarti in Rishikesh and through it will also get to know the
                      religious and cultural importance of Ganga.
                      <FormatQuote
                        sx={{
                          fontSize: 18,
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                    </p>
                    <span className="fs-6 text-dark d-block text-white">-Shri Pushkar Singh Dhami</span>
                    <span className="fs-6 text-secondary d-block  text-white">(Chief Minister, Uttarakhand)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <img
                src="/images/events/uttarakhand/pushkar-singh-dhami.webp"
                alt=""
                className="d-block h-100 w-100"
                style={{ maxHeight: 650, objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        {/* Third Section  */}
        <div className="container py-4">
          <h3 className="text-center">
            <span className="text-primary">Uttarakhand </span>: An Overview
          </h3>
          <p>
            In the north-western part of the country, lies the ‘Land of Gods’ or better known as the state Uttarakhand. It is known to be a place of
            incredible religious piety as it houses various pilgrimage centres like Badrinath, Kedarnath, Rishikesh, Haridwar, etc. It is also seen as
            a top winter tourism destination for travellers for its scenic hill stations like Lansdowne, Mussoorie, Dharamshala, etc. for its ethereal
            snowy landscapes.
          </p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <img src="/images/events/uttarakhand/img1.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col">
              <img src="/images/events/uttarakhand/img2.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col">
              <img src="/images/events/uttarakhand/img3.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <p className="mt-4">
            Uttarakhand ever since its inception in 2000, has established itself amongst the Indian states that thrive on tourism, culture and
            diversity. From local crafts of wood carving and Pahari painting to diverse ethnicities of Garhwali, Kumaoni, and Hindi the region has a
            lot to offer to travellers and explorers.
          </p>
          <p>
            Almost three-fifths of the state population engages in agricultural activities like terrace farming, animal husbandry, and dairy farming
            while a significant chunk of the economic earnings comes from tourism and cultural recreation.
          </p>
        </div>
        <div className="container py-4">
          <h3 className="fs-2 text-center">Things to Explore</h3>
          <p>
            One of the fastest-growing states of India, Uttarakhand has shown tremendous growth in the latter half of the 21st century. Thanks to its
            lush green valleys, waterfalls, snow-capped peaks, wildlife sanctuaries and parks, and pilgrimage sites, the state attracts a lot of
            national and international visitors. Some of the things one can explore in this Himalayan territory are
          </p>
          <h4 className="text-bolder mt-5 mb-3">Music and Dance</h4>
          <p>
            When it comes to music and dance, every state has its unique touch of humanistic impressions and tradition attached to it. In Uttarakhand,
            <span className="fst-italic"> Barada Nati, Hurka Baul, Jhumaila, Chauphula, and Langvir Nritya </span>are some bespoke forms of dance that
            leave the viewers lost in a myriad of emotions. The music here carries allusions to great epics like Ramayana or Mahabharata that
            highlight the events from the myths of gods and heroes from the classic age. Here, popular folk songs include
            <span className="fst-italic"> Mangal, Basanti, Khuder and Chhopati</span> .
          </p>

          <h4 className="text-bolder mt-5 mb-3">Hill Stations and National Parks</h4>
          <p>
            Being a Himalayan state, Uttarakhand’s geography majorly consists of a remarkable range of hills and mountains like the Nanda Devi (25,646
            feet) which is the second-highest peak in India. Due to this reason, tourists love to travel here for trekking, climbing, skiing, rock
            climbing, and paragliding sports in places like Rishikesh, Auli, Lansdowne, Ranikhet, and Kausani. Apart from this, there are 12 National
            Parks and Wildlife Sanctuaries in the state such as the Valley of Flowers, Gangotri, and Rajaji National Parks along with the famous Jim
            Corbett National Park in Nainital.
          </p>
          <h4 className="text-bolder mt-5 mb-3">Pilgrimage Centres</h4>
          <p>
            Some of the ancient and holiest shrines and centres are found in the mountains of Uttarakhand and it attracts more than 2 million pilgrims
            each year. The Yamonotri temple, the shrine of Gangotri, the temples of Haridwar, Badrinath, Kedarnath, a Sikh shrine site, Hemkund Sahib
            are great vistas of experiencing serenity, peace and hope for tourists.
          </p>
        </div>
      </div>
    </>
  );
};

export default Uttarakhand;
