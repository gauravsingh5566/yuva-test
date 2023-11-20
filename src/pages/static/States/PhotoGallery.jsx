import React from 'react';
import StateGallery from './Components/StateGallery';

const PhotoGallery = ({ data }) => {
  return (
    <React.Fragment>
      <div className="container py-4">
        <h3 className="fs-2 text-center">{data.title}</h3>
        <StateGallery />
        <p>{data.paragraph}</p>

        {/* <h4>(PCCAS, Goa)</h4> */}
        <div className="row row-cols-1 row-cols-lg-2 g-3 d-none">
          <div className="col">
            <img src="/images/events/goa/goa3.jpeg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/goa4.jpeg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/goa5.jpeg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/gallery/gallery.jpg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/gallery/gallery2.jpg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/gallery/gallery3.jpg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/gallery/gallery4.jpg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/gallery/gallery5.jpg" alt="" className="w-100" style={{ objectFit: 'contain', maxHeight: '450' }} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PhotoGallery;
