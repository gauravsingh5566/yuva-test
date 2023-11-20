import * as React from 'react';

export default function AlbumSliderCard({ album }) {
  return (
    <>
      <div className="card border rounded-3 h-100 p-relative album-card">
        <img className="card-img-top rounded-0" src={album?.gallery_thumbnail} alt={album?.institution_name} style={{ height: 350 }} />
        <div className="card-body p-2 p-absolute h-100 w-100 bg-white bg-opacity-75" style={{ top: 0, left: 0 }}>
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h4 className="fs-3">
              {album?.institution_name} <br />
              {album?.state && album?.state} {album?.district && album?.district}
            </h4>
            <h6 className="card-title">{album?.theme}</h6>
            <button className="btn btn-outline-dark">View Gallery</button>
          </div>
        </div>
        <div>
          <span className="text-white bg-primary p-2 fs-2">#YMG20</span>
        </div>
      </div>
    </>
  );
}
