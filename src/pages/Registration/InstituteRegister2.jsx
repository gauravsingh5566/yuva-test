// require('dotenv').config();
import React, { useEffect, useRef, useState } from 'react';
import { FormatQuoteTwoTone } from '@mui/icons-material';
import GotoTop from 'layout/GotoTop';
import TestimonialGrid from './components/TestimonialGrid';
import Gallery from 'layout/Gallery';
import { Button } from '@mui/material';
import InstituteRegisterForm from './components/InstituteRegisterForm';

const imgArray = [
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img1.webp',
      'https://glcloud.in/images/static/events/hansraj/img16.webp',
      'https://glcloud.in/images/static/events/hansraj/img3.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img4.webp',
      'https://glcloud.in/images/static/events/hansraj/img5.webp',
      'https://glcloud.in/images/static/events/hansraj/img16.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img7.webp',
      'https://glcloud.in/images/static/events/hansraj/img9.webp',
      'https://glcloud.in/images/static/events/hansraj/img18.webp',
      'https://glcloud.in/images/static/events/hansraj/img6.webp',
    ],
  ],
  [
    ['https://glcloud.in/images/static/events/hansraj/img10.webp', 'https://glcloud.in/images/static/events/hansraj/img12.webp'],
    ['https://glcloud.in/images/static/events/hansraj/img14.webp', 'https://glcloud.in/images/static/events/hansraj/img13.webp'],
    ['https://glcloud.in/images/static/events/hansraj/img17.webp', 'https://glcloud.in/images/static/events/hansraj/img19.webp'],
  ],
  [
    ['https://glcloud.in/images/static/events/hansraj/img20.webp', 'https://glcloud.in/images/static/events/hansraj/img21.webp'],
    ['https://glcloud.in/images/static/events/hansraj/img22.webp', 'https://glcloud.in/images/static/events/hansraj/img23.webp'],
    [
      'https://glcloud.in/images/static/events/hansraj/img24.webp',
      'https://glcloud.in/images/static/events/hansraj/img25.webp',
      'https://glcloud.in/images/static/events/hansraj/img26.webp',
    ],
  ],
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img27.webp',
      'https://glcloud.in/images/static/events/hansraj/img28.webp',
      'https://glcloud.in/images/static/events/hansraj/img30.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img31.webp',
      'https://glcloud.in/images/static/events/hansraj/img32.webp',
      'https://glcloud.in/images/static/events/hansraj/img33.webp',
    ],
    ['https://glcloud.in/images/static/events/hansraj/img34.webp', 'https://glcloud.in/images/static/events/hansraj/img36.webp'],
  ],
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img37.webp',
      'https://glcloud.in/images/static/events/hansraj/img38.webp',
      'https://glcloud.in/images/static/events/hansraj/img39.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img40.webp',
      'https://glcloud.in/images/static/events/hansraj/img41.webp',
      'https://glcloud.in/images/static/events/hansraj/img42.webp',
    ],
    ['https://glcloud.in/images/static/events/hansraj/img43.webp', 'https://glcloud.in/images/static/events/hansraj/img44.webp'],
  ],
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img37.webp',
      'https://glcloud.in/images/static/events/hansraj/img38.webp',
      'https://glcloud.in/images/static/events/hansraj/img39.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img40.webp',
      'https://glcloud.in/images/static/events/hansraj/img41.webp',
      'https://glcloud.in/images/static/events/hansraj/img42.webp',
    ],
    ['https://glcloud.in/images/static/events/hansraj/img43.webp', 'https://glcloud.in/images/static/events/hansraj/img44.webp'],
  ],
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img45.webp',
      'https://glcloud.in/images/static/events/hansraj/img46.webp',
      'https://glcloud.in/images/static/events/hansraj/img47.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img48.webp',
      'https://glcloud.in/images/static/events/hansraj/img49.webp',
      'https://glcloud.in/images/static/events/hansraj/img51.webp',
    ],
    ['https://glcloud.in/images/static/events/hansraj/img53.webp', 'https://glcloud.in/images/static/events/hansraj/img55.webp'],
  ],
  [
    [
      'https://glcloud.in/images/static/events/hansraj/img57.webp',
      'https://glcloud.in/images/static/events/hansraj/img58.webp',
      'https://glcloud.in/images/static/events/hansraj/img59.webp',
    ],
    [
      'https://glcloud.in/images/static/events/hansraj/img60.webp',
      'https://glcloud.in/images/static/events/hansraj/img61.webp',
      'https://glcloud.in/images/static/events/hansraj/img62.webp',
    ],
    ['https://glcloud.in/images/static/events/hansraj/img63.webp', 'https://glcloud.in/images/static/events/hansraj/img64.webp'],
  ],

  //pccas
  [
    [
      'https://glcloud.in/images/static/events/goa/goa3.webp',
      'https://glcloud.in/images/static/events/goa/goa4.webp',
      'https://glcloud.in/images/static/events/goa/goa5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery4.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery2.webp',
      'https://glcloud.in/images/static/events/hansraj/img9.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery3.webp',
    ],
  ],
];
const pccasArray = [
  [
    [
      'https://glcloud.in/images/static/events/goa/goa3.webp',
      'https://glcloud.in/images/static/events/goa/goa4.webp',
      'https://glcloud.in/images/static/events/goa/goa5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery4.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery2.webp',
      'https://glcloud.in/images/static/events/hansraj/img9.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery3.webp',
    ],
  ],
];
const InstituteRegister2 = () => {
  return (
    <>
      <GotoTop />
      <InstituteRegisterForm />
      <TestimonialGrid />
      <Gallery imgArray={imgArray} className={'bg-light-white2-grad'} />
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <div className="d-flex h-100 align-items-center">
            <div className="container">
              <h3 className="fs-3">
                <span className="text-primary">PM MODI's</span> Affirmations
              </h3>
              <p>
                PM Modi affirmed that India would give voice to other developing countries during its Presidency, and emphasized G-20’s role in
                assisting vulnerable countries; supporting inclusive development, strengthening economic security and global supply chains; developing
                improved and innovative financing models for multilateral financial institutions; providing solutions to challenges like climate
                change, pandemics, economic fragility, reducing poverty and achieving SDGs; and leveraging public and private financing to close the
                infrastructure gap.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <img src="https://cdn.narendramodi.in/cmsuploads/0.33721900_1672301801_1.jpg" alt="narendramodi" className="w-100 d-block" />
        </div>
      </div>
    </>
  );
};

export default InstituteRegister2;
