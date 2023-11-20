import React from 'react';

const ResourcesLibrary = () => {
  return (
    <section id="scrollspyLibrary" className="bg-gray section">
      <div className="container">
        <div className="section-title">
          <span className="section-title-border"></span>
          <h2 className="section-title">Resources Library</h2>
        </div>
        <div className="overview">
          <p className="text-dark mb-2">
            The Model G20 summit organizing committee every time prepares significant resource material that is helpful for all the participating
            delegates. Every year, these resources are updated and revised with the latest topics, publications, and regulations to stay parallel with
            actual G20 summit meetings.
          </p>
          <p className="text-dark mb-2">
            For 2023, under India’s presidency, the participating delegations will get access to newly curated resources once they successfully
            register into the model G20 summit portal.
          </p>
          <p className="text-dark mb-2">
            Read more about India’s G20 presidency <a href="#">here</a>.
          </p>
        </div>
        <hr className="my-4" />
        {/* <!-- REsources Library  --> */}
        <div className="p-4 border bg-white rounded-4">
          <div className="row g-3 g-lg-4">
            <div className="col-12 col-lg-6">
              {/* <!-- Past Model G30 Announcements  --> */}
              <div>
                <div className="mb-4">
                  <h4>Past model G20 Publications</h4>
                  <p>
                    Every member of the delegation will receive a copy of previous Model G20 publications. These copies will carry a detailed thesis
                    of special statements, Track negotiations, Communique documents and reform plans from each G20 member country.
                  </p>
                </div>
                {/* <!-- Publications  --> */}
                <div className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
                  <div className="d-flex g-3 justify-content-between">
                    <div className="d-flex align-items-center">
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
                        <h5>Model G20 Osaka Publication</h5>
                      </div>
                    </div>
                    <div className="text-end">
                      <a href="#">
                        <i className="bx bx-link-external fs-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Publications  --> */}
                <div className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
                  <div className="d-flex g-3 justify-content-between">
                    <div className="d-flex align-items-center">
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
                        <h5>Model G20 Bali Publication</h5>
                      </div>
                    </div>
                    <div className="text-end">
                      <a href="#">
                        <i className="bx bx-link-external fs-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Publications  --> */}
                <div className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
                  <div className="d-flex g-3 justify-content-between">
                    <div className="d-flex align-items-center">
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
                        <h5>Model G20 Riyadh Publication</h5>
                      </div>
                    </div>
                    <div className="text-end">
                      <a href="#">
                        <i className="bx bx-link-external fs-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Publications  --> */}
                <div className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
                  <div className="d-flex g-3 justify-content-between">
                    <div className="d-flex align-items-center">
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
                        <h5>Model G20 Buenos Aires Publication</h5>
                      </div>
                    </div>
                    <div className="text-end">
                      <a href="#">
                        <i className="bx bx-link-external fs-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              {/* <!-- Past Model G30 Announcements  --> */}
              <div>
                <div className="mb-4">
                  <h4>Model G20 Delegation E-Handbook</h4>
                  <p>
                    Our Model G20 team keeps a close overwatch on past G20 proceedings with the objective to formulate a detailed delegation
                    e-handbook. Every registered delegate receives the access code of the e-handbook via email.
                  </p>
                  <p>
                    Model G20 aims to provide personalised guidance via these e-handbooks to all participants with or without a summit simulation
                    overview. To get an idea how what the e-handbook looks like,
                    <a href="#">click here</a>.
                  </p>
                </div>
              </div>
              {/* <!-- Model G20 Scholar Dossier --> */}
              <div>
                <div className="mb-4">
                  <h4>Model G20 Scholar Dossier</h4>
                  <p>
                    Delegates can head start their negotiation preps by gaining access to 20+ scholarly documents, research papers, past G20 summit
                    translated reports on the Model G20 scholar dossier <a href="#">here</a>. Additionally, they can view The G20 Leaders declaration
                    and India’s presidency-related <a href="#">resources here</a>.
                  </p>
                  <p>Other sources that delegates can use are:</p>
                  <a href="#" className="d-block">
                    G20 Secretariat Website
                  </a>
                  <a href="#" className="d-block">
                    G20 India Official website
                  </a>
                  <a href="#" className="d-block">
                    University/College/ Model G20 Newsletters
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- G20 Summit History Newsletter --> */}
            <div className="col-12">
              <div className="mb-4">
                <h4>G20 Summit History Newsletter</h4>
                <p>
                  Participants of the model G20 summit will receive a special edition of G20 History newsletter that chronologically elaborates on the
                  inception of G20, how its members work, how it tackles the economic and financial conversations on a global scale.
                </p>
                <p>
                  Moreover, the newsletter will have facts, timelines and updated G20 communique documents for the participants to prepare their
                  arguments readily.
                </p>
                <p>This year, a new section is added in the newsletter describing India’s 2023 G20 presidency summit workstreams.</p>
                <p>All these resources will be made available to delegates via email after the team registration process.</p>
                <p>
                  If you have any queries regarding the Model G20 resources, please <a href="#">contact us</a> here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesLibrary;
