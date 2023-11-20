import React from 'react';

const Announcement = () => {
  return (
    <section className=" section" style={{ maxWidth: '700px' }}>
      <div className="container">
        <div className="section-title">
          <span className="section-title-border"></span>
          <h2 className="section-title">Model G20 Summit Announcements</h2>
        </div>
        <div className="overview">
          <p className="text-dark mb-2">
            The Model G20 summit is finally here in India. To begin with the on-campus pre-summit meetings will take place across India followed by
            state level and a national level event. We will keep you informed on all the latest events and news on this website.
          </p>
          <p className="text-dark mb-2">
            To receive an email alert on the latest updates on model G20, <a href="#">click here</a>.
          </p>
        </div>
        <hr className="my-4" />
        {/* <!-- Announcements  --> */}
        <div className="p-4 border bg-white rounded-4" style={{ maxHeight: '850px', overflowY: 'auto' }}>
          {/* <!-- Announcement  --> */}
          <a href="#" className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
            <h4>Learn the Art of Public Speaking</h4>
            <p className="font-small text-dark mb-2">
              Model G20 is known to be the apex contributor to those individuals who look to surpass their shyness and march into the arena of public
              speaking
            </p>
            <p className="font-small text-dark mb-2">
              By becoming a delegate for model G20 discussions, you will learn how diplomacy works and get a chance to interact with G20 practitioners
              on your way to becoming confident orators and people-serving leaders
            </p>
          </a>
          {/* <!-- Announcement  --> */}
          <a href="#" className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
            <h4>Model G20 Summit Topics</h4>
            <p className="font-small text-dark mb-2">
              Model G20 summit takes place in two tracks – Sherpa and Finance track. Each track consists of negotiations on socio-political, financial
              and economic pressing matters. Once these two track meetings are done, the delegates meet for the final “Leaders” track to form a
              communique consensus.
            </p>
            <p className="font-small text-dark mb-2">
              All the relevant details of the simulation topics, structure will be shared with registered participants on this website, so keep
              visiting
            </p>
          </a>
          {/* <!-- Announcement  --> */}
          <a href="#" className="d-block mb-4 border-start shadow border-end border-4 px-4 py-4 border-primary rounded-4">
            <h4>Model G20 Summit Schedule</h4>
            <p className="font-small text-dark mb-2">The detailed schedule of the model G20 will be shared here soon.</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Announcement;
