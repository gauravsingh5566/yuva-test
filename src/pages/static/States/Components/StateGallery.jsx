import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
const galleryArray = [
  '/images/events/goa/goa3.jpeg',
  '/images/events/goa/goa4.jpeg',
  '/images/events/goa/goa5.jpeg',
  '/images/events/goa/gallery/gallery.jpg',
  '/images/events/goa/gallery/gallery4.jpg',
  '/images/events/goa/gallery/gallery5.jpg',
  '/images/events/goa/gallery/gallery2.jpg',
  '/images/events/goa/gallery/gallery3.jpg',
];
const StateGallery = () => {
  const showSlide = () => {};
  const [toggler, setToggler] = React.useState(false);
  const [img, setImage] = React.useState(2);
  return (
    <div>
      <div className="row row-cols-1 row-cols-lg-2 row-cols-lg-3 g-2">
        {galleryArray.map((img, index) => {
          return (
            <div className="col ">
              <img
                src={img}
                alt="gallery"
                loading="lazy"
                className="w-100"
                onClick={() => {
                  setToggler(!toggler);
                  setImage(index + 1);
                }}
                style={{
                  //   objectFit: "cover",
                  height: '450px !important',
                  cursor: 'nesw-resize',
                }}
              />
            </div>
          );
        })}
      </div>
      <FsLightbox toggler={toggler} slide={img} sources={galleryArray} />
    </div>
  );
};

export default StateGallery;
