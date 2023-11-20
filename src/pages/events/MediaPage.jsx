import SimpleGallery from 'layout/Gallery';
import React from 'react';
import SocialHandleComp from './SocialHandleComp';
import { Helmet } from 'react-helmet';

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
//   const pccasArray = [
//     [
//       [
//         "https://glcloud.in/images/static/events/goa/goa3.webp",
//         "https://glcloud.in/images/static/events/goa/goa4.webp",
//         "https://glcloud.in/images/static/events/goa/goa5.webp",
//       ],
//       [
//         "https://glcloud.in/images/static/events/goa/gallery/gallery.webp",
//         "https://glcloud.in/images/static/events/goa/gallery/gallery4.webp",
//         "https://glcloud.in/images/static/events/goa/gallery/gallery5.webp",
//       ],
//       [
//         "https://glcloud.in/images/static/events/goa/gallery/gallery2.webp",
//         "https://glcloud.in/images/static/events/hansraj/img9.webp",
//         "https://glcloud.in/images/static/events/goa/gallery/gallery3.webp",
//       ]
//     ],
//   ]

const MediaPage = () => {
  return (
    <>
      <Helmet>
        <title>Media page for Yuvamanthan</title>
      </Helmet>
      <div className="eventsbg bg-warning">
        <SocialHandleComp />
        {/* <SimpleGallery imgArray={imgArray} heading={"Event Organised at Hansraj College"} className={"bg-white"} /> */}
        <SimpleGallery imgArray={imgArray} heading={'Event Memories'} className={'white'} />
      </div>
    </>
  );
};

export default MediaPage;
