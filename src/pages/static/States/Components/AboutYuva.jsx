import React from 'react';

const AboutYuva = ({ data }) => {
  return (
    <React.Fragment>
      <div className="container py-4">
        <h3 className="fs-4">{data.title}</h3>
        <p>{data.paragraph[0].para}</p>
        <h3 className="fs-4">{data.subheading}</h3>
        <p>{data.paragraph[1].para}</p>
      </div>
    </React.Fragment>
  );
};

export default AboutYuva;
