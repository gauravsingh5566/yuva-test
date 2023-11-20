import { FormatQuote } from '@mui/icons-material';
import React from 'react';

const ModelG20 = ({ data }) => {
  return (
    <div className="container py-4">
      <h3 className="text-center">{data.title}</h3>
      <h4 className="fs-3 text-center">{data.subheading}</h4>
      <p>{data.paragraph[0].para}</p>
      <div className="row row-cols-1 row-cols-lg-2 mb-2">
        <div className="col">
          <img src="https://glcloud.in/images/static/events/goa1.webp" alt="" className="w-100" style={{ height: 450, objectFit: 'cover' }} />
        </div>
        <div className="col">
          <img
            src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/events/goa/goa2.jpeg"
            alt=""
            className="w-100"
            style={{ height: 450, objectFit: 'cover' }}
          />
        </div>
      </div>
      <p className="mt-4">{data.paragraph[1].para}</p>
      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <blockquote>
            <p>
              <FormatQuote
                sx={{
                  rotate: '180deg',
                  translate: '0px -10px',
                  color: 'var(--main-color)',
                }}
              />{' '}
              {data.quotes}{' '}
              <FormatQuote
                sx={{
                  translate: '0px -10px',
                  color: 'var(--main-color)',
                }}
              />
            </p>
            <span className="fs-6 text-dark d-block">{data.author}</span>
            <span className="fs-6 text-secondary d-block">{data.subauthor} </span>
            <span className="fs-6 text-secondary d-block">( Government of India ) </span>
          </blockquote>
        </div>
        <div className="col-12 col-lg-5">
          <iframe
            style={{ width: '100%', height: 330 }}
            className="d-block cmVid"
            src="https://www.youtube.com/embed/Wl2tW2VYKqM"
            title="Shripad Naik Ji"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default ModelG20;
