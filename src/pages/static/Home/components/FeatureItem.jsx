import React from 'react';
import { Link } from 'react-router-dom';

const FeatureItem = ({ feature, index }) => {
  return (
    <div className={`bg-white py-5 border p-3 text-center rounded-4 border box-shadow transition hover-bg-dark ${index === 0 ? 'active' : ''} h-100`}>
      <div className="d-flex flex-column justify-content-between h-100 align-items-center">
        <div>
          <div className="icon-bg mb-4 water-wave">
            {/* <i className="bi bi-sun-fill icon text-primary"></i> */}
            <img src={feature.img} alt="feature" className="w-100 p-3" />
          </div>
          <h4 className="mb-2">{feature?.title}</h4>
          <p className="fs-6">{feature?.description}</p>
        </div>
        <Link to={feature?.link} className={`btn ${index === 0 ? 'btn-light-outline' : 'btn-primary-outline'}`}>
          {feature?.linktext}
        </Link>
      </div>
    </div>
  );
};

export default FeatureItem;
