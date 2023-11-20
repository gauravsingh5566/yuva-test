import { FormatQuote } from '@mui/icons-material';
import React from 'react';

const PMSpeaks = ({ data }) => {
  return (
    <React.Fragment>
      <div className="container py-4">
        <span className="section-title-border border-center"></span>
        <h2 className="text-center">{data.title}</h2>
        <div className="row row-cols-1 row-cols-lg-2 align-items-center mb-3 g-3 mt-4">
          <div className="col col-lg-7 order-2 order-lg-1">
            <blockquote className="rounded rounded-3 shadow p-2 px-4 m-0">
              <p className="">
                <FormatQuote
                  sx={{
                    rotate: '180deg',
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />{' '}
                {data.quotes[0].quote}
                <FormatQuote
                  sx={{
                    fontSize: 18,
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />
              </p>
              <p className="">
                <FormatQuote
                  sx={{
                    rotate: '180deg',
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />
                {data.quotes[1].quote}
                <FormatQuote
                  sx={{
                    fontSize: 18,
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />
              </p>

              <span className="fs-6 text-dark d-block">{data.author}</span>
              <span className="fs-6 text-secondary d-block">{data.subauthor} </span>
            </blockquote>
          </div>
          <div className="col-12 col-lg-5 order-1 order-lg-2">
            <iframe
              height="330"
              className="d-block"
              style={{ width: '100%' }}
              src="https://www.youtube.com/embed/43GKcp900fY"
              title="PM Modi's remarks at closing ceremony of G20 Summit in Indonesia"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PMSpeaks;
