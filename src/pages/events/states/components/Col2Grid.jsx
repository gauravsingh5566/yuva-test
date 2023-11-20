import { FormatQuote } from '@mui/icons-material';
import React from 'react';

const Col2Grid = ({ highlight, title, quote, name, position, link, direction }) => {
  return (
    <div className="container-fluid p-0">
      <div className="row row-cols-1 row-cols-lg-2 g-0">
        <div className={`col order-2 order-lg-1 bg-light`}>
          <div className="container p-3 p-lg-4 p-xl-5">
            <h2 className="text-start fs-1">
              <span className="text-primary">{highlight}</span> {title}
            </h2>
            <div className="card p-3 p-lg-4 rounded-4 shadow bg-white border-light mt-3">
              <p className="fs-6">
                <FormatQuote
                  sx={{
                    rotate: '180deg',
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />{' '}
                <span dangerouslySetInnerHTML={{ __html: quote }}></span>
                <FormatQuote
                  sx={{
                    fontSize: 18,
                    translate: '0px -10px',
                    color: 'var(--main-color)',
                  }}
                />
              </p>
              <span className="fs-6 text-dark d-block">-{name}</span>
              <span className="fs-6 text-secondary d-block">( {position} )</span>
            </div>
          </div>
        </div>
        <div className={`col ${direction == 'left' ? 'order-1 order-lg-2' : ''}`}>
          <iframe
            height={'100%'}
            className="d-block"
            style={{ width: '100%', height: '100% !important', minHeight: 400 }}
            src={link}
            title={highlight + ' ' + title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default Col2Grid;
