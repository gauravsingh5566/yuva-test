import React from 'react';

function Supporters() {
  return (
    <div className="supporters py-5">
      <h3 className="text-center my-4 fs-2">Our Supporters</h3>
      <div className="justify-content-around m-auto g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row">
        <a target="_blank" href="https://www.indiaculture.gov.in/" className="col  text-center">
          <img
            src="https://glcloud.in/images/supporters/MOC.webp"
            style={{ maxWidth: '300px', height: 150 }}
            className="w-100 img-contain border shadow-sm p-3 rounded-4"
          />
        </a>
        <a target="_blank" href="https://www.education.gov.in/" className="col text-center">
          <img
            src="https://glcloud.in/images/supporters/MOE.webp"
            style={{ maxWidth: '300px', height: 150 }}
            className="w-100 img-contain border shadow-sm p-3 rounded-4"
          />
        </a>
        <a target="_blank" href="https://www.ayush.gov.in/" className="col text-center">
          <img
            src="https://glcloud.in/images/supporters/MOA.webp"
            style={{ maxWidth: '300px', height: 150 }}
            className="w-100 img-contain border shadow-sm p-3 rounded-4"
          />
        </a>
        <a target="_blank" href="https://tribal.nic.in/" className="col text-center">
          <img
            src="https://glcloud.in/images/supporters/MOTF.webp"
            style={{ maxWidth: '300px', height: 150 }}
            className="w-100 img-contain border shadow-sm p-3 rounded-4"
          />
        </a>
        <a target="_blank" href="https://moef.gov.in/hi/" className="col text-center">
          <img
            src="https://glcloud.in/images/supporters/MOEFCC.webp"
            style={{ maxWidth: '300px', height: 150 }}
            className="w-100 img-contain border shadow-sm p-3 rounded-4"
          />
        </a>
      </div>
    </div>
  );
}

export default Supporters;
