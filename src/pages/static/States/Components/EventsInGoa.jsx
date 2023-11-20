import React from 'react';

const EventsInGoa = ({ data }) => {
  return (
    <div className="container py-4">
      <h3 className="fs-2 text-center">{data.title}</h3>
      <p>{data.paragraph}</p>

      <div className="row row-cols-1 mt-4 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-md-3 g-lg-4">
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[0].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[0].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[0].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[0].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[1].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[1].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[1].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[1].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[2].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[2].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[2].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[2].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  June<span className="ms-1 fs-5 text-dark">{data.cards[3].day}</span>
                </h2>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[3].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[3].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[4].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[4].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[4].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[4].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[5].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[5].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[5].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[5].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[6].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[6].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[6].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[6].organisedBy}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="border shadow-sm rounded-3 h-100">
            <div className="p-3">
              <div className="d-flex flex-column align-items-start text-secondary">
                <h2 className="fw-bold me-1 text-secondary m-0">
                  {data.cards[7].date}
                  <span className="fs-4">th</span>
                </h2>
                <span className="ms-1 fs-5 text-dark">{data.cards[7].day}</span>
              </div>
              <div>
                <h4 className="fs-3 fw-bold">{data.cards[7].subheading}</h4>
              </div>
            </div>
            <div className="border-top p-3">
              <span className="text-dark fw-semibold"> Organised by</span>
              <br />
              <span>{data.cards[7].organisedBy} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsInGoa;
