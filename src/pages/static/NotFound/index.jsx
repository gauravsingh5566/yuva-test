import React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      {/* <!-- page title --> */}
      <section
        className="section"
        style={{
          background: 'url(images/backgrounds/g20.jpg) no-repeat center',
          backgroundSize: 'cover',
          boxShadow: 'inset 0 0 0 2000px rgba(8, 8, 8, 0.618)',
        }}>
        <div className="container pt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white mb-3">Page Not Found (404)</h1>
              {/* <!-- breadcrumb --> */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent p-0">
                  <li className="breadcrumb-item font-weight-semebold">
                    <a className="text-white" href="index.html">
                      We are lost
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page title --> */}

      {/* 
            <section className='secttion position-relative'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <img
                                src="images/error/error.gif"
                                className="w-100 rounded-4"
                                alt=""
                            />
                        </div>
                        <div className="col-md-6 justify-content-center">
                            <div className="fs-1">
                                404
                            </div>
                            <a href="">Go to home</a>
                        </div>
                    </div>
                </div>
            </section> */}
    </React.Fragment>
  );
};

export default NotFound;
