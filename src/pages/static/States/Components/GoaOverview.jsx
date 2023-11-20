import React from 'react';

const GoaOverview = ({ data }) => {
  return (
    <React.Fragment>
      <div className="container py-4">
        <h3>{data.title}</h3>
        <p>{data.paragraph}</p>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <img src="/images/events/goa/goaculture1.jpg" alt="" style={{ width: '100%', height: 450, objectFit: 'cover' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/goaculture2.jpg" alt="" style={{ width: '100%', height: 450, objectFit: 'cover' }} />
          </div>
        </div>

        <h3 className="fs-3">{data.subheading}</h3>
        <p>
          {' '}
          The fact that Goa is the smallest state does not negate its relevance in being the most diversified mainland district in providing views of
          the wonderful architecture of various faiths, cuisines from multiple ethnicities and of course, more than fifty beaches to enamour any
          wonder-seeking individual. Some of the places to explore in the Goan territory are:
        </p>
        <h5> {data.ulpoints[0].title}</h5>
        <p> {data.ulpoints[0].para}</p>
        <h5>{data.ulpoints[1].title}</h5>
        <p>{data.ulpoints[1].para}</p>
        <h5>{data.ulpoints[2].title}</h5>
        <p> {data.ulpoints[2].para}</p>
      </div>
    </React.Fragment>
  );
};

export default GoaOverview;
