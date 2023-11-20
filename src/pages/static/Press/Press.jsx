import React, { useEffect, useState } from 'react';
import { getResourcesLibrary } from 'api';
const resource1 = require('./resources/YMG20_ Goa-Post-Event-Press-Release.pdf');

const Press = () => {
  const [resourceLib, setResourceLib] = useState([]);
  const fetchLibs = async () => {
    try {
      const data = await getResourcesLibrary();
      if (data.data.resources) {
        setResourceLib(data.data.resources);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchLibs();
  }, []);
  return (
    <>
      <section id="scrollspyLibrary" className="bg-gray section">
        <div className="container">
          <div className="row">
            <h3 className="text-center">Press and Media</h3>
          </div>
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <h2 className="mb-5 fs-3">Latest Release</h2>
              {/* <!-- Publications  --> */}
              <div className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
                <div className="d-flex g-3 justify-content-between">
                  <div className="d-flex align-items-start">
                    <div className="pe-3">
                      <img
                        src="images/icons/pdf.png"
                        alt=""
                        className=""
                        style={{
                          height: '50px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <div className="text-start">
                      <h5>Yuvamanthan Model G20 Initiative Launches With Its Inaugural Summit in Goa</h5>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href={resource1} download>
                      <i className="bx bx-link-external fs-3"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Press;
