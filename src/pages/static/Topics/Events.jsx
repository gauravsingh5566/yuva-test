import React from 'react';

const Events = (props) => {
  return (
    <div className="col">
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <h1 className="m-0 text-center">{props.day}</h1>
            <h4 className="m-0 text-center">{props.month}</h4>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.description}</p>
              <p className="card-text">
                <small className="text-muted">Last updated {props.mins} mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
